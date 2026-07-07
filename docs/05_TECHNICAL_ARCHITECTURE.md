# Quick Freights Global Limited

## Technical Architecture

Version: 1.0
Last Updated: July 2026
Status: Production (V1)

---

# Purpose

This document describes the technical architecture of the Quick Freights Global Limited website.

It serves as the reference for developers, maintainers and future contributors by documenting how the website is structured, how components interact, and how future enhancements should be integrated.

---

# Architecture Overview

The website follows a lightweight static architecture designed for:

- High performance
- Simplicity
- Reliability
- Easy maintenance
- Future scalability

Current deployment is entirely frontend-based, with the architecture intentionally prepared for backend integration in Version 2.

---

# High-Level Architecture

```
                Internet
                    │
                    ▼
          GitHub Pages Hosting
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
   Static HTML             Static Assets
        │
        ▼
    CSS + JavaScript
        │
        ▼
 User Interaction Layer
        │
        ▼
 Communication System
        │
 ┌──────┼─────────┐
 ▼      ▼         ▼
WhatsApp Email Telephone
```

---

# Technology Stack

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript (ES6)

---

## Assets

- SVG Icons
- WebP Images
- Google Fonts (Inter)

---

## Hosting

GitHub Pages

---

## Version Control

Git

GitHub

---

# Repository Structure

```
QuickFreights-Platform/

├── apps/
│   └── website/
│       ├── css/
│       ├── js/
│       ├── images/
│       ├── icons/
│       ├── index.html
│       ├── about.html
│       ├── services.html
│       ├── contact.html
│       └── track.html
│
├── docs/
│
└── .github/
```

---

# Page Architecture

The website consists of five primary pages.

## Home

Purpose

Customer acquisition

Major sections

- Hero
- Credentials Bar
- How It Works
- Services
- Why Choose Us
- Call to Action

---

## About

Purpose

Company credibility

Contains

- Company overview
- Mission
- Vision
- Core values

---

## Services

Purpose

Service discovery

Displays

- Customs Clearance
- Freight Forwarding
- Import Services
- Export Services

---

## Contact

Purpose

Customer communication

Includes

- Contact details
- Office hours
- Email support
- Telephone
- WhatsApp

---

## Cargo Portal

Purpose

Customer onboarding

Provides

- Online document submission
- WhatsApp submission
- Cargo enquiry

---

# CSS Architecture

Primary stylesheet

```
css/styles.css
```

Responsibilities

- Layout
- Components
- Typography
- Responsive behaviour
- Animations
- Utility classes

No inline styling should be introduced unless technically unavoidable.

---

# JavaScript Architecture

The JavaScript layer is modular.

## script.js

Responsibilities

- Navigation
- Mobile menu
- Hero interactions
- Form validation
- Page behaviour

---

## communication.config.js

Acts as the Single Source of Truth.

Contains

- Phone numbers
- Email addresses
- WhatsApp number
- Message templates
- Helper functions

All communication references originate from this file.

---

## floating-widget.js

Responsible for

- Floating Customer Assistant
- Dynamic widget rendering
- Context-aware links
- Customer interaction

Separating the widget into its own module improves maintainability.

---

# Communication Architecture

```
User

↓

Floating Widget

↓

communication.config.js

↓

WhatsApp

Email

Telephone
```

No communication details should exist outside the configuration.

---

# User Journey Architecture

Typical customer flow

```
Homepage

↓

Cargo Portal

↓

Choose Submission Method

↓

Document Submission

↓

Tracking ID

↓

Cargo Processing

↓

Customer Updates
```

Every page should guide customers toward the next logical action.

---

# Responsive Architecture

The website follows a mobile-first approach.

Breakpoints

Desktop

Laptop

Tablet

Mobile

Small Mobile

Layouts collapse progressively while preserving usability.

---

# Component Architecture

Reusable components include

- Navigation
- Hero
- Buttons
- Credentials Bar
- Cards
- Forms
- Floating Customer Assistant
- Footer

All reusable components are documented in the Design System.

---

# Asset Strategy

Images

- WebP
- Optimised
- Lazy loaded where appropriate

Icons

- SVG

Fonts

- Google Fonts
- Optimised loading

---

# SEO Architecture

Current implementation

- Semantic HTML
- Meta descriptions
- Open Graph metadata
- Sitemap
- Robots.txt
- Manifest
- Optimised headings

Future additions

- Structured Data
- Local Business Schema
- FAQ Schema

---

# Performance Strategy

Current optimisations

- Compressed images
- Optimised font loading
- Lightweight JavaScript
- Minimal dependencies
- Responsive images

Target

Lighthouse 90+

---

# Security Strategy

Current

- Static website
- No server-side processing
- No customer authentication

Future

- Input validation
- API authentication
- Secure uploads
- User authentication

---

# Deployment Architecture

Developer

↓

Git

↓

GitHub Repository

↓

GitHub Actions

↓

GitHub Pages

↓

Production Website

Deployment is fully automated.

---

# Future Architecture (V2)

The current architecture intentionally prepares for expansion.

Planned additions

Customer Dashboard

Shipment Tracking

Authentication

Admin Portal

CRM Integration

Payment Gateway

Database

REST API

Notification Service

AI Assistant

These systems will integrate without requiring a redesign of the current frontend.

---

# Architectural Principles

The platform follows these principles:

- Separation of concerns
- Single source of truth
- Reusable components
- Progressive enhancement
- Mobile-first design
- Performance-first implementation
- Accessibility by default
- Maintainability over complexity

Every new feature should follow these principles.

---

# Guiding Principle

The Quick Freights website is more than a marketing site.

It is the foundation of a future digital logistics platform.

All architectural decisions should prioritise scalability, maintainability and customer experience while preserving the simplicity and performance achieved in Version 1.
