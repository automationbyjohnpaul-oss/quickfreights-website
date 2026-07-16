# 32 — V3 BACK OFFICE OVERVIEW

## Quick Freights Global Limited Platform

**Document Version:** 1.0
**Status:** Planning
**Last Updated:** July 2026
**Platform Version:** V3 (Planned)
**Depends On:** V2 Backend Platform (Frozen)

---

## Purpose

This document provides the executive overview of the Quick Freights Back Office Application.

It defines the business objectives, scope, success criteria, and relationship to the existing V1 and V2 platforms.

---

## What Is the Back Office?

The Back Office is a staff-facing application that provides operations teams with a secure interface to:

- View and manage customer submissions
- Update shipment statuses
- Track processing progress
- Monitor operational metrics
- Manage customer communications

It transforms the Quick Freights Platform from a customer submission portal into a complete logistics operations system.

---

## Why Are We Building It?

Currently, operations staff manage shipments through:

- Google Sheets (manual updates)
- Email communication
- Phone calls
- Scattered notes and records

This creates:

- Delayed status updates
- Missed customer notifications
- Limited visibility into operations
- Manual effort tracking shipments
- No centralized dashboard

The Back Office addresses these gaps by providing a single interface for all operational tasks.

---

## Who Uses It?

### Primary Users

- **Operations Officers** — Manage shipments, update statuses, track processing
- **Customer Service** — Respond to customer enquiries, view shipment history
- **Administrators** — Manage users, configure system settings, monitor operations

### Secondary Users

- **Management** — View operational metrics and reports
- **Support Staff** — Assist with customer communication

---

## What Problems Does It Solve?

| Problem                       | Solution                         |
| ----------------------------- | -------------------------------- |
| Manual status updates         | Centralized status management    |
| Missed customer notifications | Automated SMS on status change   |
| No operational visibility     | Live dashboard with metrics      |
| Scattered records             | Centralized submissions database |
| Delayed customer response     | Quick lookup and status updates  |

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
V3 — Back Office Application
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

### V3 Extends V2

- Admin/read endpoints in `Main.gs`
- Status workflow in `Status.gs`
- New UI application (Back Office)
- Staff authentication

---

## Scope

### In Scope (V3.0)

- Staff dashboard
- Shipment management
- Status updates
- Automated SMS on status change
- Customer lookup
- Basic reporting
- Secure authentication

### Out of Scope (V3.0)

- Full CRM
- Customer login portal
- Payment processing
- Advanced analytics
- Multi-branch operations
- Mobile application

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

## Timeline

| Phase | Name             | Duration |
| ----- | ---------------- | -------- |
| 0     | Foundation       | 1 week   |
| 1     | Dashboard        | 1 week   |
| 2     | Shipment Status  | 1 week   |
| 3     | Submissions      | 1 week   |
| 4     | Customer Records | 1 week   |
| 5     | Reports          | 1 week   |
| 6     | Administration   | 1 week   |

---

## Related Documents

- 33_V3_BACK_OFFICE_SOURCE_OF_TRUTH.md
- 34_V3_BACK_OFFICE_ARCHITECTURE.md
- 35_V3_BACK_OFFICE_ROADMAP.md
- 24_BACKEND_SOURCE_OF_TRUTH.md
- 28_V2_BACKEND_BASELINE.md
