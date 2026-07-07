markdown

# 09 — Website Architecture

**Title:** QuickFreights Platform — Website Architecture
**Version:** 1.1.0
**Status:** Approved
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`01_System_Architecture.md`

### References

- `04_Source_of_Truth.md` — Colors, typography, breakpoints, pages
- `05_Coding_Standards.md` — HTML, CSS, JavaScript conventions

---

## Authority

This document defines the architecture of the public-facing website
within the QuickFreights Platform Presentation Layer.

---

## 1. Website Folder Structure

apps/
└── website/
├── index.html
├── about.html
├── services.html
├── contact.html
├── track.html
├── css/
│ └── styles.css
├── js/
│ └── script.js
├── images/
├── icons/
├── fonts/
└── assets/

text

This is the canonical layout for the Presentation Layer.
Future applications (admin-portal, customer-portal) follow the same structure.

---

## 2. Page Inventory

| Page           | Filename        | Purpose                            | Components                                       |
| -------------- | --------------- | ---------------------------------- | ------------------------------------------------ |
| **Home**       | `index.html`    | Landing page, company introduction | Hero, Expertise cards, Why Us, Image banner, CTA |
| **About**      | `about.html`    | Company story, mission, values     | Story section, Values grid, CTA                  |
| **Services**   | `services.html` | Service descriptions               | Service rows with icons, Feature lists, CTA      |
| **Contact**    | `contact.html`  | Office locations, phone, email     | Contact cards, Hub cards, CTA                    |
| **Submit B/L** | `track.html`    | Bill of Lading submission form     | Form fields, File upload, Success/Error messages |

---

## 3. Shared Components

Every page shares these components:

| Component       | Owns                                | Location                             |
| --------------- | ----------------------------------- | ------------------------------------ |
| **Header**      | Navigation, mobile menu, logo       | All pages                            |
| **Footer**      | Company information, links, contact | All pages                            |
| **Skip Link**   | Accessibility skip-to-content       | All pages                            |
| **CTA Banner**  | Lead generation                     | Home, About, Services, Contact       |
| **Page Header** | Title banner with background image  | About, Services, Contact, Submit B/L |

---

## 4. Reusable UI Components

### Buttons

- `.btn` — Base button
- `.btn-primary` — Gold background, primary action
- `.btn-outline` — Transparent with gold border
- `.btn-outline-dark` — Transparent with navy border
- `.btn-full` — Full-width button

### Cards

- `.expertise-card` — Service highlight card with image
- `.why-card` — Dark background value card
- `.contact-card` — Contact information card
- `.hub-card` — Office location card
- `.value-item` — Core value card

### Layout

- `.container` — Centered content wrapper
- `.section-header` — Section title block
- `.expertise-grid` — 4-column responsive grid
- `.why-grid` — 3-column responsive grid
- `.contact-grid` — 3-column responsive grid

### Utilities

- `.hidden` — Hide element
- `.visually-hidden` — Hide visually but keep for screen readers
- `.text-center` — Center text

---

## 5. Component Architecture

### 5.1 Header

- Logo (SVG icon + company name + RC number)
- Navigation links (Home, About, Services, Contact, Submit B/L)
- Mobile hamburger menu with overlay
- Sticky positioning
- Gold bottom border

### 5.2 Footer

- Company information and RC number
- Quick links
- Service links
- Onitsha office contact
- Copyright bar with dot-pattern texture

### 5.3 Hero (Homepage Only)

- Background image with navy overlay
- Company badge (Bondex Bridge subsidiary) with gold dot
- RC number
- Main headline: "VERY FAST DELIVERY"
- Subtitle
- Two CTAs: Submit B/L, Contact
- Stats bar with borders: Port Harcourt, Onitsha, 24/7

### 5.4 Expertise Cards

- Image at top (aspect-ratio: 16/9)
- SVG icon
- Title
- Description
- 4 cards in a grid (1 col mobile, 2 col tablet, 4 col desktop)
- Hover: gold border-top, shadow, image zoom

### 5.5 Why Us Cards

- Dark navy background
- Gold number (01, 02, 03)
- White title
- Light description text
- 3 cards in a grid

### 5.6 Form (Submit B/L)

- Customer Name (required)
- Phone Number (required, Nigerian format)
- B/L Number (required)
- Container Number (optional)
- Cargo Description (required)
- File Attachment (optional, 5MB max, PDF/JPG/PNG/DOC)
- Drag-and-drop file upload
- Submit button with loading state
- Success message with Tracking ID display
- Error message with retry button
- `aria-describedby` for validation errors

---

## 6. Navigation Behavior

### Desktop (992px+)

- Full horizontal navigation bar
- Active page highlighted with gold underline
- Submit B/L button highlighted in gold

### Mobile (default)

- Hamburger menu icon
- Slide-in panel from right
- Overlay background
- ESC key closes menu
- Click outside closes menu
- Swipe right closes menu

---

## 7. Image Strategy

| Phase           | Source                                              | Notes                         |
| --------------- | --------------------------------------------------- | ----------------------------- |
| **Development** | Temporary CDN (Unsplash) permitted                  | Fast prototyping              |
| **Production**  | All images stored locally in `apps/website/images/` | No third-party dependency     |
| **Format**      | WebP preferred, JPEG fallback                       | Smaller files, faster loading |

Unsplash URLs are replaced with local images before production deployment.

---

## 8. CSS Architecture

- Single `styles.css` file in v1.0
- CSS custom properties in `:root`
- Mobile-first media queries
- BEM-inspired naming: `.site-header`, `.btn-primary`, `.expertise-card`

Future versions may split CSS into modules while preserving the
public interface defined by these class names.

---

## 9. JavaScript Architecture

- Single `script.js` file in v1.0

### Module Functions

| Function             | Responsibility                             |
| -------------------- | ------------------------------------------ |
| `initMobileMenu()`   | Toggle, overlay, swipe, ESC, click-outside |
| `validateForm()`     | Required fields, phone format, file size   |
| `normalizePhone()`   | Convert local format to international      |
| `initFileUpload()`   | Drag-and-drop, size validation, type check |
| `readFileAsBase64()` | Convert file for upload                    |
| `handleFormSubmit()` | Async submission, success/error display    |
| `displaySuccess()`   | Show tracking ID, phone confirmation       |
| `displayError()`     | Show retry option                          |
| `resetForm()`        | Clear all fields and messages              |

Future versions may introduce modules without changing page behavior.

---

## 10. Accessibility Requirements

- Skip-to-content link on every page
- All images have `alt` attributes
- Form inputs have associated `<label>` elements
- `aria-describedby` links validation errors to inputs
- Keyboard-navigable menu with focus management
- Focus-visible outlines on all interactive elements
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels on navigation, icons, and toggle buttons
- Minimum touch target: 44×44 px
- One H1 per page
- Color contrast: WCAG AA minimum
- `prefers-reduced-motion` support

---

## 11. Performance Requirements

- Images use `loading="lazy"`
- CSS loaded in `<head>` with `preconnect` for Google Fonts
- JavaScript loaded before `</body>`
- `font-display: swap` on web fonts
- WebP format for all images
- SVG icons inline (no extra HTTP requests)
- Compressed images
- Responsive images with appropriate sizes
- No render-blocking resources

---

## 12. SEO Requirements

- Unique `<title>` on every page
- Unique `<meta name="description">` on every page
- Canonical URL on every page
- Open Graph tags for social sharing
- Semantic heading hierarchy (H1 → H2 → H3)
- Descriptive link text (no "click here")

---

## 13. Future Expansion

The Presentation Layer is designed to accommodate future applications
following the same architecture:

- **Customer Portal** — Login, shipment history, profile
- **Admin Portal** — Dashboard, analytics, user management
- **Knowledge Base** — FAQs, documentation, guides
- **Tracking Dashboard** — Public shipment tracking
- **Blog** — Company news, logistics insights

Each new application follows this document's component and layout patterns.

---

## 14. Version History

| Version | Date       | Changes                                                                                                                                                                                                                 |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0   | 2026-06-29 | Initial Website Architecture                                                                                                                                                                                            |
| 1.1.0   | 2026-06-29 | Added folder structure, component ownership, reusable UI components, navigation behavior, image strategy, expanded JS architecture, accessibility details, performance requirements, SEO requirements, future expansion |
