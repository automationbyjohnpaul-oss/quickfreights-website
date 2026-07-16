markdown

# Quick Freights Global Limited

## Backend Module Responsibilities

**Document Version:** 1.1
**Backend Version:** v7.1
**Last Updated:** 2026-07-14
**Status:** Frozen

---

## Purpose

This document defines the responsibility of every backend module. Each module has a single responsibility. Business logic must never leak into infrastructure modules. Infrastructure must never contain business rules.

This document is part of the Backend Source of Truth (SSOT).

---

## Module Ownership Rules

The following operations have a single authoritative owner. No other module may implement or duplicate these responsibilities.

| Responsibility                                            | Authoritative Module |
| --------------------------------------------------------- | -------------------- |
| Web App entry points (`doGet`, `doPost`, `doOptions`)     | `Main.gs`            |
| Apps Script triggers (`onEdit`, `onOpen`, scheduled jobs) | `Triggers.gs`        |
| Shipment workflow & status transitions                    | `Status.gs`          |
| SMS sending                                               | `SMS.gs`             |
| SMS template construction                                 | `SMS.gs`             |
| SMS logging                                               | `SMS.gs`             |
| Spreadsheet gateway (`SpreadsheetApp.openById`)           | `Spreadsheet.gs`     |
| Sheet CRUD operations                                     | `Sheets.gs`          |
| Google Drive operations                                   | `Drive.gs`           |
| Tracking ID generation                                    | `Tracking.gs`        |
| Input validation                                          | `Validation.gs`      |
| Generic helper functions                                  | `Utilities.gs`       |
| Application logging                                       | `Logger.gs`          |
| Configuration / SSOT                                      | `Config.gs`          |

**No duplicate implementations are permitted.**

---

## Architecture Overview

┌─────────────────────────────────────────────────────────────┐
│ Presentation Layer │
│ Main.gs │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ Business Layer │
│ ┌─────────────┐ ┌────────────┐ ┌───────────┐ ┌────────┐ │
│ │Validation.gs│ │Tracking.gs │ │ Drive.gs │ │SMS.gs │ │
│ └─────────────┘ └────────────┘ └───────────┘ └────────┘ │
│ ┌─────────────┐ │
│ │ Status.gs │ │
│ └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ Infrastructure Layer │
│ ┌───────────────┐ ┌───────────┐ ┌───────────┐ ┌────────┐ │
│ │Spreadsheet.gs │ │Sheets.gs │ │Utilities │ │Logger │ │
│ └───────────────┘ └───────────┘ └───────────┘ └────────┘ │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ Automation Layer │
│ Triggers.gs │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ Configuration Layer │
│ Config.gs │
└─────────────────────────────────────────────────────────────┘

text

---

## Module Responsibilities

### Main.gs

- Web App entry points (`doGet`, `doPost`, `doOptions`)
- Request orchestration
- API responses

**Delegates to:** `Validation.gs`, `Tracking.gs`, `Drive.gs`, `Sheets.gs`, `SMS.gs`

**Must NOT:**

- Access `SpreadsheetApp` directly
- Send SMS directly
- Generate Tracking IDs
- Perform business validation
- Contain configuration values

---

### Config.gs

- Single Source of Truth (SSOT)
- Company information
- Sheet names
- Status values
- SMS templates
- Validation rules
- Drive configuration
- Contact details
- Feature flags
- Column mappings

**Must NOT:**

- Open spreadsheets
- Execute business logic
- Send SMS

---

### Utilities.gs

- Generic reusable helper functions (`now()`, `clean()`)
- Formatting helpers

**Must NOT:**

- Read Sheets
- Send SMS
- Contain business rules

---

### Validation.gs

- Form validation
- Duplicate checks
- Required field validation

**Must NOT:**

- Send SMS
- Save data
- Generate Tracking IDs

---

### Tracking.gs

- `generateTrackingID()`
- Tracking format
- Random ID generation

**Must NOT:**

- Send SMS
- Save submissions
- Access `SpreadsheetApp` directly

---

### Drive.gs

- File upload
- File validation
- Folder management

**Must NOT:**

- Save submissions
- Send SMS
- Update shipment status

---

### SMS.gs

- SMS sending
- SMS templates
- SMS logging
- Provider integration
- `processStatusChange()` (business rules for status SMS)

**Must NOT:**

- Decide shipment workflow
- Access `SpreadsheetApp` directly
- Process status transitions (delegates from Status.gs)

---

### Status.gs

- Status transitions
- Status validation
- Duplicate notification prevention
- Status business rules

**Delegates to:** `SMS.gs`, `Sheets.gs`

**Must NOT:**

- Call `SpreadsheetApp` directly
- Build SMS messages

---

### Spreadsheet.gs

- `getSpreadsheet()`
- `getSheet()`

**This is the ONLY module allowed to call `SpreadsheetApp.openById()`**

**Must NOT:**

- Contain business logic
- Send SMS
- Validate submissions

---

### Sheets.gs

- Save submission
- Read submission
- Status context (`getStatusChangeContext()`)
- SMS flags (`markSMSFlag()`)
- Error logging
- Sheet read/write operations

**Must NOT:**

- Send SMS
- Decide workflow
- Generate tracking IDs

---

### Logger.gs

- Error logging (`logError()`)
- Information logging (`logInfo()`)
- Warning logging

**Must NOT:**

- Modify business data
- Send SMS

---

### Triggers.gs

- Apps Script triggers (`onEdit`, `onOpen`, scheduled jobs)
- `dailyMaintenance()`

**Delegates to:** `Status.gs` for status changes

**Must NOT:**

- Send SMS directly
- Access `SpreadsheetApp` directly
- Contain business rules

---

## Dependency Matrix

### Approved Dependency Flow

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

text

### Forbidden Dependencies

The following are architectural violations:

| Violation                                          | Reason                              |
| -------------------------------------------------- | ----------------------------------- |
| `SMS.gs` → `SpreadsheetApp.openById()`             | Only `Spreadsheet.gs` may call this |
| `SMS.gs` → `SpreadsheetApp.getActiveSpreadsheet()` | Only `Spreadsheet.gs` may call this |
| `Status.gs` → `SpreadsheetApp.openById()`          | Only `Spreadsheet.gs` may call this |
| `Main.gs` → `SpreadsheetApp.openById()`            | Only `Spreadsheet.gs` may call this |
| `Utilities.gs` → Business logic                    | Utilities are generic helpers only  |
| `Config.gs` → Business logic                       | Config is SSOT only                 |
| `Spreadsheet.gs` → Business logic                  | Spreadsheet is infrastructure only  |
| `SMS.gs` → `Status.gs`                             | Business layer cannot depend upward |

---

## Architectural Rules

### Rule 1 — Single Responsibility

Every module owns exactly one responsibility. Modules must never become "utility dumping grounds."

### Rule 2 — No Duplicate Functions

A public function may exist in one module only.

- `now()` → `Utilities.gs`
- `logSMS()` → `SMS.gs`
- `getSpreadsheet()` → `Spreadsheet.gs`
- `jsonResponse()` → `Main.gs`

### Rule 3 — Infrastructure Isolation

Only `Spreadsheet.gs` may call `SpreadsheetApp.openById()`. All other modules must use `getSpreadsheet()` or `getSheet()`.

### Rule 4 — SSOT Compliance

The following values must never be hardcoded outside `Config.gs`:

- Sheet names
- Sheet column numbers
- Shipment statuses
- SMS templates
- Company information
- Phone numbers
- Email addresses
- Google Drive folder IDs
- Validation limits
- Feature flags

### Rule 5 — Business Logic Separation

Business decisions belong only to business modules:

- Status transition decisions → `Status.gs`
- SMS composition → `SMS.gs`
- Tracking generation → `Tracking.gs`
- Validation → `Validation.gs`

Infrastructure modules must never contain business rules.

### Rule 6 — Trigger Isolation

`Triggers.gs` is an entry point only. It may receive Apps Script events and delegate work. It must not send SMS, update sheets directly, or implement workflow logic.

---

## Duplicate Cleanup Status

| Function              | Kept In             | Removed From          | Status      |
| --------------------- | ------------------- | --------------------- | ----------- |
| `now()`               | `Utilities.gs`      | `Sheets.gs`           | ✅ Resolved |
| `logSMS()`            | `SMS.gs`            | `Sheets.gs`           | ✅ Resolved |
| `jsonResponse`        | `Main.gs`           | `Utilities.gs`        | ✅ Resolved |
| `updateSMSSentStatus` | ❌ Removed entirely | `SMS.gs`, `Sheets.gs` | ✅ Resolved |

---

## Version History

| Version | Date       | Summary                                                                                                             |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| 1.0     | 2026-07-14 | Initial module responsibility document created                                                                      |
| 1.1     | 2026-07-14 | Added Module Ownership Rules, Dependency Matrix, Architectural Rules, SSOT governance, and duplicate cleanup status |

---

## Freeze Statement

This document forms part of the Quick Freights Backend Source of Truth.

Any change to module ownership or dependency direction requires:

1. Architecture review
2. Update to this document
3. Update to the Backend Source of Truth
4. Entry in the Backend Build Log
5. Version increment

No production code may violate the responsibilities defined herein.

---

**Document Status:** Frozen (V1.1)
