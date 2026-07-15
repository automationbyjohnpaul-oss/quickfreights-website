/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Config
 * Version: 7.6
 *
 * PURPOSE
 * -------
 * Single Source of Truth (SSOT) for backend configuration.
 *
 * CHANGELOG
 * ---------
 * v7.6 - Added STATUS_NOTIFICATION router for workflow mapping
 * v7.5 - Added SMS_FLAGS, SMS_FLAG_STATUS, updated SMS TYPES,
 *        updated SMS templates with {{supportPhone}},
 *        updated STATUS with customer-friendly labels,
 *        updated STAFF_PHONES
 * v7.4 - Added CONTACT, SMS_COLUMNS, SHEET_COLUMNS sections
 * v7.3 - Removed duplicate MAX_RETRIES, kept only RETRY_LIMIT
 * v7.2 - SSOT cleanup
 * ============================================================
 */

const CONFIG = {

  // ==========================================================
  // COMPANY
  // ==========================================================

  COMPANY: {

    NAME: "Quick Freights Global Limited",

    SHORT_NAME: "Quick Freights",

    TAGLINE: "Very Fast Delivery",

    TIMEZONE: "Africa/Lagos",

    WEBSITE:
      "https://automationbyjohnpaul-oss.github.io/quickfreights-website/",

    SUPPORT_EMAIL:
      "reception.quickfreightglobal@gmail.com",

    RC_NUMBER: "8106184"

  },

  // ==========================================================
  // CONTACT (Support numbers shown to customers)
  // ==========================================================

  CONTACT: {

    SUPPORT_PHONE: "08037883339",

    SUPPORT_PHONE_INTL: "2348037883339",

    EMAIL: "reception.quickfreightglobal@gmail.com"

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
  // SMS COLUMNS (Status sheet headers for SMS tracking)
  // ==========================================================

  SMS_COLUMNS: {

    SUBMISSION: "Confirmation SMS",

    DISCHARGED: "Discharged SMS",

    PROCESSING: "Processing SMS",

    CLEARED: "Cleared SMS"

  },

  // ==========================================================
  // SMS FLAGS (Event types for status SMS tracking)
  // ==========================================================

  SMS_FLAGS: {

    SUBMISSION: "SUBMISSION",

    DISCHARGED: "DISCHARGED",

    PROCESSING: "PROCESSING",

    CLEARED: "CLEARED"

  },

  // ==========================================================
  // SMS FLAG STATUS (Delivery states)
  // ==========================================================

  SMS_FLAG_STATUS: {

    SENT: "SENT",

    FAILED: "FAILED",

    PENDING: "PENDING"

  },

  // ==========================================================
  // STATUS NOTIFICATION ROUTER (Workflow mapping)
  // ==========================================================

  STATUS_NOTIFICATION: {

    DISCHARGED: {
      flag: "DISCHARGED"
    },

    PROCESSING: {
      flag: "PROCESSING"
    },

    CLEARED: {
      flag: "CLEARED"
    }

  },

  // ==========================================================
  // SHEET COLUMNS (Column numbers by sheet)
  // ==========================================================

  SHEET_COLUMNS: {

    STATUS: {

      TRACKING_ID: 1,

      BL_NUMBER: 2,

      CUSTOMER_NAME: 3,

      CUSTOMER_PHONE: 4,

      STATUS: 5,

      SMS_SENT: 6,

      LAST_UPDATED: 7,

      DISCHARGED_SMS: 8,

      PROCESSING_SMS: 9,

      CLEARED_SMS: 10

    }

  },

  // ==========================================================
  // SHIPMENT STATUS
  // ==========================================================

  STATUS: {

    RECEIVED: "Received",

    DISCHARGED: "Discharged at Port",

    PROCESSING: "Processing & Customs Clearance",

    CLEARED: "Cleared & Ready for Collection",

    DELIVERED: "Delivered"

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

    SENDER_ID: "QuickFreigh",

    // -------- STAFF NOTIFICATIONS ------------------------------------
    STAFF_PHONES: [
      "2349168611825"
    ],

    // -------- RETRY & ERROR HANDLING --------------------------------
    RETRY_LIMIT: 3,

    SUCCESS_KEYWORDS: [
      "queued", "sent", "successfully", "success", "200"
    ],

    // -------- SMS TYPES ---------------------------------------------
    TYPES: {

      SUBMISSION_CONFIRMATION: "SUBMISSION_CONFIRMATION",

      STATUS_DISCHARGED: "STATUS_DISCHARGED",

      STATUS_PROCESSING: "STATUS_PROCESSING",

      STATUS_CLEARED: "STATUS_CLEARED",

      STAFF_ALERT: "STAFF_ALERT"

    },

    // -------- SMS TEMPLATES -----------------------------------------
    TEMPLATES: {

      SUBMISSION_CONFIRMATION:
        "Dear Customer,\n\n" +
        "Your cargo documents have been received and are being processed.\n\n" +
        "Tracking ID: {{trackingId}}\n\n" +
        "We will notify you when your shipment status changes.\n\n" +
        "Thank you for choosing Quick Freights Global Limited.\n" +
        "Support: {{supportPhone}}",

      STAFF_ALERT:
        "🔔 NEW SUBMISSION\n" +
        "B/L: {{blReference}}\n" +
        "Consignee: {{consigneeName}}\n" +
        "Tracking: {{trackingId}}\n\n" +
        "Please process immediately.",

      STATUS_DISCHARGED:
        "Quick Freights Update\n\n" +
        "Your shipment has been discharged at the port. Clearance has commenced.\n\n" +
        "Tracking: {{trackingId}}\n" +
        "Support: {{supportPhone}}",

      STATUS_PROCESSING:
        "Quick Freights Update\n\n" +
        "Customs clearance is in progress. Our team is actively managing your shipment.\n\n" +
        "Tracking: {{trackingId}}\n" +
        "Support: {{supportPhone}}",

      STATUS_CLEARED:
        "Quick Freights Update\n\n" +
        "Great news! Your shipment has been cleared and is ready for collection.\n\n" +
        "Tracking: {{trackingId}}\n" +
        "Support: {{supportPhone}}"

    }

  }

};

/**
 * Returns a secret from Script Properties.
 */
function getSecret(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

// ============================================================
// CONFIG VALIDATION ON LOAD
// ============================================================
(function validateConfig() {
  var errors = [];
  var sheetId = getSecret("SPREADSHEET_ID");
  if (!sheetId) errors.push("❌ SPREADSHEET_ID not set in Script Properties.");
  if (CONFIG.SMS.ENABLED) {
    var token = getSecret("SMS_API_TOKEN");
    if (!token) errors.push("⚠️ SMS_API_TOKEN not set in Script Properties.");
  }
  if (errors.length > 0) {
    Logger.log("=== CONFIG VALIDATION ERRORS ===");
    errors.forEach(function(err) { Logger.log(err); });
  } else {
    Logger.log("✅ Config loaded successfully! v7.6");
    Logger.log("   Spreadsheet ID: " + sheetId);
    Logger.log("   SMS Enabled: " + CONFIG.SMS.ENABLED);
  }
})();

function testConfig() {
  Logger.log("=== Config v7.6 Test ===");
  Logger.log("Company: " + CONFIG.COMPANY.NAME);
  Logger.log("Support: " + CONFIG.CONTACT.SUPPORT_PHONE);
  Logger.log("SMS Templates: " + Object.keys(CONFIG.SMS.TEMPLATES).join(", "));
  Logger.log("SMS Types: " + Object.keys(CONFIG.SMS.TYPES).join(", "));
  Logger.log("SMS Flags: " + Object.keys(CONFIG.SMS_FLAGS).join(", "));
  Logger.log("Statuses: " + Object.keys(CONFIG.STATUS).join(", "));
  Logger.log("Status Notification: " + Object.keys(CONFIG.STATUS_NOTIFICATION).join(", "));
  Logger.log("=== Complete ===");
}