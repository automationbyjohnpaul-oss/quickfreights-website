markdown

# 01 — System Architecture

**Title:** QuickFreights Platform — System Architecture
**Version:** 1.1.0
**Status:** Approved with Minor Revisions
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`00_Project_Blueprint.md`

### Child Documents

- `02_Engineering_Constitution.md`
- `03_AI_Engineering_Guide.md`
- `04_Source_of_Truth.md`

### References

- `00A_Project_Journey.md` — Current project status
- `06_Decision_Log.md` — Architectural decisions

---

## Authority

This document defines the architectural structure of the QuickFreights Platform.
All implementation must conform to the layers and boundaries defined here.
Changes to architecture must be recorded in `06_Decision_Log.md`.

---

## 1. Architectural Overview

The QuickFreights Platform follows a **layered architecture**.
Each layer has a single responsibility.
Dependencies shall always point downward.
Lower layers shall never depend on higher layers.
User
│
▼
┌──────────────────────────────────────────┐
│ PRESENTATION LAYER │
│ User interface, forms, navigation │
│ Responsibility: Display and collect │
└────────────────┬─────────────────────────┘
│
▼
┌──────────────────────────────────────────┐
│ APPLICATION LAYER │
│ Orchestration, routing, coordination │
│ Responsibility: Direct traffic │
└────────────────┬─────────────────────────┘
│
▼
┌──────────────────────────────────────────┐
│ BUSINESS DOMAIN LAYER │
│ Validation, rules, ID generation │
│ Responsibility: Enforce business logic │
└────────────────┬─────────────────────────┘
│
▼
┌──────────────────────────────────────────┐
│ INFRASTRUCTURE LAYER │
│ Storage, notifications, file handling │
│ Responsibility: Provide capabilities │
└────────────────┬─────────────────────────┘
│
▼
┌──────────────────────────────────────────┐
│ EXTERNAL SERVICES │
│ SMS gateway, font CDN, image CDN │
│ Responsibility: Third-party integration │
└──────────────────────────────────────────┘

text

---

## 2. Logical Architecture

The logical architecture defines **what** each layer does,
independent of **how** it is implemented.

### 2.1 Presentation Layer

**Responsibility:** Display information to users and collect input.

**Components:**

- Pages (Home, About, Services, Contact, Submit B/L)
- Styles (mobile-first CSS)
- Client-side validation
- Form submission handler
- Mobile navigation

**Rules:**

- Never directly access storage or external services.
- Never contain secrets or API keys.
- Validate input before sending to Application Layer.

---

### 2.2 Application Layer

**Responsibility:** Orchestrate requests, route data, coordinate modules.

**Modules:**

| Module           | Responsibility                                   |
| ---------------- | ------------------------------------------------ |
| Request Router   | Direct incoming requests to appropriate handlers |
| Response Builder | Format structured JSON responses                 |

**Rules:**

- Never contain business rules.
- Never directly access storage.
- Delegate to Business Domain and Infrastructure layers.

---

### 2.3 Business Domain Layer

**Responsibility:** Enforce all business rules and domain logic.

**Modules:**

| Module               | Responsibility                                      |
| -------------------- | --------------------------------------------------- |
| Validation Service   | Validate phone numbers, required fields, file types |
| Tracking Service     | Generate unique tracking IDs                        |
| Submission Service   | Process Bill of Lading submissions                  |
| Notification Service | Compose and trigger customer notifications          |
| Status Service       | Manage shipment status transitions                  |

**Rules:**

- Contain all business logic.
- Never directly call external services.
- Never render HTML or handle HTTP directly.

---

### 2.4 Infrastructure Layer

**Responsibility:** Provide storage, file handling, and external communication.

**Modules:**

| Module          | Responsibility                                |
| --------------- | --------------------------------------------- |
| Storage Service | Read/write to Google Sheets                   |
| File Service    | Upload and manage attachments in Google Drive |
| SMS Service     | Send notifications via SMS gateway            |
| Logging Service | Record operations and errors                  |

**Rules:**

- Never contain business rules.
- Handle all external API communication.
- Return structured results to upper layers.

---

### 2.5 External Services

**Responsibility:** Third-party capabilities outside the platform.

**Services:**

| Service                  | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| Payless Bulk SMS Nigeria | SMS notifications                        |
| Google Fonts             | Typography                               |
| Local image assets       | Website imagery (replacing Unsplash CDN) |

**Rules:**

- Accessed only through Infrastructure Layer.
- Graceful degradation when unavailable.

---

## 3. Physical Architecture

The physical architecture defines **how** each logical layer is
currently implemented.

| Logical Layer     | Physical Implementation                                 |
| ----------------- | ------------------------------------------------------- |
| Presentation      | HTML5, CSS3, JavaScript — hosted on GitHub Pages        |
| Application       | Google Apps Script — `doPost()`, `doGet()`              |
| Business Domain   | Google Apps Script modules within the same project      |
| Infrastructure    | Google Apps Script — Sheets API, Drive API, UrlFetchApp |
| External Services | Payless SMS, Google Fonts, local images                 |

**Future note:** The logical architecture remains stable even if
the physical implementation changes (e.g., migrating from Google Sheets
to PostgreSQL, or from Apps Script to a Node.js server).

---

## 4. Request Lifecycle

Every customer submission follows this pipeline:
Customer submits form
│
▼
Presentation: Client-side validation
│
▼
Application: Route request to Submission Service
│
▼
Business Domain: Validate business rules
│
▼
Business Domain: Generate tracking ID
│
▼
Infrastructure: Store submission in Sheets
│
▼
Infrastructure: Store attachment in Drive
│
▼
Application: Build JSON response
│
▼
Presentation: Display tracking ID to customer

text

---

## 5. Data Ownership

Every major entity has one owner.

| Entity           | Owner                                |
| ---------------- | ------------------------------------ |
| Submission       | Infrastructure — Storage Service     |
| Shipment Status  | Infrastructure — Storage Service     |
| Tracking ID      | Business Domain — Tracking Service   |
| SMS Message      | Infrastructure — SMS Service         |
| File Attachment  | Infrastructure — File Service        |
| Validation Rules | Business Domain — Validation Service |

---

## 6. Cross-Cutting Concerns

These concerns apply across all layers.

| Concern            | Description                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Logging**        | Every layer logs significant operations. Logging is not owned by any single layer.                                          |
| **Security**       | Input validation at Presentation and Business Domain. Secrets in Script Properties. HTTPS for all external communication.   |
| **Configuration**  | Managed centrally via Script Properties and Source of Truth.                                                                |
| **Error Handling** | Each layer handles its own errors. Infrastructure returns structured results. Presentation displays user-friendly messages. |
| **Documentation**  | Architecture, business rules, and decisions are documented independently of code.                                           |

---

## 7. Failure Strategy

| Failure                  | Strategy                                                               |
| ------------------------ | ---------------------------------------------------------------------- |
| SMS API unavailable      | Retry once → Log failure → Queue for manual follow-up                  |
| Drive upload fails       | Reject submission gracefully → Preserve submitted metadata → Log error |
| Sheet write fails        | Return error response → Log failure → Alert admin                      |
| Invalid request          | Reject with specific validation errors → Never write partial data      |
| External service timeout | Timeout after 30 seconds → Return graceful degradation                 |

---

## 8. Dependency Rule

Dependencies shall always point downward.

Lower layers shall never depend on higher layers.

Presentation → Application → Business Domain → Infrastructure → External Services

No layer may bypass the layer directly below it.

text

---

## 9. Security Boundaries

| Boundary                     | Protection                                               |
| ---------------------------- | -------------------------------------------------------- |
| User → Presentation          | HTTPS only. Input validated client-side and server-side. |
| Presentation → Application   | HTTPS POST. No secrets in client code.                   |
| Application → Infrastructure | Internal API within Apps Script.                         |
| Infrastructure → External    | API tokens in Script Properties. Never in source code.   |

### Secrets Management

- API tokens stored in Google Apps Script `ScriptProperties`.
- Never committed to Git.
- Accessible only to the script owner.

---

## 10. Core Domain

Primary business entities in the QuickFreights domain:

| Entity         | Description                                                                          |
| -------------- | ------------------------------------------------------------------------------------ |
| Customer       | Importer or exporter submitting cargo                                                |
| Shipment       | A consignment of goods                                                               |
| Bill of Lading | Legal document identifying the shipment                                              |
| Container      | Physical container number                                                            |
| Tracking ID    | Unique identifier (format: QF-YYYY-NNN)                                              |
| Submission     | Complete form entry from a customer                                                  |
| Status         | Current state of a shipment (Received, In Transit, Customs Hold, Cleared, Delivered) |
| Attachment     | Supporting document uploaded by customer                                             |
| Notification   | SMS message sent to customer                                                         |

---

## 11. Deployment Architecture

┌─────────────────────────────────────────┐
│ GITHUB PAGES │
│ Static website files (HTML, CSS, JS) │
│ Domain: username.github.io │
└────────────────┬────────────────────────┘
│
▼
┌─────────────────────────────────────────┐
│ GOOGLE APPS SCRIPT │
│ Web App deployment │
│ Execute as: Owner │
│ Access: Anyone │
└────────────────┬────────────────────────┘
│
▼
┌─────────────────────────────────────────┐
│ GOOGLE WORKSPACE │
│ Sheets: QuickFreights_Database │
│ Drive: QuickFreights_Attachments │
└─────────────────────────────────────────┘

text

---

## 12. Future Extensibility

New applications follow the same architecture:
apps/
├── website/ ← Current (v1.0)
├── admin-portal/ ← Future
├── customer-portal/ ← Future
└── mobile-api/ ← Future

text

Each application:

- Has its own Presentation Layer.
- Shares the same Application, Business Domain, and Infrastructure layers.
- Uses the same Data Layer and External Services.

---

## 13. Architectural Decisions

Detailed decisions are recorded in `06_Decision_Log.md`.

| ID      | Decision                                  | Rationale                                              |
| ------- | ----------------------------------------- | ------------------------------------------------------ |
| ADR-001 | AI Context Hierarchy defined              | Prevents hallucination when information conflicts      |
| ADR-002 | Layered architecture (6 tiers)            | Separation of concerns, testability, future-proofing   |
| ADR-003 | Business Domain as separate logical layer | Business rules survive physical implementation changes |
| ADR-004 | Dependency rule: always downward          | Prevents circular dependencies and architectural drift |

---

## 14. Version History

| Version | Date       | Changes                                                                                                                         |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0   | 2026-06-29 | Initial architecture document                                                                                                   |
| 1.1.0   | 2026-06-29 | Logical/physical separation, cross-cutting concerns, module boundaries, request lifecycle, failure strategy, domain terminology |
