# 08 — Glossary

**Title:** QuickFreights Platform — Glossary
**Version:** 1.0.0
**Status:** Draft
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`00_Project_Blueprint.md`

### References

- `01_System_Architecture.md` — Where these terms are used
- `04_Source_of_Truth.md` — Authoritative values

---

## Authority

This document defines the canonical terminology for the QuickFreights
Platform.

When a term is used in code, documentation, or discussion, it SHALL
carry the meaning defined here.

---

## 1. Purpose

The Glossary exists to answer one question:

> What does this term mean in the context of this project?

It prevents miscommunication between human contributors and ensures
AI assistants use consistent terminology.

---

## 2. Business Terms

| Term                     | Definition                                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **Bill of Lading (B/L)** | A legal document issued by a carrier to a shipper that details the type, quantity, and destination of goods being carried. |
| **Cargo**                | Goods or merchandise carried by a ship, plane, or truck.                                                                   |
| **Clearing**             | The process of obtaining customs clearance for imported goods.                                                             |
| **Cleared**              | A shipment status indicating customs clearance is complete and cargo is ready for delivery.                                |
| **Consignment**          | A batch of goods sent from one party to another.                                                                           |
| **Container**            | A standardized shipping container identified by a unique container number.                                                 |
| **Customer**             | An importer or exporter who submits a Bill of Lading for processing.                                                       |
| **Customs**              | The government agency responsible for regulating goods entering or leaving a country.                                      |
| **Delivery**             | The act of transporting cleared cargo from the port to the customer's warehouse.                                           |
| **FCL**                  | Full Container Load — a single shipment that fills an entire container.                                                    |
| **Freight Forwarding**   | The coordination and shipment of goods from one place to another via multiple carriers.                                    |
| **LCL**                  | Less than Container Load — a shipment that shares container space with other shipments.                                    |
| **Onne Port**            | A major seaport in Rivers State, Nigeria, serving the eastern trade corridor.                                              |
| **Port Clearance**       | The complete process of obtaining all necessary approvals for cargo to leave the port.                                     |
| **Shipment**             | A consignment of goods being transported from origin to destination.                                                       |
| **Tracking ID**          | A unique identifier assigned to each submission (format: QF-YYYY-NNN).                                                     |

---

## 3. Technical Terms

| Term                      | Definition                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **ADR**                   | Architecture Decision Record — a documented architectural decision stored in `06_Decision_Log.md`.                |
| **Application Layer**     | The layer responsible for orchestrating requests and routing data between Presentation and Business Domain.       |
| **Apps Script**           | Google Apps Script — the serverless runtime used for the Application, Business Domain, and Infrastructure layers. |
| **Business Domain Layer** | The layer containing all business rules, validation logic, and domain-specific operations.                        |
| **CSS Custom Properties** | Variables defined in `:root` that store design tokens (colors, spacing, fonts).                                   |
| **Dependency Rule**       | The architectural rule that dependencies always point downward; lower layers never depend on higher layers.       |
| **GitHub Pages**          | The hosting service used to serve the static website files.                                                       |
| **Infrastructure Layer**  | The layer providing storage, file handling, logging, and external service communication.                          |
| **LockService**           | A Google Apps Script service that prevents race conditions during concurrent operations.                          |
| **Logical Architecture**  | The conceptual organization of the system into layers, independent of physical implementation.                    |
| **Module**                | A self-contained unit of code with a single responsibility and clearly defined inputs and outputs.                |
| **Physical Architecture** | The actual deployment of the system — where each logical layer runs.                                              |
| **Presentation Layer**    | The layer responsible for displaying information and collecting user input (HTML, CSS, JavaScript).               |
| **ScriptProperties**      | A Google Apps Script service for storing configuration values and secrets securely.                               |
| **SSOT**                  | Single Source of Truth — the principle that every value lives in exactly one place.                               |
| **Web App**               | A Google Apps Script deployment that accepts HTTP requests from the website.                                      |

---

## 4. Platform-Specific Terms

| Term                          | Definition                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| **Blueprint**                 | `00_Project_Blueprint.md` — the document defining the platform's vision and scope. |
| **Constitution**              | `02_Engineering_Constitution.md` — the governing engineering standards.            |
| **Journey**                   | `00A_Project_Journey.md` — the living document tracking project progress.          |
| **QuickFreights_Database**    | The Google Spreadsheet containing all shipment and operational data.               |
| **QuickFreights_Attachments** | The Google Drive folder storing customer-uploaded documents.                       |
| **Shipment Status**           | One of five valid states: Received, In Transit, Customs Hold, Cleared, Delivered.  |
| **Source of Truth**           | `04_Source_of_Truth.md` — the canonical location for all shared values.            |
| **SMS Log**                   | The sheet recording all SMS notification attempts and results.                     |

---

## 5. Acronyms

| Acronym  | Full Form                                              |
| -------- | ------------------------------------------------------ |
| **ADR**  | Architecture Decision Record                           |
| **B/L**  | Bill of Lading                                         |
| **CAC**  | Corporate Affairs Commission (Nigeria)                 |
| **DRY**  | Don't Repeat Yourself                                  |
| **FCL**  | Full Container Load                                    |
| **KPI**  | Key Performance Indicator                              |
| **LCL**  | Less than Container Load                               |
| **NFR**  | Non-Functional Requirement                             |
| **RC**   | Registration Certificate (company registration number) |
| **SRP**  | Single Responsibility Principle                        |
| **SSOT** | Single Source of Truth                                 |
| **VCS**  | Version Control System                                 |

---

## 6. Version History

| Version | Date       | Changes          |
| ------- | ---------- | ---------------- |
| 1.0.0   | 2026-06-29 | Initial Glossary |
