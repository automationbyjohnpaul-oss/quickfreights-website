/**
 * ============================================================
 * Utilities Module
 * ============================================================
 */

function clean(value) {

  if (value === null || value === undefined)

    return "";

  return String(value).trim();

}


function now() {

  return Utilities.formatDate(

    new Date(),

    Session.getScriptTimeZone(),

    "yyyy-MM-dd HH:mm:ss"

  );

}


function jsonResponse(success, message, data) {

  return ContentService

    .createTextOutput(

      JSON.stringify({

        success,

        message,

        data: data || {}

      })

    )

    .setMimeType(ContentService.MimeType.JSON);

}