/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Main
 * Version: 8.0
 *
 * PURPOSE
 * -------
 * Entry point for all frontend requests.
 *
 * CHANGELOG
 * ---------
 * v8.0 - Refactored to use Performance module (request-scoped timer),
 *        uses logInfo() instead of Logger.log(),
 *        uses finally block for guaranteed timing,
 *        returns generic error in production,
 *        text/plain MIME type for CORS compatibility
 * v7.7 - Added performance timing instrumentation
 * v7.6 - Removed timing instrumentation for production release
 * v7.5 - Added timing instrumentation for performance profiling
 * v7.4 - Added diagnostic logging and error exposure for debugging
 * v7.3 - Removed all .setHeader() calls — not supported by Apps Script
 * v7.2 - Removed debug logging, generic error messages for production
 * v7.1 - Fixed SMS function names
 * ============================================================
 */

function doGet() {
  return jsonResponse(true, "Quick Freights Backend Online", {
    version: "8.0",
    status: "Running",
  });
}

function doPost(e) {
  // Create a request-scoped performance timer
  var timer = Performance.createTimer();

  try {
    //----------------------------------------------------------
    // Parse Request
    //----------------------------------------------------------
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse(false, "Empty request.");
    }

    const payload = JSON.parse(e.postData.contents);

    //----------------------------------------------------------
    // Diagnostic Logging (via Logger.gs)
    //----------------------------------------------------------
    if (CONFIG.DEBUG && CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING) {
      logInfo("Main", "🚀 doPost() started");
      logInfo("Main", "Payload keys: " + Object.keys(payload).join(", "));
      logInfo("Main", "BL Reference: " + payload.blReference);
      logInfo("Main", "Consignee: " + payload.consigneeName);
      logInfo("Main", "Phone: " + payload.consigneePhone);
      logInfo("Main", "File present: " + !!payload.attachmentData);
      logInfo("Main", "File name: " + (payload.attachmentName || "(none)"));
    }

    //----------------------------------------------------------
    // Stage: Validation
    //----------------------------------------------------------
    timer.begin("validation");
    const validation = validateSubmission(payload);
    timer.end("validation");

    if (!validation.valid) {
      return jsonResponse(false, validation.message);
    }

    //----------------------------------------------------------
    // Stage: Tracking
    //----------------------------------------------------------
    timer.begin("tracking");
    const trackingID = generateTrackingID();
    timer.end("tracking");

    //----------------------------------------------------------
    // Stage: Drive Upload
    //----------------------------------------------------------
    timer.begin("drive");
    let attachmentResult = null;
    let fileUrl = null;
    let fileId = null;

    if (payload.attachmentData && payload.attachmentName) {
      if (CONFIG.DEBUG && CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING) {
        logInfo("Main", "📎 Processing attachment: " + payload.attachmentName);
      }

      attachmentResult = saveAttachment(
        payload.attachmentData,
        payload.attachmentName,
        payload.attachmentMimeType || null,
        trackingID,
        payload.consigneeName || "CUSTOMER",
      );

      if (!attachmentResult.success) {
        logInfo(
          "Main",
          "⚠️ Attachment upload failed: " + attachmentResult.error,
        );
        payload.attachmentError = attachmentResult.error;
      } else {
        fileUrl = attachmentResult.fileUrl;
        fileId = attachmentResult.fileId;
        logInfo("Main", "✅ Attachment uploaded: " + fileUrl);
      }
    }
    timer.end("drive");

    //----------------------------------------------------------
    // Stage: Sheets
    //----------------------------------------------------------
    timer.begin("sheets");
    const submissionID = saveSubmission(payload, trackingID, fileUrl, fileId);
    timer.end("sheets");
    logInfo("Main", "✅ Submission saved. ID: " + submissionID);

    //----------------------------------------------------------
    // Stage: SMS (Customer)
    //----------------------------------------------------------
    timer.begin("sms_customer");
    if (CONFIG.SMS.ENABLED && CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION) {
      try {
        sendSubmissionConfirmationSMS(trackingID, payload.consigneePhone);
        logInfo(
          "Main",
          "✅ Confirmation SMS sent to " + payload.consigneePhone,
        );
      } catch (smsError) {
        logInfo("Main", "⚠️ Confirmation SMS failed: " + smsError.message);
      }
    }
    timer.end("sms_customer");

    //----------------------------------------------------------
    // Stage: SMS (Staff)
    //----------------------------------------------------------
    timer.begin("sms_staff");
    if (CONFIG.SMS.ENABLED && CONFIG.SMS.SEND_STAFF_ALERTS) {
      try {
        sendStaffAlertSMS(
          trackingID,
          payload.blReference,
          payload.consigneeName,
        );
        logInfo("Main", "✅ Staff alert SMS sent");
      } catch (staffAlertError) {
        logInfo(
          "Main",
          "⚠️ Staff alert SMS failed: " + staffAlertError.message,
        );
      }
    }
    timer.end("sms_staff");

    //----------------------------------------------------------
    // Build Response
    //----------------------------------------------------------
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

    //----------------------------------------------------------
    // Success Response
    //----------------------------------------------------------
    return jsonResponse(
      true,
      "Submission received successfully.",
      responseData,
    );
  } catch (error) {
    //----------------------------------------------------------
    // Log the error
    //----------------------------------------------------------
    try {
      logError("Main", "doPost", error.message, null, error.stack);
    } catch (logErr) {
      // Fallback if logError fails
      Logger.log("⚠️ Could not log error: " + logErr.message);
    }

    //----------------------------------------------------------
    // Return generic error for production
    //----------------------------------------------------------
    return jsonResponse(
      false,
      "An unexpected error occurred. Please try again.",
    );
  } finally {
    //----------------------------------------------------------
    // FINISH TIMING — Always executes (success or error)
    //----------------------------------------------------------
    timer.finish();
  }
}

/**
 * JSON Response — Uses text/plain to avoid CORS issues.
 * Apps Script TextOutput does not reliably support custom headers.
 */
function jsonResponse(success, message, data) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: success,
      message: message || "",
      data: data || {},
      timestamp: now(),
    }),
  ).setMimeType(ContentService.MimeType.TEXT);
}
