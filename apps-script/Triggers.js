/**
 * ============================================================
 * Quick Freights Global Limited
 * Cargo Portal Backend
 * ------------------------------------------------------------
 * Module: Triggers
 * Version: 1.0
 *
 * PURPOSE
 * -------
 * Houses all Apps Script trigger entry points.
 * Delegates ALL logic to dedicated modules.
 *
 * This module MUST NEVER:
 * - Send SMS directly
 * - Read or write Sheets directly (except trigger context)
 * - Contain business rules
 *
 * SSOT COMPLIANCE
 * ---------------
 * Sheet names: CONFIG.SHEETS.*
 * Statuses: CONFIG.STATUS.*
 * Columns: CONFIG.SHEET_COLUMNS.*
 * ============================================================
 */

/**
 * Fires when a user edits the spreadsheet.
 * Routes status changes to Status.gs for processing.
 */
function onEdit(e) {
  if (!e || !e.range) return;
  
  var range = e.range;
  var sheet = range.getSheet();
  
  // Only Status sheet
  if (sheet.getName() !== CONFIG.SHEETS.STATUS) return;
  
  // Only Status column
  if (range.getColumn() !== CONFIG.SHEET_COLUMNS.STATUS.STATUS) return;
  
  // Skip header row
  var row = range.getRow();
  if (row === 1) return;
  
  // Sheets.gs owns all column knowledge
  var context = getStatusChangeContext(row);
  if (!context.trackingId || !context.phone) return;
  
  // Status.gs owns the workflow
  var result = processStatusChange(context);
  
  // Sheets.gs owns flag writing
  if (result.sent && result.flag) {
    markSMSFlag(row, result.flag);
  }
}

/**
 * Daily maintenance — runs on schedule.
 */
function dailyMaintenance() {
  logInfo("Triggers", "Daily maintenance: " + new Date().toISOString());
}