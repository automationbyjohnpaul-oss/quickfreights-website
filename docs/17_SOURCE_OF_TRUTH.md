# 17 — SOURCE OF TRUTH

## Quick Freights Global Limited Platform

### Version 1.0

### Status: Production Baseline

### Last Updated: July 2026

---

# Purpose

This document defines the authoritative ("single source of truth") location for every major component of the Quick Freights Global Limited Platform.

Every developer and AI assistant must consult this document before introducing new configuration, duplicate values, or additional files.

The objective is to ensure consistency, maintainability, and long-term scalability.

---

# Principle

Every important piece of information should exist in only one place.

If information must change in the future, it should be updated once and automatically reflected throughout the project.

Duplicate information creates maintenance problems and inconsistent behaviour.

---

# Website Configuration

Primary Location

```
apps/website/
```

Contains

- Website pages
- CSS
- JavaScript
- Images
- Icons
- SEO files
- Manifest
- Deployment assets

---

# Contact Information

Authoritative File

```
js/communication.config.js
```

Contains

- Company phone numbers
- WhatsApp number
- Email addresses
- Office address
- Business hours
- Social media links (future)

Never hardcode these values elsewhere.

---

# Communication Templates

Authoritative File

```
js/communication.config.js
```

Contains

WhatsApp Templates

- General enquiry
- Cargo portal
- Document submission
- Quote request
- Tracking enquiry
- Customer support

Email Templates

- Subjects
- Future email bodies

SMS Templates

- Operational notifications
- Tracking alerts

Operational Messages

- Internal workflow messages

Always add new templates here.

Never create message strings inside unrelated JavaScript files.

---

# Brand Identity

Primary Documentation

```
03_BRAND_GUIDELINES.md
```

Defines

- Brand mission
- Vision
- Tone
- Personality
- Messaging
- Logo usage
- Colour philosophy

---

# Design System

Primary Documentation

```
04_DESIGN_SYSTEM.md
```

Defines

Typography

Spacing

Grid

Buttons

Cards

Forms

Animations

Responsive behaviour

Accessibility

---

# Design Tokens

Authoritative File

```
css/styles.css
```

CSS Variables

Example

```
--navy

--gold

--white

--gray

--border

--shadow

--radius

--space
```

Never redefine these values elsewhere.

---

# Icons

Primary Location

```
icons/
```

Contains

Favicon

App Icons

PWA Icons

SVG Assets

Future icons should be added here.

---

# Images

Primary Location

```
images/
```

Contains

Hero image

CTA image

Service images

Company logo

Background graphics

Preferred Format

```
WebP
```

---

# Navigation

Primary Pages

```
index.html

about.html

services.html

contact.html

track.html
```

Navigation must remain consistent across every page.

When navigation changes, every page must be updated.

---

# Floating Customer Assistant

Authoritative File

```
js/floating-widget.js
```

Responsible For

Widget generation

Button behaviour

Context-aware links

Animations

Never duplicate widget HTML across pages.

---

# Website Behaviour

Authoritative File

```
js/script.js
```

Contains

Navigation

Animations

Interactive behaviour

Homepage logic

Page-specific functionality

General UI behaviour

Keep unrelated functionality modular.

---

# Cargo Portal Logic

Primary Page

```
track.html
```

Primary Script

```
script.js
```

Communication

```
communication.config.js
```

All document submission logic should originate here.

---

# SEO

Primary Documentation

```
10_SEO_STRATEGY.md
```

Implementation Files

```
robots.txt

sitemap.xml

manifest.webmanifest
```

Every SEO change should update both documentation and implementation.

---

# Performance

Primary Documentation

```
12_PERFORMANCE_GUIDE.md
```

Implementation

CSS

Images

Lazy loading

Preloads

Caching

Future performance improvements should follow this guide.

---

# Security

Primary Documentation

```
13_SECURITY_GUIDELINES.md
```

Defines

Security headers

External links

Privacy

Data handling

Safe JavaScript practices

---

# Maintenance

Primary Documentation

```
14_MAINTENANCE_GUIDE.md
```

Defines

Routine maintenance

Version upgrades

Image optimization

Dependency review

Content updates

---

# Testing

Primary Documentation

```
09_TESTING_CHECKLIST.md
```

Defines

Browser testing

Responsive testing

Accessibility testing

Performance testing

Regression testing

---

# Technical Architecture

Primary Documentation

```
05_TECHNICAL_ARCHITECTURE.md
```

Defines

Application structure

Folder hierarchy

JavaScript architecture

Configuration strategy

Deployment architecture

---

# Project Decisions

Authoritative File

```
06_DECISION_LOG.md
```

Every significant architectural decision must be recorded here.

Never overwrite history.

Append new decisions.

---

# Version History

Authoritative File

```
07_CHANGELOG.md
```

Every production release should update this document.

---

# Roadmap

Authoritative File

```
15_ROADMAP.md
```

Defines

Completed milestones

Current version

Future versions

Feature pipeline

---

# AI Development Standards

Authoritative File

```
16_AI_DEVELOPMENT_GUIDE.md
```

Defines

AI working rules

Coding philosophy

Documentation standards

Quality expectations

---

# Project Overview

Authoritative File

```
00_PROJECT_OVERVIEW.md
```

Provides the executive summary of the project.

---

# Project Charter

Authoritative File

```
01_PROJECT_CHARTER.md
```

Defines

Scope

Objectives

Stakeholders

Success criteria

---

# Folder Structure

Authoritative File

```
02_PROJECT_STRUCTURE.md
```

Documents the current directory hierarchy.

---

# Future Backend

Reserved Location

```
apps/api/
```

Not yet implemented.

Future responsibilities

Authentication

Customer Portal

Tracking

Document Storage

CRM

---

# Future Database

Reserved

No database currently exists.

Future database documentation should become its own source of truth.

---

# Future Environment Variables

Reserved

Future configuration values should never be hardcoded.

Examples

API Keys

SMTP

Analytics

Cloud Storage

Authentication Secrets

---

# Update Rules

Whenever new functionality is introduced:

Identify whether a source of truth already exists.

If it does:

Update the existing source.

Do not create another.

If it does not:

Create a single authoritative source.

Document it here.

---

# Source of Truth Checklist

Before creating any new file ask:

✓ Does this information already exist elsewhere?

✓ Can it be centralized?

✓ Will future updates require changing more than one file?

✓ Can another developer easily discover where this information belongs?

If the answer to the last two questions is "No", the architecture should be reconsidered.

---

# Version History

## Version 1.0

Created after successful completion of Version 1 of the Quick Freights Global Limited Platform.

Establishes the authoritative location for all configuration, documentation, assets, and architectural decisions.
