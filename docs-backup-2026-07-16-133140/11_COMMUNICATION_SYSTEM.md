# Quick Freights Global Limited

## Communication System

Version: 1.0
Last Updated: July 2026
Status: Production (V1)

---

# Purpose

The Communication System provides a centralized architecture for all customer-facing communications used by the Quick Freights platform.

Its objectives are to:

- Ensure consistency across all communication channels.
- Eliminate duplicate contact information.
- Standardize customer messaging.
- Simplify future updates.
- Prepare the platform for CRM and notification integration.

This document serves as the reference for all communication-related development.

---

# Design Philosophy

The communication system follows one fundamental principle:

> **One Source of Truth**

Phone numbers, email addresses, WhatsApp numbers, templates and future notification content must exist in only one location.

This prevents inconsistencies throughout the website.

---

# Communication Architecture

```
Customer
      │
      ▼
Website Interface
      │
      ▼
communication.config.js
      │
 ┌────┼────┐
 ▼    ▼    ▼
WhatsApp
Email
Telephone
      │
      ▼
Future CRM / Notification Services
```

Every communication request flows through the configuration layer.

---

# Central Configuration

File

```
js/communication.config.js
```

Responsibilities

- Contact information
- WhatsApp templates
- Email templates
- SMS templates
- Helper functions
- URL generation
- Future API endpoints

No page should hardcode communication details.

---

# Contact Information

The following information is centrally managed.

Primary Office Number

```
+234 803 788 3339
```

WhatsApp Number

```
2348037883339
```

Support Email

```
reception.quickfreightglobal@gmail.com
```

Future updates should only be made in the configuration file.

---

# Communication Channels

Current channels include:

## WhatsApp

Primary customer support channel.

Used for:

- Cargo enquiries
- Cargo Portal
- Document submission
- Customer support
- Quote requests
- Shipment updates

---

## Email

Used for:

- Formal correspondence
- Document exchange
- Business enquiries
- Customer support

---

## Telephone

Used for:

- Urgent enquiries
- Customer support
- Office communication

---

## SMS

Reserved for future implementation.

Primary use cases

- Tracking ID notifications
- Cargo status
- Customs clearance updates
- Delivery confirmation

---

# Frozen Message Templates

Version 1 introduces standardized templates.

Templates must never be edited directly within page scripts.

They should always be maintained inside the communication configuration.

---

## General Enquiry

Purpose

First-time visitors seeking information.

Typical content

- Customer name
- Enquiry
- Contact details

---

## Cargo Portal Submission

Purpose

Customers submitting cargo documentation.

Captures

- Customer name
- Company
- Optional alternate contact
- Documents attached

This template supports the Cargo Portal workflow.

---

## Tracking Support

Purpose

Shipment status enquiries.

Captures

- Tracking ID
- Customer information

---

## Quote Request

Purpose

Pricing enquiries.

Captures

- Cargo type
- Origin
- Destination
- Customer details

---

## Customs Clearance

Purpose

Customers requiring customs clearance assistance.

Captures

- Port of arrival
- Cargo description
- Documentation status

---

## Freight Forwarding

Purpose

Customers requiring international or domestic forwarding.

Captures

- Origin
- Destination
- Cargo details

---

## Import Assistance

Purpose

First-time importers requesting guidance.

Captures

- Cargo description
- Expected arrival
- Country of origin

---

## Export Assistance

Purpose

Export enquiries.

Captures

- Destination country
- Cargo description
- Export requirements

---

## Operational Templates

Internal operational templates include:

- Document received
- Tracking ID generated
- Cargo under processing
- Customs inspection
- Clearance completed
- Delivery scheduled

These are intended for future CRM integration.

---

# Context-Aware Messaging

Version 1 introduced context-aware communication.

Example

Cargo Portal

Opens:

Cargo submission template

General website pages

Open:

General enquiry template

Customers always receive the correct message without manually selecting a template.

---

# URL Generation

The configuration provides helper functions.

Examples

WhatsApp

```
getWhatsAppUrl(template)
```

Email

```
getEmailUrl(subject)
```

Telephone

```
getTelUrl()
```

Pages should call these helpers instead of constructing URLs manually.

---

# Floating Customer Assistant

The Floating Customer Assistant uses the centralized communication system.

Current options

- Cargo Portal
- WhatsApp
- Call Office
- Email Support

Future versions may include:

- Live Chat
- Callback Request
- AI Assistant

---

# Customer Journey

Typical communication flow

```
Visitor

↓

Website

↓

Cargo Portal

↓

Document Submission

↓

Tracking ID Generated

↓

SMS / WhatsApp Notification

↓

Cargo Processing

↓

Clearance Updates

↓

Completion
```

The communication system supports this journey.

---

# Security

Customer communication should never expose:

Internal email addresses

Private phone numbers

Administrative endpoints

Future API keys

Templates should not contain sensitive business logic.

---

# Maintenance

When contact information changes:

Update

```
communication.config.js
```

Do NOT edit:

HTML

JavaScript components

Floating Widget

Individual pages

The configuration automatically updates all dependent features.

---

# Future Integration

Version 2 may integrate

Customer Dashboard

CRM

Email Automation

SMS Gateway

WhatsApp Business API

Live Chat

Customer Authentication

Document Management

Notification Centre

The communication configuration will remain the single source of truth.

---

# Development Rules

Always

✓ Use centralized templates

✓ Use helper functions

✓ Keep communication consistent

✓ Update configuration only

Never

✗ Hardcode phone numbers

✗ Hardcode WhatsApp links

✗ Duplicate templates

✗ Store contact details in multiple files

---

# Guiding Principle

Customer communication is part of the Quick Freights brand.

Every interaction should feel:

Professional

Helpful

Consistent

Reliable

Fast

The communication system exists to ensure every customer receives the same high-quality experience regardless of how they contact the company.
