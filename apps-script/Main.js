/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Main
 * Version: 8.2
 *
 * CHANGELOG
 * ---------
 * v8.2 - Added parallel SMS sending using UrlFetchApp.fetchAll()
 * v8.1 - Added createShipmentStatusRecord() after saveSubmission()
 * v8.0 - Replaced direct SMS calls with notification queue (enqueueNotification)
 * v7.9 - Added performance instrumentation
 * v7.8 - Removed all .setHeader() calls
 * ============================================================
 */

function doGet() {
  return jsonResponse(true, "Quick Freights Backend Online", {
    version: "8.2",
    status: "Running",
  });
}

function doPost(e) {
  logInfo("Main", "doPost started");
  const tStart = Date.now();

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse(false, "Empty request.");
    }

    const payload = JSON.parse(e.postData.contents);
    const tParse = Date.now();

    // VALIDATION
    const validation = validateSubmission(payload);
    if (!validation.valid) return jsonResponse(false, validation.message);
    const tValidation = Date.now();

    // TRACKING ID
    const trackingID = generateTrackingID();
    const tTracking = Date.now();

    // DRIVE UPLOAD
    let attachmentResult = null,
      fileUrl = null,
      fileId = null;
    let tDrive = tTracking;
    if (payload.attachmentData && payload.attachmentName) {
      attachmentResult = saveAttachment(
        payload.attachmentData,
        payload.attachmentName,
        payload.attachmentMimeType || null,
        trackingID,
        payload.consigneeName || "CUSTOMER",
      );
      tDrive = Date.now();
      if (!attachmentResult.success) {
        payload.attachmentError = attachmentResult.error;
      } else {
        fileUrl = attachmentResult.fileUrl;
        fileId = attachmentResult.fileId;
      }
    }

    // SAVE TO SHEETS
    const submissionID = saveSubmission(payload, trackingID, fileUrl, fileId);
    const tSheets = Date.now();

    // ============================================================
    // CREATE SHIPMENT STATUS RECORD (core data, synchronous)
    // ============================================================
    createShipmentStatusRecord(trackingID, payload);

    // ============================================================
    // PARALLEL SMS SENDING (non-blocking)
    // ============================================================
    const tSMS = Date.now();

    // Build SMS requests (don't send yet)
    var smsRequests = [];

    // Customer confirmation SMS
    if (CONFIG.SMS.ENABLED && CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION) {
      var custMsg = buildTemplateSMS(
        CONFIG.SMS.TEMPLATES.SUBMISSION_CONFIRMATION,
        {
          trackingId: trackingID,
        },
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

    // Send all SMS in parallel (non-blocking)
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

    const tEnd = Date.now();

    // BUILD RESPONSE
    const responseData = {
      trackingId: trackingID,
      submissionId: submissionID,
      timing: {
        total: tEnd - tStart,
        parse: tParse - tStart,
        validation: tValidation - tParse,
        tracking: tTracking - tValidation,
        drive: tDrive - tTracking,
        sheets: tSheets - tDrive,
        sms: tEnd - tSMS,
      },
    };

    if (fileUrl) {
      responseData.attachmentUrl = fileUrl;
      responseData.attachmentId = fileId;
    }
    if (attachmentResult && !attachmentResult.success) {
      responseData.attachmentWarning = attachmentResult.error;
    }

    logInfo("Main", "doPost completed — " + (tEnd - tStart) + "ms");
    return jsonResponse(
      true,
      "Submission received successfully.",
      responseData,
    );
  } catch (error) {
    logError("Main", "doPost", error.message);
    return jsonResponse(
      false,
      "An unexpected error occurred. Please try again.",
    );
  }
}

function jsonResponse(success, message, data) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: success,
      message: message || "",
      data: data || {},
      timestamp: now(),
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}
