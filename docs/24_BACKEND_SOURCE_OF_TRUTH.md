## Tracking ID Standard

### Public Tracking ID

Format:

QFG-MM-YY-XXXXXX

Example:

QFG-07-26-A7X4K2

### Components

QFG
Quick Freights Global identifier.

MM
Submission month.

YY
Submission year.

XXXXXX
Six-character uppercase alphanumeric identifier generated using a cryptographically secure random source.

### Rules

- Generated only by the backend.
- Never edited after creation.
- Never reused.
- Must be globally unique.
- Used for all customer communication.
- Must not reveal submission volume.

### Internal Submission ID

A separate auto-increment numeric identifier is maintained internally for sequencing, auditing, reporting, and diagnostics. It is never exposed to customers.

## Submission Contract

### Frontend Payload

The frontend submits JSON using the following fields.

Required:

- blReference
- consigneeName
- consigneePhone

Optional:

- cargoDescription
- shipperName
- consigneeEmail
- portOfDischarge
- containerNumber
- expectedArrival
- attachmentName
- attachmentMimeType
- attachmentData

Where:

- attachmentData contains the Base64-encoded file content.
- attachmentMimeType contains the browser MIME type.
- attachmentName contains the original filename.

### Successful Response

```json
{
  "success": true,
  "message": "Submission received successfully.",
  "data": {
    "trackingId": "QFG-MM-YY-XXXXXX",
    "submissionId": 0,
    "attachmentUrl": "",
    "attachmentId": ""
  }
}
```

### Processing Sequence

Browser

↓

Validation

↓

Tracking ID Generation

↓

Google Sheets Write

↓

Google Drive Upload

↓

Response Returned

SMS notification is intentionally excluded from the current processing pipeline and will be introduced during the SMS Integration milestone.
