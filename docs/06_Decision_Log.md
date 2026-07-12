# Quick Freights Global Limited

# 06 DECISION LOG

> **Documentation v1.0**
> Created: 2026-07-07
> Status: Draft

---

## Overview

_Content to be added_

---

## Related Documents

- [Back to README](./README.md)

---

_This document is part of the Quick Freights Global Limited documentation suite._

# Quick Freights Global Limited

# 06 DECISION LOG

> **Documentation v1.0**
> Created: 2026-07-07
> Status: Draft

---

## Overview

_Content to be added_

---

## Related Documents

- [Back to README](./README.md)

---

_This document is part of the Quick Freights Global Limited documentation suite._

---

## V1 Final Decisions (July 2026)

### Decision: Cargo Portal Naming

**Date:** July 2026
**Decision:** Changed customer entry point from "Submit B/L" to "Cargo Portal"
**Reason:** Quick Freights serves both clearing and forwarding customers. The term "Cargo Portal" supports both clearance and logistics workflows.

### Decision: Hero Stats Removed

**Date:** July 2026
**Decision:** Removed the hero stats bar (Port Harcourt, Onitsha, 24/7)
**Reason:** Redundant with the Trust Bar directly below. Removing stats reduced hero height and improved first-screen experience.

### Decision: Trust Bar Restructured

**Date:** July 2026
**Decision:** Changed from single-line spans to stacked strong/span with gold checkmarks
**Reason:** Proof-based content with stacked typography reads more professionally and builds more trust.

### Decision: No Public Security Warnings on Homepage

**Date:** July 2026
**Decision:** Security warnings were reviewed but intentionally excluded from the homepage
**Reason:** Excessive warnings may reduce customer confidence. Security guidance appears during document submission workflows only.

### Decision: V1 Proof Sections Deferred

**Date:** July 2026
**Decision:** Testimonials, industry affiliations, years in operation, and additional credentials postponed
**Reason:** Authentic proof will be added after operational history is collected. Invented proof damages credibility.

### Decision: V1 Scope Freeze

**Date:** July 2026
**Decision:** Officially declared V1 scope freeze — no new features
**Reason:** Focus shifted to quality, optimization, and launch readiness. V2 will be driven by real customer data.

## Decision #003

### Title

Adopt Randomized Public Tracking ID Format

### Date

July 2026

### Decision

The platform will use the following customer-facing tracking ID format:

QFG-MM-YY-XXXXXX

Example:

QFG-07-26-A7X4K2

A separate internal numeric Submission ID will be maintained for chronological sequencing.

### Rationale

- Protects operational volume from public exposure.
- Improves customer readability.
- Provides immediate month/year context.
- Supports scalable growth.
- Aligns with professional logistics industry practices.

## Decision #004

### Title

Retire Monolithic Backend

### Date

July 2026

### Decision

The legacy monolithic `Code.gs` backend was archived externally as `Code_Legacy_v5.0.gs` and removed from the active Apps Script project.

### Rationale

- Eliminate duplicate entry points (`doGet()` and `doPost()`).
- Prevent conflicts between legacy and modular backends.
- Improve maintainability and AI-assisted debugging.
- Ensure the Apps Script project contains only production code.

### Status

Completed
