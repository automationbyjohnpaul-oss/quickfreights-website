/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Config
 * Version: 8.0
 *
 * PURPOSE
 * -------
 * Single Source of Truth (SSOT) for backend configuration.
 *
 * CHANGELOG
 * ---------
 * v8.0 - Added DEBUG section for performance logging and diagnostics
 * v7.9 - Added SUBMISSIONS column map to SHEET_COLUMNS (fixes BL_REFERENCE error)
 * v7.8 - Version bump
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

    SUPPORT_EMAIL: "reception.quickfreightglobal@gmail.com",

    RC_NUMBER: "8106184",
  },

  // ==========================================================
  // CONTACT (Support numbers shown to customers)
  // ==========================================================

  CONTACT: {
    SUPPORT_PHONE: "08037883339",

    SUPPORT_PHONE_INTL: "2348037883339",

    EMAIL: "reception.quickfreightglobal@gmail.com",
  },

  // ==========================================================
  // VALIDATION
  // ==========================================================

  VALIDATION: {
    MIN_BL_LENGTH: 5,

    PHONE_PATTERN: /^234\d{10}$/,

    REQUIRED_FIELDS: ["blReference", "consigneeName", "consigneePhone"],
  },

  // ==========================================================
  // TRACKING
  // ==========================================================

  TRACKING: {
    PREFIX: "QFG",

    RANDOM_LENGTH: 6,
  },

  // ==========================================================
  // GOOGLE SHEETS
  // ==========================================================

  SHEETS: {
    SUBMISSIONS: "Submissions",

    STATUS: "Shipment Status",

    SMS_LOG: "SMS Log",

    ERROR_LOG: "Error Log",
  },

  // ==========================================================
  // DEBUG (Performance logging, diagnostics)
  // ==========================================================

  DEBUG: {
    // Master switch for performance logging
    ENABLE_PERFORMANCE_LOGGING: true, // Set to false for production

    // Log level: DEBUG, INFO, WARN, ERROR
    LOG_LEVEL: "INFO",

    // Whether to include timing in API responses (development only)
    INCLUDE_TIMING_IN_RESPONSE: false, // Always false in production
  },

  // ==========================================================
  // SMS COLUMNS (Status sheet headers for SMS tracking)
  // ==========================================================

  SMS_COLUMNS: {
    SUBMISSION: "Confirmation SMS",

    DISCHARGED: "Discharged SMS",

    PROCESSING: "Processing SMS",

    CLEARED: "Cleared SMS",
  },

  // ==========================================================
  // SMS FLAGS (Event types for status SMS tracking)
  // ==========================================================

  SMS_FLAGS: {
    SUBMISSION: "SUBMISSION",

    DISCHARGED: "DISCHARGED",

    PROCESSING: "PROCESSING",

    CLEARED: "CLEARED",
  },

  // ==========================================================
  // SMS FLAG STATUS (Delivery states)
  // ==========================================================

  SMS_FLAG_STATUS: {
    SENT: "SENT",

    FAILED: "FAILED",

    PENDING: "PENDING",
  },

  // ==========================================================
  // STATUS NOTIFICATION ROUTER (Workflow mapping)
  // ==========================================================

  STATUS_NOTIFICATION: {
    DISCHARGED: {
      flag: "DISCHARGED",
    },

    PROCESSING: {
      flag: "PROCESSING",
    },

    CLEARED: {
      flag: "CLEARED",
    },
  },

  // ==========================================================
  // SHEET COLUMNS (Column numbers by sheet)
  // ==========================================================

  SHEET_COLUMNS: {
    // ==========================================================
    // SUBMISSIONS SHEET — Column mapping
    // Matches the Submissions sheet structure
    // ==========================================================
    SUBMISSIONS: {
      SUBMISSION_ID: 1, // A
      TRACKING_ID: 2, // B
      TIMESTAMP: 3, // C
      BL_REFERENCE: 4, // D
      CONSIGNEE_NAME: 5, // E
      CUSTOMER_PHONE: 6, // F
      SHIPPER_NAME: 7, // G
      EMAIL: 8, // H
      PORT: 9, // I
      ETA: 10, // J
      NOTES: 11, // K
      ATTACHMENT_NAME: 12, // L
      ATTACHMENT_URL: 13, // M
      STATUS: 14, // N
    },

    // ==========================================================
    // STATUS SHEET — Column mapping
    // Matches the Shipment Status sheet structure
    // ==========================================================
    STATUS: {
      TRACKING_ID: 1, // A
      BL_NUMBER: 2, // B
      CUSTOMER_NAME: 3, // C
      CUSTOMER_PHONE: 4, // D
      STATUS: 5, // E
      SMS_SENT: 6, // F
      LAST_UPDATED: 7, // G
      DISCHARGED_SMS: 8, // H
      PROCESSING_SMS: 9, // I
      CLEARED_SMS: 10, // J
    },
  },

  // ==========================================================
  // SHIPMENT STATUS
  // ==========================================================

  STATUS: {
    RECEIVED: "Received",

    DISCHARGED: "Discharged at Port",

    PROCESSING: "Processing & Customs Clearance",

    CLEARED: "Cleared & Ready for Collection",

    DELIVERED: "Delivered",
  },

  // ==========================================================
  // GOOGLE DRIVE
  // ==========================================================

  DRIVE: {
    ROOT_FOLDER: "QuickFreights_Attachments",

    MAX_FILE_SIZE: 10 * 1024 * 1024,

    ALLOWED_TYPES: ["application/pdf", "image/jpeg", "image/png"],
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

    API_ENDPOINT: "https://app.paylessbulksms.com.ng/api/http/sms/send",

    SENDER_ID: "QuickFreigh",

    // -------- STAFF NOTIFICATIONS ------------------------------------
    STAFF_PHONES: ["2349168611825"],

    // -------- RETRY & ERROR HANDLING --------------------------------
    RETRY_LIMIT: 3,

    SUCCESS_KEYWORDS: ["queued", "sent", "successfully", "success", "200"],

    // -------- SMS TYPES ---------------------------------------------
    TYPES: {
      SUBMISSION_CONFIRMATION: "SUBMISSION_CONFIRMATION",

      STATUS_DISCHARGED: "STATUS_DISCHARGED",

      STATUS_PROCESSING: "STATUS_PROCESSING",

      STATUS_CLEARED: "STATUS_CLEARED",

      STAFF_ALERT: "STAFF_ALERT",
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
        "Support: {{supportPhone}}",
    },
  },
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
    errors.forEach(function (err) {
      Logger.log(err);
    });
  } else {
    Logger.log("✅ Config loaded successfully! v8.0");
    Logger.log("   Spreadsheet ID: " + sheetId);
    Logger.log("   SMS Enabled: " + CONFIG.SMS.ENABLED);
    Logger.log(
      "   SUBMISSIONS columns: " +
        Object.keys(CONFIG.SHEET_COLUMNS.SUBMISSIONS).join(", "),
    );
    Logger.log(
      "   STATUS columns: " +
        Object.keys(CONFIG.SHEET_COLUMNS.STATUS).join(", "),
    );
    Logger.log(
      "   Performance Logging: " +
        (CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING ? "ENABLED" : "DISABLED"),
    );
  }
})();

function testConfig() {
  Logger.log("=== Config v8.0 Test ===");
  Logger.log("Company: " + CONFIG.COMPANY.NAME);
  Logger.log("Support: " + CONFIG.CONTACT.SUPPORT_PHONE);
  Logger.log("SMS Templates: " + Object.keys(CONFIG.SMS.TEMPLATES).join(", "));
  Logger.log("SMS Types: " + Object.keys(CONFIG.SMS.TYPES).join(", "));
  Logger.log("SMS Flags: " + Object.keys(CONFIG.SMS_FLAGS).join(", "));
  Logger.log("Statuses: " + Object.keys(CONFIG.STATUS).join(", "));
  Logger.log(
    "Status Notification: " +
      Object.keys(CONFIG.STATUS_NOTIFICATION).join(", "),
  );
  Logger.log(
    "Submissions Columns: " +
      Object.keys(CONFIG.SHEET_COLUMNS.SUBMISSIONS).join(", "),
  );
  Logger.log(
    "Status Columns: " + Object.keys(CONFIG.SHEET_COLUMNS.STATUS).join(", "),
  );
  Logger.log(
    "Performance Logging: " +
      (CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING ? "ENABLED" : "DISABLED"),
  );
  Logger.log("=== Complete ===");
}
