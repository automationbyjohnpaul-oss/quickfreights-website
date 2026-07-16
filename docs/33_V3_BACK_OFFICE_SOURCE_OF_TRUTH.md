33_V3_BACK_OFFICE_SOURCE_OF_TRUTH.md
markdown

# 33 — V3 BACK OFFICE SOURCE OF TRUTH

## Quick Freights Global Limited Platform

**Document Version:** 1.0
**Status:** Planning
**Last Updated:** July 2026
**Platform Version:** V3 (Planned)

---

## Purpose

This document defines the authoritative source of truth for the Quick Freights Back Office Application.

All Back Office configuration, navigation, roles, status values, and display rules must originate from this document.

---

## Navigation

The Back Office navigation structure:
Dashboard
└── Overview
└── Quick Actions

Submissions
└── All Submissions
└── Pending
└── Processing
└── Cleared

Shipment Status
└── Update Status
└── Status History

Customers
└── All Customers
└── Recent
└── Search

Reports
└── Daily Summary
└── Weekly Summary
└── Monthly Summary

Settings
└── User Management
└── System Settings

text

---

## User Roles

| Role                   | Permissions                                                    |
| ---------------------- | -------------------------------------------------------------- |
| **Administrator**      | Full access: all views, all actions, user management, settings |
| **Operations Officer** | Shipment management, status updates, customer lookup           |
| **Customer Service**   | Read-only access, customer lookup, basic reports               |

---

## Shipment Status Values

| Status     | Label                          | SMS Triggered          |
| ---------- | ------------------------------ | ---------------------- |
| Received   | Received                       | ❌ No (initial status) |
| Discharged | Discharged at Port             | ✅ Yes                 |
| Processing | Processing & Customs Clearance | ✅ Yes                 |
| Cleared    | Cleared & Ready for Collection | ✅ Yes                 |
| Delivered  | Delivered                      | ❌ No                  |

---

## Dashboard Cards

| Card                | Data Source           | Refresh |
| ------------------- | --------------------- | ------- |
| Today's Submissions | Sheets (today's date) | On load |
| Pending             | Status = Received     | On load |
| Processing          | Status = Processing   | On load |
| Cleared             | Status = Cleared      | On load |
| SMS Failed          | SMS Log (last 24h)    | On load |
| Total Errors        | Error Log (last 24h)  | On load |

---

## Submissions Table Columns

| Column        | Field            | Sortable |
| ------------- | ---------------- | -------- |
| Tracking ID   | `trackingId`     | ✅       |
| B/L Reference | `blReference`    | ✅       |
| Customer      | `consigneeName`  | ✅       |
| Phone         | `consigneePhone` | ✅       |
| Status        | `status`         | ✅       |
| Created       | `timestamp`      | ✅       |
| Actions       | —                | ❌       |

---

## Customer Records Table Columns

| Column        | Field            | Sortable |
| ------------- | ---------------- | -------- |
| Name          | `consigneeName`  | ✅       |
| Phone         | `consigneePhone` | ✅       |
| Email         | `consigneeEmail` | ✅       |
| Submissions   | Count            | ✅       |
| Last Activity | `timestamp`      | ✅       |
| Actions       | —                | ❌       |

---

## Theme

Reuse existing website design system.

| Element       | Value                        |
| ------------- | ---------------------------- |
| Primary Font  | Inter                        |
| Primary Color | Navy (#0A1F3F)               |
| Accent Color  | Gold (#DAA520)               |
| Background    | White (#FFFFFF)              |
| Cards         | White with shadow            |
| Buttons       | Gold primary, Navy secondary |

---

## Design System

### Components

- Navigation sidebar
- Dashboard cards
- Data tables
- Status badges
- Forms
- Buttons
- Modals
- Toasts

### Layout

┌─────────────────────────────────────────────────────────┐
│ Logo │ Navigation Links │ User │ Settings │
├──────────┴──────────────────────────────────────────────┤
│ │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │ Card 1 │ │ Card 2 │ │ Card 3 │ │ Card 4 │ │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Table / Content │ │
│ │ │ │
│ └─────────────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────┘

text

---

## Authentication

### Approach

- GitHub Pages frontend
- Apps Script verification (new `doPost?action=login`)
- Password stored in Script Properties
- Session token stored in `localStorage`
- Route guard on every protected page

### Login Page

┌──────────────────────────────────────┐
│ Quick Freights │
│ │
│ Back Office Login │
│ │
│ ┌──────────────────────────────┐ │
│ │ Username / Email │ │
│ └──────────────────────────────┘ │
│ │
│ ┌──────────────────────────────┐ │
│ │ Password │ │
│ └──────────────────────────────┘ │
│ │
│ ┌──────────────────────────────┐ │
│ │ Login │ │
│ └──────────────────────────────┘ │
│ │
│ [Error message if needed] │
└──────────────────────────────────────┘

text

### Session Management

- Token stored in `localStorage`
- Token expires after 8 hours
- Token checked on every page load
- Redirect to login if invalid

---

## Feature Flags

| Flag                  | Default | Purpose                      |
| --------------------- | ------- | ---------------------------- |
| `showReports`         | false   | Toggle reports visibility    |
| `allowStatusUpdate`   | true    | Allow status updates         |
| `allowCustomerDelete` | false   | Disable delete functionality |

---

## Related Documents

- 32_V3_BACK_OFFICE_OVERVIEW.md
- 34_V3_BACK_OFFICE_ARCHITECTURE.md
- 35_V3_BACK_OFFICE_ROADMAP.md

---

**Document Status:** Planning (V1.0)
