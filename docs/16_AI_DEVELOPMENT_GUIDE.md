# 16 — AI DEVELOPMENT GUIDE

## Quick Freights Global Limited Platform

### Version 1.0

### Status: Production Baseline

### Last Updated: July 2026

---

# Purpose

This document serves as the operating manual for all future AI-assisted development on the Quick Freights Global Limited Platform.

Its purpose is to ensure that every AI assistant, developer, or collaborator understands:

- Project architecture
- Design philosophy
- Coding standards
- Business objectives
- Existing decisions
- Documentation structure
- Source of truth

The goal is to preserve consistency, reduce repeated explanations, and prevent architectural drift throughout the project's lifecycle.

---

# Project Overview

Project Name

Quick Freights Global Limited Platform

Current Version

Version 1.0 (Production)

Website Type

Corporate website for a Nigerian Customs Clearing and Freight Forwarding Company.

Primary Objective

Generate qualified customer enquiries while establishing trust and professionalism.

Secondary Objectives

- Present company services
- Build credibility
- Enable document submission
- Simplify customer communication
- Prepare for future customer portal

---

# Business Model

Quick Freights Global Limited primarily operates as:

- Customs Clearing Agent
- Freight Forwarder
- Import Documentation Consultant
- Cargo Logistics Partner

The website must communicate all four services without overemphasizing only one.

---

# Target Customers

Primary

- Importers
- Manufacturers
- Trading Companies
- SMEs
- Government Contractors

Secondary

- Freight Forwarders
- Logistics Companies
- Shipping Companies
- Clearing Agents requiring partnership

Customer Location

Primarily Nigeria.

---

# Design Philosophy

Every design decision must reinforce:

Professionalism

Trust

Clarity

Simplicity

Premium appearance

Avoid:

Visual clutter

Cheap animations

Overly decorative elements

Generic templates

The website should feel comparable to an established international logistics company.

---

# Brand Personality

Professional

Reliable

Transparent

Efficient

Modern

Approachable

Never use playful language or gimmicks.

---

# UX Philosophy

Visitors usually arrive with one of four goals:

1.  Learn about the company

2.  Clear imported cargo

3.  Request logistics assistance

4.  Contact the company

Every page should move visitors toward one of these outcomes.

---

# Conversion Philosophy

The website should never pressure visitors.

Instead:

Educate first

Build trust

Offer assistance

Then invite action

Primary CTA

Cargo Portal

Secondary CTA

Our Services

High-commitment actions should always be preceded by trust-building content.

---

# Development Philosophy

The project follows these principles:

Keep architecture simple.

Prefer maintainability over clever code.

Avoid unnecessary libraries.

Use semantic HTML.

Keep JavaScript modular.

Prefer configuration over duplication.

Centralize repeated information.

Document major decisions.

Maintain premium visual quality.

---

# Source of Truth

Never duplicate business information.

Always use the centralized configuration files.

Examples:

Communication

communication.config.js

Design Tokens

styles.css variables

Decision History

06_DECISION_LOG.md

Version History

07_CHANGELOG.md

Future developers must update the source—not duplicate values elsewhere.

---

# Coding Standards

HTML

Use semantic elements.

Maintain accessibility.

Use ARIA where appropriate.

Avoid inline styles.

CSS

Use design tokens.

Avoid hardcoded colors.

Keep spacing consistent.

Follow mobile-first principles.

JavaScript

Use vanilla JavaScript unless approved.

Avoid global pollution.

Keep modules focused.

Prefer readable code over compact code.

---

# Documentation Rules

Every significant change must update:

Decision Log

Changelog

Relevant technical documentation

Documentation should always match production.

---

# AI Working Rules

Future AI assistants should follow these rules.

Rule 1

Never redesign existing UI without a clear business reason.

Rule 2

Preserve the established premium visual language.

Rule 3

Never duplicate configuration values.

Rule 4

Always search existing documentation before introducing new architecture.

Rule 5

Respect previous architectural decisions unless explicitly asked to revisit them.

Rule 6

Prefer extending existing systems over creating parallel ones.

Rule 7

When adding new features:

Design

Develop

Test

Document

Update changelog

Record decisions

Rule 8

Every recommendation should balance:

Business goals

User experience

Maintainability

Performance

Accessibility

---

# Known Architecture Decisions

Examples include:

Communication centralized

Floating widget generated dynamically

Hero optimized for above-the-fold trust

Trust-first homepage structure

Cargo Portal replaces Start Shipment terminology

SVG icons preferred over emoji

Premium corporate design language

Always consult the Decision Log before reversing any of these.

---

# Known Technical Constraints

Current platform is static.

Hosted on GitHub Pages.

No backend.

No database.

No authentication.

No payment processing.

Future architecture should respect these limitations unless Version 2 introduces backend services.

---

# Performance Standards

Maintain:

Performance 90+

Accessibility 95+

Best Practices 95+

SEO 95+

Do not sacrifice performance for visual effects.

---

# Accessibility Standards

Maintain:

Keyboard navigation

Visible focus states

Semantic structure

Proper headings

Alternative text

ARIA labels where necessary

Accessibility should never be treated as optional.

---

# Future Version Strategy

Version 1

Corporate Website

Version 2

Customer Portal

Tracking Dashboard

Authentication

Document Upload

Version 3

Operations Platform

Admin Dashboard

CRM

Reporting

Version 4

Automation

AI Assistance

Customer Self-Service

API Integrations

SMS Automation

Email Automation

---

# When Receiving New Tasks

AI assistants should first determine:

Is this:

Bug Fix

Content Update

Performance Improvement

Feature Request

Refactor

Documentation

Architecture

Design Enhancement

The correct solution depends on the category.

---

# Before Completing Any Task

Verify:

Visual consistency

Responsive behavior

Accessibility

Performance impact

Documentation impact

Decision Log impact

Changelog impact

Never consider a feature complete until documentation has been updated where applicable.

---

# Communication Style

When assisting development:

Explain reasoning.

Recommend best practices.

Identify trade-offs.

Avoid unnecessary complexity.

Prioritize long-term maintainability over short-term convenience.

---

# Success Criteria

A successful AI contribution should:

Improve the project.

Avoid technical debt.

Respect previous decisions.

Preserve premium quality.

Reduce future maintenance effort.

Leave the documentation better than it was before.

---

# Version History

## Version 1.0

Initial AI Development Guide created after successful completion and deployment of Version 1 of the Quick Freights Global Limited website.

This document establishes the long-term AI collaboration standards for future development.

## Backend Logging Standard

### Purpose

Quick Freights adopts a consistent backend logging standard to improve debugging, maintenance, and AI-assisted development.

Beginning with **Backend Version 7.0**, all newly developed backend modules shall use the JavaScript **Console API** for logging.

---

### Standard

Use the appropriate console method based on the type of message:

| Method            | Purpose                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `console.log()`   | Informational messages, execution flow, successful operations and debugging output.      |
| `console.warn()`  | Recoverable issues, missing optional data, fallback behaviour and non-critical warnings. |
| `console.error()` | Errors, exceptions, failed operations and unexpected conditions.                         |

Example:

```javascript
console.log("Submission received:", trackingId);

console.warn("No attachment supplied.");

console.error("Drive upload failed:", error);
```

---

### Legacy Compatibility

Earlier backend modules may still contain `Logger.log()` statements.

These modules remain fully supported and **must not be modified solely to replace logging statements**.

When an existing module undergoes functional enhancement or refactoring, any legacy `Logger.log()` calls should be migrated to the Console API as part of that work.

---

### Engineering Principle

This standard supports the Quick Freights engineering philosophy:

- Single Source of Truth (SSOT)
- Readability over cleverness
- Modern JavaScript (V8) practices
- AI-friendly debugging
- Consistent backend architecture

This logging standard applies to all backend modules created from **Version 7.0** onward.
