/**
 * ============================================================
 * Quick Freights Global Limited
 * Back Office — Authentication Module
 * ------------------------------------------------------------
 * Module: Auth.gs
 * Version: 1.2
 *
 * PURPOSE
 * -------
 * Handles staff authentication for the Back Office.
 * Password stored securely in Script Properties.
 * Token-based session with enriched user data.
 *
 * CHANGELOG
 * ---------
 * v1.2 - Full session object with username, role, loginTime
 * v1.1 - Added validateToken_ with full session data
 * v1.0 - Initial release
 * ============================================================
 */

const SESSION_EXPIRY_HOURS = 8; // Backend SSOT

// ============================================================
// PUBLIC FUNCTIONS
// ============================================================

/**
 * Authenticate a staff member via POST.
 * 
 * @param {Object} request - The HTTP request object
 * @returns {Object} JSON response with session data
 */
function authenticateStaff(request) {
    try {
        const payload = JSON.parse(request.postData.contents);
        const username = payload.username || '';
        const password = payload.password || '';

        const storedPassword = getSecret('BACKOFFICE_PASSWORD');

        if (!storedPassword) {
            logError('Auth', 'authenticateStaff', 'BACKOFFICE_PASSWORD not set in Script Properties');
            return jsonResponse(false, 'Authentication not configured.');
        }

        if (password !== storedPassword) {
            logError('Auth', 'authenticateStaff', 'Invalid credentials attempt');
            return jsonResponse(false, 'Invalid credentials.');
        }

        // Generate a unique session token
        const token = Utilities.getUuid() + '-' + Date.now();

        // Build enriched session data
        const sessionData = {
            username: username || 'staff',
            role: 'admin', // Default role, can be extended with staff sheet later
            fullName: 'Administrator', // Can be extended with staff sheet
            email: '',
            loginTime: new Date().toISOString(),
            expiresAt: new Date(Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000).toISOString(),
        };

        // Cache session data for 8 hours (TTL in seconds)
        CacheService.getScriptCache().put(
            token,
            JSON.stringify(sessionData),
            SESSION_EXPIRY_HOURS * 60 * 60
        );

        // Log successful login
        logInfo('Auth', 'User logged in: ' + sessionData.username);

        return jsonResponse(true, 'Authenticated successfully.', {
            token: token,
            expiresAt: sessionData.expiresAt,
            username: sessionData.username,
            fullName: sessionData.fullName,
            role: sessionData.role,
            email: sessionData.email,
            loginTime: sessionData.loginTime,
        });

    } catch (error) {
        logError('Auth', 'authenticateStaff', error.message);
        return jsonResponse(false, 'Authentication failed.');
    }
}

/**
 * Validate a session token and return the cached session data.
 * 
 * @param {string} token - The session token
 * @returns {Object|null} Session data or null if invalid
 */
function validateToken_(token) {
    if (!token) return null;

    try {
        const raw = CacheService.getScriptCache().get(token);
        if (!raw) return null;

        const sessionData = JSON.parse(raw);

        // Check if session is expired
        if (sessionData.expiresAt) {
            const expiryTime = new Date(sessionData.expiresAt).getTime();
            if (Date.now() > expiryTime) {
                CacheService.getScriptCache().remove(token);
                return null;
            }
        }

        return sessionData;
    } catch (error) {
        logError('Auth', 'validateToken_', error.message);
        return null;
    }
}

/**
 * Validate a session token (simple boolean check).
 * 
 * @param {string} token - The session token
 * @returns {boolean} True if valid
 */
function validateSession(token) {
    if (!token) return false;

    // Check if token exists in cache
    const raw = CacheService.getScriptCache().get(token);
    if (!raw) return false;

    try {
        const sessionData = JSON.parse(raw);

        // Check expiry
        if (sessionData.expiresAt) {
            const expiryTime = new Date(sessionData.expiresAt).getTime();
            if (Date.now() > expiryTime) {
                CacheService.getScriptCache().remove(token);
                return false;
            }
        }

        return true;
    } catch (error) {
        logError('Auth', 'validateSession', error.message);
        return false;
    }
}

/**
 * Get session data for a token.
 * 
 * @param {string} token - The session token
 * @returns {Object|null} Session data or null
 */
function getSessionData(token) {
    return validateToken_(token);
}

/**
 * Revoke a session token (logout).
 * 
 * @param {string} token - The session token
 * @returns {boolean} True if successfully revoked
 */
function revokeSession(token) {
    try {
        if (!token) return false;
        CacheService.getScriptCache().remove(token);
        logInfo('Auth', 'Session revoked: ' + token.substring(0, 20) + '...');
        return true;
    } catch (error) {
        logError('Auth', 'revokeSession', error.message);
        return false;
    }
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get a secret from Script Properties.
 * 
 * @param {string} key - The secret key
 * @returns {string|null} The secret value
 */
function getSecret(key) {
    try {
        return PropertiesService.getScriptProperties().getProperty(key);
    } catch (error) {
        logError('Auth', 'getSecret', error.message);
        return null;
    }
}

// ============================================================
// TEST FUNCTIONS
// ============================================================

/**
 * Test authentication flow.
 */
function testAuth() {
    Logger.log('=== Testing Authentication ===');

    // Set test password (if not already set)
    const props = PropertiesService.getScriptProperties();
    if (!props.getProperty('BACKOFFICE_PASSWORD')) {
        props.setProperty('BACKOFFICE_PASSWORD', 'test123');
        Logger.log('✅ BACKOFFICE_PASSWORD set to: test123');
    }

    // Test login
    const mockRequest = {
        postData: {
            contents: JSON.stringify({
                username: 'admin',
                password: 'test123'
            })
        }
    };

    const result = authenticateStaff(mockRequest);
    Logger.log('Login Result:', JSON.stringify(result, null, 2));

    if (result.success) {
        const token = result.data.token;
        Logger.log('Token:', token);

        // Test validate
        const session = validateToken_(token);
        Logger.log('Session Data:', JSON.stringify(session, null, 2));

        // Test revoke
        const revoked = revokeSession(token);
        Logger.log('Revoked:', revoked);
    }

    Logger.log('=== Authentication Test Complete ===');
}