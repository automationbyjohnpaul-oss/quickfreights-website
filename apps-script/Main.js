/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Main
 * Version: 7.4
 *
 * PURPOSE
 * -------
 * Entry point for all frontend requests.
 *
 * CHANGELOG
 * ---------
 * v7.4 - Added diagnostic logging and error exposure for debugging
 * v7.3 - Removed all .setHeader() calls — not supported by Apps Script
 * v7.2 - Removed debug logging, generic error messages for production
 * v7.1 - Fixed SMS function names
 * ============================================================
 */


function doGet() {
  return jsonResponse(
    true,
    "Quick Freights Backend Online",
    {
      version: "7.4",
      status: "Running"
    }
  );
}


function doPost(e) {
  try {
    //----------------------------------------------------------
    // Parse Request
    //----------------------------------------------------------
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse(false, "Empty request.");
    }

    const payload = JSON.parse(e.postData.contents);

    // ============================================================
    // DIAGNOSTIC LOGGING — Incoming Payload
    // ============================================================
    Logger.log("🚀 doPost() started");
    Logger.log("Payload keys:", Object.keys(payload));
    Logger.log("BL Reference:", payload.blReference);
    Logger.log("Consignee:", payload.consigneeName);
    Logger.log("Phone:", payload.consigneePhone);
    Logger.log("File present:", !!payload.attachmentData);
    Logger.log("File name:", payload.attachmentName || "(none)");

    //----------------------------------------------------------
    // Validation
    //----------------------------------------------------------
    const validation = validateSubmission(payload);

    if (!validation.valid) {
      return jsonResponse(false, validation.message);
    }

    //----------------------------------------------------------
    // Tracking ID
    //----------------------------------------------------------
    const trackingID = generateTrackingID();

    //----------------------------------------------------------
    // Handle File Attachment (if present)
    //----------------------------------------------------------
    let attachmentResult = null;
    let fileUrl = null;
    let fileId = null;

    if (payload.attachmentData && payload.attachmentName) {
      Logger.log("📎 Processing attachment:", payload.attachmentName);
      
      attachmentResult = saveAttachment(
        payload.attachmentData,
        payload.attachmentName,
        payload.attachmentMimeType || null,
        trackingID,
        payload.consigneeName || 'CUSTOMER'
      );

      if (!attachmentResult.success) {
        Logger.log("⚠️ Attachment upload failed:", attachmentResult.error);
        payload.attachmentError = attachmentResult.error;
      } else {
        fileUrl = attachmentResult.fileUrl;
        fileId = attachmentResult.fileId;
        Logger.log("✅ Attachment uploaded:", fileUrl);
      }
    }

    //----------------------------------------------------------
    // Save Submission to Sheets
    //----------------------------------------------------------
    const submissionID = saveSubmission(payload, trackingID, fileUrl, fileId);
    Logger.log("✅ Submission saved. ID:", submissionID);

    //----------------------------------------------------------
    // SMS Notifications (non-blocking)
    //----------------------------------------------------------
    if (CONFIG.SMS.ENABLED && CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION) {
      try {
        sendSubmissionConfirmationSMS(trackingID, payload.consigneePhone);
        Logger.log("✅ Confirmation SMS sent to " + payload.consigneePhone);
      } catch (smsError) {
        Logger.log("⚠️ Confirmation SMS failed:", smsError.message);
      }
    }

    if (CONFIG.SMS.ENABLED && CONFIG.SMS.SEND_STAFF_ALERTS) {
      try {
        sendStaffAlertSMS(trackingID, payload.blReference, payload.consigneeName);
        Logger.log("✅ Staff alert SMS sent");
      } catch (staffAlertError) {
        Logger.log("⚠️ Staff alert SMS failed:", staffAlertError.message);
      }
    }

    //----------------------------------------------------------
    // Build Response
    //----------------------------------------------------------
    const responseData = {
      trackingId: trackingID,
      submissionId: submissionID
    };

    if (fileUrl) {
      responseData.attachmentUrl = fileUrl;
      responseData.attachmentId = fileId;
    }

    if (attachmentResult && !attachmentResult.success) {
      responseData.attachmentWarning = attachmentResult.error;
    }

    //----------------------------------------------------------
    // Success Response
    //----------------------------------------------------------
    return jsonResponse(true, "Submission received successfully.", responseData);

  } catch (error) {
    // ============================================================
    // Log the error
    // ============================================================
    try {
      logError("Main", "doPost", error.message, null, error.stack);
    } catch (logErr) {
      Logger.log("⚠️ Could not log error:", logErr.message);
    }

    Logger.log("❌ SERVER ERROR:");
    Logger.log("   Message:", error.message);
    Logger.log("   Name:", error.name);
    Logger.log("   Stack:", error.stack);

    // ============================================================
    // TEMPORARY: Return the real error for debugging
    // ============================================================
    return jsonResponse(false, error.message, {
      errorName: error.name || "UnknownError",
      errorStack: error.stack || "No stack trace available",
      timestamp: now()
    });

    // ============================================================
    // AFTER DEBUGGING: Restore this generic message
    // ============================================================
    // return jsonResponse(false, "An unexpected error occurred. Please try again.");
  }
}


/**
 * JSON Response — NO .setHeader() calls.
 * Apps Script TextOutput does not support custom headers.
 */
function jsonResponse(success, message, data) {
  return ContentService
    .createTextOutput(
      JSON.stringify({
        success: success,
        message: message || "",
        data: data || {},
        timestamp: now()
      })
    )
    .setMimeType(ContentService.MimeType.JSON);
}