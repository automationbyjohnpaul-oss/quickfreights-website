/**
 * ============================================================
 * Quick Freights Global Limited
 * SMS Module
 * ------------------------------------------------------------
 * Module: SMS
 * Version: 8.1
 *
 * PURPOSE
 * -------
 * Builds and sends SMS messages using the backend SSOT.
 * Handles business rules ONLY — NO spreadsheet access.
 *
 * CHANGELOG
 * ---------
 * v8.1 - Removed processStatusChange() (moved to Status.gs)
 * v8.0 - Added dedicated status SMS functions, STATUS_ROUTER,
 *        removed legacy builders, removed updateSMSSentStatus
 * v7.5 - Added buildTemplateSMS() helper with SSOT values
 * v7.4 - SSOT cleanup: all sheet names from CONFIG.SHEETS
 * ============================================================
 */

function isSMSEnabled() {
  return CONFIG.SMS.ENABLED === true;
}

// ============================================================
// PLACEHOLDER & TEMPLATE HELPERS
// ============================================================

function replaceSMSPlaceholders(template, data) {
  if (!template) return "";
  for (var key in data) {
    var pattern = new RegExp("{{\\s*" + key + "\\s*}}", "g");
    template = template.replace(pattern, data[key]);
  }
  return template;
}

function buildTemplateSMS(template, data) {
  var values = Object.assign({
    supportPhone: CONFIG.CONTACT.SUPPORT_PHONE,
    supportPhoneIntl: CONFIG.CONTACT.SUPPORT_PHONE_INTL,
    companyName: CONFIG.COMPANY.NAME,
    shortName: CONFIG.COMPANY.SHORT_NAME,
    rcNumber: CONFIG.COMPANY.RC_NUMBER,
    website: CONFIG.COMPANY.WEBSITE,
    supportEmail: CONFIG.CONTACT.EMAIL
  }, data || {});
  return replaceSMSPlaceholders(template, values);
}

// ============================================================
// PHONE NORMALIZATION
// ============================================================

function normalizeSMSPhone(phone) {
  phone = clean(phone);
  phone = phone.replace(/\s+/g, "").replace(/-/g, "");
  if (phone.startsWith("+234")) phone = phone.substring(1);
  if (phone.startsWith("0")) phone = "234" + phone.substring(1);
  if (!CONFIG.VALIDATION.PHONE_PATTERN.test(phone)) return null;
  return phone;
}

// ============================================================
// PAYLESS SMS API
// ============================================================

function callPaylessAPI(recipient, message) {
  const props = PropertiesService.getScriptProperties();
  const apiToken = props.getProperty("SMS_API_TOKEN");
  if (!apiToken) return { success: false, response: "SMS_API_TOKEN not configured." };

  const params = {
    api_token: apiToken,
    recipient: recipient,
    message: message,
    sender_id: CONFIG.SMS.SENDER_ID
  };
  const query = Object.keys(params).map(function (key) {
    return key + "=" + encodeURIComponent(params[key]);
  }).join("&");
  const url = CONFIG.SMS.API_ENDPOINT + "?" + query;

  try {
    const response = UrlFetchApp.fetch(url, {
      method: "get",
      muteHttpExceptions: true,
      headers: { Accept: "application/json" }
    });
    return { success: true, response: response.getContentText() };
  } catch (error) {
    return { success: false, response: error.toString() };
  }
}

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
  const success = CONFIG.SMS.SUCCESS_KEYWORDS.some(function (keyword) {
    return responseText.indexOf(keyword.toLowerCase()) !== -1;
  });

  logSMS({ smsType: metadata.smsType || "UNKNOWN", trackingId: metadata.trackingId || "", customerPhone: metadata.customerPhone || phone, recipient: normalizedPhone, message: message, status: success ? "SENT" : "FAILED", providerResponse: result.response, retryCount: 0 });

  return { success: success, recipient: normalizedPhone, providerResponse: result.response };
}

// ============================================================
// SMS LOGGING
// ============================================================

function buildSMSLogRow(data) {
  return [now(), data.smsType || "", data.trackingId || "", data.customerPhone || "", data.recipient || "", data.message || "", data.status || "", data.providerResponse || "", data.retryCount || 0];
}

function logSMS(data) {
  try {
    if (!data.smsType) return false;
    let sheet = getSheet(CONFIG.SHEETS.SMS_LOG);
    if (!sheet) {
      sheet = getSpreadsheet().insertSheet(CONFIG.SHEETS.SMS_LOG);
      sheet.getRange(1, 1, 1, 9).setValues([['Timestamp', 'SMS Type', 'Tracking ID', 'Customer Phone', 'Recipient', 'Message', 'Status', 'Provider Response', 'Retry Count']]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow(buildSMSLogRow(data));
    return true;
  } catch (error) {
    Logger.log("❌ logSMS error:", error.message);
    return false;
  }
}

// ============================================================
// STAGE 4.4 — BUSINESS-LEVEL SMS FUNCTIONS
// ============================================================

function sendSubmissionConfirmationSMS(trackingId, customerPhone) {
  if (!CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION) return { success: false, skipped: true };
  var message = buildTemplateSMS(CONFIG.SMS.TEMPLATES.SUBMISSION_CONFIRMATION, { trackingId: trackingId });
  return sendSMS(customerPhone, message, { smsType: CONFIG.SMS.TYPES.SUBMISSION_CONFIRMATION, trackingId: trackingId, customerPhone: customerPhone });
}

function sendStaffAlertSMS(trackingId, blReference, consigneeName) {
  if (!CONFIG.SMS.SEND_STAFF_ALERTS) return { success: false, skipped: true };
  var message = buildTemplateSMS(CONFIG.SMS.TEMPLATES.STAFF_ALERT, { blReference: blReference, consigneeName: consigneeName, trackingId: trackingId });
  var results = [];
  var staffNumbers = CONFIG.SMS.STAFF_PHONES || [];
  for (var i = 0; i < staffNumbers.length; i++) {
    results.push({ recipient: staffNumbers[i], result: sendSMS(staffNumbers[i], message, { smsType: CONFIG.SMS.TYPES.STAFF_ALERT, trackingId: trackingId, customerPhone: null }) });
  }
  return { success: results.every(function(r) { return r.result.success; }), results: results };
}

// ============================================================
// STAGE 4.5 — DEDICATED STATUS SMS FUNCTIONS
// ============================================================

function sendStatusDischargedSMS(trackingId, customerPhone) {
  if (!CONFIG.SMS.SEND_STATUS_UPDATES) return { success: false, skipped: true };
  var message = buildTemplateSMS(CONFIG.SMS.TEMPLATES.STATUS_DISCHARGED, { trackingId: trackingId });
  return sendSMS(customerPhone, message, { smsType: CONFIG.SMS.TYPES.STATUS_DISCHARGED, trackingId: trackingId, customerPhone: customerPhone });
}

function sendStatusProcessingSMS(trackingId, customerPhone) {
  if (!CONFIG.SMS.SEND_STATUS_UPDATES) return { success: false, skipped: true };
  var message = buildTemplateSMS(CONFIG.SMS.TEMPLATES.STATUS_PROCESSING, { trackingId: trackingId });
  return sendSMS(customerPhone, message, { smsType: CONFIG.SMS.TYPES.STATUS_PROCESSING, trackingId: trackingId, customerPhone: customerPhone });
}

function sendStatusClearedSMS(trackingId, customerPhone) {
  if (!CONFIG.SMS.SEND_STATUS_UPDATES) return { success: false, skipped: true };
  var message = buildTemplateSMS(CONFIG.SMS.TEMPLATES.STATUS_CLEARED, { trackingId: trackingId });
  return sendSMS(customerPhone, message, { smsType: CONFIG.SMS.TYPES.STATUS_CLEARED, trackingId: trackingId, customerPhone: customerPhone });
}

// ============================================================
// TEST FUNCTIONS
// ============================================================

function testSendSMS() {
  var result = sendSMS("2348037883339", "Quick Freights SMS Test - " + new Date().toISOString(), { smsType: "TEST", trackingId: "QFG-TEST-001" });
  Logger.log("=== SMS Test: " + JSON.stringify(result));
  return result;
}

function testStatusDischarged() {
  var result = sendStatusDischargedSMS("QFG-TEST-001", "2348037883339");
  Logger.log("=== Discharged SMS: " + JSON.stringify(result));
  return result;
}