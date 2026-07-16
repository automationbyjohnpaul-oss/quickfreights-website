# 08 — Release Notes

**Title:** QuickFreights Platform — Release Notes
**Document Version:** 1.0
**Status:** Active
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-07-03

---

## Document Relationships

### Parent Document

`00_Project_Blueprint.md`

### References

- `00A_Project_Journey.md` — Detailed progress log
- `07_Project_Roadmap.md` — Planned milestones

---

## Purpose

This document records each significant release of the QuickFreights Platform,
providing a concise history of what changed, why, and when.

It is intended for:

- Project stakeholders reviewing progress
- New contributors understanding the codebase history
- AI assistants needing context on when features were introduced

---

## Current Platform Status

**Current Platform Release:** v5.6

**Overall Progress:**

- ✅ Phases 1–5 Complete
- 🚧 Phase 6 (SEO & Content Enhancement)
- ⬜ Phase 7 (Visual Polish)
- ⬜ Phase 8 (Operational Testing)
- ⬜ Phase 9 (Production Launch)

**Platform Readiness:**

- Feature Complete: Yes
- Production Ready: Nearly Complete
- Remaining Work: SEO, launch validation, deployment

---

## Release History

---

### v5.6 — Documentation Synchronization & Design Tokens

**Date:** 2026-07-03
**Phase:** 5 Complete / 6 Begin

**Changes:**

- Source of Truth restructured: slogan added, design tokens aligned
- Roadmap updated: Phase 6 in progress, Phase 7-8 tasks refined
- Release Notes polished with platform status section
- CSS design tokens corrected (`--grey: #4B5563`, `--gold-dark: #B8860B`)
- AI review artifact removed from documentation
- Corporate slogan "Moving Cargo. Building Trust." formalized

**Files Changed:**

- `docs/04_Source_of_Truth.md`
- `docs/07_Project_Roadmap.md`
- `docs/08_Release_Notes.md`
- `apps/website/css/styles.css`

---

### v5.5 — Phase 5 Complete — Performance, UX & Visual Polish

**Date:** 2026-07-03
**Phase:** 5 Complete

**Changes:**

- Final hero visual refinements completed
- Stylesheet consolidated and cleaned
- Project Journey updated to reflect current progress
- Roadmap restructured to show completed and upcoming phases
- Frozen Brand Decisions added to Source of Truth
- Release Notes document created

**Files Changed:**

- `apps/website/css/styles.css`
- `docs/00A_Project_Journey.md`
- `docs/04_Source_of_Truth.md`
- `docs/07_Project_Roadmap.md`
- `docs/08_Release_Notes.md` (new)

---

### v5.4 — Hero Redesign & Brand Messaging

**Date:** 2026-07-03
**Phase:** 5

**Changes:**

- Hero section redesigned with left-aligned layout
- Cinematic left-to-right gradient overlay
- New hero typography hierarchy (welcome → company → subsidiary → headline → subtitle)
- "CLEARING THE WAY…" headline introduced
- "A Subsidiary of Bondex Bridge Multinational Terminal Limited" added
- Hero stats with backdrop-filter blur
- Brand messaging finalized and frozen

**Files Changed:**

- `apps/website/index.html`
- `apps/website/css/styles.css`

---

### v5.3 — Performance Fixes

**Date:** 2026-07-03
**Phase:** 5

**Changes:**

- Forced reflow in mobile menu fixed (setTimeout → transitionend)
- Diagnostic console.log removed from production code
- Page transition blink eliminated (inline navy background)
- Manifest link added to all pages
- OG image references corrected

**Files Changed:**

- `apps/website/js/script.js`
- `apps/website/index.html`
- `apps/website/track.html`
- `apps/website/about.html`
- `apps/website/services.html`
- `apps/website/contact.html`
- `apps/website/manifest.webmanifest` (new)

---

### v5.2 — UX Enhancements

**Date:** 2026-07-02
**Phase:** 5

**Changes:**

- Processing subtext element added to submission overlay
- `decoding="async"` added to all content images
- Favicon corrected (SVG with proper MIME type)

**Files Changed:**

- `apps/website/track.html`
- `apps/website/index.html`
- `apps/website/css/styles.css`

---

### v5.1 — Image Optimization & Lighthouse Improvements

**Date:** 2026-07-02
**Phase:** 5

**Changes:**

- All placeholder SVGs replaced with optimized WebP images
- CSS background-image references updated
- Lazy loading added to below-the-fold images
- Hero image preloaded with fetchpriority
- Old placeholder assets removed
- Lighthouse audit completed (Mobile: Perf 91%, A11y 94%, BP 100%, SEO 100%)

**Files Changed:**

- `apps/website/images/*` (14 files)
- `apps/website/css/styles.css`
- `apps/website/index.html`
- `apps/website/track.html`

---

### v5.0 — Accessibility Improvements

**Date:** 2026-07-01
**Phase:** 4 Complete / 5 Begin

**Changes:**

- Skip-to-main-content link added
- Semantic HTML verified across all pages
- ARIA labels on navigation, forms, and interactive elements
- Focus trap implemented in mobile menu
- Form validation with inline error messages
- Keyboard navigation tested
- Color contrast verified (navy/gold meets WCAG AA)

**Files Changed:**

- All HTML files
- `apps/website/js/script.js`
- `apps/website/css/styles.css`

---

### v4.0 — Integration Complete

**Date:** 2026-07-01
**Phase:** 4 Complete

**Changes:**

- Submission workflow fully operational end-to-end
- Google Apps Script backend deployed
- Form submission to Google Sheets operational
- File upload to Google Drive operational
- Tracking ID generation and display
- SMS notification via Payless Bulk SMS
- Duplicate B/L detection
- Processing overlay with timer
- Local storage "Remember Me" functionality
- Error handling and timeout messaging

**Files Changed:**

- `apps/website/js/script.js`
- `apps/website/track.html`
- Google Apps Script (external)

---

### v3.0 — Frontend Complete

**Date:** 2026-07-01
**Phase:** 3 Complete

**Changes:**

- 5-page website built (Home, About, Services, Contact, Submit B/L)
- CSS design system with CSS custom properties
- Mobile-first responsive layout
- Mobile off-canvas navigation
- All page templates with placeholder content
- Form UI with file upload styling

**Files Changed:**

- `apps/website/index.html`
- `apps/website/about.html`
- `apps/website/services.html`
- `apps/website/contact.html`
- `apps/website/track.html`
- `apps/website/css/styles.css`

---

### v2.0 — Platform Infrastructure

**Date:** 2026-06-30
**Phase:** 2 Complete

**Changes:**

- GitHub repository configured
- GitHub Pages deployment active
- Google Apps Script Web App created
- Google Sheets database established
- SMS integration configured (Payless Bulk SMS)
- File storage configured (Google Drive)

**Files Changed:**

- `.github/workflows/` (GitHub Actions)
- Google Apps Script (external)
- Google Sheets (external)

---

### v1.0 — Foundation & Planning

**Date:** 2026-06-29
**Phase:** 0-1 Complete

**Changes:**

- Project workspace created
- Git repository initialized
- Initial engineering documentation established
- Engineering Constitution approved
- Architecture designed
- Source of Truth established

**Files Changed:**

- `docs/00_Project_Blueprint.md`
- `docs/00A_Project_Journey.md`
- `docs/01_System_Architecture.md`
- `docs/02_Engineering_Constitution.md`
- `docs/03_AI_Engineering_Guide.md`
- `docs/04_Source_of_Truth.md`
- `docs/05_Coding_Standards.md`
- `docs/06_Decision_Log.md`
- `docs/07_Project_Roadmap.md`
- `docs/08_Glossary.md`

---

## Version Numbering Convention

| Component | Meaning                                                         | Example |
| --------- | --------------------------------------------------------------- | ------- |
| Major     | Completion of a project phase or significant platform milestone | v5.0    |
| Minor     | Enhancements, optimizations, or refinements within that phase   | v5.6    |

---

## Notes

- This document is updated with each significant release
- Detailed day-by-day progress is recorded in `00A_Project_Journey.md`
- Release notes focus on what changed, not how it was built
- Once the platform launches, new releases append at the top — past history is not reorganized
