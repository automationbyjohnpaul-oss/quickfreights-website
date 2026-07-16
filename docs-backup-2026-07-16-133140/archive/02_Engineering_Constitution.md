markdown

# 02 — Engineering Constitution

**Title:** QuickFreights Platform — Engineering Constitution
**Version:** 1.1.0
**Status:** Approved with Enhancements
**Owner:** Quick Freights Global Limited
**Last Updated:** 2026-06-29

---

## Document Relationships

### Parent Document

`01_System_Architecture.md`

### Child Documents

- `03_AI_Engineering_Guide.md`
- `04_Source_of_Truth.md`
- `05_Coding_Standards.md`

### References

- `00_Project_Blueprint.md` — Guiding Principles
- `06_Decision_Log.md` — Constitutional amendments

---

## Authority

This document defines the engineering rules for the QuickFreights Platform.
All implementation, review, and architectural decisions must comply with
these principles.
Violations must be justified and recorded in `06_Decision_Log.md`.

---

## Normative Language

The following terms have specific meanings throughout this document:

| Term          | Meaning                                                  |
| ------------- | -------------------------------------------------------- |
| **SHALL**     | Mandatory. Must be followed.                             |
| **SHALL NOT** | Prohibited. Must not occur.                              |
| **SHOULD**    | Strong recommendation. Exceptions require justification. |
| **MAY**       | Optional. Allowed but not required.                      |

---

## 1. Purpose

The Engineering Constitution exists to ensure that every contributor —
human or AI — makes consistent, maintainable, and defensible engineering
decisions.

It answers the question:

> What rules govern how we build this platform?

---

## 2. Principle Priority

When two principles conflict, they SHALL be applied in the following order:

1. **Security** — Protect the system and its users.
2. **Correctness** — The software must work correctly.
3. **Maintainability** — The software must remain changeable.
4. **Single Source of Truth** — Every value has one home.
5. **Simplicity** — Prefer the simplest solution that meets requirements.
6. **Performance** — Optimize only when measured and necessary.
7. **Developer Convenience** — Never at the expense of higher priorities.

Higher-priority principles take precedence unless an approved
architectural decision states otherwise.

---

## 3. Core Principles

### 3.1 Single Source of Truth (SSOT)

Every value, rule, constant, and configuration SHALL live in exactly one place.

- Phone numbers → `04_Source_of_Truth.md`
- Company name → `04_Source_of_Truth.md`
- API endpoints → `04_Source_of_Truth.md`
- Validation rules → `04_Source_of_Truth.md`
- Status definitions → `04_Source_of_Truth.md`

**Violation:** Duplicating a value in code when it exists in the Source of Truth.
**Enforcement:** Code review. Duplication SHALL be flagged and corrected before merge.

---

### 3.2 Single Responsibility Principle (SRP)

Every module, function, and document SHALL have one reason to change.

Module boundaries are defined by `01_System_Architecture.md` and SHALL NOT
be redefined during implementation.

- A validation module validates. It does not send SMS.
- A storage module stores. It does not validate phone numbers.
- A notification module notifies. It does not generate tracking IDs.

**Violation:** A module that handles both validation and storage.
**Enforcement:** Architecture review. Modules with multiple responsibilities SHALL be split.

---

### 3.3 Don't Repeat Yourself (DRY)

No business rule, validation logic, or configuration SHALL be duplicated.

- If a rule changes, it changes in one place.
- If a constant updates, it updates everywhere automatically.

**Violation:** The same validation logic appearing in two files.
**Enforcement:** Code review. Duplication SHALL be consolidated into shared modules.

---

### 3.4 Convention Over Configuration

Follow established patterns. SHALL NOT invent new patterns without reason.

- File naming follows the project standard.
- Document numbering follows the established prefix system.
- Commit messages follow a consistent format.
- Folder structure matches the architecture.

**Violation:** Creating a new naming convention that contradicts existing standards.
**Enforcement:** Review against `05_Coding_Standards.md`.

---

### 3.5 Modular Architecture

Every component SHALL be self-contained with clearly defined inputs and outputs.

- Modules expose a public interface.
- Internal implementation details are hidden.
- Dependencies are explicit.

**Violation:** A module reaching into another module's internal state.
**Enforcement:** Architecture review. Tight coupling SHALL be flagged.

---

### 3.6 Explicit Over Implicit

Behavior that is not obvious from reading the code SHALL be documented.

- Side effects are documented.
- Assumptions are stated.
- Defaults are explained.

**Violation:** A function that modifies global state without documentation.
**Enforcement:** Code review. Implicit behavior SHALL require explicit documentation.

---

### 3.7 Documentation-Driven Development

Documentation SHALL be created or updated before implementation.

The expected workflow is:
Requirement
│
▼
Documentation
│
▼
Architecture Review
│
▼
Implementation
│
▼
Testing
│
▼
Deployment
│
▼
Documentation Update (if behavior changed)

text

**Violation:** Implementing a feature without corresponding documentation updates.
**Enforcement:** Feature SHALL NOT be considered complete until documentation is updated.

---

### 3.8 Security by Default

Every component SHALL be secure from its first implementation.

- Secrets SHALL NOT be in source code.
- Input SHALL always be validated.
- Output SHALL always be encoded.
- Least privilege SHALL always be applied.
- Authentication and authorization SHALL be considered from day one.

**Violation:** An API token committed to the repository.
**Enforcement:** Immediate remediation. Token SHALL be revoked and rotated.

---

### 3.9 Build for Long-Term Growth

Design decisions SHALL consider the platform six months, one year,
and five years from now.

- Folder structure supports multiple applications.
- Architecture survives technology changes.
- Documentation outlives individual contributors.
- Naming conventions scale with project size.

**Violation:** Hardcoding a temporary solution without a migration path.
**Enforcement:** Temporary solutions SHALL be documented with an expiry plan.

---

### 3.10 Optimize for Understanding

Code SHALL be written for humans first, machines second, and AI third.

- Names describe intent.
- Functions are small and focused.
- Complexity is justified.
- Comments explain why, not what.

**Violation:** A function named `process()` with 200 lines.
**Enforcement:** Code review. Unclear code SHALL be refactored before merge.

---

## 4. AI Recommendations

AI-generated output is a proposal, not an authoritative project decision.

All significant architectural or business changes SHALL be evaluated against:

1. `00_Project_Blueprint.md`
2. `01_System_Architecture.md`
3. `02_Engineering_Constitution.md`
4. `04_Source_of_Truth.md`
5. `06_Decision_Log.md`

AI assistance does not supersede project governance.

---

## 5. Decision-Making Framework

When faced with an engineering decision, apply these questions in order:

1. Does the Source of Truth already define this?
2. Does the System Architecture specify where this belongs?
3. Does this Constitution provide guidance?
4. Has this decision been made before? (Check `06_Decision_Log.md`)
5. Does this increase or decrease maintainability?
6. Will this be understandable six months from now?

If answers are unclear, escalate to architecture review before implementing.

---

## 6. Exceptions

Exceptions to this Constitution SHALL be permitted only when:

- A business requirement cannot otherwise be met.
- The exception is documented.
- The long-term impact is evaluated.
- The decision is recorded in `06_Decision_Log.md`.

Exceptions are expected to be rare.

---

## 7. Compliance Responsibility

Compliance is a shared responsibility.

- Human engineers SHALL review their own work.
- AI assistants SHALL review their generated output.
- The project maintainer SHALL make the final compliance decision.
- The Architect SHALL review constitutional compliance during architecture reviews.

---

## 8. Violation Handling

| Severity     | Example                     | Consequence                                  |
| ------------ | --------------------------- | -------------------------------------------- |
| **Critical** | Secret in source code       | Immediate fix. Token rotation.               |
| **High**     | Duplicated business logic   | Must be consolidated before next feature.    |
| **Medium**   | Naming convention violation | Flagged. Fixed in next refactor cycle.       |
| **Low**      | Missing comment             | Noted. Addressed when file is next modified. |

---

## 9. Amendment Process

This Constitution SHALL be amended through the following process:

1. Proposal documented in `06_Decision_Log.md`.
2. Review by project maintainer.
3. If approved, Constitution is updated.
4. Version is incremented according to the versioning policy.
5. All contributors are notified of the change.

Constitutional amendments SHOULD be rare and deliberate.

---

## 10. Versioning

Changes to this Constitution SHALL:

- Increment the version (Major for principle changes, Minor for additions, Patch for clarifications).
- Record the change in Version History.
- Record the decision in `06_Decision_Log.md`.
- Update affected documentation if required.

---

## 11. Relationship to Other Documents

| Document                     | Relationship                                                |
| ---------------------------- | ----------------------------------------------------------- |
| `00_Project_Blueprint.md`    | Defines the vision this Constitution serves                 |
| `01_System_Architecture.md`  | Defines the structure this Constitution governs             |
| `03_AI_Engineering_Guide.md` | Applies these principles to AI-assisted development         |
| `04_Source_of_Truth.md`      | Implements SSOT — the most fundamental principle            |
| `05_Coding_Standards.md`     | Translates these principles into specific code rules        |
| `06_Decision_Log.md`         | Records when principles are applied, challenged, or amended |

---

## 12. Version History

| Version | Date       | Changes                                                                                                                                                              |
| ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0.0   | 2026-06-29 | Initial Engineering Constitution                                                                                                                                     |
| 1.1.0   | 2026-06-29 | Added principle priority, normative language, exceptions policy, AI recommendations section, compliance responsibility, versioning policy, strengthened DDD workflow |
