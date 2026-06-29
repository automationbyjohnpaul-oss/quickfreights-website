# 07 — Project Roadmap

**Title:** QuickFreights Platform — Project Roadmap
**Version:** 1.1.0
**Status:** Approved
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`00_Project_Blueprint.md`

### References

- `00A_Project_Journey.md` — Current progress
- `06_Decision_Log.md` — Architectural decisions affecting timeline

---

## Authority

This document defines the planned milestones, phases, and deliverables
for the QuickFreights Platform.

It is a planning document. Actual progress is recorded in
`00A_Project_Journey.md`.

---

## 1. Purpose

The Roadmap answers one question:

> What are we building, and in what order?

It provides a shared timeline for all contributors — human and AI.

---

## 2. Guiding Principles for Sequencing

Features are prioritized by:

1. **Business value** — What helps customers soonest?
2. **Dependencies** — What must be built first?
3. **Risk reduction** — What proves the architecture works?
4. **Learning value** — What builds engineering capability?

---

## 3. Phase Overview

| Phase | Name                     | Status         |
| ----- | ------------------------ | -------------- |
| 0     | Foundation               | ✅ Complete    |
| 1     | Platform Design          | ✅ Complete    |
| 2     | Development Environment  | 🔄 In Progress |
| 3     | Website Architecture     | ⏳ Pending     |
| 4     | Backend Architecture     | ⏳ Pending     |
| 5     | Feature Development      | ⏳ Pending     |
| 6     | Testing                  | ⏳ Pending     |
| 7     | Deployment               | ⏳ Pending     |
| 8     | Operations & Maintenance | ⏳ Pending     |

---

## 4. Detailed Milestones

### Phase 0 — Foundation

| ID  | Milestone    | Deliverables                                                    | Status |
| --- | ------------ | --------------------------------------------------------------- | ------ |
| 0.1 | Workspace    | Project root, folder structure, VS Code setup                   | ✅     |
| 0.2 | Git Init     | Repository initialized, branch set to main                      | ✅     |
| 0.3 | Git Config   | User name and email configured                                  | ✅     |
| 0.4 | First Commit | `.gitignore`, `.editorconfig`, `LICENSE`, `README.md` committed | ✅     |

---

### Phase 1 — Platform Design

| ID   | Milestone        | Deliverables                                     | Status |
| ---- | ---------------- | ------------------------------------------------ | ------ |
| 1.1  | Blueprint        | `00_Project_Blueprint.md` v1.2.2 Approved        | ✅     |
| 1.2  | Project Journey  | `00A_Project_Journey.md` v1.1.0 Active           | ✅     |
| 1.3  | Architecture     | `01_System_Architecture.md` v1.1.0 Approved      | ✅     |
| 1.4  | Constitution     | `02_Engineering_Constitution.md` v1.1.0 Approved | ✅     |
| 1.5  | AI Guide         | `03_AI_Engineering_Guide.md` v1.1.0 Approved     | ✅     |
| 1.6  | Source of Truth  | `04_Source_of_Truth.md` v1.1.0 Approved          | ✅     |
| 1.7  | Coding Standards | `05_Coding_Standards.md` v1.1.0 Approved         | ✅     |
| 1.8  | Decision Log     | `06_Decision_Log.md` v1.1.0 Approved             | ✅     |
| 1.9  | Roadmap          | `07_Project_Roadmap.md` — this document          | ✅     |
| 1.10 | Glossary         | `08_Glossary.md` v1.0.0 Draft                    | ✅     |

---

### Phase 2 — Development Environment

| ID  | Milestone            | Deliverables                               | Status |
| --- | -------------------- | ------------------------------------------ | ------ |
| 2.1 | VS Code Config       | `.vscode/settings.json`, `extensions.json` | ✅     |
| 2.2 | GitHub Remote        | Repository connected and pushed            | 🔄     |
| 2.3 | Development Workflow | Documented workflow from feature to merge  | ⏳     |
| 2.4 | Tooling              | Linting, formatting, Live Server           | ✅     |

---

### Phase 3 — Website Architecture

| ID  | Milestone           | Deliverables                          | Status |
| --- | ------------------- | ------------------------------------- | ------ |
| 3.1 | Page Inventory      | List all pages and their components   | ⏳     |
| 3.2 | Component Design    | Reusable components defined           | ⏳     |
| 3.3 | Asset Management    | Local images, fonts, icons            | ⏳     |
| 3.4 | Responsive Design   | Mobile-first layout confirmed         | ⏳     |
| 3.5 | Accessibility Audit | All pages meet baseline accessibility | ⏳     |

---

### Phase 4 — Backend Architecture

| ID  | Milestone         | Deliverables                             | Status |
| --- | ----------------- | ---------------------------------------- | ------ |
| 4.1 | API Specification | Endpoints, request/response formats      | ⏳     |
| 4.2 | Sheet Schema      | Column definitions, validation rules     | ⏳     |
| 4.3 | Module Design     | Service modules defined per architecture | ⏳     |
| 4.4 | SMS Integration   | Provider configuration, templates        | ⏳     |
| 4.5 | File Storage      | Google Drive integration, security       | ⏳     |

---

### Phase 5 — Feature Development

| ID  | Milestone        | Deliverables                         | Status |
| --- | ---------------- | ------------------------------------ | ------ |
| 5.1 | Homepage         | Company landing page with images     | ⏳     |
| 5.2 | B/L Submission   | Form with validation and file upload | ⏳     |
| 5.3 | Tracking ID      | ID generation and display            | ⏳     |
| 5.4 | SMS Notification | Automated SMS on clearance           | ⏳     |
| 5.5 | Admin Panel      | Google Sheets-based management       | ⏳     |
| 5.6 | About Page       | Company story and values             | ⏳     |
| 5.7 | Services Page    | Service descriptions with icons      | ⏳     |
| 5.8 | Contact Page     | Office locations and phone numbers   | ⏳     |

---

### Phase 6 — Testing

| ID  | Milestone             | Deliverables                        | Status |
| --- | --------------------- | ----------------------------------- | ------ |
| 6.1 | Functional Testing    | All features tested end-to-end      | ⏳     |
| 6.2 | Responsive Testing    | Mobile, tablet, desktop verified    | ⏳     |
| 6.3 | Accessibility Testing | Keyboard navigation, screen readers | ⏳     |
| 6.4 | SMS Testing           | Notification delivery verified      | ⏳     |
| 6.5 | File Upload Testing   | Size limits, type validation        | ⏳     |
| 6.6 | Regression Testing    | Existing features still work        | ⏳     |

---

### Phase 7 — Deployment

| ID  | Milestone         | Deliverables                           | Status |
| --- | ----------------- | -------------------------------------- | ------ |
| 7.1 | GitHub Pages      | Website deployed to production         | ⏳     |
| 7.2 | Apps Script       | Backend deployed as Web App            | ⏳     |
| 7.3 | Domain Setup      | Custom domain configured (if acquired) | ⏳     |
| 7.4 | Go-Live Checklist | All systems verified                   | ⏳     |

---

### Phase 8 — Operations & Maintenance

| ID  | Milestone                 | Deliverables                           | Status |
| --- | ------------------------- | -------------------------------------- | ------ |
| 8.1 | Monitoring                | Usage tracking, error logging          | ⏳     |
| 8.2 | Backups                   | Sheet backups, Drive backups           | ⏳     |
| 8.3 | Documentation Maintenance | Keep docs in sync with code            | ⏳     |
| 8.4 | Feature Backlog           | Prioritized list of post-v1.0 features | ⏳     |

---

## 5. Future Features (Post v1.0)

These features are planned but not yet scheduled:

| Feature                          | Priority | Dependencies               |
| -------------------------------- | -------- | -------------------------- |
| Customer accounts and login      | Medium   | Database migration         |
| Admin dashboard with analytics   | Medium   | Sufficient shipment data   |
| Multi-user admin roles           | Medium   | Authentication system      |
| Email notifications              | Low      | Email provider integration |
| Payment integration              | Low      | Business requirements      |
| Mobile app                       | Low      | API stabilization          |
| API for third-party integrations | Low      | Authentication system      |

---

## 6. Risk Factors Affecting Timeline

| Risk                                     | Impact                        | Mitigation                                                                 |
| ---------------------------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| SMS provider delays (Sender ID approval) | Blocks SMS notifications      | Use approved default sender; escalate with provider                        |
| Google quota limits                      | May pause data collection     | Monitor usage; archive old data                                            |
| Single developer availability            | All progress stops            | Documentation-first approach preserves knowledge                           |
| Nigerian internet reliability            | Delays deployment and testing | GitHub Pages provides reliable hosting; local development possible offline |

---

## 7. Version History

| Version | Date       | Changes                                                                                                                           |
| ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0   | 2026-06-29 | Initial Project Roadmap                                                                                                           |
| 1.1.0   | 2026-06-29 | Added Project Journey milestone, restored Domain Setup and Feature Backlog, added Risk Factors section, standardized status icons |
