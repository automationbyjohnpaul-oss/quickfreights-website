# 29_OPERATIONS_RUNBOOK.md

**Project:** Quick Freights Platform
**Company:** Quick Freights Global Limited
**Document Version:** 1.0.0
**Applies To:** Backend V2 Baseline
**Last Updated:** July 15, 2026

---

# Purpose

This document provides the operational procedures required to maintain, deploy, monitor, and recover the Quick Freights Platform backend in production.

It is intended for administrators and future developers responsible for system maintenance.

---

# Production Environment

## Frontend

- GitHub Pages
- HTML5
- CSS3
- Vanilla JavaScript

---

## Backend

- Google Apps Script
- Google Sheets
- Google Drive

---

## External Services

- Payless Bulk SMS

---

# Development Workflow

All development follows the workflow below.

```text
VS Code

↓

Git Commit

↓

clasp push

↓

Create Version

↓

Deploy

↓

Production
```

Editing directly in the Apps Script browser editor is reserved for emergency fixes only.

---

# Deployment Procedure

## Step 1

Open the project in VS Code.

---

## Step 2

Complete development and testing.

---

## Step 3

Push changes.

```bash
clasp push
```

---

## Step 4

Create a version.

```bash
clasp version "Description of changes"
```

---

## Step 5

Update the production deployment.

```bash
clasp redeploy <DeploymentID> <VersionNumber>
```

---

## Step 6

Verify deployment.

Check:

- Form submission
- Tracking ID generation
- Google Sheets entry
- Drive upload
- SMS delivery

---

# Git Workflow

Typical workflow:

```bash
git status

git add .

git commit -m "Describe changes"

git push
```

---

# Script Properties

Required properties:

| Property       | Purpose                |
| -------------- | ---------------------- |
| SPREADSHEET_ID | Primary database       |
| SMS_API_TOKEN  | Payless authentication |

Never hardcode secrets into source code.

---

# Required Sheets

The spreadsheet must contain:

- Submissions
- Shipment Status
- SMS Log
- Error Log

---

# Required Google Drive Folder

```
QuickFreights_Attachments
```

---

# Routine Maintenance

Weekly:

- Review Error Log
- Verify SMS delivery
- Confirm Drive uploads
- Confirm Spreadsheet growth

Monthly:

- Review deployment history
- Review Script Properties
- Archive old logs if required

---

# Monitoring Checklist

Verify:

- Form accepts submissions
- Tracking IDs are generated
- Attachments upload successfully
- Sheets receive data
- SMS provider responds correctly

---

# Performance Baseline

Expected timings.

| Operation        | Typical Time |
| ---------------- | -----------: |
| File Read        |       ~30 ms |
| Backend Request  |      13–14 s |
| Total Submission |         14 s |

These values represent the current Apps Script production baseline.

---

# Known Platform Constraints

The following are external limitations.

- Apps Script cold starts
- Google Drive upload latency
- Google Apps Script execution quotas
- SMS provider response time

These cannot be completely eliminated within the current architecture.

---

# Backup Procedure

Before major releases:

1. Push code to GitHub.
2. Create an Apps Script Version.
3. Update deployment.
4. Export spreadsheet backup if required.

---

# Recovery Procedure

If production fails:

1. Check recent deployment.
2. Review Apps Script Executions.
3. Review Error Log sheet.
4. Verify Script Properties.
5. Verify Spreadsheet accessibility.
6. Roll back to the previous deployment if necessary.

---

# Emergency Rollback

If a deployment introduces a critical issue:

1. Identify the previous stable version.
2. Redeploy that version.
3. Verify form submission.
4. Notify stakeholders if applicable.

---

# Common Issues

## Submission fails

Check:

- Script Properties
- Spreadsheet access
- Validation rules

---

## Attachments fail

Check:

- Drive permissions
- Folder availability
- File size
- MIME type

---

## SMS not sent

Check:

- SMS_API_TOKEN
- Payless service availability
- SMS Log sheet

---

## Duplicate Tracking IDs

Verify:

- Tracking module
- Submission sheet integrity

---

# Production Rules

Always:

- Develop in VS Code
- Version every production release
- Commit to Git before deployment
- Update documentation when architecture changes

Never:

- Store secrets in code
- Edit production directly unless performing an emergency fix
- Bypass the SSOT architecture

---

# Future Operations

The following operational procedures will be added in future releases:

- Tracking administration
- Shipment status management
- Analytics monitoring
- Automated maintenance jobs
- Customer self-service operations

---

# Runbook Approval

This runbook defines the operational procedures for the Backend V2 production baseline.

All future maintenance should follow these procedures unless superseded by a newer approved operational document.
