/**
 * ============================================================
 * Quick Freights Global Limited
 * Logger Module
 * ------------------------------------------------------------
 * Module: Logger
 * Version: 1.1
 *
 * PURPOSE
 * -------
 * Single owner of all application logging.
 *
 * This module provides:
 * - Error logging (console.error)
 * - Information logging (console.log)
 * - Warning logging (console.warn)
 * - Debug logging (conditionally based on CONFIG.DEBUG)
 *
 * CHANGELOG
 * ---------
 * v1.1 - Added logWarn(), logDebug(), and feature flag checks
 * v1.0 - Initial version with logError() and logInfo()
 * ============================================================
 */

/**
 * Logs an error.
 * Always logs, regardless of DEBUG settings.
 *
 * @param {string} module - The module name (e.g., "Main", "Sheets")
 * @param {string} func - The function name
 * @param {string} message - The error message
 * @param {*} payload - Optional payload/context data
 * @param {string} stack - Optional stack trace
 */
function logError(module, func, message, payload, stack) {
  console.error({
    module: module || "Unknown",
    function: func || "Unknown",
    message: message || "No message",
    payload: payload || null,
    stack: stack || "No stack",
    timestamp: now(),
  });
}

/**
 * Logs an informational message.
 * Always logs, but can be filtered by LOG_LEVEL.
 *
 * @param {string} module - The module name
 * @param {string} message - The info message
 */
function logInfo(module, message) {
  // Always log info messages
  console.log({
    module: module || "Unknown",
    message: message || "No message",
    timestamp: now(),
  });
}

/**
 * Logs a warning message.
 * Always logs, regardless of DEBUG settings.
 *
 * @param {string} module - The module name
 * @param {string} message - The warning message
 * @param {*} payload - Optional payload/context data
 */
function logWarn(module, message, payload) {
  console.warn({
    module: module || "Unknown",
    message: message || "No message",
    payload: payload || null,
    timestamp: now(),
  });
}

/**
 * Logs a debug message.
 * Only logs if CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING is true.
 *
 * @param {string} module - The module name
 * @param {string} message - The debug message
 * @param {*} payload - Optional payload/context data
 */
function logDebug(module, message, payload) {
  if (!CONFIG.DEBUG || !CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING) {
    return;
  }

  console.log({
    module: module || "Unknown",
    message: message || "No message",
    payload: payload || null,
    timestamp: now(),
    level: "DEBUG",
  });
}

/**
 * Logs a performance timing summary.
 * Only logs if CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING is true.
 *
 * @param {Object} summary - Performance timing summary
 */
function logPerformance(summary) {
  if (!CONFIG.DEBUG || !CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING) {
    return;
  }

  var stageSummary = [];
  if (summary.stageOrder) {
    for (var i = 0; i < summary.stageOrder.length; i++) {
      var name = summary.stageOrder[i];
      if (summary.stages && summary.stages[name] !== undefined) {
        stageSummary.push(name + ": " + summary.stages[name] + "ms");
      }
    }
  }

  console.log({
    module: "Performance",
    message:
      "⏱️ REQUEST: " +
      summary.total +
      "ms total, " +
      summary.unaccounted +
      "ms unaccounted",
    stages: stageSummary.join(", "),
    timestamp: summary.timestamp || now(),
    level: "PERF",
  });
}

/**
 * Legacy compatibility wrapper for logError.
 * Keeps existing calls working.
 */
function logError(module, func, message, payload, stack) {
  console.error({
    module: module || "Unknown",
    function: func || "Unknown",
    message: message || "No message",
    payload: payload || null,
    stack: stack || "No stack",
    timestamp: now(),
  });
}

/**
 * Legacy compatibility wrapper for logInfo.
 * Keeps existing calls working.
 */
function logInfo(module, message) {
  console.log({
    module: module || "Unknown",
    message: message || "No message",
    timestamp: now(),
  });
}
