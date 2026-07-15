/**
 * ============================================================
 * Quick Freights Global Limited
 * Test Module
 * ------------------------------------------------------------
 * Module: Test
 * Version: 1.0
 *
 * PURPOSE
 * -------
 * Test functions for various backend components.
 * These are for development and debugging only.
 * ============================================================
 */

/**
 * Test SMS sending with a custom message.
 */
function testMyLine() {
  var result = sendSMS(
    "2348037883339",
    "Quick Freights - did you get this? " + new Date().toLocaleString(),
    { smsType: "TEST", trackingId: "QFG-TEST" },
  );
  Logger.log(JSON.stringify(result));
}

/**
 * Test SMS sending without a sender ID.
 */
function testNoSender() {
  var token =
    PropertiesService.getScriptProperties().getProperty("SMS_API_TOKEN");
  var params = {
    api_token: token,
    recipient: "2348037883339",
    message: "Test no sender " + new Date().toLocaleString(),
  };
  var query = Object.keys(params)
    .map(function (k) {
      return k + "=" + encodeURIComponent(params[k]);
    })
    .join("&");
  var url = "https://app.paylessbulksms.com.ng/api/http/sms/send?" + query;
  var response = UrlFetchApp.fetch(url, {
    method: "get",
    muteHttpExceptions: true,
  });
  Logger.log(response.getContentText());
}

/**
 * Sync existing submissions from the Submissions sheet to the Status sheet.
 * This is a one-time migration utility for existing data.
 */
function syncSubmissionsToStatus() {
  var subSheet = getSheet(CONFIG.SHEETS.SUBMISSIONS);
  var statusSheet = getSheet(CONFIG.SHEETS.STATUS);
  var lastRow = subSheet.getLastRow();

  if (lastRow <= 1) {
    Logger.log("No submissions to sync");
    return;
  }

  // Get all data from Submissions (skip header)
  var data = subSheet.getRange(2, 1, lastRow - 1, 14).getValues();

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var trackingId = row[1]; // Column B
    var blRef = row[3]; // Column D
    var consignee = row[4]; // Column E
    var phone = row[5]; // Column F

    if (trackingId && phone) {
      statusSheet.appendRow([
        trackingId,
        blRef,
        consignee,
        phone,
        CONFIG.STATUS.RECEIVED, // Initial status
        "", // SMS Sent
        now(), // Last Updated
      ]);
    }
  }

  Logger.log("Synced " + data.length + " submissions to Status sheet");
}

/**
 * Test function to verify SMS logging and sending.
 */
function testSMSQuick() {
  var result = sendSMS(
    "2348037883339",
    "Quick Freights Test - " + new Date().toISOString(),
    { smsType: "TEST", trackingId: "QFG-TEST" },
  );
  Logger.log(JSON.stringify(result));
}

/**
 * Quick test for Payless SMS API with a specific sender.
 */
function testQuickSMS() {
  var token =
    PropertiesService.getScriptProperties().getProperty("SMS_API_TOKEN");
  var params = {
    api_token: token,
    recipient: "2348037883339",
    message: "Test Payless - " + new Date().toISOString(),
    sender_id: "Payless",
  };
  var query = Object.keys(params)
    .map(function (k) {
      return k + "=" + encodeURIComponent(params[k]);
    })
    .join("&");
  var url = "https://app.paylessbulksms.com.ng/api/http/sms/send?" + query;
  var response = UrlFetchApp.fetch(url, {
    method: "get",
    muteHttpExceptions: true,
  });
  Logger.log(response.getContentText());
}

/**
 * Find a working sender ID by testing multiple options.
 * Useful for debugging sender ID approval issues.
 */
function findWorkingSender() {
  var token =
    PropertiesService.getScriptProperties().getProperty("SMS_API_TOKEN");
  var testSenders = [
    "Bondex",
    "QuickFreights",
    "QFreights",
    "SMS",
    "Alert",
    "Info",
  ];
  var phone = "2348037883339";

  for (var i = 0; i < testSenders.length; i++) {
    var params = {
      api_token: token,
      recipient: phone,
      message: "Test " + testSenders[i] + " " + new Date().toISOString(),
      sender_id: testSenders[i],
    };
    var query = Object.keys(params)
      .map(function (k) {
        return k + "=" + encodeURIComponent(params[k]);
      })
      .join("&");
    var url = "https://app.paylessbulksms.com.ng/api/http/sms/send?" + query;
    var response = UrlFetchApp.fetch(url, {
      method: "get",
      muteHttpExceptions: true,
    });
    var text = response.getContentText();

    if (
      text.indexOf("successfully") > -1 ||
      text.indexOf("queued") > -1 ||
      text.indexOf("Delivered") > -1
    ) {
      Logger.log(
        "★★★ WORKS: " + testSenders[i] + " → " + text.substring(0, 200),
      );
    } else {
      Logger.log(
        "❌ FAILED: " + testSenders[i] + " → " + text.substring(0, 150),
      );
    }

    Utilities.sleep(1500);
  }
}
