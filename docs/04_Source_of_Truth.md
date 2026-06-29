# 04 — Source of Truth

**Title:** QuickFreights Platform — Source of Truth
**Version:** 1.1.2
**Status:** Approved with Enhancements
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`02_Engineering_Constitution.md`

### Child Documents

- `05_Coding_Standards.md`

### References

- `00_Project_Blueprint.md` — Vision and scope
- `01_System_Architecture.md` — Where these values are used

---

## Authority

This document is the single authoritative source for every value,
constant, rule, and configuration in the QuickFreights Platform.

If a value appears in code but not in this document, this document
must be updated. If a value in code conflicts with this document,
this document takes precedence.

**No value shall be duplicated between this document and any other file.**

---

## Scope

This document stores project-wide constants, business rules, and
configuration values that are shared across multiple modules.

It SHALL NOT contain:

- Implementation logic
- Architecture decisions
- Coding standards
- Workflow descriptions
- Temporary values

Those belong in their respective governing documents.

---

## Configuration Categories

The Source of Truth contains five categories of information:

1. **Business Identity** — Company details, offices, contact information
2. **Business Rules** — Statuses, validation rules, tracking ID format
3. **Technical Configuration** — Sheet names, folder names, API endpoints
4. **User Interface Standards** — Colors, typography, breakpoints
5. **Integration Configuration** — SMS settings, file upload rules

Every new shared value must belong to one of these categories.

---

## 1. Company Identity

| Property           | Value                                        |
| ------------------ | -------------------------------------------- |
| **Company Name**   | Quick Freights Global Limited                |
| **Parent Company** | Bondex Bridge Multinational Terminal Limited |
| **RC Number**      | 8106184                                      |
| **Tagline**        | Very Fast Delivery                           |
| **Official Email** | reception.quickfreightglobal@gmail.com       |

---

## 2. Office Locations

### Onitsha Office (Branch)

| Property           | Value                           |
| ------------------ | ------------------------------- |
| **Address Line 1** | 3rd Floor, Right Wing, D1 Block |
| **Address Line 2** | Eagle Plaza, 56 Bida Road       |
| **Area**           | Fege                            |
| **City**           | Onitsha                         |
| **State**          | Anambra State                   |
| **Country**        | Nigeria                         |

### Port Harcourt Office (Corporate)

| Property     | Value                          |
| ------------ | ------------------------------ |
| **Location** | Port Harcourt Corporate Office |
| **Hub**      | Onne Port                      |
| **State**    | Rivers State                   |
| **Country**  | Nigeria                        |

---

## 3. Phone Numbers

| Label                         | Number        | Format        |
| ----------------------------- | ------------- | ------------- |
| **Primary**                   | 08063388230   | Local         |
| **Secondary**                 | 08037883339   | Local         |
| **Tertiary**                  | 08036660493   | Local         |
| **Port Harcourt**             | 09168611825   | Local         |
| **International (Primary)**   | 2348063388230 | International |
| **International (Secondary)** | 2348037883339 | International |
| **International (Tertiary)**  | 2348036660493 | International |

---

## 4. Brand Colors

| Name           | Hex Code  | CSS Variable   | Usage                                 |
| -------------- | --------- | -------------- | ------------------------------------- |
| **Navy Blue**  | `#0A1F3F` | `--navy`       | Headers, footers, primary backgrounds |
| **Navy Light** | `#132D56` | `--navy-light` | Hover states                          |
| **Navy Dark**  | `#060F20` | `--navy-dark`  | Footer, mobile menu                   |
| **Gold**       | `#DAA520` | `--gold`       | Primary buttons, accents, borders     |
| **Gold Light** | `#F0D060` | `--gold-light` | Highlights                            |
| **Gold Dark**  | `#B8860B` | `--gold-dark`  | Button hover states                   |
| **White**      | `#FFFFFF` | `--white`      | Main background                       |
| **Light Grey** | `#F5F6F8` | `--light-grey` | Section backgrounds                   |
| **Grey**       | `#6B7280` | `--grey`       | Body text                             |
| **Success**    | `#10B981` | `--success`    | Success messages                      |
| **Error**      | `#EF4444` | `--error`      | Error messages, required indicators   |

---

## 5. Typography

| Property           | Value                                                             |
| ------------------ | ----------------------------------------------------------------- |
| **Primary Font**   | Inter                                                             |
| **Fallback Stack** | -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif |
| **Font Source**    | Google Fonts                                                      |
| **Base Size**      | 16px                                                              |
| **Heading Weight** | 700-800                                                           |
| **Body Weight**    | 400-500                                                           |

---

## 6. Shipment Statuses

These are the only valid statuses for a shipment.

| Status           | Description                                    | SMS Trigger? |
| ---------------- | ---------------------------------------------- | ------------ |
| **Received**     | Submission received, awaiting processing       | No           |
| **In Transit**   | Cargo is moving toward destination             | No           |
| **Customs Hold** | Held by customs for inspection                 | No           |
| **Cleared**      | Customs clearance complete, ready for delivery | **Yes**      |
| **Delivered**    | Cargo delivered to customer                    | No           |

The status dropdown in the `Shipment Status` sheet must use exactly
these values. No other statuses are valid.

---

## 7. Tracking ID Format

| Property               | Value                                                           |
| ---------------------- | --------------------------------------------------------------- |
| **Prefix**             | `QF`                                                            |
| **Separator**          | `-`                                                             |
| **Format**             | `QF-YYYY-NNN`                                                   |
| **Example**            | `QF-2026-001`                                                   |
| **Year Component**     | Current year (4 digits)                                         |
| **Sequence Component** | Zero-padded 3-digit number (001-999)                            |
| **Generation Rule**    | Find highest existing sequence for current year, increment by 1 |

---

## 8. SMS Configuration

| Property                 | Value                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Provider**             | Payless Bulk SMS Nigeria                                                                                        |
| **Sender ID**            | QuickFreigh (pending approval)                                                                                  |
| **Max Sender ID Length** | 11 characters                                                                                                   |
| **API Endpoint (Send)**  | `GET https://app.paylessbulksms.com.ng/api/http/sms/send`                                                       |
| **Auth Method**          | `api_token` as query parameter                                                                                  |
| **Recipient Format**     | International (234XXXXXXXXXX)                                                                                   |
| **SMS Template**         | `Dear Customer, shipment {TRACKING_ID} has cleared Customs. Quick Freights will contact you soon for delivery.` |

---

## 9. Google Apps Script Configuration

| Property               | Value                       |
| ---------------------- | --------------------------- |
| **Spreadsheet Name**   | `QuickFreights_Database`    |
| **Submissions Sheet**  | `Submissions`               |
| **Status Sheet**       | `Shipment Status`           |
| **SMS Log Sheet**      | `SMS Log`                   |
| **Attachment Folder**  | `QuickFreights_Attachments` |
| **Web App Access**     | Anyone                      |
| **Web App Execute As** | Me (script owner)           |
| **Secrets Storage**    | ScriptProperties            |

---

## 10. File Upload Rules

| Property             | Value                                      |
| -------------------- | ------------------------------------------ |
| **Max File Size**    | 5 MB (5,242,880 bytes)                     |
| **Allowed Types**    | PDF, JPG, JPEG, PNG, DOC, DOCX             |
| **Storage Location** | Google Drive (`QuickFreights_Attachments`) |
| **File Naming**      | `{TrackingID}_{OriginalFilename}`          |
| **Access Control**   | Anyone with link can view                  |

---

## 11. Phone Validation Rules

| Rule                           | Description                                                             |
| ------------------------------ | ----------------------------------------------------------------------- |
| **Local Format**               | Starts with `0`, followed by a valid Nigerian mobile prefix             |
| **International Format**       | Starts with `+234` or `234`, followed by a valid Nigerian mobile prefix |
| **Normalized Format**          | `234XXXXXXXXXX` (no leading +, no spaces)                               |
| **Length After Normalization** | 13 digits (234 + 10 digits)                                             |

**Note:** Nigerian mobile prefixes are subject to change by the Nigerian
Communications Commission (NCC). The validation implementation should
accept common prefixes and be updated if new prefixes are introduced.

---

## 12. Website Pages

| Page           | Filename        | Route            |
| -------------- | --------------- | ---------------- |
| **Home**       | `index.html`    | `/`              |
| **About**      | `about.html`    | `/about.html`    |
| **Services**   | `services.html` | `/services.html` |
| **Contact**    | `contact.html`  | `/contact.html`  |
| **Submit B/L** | `track.html`    | `/track.html`    |

---

## 13. Navigation Labels

| Label      | Target          |
| ---------- | --------------- |
| Home       | `index.html`    |
| About      | `about.html`    |
| Services   | `services.html` |
| Contact    | `contact.html`  |
| Submit B/L | `track.html`    |

---

## 14. CSS Breakpoints

| Name             | Width          | Target                       |
| ---------------- | -------------- | ---------------------------- |
| **Mobile**       | Default (0px+) | All devices                  |
| **Small Tablet** | 576px+         | Larger phones, small tablets |
| **Tablet**       | 768px+         | Tablets                      |
| **Desktop**      | 992px+         | Laptops and desktops         |

---

## 15. API Response Format

All API responses from the Application Layer SHALL use this format:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

Version History
Version Date Changes
1.0.0 2026-06-29 Initial Source of Truth
1.1.0 2026-06-29 Added Sections 11-15
1.1.1 2026-06-29 Updated SMS Template
1.1.2 2026-06-29 Updated Port Harcourt phone number to 09168611825
text

---

### ✅ Changes Applied

| Change                  | Old                                                                                                                                                                             | New                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **Version**             | `1.1.1`                                                                                                                                                                         | `1.1.2`             |
| **Port Harcourt phone** | `08063888230`                                                                                                                                                                   | `09168611825`       |
| **International entry** | No change needed — there was no separate International row for the Port Harcourt number in the original table (only Primary, Secondary, Tertiary had International equivalents) | —                   |
| **Version History**     | —                                                                                                                                                                               | Added `1.1.2` entry |

The old Port Harcourt number `08063888230` has been completely removed and replaced with `09168611825`. The International entries (Primary, Secondary, Tertiary) remain unchanged since they correspond to the main office lines, not the Port Harcourt number.
