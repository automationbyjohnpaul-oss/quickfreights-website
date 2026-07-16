# Quick Freights Global Limited

## Project Structure

Version: 1.0
Last Updated: July 2026
Status: Production (V1)

---

# Purpose

This document defines the official directory structure, naming conventions and file organization for the Quick Freights Global Limited project.

Maintaining a consistent project structure improves:

- Maintainability
- Scalability
- Developer onboarding
- Documentation
- Deployment
- Long-term project management

No new files or folders should be introduced without considering this structure.

---

# Repository Overview

```
QuickFreights-Platform/

├── apps/
├── docs/
├── .github/
├── README.md
└── LICENSE (future)
```

Each top-level directory has a single responsibility.

---

# Directory Responsibilities

## apps/

Contains production applications.

Current

```
apps/
└── website/
```

Future

```
apps/
├── website/
├── admin/
├── dashboard/
└── api/
```

---

## docs/

Contains all project documentation.

Documentation is version controlled alongside the codebase.

Examples

- Architecture
- Design
- Branding
- Roadmap
- Maintenance
- Deployment

Documentation should always evolve with the software.

---

## .github/

Contains GitHub configuration.

Examples

- GitHub Actions
- Deployment workflows
- Issue templates
- Pull request templates (future)

---

# Website Structure

```
website/

├── css/
├── js/
├── images/
├── icons/
├── index.html
├── about.html
├── services.html
├── contact.html
└── track.html
```

---

# CSS

```
css/

styles.css
```

Responsibilities

- Layout
- Components
- Utilities
- Responsive behaviour
- Animations

Future expansion

```
css/

base.css

components.css

utilities.css

pages.css
```

Only split files when complexity justifies it.

---

# JavaScript

```
js/

script.js

communication.config.js

floating-widget.js
```

Responsibilities

script.js

General website behaviour.

communication.config.js

Single Source of Truth for communication.

floating-widget.js

Floating Customer Assistant.

Future modules should follow this pattern.

Example

```
tracking.js

forms.js

dashboard.js

notifications.js
```

---

# Images

```
images/
```

Rules

Use WebP wherever possible.

Compress before upload.

Use descriptive filenames.

Example

```
hero.webp

cta-team.webp

services-customs.webp
```

Avoid filenames such as

```
image1.webp

photo2.webp

new-final-final.webp
```

---

# Icons

```
icons/
```

Contains

- SVG
- PNG
- Manifest icons
- Favicon

Preferred format

SVG

---

# HTML Pages

Current pages

```
index.html

about.html

services.html

contact.html

track.html
```

Naming convention

Lowercase

Hyphen-separated if multiple words

Examples

```
cargo-portal.html

privacy-policy.html

terms-of-service.html
```

---

# Documentation Structure

```
docs/

00_PROJECT_OVERVIEW.md

01_PROJECT_CHARTER.md

02_PROJECT_STRUCTURE.md

03_BRAND_GUIDELINES.md

04_DESIGN_SYSTEM.md

05_TECHNICAL_ARCHITECTURE.md

06_DECISION_LOG.md

07_CHANGELOG.md

08_DEPLOYMENT_GUIDE.md

09_TESTING_CHECKLIST.md

10_SEO_STRATEGY.md

11_COMMUNICATION_SYSTEM.md

12_PERFORMANCE_GUIDE.md

13_SECURITY_GUIDELINES.md

14_MAINTENANCE_GUIDE.md

15_ROADMAP.md
```

Documentation numbering should remain stable.

Avoid renumbering documents once published.

---

# Naming Conventions

Folders

Lowercase

Single responsibility

Examples

```
images

icons

css

js
```

---

Files

Use lowercase.

Separate words with hyphens.

Good

```
cargo-portal.html

communication.config.js

floating-widget.js
```

Avoid

```
CargoPortal.html

MyScript.js

New File.html
```

---

# CSS Naming

Use meaningful component names.

Examples

```
hero

hero-content

hero-image

btn-primary

service-card

credentials-bar

floating-widget
```

Avoid

```
box1

container2

left

right

style3
```

Component names should describe purpose rather than appearance.

---

# JavaScript Naming

Functions

camelCase

Examples

```
initNavigation()

initFloatingWidget()

validateForm()

buildWhatsAppUrl()
```

Variables

camelCase

Constants

UPPER_CASE when appropriate.

Configuration objects

PascalCase or project namespace.

Example

```
QF_COMMUNICATION
```

---

# Version Control

Commit messages should follow a consistent style.

Examples

```
feat: add floating customer assistant

fix: resolve mobile navigation issue

docs: update technical architecture

style: improve hero spacing

refactor: centralise communication templates
```

Avoid vague commit messages such as

```
update

changes

fix

new
```

---

# Asset Standards

Images

WebP

Icons

SVG

Fonts

Google Fonts (Inter)

Video

Future

MP4 (compressed)

PDF

Only when necessary.

---

# Configuration Files

Configuration belongs in dedicated files.

Current

```
communication.config.js
```

Future

```
tracking.config.js

api.config.js

analytics.config.js
```

Never duplicate configuration across multiple files.

---

# Future Expansion

The repository is designed to grow.

Planned additions

```
apps/admin/

apps/dashboard/

apps/mobile/

apps/api/

tests/

scripts/

assets/
```

The current structure should accommodate future development without major reorganisation.

---

# Project Standards

Every new file should satisfy these questions.

Does it belong in the correct folder?

Is the filename descriptive?

Does it duplicate existing functionality?

Can another developer immediately understand its purpose?

If the answer is "No", reconsider the implementation.

---

# Guiding Principle

A well-organised project is easier to understand, easier to maintain and easier to scale.

Every file should have one clear responsibility.

Every folder should have one clear purpose.

Consistency today prevents complexity tomorrow.
