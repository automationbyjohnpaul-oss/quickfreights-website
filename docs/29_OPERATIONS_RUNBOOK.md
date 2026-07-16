Here is the updated `29_OPERATIONS_RUNBOOK.md` with all the suggested improvements applied:

```markdown
# 29 — OPERATIONS RUNBOOK

## Quick Freights Global Limited Platform

**Document Version:** 3.0
**Applies To:** Backend V2 (v8.1)
**Last Updated:** July 2026

---

## Purpose

This document provides the operational procedures required to maintain, deploy, monitor, and recover the Quick Freights Platform backend in production.

It is intended for administrators and future developers responsible for system maintenance.

---

## Operational Philosophy

The Quick Freights Platform is maintained using the following principles:

- Documentation before implementation
- Single Source of Truth
- Measured performance over assumptions
- Stable production releases
- AI-assisted maintainability
- Minimal architectural change after production freeze

Operational reliability takes precedence over unnecessary optimisation.

---

## Production Environment

### Frontend

- GitHub Pages
- HTML5
- CSS3
- Vanilla JavaScript

### Backend

- Google Apps Script (v8.1)
- Google Sheets
- Google Drive

### External Services

- Payless Bulk SMS

---

## Development Workflow

All development follows the workflow below:
```

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

````

Editing directly in the Apps Script browser editor is reserved for emergency fixes only.

---

## Deployment Procedure

### Step 1

Open the project in VS Code.

### Step 2

Complete development and testing.

### Step 3

Push changes.

```bash
clasp push
````

### Step 4

Create a version.

```bash
clasp version "Description of changes"
```

### Step 5

Update the production deployment.

```bash
clasp redeploy <DeploymentID> <VersionNumber>
```

### Step 6

Perform Post-Deployment Verification.

---

## Post-Deployment Verification

After every production deployment verify:

- ✅ Successful Bill of Lading submission
- ✅ Tracking ID generation
- ✅ Google Sheets record creation
- ✅ Google Drive attachment upload
- ✅ Shipment Status record creation
- ✅ Customer SMS (if enabled)
- ✅ Staff SMS (if enabled)
- ✅ No errors recorded in Error Log
- ✅ No unexpected execution failures

---

## Production Freeze Policy

Backend V2 (v8.1) is the approved production baseline.

Infrastructure changes should only be made to:

- Correct critical defects
- Address verified security issues
- Resolve measurable performance regressions
- Maintain compatibility with platform changes

New business functionality should build upon the existing architecture rather than redesign it.

---

## Git Workflow

Typical workflow:

```bash
git status
git add .
git commit -m "Describe changes"
git push
```

---

## Script Properties

Required properties:

| Property               | Purpose                 |
| ---------------------- | ----------------------- |
| `SPREADSHEET_ID`       | Primary database        |
| `SMS_API_TOKEN`        | Payless authentication  |
| `ATTACHMENT_FOLDER_ID` | Drive folder (optional) |

Never hardcode secrets into source code.

---

## Required Sheets

The spreadsheet must contain:

- Submissions
- Shipment Status
- SMS Log
- Error Log

---

## Required Google Drive Folder

```
QuickFreights_Attachments
```

**Maximum upload size:** 5 MB

---

## Routine Maintenance

### Daily

- Review Error Log sheet
- Verify SMS delivery (SMS Log sheet)

### Weekly

- Review deployment logs
- Verify Drive uploads
- Confirm Spreadsheet growth
- Check performance logs (if enabled)

### Monthly

- Review deployment history
- Review Script Properties
- Archive old logs if required
- Review Error Log trends

---

## Monitoring Checklist

Verify:

- ✅ Form accepts submissions
- ✅ Tracking IDs are generated
- ✅ Attachments upload successfully
- ✅ Sheets receive data
- ✅ SMS provider responds correctly
- ✅ No errors in Error Log sheet

---

## Performance Baseline

Measured production observations:

| Component              | Typical Behaviour                                                  |
| ---------------------- | ------------------------------------------------------------------ |
| Validation             | <100 ms                                                            |
| Tracking ID Generation | <100 ms                                                            |
| Google Sheets Write    | Typically <500 ms                                                  |
| Google Drive Upload    | Dependent on file size and Google Drive response                   |
| Total User Response    | Dominated by Google Apps Script runtime and infrastructure latency |

**Note**

Performance instrumentation confirmed that most end-user latency originates from the Google Apps Script Web App runtime, network conditions, and Google services rather than application logic.

Future optimisation efforts should therefore be evidence-driven and supported by performance measurements.

---

## Known Platform Constraints

The following are external limitations:

- Apps Script cold starts
- Google Drive upload latency
- Apps Script execution quotas
- SMS provider response time
- Google Sheets API limits

These cannot be completely eliminated within the current architecture.

---

## Backup Procedure

Before major releases:

1. Push code to GitHub
2. Create an Apps Script Version
3. Update deployment
4. Export spreadsheet backup if required

---

## Recovery Procedure

If production issues occur:

1. Review recent Apps Script executions
2. Check the Error Log sheet
3. Confirm Script Properties are present
4. Verify Spreadsheet accessibility
5. Verify Google Drive folder access
6. Confirm external SMS service availability
7. Review recent deployment history
8. Redeploy the previous stable version if required
9. Perform the full Post-Deployment Verification checklist before reopening production

---

## Emergency Rollback

If a deployment introduces a critical issue:

1. Identify the previous stable version
2. Redeploy that version
3. Perform Post-Deployment Verification
4. Notify stakeholders if applicable

---

## Common Issues

### Submission Fails

Check:

- Script Properties
- Spreadsheet access
- Validation rules
- Error Log sheet

### Attachments Fail

Check:

- Drive permissions
- Folder availability
- File size (max 5MB)
- MIME type (PDF, JPG, PNG)

### SMS Not Sent

Check:

- SMS_API_TOKEN
- Payless service availability
- SMS Log sheet

### Performance Degradation

Check:

- Apps Script execution time
- Google Sheets response time
- Drive upload time
- SMS provider response time
- Performance logs

---

## Production Rules

### Always:

- Develop in VS Code
- Version every production release
- Commit to Git before deployment
- Update documentation when architecture changes
- Test after deployment
- Perform Post-Deployment Verification

### Never:

- Store secrets in code
- Edit production directly unless emergency
- Bypass the SSOT architecture
- Skip testing before deployment

---

## Documentation Maintenance

Whenever architecture changes occur, update:

- CHANGELOG
- PROJECT HISTORY
- BACKEND SOURCE OF TRUTH
- BACKEND BUILD LOG
- BACKEND CERTIFICATION (if applicable)
- MODULE RESPONSIBILITIES
- BACKEND BASELINE
- OPERATIONS RUNBOOK
- RELEASE NOTES

Documentation updates form part of every production release.

---

## Debugging Tools

### Apps Script Execution Logs

View → Logs or Executions panel

### Error Log Sheet

Check for recorded errors

### Performance Logs

Enable `CONFIG.DEBUG.ENABLE_PERFORMANCE_LOGGING`

### SMS Log Sheet

Check SMS delivery status

---

## Future Operations

The following operational procedures will be added in future releases:

- Tracking administration
- Shipment status management
- Analytics monitoring
- Automated maintenance jobs
- Customer self-service operations

---

## Runbook Version Control

This runbook applies to Backend v8.1.

Any operational procedure introduced in future releases must:

- be documented,
- be version controlled,
- preserve existing production procedures unless officially superseded.

---

## Runbook Approval

This runbook defines the operational procedures for the Backend V2 production baseline.

All future maintenance should follow these procedures unless superseded by a newer approved operational document.

---

**Document Status:** Active (V3.0)

```

---

## Summary of Changes

| Change | Description |
|--------|-------------|
| **Performance Baseline** | Replaced hardcoded timings with variable behaviour descriptions |
| **Production Freeze Policy** | Added new section |
| **Post-Deployment Verification** | Added comprehensive checklist |
| **Attachment Size** | Updated from 10MB to 5MB |
| **Recovery Procedure** | Expanded with more detailed steps |
| **Documentation Maintenance** | Added new section |
| **Operational Philosophy** | Added new section |
| **Runbook Version Control** | Added new section |
```
