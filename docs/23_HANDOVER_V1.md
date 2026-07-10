Quick Freights Global Limited — V1 Project Handover

Version: 1.0.0 (Production Freeze)
Project Status: V1 Complete and Frozen
Last Updated: July 2026

Project Overview

Quick Freights Global Limited is a Nigerian Clearing & Forwarding company providing Customs Brokerage, Freight Forwarding, Cargo Handling and Logistics services.

The website is a production-ready V1 corporate website built as the foundation for a future customer operations platform.

Current live site:

https://automationbyjohnpaul-oss.github.io/quickfreights-website/
Primary Goal

The website is NOT intended to be a full logistics management system yet.

Its purpose is to:

establish trust
generate enquiries
direct customers to the Cargo Portal
prepare the architecture for V2
Technology Stack

Frontend

HTML5
CSS3
Vanilla JavaScript

Hosting

GitHub Pages

Communication

WhatsApp
Email
Telephone

No backend currently exists.

Architecture
Visitor

↓

Corporate Website

↓

Cargo Portal

↓

WhatsApp / Email

↓

Quick Freights Operations
Folder Structure
apps/
website/

        index.html
        about.html
        services.html
        contact.html
        track.html

        css/
            styles.css

        js/
            script.js
            communication.config.js
            floating-widget.js

        images/
        icons/

        robots.txt
        sitemap.xml
        manifest.webmanifest

Documentation

The project now contains professional documentation including:

00_PROJECT_OVERVIEW.md

01_PROJECT_CHARTER.md

02_PROJECT_STRUCTURE.md

03_BRAND_GUIDELINES.md

04_DESIGN_SYSTEM.md

05_TECHNICAL_ARCHITECTURE.md

06_Decision_Log.md

07_CHANGELOG.md

08_DEPLOYMENT_GUIDE.md

09_TESTING_CHECKLIST.md

10_SEO_STRATEGY.md

11_COMMUNICATION_SYSTEM.md

12_PERFORMANCE_GUIDELINES.md

13_SECURITY_GUIDELINES.md

14_MAINTENANCE_GUIDE.md

15_ROADMAP.md

16_AI_DEVELOPMENT_GUIDE.md

17_SOURCE_OF_TRUTH.md

18_AI_CONTEXT.md

19_PROMPT_LIBRARY.md

20_PROJECT_ROADMAP.md

21_AI_SESSION_STARTER.md

22_V1_FINAL_STATE.md

These documents should be treated as the project's single source of documentation.

Frozen V1 Decisions

These decisions are intentional and should NOT be changed without review.

Cargo Portal

The customer entry point is named:

Cargo Portal

NOT:

Submit B/L
Start Shipment
Clear My Cargo

Reason:

Quick Freights serves both clearing and forwarding customers.

Homepage

Current journey:

Hero

↓

Credentials Bar

↓

How It Works

↓

Services

↓

Why Choose Us

↓

CTA

↓

Footer

This journey is frozen for V1.

Hero

The hero height was intentionally reduced so the Credentials Bar is visible on first load.

Do not increase hero height again.

Trust Philosophy

Proof sections such as:

testimonials
years in operation
certifications
client logos

were intentionally postponed until real operational evidence exists.

No fake testimonials should ever be added.

Communication

All communication information is controlled only through:

communication.config.js

No phone numbers, WhatsApp numbers or email addresses should be hardcoded elsewhere.

Floating Widget

The floating customer assistant is generated via JavaScript.

Never duplicate the widget HTML across pages.

Coding Standards

Maintain:

semantic HTML
responsive design
accessibility
modular JavaScript
CSS variables
clean documentation

Avoid:

inline CSS
inline JavaScript
duplicated business information
duplicated contact information
Completed Milestones

✔ Brand identity

✔ Responsive website

✔ Cargo Portal

✔ Communication System

✔ Floating Assistant

✔ Performance optimisation

✔ SEO foundation

✔ Security review

✔ Production deployment

✔ Documentation

Audit Results

Final technical audit:

Area Score
HTML 92/100
CSS 92/100
JavaScript 93/100
Security 92/100
Performance 91/100
SEO 92/100

Overall:

92/100

Production Ready.

Current Limitations

V1 intentionally does NOT include:

Customer login
Dashboard
File upload
Shipment tracking system
CRM
Payment gateway
Database
V2 Direction

Future development should focus on operational functionality rather than redesign.

Priority order:

Customer Dashboard
Secure Document Upload
Shipment Tracking
Google Apps Script Integration
CRM Integration
Customer Notifications
Admin Portal
AI Working Instructions

Future AI assistants should:

read the documentation before suggesting changes
preserve frozen V1 decisions
treat 17_SOURCE_OF_TRUTH.md as authoritative
follow 16_AI_DEVELOPMENT_GUIDE.md
avoid unnecessary redesign
prioritize maintainability over visual novelty
Current Development Status
V1

████████████████████████████

100%

Status:

PRODUCTION COMPLETE

FROZEN

## Immediate Next Objective

The objective of the next development phase is NOT to redesign the website.

The objective is to evolve Quick Freights from a corporate website into a customer operations platform by introducing secure backend functionality while preserving the V1 user experience and architecture.

READY FOR V2
