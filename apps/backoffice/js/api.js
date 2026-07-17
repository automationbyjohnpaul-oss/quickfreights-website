/**
 * ============================================================
 * Quick Freights Global Limited
 * Back Office — API Client
 * ------------------------------------------------------------
 * Module: api.js
 * Version: 1.2
 *
 * PURPOSE
 * -------
 * Generic API client for all Back Office requests.
 * Supports GET (read) and POST (write) operations.
 * No business logic — only HTTP communication.
 *
 * CHANGELOG
 * ---------
 * v1.2 - Added clean get() method for read operations
 * v1.1 - Switched to JSON payload (Content-Type: application/json)
 * v1.0 - Initial release
 * ============================================================
 */

const Api = (function () {
  "use strict";

  // ── Constants ──────────────────────────────────────────────────
  const BASE_URL = APP_CONFIG.API.BASE_URL;
  const RETRY_ATTEMPTS = APP_CONFIG.API.RETRY_ATTEMPTS || 2;

  // ── Private ────────────────────────────────────────────────────

  /**
   * Get the session token from storage
   */
  function getSessionToken() {
    const session = localStorage.getItem(APP_CONFIG.AUTH.SESSION_KEY);
    if (!session) return null;
    try {
      const parsed = JSON.parse(session);
      return parsed.token || null;
    } catch {
      return null;
    }
  }

  /**
   * Build request headers
   */
  function buildHeaders(includeAuth) {
    const headers = {
      Accept: "application/json",
    };
    if (includeAuth) {
      const token = getSessionToken();
      if (token) {
        headers["Authorization"] = "Bearer " + token;
      }
    }
    return headers;
  }

  /**
   * Fetch with retry logic
   */
  async function _fetchWithRetry(url, options, retries) {
    try {
      const response = await fetch(url, options);
      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid JSON response from server");
      }

      if (!response.ok || data.success === false) {
        const errorMsg = data.message || data.error || "Request failed";
        throw new Error(errorMsg);
      }

      return data;
    } catch (error) {
      if (retries > 0) {
        console.warn("API request failed, retrying...", error.message);
        return _fetchWithRetry(url, options, retries - 1);
      }
      throw error;
    }
  }

  // ── Public API ──────────────────────────────────────────────────

  return {
    /**
     * GET request (read-only)
     * @param {string} action - API action (e.g., 'dashboard')
     * @param {Object} params - URL query parameters
     * @param {boolean} requireAuth - Whether to include session token
     * @returns {Promise<Object>} API response
     */
    async get(action, params = {}, requireAuth = true) {
      const url = new URL(BASE_URL);
      url.searchParams.append("action", action);

      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });

      const options = {
        method: "GET",
        headers: buildHeaders(requireAuth),
        redirect: "follow",
      };

      const result = await _fetchWithRetry(
        url.toString(),
        options,
        RETRY_ATTEMPTS,
      );
      return result.data || result;
    },

    /**
     * POST request (state-changing)
     * @param {string} action - API action (e.g., 'login')
     * @param {Object} data - Request payload (will include action)
     * @param {boolean} requireAuth - Whether to include session token
     * @returns {Promise<Object>} API response
     */
    async post(action, data = {}, requireAuth = true) {
      const payload = { action, ...data };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...buildHeaders(requireAuth),
        },
        redirect: "follow",
        body: JSON.stringify(payload),
      };

      const result = await _fetchWithRetry(BASE_URL, options, RETRY_ATTEMPTS);
      return result.data || result;
    },

    /**
     * Check if the user is currently authenticated
     */
    isAuthenticated() {
      const token = getSessionToken();
      if (!token) return false;
      // TODO: Check expiry if stored in session
      return true;
    },

    /**
     * Clear the session (logout)
     */
    logout() {
      localStorage.removeItem(APP_CONFIG.AUTH.SESSION_KEY);
      localStorage.removeItem(APP_CONFIG.AUTH.USER_KEY);
      localStorage.removeItem(APP_CONFIG.AUTH.USERNAME_KEY);
      window.location.href = "login.html";
    },
  };
})();

// Log initialization
console.log("✅ Api client initialized");
