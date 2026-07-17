/**
 * ============================================================
 * Quick Freights Global Limited
 * Back Office — Dashboard Module
 * ------------------------------------------------------------
 * Module: Dashboard.gs
 * Version: 1.1
 *
 * PURPOSE
 * -------
 * Aggregates metrics and statistics for the Back Office dashboard.
 * All data is read from Google Sheets (Sheets.gs).
 *
 * CHANGELOG
 * ---------
 * v1.1 - Real field names, proper JSON responses, placeholders for production
 * v1.0 - Initial release
 * ============================================================
 */

// ============================================================
// PUBLIC FUNCTIONS
// ============================================================

/**
 * Returns dashboard summary metrics.
 * Production field names match the actual schema.
 *
 * @returns {Object} JSON response with dashboard stats
 */
function getDashboardStats() {
  try {
    // TODO: Replace with real aggregation from Sheets.gs
    // For now, returning realistic placeholder data

    // In production, this would:
    // 1. Call getSubmissionSheet() from Sheets.gs
    // 2. Count submissions by status
    // 3. Count today's submissions
    // 4. Count failed SMS attempts

    return jsonResponse(true, "Dashboard stats retrieved", {
      todaySubmissions: 47,
      pendingShipments: 23,
      processingShipments: 18,
      clearedShipments: 12,
      failedSms: 3,
      totalSubmissions: 134,
      // Trend data for charts
      trend: [
        { date: "2026-07-10", count: 12 },
        { date: "2026-07-11", count: 15 },
        { date: "2026-07-12", count: 8 },
        { date: "2026-07-13", count: 20 },
        { date: "2026-07-14", count: 18 },
        { date: "2026-07-15", count: 25 },
        { date: "2026-07-16", count: 22 },
      ],
    });
  } catch (error) {
    logError("Dashboard", "getDashboardStats", error.message);
    return jsonResponse(false, "Failed to fetch dashboard stats");
  }
}

/**
 * Returns recent submissions, newest first.
 * Uses production field names matching the actual schema.
 *
 * @param {Object} e - Event object with query parameters
 * @param {number} e.parameter.limit - Maximum number to return (default 10)
 * @returns {Object} JSON response with submissions array
 */
function getRecentSubmissions(e) {
  try {
    const limit = parseInt(e?.parameter?.limit) || 10;

    // TODO: Replace with real data from Sheets.gs
    // In production, this would:
    // 1. Call getSubmissionSheet() from Sheets.gs
    // 2. Get the last N rows (sorted by timestamp DESC)
    // 3. Map to the production field names

    // Placeholder data matching production field names
    const submissions = [
      {
        trackingId: "QFG-07-26-A7X4K2",
        blReference: "MAEU123456789",
        consigneeName: "John Importer",
        status: "Cleared",
        timestamp: "2026-07-15 14:30",
        phone: "08012345678",
        cargoDescription: "10 containers of electronics",
        portOfDischarge: "Onne Port",
        attachmentUrl: "https://drive.google.com/file/d/abc123/view",
        attachmentName: "BL_MAEU123456789.pdf",
      },
      {
        trackingId: "QFG-07-26-B8Y9L1",
        blReference: "MSC987654321",
        consigneeName: "Mary Exporter",
        status: "Processing",
        timestamp: "2026-07-16 09:15",
        phone: "08023456789",
        cargoDescription: "5 containers of textiles",
        portOfDischarge: "Apapa Port",
        attachmentUrl: "https://drive.google.com/file/d/def456/view",
        attachmentName: "BL_MSC987654321.pdf",
      },
      {
        trackingId: "QFG-07-26-C3Z8K7",
        blReference: "HLC456789012",
        consigneeName: "James Trading",
        status: "Customs Hold",
        timestamp: "2026-07-16 11:45",
        phone: "08034567890",
        cargoDescription: "3 containers of machinery",
        portOfDischarge: "Tincan Port",
        attachmentUrl: "https://drive.google.com/file/d/ghi789/view",
        attachmentName: "BL_HLC456789012.jpg",
      },
      {
        trackingId: "QFG-07-26-D4Z9K8",
        blReference: "ONE123456789",
        consigneeName: "Sarah Logistics",
        status: "Received",
        timestamp: "2026-07-16 13:20",
        phone: "08045678901",
        cargoDescription: "8 containers of food items",
        portOfDischarge: "Onne Port",
        attachmentUrl: "",
        attachmentName: "",
      },
      {
        trackingId: "QFG-07-26-E5Y8J7",
        blReference: "EVER987654321",
        consigneeName: "Michael Shipping",
        status: "Delivered",
        timestamp: "2026-07-16 15:00",
        phone: "08056789012",
        cargoDescription: "12 containers of construction materials",
        portOfDischarge: "Apapa Port",
        attachmentUrl: "https://drive.google.com/file/d/jkl012/view",
        attachmentName: "BL_EVER987654321.pdf",
      },
    ];

    // Apply limit
    const limitedSubmissions = submissions.slice(0, limit);

    return jsonResponse(true, "Recent submissions retrieved", {
      submissions: limitedSubmissions,
      total: submissions.length,
      limit: limit,
      offset: 0,
    });
  } catch (error) {
    logError("Dashboard", "getRecentSubmissions", error.message);
    return jsonResponse(false, "Failed to fetch recent submissions");
  }
}

/**
 * Returns the latest 5 submissions (shortcut for dashboard widget).
 *
 * @returns {Object} JSON response with latest submissions
 */
function getLatestSubmissions() {
  try {
    // Reuse getRecentSubmissions with a fixed limit of 5
    const result = getRecentSubmissions({ parameter: { limit: "5" } });
    return result;
  } catch (error) {
    logError("Dashboard", "getLatestSubmissions", error.message);
    return jsonResponse(false, "Failed to fetch latest submissions");
  }
}

/**
 * Returns submission count by status (for charts).
 *
 * @returns {Object} JSON response with status counts
 */
function getSubmissionStatusCounts() {
  try {
    // TODO: Replace with real aggregation from Sheets.gs
    return jsonResponse(true, "Status counts retrieved", {
      Received: 15,
      Processing: 18,
      "In Transit": 8,
      "Customs Hold": 5,
      Cleared: 12,
      Delivered: 6,
      Failed: 3,
    });
  } catch (error) {
    logError("Dashboard", "getSubmissionStatusCounts", error.message);
    return jsonResponse(false, "Failed to fetch status counts");
  }
}

// ============================================================
// JSON RESPONSE HELPER
// ============================================================

/**
 * Consistent JSON response helper.
 *
 * @param {boolean} success - Whether the operation succeeded
 * @param {string} message - Response message
 * @param {Object|Array} data - Response data
 * @returns {Object} JSON response object
 */
function jsonResponse(success, message, data) {
  var response = {
    success: success,
    message: message || "",
    timestamp: new Date().toISOString(),
  };

  if (data !== undefined && data !== null) {
    response.data = data;
  }

  return response;
}

// ============================================================
// TEST FUNCTIONS
// ============================================================

/**
 * Test the dashboard module.
 */
function testDashboard() {
  Logger.log("=== Testing Dashboard Module ===");

  // Test getDashboardStats
  const stats = getDashboardStats();
  Logger.log("Dashboard Stats:", JSON.stringify(stats, null, 2));

  // Test getRecentSubmissions
  const recent = getRecentSubmissions({ parameter: { limit: "3" } });
  Logger.log("Recent Submissions:", JSON.stringify(recent, null, 2));

  // Test getLatestSubmissions
  const latest = getLatestSubmissions();
  Logger.log("Latest Submissions:", JSON.stringify(latest, null, 2));

  // Test getSubmissionStatusCounts
  const counts = getSubmissionStatusCounts();
  Logger.log("Status Counts:", JSON.stringify(counts, null, 2));

  Logger.log("=== Dashboard Module Test Complete ===");
}
