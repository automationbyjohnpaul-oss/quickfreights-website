/**
 * ============================================================
 * Quick Freights Global Limited
 * Status Module
 * ------------------------------------------------------------
 * Module: Status
 * Version: 1.0
 *
 * PURPOSE
 * -------
 * Shipment workflow & status transition logic.
 *
 * This module owns:
 * - Status transition decisions
 * - Duplicate notification prevention
 * - Status business rules
 *
 * This module delegates:
 * - SMS sending → SMS.gs
 * - Sheet updates → Sheets.gs
 *
 * ============================================================
 */

/**
 * ============================================================
 * STATUS CHANGE PROCESSOR (Central Gateway)
 * ============================================================
 *
 * Central gateway for all status-change SMS notifications.
 * Status.gs owns the workflow logic.
 *
 * @param {Object} context - From Sheets.gs getStatusChangeContext()
 * @param {string} context.trackingId - The tracking ID
 * @param {string} context.phone - Customer phone number
 * @param {string} context.status - New status value
 * @param {boolean} context.smsAlreadySent - Whether SMS was already sent
 * @param {number} context.row - Row number in Status sheet
 * @returns {Object} { sent: boolean, reason: string, flag: string }
 */
function processStatusChange(context) {
  // Validate required data
  if (!context || !context.trackingId || !context.phone) {
    return { sent: false, reason: "missing data" };
  }

  // DUPLICATE CHECK — Prevent sending the same status SMS twice
  if (context.smsAlreadySent) {
    logInfo("Status", "Already sent: " + context.trackingId + " — " + context.status);
    return { sent: false, reason: "already sent" };
  }

  // STATUS ROUTER — Map status values to sender functions and flags
  var STATUS_ROUTER = {
    [CONFIG.STATUS.DISCHARGED]: {
      sender: sendStatusDischargedSMS,
      flag: CONFIG.SMS_FLAGS.DISCHARGED
    },
    [CONFIG.STATUS.PROCESSING]: {
      sender: sendStatusProcessingSMS,
      flag: CONFIG.SMS_FLAGS.PROCESSING
    },
    [CONFIG.STATUS.CLEARED]: {
      sender: sendStatusClearedSMS,
      flag: CONFIG.SMS_FLAGS.CLEARED
    }
  };

  // Find the route for this status
  var route = STATUS_ROUTER[context.status];
  if (!route) {
    logInfo("Status", "Unmapped status: " + context.status + " — " + context.trackingId);
    return { sent: false, reason: "unmapped status" };
  }

  // SEND SMS via SMS.gs
  var result = route.sender(context.trackingId, context.phone);

  // Return the result for Triggers.gs to mark the flag
  return {
    sent: result.success || false,
    reason: result.success ? "success" : "send failed",
    flag: result.success ? route.flag : null
  };
}

/**
 * ============================================================
 * TEST FUNCTION
 * ============================================================
 */
function testProcessStatusChange() {
  var context = {
    trackingId: "QFG-TEST-001",
    phone: "2348037883339",
    status: CONFIG.STATUS.DISCHARGED,
    smsAlreadySent: false,
    row: 2
  };

  var result = processStatusChange(context);
  Logger.log("=== processStatusChange Test ===");
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}