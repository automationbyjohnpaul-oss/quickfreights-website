# 14 — MAINTENANCE GUIDE

## Quick Freights Global Limited Website

### Version 1.0

### Status: Production Baseline

### Last Updated: July 2026

---

# Purpose

This document defines the maintenance procedures for the Quick Freights Global Limited website.

Its purpose is to ensure that the website remains:

- Reliable
- Secure
- Accurate
- Fast
- Up-to-date
- Easy to maintain

This guide should be followed whenever content, code, branding, or infrastructure changes are introduced.

---

# Maintenance Philosophy

The website is treated as a living business asset rather than a one-time project.

Every update should improve one or more of the following:

- Customer experience
- Business conversion
- Performance
- Security
- Documentation
- Maintainability

No change should reduce overall quality.

---

# Maintenance Categories

Website maintenance falls into five areas:

1. Content
2. Technical
3. Performance
4. Security
5. Documentation

Each category has its own review schedule.

---

# Weekly Maintenance

Every week perform the following checks.

## Website Availability

Verify:

- Homepage loads correctly
- Navigation works
- Internal links function
- Cargo Portal opens
- Contact methods work

---

## Contact Channels

Confirm:

- Phone number is correct
- WhatsApp opens correctly
- Email address works
- Communication templates remain accurate

Because communication is centralized, changes should only be made inside:

```
communication.config.js
```

---

## Cargo Portal

Test:

- Online submission option
- WhatsApp submission option
- Email submission option
- Floating Customer Assistant

Ensure all customer journeys remain functional.

---

## Visual Inspection

Review:

- Images
- Icons
- Logo
- Hero section
- Mobile layout
- Tablet layout
- Desktop layout

Check for:

- Broken layouts
- Overflow
- Alignment issues
- Typography inconsistencies

---

# Monthly Maintenance

Perform a more comprehensive review.

## Lighthouse Audit

Run Google Lighthouse.

Target scores:

| Metric         | Target |
| -------------- | ------ |
| Performance    | 90+    |
| Accessibility  | 95+    |
| Best Practices | 95+    |
| SEO            | 95+    |

Investigate and resolve any significant regression.

---

## Link Validation

Verify:

- Internal links
- Navigation links
- Footer links
- WhatsApp links
- Email links
- Telephone links

Repair broken links immediately.

---

## SEO Review

Confirm:

- Page titles
- Meta descriptions
- Sitemap
- Robots.txt
- Canonical URLs

Review Google Search Console for crawl errors.

---

## Image Optimization

Review all newly added images.

Requirements:

- WebP format
- Appropriate dimensions
- Optimized file size
- Descriptive filenames
- Alt text

Avoid uploading oversized images.

---

# Quarterly Maintenance

Every three months perform a strategic review.

---

## Content Review

Update:

- Service descriptions
- Contact information
- Business hours
- Company achievements
- Industry changes

Remove outdated information.

---

## Design Review

Evaluate:

- User interface consistency
- Typography
- White space
- Mobile usability
- Conversion opportunities

Look for areas where customer experience can be improved.

---

## Performance Review

Check:

- Page load speed
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- JavaScript efficiency
- CSS efficiency

Refactor only where measurable improvements can be achieved.

---

## Documentation Review

Ensure project documentation reflects the current production state.

Update when necessary:

- Architecture
- Roadmap
- Design System
- Decision Log
- Changelog
- Deployment Guide

Documentation should always match the deployed version.

---

# Content Updates

Future content additions may include:

- Testimonials
- Case studies
- Service updates
- Blog articles
- News
- Industry insights

All new content should follow the Brand Guidelines and Design System.

---

# Communication Updates

Whenever any of the following changes:

- Phone number
- WhatsApp number
- Email address
- Business hours
- Message templates

Only update:

```
communication.config.js
```

Do not hard-code contact details into HTML or JavaScript files.

This maintains the project's single source of truth.

---

# Image Management

Store images inside:

```
images/
```

Guidelines:

- Use descriptive filenames
- Prefer WebP
- Compress before upload
- Maintain consistent quality
- Replace unused assets

Avoid duplicate image files.

---

# Version Control

Every maintenance update should:

- Use Git
- Include a descriptive commit message
- Be documented in the changelog if significant

Example:

```
fix: update office phone number

feat: add customs clearance guide

perf: optimize hero images

docs: update deployment guide
```

---

# Documentation Maintenance

Whenever significant work is completed, update:

- 06_Decision_Log.md
- 07_CHANGELOG.md

Update other documentation only if affected.

Avoid documentation drift.

---

# Backup Strategy

Maintain backups of:

- Source code
- Documentation
- Images
- Brand assets

The Git repository serves as the primary version history.

Consider maintaining an additional off-site backup for business continuity.

---

# GitHub Pages

After deployment:

Verify:

- Website loads correctly
- CSS loads
- JavaScript loads
- Images load
- Cargo Portal functions
- Floating Customer Assistant functions

Always test the live site—not only the local development environment.

---

# Before Every Release

Complete the following checklist.

- All pages tested
- Mobile tested
- Desktop tested
- Links verified
- Forms verified
- Cargo Portal tested
- WhatsApp templates verified
- Images optimized
- Lighthouse checked
- Documentation updated
- Changelog updated

Only then deploy.

---

# Annual Review

Once each year review:

- Brand positioning
- Website design
- Customer journey
- Service offerings
- SEO strategy
- Technology stack
- Documentation quality

This review should guide planning for the next major version.

---

# Future Maintenance (Version 2)

Planned activities include:

- Customer dashboard maintenance
- Database backups
- API monitoring
- User account management
- Shipment tracking maintenance
- Document storage management
- Analytics reporting
- CRM integration support

Maintenance responsibilities will expand as the platform evolves.

---

# Maintenance Principles

The Quick Freights platform follows these maintenance principles:

- Keep documentation current.
- Keep configuration centralized.
- Test before deployment.
- Maintain visual consistency.
- Prioritize customer experience.
- Improve continuously without unnecessary complexity.

Every maintenance task should leave the project in a better state than before.

---

# Version History

## Version 1.0

Initial maintenance guide created for the production release of the Quick Freights Global Limited website.

Future versions will expand maintenance procedures as new platform capabilities are introduced.
