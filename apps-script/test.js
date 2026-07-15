function testMyLine() {
  var result = sendSMS(
    "2348037883339",
    "Quick Freights - did you get this? " + new Date().toLocaleString(),
    { smsType: "TEST", trackingId: "QFG-TEST" }
  );
  Logger.log(JSON.stringify(result));
}
function testNoSender() {
  var token = PropertiesService.getScriptProperties().getProperty("SMS_API_TOKEN");
  var params = {
    api_token: token,
    recipient: "2348037883339",
    message: "Test no sender " + new Date().toLocaleString()
  };
  var query = Object.keys(params).map(function(k) { return k + "=" + encodeURIComponent(params[k]); }).join("&");
  var url = "https://app.paylessbulksms.com.ng/api/http/sms/send?" + query;
  var response = UrlFetchApp.fetch(url, { method: "get", muteHttpExceptions: true });
  Logger.log(response.getContentText());
}