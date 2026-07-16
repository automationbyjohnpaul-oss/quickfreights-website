31 — V3 ROADMAP

## Quick Freights Global Limited Platform

**Document Version:** 2.0
**Last Updated:** July 2026
**Platform Version:** V3 (Planned)
**Status:** Planning Document
**Depends On:** V2 Backend Platform (Frozen)

---

## Purpose

This document defines the planned evolution of the Quick Freights Platform following the successful completion of Backend V2.

Backend V2 established the production infrastructure. V3 shifts development toward **staff-facing operational tools**, transforming the platform from a customer submission portal into a complete logistics operations system.

---

## Vision

The objective of V3 is to provide operations staff with a secure, efficient interface for managing shipments, updating statuses, tracking processing progress, and monitoring operational metrics.

Development priorities will focus on operational value, staff efficiency, and customer communication automation.

---

## Guiding Principles

Future development shall:

- Preserve the V2 architecture
- Maintain Single Source of Truth (SSOT)
- Extend existing modules instead of creating unnecessary duplicates
- Prioritize measurable operational value
- Preserve backward compatibility whenever practical
- Follow documentation-first engineering approach
- Reuse existing components and design system

---

## Relationship to V1 and V2

V1 — Public Website
│
└── Customer-facing: submissions, communication, trust
│
▼
V2 — Backend Platform
│
└── Infrastructure: SSOT, modules, Sheets, Drive, SMS
│
▼
V3 — Back Office Application (This Roadmap)
│
└── Staff-facing: operations, management, analytics

text

### V3 Reuses from V2

- ✅ All backend modules (Config, Sheets, Drive, SMS, etc.)
- ✅ SSOT architecture
- ✅ Google Sheets database
- ✅ SMS infrastructure
- ✅ Performance instrumentation
- ✅ Logger module
- ✅ Design system and brand guidelines

### V3 Extends V2

- Admin/read endpoints in `Main.gs`
- Status workflow in `Status.gs`
- New UI application (Back Office)
- Staff authentication

---

## Back Office Overview

The Back Office is a staff-facing application that provides operations teams with a secure interface to:

- View and manage customer submissions
- Update shipment statuses
- Track processing progress
- Monitor operational metrics
- Manage customer communications

---

## Phase 0 — Foundation

**Duration:** 1 week
**Priority:** High

### Deliverables

- Folder structure created (`apps/backoffice/`)
- Shared CSS from website reused
- Navigation shell built
- Authentication implemented
- Route guard for protected pages
- Login page

### Acceptance Criteria

- Staff can log in
- Unauthorized access redirects to login
- Navigation shell visible on all pages
- Session persists across pages

---

## Phase 1 — Dashboard

**Duration:** 1 week
**Priority:** High

### Deliverables

- Dashboard cards:
  - Today's Submissions
  - Pending
  - Processing
  - Cleared
  - SMS Failed
  - Total Errors
- Recent submissions list
- Quick action buttons

### Acceptance Criteria

- Dashboard loads within 3 seconds
- Cards show accurate counts
- Recent submissions show latest entries
- Quick actions work

---

## Phase 2 — Shipment Status

**Duration:** 1 week
**Priority:** Highest

### Deliverables

- Status update screen
- Status dropdown with all values
- SMS trigger toggle
- Status history display
- Update confirmation

### Acceptance Criteria

- Status updates reflected in Google Sheets instantly
- Customer SMS triggered when status changes
- Status history tracked
- Confirmation shown to staff

---

## Phase 3 — Submissions

**Duration:** 1 week
**Priority:** High

### Deliverables

- All submissions list
- Search
- Filters (status, date)
- Pagination
- Detail view
- Export functionality (CSV)

### Acceptance Criteria

- All submissions displayed
- Search returns results within 2 seconds
- Filters work correctly
- Detail view shows all submission data

---

## Phase 4 — Customer Records

**Duration:** 1 week
**Priority:** Medium

### Deliverables

- Customer lookup
- Customer profile
- Submission history
- Communication history
- Quick actions (contact, view shipments)

### Acceptance Criteria

- Search by name or phone
- Profile shows customer details
- Submission history displayed
- Communication history displayed

---

## Phase 5 — Reports

**Duration:** 1 week
**Priority:** Medium

### Deliverables

- Daily summary
- Weekly summary
- Monthly summary
- Export to CSV
- KPI display

### Acceptance Criteria

- Reports load within 5 seconds
- Accurate summary data
- Export works

---

## Phase 6 — Administration

**Duration:** 1 week
**Priority:** Low

### Deliverables

- User management (if applicable)
- System settings
- Feature flags
- Logs view
- Maintenance tools

### Acceptance Criteria

- Settings saved and applied
- Logs view shows recent entries
- Maintenance tools work

---

## Timeline Summary

| Phase | Name             | Duration | Cumulative |
| ----- | ---------------- | -------- | ---------- |
| 0     | Foundation       | 1 week   | Week 1     |
| 1     | Dashboard        | 1 week   | Week 2     |
| 2     | Shipment Status  | 1 week   | Week 3     |
| 3     | Submissions      | 1 week   | Week 4     |
| 4     | Customer Records | 1 week   | Week 5     |
| 5     | Reports          | 1 week   | Week 6     |
| 6     | Administration   | 1 week   | Week 7     |

---

## Dependencies

| Phase | Depends On                         |
| ----- | ---------------------------------- |
| 0     | V2 Backend (Frozen)                |
| 1     | Phase 0                            |
| 2     | Phase 0                            |
| 3     | Phase 0, Phase 2                   |
| 4     | Phase 0, Phase 3                   |
| 5     | Phase 0, Phase 3                   |
| 6     | Phase 0, Phase 1, Phase 2, Phase 3 |

---

## New Modules (V3)

### Backend Additions

| Module         | Purpose                          |
| -------------- | -------------------------------- |
| `Auth.gs`      | Authentication, token validation |
| `Dashboard.gs` | Dashboard metrics aggregation    |
| `Reports.gs`   | Reporting and analytics          |

### Backend Extensions

| Module      | Extension                                                   |
| ----------- | ----------------------------------------------------------- |
| `Main.gs`   | Add `doGet` for read endpoints, `doPost` for status updates |
| `Status.gs` | Add status update workflow, history tracking                |

---

## Technology Stack (V3)

### Frontend

- HTML5
- CSS3 (same design system as V1)
- Vanilla JavaScript (no frameworks)
- GitHub Pages (same hosting)

### Backend

- Google Apps Script (existing V2)
- Google Sheets (existing)
- Google Drive (existing)
- Payless Bulk SMS (existing)

### Authentication

- Simple token-based authentication
- Password stored in Script Properties
- Session token in `localStorage`

---

## Success Criteria

| #   | Criterion                              | Measurement                                  |
| --- | -------------------------------------- | -------------------------------------------- |
| 1   | Staff can view all submissions         | Dashboard loads within 3 seconds             |
| 2   | Staff can update shipment status       | Status updates reflected in Sheets instantly |
| 3   | Customers receive SMS on status change | SMS sent within 60 seconds                   |
| 4   | Staff can search for customers         | Search returns results within 2 seconds      |
| 5   | Dashboard shows operational metrics    | Metrics update automatically                 |
| 6   | System is secure                       | Only authenticated staff can access          |

---

## Success Metrics (KPIs)

| Metric                 | Target                                |
| ---------------------- | ------------------------------------- |
| Staff adoption rate    | 100% (all operations staff use daily) |
| Status update time     | < 30 seconds per shipment             |
| SMS delivery success   | > 98%                                 |
| Customer satisfaction  | Improved response time                |
| Operational efficiency | 50% reduction in manual effort        |

---

## Risks

| Risk                      | Impact          | Mitigation                         |
| ------------------------- | --------------- | ---------------------------------- |
| Authentication complexity | Delay           | Use simple token-based approach    |
| Sheets API limits         | Performance     | Implement caching, pagination      |
| SMS provider latency      | User experience | Async sending, progress indicators |
| Scope creep               | Timeline        | Freeze scope after Phase 2         |

---

## Documentation

### V3 Documents

| Document                             | Purpose                                                            |
| ------------------------------------ | ------------------------------------------------------------------ |
| 32_V3_BACK_OFFICE_OVERVIEW.md        | Executive summary, business objectives, scope                      |
| 33_V3_BACK_OFFICE_SOURCE_OF_TRUTH.md | Navigation, roles, statuses, design system, authentication         |
| 34_V3_BACK_OFFICE_ARCHITECTURE.md    | Folder structure, API endpoints, data flow, security, reuse matrix |
| 35_V3_BACK_OFFICE_ROADMAP.md         | Implementation phases, timeline, dependencies, risks               |

### Existing Documents to Update

| Document                      | Update                          |
| ----------------------------- | ------------------------------- |
| 07_CHANGELOG.md               | Add V3 entries when implemented |
| 20_PROJECT_HISTORY.md         | Add V3 phase when implemented   |
| 24_BACKEND_SOURCE_OF_TRUTH.md | Add V3 modules when created     |

---

## Scope Control

The V2 backend is considered architecturally complete.

Future work should extend existing functionality rather than redesign core infrastructure, unless required by critical defects, security issues, or clearly demonstrated performance limitations.

---

## Roadmap Declaration

Backend V2 established the engineering foundation for the Quick Freights Platform.

V3 marks the transition from infrastructure engineering to **operational excellence**, delivering staff tools that improve efficiency, visibility, and customer communication.

All future development should align with this roadmap while preserving the architectural integrity established during the V2 baseline.

---

## Related Documents

- 32_V3_BACK_OFFICE_OVERVIEW.md
- 33_V3_BACK_OFFICE_SOURCE_OF_TRUTH.md
- 34_V3_BACK_OFFICE_ARCHITECTURE.md
- 35_V3_BACK_OFFICE_ROADMAP.md
- 24_BACKEND_SOURCE_OF_TRUTH.md
- 28_V2_BACKEND_BASELINE.md

---

**Document Status:** Planning (V2.0)
