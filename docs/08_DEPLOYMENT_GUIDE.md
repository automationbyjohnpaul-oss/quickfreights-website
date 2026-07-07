# 08_DEPLOYMENT_GUIDE.md

# Quick Freights Global Limited

## Deployment Guide

**Version:** 1.0
**Status:** Production (V1 Live)

---

# Purpose

This document explains how the Quick Freights Global Limited website is deployed, updated, maintained, and released into production.

It serves as the operational reference for future deployments.

---

# Current Production Environment

## Hosting

Platform:

- GitHub Pages

Repository:

```
automationbyjohnpaul-oss/quickfreights-website
```

Production URL:

```
https://automationbyjohnpaul-oss.github.io/quickfreights-website/
```

---

# Technology Stack

Frontend

- HTML5
- CSS3
- Vanilla JavaScript

Hosting

- GitHub Pages

Version Control

- Git
- GitHub

Deployment

- GitHub Actions

---

# Deployment Workflow

Development follows this sequence:

```
Edit Source Files
        │
        ▼
Local Testing
        │
        ▼
Git Commit
        │
        ▼
Push to GitHub
        │
        ▼
GitHub Actions
        │
        ▼
GitHub Pages
        │
        ▼
Production Website
```

---

# Standard Deployment Process

## Step 1

Make all required changes locally.

Typical files include:

- HTML
- CSS
- JavaScript
- Images
- Documentation

---

## Step 2

Test locally.

Verify:

- Navigation
- Mobile responsiveness
- Contact links
- WhatsApp templates
- Floating widget
- Hero layout
- Performance

---

## Step 3

Commit changes.

Example:

```
git add .

git commit -m "feat: improve homepage trust section"
```

Commit messages should follow conventional style:

```
feat:
fix:
docs:
refactor:
style:
perf:
```

---

## Step 4

Push changes.

```
git push origin main
```

---

## Step 5

GitHub automatically deploys the updated site.

No manual deployment is required.

---

# Production Checklist

Before every release verify:

✓ Homepage loads correctly

✓ Navigation works

✓ All internal links work

✓ Cargo Portal functions correctly

✓ WhatsApp opens correct template

✓ Email links work

✓ Phone links work

✓ Floating widget works

✓ Images load correctly

✓ Mobile layout verified

✓ No JavaScript console errors

---

# Browser Testing

Minimum browsers supported:

Desktop

- Chrome
- Microsoft Edge
- Firefox
- Safari

Mobile

- Chrome Android

- Safari iPhone

---

# Performance Verification

Run Lighthouse after major releases.

Target scores:

Performance

90+

Accessibility

95+

Best Practices

95+

SEO

95+

---

# SEO Verification

After deployment verify:

robots.txt

```
/robots.txt
```

Sitemap

```
/sitemap.xml
```

Canonical URLs

Meta descriptions

Open Graph tags

---

# Cache Considerations

Browsers may cache CSS and JavaScript.

If updates do not appear:

- Hard Refresh

or

```
Ctrl + Shift + R
```

If necessary:

Increase asset version number when introducing major CSS or JS updates.

---

# Rollback Procedure

If a deployment introduces problems:

1. Locate the previous stable Git commit.

2. Restore:

```
git checkout <commit>
```

or

```
git revert <commit>
```

3. Push to production.

```
git push origin main
```

GitHub Pages will automatically redeploy the previous stable version.

---

# Future Production Domain

Current

```
automationbyjohnpaul-oss.github.io
```

Planned

```
https://quickfreightsglobal.com
```

Future deployment tasks include:

- Configure DNS
- Add CNAME file
- Enable HTTPS
- Update canonical URLs
- Register with Google Search Console

---

# Release Policy

Version numbers follow:

```
Major.Minor.Patch
```

Examples

```
V1.0

V1.1

V1.2

V2.0
```

Major

Large feature releases.

Minor

New functionality.

Patch

Bug fixes and maintenance.

---

# Production Status

Current Release

```
Version 1.0
```

Status

Production

Hosting

GitHub Pages

Deployment

Automatic via GitHub Actions

Repository

Private development with public production deployment.

---

End of Deployment Guide.
