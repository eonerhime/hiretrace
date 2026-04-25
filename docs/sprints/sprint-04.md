# HireTrace — Sprint 04

**Document Type:** Sprint Artifact
**Version:** 1.0
**Sprint:** 4 of 6
**Status:** In progress
**Start Date:** 25 April 2026
**End Date:** 06 May 2026
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

**The application is hardened and measurable. Users can log interview notes per stage, view a timeline of notes per application, and see conversion and time-in-stage metrics on the dashboard.**

At sprint close: interview notes are functional, the notes timeline renders on the detail page, conversion rate and time-in-stage metrics display on the dashboard, source effectiveness is tracked, API rate limiting is active, integration tests cover all new routes, and API documentation is committed.

---

## Sprint Commitments

| PBI     | Item                                                 | Size | Priority | Status |
| ------- | ---------------------------------------------------- | ---- | -------- | ------ |
| PBI-026 | Conversion rate metric (applied → interview → offer) | M    | 🟡       | [ ]    |
| PBI-027 | Time-in-stage metric per application                 | L    | 🟡       | [ ]    |
| PBI-028 | Source effectiveness metric                          | M    | 🔵       | [ ]    |
| PBI-030 | Interview notes per stage                            | M    | 🟠       | [ ]    |
| PBI-031 | Notes history / timeline view                        | M    | 🟡       | [ ]    |
| PBI-038 | API rate limiting                                    | M    | 🟠       | [ ]    |
| PBI-041 | Integration tests — API routes                       | L    | 🟠       | [ ]    |
| PBI-044 | API documentation (OpenAPI / inline comments)        | M    | 🟠       | [ ]    |

**Status markers:** `[ ]` Not started · `[~]` In progress · `[x]` Done · `[!]` Blocked

**Total PBIs:** 8 · **S:** 0 · **M:** 6 · **L:** 2
**Estimated dev hours:** ~26 hrs · **Available dev capacity:** 31 hrs/sprint
**Note:** PBI-027 requires a new `stageEnteredAt` field on the `Application` model — a schema migration is needed before implementation begins. PBI-028 requires a new `source` field on `Application` — coordinate with PBI-027 migration to run both schema changes together.

---

## Dependency Order

PBI-038 (rate limiting) — independent, implement first
PBI-030 (interview notes) → PBI-031 (notes timeline)
PBI-027 (time-in-stage) requires schema migration — run alongside PBI-028 migration
PBI-026 (conversion rate) → PBI-027 (time-in-stage) → PBI-028 (source effectiveness)
PBI-041 (integration tests) — after all new routes are stable
PBI-044 (API docs) — last, written when all routes are complete

---

## Capacity & Schedule

| Day   | Date         | Focus                                                      |
| ----- | ------------ | ---------------------------------------------------------- |
| Day 1 | 30 Apr (Wed) | PBI-038 — API rate limiting                                |
| Day 2 | 01 May (Thu) | PBI-030 — Interview notes per stage                        |
| Day 3 | 02 May (Fri) | PBI-031 — Notes history / timeline view                    |
| Day 4 | 03 May (Sat) | PBI-026 — Conversion rate metric + schema migrations       |
| Day 5 | 04 May (Sun) | PBI-027 — Time-in-stage metric                             |
| Day 6 | 05 May (Mon) | PBI-028 — Source effectiveness + PBI-044 — API docs        |
| Day 7 | 06 May (Tue) | PBI-041 — Integration tests + Sprint Review + Retro        |

---

## Sprint Ceremonies

| Ceremony              | Date        | Output                                                     |
| --------------------- | ----------- | ---------------------------------------------------------- |
| Sprint Planning       | 30 Apr 2026 | This document confirmed, tasks.md Sprint 4 slice activated |
| Mid-sprint checkpoint | 03 May 2026 | Progress review; overflow rule applied if needed           |
| Sprint Review         | 06 May 2026 | All PBIs reviewed against AC                               |
| Sprint Retrospective  | 06 May 2026 | Retro notes written in §Retrospective below                |
| Phase 2 Gate Check    | 06 May 2026 | Should Have PBIs progress reviewed                         |

---

## Sprint 3 Lessons Applied

| #   | Lesson                                                                            | Change Applied                                                                        |
| --- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1   | Browser verification PBIs clustered at sprint close                               | Dedicated verification block scheduled at sprint open — Day 1                         |
| 2   | PBI-019 S size underestimated due to multi-layer coordination                     | Any PBI touching Prisma + component + route bumped to M regardless of apparent scope |
| 3   | `revalidatePath` alone does not bust Vercel edge cache — client fix also required | `router.refresh()` + `setTimeout(() => router.push(...), 100)` in all client mutations |
| 4   | README written last — gaps in documentation surface too late                      | PBI-044 (API docs) written when routes are stable, not after retro                   |

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

## Mid-Sprint Checkpoint (03 May 2026)

**Date completed:** _(fill at checkpoint)_

| PBI     | Status at Checkpoint | On Track? |
| ------- | -------------------- | --------- |
| PBI-038 |                      |           |
| PBI-030 |                      |           |
| PBI-031 |                      |           |
| PBI-026 |                      |           |
| PBI-027 |                      |           |
| PBI-028 |                      |           |
| PBI-041 |                      |           |
| PBI-044 |                      |           |

**Overflow decision:** _(none / list PBI moved to Sprint 5 with reason)_

---

## Sprint Review (06 May 2026)

**Date completed:** _(fill at review)_

### PBI Completion

| PBI     | Item                                                 | Done? | Notes |
| ------- | ---------------------------------------------------- | ----- | ----- |
| PBI-026 | Conversion rate metric (applied → interview → offer) | [ ]   |       |
| PBI-027 | Time-in-stage metric per application                 | [ ]   |       |
| PBI-028 | Source effectiveness metric                          | [ ]   |       |
| PBI-030 | Interview notes per stage                            | [ ]   |       |
| PBI-031 | Notes history / timeline view                        | [ ]   |       |
| PBI-038 | API rate limiting                                    | [ ]   |       |
| PBI-041 | Integration tests — API routes                       | [ ]   |       |
| PBI-044 | API documentation (OpenAPI / inline comments)        | [ ]   |       |

### Sprint Goal Met?

- [ ] Yes — sprint goal achieved in full
- [ ] Partial — sprint goal partially met (explain below)
- [ ] No — sprint goal not met (explain below)

**Notes:** _(fill at review)_

### Velocity

| Metric            | Value    |
| ----------------- | -------- |
| PBIs committed    | 8        |
| PBIs completed    | _(fill)_ |
| PBIs carried over | _(fill)_ |
| S completed       | 0        |
| M completed       | _(fill)_ |
| L completed       | _(fill)_ |

---

## Sprint Retrospective (06 May 2026)

**Date completed:** _(fill at retro)_

### What went well?

_(fill at retro)_

### What didn't go well?

_(fill at retro)_

### What will change in Sprint 5?

_(fill at retro)_

### Retro insight for LinkedIn

_(fill at retro — 2–3 sentences distilling the sharpest lesson from this sprint)_

---

## Sprint Close Checklist

- [ ] All committed PBIs marked `[x]` or formally moved to Sprint 5 with reason
- [ ] `product.md` PBI statuses updated
- [ ] Sprint Review section completed
- [ ] Sprint Retrospective section completed
- [ ] LinkedIn retro insight captured above
- [ ] Notion Sprint Board updated — Sprint 4 marked ✅ Closed, Sprint 5 🔄 In progress
- [ ] Notion Changelog entry added for Sprint 4
- [ ] `sprint-04.md` committed to `/docs/sprints/`
- [ ] `plan.md` Sprint Summary Table updated with close date
- [ ] Phase 2 gate progress recorded in `plan.md`

---

_sprint-04.md v1.0 — 30 April 2026 — HireTrace_
_Active sprint document. Update daily. Source of truth for Sprint 4 progress, blocks, and retrospective output._