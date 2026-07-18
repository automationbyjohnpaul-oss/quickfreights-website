# 07 — CHANGELOG

## Quick Freights Global Limited Platform

**Document Version:** 4.0
**Last Updated:** July 2026
**Status:** Active

---

## Purpose

This document records every significant change made to the Quick Freights Global Limited Platform.

It serves as the authoritative history of what changed, when, and why.

---

## Platform V2.0 — Production Backend Baseline

**Platform Version:** V2.0
**Backend Build:** 8.1
**Release Date:** July 15, 2026
**Release Type:** Major Release
**Status:** ✅ Production

---

### Added

#### Backend Modules

- **Performance.gs** — Request-scoped performance timer with stage tracking
- **Notification Queue** — Asynchronous SMS queuing system
- **Status.gs** — Shipment workflow and status transition logic
- **Triggers.gs** — Apps Script trigger entry points (onEdit, scheduled jobs)

#### Frontend

- Premium submission overlay with event-driven stage progression
- Gradient progress bar (never reaches 100%)
- Rotating reassurance messages during submission
- Elapsed timer for submission processing
- Success animation ("Shipment Registered Successfully")
- ESC key blocked during processing
- Reduced motion support for accessibility

#### SMS

- Parallel SMS sending using `UrlFetchApp.fetchAll()`
- `buildSMSRequest()` helper for parallel requests
- Customer confirmation SMS
- Staff alert SMS
- Status change SMS templates (Discharged, Processing, Cleared)
- SMS Logging with retry tracking

#### Google Sheets

- Notification Queue sheet with status tracking
- Shipment Status sheet with SMS flag columns
- SMS Log sheet with provider response tracking

---

### Changed

#### Architecture

- Migrated from monolithic to modular architecture (17 modules)
- Adopted Single Source of Truth (SSOT) for all configuration
- Standardized spreadsheet access through `Spreadsheet.gs`
- Replaced direct SMS calls with notification queue
- Added performance instrumentation
- Changed response MIME to `text/plain` for CORS compatibility

#### Frontend

- Replaced simple loading spinner with premium overlay
- Improved form validation feedback
- Enhanced success screen with tracking ID display
- Added copy tracking ID functionality

#### Development Workflow

- Migrated development workflow from Apps Script Editor to VS Code + Git + clasp
- Apps Script Editor is now deployment and monitoring only
- Source code managed through Git
- Comprehensive documentation established

---

### Performance

Measured frontend and backend execution.

**Average submission time:** 7–14 seconds

Identified Apps Script runtime latency as the dominant performance bottleneck.

Moved SMS processing outside the critical request path using asynchronous notification queue.

Established performance instrumentation for future optimisation.

| Operation           | Typical Time |
| ------------------- | -----------: |
| Validation          |       ~12 ms |
| Tracking Generation |        ~8 ms |
| Spreadsheet Write   |      ~120 ms |
| Drive Upload        |       ~1.5 s |
| SMS Send (parallel) |       ~2.3 s |
| Total Submission    |       ~3.5 s |

---

### Fixed

- Browser ↔ Apps Script CORS communication
- Duplicate configuration declarations
- Tracking ID visibility on success screen
- Google Sheets column mapping for submissions
- SMS function name conflicts
- `jsonResponse()` duplication
- Hardcoded sheet names across modules
- Attachment upload reliability
- Phone number normalization

---

### Removed

- Monolithic backend architecture (`Code.gs`)
- Duplicate configuration definitions
- Duplicate `COLUMNS` constant from `Sheets.gs`
- Duplicate `now()` from `Sheets.gs`
- Duplicate `jsonResponse()` from `Utilities.gs`
- Duplicate `updateSMSSentStatus()` from multiple files
- Legacy test functions from `Sheets.gs`
- Legacy spreadsheet access
- Legacy SMS workflow
- Temporary debugging infrastructure

---

### Milestone

✅ Backend architecture frozen
✅ Production baseline established
✅ Business feature development begins

---

### Next Planned Release

**Platform V3**

**Focus Areas:**

- Customer shipment tracking
- Admin shipment management
- Shipment status workflow
- Automated status notifications
- Operational analytics

**See:** `31_V3_ROADMAP.md`

---

## Platform V2.0 RC — Architecture Freeze

**Platform Version:** V2.0 RC
**Backend Build:** 8.0
**Release Date:** July 14, 2026
**Release Type:** Major Release Candidate

---

### Added

- Centralized backend configuration using Single Source of Truth (SSOT)
- SMS configuration management
- Staff SMS notification workflow
- Customer SMS confirmation workflow
- Spreadsheet abstraction layer
- Standardized sheet access helpers
- Performance instrumentation with DEBUG feature flags

---

### Changed

- Migrated backend modules to use `CONFIG.SHEETS`
- Standardized spreadsheet access through `Spreadsheet.gs`
- Refactored SMS workflow integration
- Improved tracking ID generation (removed ambiguous characters)
- Simplified retry configuration
- Removed temporary debug logging
- Improved production error handling

---

### Fixed

- SMS function integration
- Duplicate `jsonResponse()` implementation
- Legacy configuration references
- Legacy spreadsheet access
- Hardcoded sheet names
- Tracking ID character ambiguity

---

### Removed

- `CONFIG.DATABASE`
- `CONFIG.STORAGE`
- Duplicate retry configuration
- Temporary development diagnostics

---

## Platform V2.0 Beta — Backend Core Completion

**Platform Version:** V2.0 Beta
**Backend Build:** 7.0
**Release Date:** July 12, 2026
**Release Type:** Minor Release

---

### Added

- Modular backend architecture (17 modules)
- Validation engine
- Tracking ID generator
- Google Sheets integration
- Google Drive integration
- Logger module
- Utilities module
- Main API entry point

---

### Changed

- Replaced monolithic `Code.gs` with modular structure
- Centralized configuration
- Standardized error handling

---

### Fixed

- Duplicate B/L detection
- Phone number normalization
- JSON response formatting

---

## Platform V1.5 — Frontend Backend Integration

**Platform Version:** V1.5
**Backend Build:** 6.0
**Release Date:** July 10, 2026
**Release Type:** Minor Release

---

### Added

- End-to-end submission workflow
- Google Apps Script Web App deployment
- Google Sheets database write
- Google Drive attachment upload
- Tracking ID generation and display
- Success screen with tracking ID

---

### Changed

- Updated frontend payload to match backend validation
- Improved error handling and diagnostics

---

### Fixed

- Browser ↔ Apps Script CORS communication
- Duplicate configuration declarations
- Payload naming mismatches

---

## Platform V1.0 — Frontend Production Release

**Platform Version:** V1.0
**Backend Build:** 5.0
**Release Date:** July 1, 2026
**Release Type:** Major Release
**Status:** ✅ Production

---

### Added

- 5-page premium corporate website
- Mobile-first responsive design
- Cargo Portal with submission form
- Floating Customer Assistant
- Communication Configuration System
- Trust Bar with credentials
- How It Works section
- SEO foundation (sitemap, robots.txt, manifest)
- Accessibility improvements

---

### Changed

- Hero redesign with left-aligned layout
- Trust Bar restructured with stacked typography
- Cargo Portal replaces "Submit B/L" terminology
- Optimized images to WebP format

---

## Version History

| Platform  | Backend   | Date       | Type  | Summary                                                                     |
| --------- | --------- | ---------- | ----- | --------------------------------------------------------------------------- |
| V2.0      | Build 8.1 | 2026-07-15 | Major | Production backend baseline with SSOT, SMS, and performance instrumentation |
| V2.0 RC   | Build 8.0 | 2026-07-14 | Major | Architecture freeze                                                         |
| V2.0 Beta | Build 7.0 | 2026-07-12 | Minor | Backend core completion                                                     |
| V1.5      | Build 6.0 | 2026-07-10 | Minor | Frontend/backend integration                                                |
| V1.0      | Build 5.0 | 2026-07-01 | Major | Website production release                                                  |

---

**Next Planned Release:** Platform V3

**See:** `31_V3_ROADMAP.md`

---

## [1.2.0] - 2026-07-18

### Added

- **Premium SVG Icon System** (see `40_FRONTEND_ICON_STANDARD.md`)
  - 26 minimal icons across 6 categories (status, logistics, forms, security, core, brand)
  - All icons use `currentColor` and `viewBox="0 0 24 24"`, CSS-driven colors
  - Dedicated `css/icons.css` with reusable wrappers, sizing, and animations
  - Favicon migrated to `assets/icons/brand/favicon.svg` and linked across all pages
- **Premium Trust Bar** on `index.html`, `about.html`, and `track.html`
  - Self‑contained navy/gold checkmark icons replace old text-based checks
  - SSOT typography in `styles.css` ensures consistent white/soft‑white text hierarchy

### Changed

- `track.html`: replaced emoji (✅/❌) with premium SVG success/error icons; added submit button arrow
- `index.html`, `about.html`: replaced trust bar checkmarks with premium SVG icons
- `styles.css`: simplified `.trust-check` to flexbox only; added trust bar typography block

### Fixed

- Trust bar text contrast restored on navy background
  **End of Changelog**
