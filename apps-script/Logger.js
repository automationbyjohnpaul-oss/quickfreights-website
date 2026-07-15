/**
 * ============================================================
 * Logger Module
 * ============================================================
 *
 * Responsible for:
 *
 * - Error logging
 * - Warning logging
 * - Audit trail
 * - Debug events
 *
 * ============================================================
 */

function logError(module, func, message, payload, stack) {

  console.error({

    module,

    function: func,

    message,

    payload,

    stack

  });

}


function logInfo(module, message) {

  console.log({

    module,

    message

  });

}