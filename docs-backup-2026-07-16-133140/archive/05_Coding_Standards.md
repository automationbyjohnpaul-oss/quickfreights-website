# 05 — Coding Standards

**Title:** QuickFreights Platform — Coding Standards
**Version:** 1.1.0
**Status:** Approved with Enhancements
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`02_Engineering_Constitution.md`

### References

- `01_System_Architecture.md` — Module boundaries
- `04_Source_of_Truth.md` — Values referenced in code

---

## Authority

This document defines the coding standards for the QuickFreights Platform.
All code contributions SHALL conform to these standards.

Code that violates these standards SHALL be flagged during review and
corrected before merge.

---

## 1. Purpose

These standards exist to ensure that all code in the QuickFreights
Platform is consistent, readable, and maintainable — regardless of
who wrote it or which AI generated it.

---

## 2. General Principles

- Readability over cleverness.
- Consistency over personal preference.
- Explicit over implicit.
- Small functions over large functions.
- Clear names over short names.

---

## 3. Naming Conventions

### 3.1 Files

| Type             | Convention                     | Example                    |
| ---------------- | ------------------------------ | -------------------------- |
| HTML pages       | `lowercase-with-hyphens.html`  | `index.html`, `about.html` |
| CSS files        | `lowercase-with-hyphens.css`   | `styles.css`               |
| JavaScript files | `lowercase-with-hyphens.js`    | `script.js`                |
| Markdown docs    | `NN_Title_With_Underscores.md` | `00_Project_Blueprint.md`  |
| Images           | `lowercase-with-hyphens.webp`  | `hero-bg.webp`             |

### 3.2 CSS Classes

| Convention               | Example                        |
| ------------------------ | ------------------------------ |
| `lowercase-with-hyphens` | `.site-header`, `.btn-primary` |

### 3.3 JavaScript

| Type           | Convention                         | Example                                   |
| -------------- | ---------------------------------- | ----------------------------------------- |
| Variables      | `camelCase`                        | `trackingId`, `phoneNumber`               |
| Constants      | `UPPER_SNAKE_CASE`                 | `SMS_API_URL`, `MAX_FILE_SIZE`            |
| Functions      | `camelCase`                        | `generateTrackingId()`, `validatePhone()` |
| Event handlers | `camelCase` prefixed with `handle` | `handleFormSubmit()`                      |
| Initialization | `camelCase` prefixed with `init`   | `initMobileMenu()`                        |
| DOM elements   | IDs in `camelCase`                 | `submitBtn`, `customerName`               |

### 3.4 Google Apps Script

| Type        | Convention    | Example                 |
| ----------- | ------------- | ----------------------- |
| Functions   | `camelCase`   | `doPost()`, `sendSMS()` |
| Sheet names | `Pascal Case` | `Shipment Status`       |

### 3.5 JavaScript Formatting

- Use 2-space indentation.
- End statements with semicolons.
- Prefer `const` over `let`; use `let` only when reassignment is required.
- Avoid `var`.
- Prefer template literals over string concatenation.
- Use strict equality (`===` and `!==`).
- Limit line length to approximately 100 characters where practical.

### 3.6 Function Design

Functions SHALL:

- Have a single responsibility.
- Return predictable values.
- Avoid modifying global state.
- Be small enough to understand without scrolling where practical.
- Throw or return structured errors rather than silently failing.

---

## 4. HTML Standards

### Structure

- Use `<!DOCTYPE html>`.
- Include `lang="en"` on the `<html>` element.
- Include responsive viewport meta tag.
- Include descriptive `<meta name="description">`.
- Link CSS in `<head>`. Load JavaScript via `<script src>` before `</body>` unless `async` or `defer` is needed.

### Accessibility

- Every `<img>` SHALL have an `alt` attribute.
- Every `<a>` SHALL have descriptive text (no "click here").
- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<footer>`).
- Include a skip-to-content link.
- Form inputs SHALL have associated `<label>` elements.

### Forms

- Use `required` attribute for mandatory fields.
- Use `type="tel"` for phone inputs.
- Use `autocomplete` attributes where applicable.
- Each input SHALL have a visible label.

---

## 5. CSS Standards

### Organization

- Use CSS custom properties (variables) defined in `:root`.
- Follow mobile-first approach — base styles target mobile, media queries add desktop styles.
- Group related styles with section comments.

### Formatting

- One selector per line in multi-selector rules.
- One property per line.
- Space after colon in property declarations.
- Opening brace on the same line as selector.
- Closing brace on its own line.

### Example

```css
.btn-primary {
  background: var(--gold);
  color: var(--navy);
  border-color: var(--gold);
}
```
