/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend v6.3
 * ------------------------------------------------------------
 * Module: Tracking
 * Purpose: Generate secure public Tracking IDs.
 *
 * Format:
 * QFG-MM-YY-XXXXXX
 *
 * Example:
 * QFG-07-26-A7X4K2
 *
 * CHANGELOG
 * ---------
 * v6.3 - Removed ambiguous characters (I, O, 0, 1) from random code
 * v6.2 - Initial production version
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
 * 
 * CHARSET: Removed ambiguous characters:
 * - I (looks like 1)
 * - O (looks like 0)
 * - 0 (looks like O)
 * - 1 (looks like I)
 */
function generateRandomCode(length) {

  // FIX: Removed ambiguous characters I, O, 0, 1
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

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


// ============================================================
// TEST FUNCTIONS
// ============================================================

/**
 * Test Tracking ID generation
 */
function testTrackingID() {
  Logger.log("=== Testing Tracking ID Generation ===");
  
  // Test single generation
  const id = generateTrackingID();
  Logger.log("Generated ID:", id);
  Logger.log("Format:", /^QFG-\d{2}-\d{2}-[A-HJ-KMNP-Z2-9]{6}$/.test(id) ? "✅ Valid" : "❌ Invalid");
  
  // Test multiple generations
  const ids = [];
  for (let i = 0; i < 10; i++) {
    ids.push(generateTrackingID());
  }
  Logger.log("10 Generated IDs:", ids.join(", "));
  
  // Check for duplicates
  const unique = new Set(ids);
  Logger.log("Unique count:", unique.size);
  Logger.log("Duplicates:", ids.length - unique.size === 0 ? "✅ None" : "❌ Found");
  
  Logger.log("=== Tracking ID Test Complete ===");
  
  return ids;
}

/**
 * Test random code generation
 */
function testRandomCode() {
  Logger.log("=== Testing Random Code Generation ===");
  
  const codes = [];
  for (let i = 0; i < 10; i++) {
    codes.push(generateRandomCode(6));
  }
  
  Logger.log("Generated codes:", codes.join(", "));
  
  // Verify character set
  const allowed = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let allValid = true;
  
  codes.forEach(function(code) {
    for (var i = 0; i < code.length; i++) {
      if (allowed.indexOf(code.charAt(i)) === -1) {
        allValid = false;
        Logger.log("❌ Invalid character found:", code.charAt(i));
      }
    }
  });
  
  Logger.log("Character set validation:", allValid ? "✅ All valid" : "❌ Invalid found");
  Logger.log("=== Random Code Test Complete ===");
  
  return codes;
}