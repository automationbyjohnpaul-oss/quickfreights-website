/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Validation
 * Version: 6.2
 *
 * PURPOSE
 * -------
 * Validates ALL incoming data.
 * All configuration sourced from CONFIG SSOT.
 *
 * This module MUST NEVER:
 * - Talk to Sheets directly
 * - Generate Tracking IDs
 * - Send SMS
 * - Upload files
 * ============================================================
 */

/**
 * Validates an incoming submission payload.
 *
 * @param {Object} data
 * @returns {Object}
 */
function validateSubmission(data) {

  if (!data)
    return validationError("No request payload received.");

  // -----------------------------
  // Required Fields (sourced from CONFIG SSOT)
  // -----------------------------

  const fieldLabels = {
    blReference: "Bill of Lading Number",
    consigneeName: "Consignee Name",
    consigneePhone: "Phone Number"
  };

  for (var i = 0; i < CONFIG.VALIDATION.REQUIRED_FIELDS.length; i++) {
    var field = CONFIG.VALIDATION.REQUIRED_FIELDS[i];
    if (!clean(data[field])) {
      return validationError(
        fieldLabels[field] + " is required."
      );
    }
  }

  // -----------------------------
  // Normalize Phone (uses SSOT pattern)
  // -----------------------------

  data.consigneePhone = normalizePhone(
    data.consigneePhone
  );

  if (!data.consigneePhone) {
    return validationError(
      "Invalid phone number."
    );
  }

  // -----------------------------
  // Validate B/L Reference (uses SSOT min length)
  // -----------------------------

  if (!validateBLReference(data.blReference)) {
    return validationError(
      "Invalid Bill of Lading Number."
    );
  }

  // -----------------------------
  // Duplicate Check
  // -----------------------------

  if (checkDuplicateBL(data.blReference)) {
    return validationError(
      "This Bill of Lading has already been submitted."
    );
  }

  return {
    valid: true,
    data: data
  };
}

/**
 * Creates validation response.
 */
function validationError(message) {
  return {
    valid: false,
    message: message
  };
}

/**
 * Normalizes Nigerian phone numbers.
 * Uses CONFIG.VALIDATION.PHONE_PATTERN from SSOT.
 */
function normalizePhone(phone) {
  phone = clean(phone);
  phone = phone.replace(/\s+/g, "");
  phone = phone.replace(/-/g, "");

  if (phone.startsWith("+234"))
    phone = phone.substring(1);

  if (phone.startsWith("0"))
    phone = "234" + phone.substring(1);

  if (!CONFIG.VALIDATION.PHONE_PATTERN.test(phone))
    return null;

  return phone;
}

/**
 * Validates Bill of Lading Reference.
 * Uses CONFIG.VALIDATION.MIN_BL_LENGTH from SSOT.
 *
 * ============================================================
 * DIAGNOSTIC LOGGING ADDED — v6.3
 * ============================================================
 */
function validateBLReference(reference) {
  reference = clean(reference);

  // ============================================================
  // DIAGNOSTIC LOGGING — B/L Reference Validation
  // ============================================================
  Logger.log("validateBLReference()");
  Logger.log("Reference = [" + reference + "]");
  Logger.log("Length = " + reference.length);
  Logger.log("Minimum = " + CONFIG.VALIDATION.MIN_BL_LENGTH);

  return reference.length >= CONFIG.VALIDATION.MIN_BL_LENGTH;
}

/**
 * Duplicate checker.
 *
 * Checks if a Bill of Lading already exists in the system.
 *
 * @param {string} blReference - The B/L number to check
 * @returns {boolean} - True if duplicate exists, false otherwise
 */
function checkDuplicateBL(blReference) {
  return findSubmissionByBL(blReference) !== null;
}