/**
 * ============================================================
 * Quick Freights Global Limited
 * Back Office — Dashboard Logic
 * ------------------------------------------------------------
 * Module: dashboard.js
 * Version: 1.2
 *
 * PURPOSE
 * -------
 * Presentation-only module that fetches dashboard data from
 * the API and populates the UI. No business logic.
 *
 * DEPENDENCIES: config.js, api.js, auth.js
 *
 * CHANGELOG
 * ---------
 * v1.2 - Clean presentation-only approach, removed business logic
 * v1.1 - Added loading states and error handling
 * v1.0 - Initial release
 * ============================================================
 */

const Dashboard = (function () {
  "use strict";

  // ── DOM References ──────────────────────────────────────────────
  let statsContainer, submissionsTable, errorContainer;
  let refreshTimer = null;

  // Stat card mapping – matches fields from getDashboardStats()
  const STAT_FIELDS = [
    "todaySubmissions",
    "pendingShipments",
    "processingShipments",
    "clearedShipments",
    "failedSms",
  ];

  // ── Private Methods ────────────────────────────────────────────

  function getElements() {
    statsContainer = document.getElementById("dashboard-stats");
    submissionsTable = document.getElementById("recent-submissions-body");
    errorContainer = document.getElementById("dashboard-error");
  }

  function showLoading() {
    if (statsContainer) {
      statsContainer.classList.add("loading");
    }
    // Also show the loading overlay if it exists
    const overlay = document.getElementById("dashboard-loading");
    if (overlay) {
      overlay.style.display = "flex";
    }
  }

  function hideLoading() {
    if (statsContainer) {
      statsContainer.classList.remove("loading");
    }
    const overlay = document.getElementById("dashboard-loading");
    if (overlay) {
      overlay.style.display = "none";
    }
  }

  function showError(message) {
    if (errorContainer) {
      errorContainer.textContent =
        message || "Unable to load dashboard data. Please try again later.";
      errorContainer.style.display = "block";
    }
  }

  function hideError() {
    if (errorContainer) {
      errorContainer.style.display = "none";
    }
  }

  function escapeHtml(text) {
    if (!text) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatTimestamp(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    return isNaN(d.getTime()) ? ts : d.toLocaleString();
  }

  function getStatusBadgeClass(status) {
    if (!status) return "badge-grey";
    const lower = status.toLowerCase();
    if (lower.includes("clear") || lower.includes("delivered")) {
      return "badge-success";
    } else if (lower.includes("processing") || lower.includes("transit")) {
      return "badge-warning";
    } else if (
      lower.includes("hold") ||
      lower.includes("error") ||
      lower.includes("failed")
    ) {
      return "badge-error";
    } else if (lower.includes("received") || lower.includes("pending")) {
      return "badge-info";
    }
    return "badge-grey";
  }

  // ── Render Methods ─────────────────────────────────────────────

  function renderStats(data) {
    if (!statsContainer) return;

    STAT_FIELDS.forEach(function (field) {
      const el = statsContainer.querySelector('[data-stat="' + field + '"]');
      if (el) {
        el.textContent =
          data && data[field] !== undefined && data[field] !== null
            ? data[field]
            : "-";
      }
    });
  }

  function renderSubmissions(submissions) {
    if (!submissionsTable) return;

    submissionsTable.innerHTML = "";

    if (!submissions || submissions.length === 0) {
      submissionsTable.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;padding:var(--space-6);color:var(--grey-500);">
            No recent submissions found.
          </td>
        </tr>
      `;
      return;
    }

    submissions.forEach(function (item) {
      const row = document.createElement("tr");
      const badgeClass = getStatusBadgeClass(item.status);

      row.innerHTML = `
        <td><strong>${escapeHtml(item.trackingId || "-")}</strong></td>
        <td>${escapeHtml(item.blReference || "-")}</td>
        <td>${escapeHtml(item.consigneeName || "-")}</td>
        <td><span class="badge ${badgeClass}">${escapeHtml(item.status || "-")}</span></td>
        <td>${escapeHtml(formatTimestamp(item.timestamp))}</td>
        <td style="text-align:right;">
          <a href="submissions.html?id=${escapeHtml(item.trackingId)}" class="btn btn-sm btn-outline-primary">View</a>
        </td>
      `;
      submissionsTable.appendChild(row);
    });
  }

  // ── Data Loading ──────────────────────────────────────────────

  async function loadData() {
    showLoading();
    hideError();

    try {
      // Fetch stats and recent submissions in parallel
      const [stats, submissions] = await Promise.all([
        Api.get("dashboard"),
        Api.get("recentSubmissions", {
          limit: APP_CONFIG.DASHBOARD.MAX_RECENT_SUBMISSIONS || 10,
        }),
      ]);

      if (stats && stats.success) {
        renderStats(stats.data);
      } else {
        throw new Error(stats?.message || "Stats fetch failed");
      }

      if (submissions && submissions.success) {
        renderSubmissions(
          submissions.data?.submissions || submissions.data || [],
        );
      } else {
        throw new Error(submissions?.message || "Submissions fetch failed");
      }
    } catch (error) {
      console.error("Dashboard load error:", error);
      showError(
        error.message ||
          "Unable to load dashboard data. Please try again later.",
      );
      renderStats(null);
      renderSubmissions([]);
    } finally {
      hideLoading();
    }
  }

  // ── Auto-Refresh ──────────────────────────────────────────────

  function startAutoRefresh() {
    stopAutoRefresh();

    const interval = APP_CONFIG.DASHBOARD.REFRESH_INTERVAL_MS || 60000;
    if (interval > 0) {
      refreshTimer = setInterval(loadData, interval);
      console.log(
        "🔄 Dashboard auto-refresh started (" + interval / 1000 + "s)",
      );
    }
  }

  function stopAutoRefresh() {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  }

  // ── Authentication ─────────────────────────────────────────────

  function checkAuth() {
    if (!Auth.isAuthenticated()) {
      window.location.href = "login.html";
      return false;
    }
    return true;
  }

  // ── Public API ──────────────────────────────────────────────────

  return {
    /**
     * Initialize the dashboard
     */
    init: function () {
      if (!checkAuth()) return;

      getElements();

      // Load data
      loadData();

      // Start auto-refresh
      startAutoRefresh();

      // Clean up on page unload
      window.addEventListener("beforeunload", stopAutoRefresh);

      console.log("📊 Dashboard initialized");
    },

    /**
     * Manually refresh the dashboard
     */
    refresh: function () {
      console.log("🔄 Manual refresh triggered");
      loadData();
    },

    /**
     * Stop auto-refresh
     */
    stopRefresh: function () {
      stopAutoRefresh();
      console.log("⏹️ Auto-refresh stopped");
    },

    /**
     * Start auto-refresh
     */
    startRefresh: function () {
      startAutoRefresh();
    },
  };
})();

// Auto-start when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  Dashboard.init();
});

console.log("✅ dashboard.js loaded");
