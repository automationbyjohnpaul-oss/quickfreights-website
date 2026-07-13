/**
 * ==========================================================
 * Spreadsheet Module
 * ==========================================================
 *
 * Responsibilities
 *
 * - Open the project spreadsheet
 * - Return sheets by name
 * - Centralize spreadsheet access
 *
 * ==========================================================
 */

/**
 * Returns the project spreadsheet.
 *
 * @returns {Spreadsheet}
 */
function getSpreadsheet() {

  return SpreadsheetApp.openById(
    getSecret("SPREADSHEET_ID")
  );

}

/**
 * Returns a sheet by name.
 *
 * @param {string} sheetName
 * @returns {Sheet}
 */
function getSheet(sheetName) {

  return getSpreadsheet()
    .getSheetByName(sheetName);

}