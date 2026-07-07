# 19 — AI PROMPT LIBRARY

## Quick Freights Global Limited Platform

### Version 1.0

### Production Baseline

### Last Updated: July 2026

---

# Purpose

This document contains approved reusable prompts for working with AI assistants on the Quick Freights Global Limited Platform.

The purpose is to maintain consistency, reduce repeated explanations, and ensure AI-generated recommendations align with project goals.

---

# How To Use This Document

Before starting any AI-assisted task:

1. Identify the type of work required.

2. Copy the relevant prompt.

3. Include the required files or context.

4. Allow AI to review existing architecture before making changes.

Do not ask AI to redesign or rewrite blindly.

---

# GENERAL PROJECT CONTEXT PROMPT

Use at the beginning of major AI sessions.

```
You are assisting with the Quick Freights Global Limited Platform.

Before making recommendations, understand:

- This is a Nigerian logistics and customs clearing company website.
- The primary business is clearing and forwarding, not only freight forwarding.
- Customer trust is the main conversion goal.
- Version 1 is a premium static corporate website.
- Future versions may introduce customer portal, tracking, and automation.

Read these documents first:

00_PROJECT_OVERVIEW.md
06_Decision_Log.md
16_AI_DEVELOPMENT_GUIDE.md
17_SOURCE_OF_TRUTH.md
18_AI_CONTEXT.md

Do not introduce changes that conflict with previous decisions.
```

---

# CODE REVIEW PROMPT

Use when reviewing JavaScript, CSS, or HTML.

```
Review this code as a senior frontend engineer.

Consider:

- Existing project architecture
- Performance
- Maintainability
- Security
- Accessibility
- Mobile responsiveness
- Premium corporate design standards

Do not rewrite unnecessarily.

First identify:
1. Problems
2. Risks
3. Improvements

Then provide the recommended solution.
```

---

# PREMIUM DESIGN REVIEW PROMPT

Use for UI/UX decisions.

```
Review this design from the perspective of:

- Premium logistics website designer
- Customer conversion specialist
- Brand strategist

Evaluate:

Trust perception
Visual hierarchy
Customer journey
CTA placement
Mobile experience
Professional appearance

The objective is not decoration.

The objective is increasing customer confidence and enquiries.
```

---

# HOMEPAGE REVIEW PROMPT

```
Review the homepage customer journey.

Analyse:

Hero section
Trust indicators
CTA hierarchy
Service presentation
Customer confidence
Conversion flow

Ask:

Can a first-time Nigerian importer understand:
- Who we are?
- What we do?
- Why trust us?
- What should they do next?

Recommend improvements without damaging existing brand direction.
```

---

# CUSTOMER JOURNEY REVIEW PROMPT

```
Act as a customer experience designer.

Review the website from the perspective of a first-time visitor.

Identify:

- Points where customers may hesitate
- Confusing terminology
- Trust barriers
- Too much information
- Missing reassurance

Suggest improvements that increase enquiries.
```

---

# MARKETING COPY REVIEW PROMPT

```
Review this website copy as a logistics marketing expert.

Check:

- Customer-focused language
- Industry accuracy
- Trust building
- Clarity
- Conversion strength

Avoid technical company language.

Rewrite using customer outcome language.
```

---

# LOGISTICS TERMINOLOGY CHECK PROMPT

```
Review all logistics terminology.

Ensure accuracy between:

- Clearing agent
- Freight forwarder
- Shipping company
- Customs broker
- Logistics provider

Avoid wording that incorrectly positions Quick Freights.

The company must be represented accurately as a clearing and forwarding partner.
```

---

# WHATSAPP TEMPLATE REVIEW PROMPT

```
Review this WhatsApp communication template.

Evaluate:

- Customer psychology
- Trust level
- Required information
- Conversion probability
- Professional tone

Avoid asking for sensitive documents too early.

The first message should encourage conversation before commitment.
```

---

# SEO REVIEW PROMPT

```
Review this website SEO implementation.

Check:

Technical SEO
Page titles
Meta descriptions
Structured data
Keywords
Search intent
Local Nigerian logistics relevance

Recommend improvements while preserving existing architecture.
```

---

# PERFORMANCE REVIEW PROMPT

```
Audit this website performance.

Review:

Images
Fonts
CSS
JavaScript loading
Caching
Largest Contentful Paint
Mobile performance

Provide improvements ranked by impact.
```

---

# SECURITY REVIEW PROMPT

```
Review this implementation from a security perspective.

Check:

Input handling
External links
JavaScript safety
Data exposure
Future API considerations

Recommend practical improvements.
```

---

# DOCUMENTATION UPDATE PROMPT

```
Update this documentation to professional software project standards.

Requirements:

- Preserve historical decisions
- Remove outdated information
- Maintain consistency with current architecture
- Use clear professional language
- Include version information

Do not invent undocumented features.
```

---

# VERSION 2 PLANNING PROMPT

```
Analyse the current Version 1 platform.

Recommend Version 2 priorities based on:

Customer value
Business impact
Implementation complexity
Revenue potential
Operational improvement

Do not suggest features only because they are technically interesting.
```

---

# DEBUGGING PROMPT

```
Debug this issue systematically.

First:

1. Understand current architecture.
2. Identify possible causes.
3. Check existing source of truth.
4. Recommend the smallest reliable fix.

Avoid unnecessary rewrites.
```

---

# IMAGE DESIGN PROMPT

```
Review this image/design request as a premium brand designer.

Maintain:

- Quick Freights brand identity
- Navy and gold colour philosophy
- Nigerian market relevance
- Corporate logistics appearance

Avoid generic stock-image appearance.
```

---

# AI CHANGE REQUEST TEMPLATE

Use before requesting major modifications.

```
Project:
Quick Freights Global Limited Platform

Current State:

[Describe current behaviour]

Requested Change:

[Describe desired outcome]

Reason:

[Business/customer reason]

Files affected:

[List files]

Constraints:

[List restrictions]

Review before implementation.
```

---

# AI QUALITY CHECKLIST

Before accepting AI output verify:

□ Does it follow Source of Truth?

□ Does it respect previous decisions?

□ Does it improve customer experience?

□ Does it maintain premium design quality?

□ Does it avoid unnecessary complexity?

□ Is documentation updated if architecture changes?

---

# Important Rule

AI should function as:

A senior product advisor

-

A careful software engineer

-

A customer experience strategist

Not simply a code generator.

---

# Version History

## Version 1.0

Created after Version 1 production completion.

Purpose:

Provide reusable AI collaboration prompts and maintain consistent future development quality.
