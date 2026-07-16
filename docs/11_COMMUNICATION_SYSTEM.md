Here is the updated `11_COMMUNICATION_SYSTEM.md` with all the suggested improvements applied:

```markdown
# 11 — COMMUNICATION SYSTEM

## Quick Freights Global Limited Platform

**Document Version:** 3.0
**Last Updated:** July 2026
**Status:** Production (V2)

---

## Purpose

The Communication System provides a centralized architecture for all customer-facing communications used by the Quick Freights platform.

Its objectives are to:

- Ensure consistency across all communication channels
- Eliminate duplicate contact information
- Standardize customer messaging
- Simplify future updates
- Prepare the platform for CRM and notification integration
- Enable automated SMS notifications
- Maintain a single communication configuration across both frontend and backend

This document serves as the reference for all communication-related development.

---

## Design Philosophy

The communication system follows one fundamental principle:

> **One Source of Truth**

Communication data is separated into two distinct domains:

- **Frontend (`communication.config.js`)** manages customer-facing contact details, URLs, and interaction templates.
- **Backend (`Config.gs`)** manages SMS templates, notification settings, and operational messaging.

Each piece of communication data has exactly one authoritative owner.

---

## Communication Architecture
```

Customer
│
▼
Website Interface
│
▼
communication.config.js
│
├── WhatsApp Links
├── Email Links
├── Telephone Links
└── Floating Widget
│
▼
Google Apps Script
│
▼
Config.gs
│
├── SMS Configuration
├── SMS Templates
├── Notification Settings
└── Feature Flags

````

Every communication request flows through the configuration layer.

---

## Communication SSOT Rules

The following ownership rules are mandatory:

| Item | Authoritative Source |
|------|----------------------|
| Phone numbers | communication.config.js |
| WhatsApp numbers | communication.config.js |
| Email addresses | communication.config.js |
| Floating widget content | communication.config.js |
| SMS templates | Config.gs |
| SMS feature flags | Config.gs |
| Notification queue settings | Config.gs |

Communication data must never be duplicated outside its authoritative source.

---

## Frontend Communication

### Central Configuration

**File:** `js/communication.config.js`

**Responsibilities:**

- Contact information
- WhatsApp templates
- Email templates
- Helper functions
- URL generation
- Floating widget configuration

### Contact Information

| Type | Value |
|------|-------|
| Primary Office Number | +234 803 788 3339 |
| WhatsApp Number | 2348037883339 |
| Support Email | reception.quickfreightglobal@gmail.com |
| RC Number | 8106184 |

### WhatsApp Templates

| Template | Purpose |
|----------|---------|
| General Enquiry | First-time visitors seeking information |
| Cargo Portal Submission | Customers submitting cargo documentation |
| Tracking Support | Shipment status enquiries |
| Quote Request | Pricing enquiries |
| Customs Clearance | Customers requiring customs clearance assistance |
| Freight Forwarding | Customers requiring forwarding support |

### Floating Customer Assistant

Available on every page.

**Options:**
- Cargo Portal
- WhatsApp Support
- Call Office
- Email Support

---

## Backend Communication

### SMS Configuration

**File:** `Config.gs`

### SMS Feature Flags

```javascript
CONFIG.SMS.ENABLED                    // Master control
CONFIG.SMS.SEND_CUSTOMER_CONFIRMATION // Customer confirmation
CONFIG.SMS.SEND_STATUS_UPDATES       // Status updates
CONFIG.SMS.SEND_STAFF_ALERTS         // Staff alerts
````

### SMS Types

| Type                    | Purpose                       |
| ----------------------- | ----------------------------- |
| SUBMISSION_CONFIRMATION | Customer document received    |
| STAFF_ALERT             | New submission notification   |
| STATUS_DISCHARGED       | Shipment discharged at port   |
| STATUS_PROCESSING       | Customs clearance in progress |
| STATUS_CLEARED          | Shipment cleared              |

### SMS Templates

| Template                | Variables                              | Purpose                   |
| ----------------------- | -------------------------------------- | ------------------------- |
| SUBMISSION_CONFIRMATION | trackingId, supportPhone               | Customer after submission |
| STAFF_ALERT             | blReference, consigneeName, trackingId | Staff new submission      |
| STATUS_DISCHARGED       | trackingId, supportPhone               | Customer discharged       |
| STATUS_PROCESSING       | trackingId, supportPhone               | Customer processing       |
| STATUS_CLEARED          | trackingId, supportPhone               | Customer cleared          |

### SMS Flow

```
Main.gs
    │
    ▼
Notification Queue
    │
    ▼
SMS.gs
    │
    ▼
buildSMSRequest()
    │
    ▼
UrlFetchApp.fetchAll()
    │
    ├── Customer SMS
    └── Staff SMS
    │
    ▼
SMS Log
```

---

## Notification Queue

The backend uses a notification queue to separate customer requests from slower external SMS operations.

**Benefits include:**

- Reduced submission response time
- Retry support
- Delivery tracking
- Improved reliability
- Easier future expansion to additional notification channels

The queue provides the foundation for future email, push notification, and CRM integrations.

---

## SMS Logging

Every outbound SMS is recorded in the **SMS Log** sheet, including:

- Timestamp
- Notification type
- Tracking ID
- Recipient
- Message content
- Delivery status
- Provider response
- Retry count
- Processing outcome

This creates a complete operational audit trail for customer communications.

---

## Customer Journey

Typical communication flow:

```
Visitor
    │
    ▼
Website
    │
    ▼
Cargo Portal
    │
    ▼
Document Submission
    │
    ▼
Processing Overlay
    │
    ▼
Tracking ID Generated
    │
    ▼
SMS Confirmation (Customer)
    │
    ▼
SMS Alert (Staff)
    │
    ▼
Cargo Processing
    │
    ▼
Status Update SMS (when status changes)
    │
    ▼
Completion
```

---

## Communication Principles

Every customer communication should be:

- Consistent
- Professional
- Actionable
- Traceable
- Configurable
- Reusable

Templates should be maintained centrally and reused wherever possible.

---

## Security

Customer communication should never expose:

- Internal email addresses
- Private phone numbers
- Administrative endpoints
- Future API keys
- Sensitive business logic

Templates should contain only customer-facing information.

---

## Maintenance

### When Contact Information Changes

**Update:** `js/communication.config.js`

**Do NOT edit:**

- HTML
- JavaScript components
- Floating Widget
- Individual pages

### When SMS Templates Change

**Update:** `Config.gs` → `CONFIG.SMS.TEMPLATES`

**Do NOT edit:**

- SMS.gs (template logic only)
- Main.gs (orchestration only)

---

## Future Communication Roadmap

Version 3 may introduce:

- Customer Tracking Portal
- Shipment timeline notifications
- Email notifications
- Administrative messaging
- CRM integration
- Customer communication history
- Analytics and delivery reporting

These additions will extend the existing communication architecture without changing its SSOT principles.

---

## Communication Architecture Status

The communication architecture established in Backend V2 is considered stable.

Future enhancements should extend the existing communication framework rather than introduce parallel messaging systems or duplicate configuration.

Any architectural changes must be reflected in:

- Source of Truth
- Backend Source of Truth
- Technical Architecture
- Decision Log
- Changelog

---

## Development Rules

### Always:

- Use centralized templates
- Use helper functions
- Keep communication consistent
- Update configuration only
- Log SMS delivery

### Never:

- Hardcode phone numbers
- Hardcode WhatsApp links
- Duplicate templates
- Store contact details in multiple files
- Send SMS without logging

---

## Guiding Principle

The Quick Freights Communication System is a strategic component of the platform rather than a collection of messaging utilities.

By centralizing communication configuration, enforcing Single Source of Truth principles, and separating frontend interaction from backend notification processing, the platform delivers a consistent, maintainable, and scalable customer communication experience.

This architecture forms the approved communication baseline for all future platform development.

---

**Document Status:** Active (V3.0)

```

---

## Summary of Changes

| Change | Description |
|--------|-------------|
| **Purpose** | Added frontend/backend single configuration objective |
| **Design Philosophy** | Added frontend/backend domain separation explanation |
| **Communication Architecture** | Replaced diagram with frontend/backend split |
| **Communication SSOT Rules** | New section with ownership table |
| **SMS Flow** | Updated to reflect notification queue and parallel sending |
| **Notification Queue** | New section |
| **SMS Logging** | Expanded with full audit trail details |
| **Communication Principles** | New section |
| **Future Communication Roadmap** | Expanded from simple list |
| **Communication Architecture Status** | New section with freeze policy |
| **Guiding Principle** | Strengthened closing statement |
```
