40 — FRONTEND ICON STANDARD

## Quick Freights Global Limited Platform

**Icon Library Version:** 1.0.0
**Design System Version:** 1.0.0
**Status:** Specification Frozen – Assets Pending
**Last Updated:** July 2026
**Compatible With:** Frontend V1 / Backend V8.1

---

## Purpose

This document is the **Single Source of Truth** for all icons used across the Quick Freights platform.
It defines the policy, naming, usage, and governance. Actual SVG assets live in `assets/icons/` and must conform to this specification.

---

## Design Philosophy

Icons must:

- communicate instantly
- reinforce trust
- reduce cognitive load
- never compete with content
- always support accessibility
- remain visually consistent

---

## Versioning

| Property              | Value                             |
| --------------------- | --------------------------------- |
| Icon Library Version  | 1.0.0                             |
| Design System Version | 1.0.0                             |
| Frozen Date           | July 2026                         |
| Next Review           | After operational feedback period |

---

## Naming Convention

- lowercase only
- hyphen-separated words
- singular form
- `.svg` extension

| ✅ Correct        | ❌ Incorrect     |
| ----------------- | ---------------- |
| `truck.svg`       | `Truck.svg`      |
| `warehouse.svg`   | `truckIcon.svg`  |
| `cargo.svg`       | `Truck Icon.svg` |
| `bl-document.svg` | `BLDocument.svg` |

---

## Categories

### Core UI

| Icon   | Use               |
| ------ | ----------------- |
| search | Search / find     |
| arrow  | Navigation / CTA  |
| plus   | Add / expand      |
| minus  | Remove / collapse |
| menu   | Navigation menu   |
| close  | Close / dismiss   |

### Forms

| Icon     | Use                |
| -------- | ------------------ |
| calendar | Date fields        |
| phone    | Phone fields       |
| email    | Email fields       |
| user     | Person / consignee |
| document | Generic document   |
| pin      | Location / address |
| upload   | File upload        |
| download | File download      |

### Logistics (Business Domain)

| Icon        | Use                     |
| ----------- | ----------------------- |
| tracking    | Shipment tracking       |
| container   | Shipping container      |
| ship        | Vessel / sea freight    |
| truck       | Road transport          |
| warehouse   | Storage / distribution  |
| cargo       | General cargo           |
| bl-document | Bill of Lading document |
| customs     | Customs clearance       |
| port        | Port / terminal         |

### Status

| Icon    | Use                 |
| ------- | ------------------- |
| success | Success messages    |
| error   | Error messages      |
| warning | Warning messages    |
| info    | Informational notes |

### Security

| Icon   | Use                   |
| ------ | --------------------- |
| lock   | Security / privacy    |
| shield | Protection / verified |

### Brand

| Icon        | Use                  |
| ----------- | -------------------- |
| favicon     | Browser tab icon     |
| whatsapp    | WhatsApp contact     |
| trust-check | Trust bar checkmarks |

### Communication

| Icon    | Use            |
| ------- | -------------- |
| chat    | Live chat      |
| support | Help / support |

### Navigation

| Icon     | Use           |
| -------- | ------------- |
| home     | Home link     |
| services | Services link |
| about    | About link    |
| contact  | Contact link  |

---

## Icon Inventory

| ID       | Name        | Category  | Status   | Used In               |
| -------- | ----------- | --------- | -------- | --------------------- |
| ICON-001 | truck       | Logistics | Approved | Home, Track (loading) |
| ICON-002 | ship        | Logistics | Approved | Services              |
| ICON-003 | warehouse   | Logistics | Planned  | Dashboard             |
| ICON-004 | customs     | Logistics | Approved | Services              |
| ICON-005 | success     | Status    | Approved | Track (success msg)   |
| ICON-006 | error       | Status    | Approved | Track (error msg)     |
| ICON-007 | warning     | Status    | Approved | Forms                 |
| ICON-008 | info        | Status    | Approved | Alerts                |
| ICON-009 | lock        | Security  | Approved | Track (security note) |
| ICON-010 | shield      | Security  | Approved | Track (processing)    |
| ICON-011 | document    | Forms     | Approved | Track (form fields)   |
| ICON-012 | phone       | Forms     | Approved | Track (form fields)   |
| ICON-013 | email       | Forms     | Approved | Track (form fields)   |
| ICON-014 | user        | Forms     | Approved | Track (form fields)   |
| ICON-015 | calendar    | Forms     | Approved | Track (form fields)   |
| ICON-016 | pin         | Forms     | Approved | Track (form fields)   |
| ICON-017 | upload      | Forms     | Approved | Track (file upload)   |
| ICON-018 | tracking    | Logistics | Approved | Track (track section) |
| ICON-019 | container   | Logistics | Approved | Services              |
| ICON-020 | cargo       | Logistics | Approved | Home                  |
| ICON-021 | bl-document | Logistics | Approved | Track (choice cards)  |
| ICON-022 | port        | Logistics | Approved | Services              |
| ICON-023 | search      | Core UI   | Approved | Track (track section) |
| ICON-024 | arrow       | Core UI   | Approved | Buttons               |
| ICON-025 | trust-check | Brand     | Approved | Trust bar             |
| ICON-026 | whatsapp    | Brand     | Approved | Track (WhatsApp CTA)  |
| ICON-027 | favicon     | Brand     | Approved | All pages             |

---

## Usage Rules

### General

- Status icons: never larger than `icon-lg`.
- CTA icons: always positioned after text.
- Form icons: always before labels.
- Trust icons: always gold.
- Navigation arrows: animated only on hover.
- Loading icons: only used during processing states.

### Accessibility

- Decorative icons: `aria-hidden="true"`.
- Standalone actionable icons: must have an accessible label (`aria-label` or `<title>`).
- Icon-only buttons: visible focus styles.
- Icons must never convey meaning by color alone.

### Emoji Prohibition

- Emoji characters (`✅`, `❌`, `⚠️`, `🔒`, etc.) are **forbidden** in all HTML.
- Only approved SVGs or icon components may be used.

---

## Colour Rules

All SVGs must use `stroke="currentColor"` or `fill="currentColor"`.
Colour is applied via CSS utility classes:

```css
.icon-navy    { color: var(--navy); }
.icon-gold    { color: var(--gold); }
.icon-white   { color: var(--white); }
.icon-success { color: var(--success); }
.icon-error   { color: var(--error); }
Sizing Grid
Class	Size	Optical Padding	Wrapper
icon-xs	12px	2px	16px
icon-sm	16px	4px	20px
icon-md	24px	4px	32px
icon-lg	36px	6px	48px
icon-xl	48px	8px	64px
icon-hero	64px	8px	80px
All SVG assets share a standard viewBox="0 0 24 24". CSS controls the rendered size.

Animation Rules
Static (never animated):
success, error, warning, info, lock, shield, document, user, calendar, phone, email, pin, search, container, ship, warehouse, cargo, customs, port, bl-document, trust-check, favicon

Subtle animation allowed:

truck — horizontal movement on loading

processing — pulse or spin

arrow — translate on hover

spinner — rotate

Engineering Rules
Icons are part of the Frontend SSOT.

Icons shall not be edited directly in page HTML unless approved in this document.

Every new icon must be added to this standard and assets/icons/ before implementation.

Duplicate SVG definitions are prohibited.

Colours shall use CSS variables, never hardcoded hex values.

Icons must remain accessible: decorative icons use aria-hidden="true", functional icons require accessible labels.

One SVG file = one icon. Reusing the same SVG for different semantic meanings is prohibited.

SVG files must be minified, contain no metadata, editor comments, inline styles, or embedded fonts.

UI icons are rendered inline (<svg>...</svg>). Illustrations or large logos may use external SVG files or WebP.

The system supports both individual inline SVGs and future <use>-based sprites without changing the standard.

Approval Workflow
text
New icon requested
        ↓
Design review against this standard
        ↓
Added to Icon Standard (this document)
        ↓
SVG asset created in assets/icons/
        ↓
CSS utilities updated if needed
        ↓
Implemented in HTML
        ↓
Frozen
Asset Structure
text
assets/
└── icons/
    ├── status/
    │   ├── success.svg
    │   ├── error.svg
    │   ├── warning.svg
    │   └── info.svg
    │
    ├── logistics/
    │   ├── truck.svg
    │   ├── ship.svg
    │   ├── warehouse.svg
    │   ├── tracking.svg
    │   ├── container.svg
    │   ├── cargo.svg
    │   ├── bl-document.svg
    │   ├── customs.svg
    │   └── port.svg
    │
    ├── forms/
    │   ├── phone.svg
    │   ├── email.svg
    │   ├── calendar.svg
    │   ├── user.svg
    │   ├── document.svg
    │   ├── pin.svg
    │   └── upload.svg
    │
    ├── security/
    │   ├── lock.svg
    │   └── shield.svg
    │
    ├── core/
    │   ├── search.svg
    │   ├── arrow.svg
    │   ├── close.svg
    │   ├── plus.svg
    │   └── minus.svg
    │
    └── brand/
        ├── favicon.svg
        ├── whatsapp.svg
        └── trust-check.svg
Document Control
Version	Date	Author	Changes
1.0.0	July 2026	System	Initial creation
text

```
