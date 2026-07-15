/**
 * ============================================================
 * Quick Freights Global Limited
 * Utilities Module
 * ------------------------------------------------------------
 * Module: Utilities
 * Version: 1.1
 *
 * PURPOSE
 * -------
 * Common helper functions shared across modules.
 *
 * This module MUST NOT:
 * - Contain business logic
 * - Access Google Sheets
 * - Return HTTP responses
 * ============================================================
 */

/**
 * Cleans a value and returns a trimmed string.
 *
 * @param {*} value
 * @returns {string}
 */
function clean(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

/**
 * Returns the current timestamp using the SSOT timezone.
 *
 * @returns {string}
 */
function now() {
  return Utilities.formatDate(
    new Date(),
    CONFIG.COMPANY.TIMEZONE,
    "yyyy-MM-dd HH:mm:ss"
  );
}