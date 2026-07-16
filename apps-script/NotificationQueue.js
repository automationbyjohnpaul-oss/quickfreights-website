/**
 * ============================================================
 * Quick Freights Global Limited
 * Notification Queue Module
 * ------------------------------------------------------------
 * Module: NotificationQueue
 * Version: 1.0
 *
 * PURPOSE
 * -------
 * Queue storage and processing. NO business logic, NO SMS sending.
 * ============================================================
 */

/**
 * Adds a notification to the queue. Fast, no blocking.
 */
function enqueueNotification(trackingId, type, recipient, payload) {
  var sheet = getSheet(CONFIG.SHEETS.NOTIFICATION_QUEUE);
  if (!sheet) throw new Error("Notification Queue sheet missing. Run createAllSheets().");

  var row = sheet.getLastRow() + 1;
  var queueId = 'NQ-' + now().replace(/[^0-9]/g, '') + '-' + Math.random().toString(36).substr(2, 4);

  sheet.getRange(row, 1, 1, 8).setValues([[
    queueId, trackingId, type, recipient,
    JSON.stringify(payload || {}),
    CONFIG.NOTIFICATIONS.STATUS.PENDING,
    0,
    now()
  ]]);

  logInfo("Queue", "Enqueued: " + queueId + " type=" + type);
  return queueId;
}

/**
 * Processes pending notifications. Called by time trigger.
 */
function processNotificationQueue() {
  var sheet = getSheet(CONFIG.SHEETS.NOTIFICATION_QUEUE);
  if (!sheet) return;

  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;

  var data = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
  var processed = 0;

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var status = row[5];
    var attempts = row[6];
    var maxAttempts = CONFIG.NOTIFICATIONS.MAX_ATTEMPTS;

    if (status !== CONFIG.NOTIFICATIONS.STATUS.PENDING && status !== CONFIG.NOTIFICATIONS.STATUS.RETRY) continue;
    if (attempts >= maxAttempts) {
      sheet.getRange(i + 2, 6).setValue(CONFIG.NOTIFICATIONS.STATUS.FAILED);
      logInfo("Queue", "Failed: " + row[0] + " after " + attempts + " attempts");
      continue;
    }

    var trackingId = row[1];
    var type = row[2];
    var recipient = row[3];
    var payload = JSON.parse(row[4] || '{}');

    var result = dispatchNotification(type, trackingId, recipient, payload);

    if (result && result.success) {
      sheet.getRange(i + 2, 6).setValue(CONFIG.NOTIFICATIONS.STATUS.SENT);
    } else {
      sheet.getRange(i + 2, 6).setValue(CONFIG.NOTIFICATIONS.STATUS.RETRY);
    }

    sheet.getRange(i + 2, 7).setValue(attempts + 1);
    processed++;
  }

  if (processed > 0) logInfo("Queue", "Processed " + processed + " items");
}

/**
 * Routes to the correct sender based on type. NO business logic.
 */
function dispatchNotification(type, trackingId, recipient, payload) {
  switch (type) {
    case CONFIG.NOTIFICATIONS.TYPE.SUBMISSION_CONFIRMATION:
      return sendSubmissionConfirmationSMS(trackingId, recipient);
    case CONFIG.NOTIFICATIONS.TYPE.STAFF_ALERT:
      return sendStaffAlertSMS(trackingId, payload.blReference, payload.consigneeName);
    case CONFIG.NOTIFICATIONS.TYPE.STATUS_DISCHARGED:
      return sendStatusDischargedSMS(trackingId, recipient);
    case CONFIG.NOTIFICATIONS.TYPE.STATUS_PROCESSING:
      return sendStatusProcessingSMS(trackingId, recipient);
    case CONFIG.NOTIFICATIONS.TYPE.STATUS_CLEARED:
      return sendStatusClearedSMS(trackingId, recipient);
    default:
      return { success: false };
  }
}