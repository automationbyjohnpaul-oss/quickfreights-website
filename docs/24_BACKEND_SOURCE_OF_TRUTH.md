## Tracking ID Standard

### Public Tracking ID

Format:

QFG-MM-YY-XXXXXX

Example:

QFG-07-26-A7X4K2

### Components

QFG
Quick Freights Global identifier.

MM
Submission month.

YY
Submission year.

XXXXXX
Six-character uppercase alphanumeric identifier generated using a cryptographically secure random source.

### Rules

- Generated only by the backend.
- Never edited after creation.
- Never reused.
- Must be globally unique.
- Used for all customer communication.
- Must not reveal submission volume.

### Internal Submission ID

A separate auto-increment numeric identifier is maintained internally for sequencing, auditing, reporting, and diagnostics. It is never exposed to customers.
