/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Sheets
 * Version: 7.2
 *
 * PURPOSE
 * -------
 * Handles ALL Google Sheets operations.
 * Owns ALL column knowledge and spreadsheet I/O.
 *
 * CHANGELOG
 * ---------
 * v7.2 - Removed duplicate COLUMNS (now using CONFIG.SHEET_COLUMNS.SUBMISSIONS),
 *        deleted test functions (syncSubmissionsToStatus, testSMSQuick,
 *        testQuickSMS, findWorkingSender)
 * v7.1 - Fixed: CONFIG.SMS_FLAG_STATUS → CONFIG.SMS_FLAGS,
 *        hardcoded "Received" → CONFIG.STATUS.RECEIVED,
 *        Logger.log → logInfo
 * v7.0 - Added getStatusChangeContext(), markSMSFlag()
 * ============================================================
 */

function getSubmissionSheet() {
  return getSheet(CONFIG.SHEETS.SUBMISSIONS);
}

function getStatusSheet() {
  return getSheet(CONFIG.SHEETS.STATUS);
}

function getNextSubmissionID() {
  const sheet = getSubmissionSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return 1;
  return Number(sheet.getRange(lastRow, 1).getValue()) + 1;
}

function findSubmissionByBL(blReference) {
  const sheet = getSubmissionSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return null;
  const cols = CONFIG.SHEET_COLUMNS.SUBMISSIONS;
  const values = sheet
    .getRange(2, cols.BL_REFERENCE, lastRow - 1, 1)
    .getValues();
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === blReference) return { exists: true, row: i + 2 };
  }
  return null;
}

function saveSubmission(data, trackingId, attachmentUrl, attachmentId) {
  try {
    const sheet = getSubmissionSheet();
    const submissionID = getNextSubmissionID();
    const timestamp = now();
    const rowData = [
      submissionID,
      trackingId,
      timestamp,
      data.blReference,
      data.consigneeName,
      data.consigneePhone,
      data.shipperName || "",
      data.consigneeEmail || "",
      data.portOfDischarge || "",
      data.expectedArrival || "",
      data.additionalNotes || "",
      data.attachmentName || "",
      attachmentUrl || "",
      CONFIG.STATUS.RECEIVED,
    ];
    sheet.appendRow(rowData);
    logInfo("Sheets", "Submission saved: " + trackingId);
    return submissionID;
  } catch (error) {
    logError("Sheets", "saveSubmission", error.message, data, error.stack);
    throw error;
  }
}

function updateSubmissionStatus(trackingId, newStatus) {
  try {
    const sheet = getStatusSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return false;
    const cols = CONFIG.SHEET_COLUMNS.STATUS;
    const trackingIds = sheet
      .getRange(2, cols.TRACKING_ID, lastRow - 1, 1)
      .getValues();
    for (let i = 0; i < trackingIds.length; i++) {
      if (trackingIds[i][0] === trackingId) {
        const row = i + 2;
        sheet.getRange(row, cols.STATUS).setValue(newStatus);
        sheet.getRange(row, cols.LAST_UPDATED).setValue(now());
        logInfo("Sheets", "Status updated: " + trackingId + " → " + newStatus);
        return true;
      }
    }
    return false;
  } catch (error) {
    logError(
      "Sheets",
      "updateSubmissionStatus",
      error.message,
      null,
      error.stack,
    );
    return false;
  }
}

// ============================================================
// STAGE 4.5 — STATUS CHANGE CONTEXT (for Triggers.gs)
// ============================================================

function getStatusChangeContext(row) {
  var sheet = getSheet(CONFIG.SHEETS.STATUS);
  var cols = CONFIG.SHEET_COLUMNS.STATUS;

  var status = String(sheet.getRange(row, cols.STATUS).getValue()).trim();

  var flagColMap = {
    [CONFIG.STATUS.DISCHARGED]: cols.DISCHARGED_SMS,
    [CONFIG.STATUS.PROCESSING]: cols.PROCESSING_SMS,
    [CONFIG.STATUS.CLEARED]: cols.CLEARED_SMS,
  };

  var flagCol = flagColMap[status] || null;
  var existingFlag = flagCol
    ? String(sheet.getRange(row, flagCol).getValue() || "").trim()
    : "";

  return {
    trackingId: sheet.getRange(row, cols.TRACKING_ID).getValue(),
    phone: String(
      sheet.getRange(row, cols.CUSTOMER_PHONE).getValue() || "",
    ).trim(),
    status: status,
    smsAlreadySent: existingFlag === CONFIG.SMS_FLAGS.SENT,
    row: row,
  };
}

function markSMSFlag(row, flagType) {
  var cols = CONFIG.SHEET_COLUMNS.STATUS;

  var colMap = {
    [CONFIG.SMS_FLAGS.DISCHARGED]: cols.DISCHARGED_SMS,
    [CONFIG.SMS_FLAGS.PROCESSING]: cols.PROCESSING_SMS,
    [CONFIG.SMS_FLAGS.CLEARED]: cols.CLEARED_SMS,
  };

  var column = colMap[flagType];
  if (!column) return;

  var sheet = getSheet(CONFIG.SHEETS.STATUS);
  sheet.getRange(row, column).setValue(CONFIG.SMS_FLAGS.SENT);
}

// ============================================================
// ERROR LOGGING
// ============================================================

function logErrorToSheet(module, functionName, errorMessage, context) {
  try {
    let sheet = getSheet(CONFIG.SHEETS.ERROR_LOG);
    if (!sheet) {
      sheet = getSpreadsheet().insertSheet(CONFIG.SHEETS.ERROR_LOG);
      sheet
        .getRange(1, 1, 1, 6)
        .setValues([
          ["Timestamp", "Module", "Function", "Error", "Context", "Stack"],
        ]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      now(),
      module,
      functionName,
      errorMessage,
      context ? JSON.stringify(context) : "",
      "",
    ]);
  } catch (error) {
    logError("Sheets", "logErrorToSheet", error.message);
  }
}

// ============================================================
// SHEET SETUP
// ============================================================

function createAllSheets() {
  const sheets = {
    [CONFIG.SHEETS.SUBMISSIONS]: [
      "Submission ID",
      "Tracking ID",
      "Timestamp",
      "B/L Reference",
      "Consignee Name",
      "Consignee Phone",
      "Shipper Name",
      "Consignee Email",
      "Port of Discharge",
      "Expected Arrival",
      "Additional Notes",
      "Attachment Name",
      "Attachment URL",
      "Status",
    ],
    [CONFIG.SHEETS.STATUS]: [
      "Tracking ID",
      "B/L Number",
      "Customer Name",
      "Phone Number",
      "Status",
      "SMS Sent Confirmation",
      "Last Updated",
      "Discharged SMS",
      "Processing SMS",
      "Cleared SMS",
    ],
    [CONFIG.SHEETS.SMS_LOG]: [
      "Timestamp",
      "Tracking ID",
      "Recipient Phone",
      "Message Body",
      "Status",
      "Provider Response",
    ],
    [CONFIG.SHEETS.ERROR_LOG]: [
      "Timestamp",
      "Module",
      "Function",
      "Error",
      "Context",
      "Stack",
    ],
  };

  for (const [sheetName, headers] of Object.entries(sheets)) {
    let sheet = getSheet(sheetName);
    if (!sheet) {
      sheet = getSpreadsheet().insertSheet(sheetName);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      logInfo("Sheets", "Created sheet: " + sheetName);
    }
  }

  const statusSheet = getSheet(CONFIG.SHEETS.STATUS);
  if (statusSheet) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(
        [
          CONFIG.STATUS.RECEIVED,
          CONFIG.STATUS.DISCHARGED,
          CONFIG.STATUS.PROCESSING,
          CONFIG.STATUS.CLEARED,
          CONFIG.STATUS.DELIVERED,
        ],
        true,
      )
      .build();
    // FIX: Use column index from CONFIG instead of hardcoded 'E2:E'
    const statusCol = CONFIG.SHEET_COLUMNS.STATUS.STATUS;
    const lastRow = statusSheet.getLastRow() || 1000;
    statusSheet.getRange(2, statusCol, lastRow - 1, 1).setDataValidation(rule);
  }

  logInfo("Sheets", "All sheets created successfully.");
}

function testSheetsModule() {
  logInfo("Sheets", "=== Sheets v7.2 Test ===");
  try {
    logInfo("Sheets", "Submissions: " + getSubmissionSheet().getName());
  } catch (e) {
    logError("Sheets", "testSheetsModule", e.message);
  }
  try {
    logInfo("Sheets", "Status: " + getStatusSheet().getName());
  } catch (e) {
    logError("Sheets", "testSheetsModule", e.message);
  }
  logInfo("Sheets", "=== Complete ===");
}
