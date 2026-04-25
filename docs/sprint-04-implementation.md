# HireTrace — Sprint 4 Implementation Guide

**Document Type:** Developer Implementation Reference
**Sprint:** 4 of 6
**Branch:** `feature/sprint-04-notes-metrics` (from `develop`)
**Status:** Ready to implement
**PBIs:** PBI-038 → PBI-030 → PBI-031 → PBI-026 → PBI-027 → PBI-028 → PBI-041 → PBI-044

---

## Before You Write a Single Line of Code

### Step 1 — Create branch and confirm baseline

```bash
git checkout develop
git pull origin develop
git checkout -b feature/sprint-04-notes-metrics
git push origin feature/sprint-04-notes-metrics
npm run build        # must pass clean
npx tsc --noEmit     # must pass clean
npm test             # must pass clean — 34 tests expected
```

If any of the three fail, fix before starting Sprint 4 work.

### Step 2 — New packages required

```bash
# No new packages required for Sprint 4
# All dependencies are already installed
```

---

## Critical Rules Carried Forward From Sprint 3

| Rule                                                                           | Why                                                          |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `npm run build` locally before every Vercel push                               | Catches issues Vercel will catch                             |
| Never `@latest` — all packages pinned                                          | Cascading version conflicts                                  |
| `@jest-environment node` docblock must be first line of API test files         | Anything before it breaks the override                       |
| `moduleNameMapper` already declared in `jest.config.ts`                        | Do not remove it                                             |
| All form inputs must have `htmlFor` on `<label>` and `id` on `<input>`         | Required for RTL `getByLabelText` and accessibility          |
| `revalidatePath("/dashboard")` in all mutating API route handlers              | Invalidates Vercel edge cache — `router.refresh()` alone insufficient |
| `router.refresh()` then `setTimeout(() => router.push(...), 100)` after mutations | Prevents redirect racing refresh on Vercel                |
| DoD checks use three-column table format: Confirmed / How / Item               | No bullet-list DoD items                                     |
| `jose` in API routes only — Web Crypto in `middleware.ts`                      | Edge runtime constraint                                      |
| `@import "tailwindcss"` in `globals.css`                                       | Tailwind v4                                                  |
| Branch first, then document                                                    | Branch must exist before sprint doc references it            |

---

## Directory Structure After Sprint 4

New files and directories this sprint creates (additions to the Sprint 3 structure):
hiretrace/
├── app/
│   ├── api/
│   │   └── applications/
│   │       └── [id]/
│   │           └── notes/
│   │               └── route.ts              ← POST create interview note
│   │   └── notes/
│   │       └── [id]/
│   │           └── route.ts                  ← PATCH edit, DELETE note
│   │   └── dashboard/
│   │       └── metrics/
│   │           └── route.ts                  ← GET conversion, time-in-stage, source
├── components/
│   ├── InterviewNoteForm.tsx                  ← Add/edit interview note (PBI-030)
│   ├── InterviewNoteList.tsx                  ← Notes list on detail page (PBI-030)
│   ├── NoteTimeline.tsx                       ← Timeline view grouped by stage (PBI-031)
│   ├── ConversionChart.tsx                    ← Conversion rate metric (PBI-026)
│   ├── TimeInStageChart.tsx                   ← Time-in-stage metric (PBI-027)
│   └── SourceChart.tsx                        ← Source effectiveness metric (PBI-028)
├── lib/
│   └── schemas/
│       └── note.ts                            ← Zod schemas for InterviewNote (PBI-030)
├── prisma/
│   └── schema.prisma                          ← Updated: InterviewNote model, stageEnteredAt, source
├── tests/
│   ├── api.notes.test.ts                      ← PBI-041 POST handler
│   ├── api.notes.[id].test.ts                 ← PBI-041 PATCH + DELETE handlers
│   ├── api.dashboard.metrics.test.ts          ← PBI-041 GET metrics handler
│   ├── InterviewNoteForm.test.tsx             ← PBI-030
│   ├── NoteTimeline.test.tsx                  ← PBI-031
│   ├── ConversionChart.test.tsx               ← PBI-026
│   └── TimeInStageChart.test.tsx              ← PBI-027

---

## Environment Variables

No new environment variables required for Sprint 4. All existing variables carry forward unchanged.

---

## PBI-038 — API Rate Limiting

**Goal:** Implement rate limiting on mutating API routes to prevent abuse. Return 429 with `Retry-After` header on breach.

### Implementation notes

- Implement in `middleware.ts` using the Web Crypto API — `jose` cannot be used here (Edge runtime)
- Rate limit POST, PATCH, DELETE routes only — do not rate limit GET routes
- Use an in-memory store keyed by IP address (`request.ip` or `x-forwarded-for` header)
- Limit: 60 mutating requests per IP per minute
- On breach: return `NextResponse.json({ error: "Too many requests" }, { status: 429 })` with `Retry-After: 60` header

### DoD check

| Confirmed | How                                                                                            | Item                                             |
| --------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [ ]       | Browser DevTools — send 61 rapid POST requests to any API route, confirm 429 on the 61st      | Rate limit triggers at threshold                 |
| [ ]       | Browser DevTools — confirm `Retry-After: 60` header present on 429 response                   | Retry-After header returned                      |
| [ ]       | Browser DevTools — confirm GET requests are never rate limited regardless of volume            | GET routes excluded from rate limiting           |
| [ ]       | `npx tsc --noEmit` passes clean in terminal                                                    | TypeScript clean                                 |

---

## PBI-030 — Interview Notes Per Stage

**Goal:** Users can log notes against a specific application stage. Notes are stored in a new `InterviewNote` model linked to `Application`.

### Step 1 — Update `prisma/schema.prisma`

Add the `InterviewNote` model and the `notes` relation to `Application`:

```prisma
model Application {
  // ... existing fields ...
  source         String?
  stageEnteredAt DateTime          @default(now())
  contacts       Contact[]
  notes          InterviewNote[]
}

model InterviewNote {
  id            String           @id @default(cuid())
  applicationId String
  application   Application      @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  stage         ApplicationStage
  content       String
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt

  @@index([applicationId])
}
```

**Key decisions:**

- `stage` field on `InterviewNote` links the note to the pipeline stage it was written for
- `content` is the only required field beyond the relation
- `onDelete: Cascade` — deleting an application hard-deletes its notes
- `source` and `stageEnteredAt` added to `Application` here — run all schema changes in one migration

### Step 2 — Run the migration

```bash
npx prisma migrate dev --name add-interview-notes-source-stage-tracking
```

### Step 3 — Create the Zod schema

Create `lib/schemas/note.ts`:

```typescript
// lib/schemas/note.ts
import { z } from "zod";
import { ApplicationStage } from "@prisma/client";

export const createNoteSchema = z.object({
  applicationId: z.string().min(1, "Application ID is required"),
  stage: z.nativeEnum(ApplicationStage),
  content: z.string().min(1, "Note content is required"),
});

export const updateNoteSchema = z.object({
  content: z.string().min(1, "Note content is required"),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
```

### Step 4 — Create API routes

`app/api/applications/[id]/notes/route.ts` — POST handler:

```typescript
// @jest-environment node
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNoteSchema } from "@/lib/schemas/note";
import { getUserFromRequest } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const user = await getUserFromRequest(request);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const application = await prisma.application.findFirst({
      where: { id, userId: user.userId, deletedAt: null },
    });
    if (!application)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await request.json();
    const result = createNoteSchema.safeParse({ ...body, applicationId: id });
    if (!result.success)
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 },
      );

    const note = await prisma.interviewNote.create({ data: result.data });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/applications/${id}`);

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("[POST /api/applications/[id]/notes]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

`app/api/notes/[id]/route.ts` — PATCH + DELETE handlers:

```typescript
// @jest-environment node
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateNoteSchema } from "@/lib/schemas/note";
import { getUserFromRequest } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function getOwnedNote(userId: string, noteId: string) {
  return prisma.interviewNote.findFirst({
    where: { id: noteId, application: { userId, deletedAt: null } },
    include: { application: true },
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const user = await getUserFromRequest(request);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const note = await getOwnedNote(user.userId, id);
    if (!note)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await request.json();
    const result = updateNoteSchema.safeParse(body);
    if (!result.success)
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 },
      );

    const updated = await prisma.interviewNote.update({
      where: { id },
      data: result.data,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/applications/${note.applicationId}`);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH /api/notes/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const user = await getUserFromRequest(request);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const note = await getOwnedNote(user.userId, id);
    if (!note)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.interviewNote.delete({ where: { id } });

    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/applications/${note.applicationId}`);

    return NextResponse.json({ message: "Note deleted" });
  } catch (error) {
    console.error("[DELETE /api/notes/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

### Step 5 — Client mutation pattern

In `InterviewNoteForm.tsx` and any component that deletes a note:

```typescript
// After successful mutation — do not use router.push for notes
// Notes are on the detail page — refresh in place
router.refresh();
// If redirecting after delete to a different page:
// router.refresh();
// setTimeout(() => router.push("/dashboard"), 100);
```

### DoD check

| Confirmed | How                                                                                                          | Item                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| [ ]       | Browser — open an application detail page, add a note for the current stage, confirm it appears immediately  | Note creates and displays without page reload            |
| [ ]       | Browser — edit an existing note, save, confirm the updated content displays immediately                      | Note updates correctly                                   |
| [ ]       | Browser — delete a note, confirm it is removed immediately without stale data on Vercel                      | Note deletes — no stale data on Vercel after delete      |
| [ ]       | Browser — confirm notes are grouped correctly by stage on the detail page                                    | Notes display against the correct stage                  |
| [ ]       | `npm test` — `api.notes.test.ts` passes (POST: 401, 400, 201, 404)                                          | API POST tests passing                                   |
| [ ]       | `npm test` — `api.notes.[id].test.ts` passes (PATCH: 401, 404, 200; DELETE: 401, 404, 200)                  | API PATCH + DELETE tests passing                         |
| [ ]       | `npx tsc --noEmit` passes clean in terminal                                                                  | TypeScript clean                                         |

---

## PBI-031 — Notes History / Timeline View

**Goal:** Notes on the application detail page are displayed as a timeline grouped by stage, ordered by `createdAt` descending within each group.

### Implementation notes

- `NoteTimeline` component receives all notes for the application and groups them by `stage`
- Stage group order matches the `ApplicationStage` enum order: APPLIED → SCREENING → INTERVIEW → ASSESSMENT → OFFER → CLOSED
- Within each stage group, notes are ordered newest first (`createdAt` DESC)
- Empty stages are not rendered — only stages with at least one note appear
- Wire into `app/dashboard/applications/[id]/page.tsx` with Prisma `include` on `notes`

### DoD check

| Confirmed | How                                                                                             | Item                                              |
| --------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [ ]       | Browser — add notes at two different stages, confirm they appear under the correct stage header | Notes grouped correctly by stage                  |
| [ ]       | Browser — add two notes to the same stage, confirm newest appears first                         | Notes within a stage ordered newest first         |
| [ ]       | Browser — confirm stages with no notes do not render a section header                           | Empty stages hidden                               |
| [ ]       | `npm test` — `NoteTimeline.test.tsx` passes                                                     | RTL test passing                                  |
| [ ]       | `npx tsc --noEmit` passes clean in terminal                                                     | TypeScript clean                                  |

---

## PBI-026 — Conversion Rate Metric

**Goal:** Dashboard displays the conversion rate from applied → interview and interview → offer.

### Implementation notes

- Compute in `GET /api/dashboard/metrics` route — do not compute in the component
- Applied → interview rate: `(applications with stage INTERVIEW or beyond / total active) * 100`
- Interview → offer rate: `(applications with stage OFFER or beyond / applications with stage INTERVIEW or beyond) * 100`
- Return as `{ conversionRates: { appliedToInterview: number, interviewToOffer: number } }`
- `ConversionChart` component renders two percentage figures — cards or bar segments
- `revalidatePath("/dashboard")` in the metrics route is not needed (GET) — no mutation

### DoD check

| Confirmed | How                                                                                                           | Item                                              |
| --------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [ ]       | Browser — add applications across multiple stages, confirm conversion rates update correctly on dashboard     | Conversion rates compute and render correctly     |
| [ ]       | Browser — confirm 0% renders correctly when no applications have reached interview or offer stage             | Zero state renders without division error         |
| [ ]       | `npm test` — `api.dashboard.metrics.test.ts` passes                                                           | Metrics API test passing                          |
| [ ]       | `npm test` — `ConversionChart.test.tsx` passes                                                                | RTL test passing                                  |
| [ ]       | `npx tsc --noEmit` passes clean in terminal                                                                   | TypeScript clean                                  |

---

## PBI-027 — Time-in-Stage Metric

**Goal:** Dashboard displays the average number of days an application spends in each stage.

### Implementation notes

- `stageEnteredAt` field added to `Application` in the PBI-030 migration — already done
- Update `stageEnteredAt` in the PATCH handler when `stage` changes:
```typescript
  // In PATCH handler — stage-only update branch
  const updated = await prisma.application.update({
    where: { id },
    data: {
      stage: result.data.stage,
      stageEnteredAt: new Date(),
    },
  });
```
- Compute average days per stage in `GET /api/dashboard/metrics` — add to the existing metrics response
- `TimeInStageChart` component renders a horizontal bar per stage showing average days
- Stages with no data render as 0 days — do not hide them

### DoD check

| Confirmed | How                                                                                                               | Item                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [ ]       | Browser — move an application between stages, confirm `stageEnteredAt` updates on each stage change              | `stageEnteredAt` updates on stage progression     |
| [ ]       | Browser — confirm time-in-stage chart renders correct average days per stage on dashboard                        | Average days compute and render correctly         |
| [ ]       | Browser — confirm stages with no applications render as 0 days rather than being hidden                          | Zero state renders for all stages                 |
| [ ]       | `npm test` — `TimeInStageChart.test.tsx` passes                                                                   | RTL test passing                                  |
| [ ]       | `npx tsc --noEmit` passes clean in terminal                                                                       | TypeScript clean                                  |

---

## PBI-028 — Source Effectiveness Metric

**Goal:** Users can tag an application with a source (LinkedIn, Referral, Cold Apply, Job Board, Other). Dashboard shows conversion rate grouped by source.

### Implementation notes

- `source` field added to `Application` in the PBI-030 migration — already done
- Add `source` to `updateApplicationSchema` in `lib/schemas/application.ts`:
```typescript
  source: z.enum(["LINKEDIN", "REFERRAL", "COLD_APPLY", "JOB_BOARD", "OTHER"]).optional(),
```
- Add source selector to `ApplicationForm` — `<select>` with `htmlFor`/`id` pair
- Compute source effectiveness in `GET /api/dashboard/metrics` — add to metrics response
- `SourceChart` component renders a breakdown of applications and offers per source

### DoD check

| Confirmed | How                                                                                                        | Item                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [ ]       | Browser — create an application with a source tag, confirm it saves and displays on the detail page        | Source field saves and renders correctly                |
| [ ]       | Browser — confirm source effectiveness chart renders on dashboard grouped by source                        | Source chart renders with correct groupings             |
| [ ]       | Browser — confirm applications with no source tag are grouped under "Other" or excluded cleanly            | Null source handled gracefully                          |
| [ ]       | `npx tsc --noEmit` passes clean in terminal                                                                | TypeScript clean                                        |

---

## PBI-041 — Integration Tests — API Routes

**Goal:** Integration tests cover all new API routes introduced in Sprint 4.

### Test files to create

| File                                | Covers                                              | Expected tests |
| ----------------------------------- | --------------------------------------------------- | -------------- |
| `__tests__/api.notes.test.ts`       | `POST /api/applications/[id]/notes`                 | 4              |
| `__tests__/api.notes.[id].test.ts`  | `PATCH /api/notes/[id]`, `DELETE /api/notes/[id]`   | 6              |
| `__tests__/api.dashboard.metrics.test.ts` | `GET /api/dashboard/metrics`                  | 4              |

### Rules

- `@jest-environment node` docblock must be the absolute first line of every file — before any comments or imports
- `moduleNameMapper` for `@/` alias is already declared in `jest.config.ts` — do not remove it
- Mock `getUserFromRequest` and `prisma` — do not connect to the real database in tests
- One test file per route file — mirrors Sprint 3 pattern

### DoD check

| Confirmed | How                                                                                             | Item                                                           |
| --------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [ ]       | `npm test` — `api.notes.test.ts` 4 tests passing (401, 400, 201, 404)                          | POST /api/applications/[id]/notes tests passing                |
| [ ]       | `npm test` — `api.notes.[id].test.ts` 6 tests passing (PATCH: 401, 404, 200; DELETE: 401, 404, 200) | PATCH + DELETE /api/notes/[id] tests passing              |
| [ ]       | `npm test` — `api.dashboard.metrics.test.ts` 4 tests passing (401, 200, empty state, multi-user isolation) | GET /api/dashboard/metrics tests passing            |
| [ ]       | `npm test` — full suite passes with 0 failures                                                  | All 48 tests passing (34 carried + 14 new)                     |
| [ ]       | `npx tsc --noEmit` passes clean in terminal                                                     | TypeScript clean                                               |

---

## PBI-044 — API Documentation

**Goal:** All API routes are documented with inline JSDoc comments covering method, path, auth, request body, response shape, and status codes.

### Documentation standard

```typescript
/**
 * POST /api/applications/[id]/notes
 * Auth: Required (JWT cookie)
 *
 * Request body:
 *   { stage: ApplicationStage, content: string }
 *
 * Responses:
 *   201 — InterviewNote object created
 *   400 — Validation failed { error, details }
 *   401 — Unauthorized { error }
 *   404 — Application not found { error }
 *   500 — Internal server error { error }
 */
```

Apply to every route handler in `app/api/`. Existing Sprint 1–3 routes must also be documented this sprint.

### DoD check

| Confirmed | How                                                                                             | Item                                                   |
| --------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [ ]       | Code review — every route handler in `app/api/` has a JSDoc comment above the function         | All route handlers documented                          |
| [ ]       | Code review — every JSDoc block includes method, path, auth, request body, responses           | Documentation is complete per standard                 |
| [ ]       | `npx tsc --noEmit` passes clean in terminal                                                     | TypeScript clean                                       |

---

## Before Merging to `develop`

Run the full pre-merge checklist:

```bash
# 1. TypeScript
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Tests
npm test

# 4. Build
npm run build
```

All four must pass clean. Then:

```bash
git add .
git commit -m "[PBI-026 to PBI-044] Sprint 4: Notes, metrics, rate limiting, integration tests, API docs"
git push origin feature/sprint-04-notes-metrics
```

Open a PR on GitHub: `feature/sprint-04-notes-metrics → develop`. Use the sprint goal as the PR title:

> **Sprint 4: The application is hardened and measurable. Users can log interview notes, view a timeline per application, and see conversion and time-in-stage metrics on the dashboard.**

Merge to `develop`. Verify the Vercel preview. Then proceed to Sprint 5.

---

## Sprint Close Checklist

After the PR is merged to `develop`:

- [ ] Mark all 8 PBIs `[x]` in `sprint-04.md`
- [ ] Mark all 8 PBIs `[x]` in `product.md`
- [ ] Complete `sprint-04.md` Sprint Review and Retrospective sections
- [ ] Fill retro insight in `sprint-04.md` for LinkedIn
- [ ] Commit updated docs directly to `develop`: `git commit -m "[DOCS] Sprint 4 close — update sprint-04.md, product.md"`
- [ ] Update Notion Sprint Board: Sprint 4 → ✅ Closed, Sprint 5 → 🔄 In progress
- [ ] Add Sprint 4 Changelog entry to Notion
- [ ] `plan.md` Sprint Summary Table updated with close date
- [ ] Phase 2 gate progress recorded in `plan.md`

---

_sprint-04-implementation.md — 30 April 2026 — HireTrace_
_Branch: `feature/sprint-04-notes-metrics`. Follow PBIs in dependency order. Run `npm run build` locally before every push. Pin all packages._