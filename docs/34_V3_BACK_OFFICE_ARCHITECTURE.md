34 — V3 BACK OFFICE ARCHITECTURE

## Quick Freights Global Limited Platform

**Document Version:** 1.0
**Status:** Planning
**Last Updated:** July 2026
**Platform Version:** V3 (Planned)

---

## Purpose

This document defines the technical architecture for the Quick Freights Back Office Application.

It covers folder structure, API endpoints, data flow, security, and reuse of V2 components.

---

## Overview

The Back Office is a separate web application that shares the same V2 backend.
Customer Website (apps/website/)
│
▼
V2 Backend (Google Apps Script)
│
▼
Back Office (apps/backoffice/)
│
└── Staff Dashboard
└── Shipment Management
└── Status Updates
└── Reports

text

---

## Folder Structure

apps/
website/ ← Customer-facing (V1)
├── css/
├── js/
├── images/
├── index.html
└── ...

backoffice/ ← Staff-facing (V3)
├── css/
│ └── styles.css
├── js/
│ ├── app.js
│ ├── auth.js
│ ├── dashboard.js
│ ├── submissions.js
│ ├── status.js
│ ├── customers.js
│ ├── reports.js
│ └── settings.js
├── images/
├── index.html
├── dashboard.html
├── submissions.html
├── status.html
├── customers.html
├── reports.html
└── settings.html

text

---

## API Endpoints

### Existing Endpoints (V2)

| Endpoint | Method | Purpose               |
| -------- | ------ | --------------------- |
| `doPost` | POST   | Submit B/L (customer) |

### New Endpoints (V3)

| Endpoint                       | Method | Purpose                |
| ------------------------------ | ------ | ---------------------- |
| `doPost?action=login`          | POST   | Authenticate staff     |
| `doGet?action=dashboard`       | GET    | Dashboard metrics      |
| `doGet?action=submissions`     | GET    | List submissions       |
| `doGet?action=submission&id=`  | GET    | Get submission details |
| `doGet?action=customer&phone=` | GET    | Customer lookup        |
| `doPost?action=updateStatus`   | POST   | Update shipment status |
| `doGet?action=reports`         | GET    | Operational reports    |

---

## Data Flow

Staff
│
▼
Back Office (apps/backoffice/)
│
│ fetch()
▼
Google Apps Script
│
│ doGet() / doPost()
▼
Main.gs (extended)
│
├── Authentication check
├── Route to action
│
▼
Business Modules
│
├── Sheets.gs (read/write)
├── Status.gs (update status)
├── SMS.gs (trigger SMS)
└── Performance.gs (timing)
│
▼
Google Sheets

text

---

## Security

### Authentication Flow

Staff enters credentials

Back Office sends to doPost?action=login

Apps Script validates against Script Properties

Token generated (expires 8h)

Token stored in localStorage

Every request includes token

Route guard validates token on page load

text

### Protected Routes

All Back Office pages are protected:

- `dashboard.html`
- `submissions.html`
- `status.html`
- `customers.html`
- `reports.html`
- `settings.html`

### Session Timeout

- Session expires after 8 hours
- Token stored in `localStorage`
- Redirect to login on expiry

### Password Storage

- Password stored in Script Properties
- Never stored in code
- Never sent to frontend

---

## Reuse Matrix

### From V2 (Unchanged)

| Module           | Purpose                     |
| ---------------- | --------------------------- |
| `Config.gs`      | SSOT configuration          |
| `Spreadsheet.gs` | Spreadsheet gateway         |
| `Utilities.gs`   | Generic helpers             |
| `Logger.gs`      | Application logging         |
| `Validation.gs`  | Input validation            |
| `Tracking.gs`    | Tracking ID generation      |
| `Sheets.gs`      | Sheet CRUD operations       |
| `Drive.gs`       | Google Drive operations     |
| `SMS.gs`         | SMS sending and logging     |
| `Performance.gs` | Performance instrumentation |

### From V2 (Extended)

| Module      | Extension                                               |
| ----------- | ------------------------------------------------------- |
| `Main.gs`   | Add doGet for read endpoints, doPost for status updates |
| `Status.gs` | Add status update workflow, history tracking            |

### Added for V3

| Module         | Purpose                          |
| -------------- | -------------------------------- |
| `Auth.gs`      | Authentication, token validation |
| `Dashboard.gs` | Dashboard metrics aggregation    |
| `Reports.gs`   | Reporting and analytics          |

---

## Component Reuse

### From Website (V1)

| Component      | Reuse |
| -------------- | ----- |
| CSS Variables  | ✅    |
| Brand Colours  | ✅    |
| Typography     | ✅    |
| Button Styles  | ✅    |
| Card Styles    | ✅    |
| Spacing System | ✅    |

---

## Performance

### Dashboard

- Dashboard cards load from Sheets
- Caching considered for frequent queries
- Pagination for submissions list
- Search debouncing

### Targets

| Page             | Target      |
| ---------------- | ----------- |
| Dashboard        | < 3 seconds |
| Submissions list | < 3 seconds |
| Status update    | < 5 seconds |
| Customer lookup  | < 2 seconds |

---

## Error Handling

| Error            | Action                                       |
| ---------------- | -------------------------------------------- |
| Network error    | Show retry button                            |
| Auth error       | Redirect to login                            |
| Validation error | Show inline message                          |
| Server error     | Log to Error Log, show user-friendly message |

---

## Related Documents

- 32_V3_BACK_OFFICE_OVERVIEW.md
- 33_V3_BACK_OFFICE_SOURCE_OF_TRUTH.md
- 35_V3_BACK_OFFICE_ROADMAP.md
- 24_BACKEND_SOURCE_OF_TRUTH.md

---

**Document Status:** Planning (V1.0)
Phase 1 — Infrastructure

Session 1.1 — Backend & Frontend Infrastructure
Status: ✅ Completed

Completed:

- config.js (frontend SSOT)
- api.js (generic API client)
- Auth.gs (backend auth, corrected)
- auth.js (frontend auth)
- Main.gs (routing separated)
- Dashboard.gs (placeholder)
