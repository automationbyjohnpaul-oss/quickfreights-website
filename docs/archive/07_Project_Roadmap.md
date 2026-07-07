# 07 — Project Roadmap

**Title:** QuickFreights Platform — Project Roadmap
**Version:** 2.1.0
**Status:** Approved
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-07-03

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

| Phase | Name                                   | Status         |
| ----- | -------------------------------------- | -------------- |
| 0     | Foundation                             | ✅ Complete    |
| 1     | Planning & Requirements                | ✅ Complete    |
| 2     | Architecture & Backend                 | ✅ Complete    |
| 3     | Frontend Development                   | ✅ Complete    |
| 4     | Integration & Testing                  | ✅ Complete    |
| 5     | Performance, Accessibility & UX Polish | ✅ Complete    |
| 6     | SEO & Content Enhancement              | 🚧 In Progress |
| 7     | Final Visual Polish                    | ⬜ Pending     |
| 8     | Operational Testing                    | ⬜ Pending     |
| 9     | Production Launch                      | ⬜ Pending     |

---

## 4. Major Milestones Achieved

| Milestone                                     | Phase |
| --------------------------------------------- | ----- |
| Responsive website complete (5 pages)         | 3     |
| Bill of Lading submission workflow complete   | 4     |
| Google Sheets integration complete            | 4     |
| SMS notifications complete                    | 4     |
| Tracking ID generation complete               | 4     |
| File upload to Google Drive complete          | 4     |
| Duplicate B/L detection complete              | 4     |
| Lighthouse performance optimization complete  | 5     |
| Accessibility audit complete                  | 5     |
| Image optimization (WebP, lazy loading)       | 5     |
| Submission UX improvements (overlay, timer)   | 5     |
| Hero redesign with cinematic overlay          | 5     |
| Brand messaging finalized and frozen          | 5     |
| CSS architecture cleaned and validated        | 5     |
| JavaScript performance fixes (reflow, fonts)  | 5     |
| Documentation synchronized and tokens aligned | 5     |

---

## 5. Detailed Milestones

### Phase 0 — Foundation ✅

| ID  | Milestone    | Deliverables                                                    | Status |
| --- | ------------ | --------------------------------------------------------------- | ------ |
| 0.1 | Workspace    | Project root, folder structure, VS Code setup                   | ✅     |
| 0.2 | Git Init     | Repository initialized, branch set to main                      | ✅     |
| 0.3 | Git Config   | User name and email configured                                  | ✅     |
| 0.4 | First Commit | `.gitignore`, `.editorconfig`, `LICENSE`, `README.md` committed | ✅     |

---

### Phase 1 — Planning & Requirements ✅

| ID   | Milestone        | Deliverables                              | Status |
| ---- | ---------------- | ----------------------------------------- | ------ |
| 1.1  | Blueprint        | `00_Project_Blueprint.md` Approved        | ✅     |
| 1.2  | Project Journey  | `00A_Project_Journey.md` Active           | ✅     |
| 1.3  | Architecture     | `01_System_Architecture.md` Approved      | ✅     |
| 1.4  | Constitution     | `02_Engineering_Constitution.md` Approved | ✅     |
| 1.5  | AI Guide         | `03_AI_Engineering_Guide.md` Approved     | ✅     |
| 1.6  | Source of Truth  | `04_Source_of_Truth.md` Approved          | ✅     |
| 1.7  | Coding Standards | `05_Coding_Standards.md` Approved         | ✅     |
| 1.8  | Decision Log     | `06_Decision_Log.md` Approved             | ✅     |
| 1.9  | Roadmap          | `07_Project_Roadmap.md` — this document   | ✅     |
| 1.10 | Glossary         | `08_Glossary.md` Draft                    | ✅     |

---

### Phase 2 — Architecture & Backend ✅

| ID  | Milestone         | Deliverables                         | Status |
| --- | ----------------- | ------------------------------------ | ------ |
| 2.1 | GitHub Setup      | Repository, GitHub Pages, Actions    | ✅     |
| 2.2 | Apps Script       | Web App deployed, Sheets integration | ✅     |
| 2.3 | Google Sheets     | Submissions, Status, SMS Log sheets  | ✅     |
| 2.4 | Google Drive      | Attachment folder, access control    | ✅     |
| 2.5 | SMS Integration   | Payless Bulk SMS configured          | ✅     |
| 2.6 | API Specification | Endpoints, request/response formats  | ✅     |

---

### Phase 3 — Frontend Development ✅

| ID  | Milestone         | Deliverables                            | Status |
| --- | ----------------- | --------------------------------------- | ------ |
| 3.1 | HTML Structure    | 5 pages, semantic markup, accessibility | ✅     |
| 3.2 | CSS Design System | Variables, responsive, mobile-first     | ✅     |
| 3.3 | Homepage          | Hero, expertise cards, stats, CTA       | ✅     |
| 3.4 | About Page        | Company story, values, team             | ✅     |
| 3.5 | Services Page     | Service descriptions, icons             | ✅     |
| 3.6 | Contact Page      | Office locations, phone numbers, email  | ✅     |
| 3.7 | Submit B/L Page   | Form with validation, file upload       | ✅     |
| 3.8 | Mobile Navigation | Off-canvas menu, focus trap             | ✅     |

---

### Phase 4 — Integration & Testing ✅

| ID  | Milestone           | Deliverables                         | Status |
| --- | ------------------- | ------------------------------------ | ------ |
| 4.1 | Form Validation     | Client-side + server-side validation | ✅     |
| 4.2 | File Upload         | Drive storage, size/type validation  | ✅     |
| 4.3 | Tracking ID         | Generation, display, copy button     | ✅     |
| 4.4 | SMS Notification    | Automated SMS on clearance status    | ✅     |
| 4.5 | Duplicate Detection | B/L number checking                  | ✅     |
| 4.6 | Error Handling      | Timeout messaging, retry logic       | ✅     |
| 4.7 | Local Storage       | Remember me functionality            | ✅     |
| 4.8 | Loading States      | Processing overlay, spinner, timer   | ✅     |

---

### Phase 5 — Performance, Accessibility & UX Polish ✅

| ID   | Milestone              | Deliverables                                 | Status |
| ---- | ---------------------- | -------------------------------------------- | ------ |
| 5.1  | Image Optimization     | WebP conversion, lazy loading, dimensions    | ✅     |
| 5.2  | Lighthouse Audit       | Mobile scores benchmarked                    | ✅     |
| 5.3  | Font Loading           | Async Google Fonts, render-blocking fix      | ✅     |
| 5.4  | JavaScript Performance | Forced reflow fix, console.log removed       | ✅     |
| 5.5  | CSS Cleanup            | Syntax errors, duplicate rules removed       | ✅     |
| 5.6  | Hero Redesign          | Cinematic overlay, typography, alignment     | ✅     |
| 5.7  | Brand Messaging        | Headline, tagline, subsidiary copy           | ✅     |
| 5.8  | Submission UX          | Subtext, timer, staged processing            | ✅     |
| 5.9  | Accessibility          | Skip link, ARIA, focus management            | ✅     |
| 5.10 | Favicon & Manifest     | SVG favicon, webmanifest                     | ✅     |
| 5.11 | Design Tokens          | Color variables aligned with Source of Truth | ✅     |

---

### Phase 6 — SEO & Content Enhancement 🚧

| ID  | Milestone             | Deliverables                       | Status |
| --- | --------------------- | ---------------------------------- | ------ |
| 6.1 | Meta Tags             | Title, description, canonical      | ✅     |
| 6.2 | Open Graph            | og:image, og:title, og:description | ✅     |
| 6.3 | Twitter Cards         | summary_large_image                | ✅     |
| 6.4 | Structured Data       | Schema.org Organization            | ✅     |
| 6.5 | Sitemap               | sitemap.xml                        | ✅     |
| 6.6 | Robots.txt            | Crawl directives                   | ✅     |
| 6.7 | Google Search Console | Site verification, indexing        | 🚧     |
| 6.8 | Bing Webmaster        | Site verification, indexing        | 🚧     |
| 6.9 | OG Image Optimization | 2.2 MB → ~200 KB                   | 🚧     |

---

### Phase 7 — Final Visual Polish ⬜

| ID  | Milestone                 | Deliverables                       | Status |
| --- | ------------------------- | ---------------------------------- | ------ |
| 7.1 | Hero Split Layout         | Desktop: text left, image right    | ⬜     |
| 7.2 | Service Card Image Polish | Consistent aspect ratios, overlays | ⬜     |
| 7.3 | Homepage Visual Refine    | Spacing, shadows, overall cohesion | ⬜     |
| 7.4 | Animation Polish          | Hover states, transitions, timing  | ⬜     |
| 7.5 | Logo Assets               | SVG logo, favicon set, app icons   | ⬜     |
| 7.6 | Imagery Review            | Higher-quality logistics photos    | ⬜     |
| 7.7 | Icon Consistency          | Unified icon set across pages      | ⬜     |

---

### Phase 8 — Operational Testing ⬜

| ID  | Milestone         | Deliverables                         | Status |
| --- | ----------------- | ------------------------------------ | ------ |
| 8.1 | Attachment Naming | Verify uploaded filenames correct    | ⬜     |
| 8.2 | Cross-Browser     | Chrome, Edge, Firefox, Safari        | ⬜     |
| 8.3 | Cross-Device      | Android, iPhone, tablets             | ⬜     |
| 8.4 | Form Workflow     | Submission, SMS, duplicate detection | ⬜     |
| 8.5 | File Upload       | All types, size limits, Drive links  | ⬜     |
| 8.6 | Error Handling    | Timeout, network loss, server errors | ⬜     |
| 8.7 | Slow Network      | Throttled performance testing        | ⬜     |

---

### Phase 9 — Production Launch ⬜

| ID  | Milestone           | Deliverables                    | Status |
| --- | ------------------- | ------------------------------- | ------ |
| 9.1 | Custom Domain       | quickfreightsglobal.com         | ⬜     |
| 9.2 | Analytics           | Google Analytics setup          | ⬜     |
| 9.3 | Search Console      | Final verification              | ⬜     |
| 9.4 | Security Review     | API keys, permissions, secrets  | ⬜     |
| 9.5 | Performance Audit   | Final Lighthouse pass           | ⬜     |
| 9.6 | Backup              | Full repository and data backup | ⬜     |
| 9.7 | Launch Checklist    | All systems go                  | ⬜     |
| 9.8 | Public Announcement | Go live                         | ⬜     |

---

## 6. Future Features (Post v1.0)

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

## 7. Risk Factors Affecting Timeline

| Risk                                     | Impact                        | Mitigation                                                                 |
| ---------------------------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| SMS provider delays (Sender ID approval) | Blocks SMS notifications      | Use approved default sender; escalate with provider                        |
| Google quota limits                      | May pause data collection     | Monitor usage; archive old data                                            |
| Single developer availability            | All progress stops            | Documentation-first approach preserves knowledge                           |
| Nigerian internet reliability            | Delays deployment and testing | GitHub Pages provides reliable hosting; local development possible offline |
| GitHub Pages cache TTL (10 min)          | Repeat visitors redownload    | Accept as known limitation; Cloudflare CDN post-launch                     |

---

## 8. Version History

| Version | Date       | Changes                                                                                    |
| ------- | ---------- | ------------------------------------------------------------------------------------------ |
| 1.0.0   | 2026-06-29 | Initial Project Roadmap                                                                    |
| 1.1.0   | 2026-06-29 | Added Project Journey milestone, Domain Setup, Feature Backlog, Risk Factors, status icons |
| 2.0.0   | 2026-07-03 | Complete restructure — Phases 0-5 complete, 6-9 detailed, milestones achieved section      |
| 2.1.0   | 2026-07-03 | Phase 6 in progress, Phase 7-8 tasks refined, attachment naming added                      |
