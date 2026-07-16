Here is the updated `README.md` with all the suggested improvements applied:

```markdown
# Quick Freights Global Limited Platform

> Premium corporate website and logistics management platform for **Quick Freights Global Limited**, a Nigerian Clearing, Forwarding and Logistics company.

---

## Project Status

| Item             | Status                            |
| ---------------- | --------------------------------- |
| Frontend Version | V1.0 Production                   |
| Backend Version  | V2.0 Production (v8.1)            |
| Website          | ✅ Live                           |
| Backend          | ✅ Production                     |
| Platform         | GitHub Pages + Google Apps Script |
| Status           | Active                            |
| Documentation    | ✅ Complete                       |

---

## Overview

The Quick Freights Global Limited Platform is the company's official digital operations system designed to:

- Build customer trust
- Showcase professional clearing and forwarding services
- Enable online document submission
- Generate tracking IDs
- Store shipment records
- Send automated SMS notifications
- Prepare the business for future digital transformation

The platform follows a premium, customer-first design philosophy focused on trust, simplicity, and conversion.

---

## Project Philosophy

The Quick Freights Platform is developed using a documentation-driven engineering approach.

Core principles include:

- Single Source of Truth (SSOT)
- Modular architecture
- AI-assisted development
- Documentation before implementation
- Production-first engineering
- Performance-first optimization
- Long-term maintainability

---

## Key Features

### Corporate Website

- Professional homepage
- About page
- Services page
- Contact page
- Cargo Portal

### Cargo Portal

Customers can:

- Submit cargo documents
- Upload supporting files (PDF, JPG, PNG)
- Receive a Tracking ID
- Receive SMS confirmation
- Contact support

### Submission Overlay

- Event-driven stage progression
- Gradient progress bar
- Rotating reassurance messages
- Elapsed timer
- Success animation
- Accessibility support

### Communication System

Centralised communication architecture providing:

- WhatsApp integration
- Email integration
- Telephone integration
- SMS notifications
- Frozen communication templates
- Context-aware customer messaging

### Backend

- Modular Google Apps Script architecture (17 modules)
- Single Source of Truth (SSOT)
- Google Sheets persistence
- Google Drive attachment storage
- SMS notification infrastructure
- Notification queue
- Parallel SMS delivery
- Performance instrumentation
- Comprehensive logging

---

## Architecture
```

GitHub Pages
│
▼
Google Apps Script
│
┌──────┼─────────────┐
▼ ▼ ▼
Sheets Drive Payless SMS

```

The platform follows a lightweight hybrid architecture designed to minimize infrastructure complexity while remaining scalable for future expansion.

---

## Technology Stack

### Frontend

- HTML5
- CSS3 (Custom Design System)
- Vanilla JavaScript (ES6)

### Backend

- Google Apps Script
- Google Sheets
- Google Drive
- Payless Bulk SMS

### Development

- VS Code
- Git / GitHub
- clasp CLI

### Deployment

- GitHub Pages (Frontend)
- clasp (Backend)

---

## Project Structure

```

QuickFreights-Platform/
├── apps/
│ └── website/
│ ├── css/
│ ├── js/
│ ├── images/
│ ├── icons/
│ ├── index.html
│ ├── about.html
│ ├── services.html
│ ├── contact.html
│ └── track.html
├── apps-script/
│ ├── Config.gs
│ ├── Main.gs
│ ├── Validation.gs
│ ├── Tracking.gs
│ ├── Sheets.gs
│ ├── Drive.gs
│ ├── SMS.gs
│ ├── Status.gs
│ ├── Spreadsheet.gs
│ ├── Utilities.gs
│ ├── Logger.gs
│ ├── Performance.gs
│ ├── Triggers.gs
│ ├── Notifications.gs
│ ├── Reports.gs
│ └── test.gs
├── docs/
│ ├── 00_PROJECT_OVERVIEW.md
│ ├── 01_PROJECT_CHARTER.md
│ ├── 02_PROJECT_STRUCTURE.md
│ ├── 03_BRAND_GUIDELINES.md
│ ├── 04_DESIGN_SYSTEM.md
│ ├── 05_TECHNICAL_ARCHITECTURE.md
│ ├── 06_DECISION_LOG.md
│ ├── 07_CHANGELOG.md
│ ├── 08_DEPLOYMENT_GUIDE.md
│ ├── 09_TESTING_CHECKLIST.md
│ ├── 10_SEO_STRATEGY.md
│ ├── 11_COMMUNICATION_SYSTEM.md
│ ├── 12_PERFORMANCE_GUIDE.md
│ ├── 13_SECURITY_GUIDELINES.md
│ ├── 14_MAINTENANCE_GUIDE.md
│ ├── 15_ROADMAP.md
│ ├── 16_AI_DEVELOPMENT_GUIDE.md
│ ├── 17_SOURCE_OF_TRUTH.md
│ ├── 18_AI_CONTEXT.md
│ ├── 19_PROMPT_LIBRARY.md
│ ├── 20_PROJECT_HISTORY.md
│ ├── 21_AI_SESSION_STARTER.md
│ ├── 22_V1_FINAL_STATE.md
│ ├── 23_HANDOVER_V1.md
│ ├── 24_BACKEND_SOURCE_OF_TRUTH.md
│ ├── 25_BACKEND_ENGINEERING_HISTORY.md
│ ├── 26_BACKEND_CERTIFICATION.md
│ ├── 27_MODULE_RESPONSIBILITIES.md
│ ├── 28_V2_BACKEND_BASELINE.md
│ ├── 29_OPERATIONS_RUNBOOK.md
│ ├── 30_RELEASE_NOTES_V2.md
│ └── 31_V3_ROADMAP.md
└── README.md

````

---

## Documentation

The project documentation is organised into dedicated guides.

| Document | Purpose |
|----------|---------|
| Project Overview | Executive overview |
| Project Charter | Business objectives |
| Project Structure | Repository organisation |
| Brand Guidelines | Visual identity |
| Design System | UI components and standards |
| Technical Architecture | System architecture |
| Decision Log | Major project decisions |
| Changelog | Version history |
| Deployment Guide | Deployment procedures |
| Testing Checklist | QA process |
| SEO Strategy | Search optimisation |
| Communication System | Contact and messaging architecture |
| Performance Guide | Performance optimisation |
| Security Guidelines | Security practices |
| Maintenance Guide | Operational maintenance |
| Roadmap | Future development |

---

## Where to Start

For new contributors:

1. `README.md`
2. `22_V1_FINAL_STATE.md`
3. `24_BACKEND_SOURCE_OF_TRUTH.md`
4. `05_TECHNICAL_ARCHITECTURE.md`
5. `27_MODULE_RESPONSIBILITIES.md`

These documents define the current production baseline and architectural rules.

---

## Production Baseline

Current production baseline:

- Frontend: V1.0 (Frozen)
- Backend: V2.0 (Frozen)
- Architecture: SSOT
- Modules: 17
- Documentation: Complete

Future development should prioritize new business functionality rather than architectural redesign unless required by security, platform changes, or verified performance issues.

---

## Version History

### V1.0 — Frontend Production

**Date:** July 1, 2026

**Major achievements:**
- Premium corporate website
- Cargo Portal
- Communication configuration system
- Floating Customer Assistant
- Responsive design
- SEO foundations
- Performance optimisation
- GitHub Pages deployment

### V2.0 — Backend Production

**Date:** July 15, 2026

**Major achievements:**
- Modular Google Apps Script backend (17 modules)
- SSOT architecture
- Google Sheets database
- Google Drive attachment storage
- SMS notifications
- Performance instrumentation
- Production deployment workflow
- Comprehensive backend documentation

---

## Future Roadmap

### Customer Features

- Shipment Tracking Portal
- Shipment Status Timeline
- Customer Notifications

### Operations

- Admin Dashboard
- Shipment Management
- Status Updates

### Intelligence

- Analytics Dashboard
- Operational Reporting
- Business Metrics

---

## Development Setup

### Prerequisites

- VS Code
- clasp CLI
- Git
- Node.js (for clasp)

### Clone Repository

```bash
git clone https://github.com/automationbyjohnpaul-oss/quickfreights-website.git
cd quickfreights-website
````

### Backend Development

```bash
cd apps-script
clasp login
clasp pull
# Make changes
clasp push
clasp version "vX.X"
clasp deploy
```

### Frontend Development

```bash
cd apps/website
# Edit files locally
# Commit and push to GitHub
git add .
git commit -m "Description"
git push
```

---

## Repository Rules

- Develop locally using VS Code
- Version control through Git
- Deploy backend with clasp
- Never duplicate configuration
- Preserve SSOT principles
- Update documentation alongside architectural changes

---

## License

Copyright © Quick Freights Global Limited.

This repository contains proprietary software and documentation intended for the Quick Freights Platform. Redistribution or reuse is subject to the company's authorization.

---

## Maintainer

**Quick Freights Global Limited**

RC: 8106184

The Quick Freights Platform is an actively maintained logistics platform built using modern documentation-driven engineering practices. The project combines a lightweight static frontend with a modular cloud backend to provide a scalable foundation for future customer self-service and operational automation.

**Documentation Version:** 2.0

**Last Updated:** July 2026

```

---

## Summary of Changes

| Change | Description |
|--------|-------------|
| **Project Philosophy** | New section |
| **Cargo Portal Features** | Updated to avoid overstating tracking functionality |
| **Backend Section** | Expanded to reflect V2 |
| **Architecture Snapshot** | New section with diagram |
| **Production Baseline** | New section |
| **Future Roadmap** | Grouped into categories |
| **Where to Start** | New section for new contributors |
| **Repository Rules** | New section |
| **License** | Added proprietary notice |
| **Maintainer** | Strengthened closing section |
```
