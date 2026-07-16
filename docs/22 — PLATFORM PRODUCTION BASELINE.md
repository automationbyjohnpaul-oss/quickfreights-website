# 22 — PLATFORM PRODUCTION BASELINE

## Quick Freights Global Limited Platform

**Frontend Release:** V1.0 Production
**Backend Release:** V2.0 Production Baseline (Build 8.1)
**Date:** July 2026
**Status:** ✅ Frozen

---

## Purpose

This document captures the frozen production baseline of the Quick Freights Platform.

It records the approved state of both the frontend (V1) and backend (V2) at the time of release and defines the architectural boundaries that future development must respect.

---

## Frontend — V1.0 Production (Frozen)

### Frozen Decisions

Do not change without explicit approval:

#### Brand & Identity

- **Brand colors:** Navy (#0A1F3F), Gold (#DAA520), White (#FFFFFF)
- **Logo:** QUICK FREIGHTS GLOBAL LIMITED with RC: 8106184
- **Tagline:** "Moving Cargo | Building Trust"
- **Subsidiary notice:** "A subsidiary of Bondex Bridge Multinational Terminal Ltd Company"

#### Terminology

- **"Cargo Portal"** — Not "Submit B/L", not "Track Shipment"
- **"Start Shipment"** → replaced by "Cargo Portal" site-wide
- **"Email Support"** — Not "Email Us"

#### Architecture

- **Communication:** WhatsApp / Email / Phone workflow
- **Floating widget:** JavaScript-generated, single source in `floating-widget.js`
- **Config:** Centralized in `communication.config.js`
- **Hosting:** GitHub Pages (static only)

#### Layout

- **Hero:** Split layout, reduced height (60vh mobile / 55vh desktop)
- **Trust Bar:** Proof-based stacked credentials with gold checkmarks
- **How It Works:** 4-step process section
- **CTA hierarchy:** Cargo Portal primary, Our Services secondary

#### Submission Overlay

- **Progress:** Event-driven stage progression with gradient bar (never hits 100%)
- **Messages:** Rotating reassurance messages during processing
- **Timer:** Elapsed timer displayed during submission
- **Success:** "Shipment Registered Successfully" animation
- **Accessibility:** ESC blocked during processing, reduced motion support
- **File limits:** 5MB, PDF/JPG/PNG only

---

### Current Technology Stack — Frontend

| Layer         | Technology                 | Version |
| ------------- | -------------------------- | ------- |
| HTML          | HTML5                      | —       |
| CSS           | Custom Design System       | V5.9    |
| JavaScript    | Vanilla (no frameworks)    | V6.0    |
| Hosting       | GitHub Pages               | —       |
| Communication | WhatsApp API (wa.me links) | —       |
| Fonts         | Google Fonts (Inter)       | —       |
| Images        | WebP format                | —       |

---

### File Manifest — Frontend

| File                      | Version | Purpose                                   |
| ------------------------- | ------- | ----------------------------------------- |
| `index.html`              | V2.0.1  | Homepage                                  |
| `about.html`              | V1.1    | Company story & values                    |
| `services.html`           | V1.1    | Service categories                        |
| `track.html`              | V1.3    | Cargo Portal with premium overlay         |
| `contact.html`            | V1.1    | Contact methods & office locations        |
| `privacy-policy.html`     | V1.0    | Legal compliance                          |
| `404.html`                | V1.0    | Error page                                |
| `styles.css`              | V5.9    | Design system with overlay styles         |
| `script.js`               | V6.0    | Form handling, overlay, submission choice |
| `communication.config.js` | V1.0.1  | Centralized contact configuration         |
| `floating-widget.js`      | V1.0.3  | Dynamic floating contact widget           |
| `sitemap.xml`             | V1.0    | SEO sitemap                               |
| `robots.txt`              | V1.0    | Search engine instructions                |

---

## Backend — V2.0 Production Baseline (Build 8.1)

### Backend Freeze

The backend architecture is frozen as of Backend Build 8.1.

**Future development shall:**

- Preserve SSOT architecture
- Preserve module responsibilities
- Preserve Spreadsheet gateway
- Preserve `Config.gs` as the only configuration authority
- Avoid architectural refactoring unless correcting defects, security issues, or measurable performance bottlenecks

### Architecture Status

**Status:** ✅ Frozen (v8.1)

### Module Inventory (17 Modules)

| Module           | Version | Responsibility                         |
| ---------------- | ------- | -------------------------------------- |
| Config.gs        | v8.1    | SSOT configuration                     |
| Spreadsheet.gs   | v2.0    | Spreadsheet gateway                    |
| Utilities.gs     | v1.1    | Generic helper functions               |
| Logger.gs        | v1.1    | Application logging                    |
| Validation.gs    | v7.0    | Input validation                       |
| Tracking.gs      | v7.0    | Tracking ID generation                 |
| Sheets.gs        | v7.3    | Sheet CRUD operations                  |
| Drive.gs         | v7.0    | Google Drive operations                |
| SMS.gs           | v8.2    | SMS sending and logging                |
| Status.gs        | v1.1    | Shipment workflow                      |
| Triggers.gs      | v1.0    | Apps Script triggers                   |
| Performance.gs   | v1.0    | Request-scoped timing                  |
| Main.gs          | v8.2    | API entry point                        |
| Notifications.gs | v1.0    | Notification placeholder               |
| Reports.gs       | v1.0    | Reports placeholder                    |
| test.gs          | v1.0    | Test functions                         |
| README.gs        | v1.0    | Project documentation (non-executable) |

---

### Development Workflow (Frozen)

| Component          | Tool                                               |
| ------------------ | -------------------------------------------------- |
| Source Editor      | Visual Studio Code                                 |
| Source Control     | Git / GitHub                                       |
| Deployment         | clasp                                              |
| Runtime            | Google Apps Script                                 |
| Apps Script Editor | Deployment, monitoring and trigger management only |

---

### Backend Technology Stack

| Layer           | Technology         | Version |
| --------------- | ------------------ | ------- |
| Runtime         | Google Apps Script | V8      |
| Database        | Google Sheets      | —       |
| Storage         | Google Drive       | —       |
| SMS             | Payless Bulk SMS   | —       |
| Deployment      | clasp              | —       |
| Version Control | Git / GitHub       | —       |

---

### Required Google Sheets

| Sheet              | Purpose                        |
| ------------------ | ------------------------------ |
| Submissions        | Primary submission records     |
| Shipment Status    | Status tracking with SMS flags |
| SMS Log            | SMS delivery logging           |
| Error Log          | Error tracking                 |
| Notification Queue | Async notification queue       |

---

### Required Script Properties

| Property         | Purpose                    |
| ---------------- | -------------------------- |
| `SPREADSHEET_ID` | Primary database ID        |
| `SMS_API_TOKEN`  | Payless SMS authentication |

---

### Backend SSOT Compliance

| Audit Item                  | Result              |
| --------------------------- | ------------------- |
| SpreadsheetApp.openById()   | Only Spreadsheet.gs |
| CONFIG.DATABASE             | None                |
| CONFIG.STORAGE              | None                |
| getSecret("SPREADSHEET_ID") | Spreadsheet.gs only |
| Hardcoded sheet names       | None                |
| Duplicate functions         | None                |

---

## Performance Baseline

Measured average submission time: **7–14 seconds**

Observed primary bottleneck: Google Apps Script Web App runtime.

**Application-level optimizations completed:**

- ✅ Notification queue
- ✅ Parallel SMS
- ✅ Performance instrumentation

**Future optimization** should focus on measurable bottlenecks rather than architectural refactoring.

| Operation           | Typical Time |
| ------------------- | -----------: |
| Validation          |       ~12 ms |
| Tracking Generation |        ~8 ms |
| Spreadsheet Write   |      ~120 ms |
| Drive Upload        |       ~1.5 s |
| SMS Send (parallel) |       ~2.3 s |
| Total Submission    |       ~3.5 s |

---

## V1 Known Limitations (Frozen)

These are intentionally deferred to V3:

- ❌ No customer self-service tracking
- ❌ No admin dashboard
- ❌ No shipment timeline
- ❌ No CRM integration
- ❌ No payment processing
- ❌ No analytics dashboard
- ❌ Notification queue currently processes within Apps Script runtime constraints

---

## V2 Strengths (Protect These)

- ✅ Clean, professional corporate design
- ✅ Mobile-responsive across all breakpoints
- ✅ SEO-optimized (titles, meta, schema, sitemap)
- ✅ Accessible (skip links, ARIA labels, focus states)
- ✅ Fast (static HTML, WebP images, minimal JS)
- ✅ Secure (no database, no user data storage)
- ✅ Simple communication flow (WhatsApp / Email / Phone)
- ✅ Modular backend architecture (17 modules)
- ✅ SSOT compliance
- ✅ Performance instrumentation
- ✅ Comprehensive documentation
- ✅ VS Code + Git + clasp workflow
- ✅ Production deployment pipeline
- ✅ Infrastructure isolated behind Spreadsheet.gs
- ✅ Runtime performance measurement
- ✅ Notification queue architecture

---

## V3 Development Areas

When V3 begins, start from these:

1. **Customer Tracking**
   - Tracking ID lookup
   - Shipment status timeline
   - Progress display

2. **Admin Operations**
   - Shipment management
   - Status updates
   - Customer lookup

3. **SMS Automation**
   - Automated status-change SMS
   - Customer notifications

4. **Analytics**
   - Submission reports
   - Performance metrics
   - Operational dashboards

---

## AI Session Quick Start

For any new AI session working on this project:

1. Read this document first
2. Check `17_SOURCE_OF_TRUTH.md` for project rules
3. Check `06_DECISION_LOG.md` for why decisions were made
4. Check `24_BACKEND_SOURCE_OF_TRUTH.md` for backend rules
5. Check `28_V2_BACKEND_BASELINE.md` for backend baseline
6. Check `29_OPERATIONS_RUNBOOK.md` for operational procedures
7. Do not redesign frozen elements
8. Focus on V3 features or bug fixes only

---

## Contact for Approvals

For any changes to frozen elements, contact:

- **Project Owner:** Quick Freights Global Limited
- **Company:** Quick Freights Global Limited
- **RC:** 8106184

---

## Document Status

**Frontend:** V1.0 Production (Frozen)

**Backend:** V2.0 Production Baseline (Frozen)

**Future development begins with Platform V3.**

---

**End of Document**
