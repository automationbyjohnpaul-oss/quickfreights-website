# Quick Freights Global Limited — Project Handover

Version: 2.0.0
Project Status: V1 Website Complete | V2 Backend In Progress
Last Updated: July 2026

---

# Project Overview

Quick Freights Global Limited is a Nigerian Clearing & Forwarding company providing Customs Brokerage, Freight Forwarding, Cargo Handling and Logistics services.

The project has evolved from a corporate website into a customer operations platform.

The frontend (V1) is production-ready and frozen.

Development is currently focused on building the backend architecture (V2) while preserving the V1 user experience.

Live Website

https://automationbyjohnpaul-oss.github.io/quickfreights-website/

---

# Technology Stack

## Frontend

- HTML5
- CSS3
- Vanilla JavaScript

Hosted on GitHub Pages.

---

## Backend

Google Apps Script (Modular Architecture)

Modules:

- Main.gs
- Config.gs
- Logger.gs
- Utilities.gs
- Validation.gs
- Tracking.gs
- Sheets.gs
- Drive.gs (not yet integrated)
- SMS.gs (not yet integrated)

Spreadsheet

Google Sheets

---

# Backend Status

Completed

✓ Modular architecture

✓ Configuration module

✓ Validation module

✓ Tracking ID generator

✓ Spreadsheet write engine

✓ Logger

✓ Utility functions

✓ Main doGet()

✓ Main doPost()

✓ Backend health endpoint

✓ Internal backend testing

Verified

✓ Tracking ID generation

✓ Spreadsheet write

✓ Validation

✓ End-to-end backend test (Apps Script)

---

# Current Issue

Backend modules work correctly.

The remaining issue is frontend integration.

Current behaviour:

GitHub Pages

↓

fetch()

↓

Google Apps Script Web App

↓

Browser reports:

No Access-Control-Allow-Origin

↓

Submission fails on frontend.

Manual Apps Script testing succeeds.

The problem is therefore isolated to browser → Apps Script integration.

No redesign should be performed until this integration issue is resolved.

---

# Tracking ID Format

Current format

QFG-MM-YY-XXXXXX

Example

QFG-07-26-JG1N6J

Structure

QFG
Month
Year
Random six-character alphanumeric suffix

---

# Documentation

Documentation now includes

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

23_HANDOVER_V1.md

24_BACKEND_SOURCE_OF_TRUTH.md

25_BACKEND_BUILD_LOG.md

These documents are the authoritative project documentation.

---

# Frozen V1 Decisions

Do NOT redesign the website.

The following are frozen.

✓ Homepage structure

✓ Hero

✓ Trust bar

✓ Cargo Portal naming

✓ Floating Widget

✓ Colour palette

✓ Typography

✓ Services

✓ CTA placement

Only backend functionality should evolve.

---

# Backend Architecture

Customer

↓

GitHub Pages

↓

track.html

↓

script.js

↓

Google Apps Script

↓

Google Sheets

↓

Drive (future)

↓

SMS (future)

---

# Completed Backend Milestones

Phase 1

✓ Config

✓ Logger

✓ Utilities

✓ Validation

Phase 2

✓ Tracking Engine

✓ Sheets Engine

✓ Main.gs

✓ Backend testing

Phase 3

Currently in progress

Frontend integration

Current blocker:

Browser → Apps Script communication.

---

# Outstanding Tasks

Highest Priority

Resolve frontend submission integration.

After integration:

1. Drive.gs

2. SMS.gs

3. Production testing

4. Customer acceptance testing

---

# Current Development Status

Website

████████████████████████████

100%

Backend Core

█████████████████████░░░░░

75%

Frontend Integration

██░░░░░░░░░░░░░░░░░░░░░░

20%

Overall Project

█████████████████████░░░░

85%

---

# AI Working Instructions

Future AI assistants should:

• Read all project documentation first.

• Treat 17_SOURCE_OF_TRUTH.md as authoritative.

• Treat 24_BACKEND_SOURCE_OF_TRUTH.md as authoritative for backend.

• Preserve all frozen V1 decisions.

• Never redesign the website unnecessarily.

• Continue modular backend development.

• Build → Test → Integrate.

• Test each module independently before connecting systems.

---

# Immediate Next Objective

Resolve the browser ↔ Google Apps Script integration.

Do NOT redesign the frontend.

Do NOT rebuild the backend.

Focus exclusively on restoring production communication between:

GitHub Pages

↓

script.js

↓

Apps Script

↓

Google Sheets

Once this works, continue with:

Drive Integration

↓

SMS Notifications

↓

Production Release
