/**
 * ============================================================
 * Quick Freights Global Limited
 * Back Office — Frontend Authentication
 * ------------------------------------------------------------
 * Module: auth.js
 * Version: 1.2
 *
 * PURPOSE
 * -------
 * Handles login, token storage, session validation, and logout.
 * Stores the full session object returned by the backend.
 * Future fields are preserved automatically.
 *
 * CHANGELOG
 * ---------
 * v1.2 - Stores full session object, username passed to backend
 * v1.1 - Added session validation and redirects
 * v1.0 - Initial release
 * ============================================================
 */

const Auth = (function () {
  "use strict";

  // ── Constants ──────────────────────────────────────────────────
  const SESSION_KEY = APP_CONFIG.AUTH.SESSION_KEY;

  // ── Private ────────────────────────────────────────────────────

  /**
   * Get the full session object from storage
   * @returns {Object|null} Session object or null
   */
  function getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  /**
   * Save the full session object to storage
   * @param {Object} session - Session object from backend
   */
  function saveSession(session) {
    if (!session) {
      clearSession();
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  /**
   * Clear session from storage
   */
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  /**
   * Check if session is valid (exists and not expired)
   * @returns {boolean}
   */
  function isSessionValid() {
    const session = getSession();
    if (!session) return false;

    // Check if session has an expiry
    if (session.expiresAt) {
      if (Date.now() >= session.expiresAt) {
        clearSession();
        return false;
      }
    }

    // Check if session has a token
    if (!session.token) {
      clearSession();
      return false;
    }

    return true;
  }

  // ── Public API ──────────────────────────────────────────────────

  return {
    /**
     * Login with username and password
     * @param {string} username - Staff username
     * @param {string} password - Staff password
     * @returns {Promise<Object>} { success: boolean, message: string, data: Object }
     */
    async login(username, password) {
      try {
        const result = await API.post(
          "login",
          { username: username, password: password },
          false, // No auth required for login
        );

        if (result.success && result.data) {
          // Store the full session object returned by the backend
          // This preserves all future fields automatically
          const session = {
            token: result.data.sessionId || result.data.token,
            expiresAt: result.data.expiresAt || Date.now() + 8 * 60 * 60 * 1000,
            username: result.data.username || username,
            fullName: result.data.fullName || "",
            role: result.data.role || "viewer",
            email: result.data.email || "",
            loginTime: new Date().toISOString(),
          };
          saveSession(session);

          // Also store username for "remember me" if needed
          if (username) {
            localStorage.setItem(APP_CONFIG.AUTH.USERNAME_KEY, username);
          }

          return {
            success: true,
            message: "Login successful",
            data: session,
          };
        }

        return {
          success: false,
          message: result.message || "Login failed",
        };
      } catch (error) {
        console.error("Login error:", error);
        return {
          success: false,
          message: error.message || "Unable to connect to server",
        };
      }
    },

    /**
     * Log out (clear session)
     */
    logout() {
      clearSession();
      localStorage.removeItem(APP_CONFIG.AUTH.USERNAME_KEY);
      window.location.href = "login.html";
    },

    /**
     * Get the full session object
     * @returns {Object|null}
     */
    getSession() {
      return getSession();
    },

    /**
     * Get the current session token
     * @returns {string|null}
     */
    getToken() {
      const session = getSession();
      return session ? session.token : null;
    },

    /**
     * Get the current user's role
     * @returns {string|null}
     */
    getRole() {
      const session = getSession();
      return session ? session.role : null;
    },

    /**
     * Get the current user's full name
     * @returns {string|null}
     */
    getFullName() {
      const session = getSession();
      return session ? session.fullName : null;
    },

    /**
     * Get the current user's username
     * @returns {string|null}
     */
    getUsername() {
      const session = getSession();
      return session ? session.username : null;
    },

    /**
     * Check if the user is authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
      return isSessionValid();
    },

    /**
     * Ensure the user is authenticated; redirect to login if not
     * @returns {boolean} True if authenticated
     */
    requireAuth() {
      if (!this.isAuthenticated()) {
        window.location.href = "login.html";
        return false;
      }
      return true;
    },

    /**
     * Check if the user has a specific role
     * @param {string} requiredRole - Role to check (admin, manager, operator, viewer)
     * @returns {boolean}
     */
    hasRole(requiredRole) {
      const role = this.getRole();
      if (!role) return false;

      // Role hierarchy: admin > manager > operator > viewer
      const roleHierarchy = {
        admin: 4,
        manager: 3,
        operator: 2,
        viewer: 1,
      };

      const userLevel = roleHierarchy[role] || 0;
      const requiredLevel = roleHierarchy[requiredRole] || 0;

      return userLevel >= requiredLevel;
    },

    /**
     * Initialize auth (run on page load)
     * - On login page: redirect to dashboard if already authenticated
     * - On protected pages: redirect to login if not authenticated
     */
    init() {
      const currentPath = window.location.pathname;
      const isLoginPage = currentPath.endsWith("login.html");
      const isBackOfficePage = currentPath.includes("backoffice");

      // Only run if we're in the backoffice
      if (!isBackOfficePage) return;

      if (isLoginPage) {
        // If already authenticated, go to dashboard
        if (this.isAuthenticated()) {
          window.location.href = "index.html";
          return;
        }
        // Check for saved username
        const savedUsername = localStorage.getItem(
          APP_CONFIG.AUTH.USERNAME_KEY,
        );
        if (savedUsername) {
          const usernameInput = document.getElementById("username");
          if (usernameInput) {
            usernameInput.value = savedUsername;
          }
        }
        console.log("🔐 Login page initialized");
      } else {
        // Protected page - require auth
        if (!this.isAuthenticated()) {
          console.warn("⚠️ Not authenticated, redirecting to login");
          window.location.href = "login.html";
          return;
        }
        // Update UI with user info
        const userAvatar = document.getElementById("userAvatar");
        const userName = document.getElementById("userName");
        const userRole = document.getElementById("userRole");

        if (userAvatar) {
          const fullName = this.getFullName() || this.getUsername() || "User";
          const initials = fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
          userAvatar.textContent = initials;
        }
        if (userName) {
          userName.textContent =
            this.getFullName() || this.getUsername() || "User";
        }
        if (userRole) {
          const role = this.getRole() || "viewer";
          userRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);
        }

        console.log("🔐 Authenticated as:", this.getUsername());
      }
    },
  };
})();

// Auto-initialize on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  Auth.init();
});

console.log("✅ auth.js loaded");
