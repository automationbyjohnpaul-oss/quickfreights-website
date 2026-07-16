# 00 — Project Blueprint

**Title:** QuickFreights Platform — Project Blueprint
**Version:** 1.2.2
**Status:** Approved
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`README.md`

### Child Documents

- `01_System_Architecture.md`
- `02_Engineering_Constitution.md`
- `03_AI_Engineering_Guide.md`
- `04_Source_of_Truth.md`
- `05_Coding_Standards.md`
- `06_Decision_Log.md`
- `07_Project_Roadmap.md`
- `08_Glossary.md`

---

## Authority

If any implementation conflicts with this document, this document
takes precedence until formally revised.

---

## Versioning Policy

| Level             | Trigger                             |
| ----------------- | ----------------------------------- |
| **Major** (2.0.0) | Breaking architectural changes      |
| **Minor** (1.2.0) | New sections, new requirements      |
| **Patch** (1.1.1) | Grammar, formatting, clarifications |

### Version History

| Version | Date       | Changes                                                                                                                                                        |
| ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0   | 2026-06-29 | Initial Project Blueprint                                                                                                                                      |
| 1.1.0   | 2026-06-29 | Added Section 18 (AI Collaboration), Section 19 (Document Lifecycle), Section 20 (Definition of Done)                                                          |
| 1.2.0   | 2026-06-29 | Added Section 16 (Platform Context), expanded Section 8                                                                                                        |
| 1.2.1   | 2026-06-29 | Updated Architectural Principles to 6-tier architecture for consistency with ADR-002 and ADR-003                                                               |
| 1.2.2   | 2026-06-29 | Updated Platform Context to distinguish physical deployment from logical architecture; replaced "Data Layer" with "Infrastructure" for terminology consistency |

---

## AI Context Hierarchy

When information conflicts, AI shall trust sources in this order:

1. Project Blueprint (this document)
2. Source of Truth
3. System Architecture
4. Engineering Constitution
5. Coding Standards
6. Implementation (actual code)
7. Comments in code
8. AI assumptions (lowest trust)

---

## 1. Project Overview

The QuickFreights Platform is a logistics management system built for
Quick Freights Global Limited (RC: 8106184), a subsidiary of Bondex Bridge
Multinational Terminal Limited.

It replaces manual processes with an integrated digital platform that
manages freight forwarding, shipment tracking, customer communication,
and future business operations.

---

## 2. Business Problem

Currently, Quick Freights Global Limited relies on:

- Manual Bill of Lading submissions
- Phone calls and paper records for shipment status
- No automated customer notifications
- No centralized tracking system
- No digital record of customer interactions

This creates:

- Delayed communication with customers
- Lost or duplicated shipment records
- No visibility into cargo status
- Administrative overhead
- Difficulty scaling operations

---

## 3. Project Vision

### Business Vision

To become the most trusted digital logistics platform in Nigeria's
eastern trade corridor by providing:

- Fast, transparent shipment processing
- Automated customer notifications
- Centralized data management
- Scalable operations
- Professional customer experience

### Engineering Vision

The QuickFreights Platform will be engineered as a modular,
documentation-driven, AI-compatible software platform where every
component has a single responsibility, every business rule has a
single source of truth, and every architectural decision is recorded
for long-term maintainability.

### Design Philosophy

The platform shall favor:

- Clarity over cleverness
- Simplicity over unnecessary abstraction
- Explicit behavior over hidden behavior
- Documentation over tribal knowledge
- Stability over premature optimization

---

## 4. Project Objectives

1. Replace manual Bill of Lading processing with a digital submission form.
2. Provide customers with instant tracking IDs.
3. Automate SMS notifications when cargo is cleared.
4. Centralize all shipment data in a structured, queryable database.
5. Enable secure document uploads from customers.
6. Build a foundation for future modules (admin portal, customer accounts,
   mobile apps).

---

## 5. Success Criteria

| #   | Criterion                          | Measurement                                 |
| --- | ---------------------------------- | ------------------------------------------- |
| 1   | Customers can submit B/L online    | Form submissions reach database             |
| 2   | Customers receive tracking IDs     | Instant display after submission            |
| 3   | Customers receive SMS on clearance | SMS sent within 60 seconds of status change |
| 4   | Admin can manage shipments         | Status changes via Google Sheets            |
| 5   | Documents are stored securely      | Files accessible via Google Drive           |
| 6   | Platform runs 24/7                 | Zero-downtime hosting                       |
| 7   | System is maintainable             | Any trained staff can operate it            |

---

## 6. Success Metrics (KPIs)

| Metric                         | Target                                                                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uptime                         | 99.5%                                                                                                                                              |
| Successful form submissions    | 95%                                                                                                                                                |
| SMS delivery within 60 seconds | 100%                                                                                                                                               |
| Duplicate submissions          | <1%                                                                                                                                                |
| Exposed secrets in source code | Zero                                                                                                                                               |
| Documentation coverage         | Every production feature must have: architecture documented, business rule documented, Source of Truth updated, Decision Log updated if applicable |

---

## 7. Non-Functional Requirements

The platform shall:

- Be available 24/7 using reliable hosting.
- Be mobile-first and responsive across all device sizes.
- Be accessible to users with varying abilities.
- Validate all user input before processing.
- Protect confidential customer and business information.
- Support future modular expansion without architectural changes.
- Minimize operational costs through free-tier services where practical.
- Be understandable by both human engineers and AI assistants.

---

## 8. Architectural Principles

Every feature shall follow this layered design:
User
│
▼
Presentation Layer
│
▼
Application Layer
│
▼
Business Domain Layer
│
▼
Infrastructure Layer
│
▼
External Services

text

Each layer has a single responsibility.
No layer shall bypass the layer directly below it.
Dependencies shall always point downward.

The detailed architecture with module definitions, data flows, and
implementation notes is defined in `01_System_Architecture.md`.

---

## 9. Guiding Principles

1. **Single Source of Truth** — Every value lives in one place.
2. **Mobile-First** — Designed for phones, scales to desktop.
3. **AI-Ready** — Structured for AI-assisted development.
4. **Cost-Conscious** — Free tier services preferred where practical.
5. **Progressive Enhancement** — Start simple, add complexity as needed.
6. **Security by Default** — Secrets never in source code.
7. **Documentation-Driven** — Docs and code stay in sync.

---

## 10. Project Constraints

Current constraints include:

- Google Apps Script execution limits (6 min/execution, daily quotas).
- Google Sheets storage limitations (10 million cell limit).
- Google Drive storage quotas (15GB free tier).
- GitHub Pages static hosting (no server-side code).
- Limited operational budget (prioritize free-tier services).
- Nigerian SMS gateway reliability and approval requirements.
- Single developer with AI assistance.

---

## 11. Project Risks

| Risk                                   | Impact                        | Mitigation                                                                                               |
| -------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| SMS provider unavailable               | Customers not notified        | Document fallback provider; manual phone calls as last resort                                            |
| Google quota exceeded                  | Data cannot be saved          | Monitor usage; archive old data; migration strategy prepared                                             |
| Sender ID not approved                 | SMS not sent                  | Use approved default sender; escalate with provider                                                      |
| Single developer dependency            | Project stalls if unavailable | Comprehensive documentation; AI-assisted knowledge preservation                                          |
| Internet outage affecting admin access | Cannot update shipments       | Resume operations when connectivity returns; maintain local backups of critical documents and procedures |

---

## 12. Assumptions

The system currently assumes:

- Customers have smartphones with internet access.
- Reliable internet connectivity exists for admin users.
- Google services (Sheets, Drive, Apps Script) remain available.
- Payless Bulk SMS Nigeria continues as the SMS provider.
- Staff are trained to update shipment status in Google Sheets.
- GitHub Pages remains a free hosting option.
- A single admin manages shipments initially.

If any assumption changes, the platform design must be reviewed.

---

## 13. Scope

### In Scope (v1.0)

- Public-facing company website
- Bill of Lading submission form with file attachments
- Automated tracking ID generation
- SMS notifications on cargo clearance
- Google Sheets-based admin panel
- Google Drive document storage
- GitHub Pages hosting
- Google Apps Script backend

### Future Scope (Phased)

- Customer accounts and login
- Admin dashboard with analytics
- Multi-user admin roles
- Email notifications
- Payment integration
- Mobile app
- API for third-party integrations

---

## 14. Out of Scope (v1.0)

- Real-time GPS cargo tracking
- Customs API integration
- Payment processing
- Customer login portal
- Multi-language support
- Desktop application

---

## 15. Stakeholders

| Role               | Name/Entity                                                       |
| ------------------ | ----------------------------------------------------------------- |
| **Business Owner** | Quick Freights Global Limited                                     |
| **Parent Company** | Bondex Bridge Multinational Terminal Limited                      |
| **Customers**      | Importers and exporters in Nigeria                                |
| **Admin Users**    | Quick Freights staff                                              |
| **Developer**      | John Paul (Engineering Lead)                                      |
| **AI Partner**     | Engineering Executor, Architect, Reviewer, Documentation Engineer |

---

## 16. Platform Context

### Physical Deployment

Website (GitHub Pages)
│
▼
Google Apps Script
(Application + Business Domain)
│
▼
Infrastructure
(Google Sheets + Google Drive)
│
▼
External Services
(SMS Gateway, Google Fonts)

text

### Logical Architecture

The platform follows a 6-tier logical architecture.
See `01_System_Architecture.md` for module definitions, data flows,
and component diagrams.

---

## 17. Project Phases

| Phase | Name                     | Status      |
| ----- | ------------------------ | ----------- |
| 0     | Foundation               | ✅ Complete |
| 1     | Platform Design          | 🔄 Current  |
| 2     | Development Environment  | ⏳ Pending  |
| 3     | Website Architecture     | ⏳ Pending  |
| 4     | Backend Architecture     | ⏳ Pending  |
| 5     | Feature Development      | ⏳ Pending  |
| 6     | Testing                  | ⏳ Pending  |
| 7     | Deployment               | ⏳ Pending  |
| 8     | Operations & Maintenance | ⏳ Pending  |

---

## 18. AI Collaboration

The QuickFreights Platform is designed for AI-assisted engineering.

All AI contributors shall:

- Treat documentation as the primary source of truth.
- Avoid assumptions when project context is incomplete.
- Label confidence levels (High, Medium, Low) on all recommendations.
- Explain architectural reasoning before implementation.
- Update documentation when behavior or architecture changes.
- Preserve project standards before implementing code.
- Never duplicate values that exist in the Source of Truth.
- Follow the AI Context Hierarchy when resolving conflicting information.

---

## 19. Document Lifecycle

Every document in this repository follows:
Draft
│
▼
Architect Review
│
▼
Revision
│
▼
Approved
│
▼
Version Tagged
│
▼
Committed

text

No document is considered finished until it has been reviewed, approved,
versioned, and committed.

---

## 20. Definition of Done

A phase is complete when:

1. All deliverables for that phase are produced.
2. Deliverables are reviewed and approved.
3. Documentation is updated.
4. Changes are committed to the repository.
5. The next phase is unblocked.
