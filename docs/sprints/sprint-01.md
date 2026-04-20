# HireTrace — Sprint 01

**Document Type:** Sprint Artifact
**Version:** 1.0
**Sprint:** 1 of 6
**Status:** Not started
**Start Date:** 06 May 2026
**End Date:** 19 May 2026
**Author:** Scrum Master / Developer
**Repository:** _(to be added)_

---

## Cross-References

| Document            | Relationship                                             |
| ------------------- | -------------------------------------------------------- |
| `product.md`        | Source of PBIs committed to this sprint                  |
| `plan.md`           | Sprint dates, capacity model, DoD                        |
| `spec.md`           | Acceptance criteria for every PBI in this sprint         |
| `features.md`       | Feature breakdown derived from this sprint's PBIs        |
| `tasks.md`          | Atomic dev tasks — worked from daily during this sprint  |
| `testing.md`        | Test cases written against spec AC; results logged there |
| `implementation.md` | Stack decisions and ADRs made during this sprint         |

---

## Sprint Goal

**The project infrastructure is live and a user can register and log in securely.**

At sprint close: the Next.js application is scaffolded, deployed to Vercel, connected to a Neon PostgreSQL database via Prisma, and a user can register with an email and password, log in, receive a JWT session cookie, and be blocked from protected routes without a valid session.

---

## Sprint Commitments

| PBI     | Item                                                | Size | Priority | Status |
| ------- | --------------------------------------------------- | ---- | -------- | ------ |
| PBI-007 | GitHub repository + branch strategy                 | S    | 🔴       | [x]    |
| PBI-001 | Next.js project scaffold with TypeScript + Tailwind | S    | 🔴       | [x]    |
| PBI-002 | PostgreSQL database setup on Neon                   | S    | 🔴       | [x]    |
| PBI-039 | HTTPS + security headers (Next.js config)           | S    | 🔴       | [x]    |
| PBI-046 | Notion workspace setup and public share             | S    | 🔴       | [x]    |
| PBI-003 | Prisma ORM setup + initial schema                   | M    | 🔴       | [x]    |
| PBI-037 | Input validation (Zod — server and client)          | M    | 🔴       | [x]    |
| PBI-004 | User registration (email/password + bcrypt)         | M    | 🔴       | [x]    |
| PBI-005 | User login + JWT session management                 | M    | 🔴       | [x]    |
| PBI-006 | Protected route middleware                          | S    | 🔴       | [x]    |
| PBI-008 | Vercel deployment (dev environment)                 | S    | 🔴       | [x]    |

**Status markers:** `[ ]` Not started · `[~]` In progress · `[x]` Done · `[!]` Blocked

**Total PBIs:** 11 · **S:** 7 · **M:** 4 · **L:** 0
**Estimated dev hours:** ~19.5 hrs · **Available dev capacity:** 11 hrs/sprint
**Note:** Sprint 1 is tight by raw sizing. PBI-046 (Notion) and PBI-007 (GitHub) are already complete per pre-sprint setup — this frees approximately 3 hours of sprint capacity.

---

## Capacity & Schedule

| Week   | Dates          | Focus                                       |
| ------ | -------------- | ------------------------------------------- |
| Week 3 | 06–12 May 2026 | PBI-001, PBI-002, PBI-003, PBI-039, PBI-037 |
| Week 4 | 13–19 May 2026 | PBI-004, PBI-005, PBI-006, PBI-008          |

**Sprint ceremonies:**

| Ceremony              | Date        | Output                                           |
| --------------------- | ----------- | ------------------------------------------------ |
| Sprint Planning       | 06 May 2026 | This document confirmed, tasks.md activated      |
| Mid-sprint checkpoint | 12 May 2026 | Progress review; overflow rule applied if needed |
| Sprint Review         | 19 May 2026 | All PBIs reviewed against AC                     |
| Sprint Retrospective  | 19 May 2026 | Retro notes written in §Retrospective below      |

---

## Daily Log

Use this section to record what was worked on each day. One line per session is sufficient.

| Date    | PBIs Worked | Notes |
| ------- | ----------- | ----- |
| 19 Apr  | PBI-007     | Done  |
| PBI-001 | Done        |
| PBI-002 | Done        |
| PBI-039 | Done        |
| PBI-046 | Done        |
| PBI-003 | Done        |
| PBI-037 | Done        |
| PBI-004 | Done        |
| PBI-005 | Done        |
| PBI-006 | Done        |
| PBI-008 | Done        |

---

## Blocked Items

Record any blocked PBIs here immediately. Do not leave a block undocumented.

| PBI | Blocked Since | Reason | Resolution |
| --- | ------------- | ------ | ---------- |
| —   | —             | —      | —          |

---

## Mid-Sprint Checkpoint (12 May 2026)

**Date completed:** _(fill at checkpoint)_

| PBI     | Status at Checkpoint | On Track? |
| ------- | -------------------- | --------- |
| PBI-007 | Completed            | Yes       |
| PBI-001 | Completed            | Yes       |
| PBI-002 | Completed            | Yes       |
| PBI-039 | Completed            | Yes       |
| PBI-046 | Completed            | Yes       |
| PBI-003 | Completed            | Yes       |
| PBI-037 | Completed            | Yes       |
| PBI-004 | Completed            | Yes       |
| PBI-005 | Completed            | Yes       |
| PBI-006 | Completed            | Yes       |
| PBI-008 | Completed            | Yes       |

**Overflow decision:** _(none / list PBI moved to Sprint 2 with reason)_
No overflow; all PBIs completed

---

## Sprint Review (19 May 2026)

**Date completed:** _(fill at review)_
20 Apr 2026

### PBI Completion

| PBI     | Item                                                | Done? | Notes |
| ------- | --------------------------------------------------- | ----- | ----- |
| PBI-007 | GitHub repository + branch strategy                 | [x]   |       |
| PBI-001 | Next.js project scaffold with TypeScript + Tailwind | [x]   |       |
| PBI-002 | PostgreSQL database setup on Neon                   | [x]   |       |
| PBI-039 | HTTPS + security headers (Next.js config)           | [x]   |       |
| PBI-046 | Notion workspace setup and public share             | [x]   |       |
| PBI-003 | Prisma ORM setup + initial schema                   | [x]   |       |
| PBI-037 | Input validation (Zod — server and client)          | [x]   |       |
| PBI-004 | User registration (email/password + bcrypt)         | [x]   |       |
| PBI-005 | User login + JWT session management                 | [x]   |       |
| PBI-006 | Protected route middleware                          | [x]   |       |
| PBI-008 | Vercel deployment (dev environment)                 | [x]   |       |

### Sprint Goal Met?

- [x] Yes — sprint goal achieved in full
- [ ] Partial — sprint goal partially met (explain below)
- [ ] No — sprint goal not met (explain below)

**Notes:** _(fill at review)_

### Velocity

| Metric            | Value |
| ----------------- | ----- |
| PBIs committed    | 11    |
| PBIs completed    | 11    |
| PBIs carried over | 0     |
| S completed       | 7     |
| M completed       | 4     |

---

## Sprint Retrospective (19 May 2026)

**Date completed:** _(fill at retro)_
21 Apr 2026

### What went well?

_(fill at retro — 2–4 bullet points)_

### What didn't go well?

_(fill at retro — 2–4 bullet points)_

### What will change in Sprint 2?

_(fill at retro — 1–3 actionable changes)_

### Retro insight for LinkedIn Post 10

_(fill at retro — 1–2 sentences distilling the sharpest lesson from this sprint. This becomes the core of Post 10.)_

---

## Sprint Close Checklist

Complete before marking this sprint Closed in `plan.md`.

- [ ] All committed PBIs marked `[x]` or formally moved to Sprint 2 with reason documented
- [ ] `product.md` PBI statuses updated
- [ ] Sprint Review section completed
- [ ] Sprint Retrospective section completed
- [ ] LinkedIn Post 10 retro insight captured above
- [ ] LinkedIn carousel (Post 11) slides 5 and 6 filled in
- [ ] Notion Sprint Board updated — Sprint 1 marked ✅ Closed
- [ ] Notion Changelog entry added for Sprint 1
- [ ] `sprint-01.md` committed to `/docs/sprints/`
- [ ] `plan.md` Sprint Summary Table updated with close date

---

_sprint-01.md v1.0 — April 17, 2026 — HireTrace_
_This document is the live tracking artifact for Sprint 1. Update it daily. It is the source of truth for sprint progress, blocks, and retrospective output._
