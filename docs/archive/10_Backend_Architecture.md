# 10 — Backend Architecture

**Title:** QuickFreights Platform — Backend Architecture
**Version:** 1.0.1
**Status:** Draft
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`01_System_Architecture.md`

### References

- `04_Source_of_Truth.md` — Sheet names, statuses, API format, validation rules
- `09_Website_Architecture.md` — Frontend that consumes these APIs

---

## Authority

This document defines the architecture of the Application, Business Domain,
and Infrastructure layers within the QuickFreights Platform backend.

---

## 1. Backend Overview

The backend is implemented in Google Apps Script, deployed as a Web App.
It handles form submissions, generates tracking IDs, manages file uploads,
and triggers SMS notifications.

### Layer Mapping

| Logical Layer   | Physical Implementation                                 |
| --------------- | ------------------------------------------------------- |
| Application     | `doPost()`, `doGet()` — routing and orchestration       |
| Business Domain | Validation, Tracking, Submission, Notification services |
| Infrastructure  | Storage (Sheets), File (Drive), SMS (Payless), Logging  |

---

## 2. API Specification

### 2.1 Endpoints

| Method | Endpoint    | Purpose                       |
| ------ | ----------- | ----------------------------- |
| `GET`  | Web App URL | Health check, API information |
| `POST` | Web App URL | Submit Bill of Lading         |

### 2.2 POST Request Body

```json
{
  "customerName": "string (required)",
  "phoneNumber": "string (required, Nigerian format)",
  "blNumber": "string (required)",
  "containerNumber": "string (optional)",
  "cargoDescription": "string (required)",
  "attachmentName": "string (optional)",
  "attachmentData": "string (optional, base64-encoded file)"
}
```

### 2.3 POST Success Response

```json
{
  "success": true,
  "trackingId": "QF-2026-001"
}
```

### 2.4 POST Error Response

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

### 2.5 GET Response

```json
{
  "success": true,
  "service": "Quick Freights Global Limited API",
  "version": "5.0",
  "status": "operational"
}
```

---

## 3. Sheet Schema

### 3.1 Submissions Sheet

| Column | Name              | Type     | Required | Notes                       |
| ------ | ----------------- | -------- | -------- | --------------------------- |
| A      | Tracking ID       | Text     | Auto     | Format: QF-YYYY-NNN         |
| B      | Timestamp         | DateTime | Auto     | Nigeria time (Africa/Lagos) |
| C      | Customer Name     | Text     | Yes      |                             |
| D      | Phone Number      | Text     | Yes      | Normalized: 234XXXXXXXXXX   |
| E      | B/L Number        | Text     | Yes      | Unique per submission       |
| F      | Container Number  | Text     | No       |                             |
| G      | Cargo Description | Text     | Yes      |                             |
| H      | Attachment Name   | Text     | No       | Original filename           |
| I      | Attachment Link   | Text     | No       | Google Drive URL            |

### 3.2 Shipment Status Sheet

| Column | Name                  | Type     | Required | Notes                                                            |
| ------ | --------------------- | -------- | -------- | ---------------------------------------------------------------- |
| A      | Tracking ID           | Text     | Auto     |                                                                  |
| B      | B/L Number            | Text     | Yes      |                                                                  |
| C      | Customer Name         | Text     | Yes      |                                                                  |
| D      | Phone Number          | Text     | Yes      | For SMS                                                          |
| E      | Status                | Text     | Yes      | Dropdown: Received, In Transit, Customs Hold, Cleared, Delivered |
| F      | SMS Sent Confirmation | Text     | Auto     | SENT, FAILED, or empty                                           |
| G      | Last Updated          | DateTime | Auto     | Nigeria time                                                     |

### 3.3 SMS Log Sheet

| Column | Name              | Type     | Notes                  |
| ------ | ----------------- | -------- | ---------------------- |
| A      | Timestamp         | DateTime | When SMS was attempted |
| B      | Tracking ID       | Text     |                        |
| C      | Recipient Phone   | Text     |                        |
| D      | Message Body      | Text     |                        |
| E      | Status            | Text     | SENT or FAILED         |
| F      | Provider Response | Text     | Raw API response       |

---

## 4. Module Design

### 4.1 Application Layer

| Module           | Function    | Responsibility                      |
| ---------------- | ----------- | ----------------------------------- |
| Request Router   | `doPost(e)` | Receive and parse incoming requests |
| Request Router   | `doGet()`   | Return API information              |
| Response Builder | (inline)    | Format and return JSON responses    |

### 4.2 Business Domain Layer

| Module               | Function               | Responsibility                               |
| -------------------- | ---------------------- | -------------------------------------------- |
| Validation Service   | `validatePhone()`      | Nigerian phone number validation             |
| Validation Service   | (inline)               | Required field validation                    |
| Validation Service   | (inline)               | File type and size validation                |
| Tracking Service     | `generateTrackingId()` | Create unique sequential IDs                 |
| Submission Service   | (inline in doPost)     | Orchestrate submission workflow              |
| Notification Service | `sendSMS()`            | Compose and send SMS messages                |
| Status Service       | `onEdit()`             | Detect status changes, trigger notifications |

### 4.3 Infrastructure Layer

| Module          | Function              | Responsibility                                     |
| --------------- | --------------------- | -------------------------------------------------- |
| Storage Service | `getOrCreateSheet()`  | Sheet access with auto-creation                    |
| Storage Service | (inline)              | Read/write operations via `getRange().setValues()` |
| File Service    | `getOrCreateFolder()` | Drive folder access with auto-creation             |
| File Service    | `getMimeType()`       | Map file extensions to MIME types                  |
| SMS Service     | `sendSMS()`           | HTTP communication with Payless API                |
| Logging Service | `Logger.log()`        | Operation and error logging                        |

---

## 5. SMS Integration

### 5.1 Provider

Payless Bulk SMS Nigeria

### 5.2 Configuration

| Property          | Value                                                     |
| ----------------- | --------------------------------------------------------- |
| API Endpoint      | `GET https://app.paylessbulksms.com.ng/api/http/sms/send` |
| Auth Method       | `api_token` as query parameter                            |
| Token Storage     | ScriptProperties (never in code)                          |
| Sender ID         | QuickFreigh (pending approval)                            |
| Max Sender Length | 11 characters                                             |
| Recipient Format  | 234XXXXXXXXXX                                             |

### 5.3 SMS Template

Defined in `04_Source_of_Truth.md`, Section 8.

### 5.4 SMS Workflow

```
Status changed to "Cleared"
        │
        ▼
onEdit() trigger fires
        │
        ▼
Gatekeeper check: SMS already sent?
        │ Yes → Stop
        │ No  ↓
        ▼
Lookup phone number from row
        │
        ▼
Compose message with Tracking ID
        │
        ▼
Call Payless API
        │
        ▼
Log result to SMS Log sheet
        │
        ▼
Update SMS Sent Confirmation column
```

---

## 6. File Storage

### 6.1 Configuration

| Property         | Value                                           |
| ---------------- | ----------------------------------------------- |
| Storage Location | Google Drive folder `QuickFreights_Attachments` |
| Max File Size    | 5 MB (5,242,880 bytes)                          |
| Allowed Types    | PDF, JPG, JPEG, PNG, DOC, DOCX                  |
| File Naming      | `{TrackingID}_{OriginalFilename}`               |
| Access Control   | Anyone with link can view                       |

### 6.2 File Upload Workflow

```
File attached to form
        │
        ▼
Client-side: validate size and type
        │
        ▼
Convert to base64
        │
        ▼
POST to Apps Script with JSON body
        │
        ▼
Server-side: validate type and size again
        │
        ▼
Decode base64, create blob
        │
        ▼
Save to QuickFreights_Attachments folder
        │
        ▼
Set sharing to "Anyone with link can view"
        │
        ▼
Store Google Drive URL in Submissions sheet
```

---

## 7. Security

| Concern          | Implementation                                        |
| ---------------- | ----------------------------------------------------- |
| API Token        | Stored in ScriptProperties, never in code or Git      |
| Input Validation | Client-side AND server-side validation                |
| File Upload      | Type whitelist, size limit, server-side re-validation |
| Sheet Access     | Script runs as owner; sheets not publicly shared      |
| Error Messages   | User-friendly messages only; no stack traces exposed  |

---

## 8. Error Handling

| Scenario                | Response                                                             |
| ----------------------- | -------------------------------------------------------------------- |
| Missing required fields | `{"success": false, "error": "Missing required fields"}`             |
| Invalid phone number    | `{"success": false, "error": "Invalid Nigerian phone number"}`       |
| Duplicate B/L number    | `{"success": false, "error": "This B/L has already been submitted"}` |
| File too large          | `{"success": false, "error": "File exceeds 5MB limit"}`              |
| Unsupported file type   | `{"success": false, "error": "File type not allowed"}`               |
| Sheet write failure     | `{"success": false, "error": "System error. Please try again."}`     |
| SMS send failure        | Logged to SMS Log; gatekeeper marked as FAILED                       |

---

## 9. Version History

| Version | Date       | Changes                                                                                |
| ------- | ---------- | -------------------------------------------------------------------------------------- |
| 1.0.0   | 2026-06-29 | Initial Backend Architecture                                                           |
| 1.0.1   | 2026-06-29 | Updated Section 5.3 SMS Template to reference Source of Truth (eliminates duplication) |

```

---

### ✅ Changes Applied

| Change | Detail |
|--------|--------|
| **Version** | `1.0.0` → `1.0.1` |
| **Section 5.3** | Replaced hardcoded SMS template with cross-reference to `04_Source_of_Truth.md`, Section 8 |
| **Version History** | Added 1.0.1 entry |

### Why This Matters

The old Section 5.3 duplicated the SMS template text from the Source of Truth. Per the Engineering Constitution's **Single Source of Truth** principle, the template text now lives only in `04_Source_of_Truth.md`. The Backend Architecture simply points to it. If the template changes, only one file needs updating.
```
