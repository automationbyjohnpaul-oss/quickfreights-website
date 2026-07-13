/**
 * ============================================================
 * Quick Freights Global Limited
 * SMS Module
 * ------------------------------------------------------------
 * Module: SMS
 * Version: 7.4
 *
 * PURPOSE
 * -------
 * Builds and sends SMS messages using the backend SSOT.
 *
 * Stage 4.1
 * ----------
 * ✔ Configuration integration
 * ✔ Message builders
 * ✔ Placeholder replacement
 * ✔ Phone normalization
 *
 * Stage 4.2
 * ----------
 * ✔ Payless API integration
 * ✔ sendSMS() core function
 * ✔ testSendSMS() for validation
 * ✔ SMS_API_TOKEN from Script Properties
 *
 * Stage 4.3
 * ----------
 * ✔ SMS logging to sheet using Spreadsheet.gs
 * ✔ buildSMSLogRow()
 * ✔ testSMSLogging()
 *
 * Stage 4.4
 * ----------
 * ✔ Business-level SMS functions
 * ✔ sendSMS() with metadata and logging
 * ✔ sendSubmissionConfirmation()
 * ✔ sendBLWhatsAppConfirmation()
 * ✔ sendStatusUpdate()
 * ✔ sendStaffAlert()
 *
 * CHANGELOG
 * ---------
 * v7.4 - SSOT cleanup: all sheet names from CONFIG.SHEETS
 * v7.3 - Added business functions and metadata support
 * v7.2 - Refactored to use Spreadsheet.gs module
 * v7.1 - Added SMS logging helpers
 * v7.0 - Initial Stage 4.2 completion
 * ============================================================
 */

/**
 * ------------------------------------------------------------
 * Returns whether SMS is enabled.
 * ------------------------------------------------------------
 */
function isSMSEnabled() {
  return CONFIG.SMS.ENABLED === true;
}

/**
 * ------------------------------------------------------------
 * Replace {{placeholders}} inside templates.
 * ------------------------------------------------------------
 */
function replaceSMSPlaceholders(template, data) {
  if (!template) return "";
  for (var key in data) {
    var pattern = new RegExp("{{\\s*" + key + "\\s*}}", "g");
    template = template.replace(pattern, data[key]);
  }
  return template;
}

/**
 * ------------------------------------------------------------
 * Normalize phone number for SMS.
 * Uses Validation SSOT.
 * ------------------------------------------------------------
 */
function normalizeSMSPhone(phone) {
  phone = clean(phone);
  phone = phone.replace(/\s+/g, "");
  phone = phone.replace(/-/g, "");
  if (phone.startsWith("+234")) phone = phone.substring(1);
  if (phone.startsWith("0")) phone = "234" + phone.substring(1);
  if (!CONFIG.VALIDATION.PHONE_PATTERN.test(phone)) return null;
  return phone;
}

/**
 * ------------------------------------------------------------
 * Submission confirmation message.
 * ------------------------------------------------------------
 */
function buildSubmissionMessage(trackingId) {
  return replaceSMSPlaceholders(CONFIG.SMS.TEMPLATES.SUBMISSION_CONFIRMATION, { trackingId: trackingId });
}

/**
 * ------------------------------------------------------------
 * Shipment status update.
 * ------------------------------------------------------------
 */
function buildStatusUpdateMessage(trackingId, status) {
  return replaceSMSPlaceholders(CONFIG.SMS.TEMPLATES.STATUS_UPDATE, { trackingId: trackingId, status: status });
}

/**
 * ------------------------------------------------------------
 * WhatsApp submission confirmation.
 * ------------------------------------------------------------
 */
function buildBLWhatsAppMessage(trackingId) {
  return replaceSMSPlaceholders(CONFIG.SMS.TEMPLATES.BL_WHATSAPP_CONFIRM, { trackingId: trackingId });
}

/**
 * ------------------------------------------------------------
 * Internal staff alert.
 * ------------------------------------------------------------
 */
function buildStaffAlertMessage(blReference, consigneeName, trackingId) {
  return replaceSMSPlaceholders(CONFIG.SMS.TEMPLATES.STAFF_ALERT, { blReference: blReference, consigneeName: consigneeName, trackingId: trackingId });
}

// ============================================================
// STAGE 4.2 — PAYLESS SMS API INTEGRATION
// ============================================================

/**
 * Calls the Payless Bulk SMS API.
 */
function callPaylessAPI(recipient, message) {
  const props = PropertiesService.getScriptProperties();
  const apiToken = props.getProperty("SMS_API_TOKEN");
  if (!apiToken) return { success: false, response: "SMS_API_TOKEN not configured." };

  const params = { api_token: apiToken, recipient: recipient, message: message, sender_id: CONFIG.SMS.SENDER_ID };
  const query = Object.keys(params).map(function (key) { return key + "=" + encodeURIComponent(params[key]); }).join("&");
  const url = CONFIG.SMS.API_ENDPOINT + "?" + query;

  Logger.log("📤 Sending SMS to:", recipient);
  try {
    const response = UrlFetchApp.fetch(url, { method: "get", muteHttpExceptions: true, headers: { Accept: "application/json" } });
    Logger.log("📥 Payless Response:", response.getContentText());
    return { success: true, response: response.getContentText() };
  } catch (error) {
    Logger.log("❌ Payless API Error:", error.toString());
    return { success: false, response: error.toString() };
  }
}

/**
 * Sends one SMS with metadata and automatic logging.
 */
function sendSMS(phone, message, metadata) {
  metadata = metadata || {};
  if (!CONFIG.SMS.ENABLED) return { success: false, message: "SMS disabled." };

  var normalizedPhone = normalizeSMSPhone(phone);
  if (!normalizedPhone) return { success: false, message: "Invalid phone number." };

  const result = callPaylessAPI(normalizedPhone, message);
  if (!result.success) {
    logSMS({ smsType: metadata.smsType || "UNKNOWN", trackingId: metadata.trackingId || "", customerPhone: metadata.customerPhone || phone, recipient: normalizedPhone, message: message, status: "FAILED", providerResponse: result.response, retryCount: 0 });
    return { success: false, message: result.response };
  }

  const responseText = String(result.response).toLowerCase();
  const success = CONFIG.SMS.SUCCESS_KEYWORDS.some(function (keyword) { return responseText.indexOf(keyword.toLowerCase()) !== -1; });

  logSMS({ smsType: metadata.smsType || "UNKNOWN", trackingId: metadata.trackingId || "", customerPhone: metadata.customerPhone || phone, recipient: normalizedPhone, message: message, status: success ? "SENT" : "FAILED", providerResponse: result.response, retryCount: 0 });

  return { success: success, recipient: normalizedPhone, providerResponse: result.response };
}

function testSendSMS() {
  const result = sendSMS("2348037883339", "Quick Freights SMS Test - " + new Date().toISOString(), { smsType: "TEST", trackingId: "QFG-TEST-001", customerPhone: "2348037883339" });
  Logger.log("=== SMS Test Result ===");
  Logger.log(JSON.stringify(result));
  return result;
}

// ============================================================
// STAGE 4.1 — PUBLIC API (Message Builders)
// ============================================================

function sendSubmissionConfirmation(phone, trackingId) {
  return { recipient: normalizeSMSPhone(phone), message: buildSubmissionMessage(trackingId) };
}

function sendStatusUpdate(phone, trackingId, status) {
  return { recipient: normalizeSMSPhone(phone), message: buildStatusUpdateMessage(trackingId, status) };
}

function sendBLWhatsAppNotification(phone, trackingId) {
  return { recipient: normalizeSMSPhone(phone), message: buildBLWhatsAppMessage(trackingId) };
}

function sendStaffAlert(blReference, consigneeName, trackingId) {
  return { recipients: CONFIG.SMS.STAFF_PHONES, message: buildStaffAlertMessage(blReference, consigneeName, trackingId) };
}

// ============================================================
// STAGE 4.3 — SMS LOGGING
// ============================================================

function buildSMSLogRow(data) {
  return [now(), data.smsType || "", data.trackingId || "", data.customerPhone || "", data.recipient || "", data.message || "", data.status || "", data.providerResponse || "", data.retryCount || 0];
}

/**
 * Logs an SMS to the SMS Log sheet.
 * FIXED: Uses CONFIG.SHEETS.SMS_LOG instead of hardcoded "SMS Log"
 */
function logSMS(data) {
  try {
    if (!data.smsType) { Logger.log("⚠️ logSMS: smsType is required"); return false; }
    if (!data.recipient && !data.customerPhone) { Logger.log("⚠️ logSMS: recipient or customerPhone is required"); return false; }

    const sheet = getSheet(CONFIG.SHEETS.SMS_LOG);

    if (!sheet) {
      Logger.log("📋 SMS Log sheet not found. Creating...");
      const spreadsheet = getSpreadsheet();
      const newSheet = spreadsheet.insertSheet(CONFIG.SHEETS.SMS_LOG);
      newSheet.getRange(1, 1, 1, 9).setValues([['Timestamp', 'SMS Type', 'Tracking ID', 'Customer Phone', 'Recipient', 'Message', 'Status', 'Provider Response', 'Retry Count']]);
      newSheet.setFrozenRows(1);
      newSheet.getRange(1, 1, 1, 9).setFontWeight("bold");
      Logger.log("📋 Created SMS Log sheet");

      const sheetAgain = getSheet(CONFIG.SHEETS.SMS_LOG);
      if (!sheetAgain) { Logger.log("❌ Failed to create SMS Log sheet"); return false; }
      sheetAgain.appendRow(buildSMSLogRow(data));
      Logger.log("✅ SMS logged:", { smsType: data.smsType, trackingId: data.trackingId, status: data.status || "SENT" });
      return true;
    }

    sheet.appendRow(buildSMSLogRow(data));
    Logger.log("✅ SMS logged:", { smsType: data.smsType, trackingId: data.trackingId, status: data.status || "SENT" });
    return true;
  } catch (error) {
    Logger.log("❌ logSMS error:", error.message);
    return false;
  }
}

function testSMSLogging() {
  const result = logSMS({ smsType: CONFIG.SMS.TYPES.SUBMISSION_CONFIRMATION || "TEST", trackingId: "QFG-TEST-001", customerPhone: "2348063388230", recipient: "2348037883339", message: "Test SMS log entry.", status: "SENT", providerResponse: "queued...", retryCount: 0 });
  Logger.log("=== SMS Logging Test ===");
  Logger.log("Result:", result);
  return result;
}

/**
 * Updates SMS sent status in the Status sheet.
 * FIXED: Uses CONFIG.SHEETS.STATUS instead of hardcoded "Shipment Status"
 */
function updateSMSSentStatus(trackingId, status) {
  try {
    const sheet = getSheet(CONFIG.SHEETS.STATUS);
    if (!sheet) { Logger.log("⚠️ Status sheet not found."); return false; }

    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return false;

    const trackingIds = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < trackingIds.length; i++) {
      if (trackingIds[i][0] === trackingId) {
        sheet.getRange(i + 2, 6).setValue(status);
        sheet.getRange(i + 2, 7).setValue(now());
        Logger.log("✅ SMS status updated:", { trackingId: trackingId, status: status });
        return true;
      }
    }
    Logger.log("⚠️ Tracking ID not found:", trackingId);
    return false;
  } catch (error) {
    Logger.log("❌ updateSMSSentStatus error:", error.message);
    return false;
  }
}

// ============================================================
// STAGE 4.4 — BUSINESS-LEVEL SMS FUNCTIONS
// ============================================================

function sendSubmissionConfirmationSMS(trackingId, customerPhone) {
  if (!CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION) { Logger.log("ℹ️ Customer SMS confirmations disabled."); return { success: false, skipped: true }; }
  var message = CONFIG.SMS.TEMPLATES.SUBMISSION_CONFIRMATION.replace(/{{\s*trackingId\s*}}/g, trackingId);
  return sendSMS(customerPhone, message, { smsType: CONFIG.SMS.TYPES.SUBMISSION_CONFIRMATION, trackingId: trackingId, customerPhone: customerPhone });
}

function sendBLWhatsAppConfirmation(trackingId, customerPhone) {
  var message = CONFIG.SMS.TEMPLATES.BL_WHATSAPP_CONFIRM.replace(/{{\s*trackingId\s*}}/g, trackingId);
  return sendSMS(customerPhone, message, { smsType: CONFIG.SMS.TYPES.BL_WHATSAPP_CONFIRM, trackingId: trackingId, customerPhone: customerPhone });
}

function sendStatusUpdateSMS(trackingId, customerPhone, status) {
  if (!CONFIG.SMS.SEND_STATUS_UPDATES) { Logger.log("ℹ️ SMS status updates disabled."); return { success: false, skipped: true }; }
  var message = CONFIG.SMS.TEMPLATES.STATUS_UPDATE.replace(/{{\s*trackingId\s*}}/g, trackingId).replace(/{{\s*status\s*}}/g, status);
  return sendSMS(customerPhone, message, { smsType: CONFIG.SMS.TYPES.STATUS_UPDATE, trackingId: trackingId, customerPhone: customerPhone });
}

function sendStaffAlertSMS(trackingId, blReference, consigneeName) {
  if (!CONFIG.SMS.SEND_STAFF_ALERTS) { Logger.log("ℹ️ Staff SMS alerts disabled."); return { success: false, skipped: true }; }
  var message = CONFIG.SMS.TEMPLATES.STAFF_ALERT.replace(/{{\s*trackingId\s*}}/g, trackingId).replace(/{{\s*blReference\s*}}/g, blReference).replace(/{{\s*consigneeName\s*}}/g, consigneeName);
  var results = [];
  var staffNumbers = CONFIG.SMS.STAFF_PHONES || [];
  for (var i = 0; i < staffNumbers.length; i++) {
    results.push({ recipient: staffNumbers[i], result: sendSMS(staffNumbers[i], message, { smsType: CONFIG.SMS.TYPES.STAFF_ALERT, trackingId: trackingId, customerPhone: null }) });
  }
  return { success: results.every(function(r) { return r.result.success; }), results: results };
}

// ============================================================
// TEST FUNCTIONS
// ============================================================

function testSubmissionConfirmation() {
  var result = sendSubmissionConfirmationSMS("QFG-TEST-001", "2348037883339");
  Logger.log("=== Test: Submission Confirmation ===");
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function testStaffAlert() {
  var result = sendStaffAlertSMS("QFG-TEST-001", "MAEU123456789", "Test Consignee");
  Logger.log("=== Test: Staff Alert ===");
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function testStatusUpdate() {
  var result = sendStatusUpdateSMS("QFG-TEST-001", "2348037883339", "Cleared");
  Logger.log("=== Test: Status Update ===");
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}