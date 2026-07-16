# 28_V2_BACKEND_BASELINE.md

**Project:** Quick Freights Platform
**Company:** Quick Freights Global Limited
**Document Version:** 1.0.0
**Backend Version:** V2.0 (Production Baseline)
**Status:** Frozen Baseline
**Last Updated:** July 15, 2026

---

# Purpose

This document defines the official production baseline of the Quick Freights Platform backend.

It serves as the engineering reference point for all future development. Any future enhancement, optimization, or feature must preserve the architectural principles documented here unless an approved architectural decision supersedes them.

This document represents the backend state after successful completion of Backend V2.

---

# Backend Overview

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

---

# Architecture

The backend follows a modular Single Source of Truth (SSOT) architecture.

```
Frontend
      │
      ▼
Apps Script Web App
      │
      ├──────── Validation
      │
      ├──────── Tracking
      │
      ├──────── Drive
      │
      ├──────── Sheets
      │
      ├──────── SMS
      │
      ├──────── Status
      │
      └──────── Logger
```

Every module has a clearly defined responsibility.

---

# Core Design Principles

The backend follows these principles:

- Single Source of Truth
- Separation of Concerns
- Infrastructure Isolation
- Modular Design
- Fail-safe Error Handling
- Production-first Development
- AI Debugging Compatibility
- Documentation-driven Engineering

---

# Module Inventory

## Main

Responsibilities

- Web App entry point
- Request routing
- Response formatting
- Submission orchestration

---

## Config

Responsibilities

- Global configuration
- Business constants
- SMS configuration
- Drive configuration
- Validation configuration
- Sheet configuration
- Script Properties access

---

## Validation

Responsibilities

- Request validation
- Phone normalization
- Duplicate B/L detection
- Input sanitization

---

## Tracking

Responsibilities

- Tracking ID generation
- Tracking uniqueness
- Tracking utilities

---

## Spreadsheet

Responsibilities

- Open spreadsheet
- Return sheet references

This is the only module permitted to call:

```
SpreadsheetApp.openById()
```

---

## Sheets

Responsibilities

- Save submissions
- Read submissions
- Status synchronization
- Error sheet logging

---

## Drive

Responsibilities

- File validation
- Attachment upload
- Folder management
- Attachment retrieval

---

## SMS

Responsibilities

- Customer notifications
- Staff notifications
- SMS provider integration
- SMS logging

---

## Status

Responsibilities

- Shipment status workflow
- Status notification routing

---

## Utilities

Responsibilities

- Common helper functions
- Timestamp generation
- Shared utilities

---

## Logger

Responsibilities

- Application logging
- Error recording

---

## Triggers

Responsibilities

- Spreadsheet triggers
- Scheduled maintenance

---

# Single Source of Truth Rules

The following architectural rules are mandatory.

## Spreadsheet Access

Only

```
Spreadsheet.gs
```

may call

```
SpreadsheetApp.openById()
```

---

## Script Properties

Only

```
Spreadsheet.gs
```

retrieves

```
SPREADSHEET_ID
```

through

```
getSecret()
```

---

## JSON Responses

Only

```
Main.gs
```

contains

```
jsonResponse()
```

---

## Timestamp

Only

```
Utilities.gs
```

contains

```
now()
```

---

## Status Workflow

Only

```
Status.gs
```

contains

```
processStatusChange()
```

---

## SMS

SMS sending occurs only through

```
SMS.gs
```

No other module communicates directly with the SMS provider.

---

# Required Google Services

The backend requires:

- Google Sheets
- Google Drive
- Apps Script
- Script Properties

External service:

- Payless Bulk SMS

---

# Required Script Properties

The following Script Properties must exist.

```
SPREADSHEET_ID
```

```
SMS_API_TOKEN
```

No secrets are stored in source code.

---

# Required Sheets

Spreadsheet must contain:

- Submissions
- Shipment Status
- SMS Log
- Error Log

---

# Development Workflow

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

Direct browser editing is reserved for emergency production fixes only.

---

# Deployment Workflow

```
Edit in VS Code

↓

clasp push

↓

Create Version

↓

Deploy

↓

Production
```

---

# Performance Baseline

Measured production values.

Typical frontend timing:

File Read

Approximately

27 ms

Backend Request

Approximately

13–14 seconds

Total User Wait

Approximately

14 seconds

The dominant latency originates from Google Apps Script runtime and Google infrastructure rather than frontend execution.

Performance optimization beyond this point should be evidence-based using instrumentation.

---

# Current Capabilities

Completed

- Bill of Lading submission
- Validation
- Tracking ID generation
- Attachment upload
- Google Sheets storage
- Shipment Status synchronization
- Customer SMS
- Staff SMS
- Performance instrumentation
- Error logging

---

# Deferred Features

The following features are intentionally postponed to the next development phase.

- Customer Tracking Page
- Shipment Status Lookup
- Admin Operations Interface
- Status Update Workflow
- Automated Status-change SMS
- Analytics Dashboard

These are business features rather than infrastructure work.

---

# Known Limitations

Current backend limitations include:

- Google Apps Script Web App startup latency
- Google Drive upload latency
- External SMS provider response variability
- Apps Script execution quotas

These limitations are platform constraints rather than application defects.

---

# Production Checklist

Backend V2 satisfies the following:

✓ Modular architecture

✓ SSOT compliant

✓ Config centralized

✓ Google Drive integrated

✓ Google Sheets integrated

✓ SMS operational

✓ Error logging operational

✓ Validation complete

✓ clasp workflow established

✓ Git version controlled

✓ Production deployment documented

---

# Change Control

Future changes shall:

- preserve SSOT principles
- maintain module responsibilities
- avoid duplicate functionality
- update documentation when architecture changes
- preserve backward compatibility whenever practical

---

# Baseline Declaration

Backend V2 is declared the official production engineering baseline for the Quick Freights Platform.

Future development shall focus on business functionality rather than backend infrastructure unless critical defects, security issues, or measurable performance regressions require architectural modification.
