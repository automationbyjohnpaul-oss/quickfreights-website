/**
 * ============================================================
 * Quick Freights Global Limited
 * Back Office — Frontend Configuration
 * ------------------------------------------------------------
 * Module: config.js
 * Version: 1.1
 *
 * PURPOSE
 * -------
 * Single source of truth for frontend configuration.
 * All API URLs, timeouts, and feature flags are centralised here.
 *
 * NAMING CONVENTION
 * -----------------
 * APP_CONFIG is the global configuration object.
 * All other modules reference APP_CONFIG.* for settings.
 *
 * CHANGELOG
 * ---------
 * v1.1 - Added dedicated DASHBOARD section for refresh interval
 * v1.0 - Initial release with project-wide naming convention
 * ============================================================
 */

const APP_CONFIG = {
  // ── API ────────────────────────────────────────────────────────
  API: {
    /**
     * Google Apps Script Web App URL
     * Update this with your production deployment URL
     */
    BASE_URL:
      "https://script.google.com/macros/s/AKfycby7BzbstgloRMWh8TeBw64bxFk_v0pbB_w0sarT3IoT-FPWv42QHyaDePxZZdvsvk7R/exec",

    /**
     * API timeout in milliseconds
     */
    TIMEOUT_MS: 30000,

    /**
     * Number of retry attempts on failure
     */
    RETRY_ATTEMPTS: 2,
  },

  // ── Authentication ────────────────────────────────────────────
  AUTH: {
    /**
     * Session storage key for the session token
     */
    SESSION_KEY: "qf_backoffice_session",

    /**
     * User data storage key
     */
    USER_KEY: "qf_backoffice_user",

    /**
     * Remembered username storage key
     */
    USERNAME_KEY: "qf_backoffice_username",

    /**
     * Session expiry in hours
     */
    SESSION_EXPIRY_HOURS: 8,
  },

  // ── Dashboard ──────────────────────────────────────────────────
  DASHBOARD: {
    /**
     * Auto-refresh interval in milliseconds
     * Set to 60000 for 1 minute, 30000 for 30 seconds
     * Set to 0 to disable auto-refresh
     */
    REFRESH_INTERVAL_MS: 60000, // 60 seconds

    /**
     * Maximum number of submissions to show in the recent table
     */
    MAX_RECENT_SUBMISSIONS: 10,

    /**
     * Number of days to show in the trend chart
     */
    TREND_DAYS: 7,
  },

  // ── Feature Flags ─────────────────────────────────────────────
  FEATURES: {
    /**
     * Dashboard page
     */
    DASHBOARD_ENABLED: true,

    /**
     * Submissions management
     */
    SUBMISSIONS_ENABLED: true,

    /**
     * Customer management
     */
    CUSTOMERS_ENABLED: true,

    /**
     * Reports module (Phase 2)
     */
    REPORTS_ENABLED: false,

    /**
     * Admin settings (Phase 3)
     */
    ADMIN_ENABLED: false,

    /**
     * Analytics tracking
     */
    ANALYTICS_ENABLED: false,
  },

  // ── UI ────────────────────────────────────────────────────────
  UI: {
    /**
     * Default items per page for paginated tables
     */
    DEFAULT_PAGE_SIZE: 25,

    /**
     * Maximum number of items in dropdowns
     */
    MAX_DROPDOWN_ITEMS: 100,

    /**
     * Toast notification duration in milliseconds
     */
    TOAST_DURATION_MS: 5000, // 5 seconds
  },

  // ── Company ──────────────────────────────────────────────────
  COMPANY: {
    NAME: "Quick Freights Global Limited",
    RC_NUMBER: "8106184",
    WEBSITE: "https://quickfreightsglobal.com",
    SUPPORT_EMAIL: "reception.quickfreightglobal@gmail.com",
  },

  // ── Version ──────────────────────────────────────────────────
  VERSION: "1.1.0",
};

/**
 * Validate configuration on load
 * Logs warnings for missing or invalid settings
 */
(function validateConfig() {
  const errors = [];

  // Check API URL
  if (!APP_CONFIG.API.BASE_URL || APP_CONFIG.API.BASE_URL.includes("...")) {
    errors.push(
      "⚠️ APP_CONFIG.API.BASE_URL is not set. Please update with your production URL.",
    );
  }

  // Check session key
  if (!APP_CONFIG.AUTH.SESSION_KEY) {
    errors.push("⚠️ APP_CONFIG.AUTH.SESSION_KEY is not set.");
  }

  // Validate dashboard refresh interval
  if (typeof APP_CONFIG.DASHBOARD.REFRESH_INTERVAL_MS !== "number") {
    errors.push(
      "⚠️ APP_CONFIG.DASHBOARD.REFRESH_INTERVAL_MS must be a number.",
    );
  }

  // Log warnings
  if (errors.length > 0) {
    console.warn("=== Config Validation Warnings ===");
    errors.forEach(function (err) {
      console.warn(err);
    });
  } else {
    console.log("✅ Config loaded successfully!");
    console.log("   Version:", APP_CONFIG.VERSION);
    console.log(
      "   API URL:",
      APP_CONFIG.API.BASE_URL.substring(0, 50) + "...",
    );
    console.log(
      "   Dashboard Refresh:",
      APP_CONFIG.DASHBOARD.REFRESH_INTERVAL_MS / 1000 + "s",
    );
  }
})();

/**
 * Helper function to check if a feature is enabled
 *
 * @param {string} featureName - Name of the feature to check
 * @returns {boolean}
 */
function isFeatureEnabled(featureName) {
  return APP_CONFIG.FEATURES[featureName] === true;
}

/**
 * Helper function to get the API URL
 *
 * @param {string} endpoint - Optional endpoint path
 * @returns {string} Full API URL
 */
function getApiUrl(endpoint) {
  const baseUrl = APP_CONFIG.API.BASE_URL;
  if (endpoint) {
    return baseUrl + (baseUrl.includes("?") ? "&" : "?") + endpoint;
  }
  return baseUrl;
}

/**
 * Helper function to get dashboard refresh interval
 *
 * @returns {number} Refresh interval in milliseconds
 */
function getDashboardRefreshInterval() {
  return APP_CONFIG.DASHBOARD.REFRESH_INTERVAL_MS;
}

// Expose globally
window.APP_CONFIG = APP_CONFIG;
window.isFeatureEnabled = isFeatureEnabled;
window.getApiUrl = getApiUrl;
window.getDashboardRefreshInterval = getDashboardRefreshInterval;

console.log("✅ config.js loaded successfully");
