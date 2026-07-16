/**
 * ============================================================
 * Quick Freights Global Limited
 * Legacy Backend Archive
 * ------------------------------------------------------------
 * Version: v5.0
 *
 * Archived:
 * July 2026
 *
 * Replaced By:
 * Backend v6.2 Modular Architecture
 *
 * Status:
 * DO NOT USE
 * Reference only
 * ============================================================
 */

// CONFIGURATION
const SMS_API_TOKEN =
  PropertiesService.getScriptProperties().getProperty("SMS_API_TOKEN") || "";
const SMS_USERNAME =
  PropertiesService.getScriptProperties().getProperty("SMS_USERNAME") || "";
const SMS_PASSWORD =
  PropertiesService.getScriptProperties().getProperty("SMS_PASSWORD") || "";
const SMS_SENDER_ID = "QuickFreigh"; // Production Sender ID (approved 2026-06-25)
const SPREADSHEET_ID =
  PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID") || "";
const SUBMISSIONS_SHEET = "Submissions";
const STATUS_SHEET = "Shipment Status";
const SMS_LOG_SHEET = "SMS Log";

// UPDATED: PDF, JPG, PNG only — removed DOC/DOCX
const ALLOWED_FILE_TYPES = ["pdf", "jpg", "jpeg", "png"];
// UPDATED: 5MB → 10MB
const MAX_FILE_SIZE_BYTES = 10485760;

// ================================================================
// CORS HELPERS
// ================================================================

function createCorsResponse(data) {
  var jsonString = JSON.stringify(data);
  return ContentService.createTextOutput(jsonString)
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    .setHeader("Access-Control-Max-Age", "86400");
}

// ================================================================
// doGet() — Health check with CORS
// ================================================================
function doGet() {
  return createCorsResponse({
    success: true,
    service: "Quick Freights Global Limited API",
    version: "6.1",
    status: "operational",
    timestamp: new Date().toISOString(),
  });
}

// ================================================================
// doOptions() — Handles CORS preflight requests
// ================================================================
function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    .setHeader("Access-Control-Max-Age", "86400");
}

// ================================================================
// doPost() — HANDLES FORM SUBMISSIONS (SYNCHRONIZED v6.1)
// ================================================================
function doPost(e) {
  Logger.log("=== doPost START ===");

  try {
    if (!e || !e.postData) {
      return createCorsResponse({
        success: false,
        error: "Send a POST request with JSON data",
      });
    }

    const data = JSON.parse(e.postData.contents);
    Logger.log(
      "Received: Name=" +
        (data.consigneeName || "N/A") +
        " BL=" +
        (data.blReference || "N/A"),
    );

    // UPDATED: Validate new required fields (4 only)
    if (!data.blReference || !data.consigneeName || !data.consigneePhone) {
      return createCorsResponse({
        success: false,
        error:
          "Missing required fields: blReference, consigneeName, consigneePhone",
      });
    }

    // Phone validation
    const phoneValidated = validatePhone(data.consigneePhone);
    if (!phoneValidated.valid) {
      return createCorsResponse({
        success: false,
        error: phoneValidated.error,
      });
    }
    const cleanPhone = phoneValidated.number;

    const ss = SPREADSHEET_ID
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();
    const submissionsSheet = getOrCreateSheet(ss, SUBMISSIONS_SHEET);
    const statusSheet = getOrCreateSheet(ss, STATUS_SHEET);

    if (!submissionsSheet || !statusSheet) {
      return createCorsResponse({
        success: false,
        error: "Sheet configuration error",
      });
    }

    // UPDATED: Duplicate check uses blReference instead of blNumber
    const lastRow = submissionsSheet.getLastRow();
    if (lastRow > 1) {
      const existingBLs = submissionsSheet
        .getRange(2, 3, lastRow - 1, 1)
        .getValues()
        .flat();
      if (existingBLs.includes(data.blReference)) {
        return createCorsResponse({
          success: false,
          error: "This Bill of Lading number has already been submitted.",
        });
      }
    }

    // Thread-safe tracking ID
    const lock = LockService.getScriptLock();
    let trackingId;
    try {
      lock.waitLock(30000);
      trackingId = generateTrackingId(submissionsSheet);
    } finally {
      lock.releaseLock();
    }

    const timestamp = Utilities.formatDate(
      new Date(),
      "Africa/Lagos",
      "yyyy-MM-dd HH:mm:ss",
    );

    // UPDATED: File attachment — 10MB limit, PDF/JPG/PNG only
    let attachmentLink = "";
    let attachmentName = data.attachmentName || "";

    if (
      data.attachmentData &&
      data.attachmentName &&
      data.attachmentData.length > 100
    ) {
      try {
        const ext = data.attachmentName.split(".").pop().toLowerCase();
        if (!ALLOWED_FILE_TYPES.includes(ext)) {
          attachmentLink =
            "Rejected: ." + ext + " not allowed (PDF, JPG, PNG only)";
        } else {
          const parts = data.attachmentData.split(",");
          if (parts.length >= 2) {
            const base64Data = parts[1];
            if (base64Data.length > MAX_FILE_SIZE_BYTES) {
              attachmentLink = "Rejected: File exceeds 10MB";
            } else {
              const folder = getOrCreateFolder("QuickFreights_Attachments");

              // UPDATED: File naming — TrackingID_BLNumber.ext
              var safeBL = (data.blReference || "NOBL")
                .trim()
                .replace(/[^a-zA-Z0-9]/g, "_")
                .replace(/_+/g, "_")
                .substring(0, 30);

              var originalExt = data.attachmentName.split(".").pop();
              var fileName = trackingId + "_" + safeBL + "." + originalExt;

              Logger.log("fileName = " + fileName);

              const blob = Utilities.newBlob(
                Utilities.base64Decode(base64Data),
                getMimeType(data.attachmentName),
                fileName,
              );
              const file = folder.createFile(blob);
              file.setSharing(
                DriveApp.Access.ANYONE_WITH_LINK,
                DriveApp.Permission.VIEW,
              );
              attachmentLink = file.getUrl();
              Logger.log("File saved: " + attachmentLink);
            }
          }
        }
      } catch (fileError) {
        Logger.log("File error: " + fileError);
        attachmentLink = "Error: " + fileError.toString();
      }
    }

    // UPDATED: Save to submissions sheet with new column mapping
    const rowData = [
      trackingId, // A: Tracking ID
      timestamp, // B: Timestamp
      data.blReference || "", // C: B/L Number
      data.consigneeName || "", // D: Consignee Name
      cleanPhone, // E: Phone Number
      data.consigneeEmail || "", // F: Email
      data.shipperName || "", // G: Shipper Name
      data.portOfDischarge || "", // H: Port of Discharge
      data.expectedArrival || "", // I: Expected Arrival
      data.additionalNotes || "", // J: Additional Notes
      attachmentName, // K: Attachment Name
      attachmentLink, // L: Attachment Link
    ];
    const nextRow = submissionsSheet.getLastRow() + 1;
    submissionsSheet
      .getRange(nextRow, 1, 1, rowData.length)
      .setValues([rowData]);

    // UPDATED: Status sheet with new field names
    const statusRowData = [
      trackingId, // A: Tracking ID
      data.blReference || "", // B: B/L Number
      data.consigneeName || "", // C: Consignee Name
      cleanPhone, // D: Phone Number
      "Received", // E: Status
      "", // F: SMS Sent
      timestamp, // G: Last Updated
    ];
    const statusNextRow = statusSheet.getLastRow() + 1;
    statusSheet
      .getRange(statusNextRow, 1, 1, statusRowData.length)
      .setValues([statusRowData]);

    Logger.log("=== doPost SUCCESS — " + trackingId + " ===");

    return createCorsResponse({
      success: true,
      trackingId: trackingId,
      message: "Submission received successfully",
    });
  } catch (error) {
    Logger.log("=== doPost ERROR: " + error + " ===");
    return createCorsResponse({
      success: false,
      error: error.toString(),
    });
  }
}

// ================================================================
// generateTrackingId() — Uses last row for performance
// ================================================================
function generateTrackingId(sheet) {
  if (!sheet) return "QF-" + new Date().getFullYear() + "-001";

  const year = new Date().getFullYear();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return "QF-" + year + "-001";

  const lastId = sheet.getRange(lastRow, 1).getValue();
  if (lastId && typeof lastId === "string") {
    const match = /^QF-(\d{4})-(\d+)$/.exec(String(lastId).trim());
    if (match && parseInt(match[1]) === year) {
      const seq = parseInt(match[2], 10);
      if (!isNaN(seq))
        return "QF-" + year + "-" + String(seq + 1).padStart(3, "0");
    }
  }

  const ids = sheet
    .getRange(2, 1, lastRow - 1, 1)
    .getValues()
    .flat();
  let maxSeq = 0;

  ids.forEach(function (id) {
    if (id && typeof id === "string") {
      const match = /^QF-(\d{4})-(\d+)$/.exec(String(id).trim());
      if (match && parseInt(match[1]) === year) {
        const seq = parseInt(match[2], 10);
        if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
      }
    }
  });

  return "QF-" + year + "-" + String(maxSeq + 1).padStart(3, "0");
}

// ================================================================
// onEdit() — SMS trigger (case-insensitive, loop-protected)
// ================================================================
function onEdit(e) {
  if (!e || !e.range) return;

  const range = e.range;
  const sheet = range.getSheet();

  if (sheet.getName() !== STATUS_SHEET) return;
  if (range.getColumn() !== 5) return;

  const status = String(range.getValue()).trim().toLowerCase();
  if (status !== "cleared") return;

  const row = range.getRow();
  const smsSent = String(sheet.getRange(row, 6).getValue() || "").trim();
  if (smsSent === "SENT") return;

  const trackingId = sheet.getRange(row, 1).getValue();
  const phoneNumber = String(sheet.getRange(row, 4).getValue() || "").trim();

  if (!phoneNumber) {
    sheet.getRange(row, 6).setValue("FAILED: No phone number");
    return;
  }

  const message =
    "Dear Customer, shipment " +
    trackingId +
    " has cleared Customs. Quick Freights will contact you soon for delivery.";

  Logger.log("Sending SMS to " + phoneNumber);
  const smsResult = sendSMS(phoneNumber, message);

  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  const smsLogSheet = getOrCreateSheet(ss, SMS_LOG_SHEET);
  if (smsLogSheet) {
    const logRow = smsLogSheet.getLastRow() + 1;
    smsLogSheet
      .getRange(logRow, 1, 1, 6)
      .setValues([
        [
          Utilities.formatDate(
            new Date(),
            "Africa/Lagos",
            "yyyy-MM-dd HH:mm:ss",
          ),
          trackingId,
          phoneNumber,
          message,
          smsResult.success ? "SENT" : "FAILED",
          smsResult.response || smsResult.error,
        ],
      ]);
  }

  sheet
    .getRange(row, 6)
    .setValue(
      smsResult.success ? "SENT" : "FAILED: " + (smsResult.error || "Unknown"),
    );
  sheet
    .getRange(row, 7)
    .setValue(
      Utilities.formatDate(new Date(), "Africa/Lagos", "yyyy-MM-dd HH:mm:ss"),
    );

  Logger.log("SMS " + (smsResult.success ? "sent" : "failed"));
}

// ================================================================
// sendSMS()
// ================================================================
function sendSMS(recipient, message) {
  try {
    let clean = recipient.toString().replace(/[\s\+\-\(\)]/g, "");
    if (clean.startsWith("0")) clean = "234" + clean.substring(1);
    if (!clean.startsWith("234")) clean = "234" + clean;

    if (!/^234\d{10}$/.test(clean)) {
      return { success: false, error: "Invalid phone: " + clean };
    }

    const params = {
      api_token: SMS_API_TOKEN,
      recipient: clean,
      message: message,
      sender_id: SMS_SENDER_ID,
    };

    const qs = Object.keys(params)
      .map(function (k) {
        return k + "=" + encodeURIComponent(params[k]);
      })
      .join("&");

    const url = "https://app.paylessbulksms.com.ng/api/http/sms/send?" + qs;

    Logger.log(
      "SMS URL (masked): " + url.replace(SMS_API_TOKEN, "TOKEN_HIDDEN"),
    );

    const response = UrlFetchApp.fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      muteHttpExceptions: true,
    });

    const text = response.getContentText();
    Logger.log("SMS Response: " + text);

    if (
      text.includes("queued") ||
      text.includes("sent") ||
      text.includes("successfully")
    ) {
      return { success: true, response: text };
    }

    if (
      text.includes("not authorized") ||
      text.includes("unauthorized") ||
      text.includes("not approved")
    ) {
      return { success: false, error: "Sender ID not authorized." };
    }

    return { success: false, error: text };
  } catch (error) {
    Logger.log("SMS Error: " + error);
    return { success: false, error: error.toString() };
  }
}

// ================================================================
// validatePhone()
// ================================================================
function validatePhone(phone) {
  if (!phone) return { valid: false, error: "Phone number is required" };

  let clean = phone.toString().replace(/[\s\+\-\(\)]/g, "");
  if (clean.startsWith("0")) clean = "234" + clean.substring(1);
  if (!clean.startsWith("234")) clean = "234" + clean;

  if (!/^234\d{10}$/.test(clean)) {
    return { valid: false, error: "Invalid Nigerian phone number" };
  }

  return { valid: true, number: clean };
}

// ================================================================
// getOrCreateSheet() — UPDATED column headers
// ================================================================
function getOrCreateSheet(ss, sheetName) {
  if (!ss || !sheetName) return null;

  let sheet = ss.getSheetByName(sheetName);
  if (sheet) return sheet;

  try {
    sheet = ss.insertSheet(sheetName);
    if (sheetName === SUBMISSIONS_SHEET) {
      sheet
        .getRange(1, 1, 1, 12)
        .setValues([
          [
            "Tracking ID",
            "Timestamp",
            "B/L Number",
            "Consignee Name",
            "Phone Number",
            "Email",
            "Shipper Name",
            "Port of Discharge",
            "Expected Arrival",
            "Additional Notes",
            "Attachment Name",
            "Attachment Link",
          ],
        ]);
      sheet.setFrozenRows(1);
    } else if (sheetName === STATUS_SHEET) {
      sheet
        .getRange(1, 1, 1, 7)
        .setValues([
          [
            "Tracking ID",
            "B/L Number",
            "Consignee Name",
            "Phone Number",
            "Status",
            "SMS Sent Confirmation",
            "Last Updated",
          ],
        ]);
      sheet.setFrozenRows(1);
      const rule = SpreadsheetApp.newDataValidation()
        .requireValueInList(
          ["Received", "In Transit", "Customs Hold", "Cleared", "Delivered"],
          true,
        )
        .build();
      sheet.getRange("E2:E").setDataValidation(rule);
    } else if (sheetName === SMS_LOG_SHEET) {
      sheet
        .getRange(1, 1, 1, 6)
        .setValues([
          [
            "Timestamp",
            "Tracking ID",
            "Recipient Phone",
            "Message Body",
            "Status",
            "Provider Response",
          ],
        ]);
      sheet.setFrozenRows(1);
    }
    return sheet;
  } catch (error) {
    Logger.log("Sheet creation error: " + error);
    return null;
  }
}

// ================================================================
// getOrCreateFolder()
// ================================================================
function getOrCreateFolder(folderName) {
  if (
    !folderName ||
    typeof folderName !== "string" ||
    folderName.trim() === ""
  ) {
    folderName = "QuickFreights_Attachments";
  }

  var props = PropertiesService.getScriptProperties();
  var cacheKey = "FOLDER_ID_" + folderName;

  var cachedId = props.getProperty(cacheKey);
  if (cachedId) {
    try {
      var folder = DriveApp.getFolderById(cachedId);
      return folder;
    } catch (e) {
      props.deleteProperty(cacheKey);
    }
  }

  try {
    const folders = DriveApp.getFoldersByName(folderName);
    if (folders.hasNext()) {
      var folder = folders.next();
      props.setProperty(cacheKey, folder.getId());
      return folder;
    }
    var newFolder = DriveApp.createFolder(folderName);
    props.setProperty(cacheKey, newFolder.getId());
    return newFolder;
  } catch (error) {
    return DriveApp.createFolder("QuickFreights_Attachments");
  }
}

// ================================================================
// getMimeType() — UPDATED: PDF, JPG, PNG only
// ================================================================
function getMimeType(filename) {
  if (!filename || typeof filename !== "string")
    return "application/octet-stream";
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex < 0) return "application/octet-stream";
  const ext = filename.substring(dotIndex + 1).toLowerCase();
  const mimes = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
  };
  return mimes[ext] || "application/octet-stream";
}

// ================================================================
// SETUP FUNCTIONS
// ================================================================
function setupAll() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty(
    "SMS_API_TOKEN",
    "38|nkXSkfSVYU78KVELmysVprxhCTIduXPlKPhixksq27d36de1",
  );
  props.setProperty(
    "SPREADSHEET_ID",
    SpreadsheetApp.getActiveSpreadsheet().getId(),
  );
  Logger.log("=== SETUP COMPLETE ===");
}

function setupSMSCredentials() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty("SMS_USERNAME", "YOUR_PAYLESS_USERNAME");
  props.setProperty("SMS_PASSWORD", "YOUR_PAYLESS_PASSWORD");
  Logger.log("SMS credentials stored");
}

// ================================================================
// TEST FUNCTIONS
// ================================================================
function testSMS() {
  Logger.log("=== TESTING SMS ===");
  const result = sendSMS("2348037883339", "Test SMS from Quick Freights v6.1!");
  Logger.log("Result: " + JSON.stringify(result));
  if (result.success) {
    Logger.log("✅ SMS SENT!");
  } else {
    Logger.log("❌ FAILED: " + result.error);
  }
}

function testSubmission() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SUBMISSIONS_SHEET);
  if (!sheet) {
    Logger.log("No sheet");
    return;
  }
  const tid = generateTrackingId(sheet);
  const row = sheet.getLastRow() + 1;
  const ts = Utilities.formatDate(
    new Date(),
    "Africa/Lagos",
    "yyyy-MM-dd HH:mm:ss",
  );
  sheet
    .getRange(row, 1, 1, 12)
    .setValues([
      [
        tid,
        ts,
        "MAEU123456789",
        "Test Customer",
        "2348000000000",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
    ]);
  Logger.log("Test row: " + tid);
}

function checkBalance() {
  if (SMS_API_TOKEN) {
    const url =
      "https://app.paylessbulksms.com.ng/api/http/balance?api_token=" +
      SMS_API_TOKEN;
    Logger.log(
      UrlFetchApp.fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        muteHttpExceptions: true,
      }).getContentText(),
    );
  }
}
