/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Main
 * Version: 8.5
 *
 * PURPOSE
 * -------
 * Entry point for all frontend requests.
 *
 * V2 CUSTOMER SUBMISSION FLOW – FROZEN, DO NOT MODIFY
 * Back Office extension added without touching V2 logic.
 *
 * CHANGELOG
 * ---------
 * v8.5 - Dashboard read endpoints moved to doGet() (GET = read, POST = write)
 * v8.4 - Clean extension: V2 completely untouched, Back Office auth added
 * v8.3 - Added GET/POST routing for Back Office endpoints
 * v8.2 - Added parallel SMS sending using UrlFetchApp.fetchAll()
 * v8.1 - Added createShipmentStatusRecord() after saveSubmission()
 * v8.0 - Replaced direct SMS calls with notification queue
 * ============================================================
 */

// ============================================================
// V2 CUSTOMER SUBMISSION FLOW – FROZEN, DO NOT MODIFY
// ============================================================

function doGet(e) {
  var action = e?.parameter?.action || "";

  // --- Dashboard read endpoints (GET) ---
  if (action === "dashboard") {
    var stats = getDashboardStats();
    return jsonResponse_({ success: true, data: stats });
  }

  if (action === "recentSubmissions") {
    var limit = parseInt(e.parameter.limit) || 20;
    var submissions = getRecentSubmissions(limit);
    return jsonResponse_({ success: true, data: submissions });
  }
  // --- End of dashboard extension ---

  // Fallback to V2 health check
  return handleV2GetRequest(e);
}

function doPost(e) {
  // Parse request parameters – supports both JSON and form-data
  var params = parseRequestParams_(e);
  var action = params.action;

  // --- Backoffice authentication extension (frozen) ---
  if (action === "login") {
    var username = params.username || "";
    var password = params.password || "";
    var result = loginUser_(username, password);
    return jsonResponse_(result);
  }
  // --- End of authentication extension ---

  // Existing V2 customer submission handling – unchanged
  return handleV2PostRequest(e);
}

// ============================================================
// EXISTING V2 HANDLERS – FROZEN, NO CHANGES
// ============================================================

/**
 * Handle V2 GET requests (health check, etc.)
 * @param {Object} e - Event object
 * @returns {TextOutput} JSON response
 */
function handleV2GetRequest(e) {
  return jsonResponse_({
    success: true,
    message: "Quick Freights Backend Online",
    data: {
      version: "8.5",
      status: "Running",
      timestamp: new Date().toISOString(),
    },
  });
}

/**
 * Handle V2 POST requests (customer submissions)
 * @param {Object} e - Event object
 * @returns {TextOutput} JSON response
 */
function handleV2PostRequest(e) {
  // === ORIGINAL V2 SUBMISSION LOGIC ===
  // This section is frozen. Do not modify.

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({
        success: false,
        message: "Empty request.",
      });
    }

    const payload = JSON.parse(e.postData.contents);
    const tStart = Date.now();

    // VALIDATION
    const validation = validateSubmission(payload);
    if (!validation.valid) {
      return jsonResponse_({
        success: false,
        message: validation.message,
      });
    }

    // TRACKING ID
    const trackingID = generateTrackingID();

    // DRIVE UPLOAD
    let attachmentResult = null,
      fileUrl = null,
      fileId = null;
    if (payload.attachmentData && payload.attachmentName) {
      attachmentResult = saveAttachment(
        payload.attachmentData,
        payload.attachmentName,
        payload.attachmentMimeType || null,
        trackingID,
        payload.consigneeName || "CUSTOMER",
      );
      if (attachmentResult && attachmentResult.success) {
        fileUrl = attachmentResult.fileUrl;
        fileId = attachmentResult.fileId;
      }
    }

    // SAVE TO SHEETS
    const submissionID = saveSubmission(payload, trackingID, fileUrl, fileId);

    // CREATE SHIPMENT STATUS RECORD
    createShipmentStatusRecord(trackingID, payload);

    // PARALLEL SMS SENDING
    var smsRequests = [];

    // Customer confirmation SMS
    if (CONFIG.SMS.ENABLED && CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION) {
      var custMsg = buildTemplateSMS(
        CONFIG.SMS.TEMPLATES.SUBMISSION_CONFIRMATION,
        { trackingId: trackingID },
      );
      var custPhone = normalizeSMSPhone(payload.consigneePhone);
      if (custPhone) {
        smsRequests.push(buildSMSRequest(custPhone, custMsg));
      }
    }

    // Staff alert SMS
    if (CONFIG.SMS.ENABLED && CONFIG.SMS.SEND_STAFF_ALERTS) {
      var staffMsg = buildTemplateSMS(CONFIG.SMS.TEMPLATES.STAFF_ALERT, {
        trackingId: trackingID,
        blReference: payload.blReference,
        consigneeName: payload.consigneeName,
      });
      var staffNumbers = CONFIG.SMS.STAFF_PHONES || [];
      for (var i = 0; i < staffNumbers.length; i++) {
        var staffPhone = normalizeSMSPhone(staffNumbers[i]);
        if (staffPhone) {
          smsRequests.push(buildSMSRequest(staffPhone, staffMsg));
        }
      }
    }

    // Send all SMS in parallel
    if (smsRequests.length > 0) {
      try {
        UrlFetchApp.fetchAll(smsRequests);
        logInfo(
          "Main",
          "SMS sent in parallel (" + smsRequests.length + " requests)",
        );
      } catch (e) {
        logError("Main", "SMS parallel send", e.message);
      }
    }

    // BUILD RESPONSE
    const responseData = {
      trackingId: trackingID,
      submissionId: submissionID,
    };

    if (fileUrl) {
      responseData.attachmentUrl = fileUrl;
      responseData.attachmentId = fileId;
    }
    if (attachmentResult && !attachmentResult.success) {
      responseData.attachmentWarning = attachmentResult.error;
    }

    logInfo("Main", "Submission completed — " + trackingID);
    return jsonResponse_({
      success: true,
      message: "Submission received successfully.",
      data: responseData,
    });
  } catch (error) {
    logError("Main", "handleV2PostRequest", error.message);
    return jsonResponse_({
      success: false,
      message: "An unexpected error occurred. Please try again.",
    });
  }
}

// ============================================================
// BACK OFFICE AUTHENTICATION EXTENSION
// ============================================================

/**
 * Handles login for Back Office.
 * @param {string} username - Staff username (reserved for future use)
 * @param {string} password - Staff password
 * @return {Object} Full session data or error
 */
function loginUser_(username, password) {
  try {
    var stored = PropertiesService.getScriptProperties().getProperty(
      "BACKOFFICE_PASSWORD",
    );
    if (!stored) {
      logError(
        "Auth",
        "loginUser_",
        "BACKOFFICE_PASSWORD not set in Script Properties",
      );
      return { success: false, error: "Authentication not configured." };
    }

    if (password !== stored) {
      logError("Auth", "loginUser_", "Invalid credentials attempt");
      return { success: false, error: "Invalid credentials." };
    }

    var token = Utilities.getUuid() + "-" + Date.now();
    var expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

    // Cache enriched session data for 8 hours (TTL in seconds)
    var sessionData = {
      username: username || "staff",
      role: "admin",
      fullName: "Administrator",
      email: "",
      loginTime: new Date().toISOString(),
      expiresAt: expiresAt,
    };

    CacheService.getScriptCache().put(
      token,
      JSON.stringify(sessionData),
      8 * 60 * 60,
    );

    logInfo("Auth", "User logged in: " + sessionData.username);

    return {
      success: true,
      token: token,
      expiresAt: expiresAt,
      username: sessionData.username,
      fullName: sessionData.fullName,
      role: sessionData.role,
      email: sessionData.email,
      loginTime: sessionData.loginTime,
    };
  } catch (error) {
    logError("Auth", "loginUser_", error.message);
    return { success: false, error: "Authentication failed." };
  }
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Parses request parameters supporting both JSON and form-urlencoded.
 * @param {Object} e - Event object
 * @return {Object} Parameters
 */
function parseRequestParams_(e) {
  var ct = e.postData && e.postData.type;
  if (ct && ct.indexOf("application/json") !== -1) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      return {};
    }
  }
  // Fall back to standard parameter map (form data)
  return e.parameter || {};
}

/**
 * Consistent JSON response helper (as used elsewhere in V2).
 * @param {Object} data - Response data
 * @return {ContentService.TextOutput}
 */
function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
