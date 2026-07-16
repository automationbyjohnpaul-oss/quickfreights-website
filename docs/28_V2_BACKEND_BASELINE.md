28 — V2 BACKEND BASELINE

## Quick Freights Global Limited Platform

**Document Version:** 3.0
**Platform Release:** V2.0
**Backend Build:** v8.1
**Status:** Frozen Baseline
**Last Updated:** July 2026

---

## Purpose

This document defines the official production baseline of the Quick Freights Platform backend.

It serves as the engineering reference point for all future development. Any future enhancement, optimization, or feature must preserve the architectural principles documented here unless an approved architectural decision supersedes them.

This document represents the backend state after successful completion of Backend V2.

---

## Backend Overview

Backend technology:

- Google Apps Script
- Google Sheets
- Google Drive
- Payless Bulk SMS
- GitHub
- VS Code
- clasp CLI

The backend provides:

- Bill of Lading submission
- Data validation
- Tracking ID generation
- Google Sheets persistence
- Google Drive attachment storage
- Customer SMS notifications
- Staff SMS alerts
- Shipment Status synchronization
- Error logging
- Performance instrumentation
- Parallel SMS sending

---

## Architecture

The backend follows a modular Single Source of Truth (SSOT) architecture.
Frontend
│
▼
Apps Script Web App (Main.gs)
│
├──────── Validation.gs
│
├──────── Tracking.gs
│
├──────── Drive.gs
│
├──────── Sheets.gs
│
├──────── SMS.gs
│
├──────── Status.gs
│
├──────── Performance.gs
│
└──────── Logger.gs

text

Every module has a clearly defined responsibility.

---

## Core Design Principles

The backend follows these principles:

- Single Source of Truth
- Separation of Concerns
- Infrastructure Isolation
- Modular Design
- Fail-safe Error Handling
- Production-first Development
- AI Debugging Compatibility
- Documentation-driven Engineering
- Performance Instrumentation
- Non-blocking Operations

---

## Module Inventory (17 Modules)

### Core Modules

| Module         | Version | Responsibility      |
| -------------- | ------- | ------------------- |
| Config.gs      | v8.1    | SSOT configuration  |
| Spreadsheet.gs | v2.0    | Spreadsheet gateway |
| Utilities.gs   | v1.1    | Generic helpers     |
| Logger.gs      | v1.1    | Application logging |

### Business Modules

| Module           | Version | Responsibility                         |
| ---------------- | ------- | -------------------------------------- |
| Validation.gs    | v7.0    | Input validation                       |
| Tracking.gs      | v7.0    | Tracking ID generation                 |
| Sheets.gs        | v7.3    | Sheet CRUD operations                  |
| Drive.gs         | v7.0    | Google Drive operations                |
| SMS.gs           | v8.2    | SMS sending and logging                |
| Status.gs        | v1.1    | Shipment workflow                      |
| Triggers.gs      | v1.0    | Apps Script triggers                   |
| Performance.gs   | v1.0    | Performance instrumentation            |
| Main.gs          | v8.2    | API entry point                        |
| Notifications.gs | v1.0    | Notification placeholder               |
| Reports.gs       | v1.0    | Reports placeholder                    |
| test.gs          | v1.0    | Test functions                         |
| README.gs        | v1.0    | Project documentation (non-executable) |

---

## Single Source of Truth Rules

The following architectural rules are mandatory.

### Spreadsheet Access

Only `Spreadsheet.gs` may call `SpreadsheetApp.openById()`

### Script Properties

Only `Spreadsheet.gs` retrieves `SPREADSHEET_ID` through `getSecret()`

### JSON Responses

Only `Main.gs` contains `jsonResponse()`

### Timestamp

Only `Utilities.gs` contains `now()`

### Status Workflow

Only `Status.gs` contains `processStatusChange()`

### SMS

SMS sending occurs only through `SMS.gs`

### Performance

Performance timing occurs only through `Performance.gs`

---

## Performance Philosophy

The Quick Freights backend prioritizes:

- correctness
- reliability
- maintainability
- operational visibility

over micro-optimizations.

Measured performance demonstrated that the primary contributor to end-user latency is Google Apps Script Web App execution rather than application logic.

Future optimization efforts should therefore be evidence-driven and supported by performance measurements before architectural changes are introduced.

---

## Performance Characteristics

Performance varies depending on Google Apps Script runtime startup, Google Drive operations, and network latency.

Typical internal processing remains low, while total end-user response time is largely governed by Apps Script Web App execution.

**Application-level optimizations completed:**

- ✅ Notification queue infrastructure
- ✅ Parallel SMS sending
- ✅ Performance instrumentation
- ✅ Non-blocking SMS processing

**Future optimization** should focus on measurable bottlenecks rather than architectural refactoring.

---

## Required Google Services

The backend requires:

- Google Sheets
- Google Drive
- Apps Script
- Script Properties

External service:

- Payless Bulk SMS

---

## Required Script Properties

The following Script Properties must exist:
SPREADSHEET_ID
SMS_API_TOKEN

text

No secrets are stored in source code.

---

## Required Sheets

Spreadsheet must contain:

| Sheet           | Purpose                        |
| --------------- | ------------------------------ |
| Submissions     | Primary submission records     |
| Shipment Status | Status tracking with SMS flags |
| SMS Log         | SMS delivery logging           |
| Error Log       | Error tracking                 |

---

## Development Workflow

Development is performed exclusively using:
VS Code
↓
Git
↓
clasp
↓
Apps Script
↓
Deployment

text

Direct browser editing is reserved for emergency production fixes only.

---

## Deployment Workflow

Edit in VS Code
↓
clasp push
↓
Create Version
↓
Deploy
↓
Production

text

---

## AI Engineering Compatibility

The backend has been structured to support AI-assisted maintenance and development through:

- modular responsibilities
- Single Source of Truth configuration
- comprehensive documentation
- deterministic module ownership
- consistent naming conventions
- centralized configuration
- documented architectural decisions

This structure reduces ambiguity and improves the reliability of future AI-assisted debugging and enhancement.

---

## Current Capabilities

Completed:

- ✅ Bill of Lading submission
- ✅ Validation
- ✅ Tracking ID generation
- ✅ Attachment upload
- ✅ Google Sheets storage
- ✅ Shipment Status synchronization
- ✅ Customer SMS
- ✅ Staff SMS
- ✅ Performance instrumentation
- ✅ Error logging
- ✅ Parallel SMS sending
- ✅ Notification queue infrastructure

---

## Deferred Features

The following features are intentionally postponed to V3:

- Customer Tracking Page
- Shipment Status Lookup
- Admin Operations Interface
- Status Update Workflow
- Automated Status-change SMS
- Analytics Dashboard

Deferred pending operational feedback from production deployment.

---

## Known Limitations

Current backend limitations include:

- Google Apps Script Web App startup latency
- Google Drive upload latency
- External SMS provider response variability
- Apps Script execution quotas
- Notification queue background processing reserved for future trigger-based execution

These limitations are platform constraints rather than application defects.

---

## Production Checklist

Backend V2 satisfies the following:

- ✅ Modular architecture
- ✅ SSOT compliant
- ✅ Config centralized
- ✅ Google Drive integrated
- ✅ Google Sheets integrated
- ✅ SMS operational
- ✅ Error logging operational
- ✅ Validation complete
- ✅ clasp workflow established
- ✅ Git version controlled
- ✅ Production deployment documented
- ✅ Performance instrumentation
- ✅ Parallel SMS
- ✅ Notification queue infrastructure

---

## Production Freeze

Backend v8.1 represents the frozen production baseline.

Infrastructure changes shall only be made to address:

- critical defects
- verified security issues
- measurable performance regressions
- platform compatibility changes

All future feature development should build upon this baseline without altering the established architecture unless an approved architectural decision is recorded.

---

## Change Control

Future changes shall:

- preserve SSOT principles
- maintain module responsibilities
- avoid duplicate functionality
- update documentation when architecture changes
- preserve backward compatibility whenever practical

---

## Baseline Declaration

Backend V2 (v8.1) is declared the official production engineering baseline for the Quick Freights Platform.

Future development shall focus on business functionality rather than backend infrastructure unless critical defects, security issues, or measurable performance regressions require architectural modification.

---

**Document Status:** Frozen (V3.0)
