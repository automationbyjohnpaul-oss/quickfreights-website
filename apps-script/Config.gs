/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Config
 * Version: 7.2
 *
 * PURPOSE
 * -------
 * Single Source of Truth (SSOT) for backend configuration.
 *
 * This module contains:
 * - Company information
 * - Validation rules
 * - Tracking configuration
 * - Google Sheets configuration
 * - Google Drive configuration
 * - SMS configuration
 *
 * Secrets are NEVER stored here.
 * Secrets remain in Script Properties.
 *
 * CHANGELOG
 * ---------
 * v7.2 - SSOT cleanup: removed SPREADSHEET_ID from CONFIG,
 *        added COMPANY.TIMEZONE, removed DATABASE references,
 *        DRIVE 5MB→10MB, removed DOC/DOCX from allowed types
 * v7.1 - Enhanced SMS templates and flags
 * v7.0 - Initial production foundation
 * ============================================================
 */

const CONFIG = {

  // ==========================================================
  // COMPANY
  // ==========================================================

  COMPANY: {

    NAME: "Quick Freights Global Limited",

    TAGLINE: "Very Fast Delivery",

    TIMEZONE: "Africa/Lagos",

    WEBSITE:
      "https://automationbyjohnpaul-oss.github.io/quickfreights-website/",

    SUPPORT_EMAIL:
      "reception.quickfreightglobal@gmail.com",

    RC_NUMBER: "8106184"

  },

  // ==========================================================
  // VALIDATION
  // ==========================================================

  VALIDATION: {

    MIN_BL_LENGTH: 5,

    PHONE_PATTERN: /^234\d{10}$/,

    REQUIRED_FIELDS: [

      "blReference",

      "consigneeName",

      "consigneePhone"

    ]

  },

  // ==========================================================
  // TRACKING
  // ==========================================================

  TRACKING: {

    PREFIX: "QFG",

    RANDOM_LENGTH: 6

  },

  // ==========================================================
  // GOOGLE SHEETS
  // ==========================================================

  SHEETS: {

    SUBMISSIONS: "Submissions",

    STATUS: "Shipment Status",

    SMS_LOG: "SMS Log",

    ERROR_LOG: "Error Log"

  },

  // ==========================================================
  // GOOGLE DRIVE
  // ==========================================================

  DRIVE: {

    ROOT_FOLDER: "QuickFreights_Attachments",

    MAX_FILE_SIZE: 10 * 1024 * 1024,

    ALLOWED_TYPES: [

      "application/pdf",

      "image/jpeg",

      "image/png"

    ]

  },

  // ==========================================================
  // SMS — ENHANCED WITH FLAGS AND TEMPLATES
  // ==========================================================

  SMS: {

    // -------- MASTER CONTROL -----------------------------------------
    ENABLED: true,

    // -------- FEATURE FLAGS ------------------------------------------
    SEND_CUSTOMER_CONFIRMATION: true,

    SEND_STATUS_UPDATES: true,

    SEND_STAFF_ALERTS: true,

    // -------- PROVIDER CONFIG ----------------------------------------
    PROVIDER: "PAYLESS",

    API_ENDPOINT:
      "https://app.paylessbulksms.com.ng/api/http/sms/send",

    // Use the currently approved Sender ID.
    // Change only after provider approval.
    SENDER_ID:
      "QuickFreigh",

    // -------- STAFF NOTIFICATIONS ------------------------------------
    STAFF_PHONES: [

      "2348063388230",

      "2348037883339"

    ],

    // -------- RETRY & ERROR HANDLING --------------------------------
    MAX_RETRIES: 3,

    RETRY_LIMIT: 3,

    SUCCESS_KEYWORDS: [

      "queued",

      "sent",

      "successfully",

      "success",

      "200"

    ],

    // -------- SMS TYPES ---------------------------------------------
    TYPES: {

      SUBMISSION_CONFIRMATION:
        "SUBMISSION_CONFIRMATION",

      STATUS_UPDATE:
        "STATUS_UPDATE",

      BL_WHATSAPP_CONFIRM:
        "BL_WHATSAPP_CONFIRM",

      STAFF_ALERT:
        "STAFF_ALERT"

    },

    // -------- SMS TEMPLATES -----------------------------------------
    TEMPLATES: {

      // Customer receives this after submitting documents
      SUBMISSION_CONFIRMATION:
        "Dear Customer,\n\n" +
        "Your cargo documents have been received.\n\n" +
        "Tracking ID: {{trackingId}}\n\n" +
        "Quick Freights will process your submission and contact you shortly.\n\n" +
        "Thank you for choosing Quick Freights Global Limited.\n" +
        "RC: 8106184",

      // Customer receives this when shipment status changes
      STATUS_UPDATE:
        "Dear Customer,\n\n" +
        "Your shipment {{trackingId}} is now {{status}}.\n\n" +
        "Thank you for choosing Quick Freights Global Limited.\n" +
        "RC: 8106184",

      // Customer receives this when B/L is submitted via WhatsApp
      BL_WHATSAPP_CONFIRM:
        "Dear Customer,\n\n" +
        "Your Bill of Lading has been received via WhatsApp.\n\n" +
        "Tracking ID: {{trackingId}}\n\n" +
        "Quick Freights will process your clearance and contact you shortly.\n\n" +
        "Thank you for choosing Quick Freights Global Limited.\n" +
        "RC: 8106184",

      // Staff receives this when a new submission arrives
      STAFF_ALERT:
        "🔔 QFG New Submission\n" +
        "B/L: {{blReference}}\n" +
        "Consignee: {{consigneeName}}\n" +
        "Tracking: {{trackingId}}\n\n" +
        "Please process immediately."

    }

  }

};

/**
 * ============================================================
 * Returns a secret from Script Properties.
 * ============================================================
 */
function getSecret(key) {

  return PropertiesService
    .getScriptProperties()
    .getProperty(key);

}

// ============================================================
// CONFIG VALIDATION ON LOAD
// ============================================================
(function validateConfig() {

  var errors = [];

  // Check SPREADSHEET_ID
  var sheetId = getSecret("SPREADSHEET_ID");
  if (!sheetId) {
    errors.push(
      "❌ SPREADSHEET_ID not set in Script Properties."
    );
  }

  // Check SMS_API_TOKEN (if SMS is enabled)
  if (CONFIG.SMS.ENABLED) {
    var token = getSecret("SMS_API_TOKEN");
    if (!token) {
      errors.push(
        "⚠️ SMS_API_TOKEN not set in Script Properties. SMS will fail."
      );
    }
  }

  if (errors.length > 0) {
    Logger.log("=== CONFIG VALIDATION ERRORS ===");
    errors.forEach(function(err) {
      Logger.log(err);
    });
  } else {
    Logger.log("✅ Config loaded successfully!");
    Logger.log("   Version: 7.2");
    Logger.log("   Spreadsheet ID: " + sheetId);
    Logger.log("   SMS Enabled: " + CONFIG.SMS.ENABLED);
  }

})();

// ============================================================
// TEST FUNCTION
// ============================================================
function testConfig() {
  Logger.log("=== Testing Config Module ===");
  Logger.log("Version: 7.2");
  Logger.log("Company: " + CONFIG.COMPANY.NAME);
  Logger.log("RC Number: " + CONFIG.COMPANY.RC_NUMBER);
  Logger.log("Spreadsheet ID: " + getSecret("SPREADSHEET_ID"));
  Logger.log("SMS Enabled: " + CONFIG.SMS.ENABLED);
  Logger.log("SMS Provider: " + CONFIG.SMS.PROVIDER);
  Logger.log("SMS Sender ID: " + CONFIG.SMS.SENDER_ID);
  Logger.log("Staff Phones: " + CONFIG.SMS.STAFF_PHONES.join(", "));
  Logger.log("=== Config Test Complete ===");
}