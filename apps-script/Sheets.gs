/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Sheets
 * Version: 6.4
 *
 * PURPOSE
 * -------
 * Handles ALL Google Sheets operations.
 * Uses getSheet() from Spreadsheet.gs — never opens spreadsheet directly.
 *
 * CHANGELOG
 * ---------
 * v6.4 - SSOT cleanup: removed all CONFIG.DATABASE references,
 *        uses getSheet()/getSpreadsheet() exclusively
 * v6.3 - Fixed column mapping for V1 schema
 * v6.2 - Initial production foundation
 * ============================================================
 */


// ============================================================
// COLUMN MAPPING — MATCHES YOUR SPREADSHEET
// ============================================================
const COLUMNS = {
    SUBMISSION_ID: 1,      // A
    TRACKING_ID: 2,        // B
    TIMESTAMP: 3,          // C
    BL_REFERENCE: 4,       // D
    CONSIGNEE_NAME: 5,     // E
    PHONE_NUMBER: 6,       // F
    SHIPPER_NAME: 7,       // G
    EMAIL: 8,              // H
    PORT: 9,               // I
    ETA: 10,               // J
    ADDITIONAL_NOTES: 11,  // K
    ATTACHMENT_NAME: 12,   // L
    ATTACHMENT_LINK: 13,   // M
    STATUS: 14             // N
};

// ============================================================
// PUBLIC FUNCTIONS
// ============================================================

/**
 * Returns the Submissions worksheet.
 */
function getSubmissionSheet() {
    return getSheet(CONFIG.SHEETS.SUBMISSIONS);
}

/**
 * Returns the Status worksheet.
 */
function getStatusSheet() {
    return getSheet(CONFIG.SHEETS.STATUS);
}

/**
 * Returns the next internal Submission ID.
 */
function getNextSubmissionID() {
    const sheet = getSubmissionSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return 1;
    const lastValue = sheet.getRange(lastRow, COLUMNS.SUBMISSION_ID).getValue();
    return Number(lastValue) + 1;
}

/**
 * Finds an existing submission using Bill of Lading Number.
 */
function findSubmissionByBL(blReference) {
    const sheet = getSubmissionSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return null;
    const values = sheet.getRange(2, COLUMNS.BL_REFERENCE, lastRow - 1, 1).getValues();
    for (let i = 0; i < values.length; i++) {
        if (values[i][0] === blReference) {
            return { exists: true, row: i + 2 };
        }
    }
    return null;
}

/**
 * Saves a submission with attachment metadata.
 */
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
            "Received"
        ];

        sheet.appendRow(rowData);
        logInfo("Sheets", "Submission saved: " + trackingId + (attachmentUrl ? " (with attachment)" : ""));
        return submissionID;
    } catch (error) {
        logError("Sheets", "saveSubmission", error.message, data, error.stack);
        throw error;
    }
}

/**
 * Updates the status of a submission.
 */
function updateSubmissionStatus(trackingId, newStatus) {
    try {
        const sheet = getStatusSheet();
        const lastRow = sheet.getLastRow();
        if (lastRow <= 1) return false;
        const trackingIds = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        for (let i = 0; i < trackingIds.length; i++) {
            if (trackingIds[i][0] === trackingId) {
                const row = i + 2;
                sheet.getRange(row, 5).setValue(newStatus);
                sheet.getRange(row, 7).setValue(now());
                logInfo("Sheets", "Status updated: " + trackingId + " → " + newStatus);
                return true;
            }
        }
        return false;
    } catch (error) {
        logError("Sheets", "updateSubmissionStatus", error.message, { trackingId, newStatus }, error.stack);
        return false;
    }
}

/**
 * Updates the SMS sent status for a submission.
 */
function updateSMSSentStatus(trackingId, status) {
    try {
        const sheet = getStatusSheet();
        const lastRow = sheet.getLastRow();
        if (lastRow <= 1) return false;
        const trackingIds = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        for (let i = 0; i < trackingIds.length; i++) {
            if (trackingIds[i][0] === trackingId) {
                const row = i + 2;
                sheet.getRange(row, 6).setValue(status);
                sheet.getRange(row, 7).setValue(now());
                logInfo("Sheets", "SMS status updated: " + trackingId + " → " + status);
                return true;
            }
        }
        return false;
    } catch (error) {
        logError("Sheets", "updateSMSSentStatus", error.message, { trackingId, status }, error.stack);
        return false;
    }
}

/**
 * Logs an SMS to the SMS Log sheet.
 */
function logSMS(trackingId, phoneNumber, message, status, response) {
    try {
        let sheet = getSheet(CONFIG.SHEETS.SMS_LOG);
        if (!sheet) {
            sheet = getSpreadsheet().insertSheet(CONFIG.SHEETS.SMS_LOG);
            sheet.getRange(1, 1, 1, 6).setValues([[
                'Timestamp', 'Tracking ID', 'Recipient Phone',
                'Message Body', 'Status', 'Provider Response'
            ]]);
            sheet.setFrozenRows(1);
        }
        sheet.appendRow([now(), trackingId, phoneNumber, message, status, response || '']);
        logInfo("Sheets", "SMS logged: " + trackingId + " → " + status);
    } catch (error) {
        logError("Sheets", "logSMS", error.message, { trackingId, phoneNumber, status }, error.stack);
    }
}

/**
 * Logs an error to the Error Log sheet.
 */
function logErrorToSheet(module, functionName, errorMessage, context) {
    try {
        let sheet = getSheet(CONFIG.SHEETS.ERROR_LOG);
        if (!sheet) {
            sheet = getSpreadsheet().insertSheet(CONFIG.SHEETS.ERROR_LOG);
            sheet.getRange(1, 1, 1, 6).setValues([[
                'Timestamp', 'Module', 'Function', 'Error', 'Context', 'Stack'
            ]]);
            sheet.setFrozenRows(1);
        }
        sheet.appendRow([now(), module, functionName, errorMessage, context ? JSON.stringify(context) : '', '']);
    } catch (error) {
        Logger.log('Failed to log error to sheet:', error.message);
    }
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function now() {
    return Utilities.formatDate(new Date(), CONFIG.COMPANY.TIMEZONE || 'Africa/Lagos', 'yyyy-MM-dd HH:mm:ss');
}

function validateSheets() {
    const errors = [];
    const requiredSheets = [
        CONFIG.SHEETS.SUBMISSIONS,
        CONFIG.SHEETS.STATUS,
        CONFIG.SHEETS.SMS_LOG,
        CONFIG.SHEETS.ERROR_LOG
    ];
    requiredSheets.forEach(function(sheetName) {
        const sheet = getSheet(sheetName);
        if (!sheet) errors.push('Missing sheet: ' + sheetName);
    });
    return { success: errors.length === 0, errors: errors };
}

function createAllSheets() {
    const sheets = {
        [CONFIG.SHEETS.SUBMISSIONS]: [
            'Submission ID', 'Tracking ID', 'Timestamp', 'B/L Reference',
            'Consignee Name', 'Consignee Phone', 'Shipper Name',
            'Consignee Email', 'Port of Discharge', 'Expected Arrival',
            'Additional Notes', 'Attachment Name', 'Attachment URL',
            'Attachment ID', 'Status'
        ],
        [CONFIG.SHEETS.STATUS]: [
            'Tracking ID', 'B/L Number', 'Customer Name', 'Phone Number',
            'Status', 'SMS Sent Confirmation', 'Last Updated'
        ],
        [CONFIG.SHEETS.SMS_LOG]: [
            'Timestamp', 'Tracking ID', 'Recipient Phone',
            'Message Body', 'Status', 'Provider Response'
        ],
        [CONFIG.SHEETS.ERROR_LOG]: [
            'Timestamp', 'Module', 'Function', 'Error', 'Context', 'Stack'
        ]
    };

    for (const [sheetName, headers] of Object.entries(sheets)) {
        let sheet = getSheet(sheetName);
        if (!sheet) {
            sheet = getSpreadsheet().insertSheet(sheetName);
            sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
            sheet.setFrozenRows(1);
            Logger.log('Created sheet:', sheetName);
        }
    }

    const statusSheet = getSheet(CONFIG.SHEETS.STATUS);
    if (statusSheet) {
        const rule = SpreadsheetApp.newDataValidation()
            .requireValueInList(['Received', 'In Transit', 'Customs Hold', 'Cleared', 'Delivered'], true)
            .build();
        statusSheet.getRange('E2:E').setDataValidation(rule);
    }

    Logger.log('✅ All sheets created successfully.');
}

function testSheetsModule() {
    Logger.log('=== Testing Sheets Module ===');
    const validation = validateSheets();
    Logger.log('Sheet validation:', validation.success ? '✅ PASS' : '❌ FAIL');
    if (!validation.success) { Logger.log('Errors:', validation.errors); return; }
    try { Logger.log('✅ getSubmissionSheet():', getSubmissionSheet().getName()); } catch (e) { Logger.log('❌', e.message); }
    try { Logger.log('✅ getStatusSheet():', getStatusSheet().getName()); } catch (e) { Logger.log('❌', e.message); }
    try { Logger.log('✅ getNextSubmissionID():', getNextSubmissionID()); } catch (e) { Logger.log('❌', e.message); }
    Logger.log('=== Sheets Module Test Complete ===');
}