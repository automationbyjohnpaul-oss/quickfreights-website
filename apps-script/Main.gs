/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Main
 * Version: 7.1
 *
 * PURPOSE
 * -------
 * Entry point for all frontend requests.
 *
 * This module MUST NEVER:
 * - Validate business rules
 * - Generate Tracking IDs
 * - Access Google Sheets directly
 * - Upload files
 * - Send SMS
 *
 * It only orchestrates the backend modules.
 *
 * CHANGELOG
 * ---------
 * v7.1 - Added non-blocking SMS notifications
 * v7.0 - Refactored to use Spreadsheet.gs module
 * v6.3 - Added Drive attachment integration, attachmentId passed but not stored
 * v6.2 - Initial production foundation
 *
 * ============================================================
 */


/**
 * Health Check
 */
function doGet() {
  return jsonResponse(
    true,
    "Quick Freights Backend Online",
    {
      version: CONFIG.SYSTEM.VERSION || "7.1",
      status: "Running"
    }
  );
}


/**
 * Main API Entry
 */
function doPost(e) {
  try {
    //----------------------------------------------------------
    // Parse Request
    //----------------------------------------------------------
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse(
        false,
        "Empty request."
      );
    }

    const payload = JSON.parse(
      e.postData.contents
    );

    // ============================================================
    // DIAGNOSTIC LOGGING — Incoming Payload
    // ============================================================
    Logger.log("=== Incoming Payload ===");
    Logger.log(JSON.stringify(payload));

    //----------------------------------------------------------
    // Validation
    //----------------------------------------------------------
    Logger.log("=== Starting Validation ===");

    const validation = validateSubmission(payload);

    Logger.log("Validation Result:");
    Logger.log(JSON.stringify(validation));

    if (!validation.valid) {
      Logger.log("Validation Failed: " + validation.message);

      return jsonResponse(
        false,
        validation.message
      );
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
      Logger.log('📎 Processing attachment:', payload.attachmentName);
      
      attachmentResult = saveAttachment(
        payload.attachmentData,
        payload.attachmentName,
        payload.attachmentMimeType || null,
        trackingID,
        payload.consigneeName || 'CUSTOMER'
      );

      if (!attachmentResult.success) {
        // Log but don't fail the submission - the file upload can be retried
        Logger.log('⚠️ Attachment upload failed:', attachmentResult.error);
        // Store error in payload for reference
        payload.attachmentError = attachmentResult.error;
      } else {
        fileUrl = attachmentResult.fileUrl;
        fileId = attachmentResult.fileId;
        Logger.log('✅ Attachment uploaded:', fileUrl);
        Logger.log('   File ID (for reference):', fileId);
      }
    }

    //----------------------------------------------------------
    // Save Submission to Sheets (only stores Attachment URL)
    //----------------------------------------------------------
    // Note: fileId is passed but NOT stored in V1 schema
    // It's available in logs and response if needed
    const submissionID = saveSubmission(
      payload,
      trackingID,
      fileUrl,    // Stored in Attachment Link column (Col 13)
      fileId      // Not stored in V1, but available for future use
    );

    //----------------------------------------------------------
    // SMS Notification (non-blocking)
    //----------------------------------------------------------
    // These run in try-catch blocks so they don't break the response
    // if the SMS provider is unavailable or misconfigured.
    // ============================================================

    // 1. Send customer confirmation SMS
    if (CONFIG.SMS.ENABLED && CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION) {
      try {
        // Use the business function from SMS.gs
        sendSubmissionConfirmation(trackingID, payload.consigneePhone);
        Logger.log('✅ Confirmation SMS sent to ' + payload.consigneePhone);
      } catch (smsError) {
        Logger.log('⚠️ Confirmation SMS failed: ' + smsError.message);
      }
    }

    // 2. Send staff alert SMS
    if (CONFIG.SMS.ENABLED && CONFIG.SMS.SEND_STAFF_ALERTS) {
      try {
        sendStaffAlert(
          trackingID,
          payload.blReference,
          payload.consigneeName
        );
        Logger.log('✅ Staff alert SMS sent to operations team');
      } catch (staffAlertError) {
        Logger.log('⚠️ Staff alert SMS failed: ' + staffAlertError.message);
      }
    }

    //----------------------------------------------------------
    // Build Response
    //----------------------------------------------------------
    const responseData = {
      trackingId: trackingID,
      submissionId: submissionID
    };

    // Add attachment info to response if available
    if (fileUrl) {
      responseData.attachmentUrl = fileUrl;
      responseData.attachmentId = fileId; // Available in response even if not stored
    }

    if (attachmentResult && !attachmentResult.success) {
      responseData.attachmentWarning = attachmentResult.error;
    }

    // Add SMS status to response (non-blocking, so it's informational only)
    responseData.smsStatus = {
      customer: CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION ? "attempted" : "disabled",
      staff: CONFIG.SMS.SEND_STAFF_ALERTS ? "attempted" : "disabled"
    };

    //----------------------------------------------------------
    // Success Response
    //----------------------------------------------------------
    return jsonResponse(
      true,
      "Submission received successfully.",
      responseData
    );

  } catch(error) {
    // ============================================================
    // DIAGNOSTIC CATCH BLOCK — Exposes the real error
    // ============================================================
    Logger.log("=== SERVER ERROR ===");
    Logger.log("Error Name: " + error.name);
    Logger.log("Error Message: " + error.message);
    Logger.log("Error Stack: " + error.stack);

    // Try to log to error sheet if available
    try {
      logError(
        "Main",
        "doPost",
        error.message,
        null,
        error.stack
      );
    } catch(logErr) {
      Logger.log("⚠️ Could not log to error sheet:", logErr.message);
    }

    // ============================================================
    // TEMPORARY: Return the actual error message for debugging
    // ============================================================
    return jsonResponse(
      false,
      error.toString()  // <-- Exposes the real error message
    );

    // ============================================================
    // AFTER DEBUGGING: Restore this generic message
    // ============================================================
    // return jsonResponse(
    //   false,
    //   "Unexpected server error."
    // );
  }
}


/**
 * ============================================================
 * CORS-Enabled JSON Response
 * ============================================================
 * This function ensures every response includes the proper
 * CORS headers so the browser accepts the request.
 *
 * FIX: Added Access-Control-Allow-Origin header
 * ============================================================
 */
function jsonResponse(success, message, data) {
  var response = {
    success: success,
    message: message || "",
    timestamp: new Date().toISOString()
  };

  if (data) {
    response.data = data;
  }

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type")
    .setHeader("Access-Control-Max-Age", "86400");
}


/**
 * ============================================================
 * CORS Preflight Handler
 * ============================================================
 * Handles OPTIONS requests for CORS preflight.
 * Required for browsers to know the server supports CORS.
 * ============================================================
 */
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type")
    .setHeader("Access-Control-Max-Age", "86400");
}