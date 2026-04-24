# HireTrace — Sprint 03

**Document Type:** Sprint Artifact
**Version:** 1.0
**Sprint:** 3 of 6
**Status:** In progress
**Start Date:** 23 April 2026
**End Date:** 29 April 2026
**Author:** Scrum Master / Developer
**Repository:** https://github.com/eonerhime/hiretrace

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

**The MVP is complete. Users can track contacts per application, set follow-up reminders, and see their pipeline state at a glance on the dashboard.**

At sprint close: contact tracking is functional, the overdue follow-up indicator is verified, the summary stats bar renders on the dashboard, the pipeline stage distribution is visible, general notes are available per application, and README.md is complete. Phase 1 MVP gate is cleared.

---

## Sprint Commitments

| PBI     | Item                                                  | Size | Priority | Status |
| ------- | ----------------------------------------------------- | ---- | -------- | ------ |
| PBI-017 | Contact data model (linked to application)            | M    | 🔴       | [ ]    |
| PBI-018 | Add / edit contact per application                    | M    | 🔴       | [ ]    |
| PBI-019 | Contact list view on application detail page          | S    | 🔴       | [ ]    |
| PBI-020 | Follow-up date field on application                   | S    | 🔴       | [ ]    |
| PBI-021 | Overdue follow-up indicator on dashboard              | M    | 🔴       | [ ]    |
| PBI-024 | Summary stats bar (total, active, interviews, offers) | M    | 🔴       | [ ]    |
| PBI-025 | Pipeline stage distribution (visual)                  | M    | 🟠       | [ ]    |
| PBI-029 | General notes field per application                   | S    | 🟠       | [ ]    |
| PBI-043 | README.md (project overview, setup, architecture)     | M    | 🔴       | [ ]    |

**Status markers:** `[ ]` Not started · `[~]` In progress · `[x]` Done · `[!]` Blocked

**Total PBIs:** 9 · **S:** 3 · **M:** 6 · **L:** 0
**Estimated dev hours:** ~27 hrs · **Available dev capacity:** 31 hrs/sprint
**Note:** PBI-020 and PBI-021 were partially implemented in Sprint 2 (`followUpAt` field and overdue indicator) but were not in the Sprint 2 DoD. They are formally committed here and require DoD verification against spec.md acceptance criteria before being marked done.

---

## Dependency Order

PBI-017 (contact model) → PBI-018 (add/edit contact) → PBI-019 (contact list view)
PBI-020 (follow-up date field) → PBI-021 (overdue indicator)
PBI-024 (summary stats bar) → PBI-025 (pipeline chart)
PBI-029 (notes field) — independent, implement after PBI-019
PBI-043 (README) — last, written when all features are visible

---

## Capacity & Schedule

| Day   | Date         | Focus                                                    |
| ----- | ------------ | -------------------------------------------------------- |
| Day 1 | 23 Apr (Thu) | PBI-017 — Contact model + PBI-020 — Follow-up date field |
| Day 2 | 24 Apr (Fri) | PBI-018 — Add/edit contact + PBI-021 — Overdue indicator |
| Day 3 | 25 Apr (Sat) | PBI-019 — Contact list view + PBI-029 — Notes field      |
| Day 4 | 26 Apr (Sun) | PBI-024 — Summary stats bar                              |
| Day 5 | 27 Apr (Mon) | PBI-025 — Pipeline stage distribution                    |
| Day 6 | 28 Apr (Tue) | PBI-043 — README.md                                      |
| Day 7 | 29 Apr (Wed) | RTL tests + Sprint Review + Retro + MVP gate check       |

---

## Sprint Ceremonies

| Ceremony              | Date        | Output                                                     |
| --------------------- | ----------- | ---------------------------------------------------------- |
| Sprint Planning       | 23 Apr 2026 | This document confirmed, tasks.md Sprint 3 slice activated |
| Mid-sprint checkpoint | 26 Apr 2026 | Progress review; overflow rule applied if needed           |
| Sprint Review         | 29 Apr 2026 | All PBIs reviewed against AC                               |
| Sprint Retrospective  | 29 Apr 2026 | Retro notes written in §Retrospective below                |
| MVP Phase Gate        | 29 Apr 2026 | All 28 Must Have PBIs verified complete                    |

---

## Sprint 2 Lessons Applied

| #   | Lesson                                                                      | Change Applied                                                               |
| --- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | DoD items without explicit verification methods caused mid-sprint confusion | Every DoD check uses the three-column table format: Confirmed / How / Item   |
| 2   | Missing `htmlFor`/`id` pairs on form inputs broke RTL tests                 | All form inputs ship with `htmlFor`/`id` pairs — enforced as coding standard |
| 3   | Jest `moduleNameMapper` and `@jest-environment node` not documented         | Both confirmed in place from Sprint 2 — no setup cost this sprint            |
| 4   | `ApplicationCard.test.tsx` and `KanbanBoard.test.tsx` not executed          | Executed and passing before Sprint 3 closes                                  |

---

## Daily Log

| Date | PBIs Worked | Notes |
| ---- | ----------- | ----- |
|      |             |       |

---

## Blocked Items

| PBI | Blocked Since | Reason | Resolution |
| --- | ------------- | ------ | ---------- |
| —   | —             | —      | —          |

---

## Mid-Sprint Checkpoint (26 April 2026)

**Date completed:** _(fill at checkpoint)_

| PBI     | Status at Checkpoint | On Track? |
| ------- | -------------------- | --------- |
| PBI-017 |                      |           |
| PBI-018 |                      |           |
| PBI-019 |                      |           |
| PBI-020 |                      |           |
| PBI-021 |                      |           |
| PBI-024 |                      |           |
| PBI-025 |                      |           |
| PBI-029 |                      |           |
| PBI-043 |                      |           |

**Overflow decision:** _(none / list PBI moved to Sprint 4 with reason)_

---

## Sprint Review (29 April 2026)

**Date completed:** _(fill at review)_

### PBI Completion

| PBI     | Item                                                  | Done? | Notes |
| ------- | ----------------------------------------------------- | ----- | ----- |
| PBI-017 | Contact data model (linked to application)            | [ ]   |       |
| PBI-018 | Add / edit contact per application                    | [ ]   |       |
| PBI-019 | Contact list view on application detail page          | [ ]   |       |
| PBI-020 | Follow-up date field on application                   | [ ]   |       |
| PBI-021 | Overdue follow-up indicator on dashboard              | [ ]   |       |
| PBI-024 | Summary stats bar (total, active, interviews, offers) | [ ]   |       |
| PBI-025 | Pipeline stage distribution (visual)                  | [ ]   |       |
| PBI-029 | General notes field per application                   | [ ]   |       |
| PBI-043 | README.md (project overview, setup, architecture)     | [ ]   |       |

### Sprint Goal Met?

- [ ] Yes — sprint goal achieved in full
- [ ] Partial — sprint goal partially met (explain below)
- [ ] No — sprint goal not met (explain below)

**Notes:** _(fill at review)_

### Velocity

| Metric            | Value    |
| ----------------- | -------- |
| PBIs committed    | 9        |
| PBIs completed    | _(fill)_ |
| PBIs carried over | _(fill)_ |
| S completed       | _(fill)_ |
| M completed       | _(fill)_ |
| L completed       | _(fill)_ |

---

## MVP Phase Gate (29 April 2026)

| Gate Criterion                                                | Status |
| ------------------------------------------------------------- | ------ |
| All 28 Must Have PBIs complete and marked `[x]` in product.md | [ ]    |
| Application live on Vercel production URL                     | [ ]    |
| Core RTL test suite passing with no failures                  | [ ]    |
| README.md committed and accurate                              | [ ]    |
| Notion workspace updated and publicly accessible              | [ ]    |
| Sprint 3 retro completed and documented                       | [ ]    |
| Post 22 (MVP is Live) published on LinkedIn                   | [ ]    |

**Gate cleared:** _(date to be recorded)_

---

## Sprint Retrospective (29 April 2026)

**Date completed:** _(fill at retro)_

### What went well?

_(fill at retro)_

### What didn't go well?

_(fill at retro)_

### What will change in Sprint 4?

_(fill at retro)_

### Retro insight for LinkedIn Post 22

_(fill at retro — 2–3 sentences distilling the sharpest lesson from this sprint)_

---

## Sprint Close Checklist

- [ ] All committed PBIs marked `[x]` or formally moved to Sprint 4 with reason
- [ ] `product.md` PBI statuses updated
- [ ] Sprint Review section completed
- [ ] Sprint Retrospective section completed
- [ ] LinkedIn retro insight captured above
- [ ] MVP Phase Gate verified and date recorded
- [ ] Notion Sprint Board updated — Sprint 3 marked ✅ Closed, Sprint 4 🔄 In progress
- [ ] Notion Changelog entry added for Sprint 3
- [ ] `sprint-03.md` committed to `/docs/sprints/`
- [ ] `plan.md` Sprint Summary Table updated with close date
- [ ] `develop` → `main` merge executed (MVP gate cleared)

---

_sprint-03.md v1.0 — 23 April 2026 — HireTrace_
_Active sprint document. Update daily. Source of truth for Sprint 3 progress, blocks, and retrospective output._
