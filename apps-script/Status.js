/**
 * ============================================================
 * Quick Freights Global Limited
 * Status Module
 * ------------------------------------------------------------
 * Module: Status
 * Version: 1.1
 *
 * PURPOSE
 * -------
 * Shipment workflow & status transition logic.
 *
 * This module owns:
 * - Status transition decisions
 * - Duplicate notification prevention
 * - Status business rules
 * - Creation of shipment status records
 *
 * This module delegates:
 * - SMS sending → SMS.gs
 * - Sheet updates → Sheets.gs
 *
 * CHANGELOG
 * ---------
 * v1.1 - Added createShipmentStatusRecord() for new submissions
 * v1.0 - Initial version with processStatusChange()
 * ============================================================
 */

/**
 * ============================================================
 * CREATE SHIPMENT STATUS RECORD
 * ============================================================
 *
 * Creates a Shipment Status record for a new submission.
 * Called by Main.js after saveSubmission() succeeds.
 *
 * @param {string} trackingId - The generated tracking ID
 * @param {Object} payload - The submission payload
 * @param {string} payload.blReference - Bill of Lading reference
 * @param {string} payload.consigneeName - Customer name
 * @param {string} payload.consigneePhone - Customer phone number
 */
function createShipmentStatusRecord(trackingId, payload) {
  var sheet = getSheet(CONFIG.SHEETS.STATUS);
  var row = sheet.getLastRow() + 1;

  sheet
    .getRange(row, 1, 1, 7)
    .setValues([
      [
        trackingId,
        payload.blReference || "",
        payload.consigneeName || "",
        payload.consigneePhone || "",
        CONFIG.STATUS.RECEIVED,
        "",
        now(),
      ],
    ]);

  logInfo("Status", "Status record created: " + trackingId);
}

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
    logInfo(
      "Status",
      "Already sent: " + context.trackingId + " — " + context.status,
    );
    return { sent: false, reason: "already sent" };
  }

  // STATUS ROUTER — Map status values to sender functions and flags
  var STATUS_ROUTER = {
    [CONFIG.STATUS.DISCHARGED]: {
      sender: sendStatusDischargedSMS,
      flag: CONFIG.SMS_FLAGS.DISCHARGED,
    },
    [CONFIG.STATUS.PROCESSING]: {
      sender: sendStatusProcessingSMS,
      flag: CONFIG.SMS_FLAGS.PROCESSING,
    },
    [CONFIG.STATUS.CLEARED]: {
      sender: sendStatusClearedSMS,
      flag: CONFIG.SMS_FLAGS.CLEARED,
    },
  };

  // Find the route for this status
  var route = STATUS_ROUTER[context.status];
  if (!route) {
    logInfo(
      "Status",
      "Unmapped status: " + context.status + " — " + context.trackingId,
    );
    return { sent: false, reason: "unmapped status" };
  }

  // SEND SMS via SMS.gs
  var result = route.sender(context.trackingId, context.phone);

  // Return the result for Triggers.gs to mark the flag
  return {
    sent: result.success || false,
    reason: result.success ? "success" : "send failed",
    flag: result.success ? route.flag : null,
  };
}

/**
 * ============================================================
 * TEST FUNCTIONS
 * ============================================================
 */

/**
 * Test the status change processor.
 */
function testProcessStatusChange() {
  var context = {
    trackingId: "QFG-TEST-001",
    phone: "2348037883339",
    status: CONFIG.STATUS.DISCHARGED,
    smsAlreadySent: false,
    row: 2,
  };

  var result = processStatusChange(context);
  Logger.log("=== processStatusChange Test ===");
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

/**
 * Test creating a shipment status record.
 */
function testCreateShipmentStatusRecord() {
  var payload = {
    blReference: "MAEU123456789",
    consigneeName: "Test Customer",
    consigneePhone: "2348037883339",
  };

  createShipmentStatusRecord("QFG-TEST-001", payload);
  Logger.log("=== createShipmentStatusRecord Test ===");
  Logger.log("Status record created for QFG-TEST-001");
  return true;
}
