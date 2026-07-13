/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend v6.2
 * ------------------------------------------------------------
 * Module: Tracking
 * Purpose: Generate secure public Tracking IDs.
 *
 * Format:
 * QFG-MM-YY-XXXXXX
 *
 * Example:
 * QFG-07-26-A7X4K2
 * ============================================================
 */


/**
 * Generates a unique customer Tracking ID.
 *
 * @returns {String}
 */
function generateTrackingID() {

  const sheet = getSheet(CONFIG.SHEETS.SUBMISSIONS);

  let trackingId;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    trackingId = buildTrackingID();
    attempts++;
    
    if (attempts > maxAttempts) {
      throw new Error("Failed to generate unique Tracking ID after " + maxAttempts + " attempts.");
    }
    
  } while (trackingIDExists(sheet, trackingId));

  return trackingId;

}


/**
 * Builds a new Tracking ID.
 *
 * Format:
 * QFG-MM-YY-XXXXXX
 */
function buildTrackingID() {

  const now = new Date();

  const month = Utilities.formatDate(
    now,
    Session.getScriptTimeZone(),
    "MM"
  );

  const year = Utilities.formatDate(
    now,
    Session.getScriptTimeZone(),
    "yy"
  );

  const random = generateRandomCode(6);

  return "QFG-" + month + "-" + year + "-" + random;

}


/**
 * Generates a random uppercase
 * alphanumeric string.
 *
 * Example:
 * A7X4K2
 */
function generateRandomCode(length) {

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {

    const index = Math.floor(Math.random() * chars.length);

    result += chars.charAt(index);

  }

  return result;

}


/**
 * Checks whether a Tracking ID
 * already exists.
 *
 * @param {Sheet} sheet
 * @param {String} trackingId
 *
 * @returns {Boolean}
 */
function trackingIDExists(sheet, trackingId) {

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1)
    return false;

  // Column B contains Tracking ID
  const values = sheet
    .getRange(2, 2, lastRow - 1, 1)
    .getValues()
    .flat();

  return values.includes(trackingId);

}