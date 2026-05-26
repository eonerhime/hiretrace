# HireTrace — Sprint 5

**Document Type:** Scrum Master Artifact
**Sprint:** 5 — Resume Management + Email Reminders
**Dates:** 04 May 2026 – 11 May 2026
**Status:** ✅ Closed
**Branch:** `feature/sprint-05-resume-reminders`
**Author:** Scrum Master
**Repository:** https://github.com/eonerhime/hiretrace

---

## Cross-References

| Document            | Relationship                                           |
| ------------------- | ------------------------------------------------------ |
| `product.md`        | Upstream source — PBI definitions, sizes, priorities   |
| `plan.md`           | Sprint dates, capacity model, DoD, phase gates         |
| `spec.md`           | Acceptance criteria for each PBI in this sprint        |
| `tasks.md`          | Atomic dev tasks per feature — updated at sprint start |
| `implementation.md` | ADR for storage provider (PBI-033) logged here         |
| `testing.md`        | Test results logged here at sprint close               |

---

## Sprint Goal

Deliver resume version tracking (label, upload, and application linking) and a reminder list view, with email notifications for due reminders. The enhanced phase gate (Phase 2) is cleared when this sprint closes.

---

## Sprint PBIs

| ID      | Title                                       | Size | Priority | Status    | Notes                                                 |
| ------- | ------------------------------------------- | ---- | -------- | --------- | ----------------------------------------------------- |
| PBI-022 | Reminder list / upcoming actions view       | M    | 🟠       | [ ] To do | No schema change — uses existing `followUpAt` field   |
| PBI-023 | Email notification for due reminders        | L    | 🟡       | [ ] To do | Requires Resend (or equivalent) — evaluate first      |
| PBI-032 | Resume version label field per application  | S    | 🟡       | [ ] To do | Small schema addition; start here                     |
| PBI-033 | Resume file upload and storage              | L    | 🟡       | [ ] To do | ADR required before any code — Cloudinary vs Supabase |
| PBI-034 | Link specific resume version to application | M    | 🟡       | [ ] To do | Depends on PBI-033                                    |

**Status markers:** [ ] To do · [~] In progress · [x] Done · [!] Blocked

---

## Dependency Order

```
PBI-032 (label field — schema + UI, no storage)
    ↓
PBI-033 ADR → PBI-033 (file upload + storage)
    ↓
PBI-034 (link resume to application)

PBI-022 (reminder list — no dependencies, can run in parallel)
    ↓
PBI-023 (email — depends on reminder list being queryable)
```

**Recommended sequence:** PBI-022 → PBI-032 → PBI-033 (ADR first) → PBI-034 → PBI-023

Rationale: PBI-022 is zero-schema and unblocks Phase 2 gate progress immediately. PBI-032 is small and validates the resume model shape before PBI-033's storage decision compounds it. PBI-023 goes last — it is L-sized and has an external dependency that can slip to Sprint 6 without failing the phase gate.

---

## Schema Migration Needs

### PBI-032 — Resume version label

Add `resumeVersionLabel String?` to the `Application` model. No new model needed.

```prisma
model Application {
  // existing fields ...
  resumeVersionLabel String?
}
```

Migration name: `add_resume_version_label`

### PBI-033 — Resume file upload

Requires a new `Resume` model. The exact shape depends on the ADR decision (see below), but the baseline is:

```prisma
model Resume {
  id          String      @id @default(cuid())
  userId      String
  label       String
  fileUrl     String
  fileKey     String      // storage provider key for deletion
  uploadedAt  DateTime    @default(now())
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  applications Application[]
}
```

Add `resumeId String?` and `resume Resume? @relation(...)` to `Application`.

Migration name: `add_resume_model`

> ⚠️ Update **all three mock factories** when adding fields to `Application`:
> `ApplicationList.test.tsx`, `PipelineChart.test.tsx`, `StatsBar.test.tsx`

---

## ADR — Storage Provider for Resume Uploads (PBI-033)

**Decision required before writing any PBI-033 code.**
Log the decision in `implementation.md` before the first task is started.

### Options

| Criterion                     | Cloudinary                           | Supabase Storage                          |
| ----------------------------- | ------------------------------------ | ----------------------------------------- |
| Free tier                     | 25 GB storage, 25 GB bandwidth/month | 1 GB storage, 2 GB egress/month           |
| SDK complexity                | Low — `cloudinary` npm package       | Low — `@supabase/storage-js`              |
| Next.js App Router support    | ✅ Server-side upload via signed URL | ✅ Server-side upload via signed URL      |
| File type restriction         | Supports PDF, enforced via config    | Supports PDF, enforced via policy         |
| URL expiry / access control   | Signed URLs — configurable TTL       | Signed URLs — configurable TTL            |
| Additional service dependency | No (CDN included)                    | Yes (another Supabase project or project) |
| Portfolio story               | Common in professional stacks        | Demonstrates Supabase ecosystem knowledge |

**Recommended:** Cloudinary — free tier is more generous, SDK is mature, no second managed service to configure. If the evaluator prefers Supabase Storage, the integration pattern is identical.

**Log this decision in `implementation.md` §ADR section before coding begins.**

---

## Sprint 5 Tasks

### PBI-022 — Reminder list / upcoming actions view

> Uses existing `followUpAt DateTime?` on `Application`. No schema migration required.

#### API

| Task     | Description                                                                                                  | Status |
| -------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| T-022-01 | Add `GET /api/reminders` route — query `Application` where `followUpAt` is not null and user matches session | [x]    |
| T-022-02 | Sort results ascending by `followUpAt`                                                                       | [x]    |
| T-022-03 | Return fields: `id`, `company`, `role`, `followUpAt`, `stage`                                                | [x]    |
| T-022-04 | Validate session — return 401 if unauthenticated                                                             | [x]    |
| T-022-05 | Return 200 with array (empty array is valid — not 404)                                                       | [x]    |
| T-022-06 | Add `revalidatePath("/dashboard/reminders")` to any mutating route that touches `followUpAt`                 | [x]    |
| T-022-07 | Write integration test: GET returns 401 when unauthenticated                                                 | [x]    |
| T-022-08 | Write integration test: GET returns sorted list for authenticated user                                       | [x]    |

#### UI

| Task     | Description                                                                               | Status |
| -------- | ----------------------------------------------------------------------------------------- | ------ |
| T-022-09 | Create `app/dashboard/reminders/page.tsx` — server component, fetch from `/api/reminders` | [x]    |
| T-022-10 | Create `components/ReminderList.tsx` — renders list of upcoming reminders                 | [x]    |
| T-022-11 | Each item shows: company, role, stage badge, follow-up date formatted as "DD MMM YYYY"    | [x]    |
| T-022-12 | Overdue items (followUpAt < today) shown with red indicator                               | [x]    |
| T-022-13 | Empty state: "No upcoming reminders" message                                              | [x]    |
| T-022-14 | Link each item to `/dashboard/applications/[id]`                                          | [x]    |
| T-022-15 | Add "Reminders" link to dashboard nav                                                     | [x]    |
| T-022-16 | Mobile responsive at 375px                                                                | [x]    |
| T-022-17 | Write RTL test: renders list of reminders                                                 | [x]    |
| T-022-18 | Write RTL test: overdue indicator appears for past dates                                  | [x]    |
| T-022-19 | Write RTL test: empty state renders when list is empty                                    | [x]    |
| T-022-20 | `npm test` — all tests pass                                                               | [x]    |
| T-022-21 | `npm run build` — no errors                                                               | [x]    |

---

### PBI-032 — Resume version label field per application

> Small schema addition. Do this before PBI-033 to validate the application model shape.

#### Schema + API

| Task     | Description                                                                                                | Status |
| -------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| T-032-01 | Add `resumeVersionLabel String?` to `Application` in `schema.prisma`                                       | [x]    |
| T-032-02 | Run `npx prisma migrate dev --name add_resume_version_label`                                               | [x]    |
| T-032-03 | Update all three mock factories: `ApplicationList.test.tsx`, `PipelineChart.test.tsx`, `StatsBar.test.tsx` | [x]    |
| T-032-04 | Add `resumeVersionLabel` to `PATCH /api/applications/[id]` — include in Zod schema and Prisma update       | [x]    |
| T-032-05 | Return `resumeVersionLabel` in `GET /api/applications/[id]` response                                       | [x]    |

#### UI

| Task     | Description                                                              | Status |
| -------- | ------------------------------------------------------------------------ | ------ |
| T-032-06 | Add `resumeVersionLabel` text input to `ApplicationForm` (create + edit) | [x]    |
| T-032-07 | Placeholder: "e.g. Product Manager v3"                                   | [x]    |
| T-032-08 | Display `resumeVersionLabel` on application detail page if set           | [x]    |
| T-032-09 | Write RTL test: label field renders in form                              | [x]    |
| T-032-10 | Write RTL test: label value displays on detail page when set             | [x]    |
| T-032-11 | `npm test` — all tests pass                                              | [x]    |
| T-032-12 | `npm run build` — no errors                                              | [x]    |

---

### PBI-033 — Resume file upload and storage

> **Log ADR in `implementation.md` before Task T-033-01.**

#### Setup

| Task     | Description                                                                                                                           | Status |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| T-033-00 | Log storage provider ADR in `implementation.md` — Cloudinary vs Supabase Storage                                                      | [x]    |
| T-033-01 | Install chosen SDK (e.g. `npm install cloudinary@2` — pin version)                                                                    | [x]    |
| T-033-02 | Add environment variables to `.env.local` and Vercel (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET or equivalent) | [x]    |

#### Schema + API

| Task     | Description                                                                                                               | Status |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | ------ |
| T-033-03 | Add `Resume` model to `schema.prisma` (id, userId, label, fileUrl, fileKey, uploadedAt, relation to User and Application) | [x]    |
| T-033-04 | Add `resumeId String?` and `resume Resume? @relation(...)` to `Application`                                               | [x]    |
| T-033-05 | Run `npx prisma migrate dev --name add_resume_model`                                                                      | [x]    |
| T-033-06 | Update all three mock factories for new `Application` fields                                                              | [x]    |
| T-033-07 | Create `POST /api/resumes` — accept multipart/form-data, validate: PDF only, max 5 MB                                     | [x]    |
| T-033-08 | Upload file to storage provider server-side (never expose API secret to client)                                           | [x]    |
| T-033-09 | Store `fileUrl` and `fileKey` in `Resume` record                                                                          | [x]    |
| T-033-10 | Return 201 `{ id, label, fileUrl }`                                                                                       | [x]    |
| T-033-11 | Create `GET /api/resumes` — return all resumes for authenticated user                                                     | [x]    |
| T-033-12 | Create `DELETE /api/resumes/[id]` — delete from storage provider and DB                                                   | [x]    |
| T-033-13 | All routes return 401 if unauthenticated                                                                                  | [x]    |
| T-033-14 | Validate request body BEFORE DB lookup — fail fast with 400                                                               | [x]    |
| T-033-15 | Add `revalidatePath("/dashboard/resumes")` in POST and DELETE handlers                                                    | [x]    |
| T-033-16 | Write integration test: POST returns 401 when unauthenticated                                                             | [x]    |
| T-033-17 | Write integration test: POST returns 400 for non-PDF file                                                                 | [x]    |
| T-033-18 | Write integration test: DELETE returns 404 for non-existent resume                                                        | [x]    |

#### UI

| Task     | Description                                                                                       | Status |
| -------- | ------------------------------------------------------------------------------------------------- | ------ |
| T-033-19 | Create `app/dashboard/resumes/page.tsx` — list uploaded resumes                                   | [x]    |
| T-033-20 | Create `components/ResumeUploadForm.tsx` — file input (PDF only, 5 MB limit), label field, submit | [x]    |
| T-033-21 | Show upload progress indicator during POST                                                        | [x]    |
| T-033-22 | Display uploaded resumes: label, upload date, download link                                       | [x]    |
| T-033-23 | Inline delete confirmation using `confirmingDelete` state pattern (not `window.confirm()`)        | [x]    |
| T-033-24 | Empty state: "No resumes uploaded yet"                                                            | [x]    |
| T-033-25 | Add "Resumes" link to dashboard nav                                                               | [x]    |
| T-033-26 | Mobile responsive at 375px                                                                        | [x]    |
| T-033-27 | Write RTL test: upload form renders file input and label field                                    | [x]    |
| T-033-28 | Write RTL test: resume list renders uploaded resumes                                              | [x]    |
| T-033-29 | Write RTL test: empty state renders when no resumes                                               | [x]    |
| T-033-30 | `npm test` — all tests pass                                                                       | [x]    |
| T-033-31 | `npm run build` — no errors                                                                       | [x]    |

---

### PBI-034 — Link specific resume version to application

> Depends on PBI-033 being complete.

#### API

| Task     | Description                                                                       | Status |
| -------- | --------------------------------------------------------------------------------- | ------ |
| T-034-01 | Add `resumeId` to `PATCH /api/applications/[id]` Zod schema (optional string)     | [x]    |
| T-034-02 | Validate that `resumeId` belongs to the authenticated user before linking         | [x]    |
| T-034-03 | Return linked `resume { id, label, fileUrl }` in `GET /api/applications/[id]`     | [x]    |
| T-034-04 | Write integration test: PATCH with valid resumeId links resume                    | [x]    |
| T-034-05 | Write integration test: PATCH with resumeId belonging to another user returns 403 | [x]    |

#### UI

| Task     | Description                                                                             | Status |
| -------- | --------------------------------------------------------------------------------------- | ------ |
| T-034-06 | Add resume selector dropdown to application detail page (lists user's resumes by label) | [x]    |
| T-034-07 | On selection: PATCH the application with chosen `resumeId`                              | [x]    |
| T-034-08 | Display linked resume name + download link on application detail page                   | [x]    |
| T-034-09 | Allow unlinking (set resumeId to null)                                                  | [x]    |
| T-034-10 | `router.refresh()` after link/unlink — stay on same page                                | [x]    |
| T-034-11 | Write RTL test: selector renders list of resumes                                        | [x]    |
| T-034-12 | Write RTL test: linked resume label and link render on detail page                      | [x]    |
| T-034-13 | `npm test` — all tests pass                                                             | [x]    |
| T-034-14 | `npm run build` — no errors                                                             | [x]    |

---

### PBI-023 — Email notification for due reminders

> Depends on PBI-022 (reminder query must be reliable before automating it).
> External dependency (Resend or equivalent). May slip to Sprint 6 without failing the Phase 2 gate.

#### Setup

| Task     | Description                                                                  | Status |
| -------- | ---------------------------------------------------------------------------- | ------ |
| T-023-01 | Evaluate Resend free tier (100 emails/day, 3,000/month) — confirm sufficient | [x]    |
| T-023-02 | Install `resend` npm package — pin version (`npm install resend@<version>`)  | [x]    |
| T-023-03 | Add `RESEND_API_KEY` to `.env.local` and Vercel                              | [x]    |
| T-023-04 | Verify sending domain or use Resend sandbox `onboarding@resend.dev` for dev  | [x]    |

#### API

| Task     | Description                                                                                               | Status |
| -------- | --------------------------------------------------------------------------------------------------------- | ------ |
| T-023-05 | Create `POST /api/reminders/send` — internal route (secured with cron secret header)                      | [x]    |
| T-023-06 | Query all applications where `followUpAt` is today or earlier and `stage` is not Closed                   | [x]    |
| T-023-07 | Group by user — send one email per user listing all due reminders                                         | [x]    |
| T-023-08 | Email content: subject "You have [N] follow-ups due today — HireTrace", body lists company + role + stage | [x]    |
| T-023-09 | Use Resend SDK to send — log send errors but do not throw (non-blocking)                                  | [x]    |
| T-023-10 | Return 200 `{ sent: N }`                                                                                  | [x]    |
| T-023-11 | Validate cron secret header — return 401 if missing or wrong                                              | [x]    |

#### Vercel Cron

| Task     | Description                                                                                                        | Status |
| -------- | ------------------------------------------------------------------------------------------------------------------ | ------ |
| T-023-12 | Create `vercel.json` with cron config: `{ "crons": [{ "path": "/api/reminders/send", "schedule": "0 8 * * *" }] }` | [x]    |
| T-023-13 | Add `CRON_SECRET` to `.env.local` and Vercel                                                                       | [x]    |
| T-023-14 | Test by calling endpoint manually with correct header                                                              | [x]    |

#### Testing

| Task     | Description                                                                | Status |
| -------- | -------------------------------------------------------------------------- | ------ |
| T-023-15 | Write integration test: POST returns 401 without cron secret               | [x]    |
| T-023-16 | Write integration test: POST returns 200 with sent count (mock Resend SDK) | [x]    |
| T-023-17 | `npm test` — all tests pass                                                | [x]    |
| T-023-18 | `npm run build` — no errors                                                | [x]    |

---

## Definition of Done Checklist (per PBI)

Before marking any PBI `[x]`:

- [x] All tasks for the PBI are marked `[x]`
- [x] `npx tsc --noEmit` — zero TypeScript errors
- [x] `npm run lint` — zero warnings
- [x] `npm test` — all tests pass (no regressions)
- [x] `npm run build` — clean build
- [x] Pushed to `feature/sprint-05-resume-reminders` — Vercel preview deployment passes
- [x] PBI marked `[x]` in `product.md`

---

## Sprint Setup Checklist

- [x] Create branch: `git checkout develop && git pull && git checkout -b feature/sprint-05-resume-reminders`
- [x] Push branch: `git push -u origin feature/sprint-05-resume-reminders`
- [x] Confirm branch appears in GitHub
- [x] Log storage provider ADR in `implementation.md` before touching PBI-033

---

## Test Inventory — Sprint 5 Additions

| File                                             | Tests  | Covers                |
| ------------------------------------------------ | ------ | --------------------- |
| `__tests__/api.reminders.test.ts`                | 2      | PBI-022 GET           |
| `__tests__/ReminderList.test.tsx`                | 3      | PBI-022 component     |
| `__tests__/api.resumes.test.ts`                  | 3      | PBI-033 POST + DELETE |
| `__tests__/ResumeUploadForm.test.tsx`            | 3      | PBI-033 form          |
| `__tests__/api.applications.[id].resume.test.ts` | 2      | PBI-034 PATCH         |
| `__tests__/api.reminders.send.test.ts`           | 2      | PBI-023 cron route    |
| **Sprint 5 additions**                           | **15** |                       |
| **Running total**                                | **95** |                       |

---

## Sprint Review (26 May 2026)

**Date completed:** 26 May 2026

### PBI Completion

| PBI     | Item                                        | Done? | Notes                                                                                                                              |
| ------- | ------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| PBI-022 | Reminder list / upcoming actions view       | [x]   | GET /api/reminders route, ReminderList component, overdue indicator, back navigation with ?from=reminders param wired through      |
| PBI-023 | Email notification for due reminders        | [x]   | Resend SDK integrated, POST /api/reminders/send secured with Authorization header, Vercel cron configured at 0 8 * * *             |
| PBI-032 | Resume version label field per application  | [x]   | resumeVersionLabel added to schema, ApplicationForm, edit page defaultValues, and application detail page                         |
| PBI-033 | Resume file upload and storage              | [x]   | Cloudinary ADR logged, server-side upload route, ResumeUploadForm, ResumeList with inline delete confirm, /dashboard/resumes page  |
| PBI-034 | Link specific resume version to application | [x]   | ResumePicker component, ownership check in PATCH handler, resume relation included in GET, linked resume label and download link   |

### Sprint Goal Met?

- [x] Yes — sprint goal achieved in full

**Notes:** All 5 committed PBIs delivered. Significant debugging effort on the PATCH route — the full field update was overwriting unrelated fields with null when only resumeId was sent, resolved by converting the data block to conditional spreads. The router.refresh() + setTimeout push pattern was required to force server component re-render after resume linking. 95 tests passing across 23 suites. TypeScript strict mode clean.

### Velocity

| Metric            | Value |
| ----------------- | ----- |
| PBIs committed    | 5     |
| PBIs completed    | 5     |
| PBIs carried over | 0     |
| S completed       | 1     |
| M completed       | 2     |
| L completed       | 2     |

---

## Sprint Retrospective (26 May 2026)

**Date completed:** 26 May 2026

### What went well?

All 5 PBIs delivered with no overflow. The decision to build PBI-032 (resume version label) before PBI-033 (file upload) paid off — it validated the Application model shape early and made the larger migration cleaner. The Cloudinary server-side upload pattern worked on the first attempt with no auth issues. The inline `confirmingDelete` state pattern on `ResumeList` was straightforward to implement and consistent with the pattern established in Sprint 4. Test discipline held — every new route and component was covered before moving to the next PBI.

### What didn't go well?

The PATCH route bug cost significant time — sending `{ resumeId: "..." }` triggered the full field update path which overwrote `company`, `role`, `location`, `salary`, and `jobUrl` with null because the data block spread all fields unconditionally. The fix (conditional spreads using `...(field !== undefined && { field })`) was straightforward once diagnosed but should have been the default pattern from the start. The `router.refresh()` alone was also insufficient to force a server component re-render after resume linking — the `setTimeout(() => router.push(...), 100)` pattern was needed, which was already a documented carry-forward rule from Sprint 4 but was not applied initially.

### What will change in Sprint 6?

Any PATCH handler that accepts a partial update body must use conditional spreads in the Prisma data block from the point of authoring — never unconditional field assignment with `?? null`. The `router.refresh()` + `setTimeout(() => router.push(...), 100)` pattern is now mandatory for all client mutations that depend on server-rendered relation data being visible after the update.

### Retro insight for LinkedIn

A PATCH route that accepts partial updates needs to only write what it receives — not overwrite every field with null. Sending `{ resumeId: "..." }` to update a resume link should not blank out the company name. Conditional spreads in the Prisma data block (`...(field !== undefined && { field })`) are now a hard rule in this project. One data loss bug at sprint close is one too many when the pattern is a one-line change.

---

## Phase 2 Gate — Status at Sprint 5 Close

| Criterion                                                      | Status |
| -------------------------------------------------------------- | ------ |
| All 7 Should Have PBIs complete and marked `[x]` in product.md | [x]    |
| Integration tests passing for all critical API routes          | [x]    |
| API documentation committed                                    | [x]    |
| Notion workspace updated                                       | [x]    |
| Sprint 5 retro completed and documented                        | [x]    |

_Gate cleared: 26 May 2026_

---

## Carry-Forward Decisions (from Sprint 4 — do not repeat these mistakes)

- All code updates in markdown code blocks — no exceptions
- `z.input<>` and `z.infer<>` both exported from any schema with `.transform()`
- Named type aliases for any `Record` with non-primitive value type
- `InterviewNote` relation on `Application` is named `interviewNotes` — not `notes`
- `revalidatePath("/dashboard")` and `revalidatePath("/dashboard/applications/${id}")` in all mutating handlers
- `router.refresh()` only for same-page mutations; `router.refresh()` + `setTimeout(() => router.push(...), 100)` for redirecting mutations
- All metric charts are props-driven from DashboardClient — never fetch from API
- `source` field is `String?` not a Prisma enum — Zod validation at API layer only
- `window.confirm()` replaced with inline `confirmingDelete` state pattern
- Mock `next/cache` in ALL API route test files that call `revalidatePath`
- `jest.mock()` calls before all imports in API test files
- `@jest-environment node` docblock must be absolute first line of API test files — never in route files
- Update ALL three mock factories when adding fields to `Application`
- Validate request body BEFORE DB lookup — fail fast with 400
- Never `@latest` — always pin versions
- `npx tsc --noEmit` not `tsc --noEmit`

---

_sprint-05.md v1.0 — 03 May 2026 — HireTrace_
_Drafted at Sprint 5 start. Update status markers daily. Complete Review and Retro sections at sprint close._
