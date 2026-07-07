# 06 — Decision Log

**Title:** QuickFreights Platform — Decision Log
**Version:** 1.1.0
**Status:** Approved
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`02_Engineering_Constitution.md`

### References

- `00_Project_Blueprint.md` — Decisions affecting vision
- `01_System_Architecture.md` — Decisions affecting architecture
- `00A_Project_Journey.md` — Key decisions summary

---

## Authority

This document is the permanent record of every significant architectural,
engineering, and governance decision made during the development of the
QuickFreights Platform.

Decisions recorded here are considered authoritative until superseded
by a newer decision.

---

## 1. Purpose

The Decision Log exists to answer one question:

> Why was this decision made?

It prevents future contributors from repeating debates that have already
been resolved, and provides historical context when decisions need to be
revisited.

---

## 2. Decision Categories

| Category                | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| **Architecture**        | System structure, layer boundaries, component design |
| **Security**            | Authentication, authorization, secrets management    |
| **Documentation**       | Documentation standards, governance, lifecycle       |
| **AI Governance**       | AI behavior, context hierarchy, contribution rules   |
| **Infrastructure**      | Hosting, deployment, storage, external services      |
| **Business Rules**      | Domain logic, validation, workflows                  |
| **Development Process** | Workflow, branching, review, tooling                 |

---

## 3. ADR Numbering Rule

ADR numbers are never reused.

If an ADR is deprecated or superseded, its number is retired permanently.
New decisions always receive the next available number.

This keeps references stable over the lifetime of the project.

---

## 4. Decision Format

Every decision SHALL be recorded with the following structure:

| Field                       | Description                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| **ADR ID**                  | Unique identifier (ADR-NNN)                                                                               |
| **Date**                    | When the decision was made                                                                                |
| **Status**                  | Proposed, Accepted, Deprecated, Superseded                                                                |
| **Category**                | Architecture, Security, Documentation, AI Governance, Infrastructure, Business Rules, Development Process |
| **Context**                 | What problem or situation led to this decision                                                            |
| **Alternatives Considered** | Other options that were evaluated                                                                         |
| **Decision**                | What was decided                                                                                          |
| **Rationale**               | Why this option was chosen over alternatives                                                              |
| **Consequences**            | What this decision enables, prevents, or requires                                                         |
| **Review Date**             | When this decision should be revisited (if applicable)                                                    |
| **Superseded By**           | Reference to newer ADR if this decision was replaced                                                      |
| **Related Documents**       | Governing documents affected by this decision                                                             |

---

## 5. Decision Records

---

### ADR-001

| Field                       | Value                                                                                                                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                    | 2026-06-29                                                                                                                                                                                                                   |
| **Status**                  | Accepted                                                                                                                                                                                                                     |
| **Category**                | AI Governance                                                                                                                                                                                                                |
| **Context**                 | Multiple AI assistants will contribute to this project. Without a clear hierarchy, conflicting recommendations could cause architectural drift and hallucinations.                                                           |
| **Alternatives Considered** | (a) No formal hierarchy — let each AI operate independently; (b) Single approved AI only — limit contributions to one tool; (c) Context hierarchy with governing documents as authority.                                     |
| **Decision**                | Adopt an AI Context Hierarchy: Blueprint → Source of Truth → Architecture → Constitution → Coding Standards → Implementation → Comments → AI Assumptions. When information conflicts, higher-ranked sources take precedence. |
| **Rationale**               | Option (a) risks conflicting implementations. Option (b) limits flexibility as AI tools evolve. Option (c) provides governance without restricting tool choice.                                                              |
| **Consequences**            | All AI contributions must reference this hierarchy. AI must label confidence levels. Project documentation must be kept current.                                                                                             |
| **Review Date**             | 2026-12-29                                                                                                                                                                                                                   |
| **Related Documents**       | `03_AI_Engineering_Guide.md`, `00_Project_Blueprint.md`                                                                                                                                                                      |

---

### ADR-002

| Field                       | Value                                                                                                                                                                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                    | 2026-06-29                                                                                                                                                                                                                    |
| **Status**                  | Accepted                                                                                                                                                                                                                      |
| **Category**                | Architecture                                                                                                                                                                                                                  |
| **Context**                 | The platform needed a structural organization that separates concerns, supports multiple applications, and survives technology changes.                                                                                       |
| **Alternatives Considered** | (a) Monolithic single-layer design; (b) 3-tier (Presentation, Backend, Database); (c) 6-tier layered architecture with Business Domain as distinct layer.                                                                     |
| **Decision**                | Adopt a 6-tier layered architecture: User → Presentation → Application → Business Domain → Infrastructure → External Services. Dependencies always point downward. Lower layers never depend on higher layers.                |
| **Rationale**               | Option (a) does not scale. Option (b) conflates business logic with infrastructure. Option (c) provides the clearest separation and survives physical implementation changes.                                                 |
| **Consequences**            | All features must fit within these layers. Physical implementation can change without architectural redesign. Note: Currently, Application and Business Domain share the same Apps Script runtime but are logically separate. |
| **Review Date**             | 2027-06-29                                                                                                                                                                                                                    |
| **Related Documents**       | `01_System_Architecture.md`                                                                                                                                                                                                   |

---

### ADR-003

| Field                       | Value                                                                                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                    | 2026-06-29                                                                                                                                                                                        |
| **Status**                  | Accepted                                                                                                                                                                                          |
| **Category**                | Architecture                                                                                                                                                                                      |
| **Context**                 | The Business Domain layer was initially embedded within the Application Layer. Over time, this would make business rules difficult to isolate and test.                                           |
| **Alternatives Considered** | (a) Keep business logic in Application Layer; (b) Separate Business Domain as a distinct logical layer; (c) Create separate microservices for each business function.                             |
| **Decision**                | Separate the Business Domain as a distinct logical layer between Application and Infrastructure, even though both currently run in the same Google Apps Script project.                           |
| **Rationale**               | Option (a) creates long-term maintenance burden. Option (c) is premature for current scale. Option (b) provides clean separation now and enables future migration without architectural redesign. |
| **Consequences**            | Business logic modules (Validation Service, Tracking Service, Notification Service) must not directly call Infrastructure. All infrastructure access goes through the Application Layer.          |
| **Review Date**             | 2027-06-29                                                                                                                                                                                        |
| **Related Documents**       | `01_System_Architecture.md`                                                                                                                                                                       |

---

### ADR-004

| Field                       | Value                                                                                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Date**                    | 2026-06-29                                                                                                                                                                                                   |
| **Status**                  | Accepted                                                                                                                                                                                                     |
| **Category**                | Architecture                                                                                                                                                                                                 |
| **Context**                 | Without a clear dependency rule, circular dependencies and architectural drift become likely as the project grows.                                                                                           |
| **Alternatives Considered** | (a) No formal dependency rule; (b) Dependencies always point downward.                                                                                                                                       |
| **Decision**                | Dependencies shall always point downward. Lower layers shall never depend on higher layers. No layer may bypass the layer directly below it.                                                                 |
| **Rationale**               | This is the core rule of layered architecture. Option (a) leads to unmaintainable code. Option (b) prevents circular dependencies, simplifies testing, and ensures each layer can be replaced independently. |
| **Consequences**            | Every new feature must respect the dependency direction. Violations are flagged during architecture review.                                                                                                  |
| **Review Date**             | 2027-06-29                                                                                                                                                                                                   |
| **Related Documents**       | `01_System_Architecture.md`, `02_Engineering_Constitution.md`                                                                                                                                                |

---

### ADR-005

| Field                       | Value                                                                                                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                    | 2026-06-29                                                                                                                                                                                            |
| **Status**                  | Accepted                                                                                                                                                                                              |
| **Category**                | Documentation                                                                                                                                                                                         |
| **Context**                 | The project needed a governance framework that defines how engineering decisions are made, reviewed, and enforced.                                                                                    |
| **Alternatives Considered** | (a) Ad-hoc decision making; (b) Formal Engineering Constitution as governing standard.                                                                                                                |
| **Decision**                | Adopt the Engineering Constitution (`02_Engineering_Constitution.md`) as the governing engineering standard. All implementation, review, and architectural decisions must comply with its principles. |
| **Rationale**               | Option (a) leads to inconsistent quality. Option (b) provides objective criteria for evaluating engineering decisions and ensures consistency across human and AI contributors.                       |
| **Consequences**            | Principle violations must be justified and recorded. The Constitution can be amended through a defined process.                                                                                       |
| **Review Date**             | 2027-06-29                                                                                                                                                                                            |
| **Related Documents**       | `02_Engineering_Constitution.md`                                                                                                                                                                      |

---

### ADR-006

| Field                       | Value                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                    | 2026-06-29                                                                                                                                                                      |
| **Status**                  | Accepted                                                                                                                                                                        |
| **Category**                | AI Governance                                                                                                                                                                   |
| **Context**                 | The project needed a standard for how AI assistants should contribute code, make recommendations, and interact with governing documents.                                        |
| **Alternatives Considered** | (a) No formal AI guidelines; (b) AI Engineering Guide as governance standard.                                                                                                   |
| **Decision**                | Adopt the AI Engineering Guide (`03_AI_Engineering_Guide.md`) as the AI governance standard. AI-generated output is a proposal, not an authoritative project decision.          |
| **Rationale**               | Without explicit rules, different AI tools could produce conflicting or incompatible contributions. The guide ensures consistent behavior regardless of which AI model is used. |
| **Consequences**            | AI must label confidence levels, follow the context hierarchy, and perform self-reviews. AI may not introduce changes that violate the Constitution.                            |
| **Review Date**             | 2026-12-29                                                                                                                                                                      |
| **Related Documents**       | `03_AI_Engineering_Guide.md`                                                                                                                                                    |

---

### ADR-007

| Field                       | Value                                                                                                                                                                                                      |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                    | 2026-06-29                                                                                                                                                                                                 |
| **Status**                  | Accepted                                                                                                                                                                                                   |
| **Category**                | Documentation                                                                                                                                                                                              |
| **Context**                 | The project needed a canonical location for every shared value, constant, and business rule to prevent duplication across code, documentation, and configuration.                                          |
| **Alternatives Considered** | (a) Values stored where they are first used; (b) Single Source of Truth document.                                                                                                                          |
| **Decision**                | Adopt `04_Source_of_Truth.md` as the single authoritative source for all project-wide values. No value shall be duplicated between this document and any other file.                                       |
| **Rationale**               | Single Source of Truth is the most fundamental engineering principle. Option (a) requires searching multiple files and guarantees inconsistencies. Option (b) ensures changes propagate from one location. |
| **Consequences**            | Before introducing any value, contributors must check the Source of Truth. Duplication is flagged during code review.                                                                                      |
| **Review Date**             | 2026-12-29                                                                                                                                                                                                 |
| **Related Documents**       | `04_Source_of_Truth.md`                                                                                                                                                                                    |

---

### ADR-008

| Field                       | Value                                                                                                                                                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                    | 2026-06-29                                                                                                                                                                                                     |
| **Status**                  | Accepted                                                                                                                                                                                                       |
| **Category**                | Documentation                                                                                                                                                                                                  |
| **Context**                 | The project needed a versioning standard to track the significance of changes across all governing documents.                                                                                                  |
| **Alternatives Considered** | (a) No versioning; (b) Date-based versioning; (c) Semantic versioning (Major.Minor.Patch).                                                                                                                     |
| **Decision**                | Adopt semantic versioning for all project documents: Major for breaking changes, Minor for new content, Patch for corrections and clarifications.                                                              |
| **Rationale**               | Option (a) provides no change tracking. Option (b) does not convey significance. Option (c) provides a predictable evolution path and makes it immediately clear whether a change requires significant review. |
| **Consequences**            | All document updates must increment the version according to this policy. Version history sections must be maintained.                                                                                         |
| **Review Date**             | 2027-06-29                                                                                                                                                                                                     |
| **Related Documents**       | All governing documents                                                                                                                                                                                        |

---

### ADR-009

| Field                       | Value                                                                                                                                                                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                    | 2026-06-29                                                                                                                                                                                                                                                                |
| **Status**                  | Accepted                                                                                                                                                                                                                                                                  |
| **Category**                | Security                                                                                                                                                                                                                                                                  |
| **Context**                 | The project needed to choose between permissive open-source licensing and proprietary protection for a commercial business platform.                                                                                                                                      |
| **Alternatives Considered** | (a) MIT License; (b) Apache 2.0; (c) GPL v3; (d) Proprietary license.                                                                                                                                                                                                     |
| **Decision**                | Adopt a proprietary license. All rights reserved. The software and its source code are proprietary and confidential to Quick Freights Global Limited.                                                                                                                     |
| **Rationale**               | As a commercial logistics platform, protecting business intellectual property takes priority over open-source collaboration. Options (a)-(c) would grant usage rights that conflict with commercial objectives. Individual components can be re-licensed later if needed. |
| **Consequences**            | External contributors must request written permission. The license file must be included in the repository.                                                                                                                                                               |
| **Review Date**             | 2027-06-29                                                                                                                                                                                                                                                                |
| **Related Documents**       | `LICENSE`                                                                                                                                                                                                                                                                 |

---

### ADR-010

| Field                       | Value                                                                                                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Date**                    | 2026-06-29                                                                                                                                                                                      |
| **Status**                  | Accepted                                                                                                                                                                                        |
| **Category**                | Documentation                                                                                                                                                                                   |
| **Context**                 | The project needed a documentation structure that provides a natural reading order for both humans and AI.                                                                                      |
| **Alternatives Considered** | (a) Alphabetical ordering; (b) Grouped by topic without numbering; (c) Numbered document prefixes.                                                                                              |
| **Decision**                | Adopt numbered document prefixes (`00_`, `01_`, `02_`, etc.) in the `docs/` folder. The prefix determines the recommended reading order and indicates the document's position in the hierarchy. |
| **Rationale**               | Option (a) does not convey relationships. Option (b) requires external indexes. Option (c) makes the documentation architecture self-evident and supports AI-assisted navigation.               |
| **Consequences**            | New documents must follow the numbering convention. The sequence reflects the logical dependency order of the documents.                                                                        |
| **Review Date**             | 2027-06-29                                                                                                                                                                                      |
| **Related Documents**       | All documents in `docs/`                                                                                                                                                                        |

---

## 6. Rejected Proposals

Rejected decisions are recorded to prevent revisiting the same debates.

---

### ADR-R001

| Field                    | Value                                                                                                                                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Date**                 | 2026-06-29                                                                                                                                                                                                                                       |
| **Status**               | Rejected                                                                                                                                                                                                                                         |
| **Category**             | Infrastructure                                                                                                                                                                                                                                   |
| **Proposal**             | Use Firebase or Supabase as the backend database instead of Google Sheets.                                                                                                                                                                       |
| **Reason for Rejection** | Google Sheets better matches the current budget constraints and administrative simplicity. The admin interface (directly editing a sheet) requires no additional training. This decision may be revisited if scale demands a database migration. |
| **Related Documents**    | `01_System_Architecture.md`, `04_Source_of_Truth.md`                                                                                                                                                                                             |

---

## 7. Decision Statuses

| Status         | Meaning                                          |
| -------------- | ------------------------------------------------ |
| **Proposed**   | Under discussion, not yet adopted                |
| **Accepted**   | Approved and in effect                           |
| **Deprecated** | No longer applicable (system changed)            |
| **Superseded** | Replaced by a newer decision (see Superseded By) |
| **Rejected**   | Evaluated and intentionally not adopted          |

---

## 8. Version History

| Version | Date       | Changes                                                                                                                             |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0   | 2026-06-29 | Initial Decision Log with ADR-001 through ADR-010                                                                                   |
| 1.1.0   | 2026-06-29 | Added alternatives considered, decision categories, review dates, related documents, ADR numbering rule, rejected proposals section |

# Version 1.0 Launch Decisions

## Decision: Primary Customer CTA Language

**Date:** 2026-07-07

**Previous:** Submit B/L

**Changed to:** Cargo Portal

**Reason:** Quick Freights Global Limited operates primarily as a clearing and forwarding agency. "Submit B/L" was too narrow and assumed the customer already understood freight terminology.

"Cargo Portal" allows:
- Customs clearance enquiries
- Document submission
- Freight forwarding requests
- Future digital services

**Impact:** Broader customer entry point and improved conversion potential.

---

## Decision: Homepage Trust Structure

**Date:** 2026-07-07

**Decision:** Removed duplicate statistics bar and replaced it with a proof-based credentials section.

**Reason:** The previous stats repeated location/service information without increasing customer confidence.

**New focus:**
- Registration
- Customs capability
- Port presence
- Availability

**Impact:** Improved first-visit trust experience.

---

## Decision: Communication Single Source of Truth

**Date:** 2026-07-07

**Decision:** All customer contact details and templates are controlled through communication.config.js.

**Reason:** Avoid inconsistent phone numbers, emails, and WhatsApp messages.

**Impact:** Future domain changes, CRM integration, and automation can happen from one location.

---

## Decision: Version 1.0 Scope Freeze

**Date:** 2026-07-07

**Decision:** Freeze website features after production release.

**Reason:** Future improvements should be based on customer data, analytics, and real business feedback.

**Deferred to V2:**
- Customer dashboard
- Tracking portal
- Document management
- Testimonials
- Case studies
- Advanced automation

---

## Decision: Hero Height Optimization

**Date:** 2026-07-07

**Decision:** Reduced hero min-height from 100vh to 60vh (mobile) / 55vh (desktop).

**Reason:** Trust Bar should be visible immediately. Creates better visual flow and content hierarchy.

**Impact:** Users see credentials bar right away. Less scrolling, more engaging layout.

---

## Decision: Image Optimization to WebP

**Date:** 2026-07-07

**Decision:** Converted og-image.png to WebP and compressed all WebP images using Squoosh.

**Reason:** Page load speed is critical for user experience and SEO.

**Impact:** Reduced total image size by ~70%. Faster page loads, better Lighthouse scores.

---

## Decision: GitHub Actions for Automated Deployment

**Date:** 2026-07-07

**Decision:** Implemented GitHub Actions workflow with Pages deployment.

**Reason:** Automated, reliable deployment. No manual steps after push. Maintains deployment history.

**Impact:** Seamless CI/CD pipeline. Every push to main triggers a deploy.

---

## Decision: Premium Gold Circle Checkmarks

**Date:** 2026-07-07

**Decision:** Replaced simple SVG checkmarks with premium gold circle checkmarks (22px with gold-light border).

**Reason:** Enhanced visual quality and brand consistency.

**Impact:** Improved visual hierarchy and premium feel.

---

## Decision: Production Readiness & Scope Freeze

**Date:** 2026-07-07

**Decision:** Finalize V1.0.0 with current feature set. Do not add new features without analytics validation.

**Reason:** Avoid scope creep. Let real user data guide V2 improvements.

**Impact:** Clean baseline for measuring V2 success.
