35 — V3 BACK OFFICE ROADMAP

## Quick Freights Global Limited Platform

**Document Version:** 1.0
**Status:** Planning
**Last Updated:** July 2026
**Platform Version:** V3 (Planned)
**Depends On:** V2 Backend Platform (Frozen)

---

## Purpose

This document defines the implementation roadmap for the Quick Freights Back Office Application.

It breaks down the development into phases, each delivering operational value independently.

---

## Phase 0 — Foundation

**Duration:** 1 week
**Priority:** High
**Deliverables:**

- Folder structure created (`apps/backoffice/`)
- Shared CSS from website reused
- Navigation shell built
- Authentication implemented
- Route guard for protected pages
- Login page

**Acceptance Criteria:**

- Staff can log in
- Unauthorized access redirects to login
- Navigation shell visible on all pages
- Session persists across pages

---

## Phase 1 — Dashboard

**Duration:** 1 week
**Priority:** High
**Deliverables:**

- Dashboard cards:
  - Today's Submissions
  - Pending
  - Processing
  - Cleared
  - SMS Failed
  - Total Errors
- Recent submissions list
- Quick action buttons

**Acceptance Criteria:**

- Dashboard loads within 3 seconds
- Cards show accurate counts
- Recent submissions show latest entries
- Quick actions work

---

## Phase 2 — Shipment Status

**Duration:** 1 week
**Priority:** Highest
**Deliverables:**

- Status update screen
- Status dropdown with all values
- SMS trigger toggle
- Status history display
- Update confirmation

**Acceptance Criteria:**

- Status updates reflected in Google Sheets instantly
- Customer SMS triggered when status changes
- Status history tracked (future)
- Confirmation shown to staff

---

## Phase 3 — Submissions

**Duration:** 1 week
**Priority:** High
**Deliverables:**

- All submissions list
- Search
- Filters (status, date)
- Pagination
- Detail view
- Export functionality (CSV)

**Acceptance Criteria:**

- All submissions displayed
- Search returns results within 2 seconds
- Filters work correctly
- Detail view shows all submission data

---

## Phase 4 — Customer Records

**Duration:** 1 week
**Priority:** Medium
**Deliverables:**

- Customer lookup
- Customer profile
- Submission history
- Communication history
- Quick actions (contact, view shipments)

**Acceptance Criteria:**

- Search by name or phone
- Profile shows customer details
- Submission history displayed
- Communication history displayed

---

## Phase 5 — Reports

**Duration:** 1 week
**Priority:** Medium
**Deliverables:**

- Daily summary
- Weekly summary
- Monthly summary
- Export to CSV
- KPI display

**Acceptance Criteria:**

- Reports load within 5 seconds
- Accurate summary data
- Export works

---

## Phase 6 — Administration

**Duration:** 1 week
**Priority:** Low
**Deliverables:**

- User management (if applicable)
- System settings
- Feature flags
- Logs view
- Maintenance tools

**Acceptance Criteria:**

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

## Risks

| Risk                      | Impact          | Mitigation                         |
| ------------------------- | --------------- | ---------------------------------- |
| Authentication complexity | Delay           | Use simple token-based approach    |
| Sheets API limits         | Performance     | Implement caching, pagination      |
| SMS provider latency      | User experience | Async sending, progress indicators |
| Scope creep               | Timeline        | Freeze scope after Phase 2         |

---

## Success Criteria

The Back Office is considered complete when:

- ✅ Staff can log in securely
- ✅ Dashboard shows operational metrics
- ✅ Staff can update shipment status
- ✅ Customers receive SMS on status change
- ✅ Staff can view and search submissions
- ✅ Reports provide operational visibility

---

## Related Documents

- 32_V3_BACK_OFFICE_OVERVIEW.md
- 33_V3_BACK_OFFICE_SOURCE_OF_TRUTH.md
- 34_V3_BACK_OFFICE_ARCHITECTURE.md
- 24_BACKEND_SOURCE_OF_TRUTH.md

---

**Document Status:** Planning (V1.0)
