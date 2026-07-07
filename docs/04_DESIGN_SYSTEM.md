# Quick Freights Global Limited

## Design System

Version: 1.0
Last Updated: July 2026
Status: Production (V1)

---

# Purpose

The Design System defines the reusable user interface components, layout rules, interaction patterns and visual standards used throughout the Quick Freights Global Limited website.

It ensures consistency, maintainability and scalability as the platform evolves.

---

# Design Philosophy

The Quick Freights design system is based on four principles:

• Clarity
• Consistency
• Trust
• Performance

Every component should help customers complete their task with minimal effort.

---

# Layout System

Maximum Container Width

```
1366px
```

Content Width

```
1200px
```

Container

```
margin: 0 auto;
padding-inline: responsive;
```

---

# Responsive Breakpoints

Desktop

```
1200px+
```

Laptop

```
992px–1199px
```

Tablet

```
768px–991px
```

Mobile

```
576px–767px
```

Small Mobile

```
Below 576px
```

All layouts must gracefully adapt across these breakpoints.

---

# Spacing System

Small

```
8px
```

Medium

```
16px
```

Large

```
24px
```

Extra Large

```
32px
```

Section Spacing

```
64px–96px
```

Whitespace is intentional and should never be removed simply to reduce page height.

---

# Grid System

Desktop

```
2–4 columns
```

Tablet

```
2 columns
```

Mobile

```
Single column
```

Cards should never become unreadable.

---

# Typography

Primary Font

Inter

Font Weights

```
400
500
600
700
800
```

---

# Heading Hierarchy

H1

Page title

One per page

---

H2

Major section

---

H3

Cards

Subsections

---

Body Text

Readable

Comfortable line spacing

Maximum readability

---

# Colour System

Primary Navy

```
#0A1F3F
```

Primary Gold

```
#DAA520
```

White

```
#FFFFFF
```

Neutral Grey

```
#6B7280
```

Success

```
#25D366
```

Error

```
#DC2626
```

---

# Buttons

## Primary Button

Purpose

Main customer action

Examples

Cargo Portal

Send Documents

Request Quote

Style

Gold background

Navy text

Rounded corners

Soft shadow

Hover elevation

---

## Secondary Button

Purpose

Alternative action

Style

White background

Gold border

Navy text

---

## Ghost Button

Purpose

Low emphasis actions

Transparent

Minimal styling

---

# Navigation

Desktop

Horizontal navigation

CTA button highlighted

Sticky navigation

---

Mobile

Hamburger menu

Full-width dropdown

Touch friendly

---

# Hero Section

Structure

Two-column layout

Desktop

```
42% Content
58% Image
```

Mobile

Stack vertically

---

Components

Headline

Supporting text

Primary CTA

Secondary CTA

Hero image

Trust Bar

---

# Trust Bar

Purpose

Build confidence immediately after the hero.

Current trust indicators

Licensed Customs Broker

CAC Registered

Onne Port Operations

24/7 Customer Support

Design

Single horizontal row

Icon + label

Minimal styling

High readability

---

# Cards

Cards are used throughout the website.

Examples

Services

Features

Benefits

How It Works

Guidelines

White background

Rounded corners

Soft shadow

Consistent padding

Hover elevation

---

# Forms

Forms should be:

Simple

Short

Accessible

Clearly labelled

Validation should occur politely.

Required fields should be obvious.

---

# Cargo Portal

Purpose

Guide customers toward document submission.

Entry methods

Online submission

WhatsApp submission

Future API submission

---

# Floating Customer Assistant

Purpose

Provide quick access to customer support.

Options

Cargo Portal

WhatsApp

Call Office

Email Support

Behaviour

Always visible

Expandable

Context-aware

Accessible

---

# Icons

Preferred format

SVG

Style

Outline

Simple

Consistent stroke width

Never mix icon styles.

---

# Images

Use

Optimised WebP

Professional logistics imagery

Authentic Nigerian context where appropriate

Avoid decorative images that do not support user goals.

---

# Animation

Animation should be subtle.

Allowed

Fade

Slide

Scale

Hover elevation

Not allowed

Bounce

Flash

Continuous movement

Distracting effects

Animations must enhance usability—not attract attention to themselves.

---

# Accessibility

Every component should support:

Keyboard navigation

Visible focus states

Screen readers

Adequate contrast

Semantic HTML

ARIA where appropriate

---

# Performance Guidelines

Avoid unnecessary DOM elements.

Optimise images.

Lazy-load non-critical assets.

Minimise JavaScript execution.

Reuse existing components.

Performance takes priority over visual effects.

---

# Component Naming

CSS classes should follow consistent naming.

Examples

```
hero
hero-content
hero-image

service-card

btn-primary

floating-widget

trust-bar
```

Avoid deeply nested selectors.

Prefer reusable utility classes where appropriate.

---

# Reusable Components

Current reusable UI components include:

Navigation

Hero

Buttons

Trust Bar

How It Works

Service Cards

CTA Banner

Floating Customer Assistant

Footer

Forms

Cards

Section Headers

---

# Future Components (V2)

Customer Dashboard

Tracking Timeline

Shipment Status Cards

Document Upload

Notification Centre

Quote Calculator

Admin Components

These should follow the same visual language established in V1.

---

# Design Review Checklist

Before introducing a new UI component, confirm:

✓ Is it consistent with existing components?

✓ Does it improve customer understanding?

✓ Is it responsive?

✓ Is it accessible?

✓ Does it maintain the premium brand identity?

✓ Is it performant?

If any answer is "No", redesign before implementation.

---

# Guiding Principle

The Design System exists to create a consistent customer experience.

Every page should feel like part of the same product.

Consistency builds trust.

Trust builds business.
