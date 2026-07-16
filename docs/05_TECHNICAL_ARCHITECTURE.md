Here is the updated `05_TECHNICAL_ARCHITECTURE.md` with all the suggested improvements applied:

```markdown
# 05 — TECHNICAL ARCHITECTURE

## Quick Freights Global Limited Platform

**Document Version:** 3.0
**Last Updated:** July 2026
**Status:** Production (V2)

---

## Purpose

This document describes the technical architecture of the Quick Freights Global Limited Platform.

It serves as the reference for developers, maintainers and future contributors by documenting how the platform is structured, how components interact, and how future enhancements should be integrated.

---

## Architecture Overview

The platform follows a **hybrid architecture**:

- **Frontend**: Static website hosted on GitHub Pages
- **Backend**: Google Apps Script modular backend
- **Database**: Google Sheets
- **Storage**: Google Drive
- **SMS**: Payless Bulk SMS

This architecture was chosen for:

- Cost-effectiveness (free tiers)
- Simplicity
- Reliability
- Maintainability
- Future scalability
- AI-assisted maintainability
- Documentation-driven engineering

---

## High-Level Architecture
```

┌─────────────────────────────────────────────────────────────────┐
│ Internet │
│ │ │
│ ▼ │
│ ┌─────────────────────────┐ │
│ │ GitHub Pages Hosting │ │
│ │ (Static Frontend) │ │
│ └─────────────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────┐ │
│ │ Google Apps Script │ │
│ │ (Backend API) │ │
│ └─────────────────────────┘ │
│ │ │
│ ┌─────────────────┼─────────────────┐ │
│ ▼ ▼ ▼ │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ Google │ │ Google │ │ Payless │ │
│ │ Sheets │ │ Drive │ │ Bulk SMS │ │
│ │ (Database) │ │ (Storage) │ │ (SMS) │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘

```

---

## Frontend Architecture

### Technology Stack

| Layer | Technology |
|-------|------------|
| HTML | HTML5 |
| CSS | Custom Design System (CSS Variables) |
| JavaScript | Vanilla (no frameworks) |
| Hosting | GitHub Pages |
| Fonts | Google Fonts (Inter) |
| Images | WebP format |

### Pages

| Page | Purpose |
|------|---------|
| index.html | Homepage |
| about.html | Company story & values |
| services.html | Service categories |
| track.html | Cargo Portal with submission overlay |
| contact.html | Contact methods & office locations |

### JavaScript Modules

| File | Responsibility |
|------|----------------|
| script.js | Navigation, form handling, overlay, submission |
| communication.config.js | Centralized contact configuration |
| floating-widget.js | Dynamic floating contact widget |

### CSS Architecture

- Mobile-first responsive design
- CSS custom properties (design tokens)
- Component-based styling
- Premium corporate design language

### Submission Overlay

- Event-driven stage progression
- Gradient progress bar (never hits 100%)
- Rotating reassurance messages
- Elapsed timer
- Success animation
- ESC blocked during processing
- Reduced motion support

---

## Backend Architecture

### Technology Stack

| Layer | Technology |
|-------|------------|
| Runtime | Google Apps Script |
| Database | Google Sheets |
| Storage | Google Drive |
| SMS | Payless Bulk SMS |
| Deployment | clasp CLI |
| Version Control | Git / GitHub |

### Module Architecture

The backend follows a **modular Single Source of Truth (SSOT)** architecture.

Each backend module has a clearly defined responsibility, with infrastructure isolated from business logic. Shared configuration is centralized in `Config.gs`, while infrastructure access is abstracted through dedicated gateway modules.

This design minimizes duplication, improves maintainability, and enables efficient AI-assisted debugging and future feature development.

```

┌─────────────────────────────────────────────────────────────┐
│ Presentation Layer │
│ Main.gs │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ Business Layer │
│ ┌─────────────┐ ┌────────────┐ ┌───────────┐ ┌────────┐ │
│ │Validation.gs│ │Tracking.gs │ │ Drive.gs │ │SMS.gs │ │
│ └─────────────┘ └────────────┘ └───────────┘ └────────┘ │
│ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│ │ Status.gs │ │ Triggers.gs │ │Performance│ │
│ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ Infrastructure Layer │
│ ┌───────────────┐ ┌───────────┐ ┌───────────┐ ┌────────┐ │
│ │Spreadsheet.gs │ │Sheets.gs │ │Utilities │ │Logger │ │
│ └───────────────┘ └───────────┘ └───────────┘ └────────┘ │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│ Configuration Layer │
│ Config.gs │
└─────────────────────────────────────────────────────────────┘

```

### Module Inventory (17 Modules)

| Module | Version | Responsibility |
|--------|---------|----------------|
| Config.gs | v8.1 | SSOT configuration |
| Spreadsheet.gs | v2.0 | Spreadsheet gateway |
| Utilities.gs | v1.1 | Generic helpers |
| Logger.gs | v1.1 | Application logging |
| Validation.gs | v7.0 | Input validation |
| Tracking.gs | v7.0 | Tracking ID generation |
| Sheets.gs | v7.3 | Sheet CRUD operations |
| Drive.gs | v7.0 | Google Drive operations |
| SMS.gs | v8.2 | SMS sending and logging |
| Status.gs | v1.1 | Shipment workflow |
| Triggers.gs | v1.0 | Apps Script triggers |
| Performance.gs | v1.0 | Performance instrumentation |
| Main.gs | v8.2 | API entry point |
| Notifications.gs | v1.0 | Notification placeholder |
| Reports.gs | v1.0 | Reports placeholder |
| test.gs | v1.0 | Test functions |

---

## Backend Processing Pipeline

A typical submission follows this sequence:

1. Receive request (`Main.gs`)
2. Validate payload (`Validation.gs`)
3. Generate Tracking ID (`Tracking.gs`)
4. Upload attachment (`Drive.gs`)
5. Persist submission (`Sheets.gs`)
6. Create shipment status record (`Status.gs`)
7. Queue notifications
8. Return success response
9. Process SMS asynchronously

This workflow minimizes the time before the user receives confirmation while allowing slower operations to continue outside the critical request path.

---

## Data Flow

### Submission Flow

```

Customer
│
▼
track.html
│
▼
script.js (fetch)
│
▼
Google Apps Script (doPost)
│
├── Validation.gs (validate)
├── Tracking.gs (generate ID)
├── Drive.gs (upload attachment)
├── Sheets.gs (save to sheets)
├── Status.gs (create status record)
└── Performance.gs (timing)
│
▼
Success Response

```

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

## Communication Architecture

```

User
│
▼
Floating Widget
│
▼
communication.config.js
│
├── WhatsApp (wa.me links)
├── Email (mailto links)
└── Telephone (tel links)

```

No communication details should exist outside the configuration.

---

## User Journey Architecture

Typical customer flow:

```

Homepage
│
▼
Cargo Portal
│
▼
Choose Submission Method
│
▼
Document Submission
│
▼
Processing Overlay
│
▼
Tracking ID Displayed
│
▼
SMS Confirmation
│
▼
Cargo Processing

```

---

## Responsive Architecture

The website follows a mobile-first approach.

**Breakpoints:**

| Breakpoint | Width |
|------------|-------|
| Desktop | 1200px+ |
| Laptop | 992px–1199px |
| Tablet | 768px–991px |
| Mobile | 576px–767px |
| Small Mobile | Below 576px |

---

## Performance Architecture

### Frontend Optimizations

- Compressed WebP images
- Optimized font loading (preload + swap)
- Lightweight JavaScript (vanilla)
- Minimal dependencies
- Responsive images
- Lazy loading for below-the-fold images

### Backend Optimizations

- Modular SSOT architecture
- Centralized configuration
- Infrastructure isolation
- Performance instrumentation
- Notification queue
- Parallel SMS delivery
- Reduced synchronous processing
- Comprehensive error handling
- Request-scoped timing analysis

### Target Lighthouse Scores

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 95+ |

---

## Performance Characteristics

Performance instrumentation introduced during Backend V2 demonstrated that:

- Application logic executes efficiently.
- Google Apps Script runtime contributes significantly to total request latency.
- Google Drive operations vary depending on attachment size.
- External SMS processing is isolated from the critical submission path through the notification queue.

Future optimization should be guided by measured performance data rather than assumptions.

---

## Security Architecture

### Current

- Static website (no server-side processing)
- No customer authentication
- HTTPS via GitHub Pages
- Input validation (frontend + backend)
- Secure attachments (Google Drive permissions)
- Script Properties used for sensitive configuration
- Single Source of Truth prevents configuration duplication
- Infrastructure access isolated through gateway modules

### Future

- Customer authentication
- Role-based access control
- Secure document storage
- API authentication
- Audit logging

---

## Deployment Architecture

```

Developer
│
▼
VS Code
│
▼
Git
│
▼
GitHub Repository
│
├── GitHub Actions → GitHub Pages (Frontend)
└── clasp → Apps Script (Backend)
│
▼
Production Platform

````

### Frontend Deployment

Automatic via GitHub Actions when pushing to main branch.

### Backend Deployment

Manual via clasp:

```bash
clasp push
clasp version "vX.X"
clasp deploy
````

---

## Production Release Process

Every production release follows the same workflow:

1. Development in VS Code
2. Local testing
3. Git commit and push
4. `clasp push`
5. Create Apps Script version
6. Deploy production version
7. Verify production deployment
8. Update project documentation

Documentation updates are considered part of every production release.

---

## Architecture Status

The Backend V2 architecture is considered frozen.

Future development should prioritize business functionality rather than infrastructure redesign unless changes are required to address:

- Critical defects
- Security issues
- Verified performance regressions
- Platform compatibility changes

This policy preserves the stability of the production baseline while allowing controlled evolution of the platform.

---

## Future Architecture (V3)

Planned additions:

- Customer Tracking Page
- Shipment Status Lookup
- Admin Operations Interface
- Status Update Workflow
- Automated Status-change SMS
- Analytics Dashboard

These systems will integrate without requiring a redesign of the current architecture.

---

## Architecture Summary

The Quick Freights Platform combines a lightweight static frontend with a modular cloud backend built on Google Apps Script.

The architecture emphasizes:

- Simplicity
- Maintainability
- Single Source of Truth
- Clear module ownership
- AI-assisted development
- Documentation-driven engineering
- Production stability

This architecture forms the approved foundation for all future platform enhancements.

---

## Architectural Principles

The platform follows these principles:

- Separation of concerns
- Single source of truth
- Reusable components
- Progressive enhancement
- Mobile-first design
- Performance-first implementation
- Accessibility by default
- Maintainability over complexity
- Infrastructure isolation
- Modular design

---

## Guiding Principle

The Quick Freights platform is more than a website.

It is the foundation of a future digital logistics platform.

All architectural decisions should prioritize scalability, maintainability and customer experience while preserving the simplicity and performance achieved in V1 and V2.

---

**Document Status:** Active (V3.0)

```

---

## Summary of Changes

| Change | Description |
|--------|-------------|
| **Architecture Overview** | Added AI-assisted maintainability and documentation-driven engineering |
| **Backend Architecture Description** | Expanded with module responsibility and SSOT explanation |
| **Backend Processing Pipeline** | New section showing submission sequence |
| **SMS Flow** | Updated to reflect notification queue and parallel sending |
| **Backend Optimizations** | Replaced with comprehensive list |
| **Performance Characteristics** | New section capturing V2 findings |
| **Security Architecture** | Added SSOT and infrastructure isolation items |
| **Production Release Process** | New section reinforcing documentation-first approach |
| **Architecture Status** | New section documenting freeze policy |
| **Architecture Summary** | New closing section |
```
