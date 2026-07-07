# 09 — TESTING CHECKLIST

## Quick Freights Global Limited Website

### Version 1.0

### Status: Production Baseline

### Last Updated: July 2026

---

# Purpose

This document defines the testing procedures used to verify that the Quick Freights Global Limited website functions correctly before deployment.

Testing is divided into:

- Functional Testing
- User Interface Testing
- Responsive Testing
- Accessibility Testing
- Performance Testing
- Browser Compatibility
- Deployment Verification

A release should not be considered production-ready unless all critical tests pass.

---

# 1. Functional Testing

## Navigation

| Test                          | Status |
| ----------------------------- | ------ |
| Logo returns to Home          | □      |
| Home navigation works         | □      |
| About navigation works        | □      |
| Services navigation works     | □      |
| Cargo Portal navigation works | □      |
| Contact navigation works      | □      |
| Footer links work correctly   | □      |

---

## Hero Section

| Test                                      | Status |
| ----------------------------------------- | ------ |
| Hero image loads                          | □      |
| Hero headline visible                     | □      |
| Cargo Portal button works                 | □      |
| Our Services button works                 | □      |
| Credentials Bar visible without scrolling | □      |

---

## Cargo Portal

### Portal Selection

| Test                             | Status |
| -------------------------------- | ------ |
| Online Submission option works   | □      |
| WhatsApp Submission option works | □      |

### Online Form

| Test                      | Status |
| ------------------------- | ------ |
| Required validation works | □      |
| File upload works         | □      |
| Success message displays  | □      |

### WhatsApp

| Test                   | Status |
| ---------------------- | ------ |
| Opens WhatsApp         | □      |
| Loads correct template | □      |
| Formatting preserved   | □      |
| Opens new tab          | □      |

---

## Floating Customer Assistant

| Test                  | Status |
| --------------------- | ------ |
| Widget visible        | □      |
| Opens menu            | □      |
| Closes correctly      | □      |
| WhatsApp button works | □      |
| Track Shipment works  | □      |
| Call button works     | □      |
| Email button works    | □      |

---

# Contact Page

| Test                     | Status |
| ------------------------ | ------ |
| Contact form loads       | □      |
| Phone link works         | □      |
| Email link works         | □      |
| Office address displayed | □      |
| Business hours visible   | □      |

---

# User Interface Testing

## Visual Consistency

Verify:

□ Brand colours are consistent

□ Typography is consistent

□ Buttons use correct styling

□ Card spacing is consistent

□ Icons display correctly

□ Images are optimized

□ No layout shifts

□ No overlapping elements

---

## Credentials Bar

Confirm:

□ Four cards display correctly

□ Icons aligned

□ Equal spacing

□ Responsive on mobile

---

## How It Works Section

Verify:

□ Four steps visible

□ Icons aligned

□ Proper spacing

□ Responsive layout

---

# Responsive Testing

Test on:

## Desktop

Resolution:

□ 1920×1080

□ 1600×900

□ 1366×768

---

## Tablet

□ iPad

□ Surface

---

## Mobile

□ 430px

□ 390px

□ 375px

□ 360px

---

Verify:

□ Navigation works

□ Hero scales properly

□ Credentials Bar readable

□ Cards stack correctly

□ Buttons usable

□ Floating widget accessible

---

# Accessibility Testing

Verify:

□ Keyboard navigation

□ Visible focus states

□ Semantic headings

□ Proper labels

□ ARIA attributes

□ Alt text on images

□ Colour contrast passes WCAG AA

---

# Performance Testing

Target Lighthouse Scores

| Metric         | Target |
| -------------- | ------ |
| Performance    | 90+    |
| Accessibility  | 95+    |
| Best Practices | 95+    |
| SEO            | 95+    |

---

Verify:

□ Hero image preloaded

□ Images are WebP

□ Lazy loading enabled

□ Google Fonts optimized

□ CSS minified (production)

□ JavaScript loads correctly

---

# Browser Compatibility

Test:

□ Chrome

□ Edge

□ Firefox

□ Safari

Latest stable versions only.

---

# SEO Testing

Verify:

□ Page titles

□ Meta descriptions

□ Canonical URLs

□ robots.txt

□ sitemap.xml

□ Open Graph tags

□ Favicon

□ Manifest

---

# Deployment Verification

After deployment:

□ Website loads over HTTPS

□ No console errors

□ No broken links

□ All assets load

□ GitHub Pages deployment successful

□ Mobile rendering verified

---

# Regression Testing

Whenever a feature is modified, verify:

□ Homepage

□ Cargo Portal

□ Floating Widget

□ Navigation

□ Communication templates

□ Contact page

---

# Production Acceptance Checklist

The website is considered production-ready when:

☐ All functional tests pass

☐ Responsive tests pass

☐ Accessibility requirements met

☐ Lighthouse targets achieved

☐ Communication templates verified

☐ No JavaScript errors

☐ No broken links

☐ Deployment successful

---

# Version History

## Version 1.0

Initial production testing checklist for the Version 1 website.

Future versions should append additional testing requirements rather than replacing this baseline.
