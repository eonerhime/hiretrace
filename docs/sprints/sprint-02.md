# HireTrace — Sprint 02

**Document Type:** Sprint Artifact
**Version:** 1.0
**Sprint:** 2 of 6
**Status:** In progress
**Start Date:** 21 April 2026
**End Date:** 27 April 2026
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

**A logged-in user can create, view, edit, delete, and progress job applications through a 6-stage Kanban pipeline.**

At sprint close: the application CRUD is working, the Kanban pipeline renders all 6 stages, drag-and-drop stage progression works, and the application detail page is accessible. RTL tests cover core pipeline components.

---

## Sprint Commitments

| PBI     | Item                                             | Size | Priority | Status |
| ------- | ------------------------------------------------ | ---- | -------- | ------ |
| PBI-009 | Application data model (schema + migration)      | M    | 🔴       | [ ]    |
| PBI-010 | Add new application (form + API + DB write)      | M    | 🔴       | [ ]    |
| PBI-011 | View all applications (dashboard list/card view) | M    | 🔴       | [ ]    |
| PBI-012 | Edit application details                         | M    | 🔴       | [ ]    |
| PBI-013 | Delete application (soft delete)                 | S    | 🔴       | [ ]    |
| PBI-014 | 6-stage Kanban pipeline view                     | L    | 🔴       | [ ]    |
| PBI-015 | Drag-and-drop stage progression                  | L    | 🔴       | [ ]    |
| PBI-016 | Application detail page                          | M    | 🔴       | [ ]    |
| PBI-040 | React Testing Library — core component suite     | L    | 🔴       | [ ]    |

**Status markers:** `[ ]` Not started · `[~]` In progress · `[x]` Done · `[!]` Blocked

**Total PBIs:** 9 · **S:** 1 · **M:** 4 · **L:** 4
**Estimated dev hours:** ~40.5 hrs · **Available dev capacity:** 31 hrs/sprint
**Note:** Sprint 2 is tight. PBI-015 (drag-and-drop) is the first candidate for overflow if mid-sprint checkpoint shows slippage. A simple stage dropdown on the application card is an acceptable fallback that still satisfies the pipeline spec.

---

## Dependency Order

Work in this sequence — each PBI depends on the one above it:

```
PBI-009 (schema) → PBI-010 (create) → PBI-011 (list) → PBI-012 (edit)
                                                       → PBI-013 (delete)
                                                       → PBI-016 (detail page)
                                    → PBI-014 (Kanban view)
                                                       → PBI-015 (drag-and-drop)
PBI-040 (RTL tests) — written alongside each component
```

---

## Capacity & Schedule

| Day   | Date         | Focus                                              |
| ----- | ------------ | -------------------------------------------------- |
| Day 1 | 21 Apr (Tue) | PBI-009 — Application schema + migration           |
| Day 2 | 22 Apr (Wed) | PBI-010 — Add application form + API               |
| Day 3 | 23 Apr (Thu) | PBI-011 — View all applications + PBI-013 — Delete |
| Day 4 | 24 Apr (Fri) | PBI-012 — Edit application + mid-sprint checkpoint |
| Day 5 | 25 Apr (Sat) | PBI-014 — Kanban pipeline view                     |
| Day 6 | 26 Apr (Sun) | PBI-015 — Drag-and-drop + PBI-016 — Detail page    |
| Day 7 | 27 Apr (Mon) | PBI-040 — RTL tests + Sprint Review + Retro        |

---

## Sprint Ceremonies

| Ceremony              | Date        | Output                                                     |
| --------------------- | ----------- | ---------------------------------------------------------- |
| Sprint Planning       | 21 Apr 2026 | This document confirmed, tasks.md Sprint 2 slice activated |
| Mid-sprint checkpoint | 24 Apr 2026 | Progress review; overflow rule applied if needed           |
| Sprint Review         | 27 Apr 2026 | All PBIs reviewed against AC                               |
| Sprint Retrospective  | 27 Apr 2026 | Retro notes written in §Retrospective below                |

---

## Sprint 1 Lessons Applied

These are the specific changes from the Sprint 1 retro applied to this sprint:

- [ ] All packages pinned before install — no `@latest`
- [ ] `npm run build` run locally before every Vercel push
- [ ] Feature branch created for each PBI — `feature/PBI-XXX-desc`
- [ ] Control docs updated at sprint close — not incrementally

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

## Mid-Sprint Checkpoint (24 April 2026)

**Date completed:** _(fill at checkpoint)_

| PBI     | Status at Checkpoint | On Track? |
| ------- | -------------------- | --------- |
| PBI-009 |                      |           |
| PBI-010 |                      |           |
| PBI-011 |                      |           |
| PBI-012 |                      |           |
| PBI-013 |                      |           |
| PBI-014 |                      |           |
| PBI-015 |                      |           |
| PBI-016 |                      |           |
| PBI-040 |                      |           |

**Overflow decision:** _(none / list PBI moved to Sprint 3 with reason)_

---

## Sprint Review (27 April 2026)

**Date completed:** _(fill at review)_

### PBI Completion

| PBI     | Item                                             | Done? | Notes |
| ------- | ------------------------------------------------ | ----- | ----- |
| PBI-009 | Application data model (schema + migration)      | [ ]   |       |
| PBI-010 | Add new application (form + API + DB write)      | [ ]   |       |
| PBI-011 | View all applications (dashboard list/card view) | [ ]   |       |
| PBI-012 | Edit application details                         | [ ]   |       |
| PBI-013 | Delete application (soft delete)                 | [ ]   |       |
| PBI-014 | 6-stage Kanban pipeline view                     | [ ]   |       |
| PBI-015 | Drag-and-drop stage progression                  | [ ]   |       |
| PBI-016 | Application detail page                          | [ ]   |       |
| PBI-040 | React Testing Library — core component suite     | [ ]   |       |

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

## Sprint Retrospective (27 April 2026)

**Date completed:** _(fill at retro)_

### What went well?

_(fill at retro)_

### What didn't go well?

_(fill at retro)_

### What will change in Sprint 3?

_(fill at retro)_

### Retro insight for LinkedIn Post 16

_(fill at retro — 2–3 sentences distilling the sharpest lesson from this sprint)_

---

## Sprint Close Checklist

- [ ] All committed PBIs marked `[x]` or formally moved to Sprint 3 with reason
- [ ] `product.md` PBI statuses updated
- [ ] Sprint Review section completed
- [ ] Sprint Retrospective section completed
- [ ] LinkedIn Post 16 retro insight captured above
- [ ] LinkedIn carousel Post 17 slides 5 and 6 filled in
- [ ] Notion Sprint Board updated — Sprint 2 marked ✅ Closed, Sprint 3 🔄 In progress
- [ ] Notion Changelog entry added for Sprint 2
- [ ] `sprint-02.md` committed to `/docs/sprints/`
- [ ] `plan.md` Sprint Summary Table updated with close date

---

_sprint-02.md v1.0 — 21 April 2026 — HireTrace_
_Active sprint document. Update daily. Source of truth for Sprint 2 progress, blocks, and retrospective output._
