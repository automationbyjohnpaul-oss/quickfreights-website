Here is the updated `24_BACKEND_SOURCE_OF_TRUTH.md` with all the suggested improvements applied:

````markdown
# 24 — BACKEND SOURCE OF TRUTH

## Quick Freights Global Limited Platform

**Document Version:** 4.0
**Backend Version:** v8.1
**Last Updated:** July 2026
**Status:** Frozen

---

## Purpose

This document defines the authoritative backend engineering rules for the Quick Freights Platform.

It establishes the Single Source of Truth (SSOT) for configuration, infrastructure access, module responsibilities, and architectural boundaries.

All backend development, maintenance, debugging, and AI-assisted engineering must conform to the standards defined in this document.

---

## Backend Engineering Principles

The backend follows the following engineering principles:

- Single Source of Truth (SSOT)
- Modular architecture
- Infrastructure isolation
- Separation of concerns
- Configuration over duplication
- Production-first development
- AI-debugging compatibility
- Measure before optimizing

---

## Architecture Principles

### Single Source of Truth (SSOT)

Every piece of configuration must exist in exactly one place.

### Infrastructure Isolation

Only `Spreadsheet.gs` may call `SpreadsheetApp.openById()`.

### Module Responsibility

Every module owns exactly one responsibility.

### No Duplicate Functions

A public function may exist in one module only.

### Configuration Abstraction

No business module may directly retrieve Script Properties.

Infrastructure modules abstract external services.

---

## Configuration

### CONFIG Object

Authoritative File: `Config.gs`

All backend configuration is maintained exclusively in `Config.gs`.

This includes:

- Sheet names (`CONFIG.SHEETS.*`)
- SMS configuration (`CONFIG.SMS.*`)
- Validation rules (`CONFIG.VALIDATION.*`)
- Drive configuration (`CONFIG.DRIVE.*`)
- Status values (`CONFIG.STATUS.*`)
- Column mappings (`CONFIG.SHEET_COLUMNS.*`)
- Company information (`CONFIG.COMPANY.*`)
- Contact details (`CONFIG.CONTACT.*`)
- Tracking configuration (`CONFIG.TRACKING.*`)

No business module should contain duplicated configuration.

### Secrets

Secrets are never stored in `CONFIG`.

Secrets are retrieved only through:

```javascript
getSecret(key);
```
````

Authoritative File: `Config.gs`

Infrastructure modules are responsible for secret retrieval.

---

## Module Inventory

| Module               | Version | Responsibility                                   |
| -------------------- | ------- | ------------------------------------------------ |
| **Config.gs**        | v8.1    | SSOT configuration, secrets retrieval            |
| **Spreadsheet.gs**   | v2.0    | Spreadsheet gateway (getSpreadsheet, getSheet)   |
| **Utilities.gs**     | v1.1    | Generic helpers (clean, now)                     |
| **Logger.gs**        | v1.1    | Application logging (logError, logInfo, logWarn) |
| **Validation.gs**    | v7.0    | Input validation, phone normalization            |
| **Tracking.gs**      | v7.0    | Tracking ID generation                           |
| **Sheets.gs**        | v7.3    | Sheet CRUD operations, status context            |
| **Drive.gs**         | v7.0    | Google Drive operations, file upload             |
| **SMS.gs**           | v8.2    | SMS sending, logging, parallel requests          |
| **Status.gs**        | v1.1    | Shipment workflow, status transitions            |
| **Triggers.gs**      | v1.0    | Apps Script trigger entry points                 |
| **Performance.gs**   | v1.0    | Request-scoped timing instrumentation            |
| **Main.gs**          | v8.2    | API entry point, request orchestration           |
| **Notifications.gs** | v1.0    | Notification placeholder                         |
| **Reports.gs**       | v1.0    | Reports placeholder                              |
| **test.gs**          | v1.0    | Test functions                                   |
| **README.gs**        | v1.0    | Project documentation (non-executable)           |

---

## Spreadsheet Access

### Authoritative Functions

```javascript
getSpreadsheet();
getSheet(sheetName);
```

Authoritative File: `Spreadsheet.gs`

### Prohibited Calls

Direct calls to:

```javascript
SpreadsheetApp.openById();
SpreadsheetApp.getActiveSpreadsheet();
```

are prohibited outside `Spreadsheet.gs`.

### Column References

All column references must resolve through `CONFIG.SHEET_COLUMNS`.

Hardcoded numeric column indexes are prohibited except in migration or one-time setup scripts.

---

## Sheet Names

### Authoritative Source

`CONFIG.SHEETS`

```javascript
CONFIG.SHEETS.SUBMISSIONS; // "Submissions"
CONFIG.SHEETS.STATUS; // "Shipment Status"
CONFIG.SHEETS.SMS_LOG; // "SMS Log"
CONFIG.SHEETS.ERROR_LOG; // "Error Log"
```

Hardcoded sheet names are prohibited.

---

## Column Mappings

### Authoritative Source

`CONFIG.SHEET_COLUMNS`

#### Submissions Sheet

```javascript
CONFIG.SHEET_COLUMNS.SUBMISSIONS = {
  SUBMISSION_ID: 1, // A
  TRACKING_ID: 2, // B
  TIMESTAMP: 3, // C
  BL_REFERENCE: 4, // D
  CONSIGNEE_NAME: 5, // E
  CUSTOMER_PHONE: 6, // F
  SHIPPER_NAME: 7, // G
  EMAIL: 8, // H
  PORT: 9, // I
  ETA: 10, // J
  NOTES: 11, // K
  ATTACHMENT_NAME: 12, // L
  ATTACHMENT_URL: 13, // M
  STATUS: 14, // N
};
```

#### Status Sheet

```javascript
CONFIG.SHEET_COLUMNS.STATUS = {
  TRACKING_ID: 1, // A
  BL_NUMBER: 2, // B
  CUSTOMER_NAME: 3, // C
  CUSTOMER_PHONE: 4, // D
  STATUS: 5, // E
  SMS_SENT: 6, // F
  LAST_UPDATED: 7, // G
  DISCHARGED_SMS: 8, // H
  PROCESSING_SMS: 9, // I
  CLEARED_SMS: 10, // J
};
```

Hardcoded column numbers are prohibited.

---

## SMS Configuration

### Authoritative Source

`CONFIG.SMS`

### Feature Flags

```javascript
CONFIG.SMS.ENABLED; // true/false
CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION; // true/false
CONFIG.SMS.SEND_STATUS_UPDATES; // true/false
CONFIG.SMS.SEND_STAFF_ALERTS; // true/false
```

### Provider Configuration

```javascript
CONFIG.SMS.PROVIDER; // "PAYLESS"
CONFIG.SMS.API_ENDPOINT; // API URL
CONFIG.SMS.SENDER_ID; // "QuickFreigh"
```

### Templates

```javascript
CONFIG.SMS.TEMPLATES.SUBMISSION_CONFIRMATION;
CONFIG.SMS.TEMPLATES.STAFF_ALERT;
CONFIG.SMS.TEMPLATES.STATUS_DISCHARGED;
CONFIG.SMS.TEMPLATES.STATUS_PROCESSING;
CONFIG.SMS.TEMPLATES.STATUS_CLEARED;
```

### SMS Workflow

SMS messages are sent in parallel using `UrlFetchApp.fetchAll()`.

All SMS delivery is logged to the **SMS Log** sheet with:

- Timestamp
- SMS Type
- Tracking ID
- Recipient Phone
- Message Body
- Status (SENT/FAILED)
- Provider Response
- Retry Count

---

## Status Values

### Authoritative Source

`CONFIG.STATUS`

```javascript
CONFIG.STATUS.RECEIVED; // "Received"
CONFIG.STATUS.DISCHARGED; // "Discharged at Port"
CONFIG.STATUS.PROCESSING; // "Processing & Customs Clearance"
CONFIG.STATUS.CLEARED; // "Cleared & Ready for Collection"
CONFIG.STATUS.DELIVERED; // "Delivered"
```

Hardcoded status strings are prohibited.

---

## Tracking ID

### Format

```
QFG-MM-YY-XXXXXX
```

### Components

| Component | Description                                  |
| --------- | -------------------------------------------- |
| QFG       | Quick Freights Global identifier             |
| MM        | Submission month (2 digits)                  |
| YY        | Submission year (2 digits)                   |
| XXXXXX    | Random alphanumeric (6 chars, no I, O, 0, 1) |

### Immutability

Tracking IDs are immutable.

Once generated they must never be modified.

### Authoritative Source

`Tracking.gs` → `generateTrackingID()`

---

## Module Dependency Rules

### Approved Flow

```
Main.gs
    │
    ├── Validation.gs
    ├── Tracking.gs
    ├── Drive.gs
    ├── Sheets.gs
    └── SMS.gs

Triggers.gs
    │
    ▼
Status.gs
    ├── SMS.gs
    └── Sheets.gs

Sheets.gs
    │
    ▼
Spreadsheet.gs

Config.gs
    │
    ▲
available to every module (read-only)
```

### Forbidden Dependencies

- `SMS.gs` → `SpreadsheetApp.openById()` (Only Spreadsheet.gs)
- `SMS.gs` → `Status.gs` (Business layer cannot depend upward)
- `Config.gs` → Business logic (Config is SSOT only)
- `Utilities.gs` → Business logic (Utilities are generic helpers only)

---

## Development Workflow

Production source code is maintained using:

- Visual Studio Code
- Git
- GitHub
- clasp

The Apps Script Editor is no longer used for active development.

It is reserved for:

- Deployment
- Trigger management
- Runtime monitoring
- Emergency production fixes

---

## Performance

Performance instrumentation is available throughout the request lifecycle.

Measurements are used to identify bottlenecks before optimization.

Measured production latency is primarily constrained by Google Apps Script Web App execution rather than application logic.

Architectural refactoring is prohibited unless supported by measurable performance data.

### Performance Baseline

| Operation           | Typical Time |
| ------------------- | -----------: |
| Validation          |       ~12 ms |
| Tracking Generation |        ~8 ms |
| Spreadsheet Write   |      ~120 ms |
| Drive Upload        |       ~1.5 s |
| SMS Send (parallel) |       ~2.3 s |
| Total Submission    |       ~3.5 s |

---

## Frozen Architecture

Backend architecture is frozen as of Build v8.1.

Future development must preserve:

- SSOT
- Module responsibilities
- Spreadsheet gateway
- Infrastructure isolation
- Config.gs as the sole configuration authority

Only bug fixes, measurable performance improvements, and new business features may modify the backend.

---

## Script Properties

### Required Properties

| Property               | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `SPREADSHEET_ID`       | Primary database ID                     |
| `SMS_API_TOKEN`        | Payless SMS authentication              |
| `ATTACHMENT_FOLDER_ID` | Drive folder for attachments (optional) |

### Retrieval

```javascript
getSecret("SPREADSHEET_ID");
```

Authoritative File: `Spreadsheet.gs`

---

## SSOT Compliance Audit

| Item                         | Status                 |
| ---------------------------- | ---------------------- |
| SpreadsheetApp.openById()    | ✅ Only Spreadsheet.gs |
| CONFIG.DATABASE              | ✅ None                |
| CONFIG.STORAGE               | ✅ None                |
| getSecret("SPREADSHEET_ID")  | ✅ Spreadsheet.gs only |
| Hardcoded sheet names        | ✅ None                |
| Duplicate functions          | ✅ None                |
| Module responsibilities      | ✅ Clear               |
| Configuration centralization | ✅ Complete            |
| VS Code + clasp workflow     | ✅ Adopted             |
| Performance instrumentation  | ✅ Available           |

---

**Document Status:** Frozen (v4.0)

```

---

## Summary of Changes

| Change | Description |
|--------|-------------|
| **Purpose** | Strengthened and clarified |
| **Backend Engineering Principles** | Added new section |
| **Configuration** | Removed references to non-existent sections |
| **Module Inventory** | Added README.gs, updated versions |
| **Spreadsheet Access** | Added column reference rule |
| **SMS Section** | Reorganized with workflow and logging |
| **Tracking ID** | Added immutability rule |
| **Module Dependency Rules** | Added Config.gs as read-only available to all |
| **Development Workflow** | New section documenting VS Code + Git + clasp |
| **Performance** | New section with baseline metrics |
| **Frozen Architecture** | New section documenting freeze policy |
| **Compliance Audit** | Added workflow and performance items |
```
