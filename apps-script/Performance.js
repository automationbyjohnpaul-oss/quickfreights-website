/**
 * ============================================================
 * Quick Freights Global Limited
 * Performance Module
 * ------------------------------------------------------------
 * Module: Performance
 * Version: 1.0
 *
 * PURPOSE
 * -------
 * Request-scoped performance timing.
 *
 * This module:
 * - Creates a timer scoped to a single request
 * - Tracks stage start/end times (always measures)
 * - Conditionally logs based on CONFIG.DEBUG
 * - Calculates stage durations and unaccounted time
 * - Includes timestamp for historical tracking
 *
 * USAGE:
 *   var timer = Performance.createTimer();
 *   timer.begin("validation");
 *   validateSubmission(payload);
 *   timer.end("validation");
 *   var summary = timer.finish();
 * ============================================================
 */

var Performance = {
  /**
   * Creates a new request-scoped timer.
   * @returns {Object} Timer instance
   */
  createTimer: function () {
    var start = Date.now();
    var stages = {};
    var currentStage = null;
    var stageStart = 0;
    var stageOrder = [];

    return {
      /**
       * Begins a stage.
       * Always records the start time (measurement is independent of logging).
       */
      begin: function (name) {
        // If a stage is already open, log a warning
        if (currentStage) {
          logInfo(
            "Performance",
            "⚠️ begin() called while stage '" +
              currentStage +
              "' is still open",
          );
        }
        currentStage = name;
        stageStart = Date.now();
        stageOrder.push(name);
      },

      /**
       * Ends the current stage.
       * Always records the duration.
       */
      end: function (name) {
        if (currentStage !== name) {
          logError(
            "Performance",
            "end",
            "Stage mismatch: expected '" +
              currentStage +
              "', got '" +
              name +
              "'",
          );
          return;
        }
        var duration = Date.now() - stageStart;
        stages[name] = duration;
        currentStage = null;
        stageStart = 0;
      },

      /**
       * Finishes the request and returns the timing summary.
       * Logs conditionally based on CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING.
       */
      finish: function () {
        // Close any open stage
        if (currentStage) {
          var duration = Date.now() - stageStart;
          stages[currentStage] = duration;
          logInfo(
            "Performance",
            "⚠️ Auto-closed stage '" + currentStage + "' (" + duration + "ms)",
          );
          currentStage = null;
          stageStart = 0;
        }

        var total = Date.now() - start;

        // Calculate sum of all stages
        var sum = 0;
        for (var key in stages) {
          if (stages.hasOwnProperty(key)) {
            sum += stages[key];
          }
        }

        var unaccounted = total - sum;

        var summary = {
          timestamp: now(),
          total: total,
          stages: stages,
          stageOrder: stageOrder,
          sum: sum,
          unaccounted: unaccounted,
        };

        // Log conditionally based on feature flag
        if (CONFIG.DEBUG && CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING) {
          var stageSummary = [];
          for (var i = 0; i < stageOrder.length; i++) {
            var name = stageOrder[i];
            stageSummary.push(name + ": " + stages[name] + "ms");
          }

          logInfo(
            "Performance",
            "⏱️ REQUEST: " +
              total +
              "ms total, " +
              unaccounted +
              "ms unaccounted",
          );
          logInfo("Performance", "   Stages: " + stageSummary.join(", "));
          logInfo("Performance", "   Timestamp: " + summary.timestamp);
        }

        return summary;
      },

      /**
       * Gets the current stage duration (for debugging).
       */
      getCurrentDuration: function () {
        if (!currentStage) return 0;
        return Date.now() - stageStart;
      },

      /**
       * Gets the current stage name.
       */
      getCurrentStage: function () {
        return currentStage;
      },
    };
  },
};

/**
 * Convenience function to create a timer.
 * Maintains backward compatibility.
 */
function startPerformanceTimer() {
  return Performance.createTimer();
}
