// Shipment Operations Module – Backend coordinator for shipment management.
// Uses existing V2 functions directly; no duplication, no UI, no routing.
// Frozen: V3 Phase 2.1

/**
 * Retrieves a shipment by trackingId or blReference.
 * Returns a complete shipment object (status sheet fields) or null.
 *
 * @param {Object} params - { trackingId?, blReference? }
 * @return {Object|null}
 */
function getShipment_(params) {
  params = params || {};
  var trackingId = params.trackingId;
  var blRef = params.blReference;

  if (trackingId) {
    return getShipmentByTrackingId(trackingId);
  }

  if (blRef) {
    var submission = findSubmissionByBL(blRef);
    if (submission && submission.exists) {
      // Prefer trackingId if already returned; otherwise read from sheet
      var trackingFromSubmission = submission.trackingId;
      if (!trackingFromSubmission) {
        var sheet = getSubmissionSheet();
        var cols = CONFIG.SHEET_COLUMNS.SUBMISSIONS;
        trackingFromSubmission = sheet
          .getRange(submission.row, cols.TRACKING_ID)
          .getValue();
      }
      if (trackingFromSubmission) {
        return getShipmentByTrackingId(trackingFromSubmission);
      }
    }
    return null;
  }

  return null;
}

/**
 * Updates shipment status with validation and optional SMS.
 * Coordinates only; delegates to V2 status, sheet, and SMS modules.
 * Fully wrapped in try/catch for router safety.
 *
 * @param {string} trackingId
 * @param {string} newStatus
 * @param {boolean} sendSms
 * @return {Object} { success, error?, message? }
 */
function updateShipmentStatus_(trackingId, newStatus, sendSms) {
  try {
    // 1. Validate status using SSOT
    if (!isValidStatus(newStatus)) {
      logWarn("ShipmentOps", "Invalid status: " + newStatus);
      return { success: false, error: "Invalid status: " + newStatus };
    }

    // 2. Update in sheet via V2 Sheets function (wrapped for resilience)
    var updated = false;
    try {
      updated = updateSubmissionStatus(trackingId, newStatus);
    } catch (sheetError) {
      logError(
        "ShipmentOps",
        "updateShipmentStatus_",
        "Sheet update exception: " + sheetError.message,
      );
      return { success: false, error: "Update failed" };
    }

    if (!updated) {
      logError(
        "ShipmentOps",
        "updateShipmentStatus_",
        "Sheet update returned false for " + trackingId,
      );
      return { success: false, error: "Update failed" };
    }

    // 3. Optional SMS – use existing status-based SMS functions
    if (sendSms) {
      var shipment = getShipmentByTrackingId(trackingId);
      if (!shipment || !shipment.customerPhone) {
        logWarn("ShipmentOps", "No phone for SMS to " + trackingId);
      } else {
        try {
          var smsResult = sendStatusSmsFor_(
            newStatus,
            trackingId,
            shipment.customerPhone,
          );
          if (!smsResult.sent) {
            logWarn("ShipmentOps", "SMS not sent: " + smsResult.reason);
          }
        } catch (smsError) {
          logError(
            "ShipmentOps",
            "updateShipmentStatus_",
            "SMS exception: " + smsError.message,
          );
        }
      }
    }

    logInfo("ShipmentOps", "Status updated: " + trackingId + " → " + newStatus);
    return { success: true, message: "Status updated to " + newStatus };
  } catch (error) {
    logError(
      "ShipmentOps",
      "updateShipmentStatus_",
      "Unexpected error: " + error.message,
    );
    return { success: false, error: "Unexpected server error." };
  }
}

/**
 * Helper: dispatch to the correct V2 SMS function based on status.
 * @param {string} status
 * @param {string} trackingId
 * @param {string} phone
 * @return {Object} result from the SMS sender
 */
function sendStatusSmsFor_(status, trackingId, phone) {
  switch (status) {
    case CONFIG.STATUS.DISCHARGED:
      return sendStatusDischargedSMS(trackingId, phone);
    case CONFIG.STATUS.PROCESSING:
      return sendStatusProcessingSMS(trackingId, phone);
    case CONFIG.STATUS.CLEARED:
      return sendStatusClearedSMS(trackingId, phone);
    default:
      return { sent: false, reason: "No SMS for status: " + status };
  }
}
