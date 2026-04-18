# HireTrace — LinkedIn Content Plan

**Document Type:** Portfolio Communication Artefact
**Version:** 2.0
**Date:** April 17, 2026
**Status:** Active
**Posting Frequency:** 3x per week — Tuesday, Thursday, Saturday
**Personal Brand:** Full — real name, real photo, first-person voice

---

## Cross-References

| Document               | Relationship                                    |
| ---------------------- | ----------------------------------------------- |
| `product.md`           | Source of project milestones that trigger posts |
| `plan.md`              | Sprint calendar drives post schedule            |
| `sprints/sprint-XX.md` | Sprint close triggers carousel post             |
| `implementation.md`    | Technical milestones trigger screenshot posts   |

---

## How This File Works

This file contains **every LinkedIn post for the HireTrace project**, written and ready to publish. Each post is tied to a specific project milestone and a specific date slot.

**Your workflow per post:**

1. Open this file on the scheduled day
2. Find the next post marked `[ ]` Not posted
3. Copy the post text into LinkedIn
4. Attach the screenshot or carousel file noted above the post
5. Publish
6. Mark status `[x]` Posted and record impressions in the Post Log after 48 hours

**Post status markers:**

- `[ ]` Not posted
- `[~]` Drafted / scheduled
- `[x]` Posted

---

## Canva One-Time Setup (Do Today — Before Post 01)

Takes 30 minutes. Do it once.

**Step 1 — Brand Kit**
Open Canva → Brand Hub → Create Brand Kit

- Colours: `#0A2342` (Deep Navy) · `#2D7DD2` (Electric Blue) · `#F5F5F0` (Warm White) · `#6B7280` (Slate Grey)
- Font: Inter (search in Canva font library)

**Step 2 — Carousel Template**

- Search Canva: "LinkedIn carousel professional minimal"
- Resize canvas to **1080 x 1350px**
- Apply brand colours and Inter font
- Add to every slide footer: `HireTrace | Emo Onerhime | https://linkedin.com/in/emoonerhime`
- Save as: `HireTrace Carousel Template`

**Step 3 — Screenshot Frame**

- New design → **1080 x 1080px**
- Add a browser mockup frame (search "browser mockup" in Canva elements)
- White card background, subtle drop shadow
- Save as: `HireTrace Screenshot Frame`

**Rule:** Always duplicate a saved template. Never design from scratch.

---

## Content Cadence Overview

| Week                          | Tuesday                                            | Thursday                       | Saturday                      |
| ----------------------------- | -------------------------------------------------- | ------------------------------ | ----------------------------- |
| Week 1 — Pre-Sprint           | Post 01 — Announcement                             | Post 02 — The problem          | Post 03 — What is SDD         |
| Week 2 — Pre-Sprint           | Post 04 — product.md explained                     | Post 05 — Building the backlog | Post 06 — The 6 strategies    |
| Week 3 — Sprint 1             | Post 07 — Sprint 1 goal                            | Post 08 — First commit         | Post 09 — Auth is live        |
| Week 4 — Sprint 1 Close       | Post 10 — Retro insight                            | Post 11 — Sprint 1 carousel    | Post 12 — implementation.md   |
| Week 5 — Sprint 2             | Post 13 — First feature shipped                    | Post 14 — Writing tests first  | Post 15 — Kanban pipeline     |
| Week 6 — Sprint 2 Close       | Post 16 — Retro insight                            | Post 17 — Sprint 2 carousel    | Post 18 — What the spec drove |
| Week 7 — Sprint 3             | Post 19 — Contact tracking                         | Post 20 — Dashboard metrics    | Post 21 — Reminder system     |
| Week 8 — Sprint 3 Close / MVP | Post 22 — MVP is live                              | Post 23 — Sprint 3 carousel    | Post 24 — Phase 1 retro       |
| Week 9+                       | Sprint 4–6 posts — topics planned in final section |                                |                               |

---

## PRE-SPRINT POSTS — Weeks 1 & 2

Post these before writing a single line of code. They establish your voice, your process, and your audience.

---

### POST 01 — Project Announcement

**Week 1, Tuesday · Text only**
**Asset:** None
**Status:** `[ ]` Not posted

```
I'm building something. And I'm doing it in public.

HireTrace is a job application pipeline tracker — built for
job seekers who are tired of managing their search in a
spreadsheet that was never designed for the job.

But the project itself is as important as the product.

I'm wearing every hat:
→ Product Owner — defining what gets built and why
→ Scrum Master — running the sprints and ceremonies
→ Full-Stack Developer — Next.js, PostgreSQL, Railway, Vercel
→ Tester — React Testing Library, integration, E2E
→ Documenter — specs, ADRs, API docs

The methodology is Spec-Driven Development. Every feature
starts as a spec before it becomes code.

I'll be posting 3x a week — the decisions, the trade-offs,
the retros, and the lessons.

Follow along if you want to see what it looks like to build
software the right way, from the ground up.

Sprint 1 starts next week.

#HireTrace #BuildInPublic #ScrumMaster #ProductOwner #NextJS #SpecDrivenDevelopment
```

---

### POST 02 — The Problem HireTrace Solves

**Week 1, Thursday · Text + Screenshot**
**Asset:** Screenshot of product.md Problem Statement section in GitHub → drop into HireTrace Screenshot Frame in Canva
**Status:** `[ ]` Not posted

```
Most job seekers have a list problem.
What they actually have is a pipeline problem.

Here's the difference:

A list tracks what you've done.
A pipeline tracks where things are and what needs to happen next.

Spreadsheets are lists. They have no stage workflow, no
follow-up triggers, no conversion visibility. They just grow
longer and more overwhelming.

The result:
→ Applications fall through with no follow-up
→ Candidates lose track of which resume went where
→ Rejection compounds because there's no structure to hold it

HireTrace is opinionated about this. It enforces a 6-stage
pipeline: Applied → Screening → Interview → Assessment →
Offer → Closed.

You can't skip stages. You can't lose context. You can see
exactly where you stand.

The screenshot is from product.md — the Product Owner
document I wrote before touching any code.

Full doc in the GitHub repo. Link in comments.

#HireTrace #BuildInPublic #ProductOwner #JobSearch #SoftwareEngineering
https://github.com/eonerhime/hire-trace/blob/main/spec/product.md
```

---

### POST 03 — What is Spec-Driven Development

**Week 1, Saturday · Text only**
**Asset:** None
**Status:** `[ ]` Not posted

```
Spec-Driven Development changed how I build software.

Here's what it means in practice:

Before I write a single line of code, I write:
→ A product document (the why and the what)
→ A feature spec (the exact behaviour expected)
→ Acceptance criteria (how I know it's done)
→ A test case (how I prove it)

Only then does implementation begin.

Most developers do the opposite. They build first, then figure
out what they were supposed to build. Then they write tests
to confirm what they accidentally made.

SDD flips this. The spec is the contract. The code is the
fulfilment of that contract. The test is the proof.

For HireTrace, every one of the 46 backlog items has a spec
before it has a commit.

The upfront cost is real.
The downstream cost of not doing it is higher.

What does your pre-build process look like?

#HireTrace #BuildInPublic #SpecDrivenDevelopment #SoftwareEngineering #Agile
```

---

### POST 04 — The product.md File Explained

**Week 2, Tuesday · Text + Screenshot**
**Asset:** Screenshot of product.md Table of Contents in GitHub → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
I wrote 600 words before opening my code editor.

That document is product.md — the Product Owner artefact
that drives every downstream decision on HireTrace.

It contains:
→ Mission — why this product exists
→ Problem statement — what it solves and for whom
→ 3 user personas with named, specific pain points
→ Success metrics — product AND portfolio
→ Scope boundaries — what HireTrace is and is not
→ 6 backlog derivation strategies (enumerated, not assumed)
→ 46 prioritised backlog items across 10 epics
→ A 3-phase, 6-sprint release plan

The scope boundary section is the one most POs skip.

Knowing what you're NOT building is as important as knowing
what you are. It's the document that lets you say no — with
evidence, not instinct.

Full document in the GitHub repo. Link in comments.

#HireTrace #BuildInPublic #ProductOwner #Agile #ScrumMaster #SpecDrivenDevelopment
https://github.com/eonerhime/hire-trace/blob/main/spec/product.md
```

---

### POST 05 — Building the Backlog

**Week 2, Thursday · Text only**
**Asset:** None
**Status:** `[ ]` Not posted

```
A backlog is not a wish list.

A wish list is what happens when a team sits in a room and
brainstorms features until the whiteboard is full.

A backlog is derived — from evidence, from user behaviour,
from pain points, from competitive gaps, from delivery constraints.

For HireTrace, I used 6 strategies to build the backlog.
None of them started with "what features should we build?"

Tomorrow I'll walk through all 6.

The result: 46 backlog items across 10 epics. Every one
traceable to a user need or a delivery constraint.

Zero guessing. Full traceability.

That's the difference between a Product Owner and someone
who makes lists.

#HireTrace #BuildInPublic #ProductOwner #ProductManagement #Agile
```

---

### POST 06 — The 6 Backlog Derivation Strategies

**Week 2, Saturday · Text + Screenshot**
**Asset:** Screenshot of Backlog Derivation Strategies section in product.md → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
Here are the 6 strategies I used to build the HireTrace
product backlog — without a single brainstorm session.

1. Persona Journey Mapping
Walk each user through their end-to-end journey.
At every step: what do they need, and what do they need to do?

2. Pain Point Inversion
Every pain point is an unmet need.
Invert it — you get a feature hypothesis with a rationale attached.

3. Competitive Gap Analysis
What do existing tools do badly?
Where are all competitors weak? That's your differentiation.

4. MoSCoW Prioritisation
Must / Should / Could / Won't Have.
This is how scope is defined — not by gut feel.

5. Sprint Capacity Sizing
Every item is sized S / M / L / XL.
Items too large are decomposed. The backlog is shaped by what's
deliverable, not just what's desirable.

6. Dependency Ordering
What must exist before something else can be built?
This prevents sprint blockers before they happen.

Result: 46 items. 28 Must Have. 7 Should Have. 10 Could Have.

All in product.md — link in comments.

#HireTrace #BuildInPublic #ProductOwner #ProductManagement #Agile #ScrumMaster
```

---

## SPRINT 1 POSTS — Weeks 3 & 4

---

### POST 07 — Sprint 1 Goal and Plan

**Week 3, Tuesday · Text + Screenshot**
**Asset:** Screenshot of Notion Sprint 1 board → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
Sprint 1 starts today.

Goal: A deployed Next.js application with working
authentication. Foundation complete. Nothing else.

That specificity is intentional.

Most teams make the mistake of writing sprint goals that
describe a list of tasks. "Build auth, set up the DB,
configure deployment." That's a task list. Not a goal.

A sprint goal describes the value delivered when the sprint
is done. "Users can securely register and log in to
HireTrace" — that's a goal. It has a clear definition of
done the whole team can rally behind.

(Yes, I am the whole team. The discipline still applies.)

Sprint 1 backlog:
→ PBI-001 to PBI-008 — Foundation and Auth
→ PBI-037, PBI-039 — Validation + security headers
→ PBI-046 — Notion workspace live and public

Notion board is live and public. Link in comments.

#HireTrace #BuildInPublic #ScrumMaster #Agile #Sprint #NextJS
https://dull-grain-172.notion.site/HireTrace-3463cecb82d08016a90be8bf80a5c6ce
```

---

### POST 08 — First Commit

**Week 3, Thursday · Text + Screenshot**
**Asset:** Screenshot of GitHub repository structure or first commit → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
First commit is in.

Next.js 15. TypeScript strict mode. Tailwind CSS.
PostgreSQL on Railway. Prisma ORM. Repository on GitHub.

The scaffold is never just the scaffold.

Every decision made here — folder structure, TypeScript
config, ORM choice, database provider — creates constraints
that follow you to production. Getting it right costs an hour.
Getting it wrong costs a sprint.

Three decisions I made deliberately:

1. Railway over Neon for PostgreSQL
   Railway's DX is cleaner for a solo project at this stage.

2. Prisma over raw SQL
   Schema-first aligns with SDD — the data model is a spec
   before it's a migration.

3. TypeScript strict mode from day one
   Not from "when things get complex." From commit one.
   Retrofitting types is a tax on future-you.

Repo is public. Link in comments.

#HireTrace #BuildInPublic #NextJS #TypeScript #Prisma #PostgreSQL
```

---

### POST 09 — Auth is Live

**Week 3, Saturday · Text + Screenshot**
**Asset:** Screenshot of HireTrace login page → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
Authentication is live on HireTrace.

Email + password registration. bcrypt hashing.
JWT session management. Protected route middleware.

Here's what most tutorials get wrong about auth:

They treat it as a feature. It's not. It's infrastructure.

Every user-scoped feature in HireTrace — applications,
contacts, reminders, analytics — depends on knowing who
the user is. Auth isn't first because it's most interesting.
It's first because nothing else works without it.

The acceptance criteria, written in spec.md before any code:

→ User can register with email and password
→ Password is hashed — never stored plain
→ User can log in and receive a JWT session
→ Protected routes redirect unauthenticated users to /login
→ Session persists across page refreshes

Every criterion has a corresponding RTL test.

Spec drives test. Test drives code. That's SDD.

#HireTrace #BuildInPublic #Auth #NextJS #SpecDrivenDevelopment #ReactTestingLibrary
```

---

### POST 10 — Sprint 1 Retro Insight

**Week 4, Tuesday · Text only**
**Asset:** None
**Status:** `[ ]` Not posted

```
Sprint 1 retro surfaced something I didn't expect.

I underestimated the time cost of wearing every hat simultaneously.

When you're the PO, you make a decision.
When you're the Scrum Master, you document it.
When you're the developer, you implement it.
When you're the tester, you prove it.
When you're the documenter, you record it for the next person.

That "next person" is me, two sprints from now, reading
implementation.md trying to remember why I made a choice.

The discipline that saved me: writing the decision down
before implementing it. Not after. Before.

In Sprint 2, I'm adding a 15-minute decision log step
before starting any L or XL sized task. The cost is 15 minutes.
The benefit is that implementation.md stays honest.

Retros are only useful if they change something.
This one did.

#HireTrace #BuildInPublic #ScrumMaster #Agile #Retrospective #SoftwareEngineering
```

---

### POST 11 — Sprint 1 Carousel

**Week 4, Thursday · Carousel PDF**
**Asset:** Build carousel in Canva using HireTrace Carousel Template. Export as PDF. Upload to LinkedIn.\*\*
**Status:** `[ ]` Not posted

**Slide content to build in Canva:**

```
SLIDE 1 — Hook
Sprint 1 is done.
Here's everything that happened — and one thing I'd change.

SLIDE 2 — Context
HireTrace | Sprint 1
Goal: Working auth on a deployed Next.js app
Duration: 2 weeks
Items committed: [fill at close] | Completed: [fill at close]

SLIDE 3 — What shipped
✓ Next.js 15 + TypeScript + Tailwind scaffold
✓ PostgreSQL on Railway + Prisma ORM
✓ Email/password auth with bcrypt
✓ JWT session management
✓ Protected route middleware
✓ Vercel deployment live

SLIDE 4 — The SDD layer
Every feature started as an acceptance criterion.
Every AC became a test case.
Every test case drove the implementation.
Zero features built without a spec.

SLIDE 5 — The key decision
Railway over Neon for PostgreSQL.
Simpler DX. Less pooling complexity at this stage.
Documented in implementation.md as an architectural decision.

SLIDE 6 — Test coverage
[Fill with RTL test count and coverage % at sprint close]

SLIDE 7 — The retro
✓ Spec-first discipline held throughout
✗ Context-switching between hats cost more time than estimated
→ Adding 15-min decision log before every L/XL task in Sprint 2

SLIDE 8 — The result
HireTrace is live on Vercel.
You can't do much yet. But the foundation is solid.
[Add screenshot of live login page]

SLIDE 9 — What's next
Sprint 2: The core application pipeline.
Kanban board. Drag-and-drop. Application CRUD.
The product starts to exist.

SLIDE 10 — Takeaway
The sprint goal is not a task list.
"Users can securely register and log in" is a goal.
"Build auth, set up DB, configure deployment" is a list.
Know the difference.

SLIDE 11 — CTA
Follow for Sprint 2.
GitHub · Notion · Live app — links in comments.
```

**Caption to post with carousel:**

```
Sprint 1 closed. Foundation and auth — done.

Swipe to see what was built, what the retro surfaced,
and the one thing I'm changing in Sprint 2.

GitHub: [link]
Live app: [link]
Notion: [link]

#HireTrace #BuildInPublic #ScrumMaster #NextJS #Agile #Sprint
```

---

### POST 12 — The implementation.md File

**Week 4, Saturday · Text + Screenshot**
**Asset:** Screenshot of implementation.md open in GitHub → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
This one file runs the entire project.

implementation.md is the single source of truth for HireTrace.

It contains:
→ The canonical tech stack
→ Critical rules — hard-won lessons, never repeated
→ Every phase and task with file paths and status markers
→ A session changelog — what changed and when
→ The launch checklist

It is never edited mid-sprint. Only updated at sprint close.
This makes it a genuine audit trail, not a living mess.

The Critical Rules table is the most valuable part.

Every row is a mistake made — or deliberately avoided —
documented so it never happens twice. By Sprint 6 that
table will be one of the most valuable things in the repo.

Most developers keep this knowledge in their heads.
Then they leave the project and it disappears.

SDD externalises it.

Full file in the GitHub repo. Link in comments.

#HireTrace #BuildInPublic #SoftwareEngineering #Documentation #SpecDrivenDevelopment
```

---

## SPRINT 2 POSTS — Weeks 5 & 6

---

### POST 13 — First Feature Shipped

**Week 5, Tuesday · Text + Screenshot**
**Asset:** Screenshot of Add Application form in HireTrace → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
The first real feature is live on HireTrace.

You can now add a job application — company, role,
date applied, source, and initial status.

Under the hood:
→ Zod schema validation on server and client
→ Prisma write to PostgreSQL on Railway
→ API route with typed request and response
→ Form with controlled inputs and error states
→ RTL tests: render, validation, submit, error state

The spec for this feature was written before the component was.
The acceptance criteria drove the test cases.
The test cases drove the implementation.

That sequence matters.

When you write the test after the code, you're testing what
you built. When you write the test before, you're testing
what you meant to build.

Different questions. Different answers.

#HireTrace #BuildInPublic #NextJS #ReactTestingLibrary #SpecDrivenDevelopment
```

---

### POST 14 — Writing Tests First

**Week 5, Thursday · Text + Screenshot**
**Asset:** Screenshot of an RTL test file — use carbon.now.sh for a clean code screenshot, then drop into HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
Here's the test I wrote before the component existed.

[Screenshot of RTL test]

Three things writing tests first forces you to do:

1. Think about behaviour, not implementation
   The test describes what the user experiences — not how
   the code works. That's the right level of abstraction.

2. Define done before you start
   When the test passes, the feature is complete.
   No ambiguity. No "I think it's done."

3. Make the acceptance criteria concrete
   The spec says what should happen. The test proves it does.
   Spec, test, and feature become a single traceable unit.

React Testing Library is the right tool because it tests
from the user's perspective — what they see and interact
with — not internal component state.

That alignment between how users experience the app and how
tests verify it is what makes the test suite valuable.

#HireTrace #BuildInPublic #ReactTestingLibrary #Testing #SpecDrivenDevelopment
```

---

### POST 15 — The Kanban Pipeline

**Week 5, Saturday · Text + Screenshot**
**Asset:** Screenshot of HireTrace Kanban board → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
The Kanban pipeline is live.

6 stages: Applied → Screening → Interview →
Assessment → Offer → Closed

Drag an application card from one column to the next.
Stage updates. Timestamp records. History preserved.

Here's the product decision behind the 6 stages:

Most job trackers let you define your own stages.
Flexible. Unopinionated. And completely unhelpful.

When you're in a stressful job search, the last thing you
need is to design your own workflow. You need a sensible
default that matches how hiring actually works.

HireTrace is opinionated. These 6 stages cover 95% of
hiring processes. If your process is unusual, you'll know
which stage to use anyway.

Opinionated tools get used.
Infinitely flexible tools become configuration projects.

#HireTrace #BuildInPublic #ProductOwner #NextJS #UX #JobSearch
```

---

### POST 16 — Sprint 2 Retro Insight

**Week 6, Tuesday · Text only**
**Asset:** None
**Status:** `[ ]` Not posted

```
Sprint 2 retro. One insight worth sharing.

The drag-and-drop implementation took 3x longer than estimated.

Not because drag-and-drop is hard.
Because I didn't spec the edge cases before building.

What happens when you drag to the same column?
What happens when the DB write fails mid-drag?
What happens on mobile — where there is no drag?

These weren't in the acceptance criteria. They surfaced
during implementation. Which means I was writing the spec
in my head while writing the code — the exact pattern
SDD is designed to prevent.

The fix: edge cases are now a mandatory section in every
spec before implementation begins.

Retros are only useful if they change something.
This one changed the spec template.

#HireTrace #BuildInPublic #ScrumMaster #Retrospective #Agile #SpecDrivenDevelopment
```

---

### POST 17 — Sprint 2 Carousel

**Week 6, Thursday · Carousel PDF**
**Asset:** Build in Canva using HireTrace Carousel Template. Export as PDF.\*\*
**Status:** `[ ]` Not posted

**Slide content:**

```
SLIDE 1 — Hook
Sprint 2 done. The product now exists.
Here's what it took — and what the retro changed.

SLIDE 2 — Context
HireTrace | Sprint 2
Goal: Core application pipeline — CRUD + Kanban board
Duration: 2 weeks
Items committed: [fill] | Completed: [fill]

SLIDE 3 — What shipped
✓ Application data model + Prisma migration
✓ Add / edit / delete application
✓ Application detail page
✓ 6-stage Kanban pipeline view
✓ Drag-and-drop stage progression
✓ RTL test suite for all new components

SLIDE 4 — The hardest part
Drag-and-drop edge cases.
Same column drops. Failed DB writes. Mobile fallback.
None were in the original spec. All are now in the spec template.

SLIDE 5 — Test coverage
[Fill at sprint close]

SLIDE 6 — The retro change
Before: AC described the happy path.
After: AC describes the happy path AND the failure modes.
Edge cases are now a mandatory spec section.

SLIDE 7 — The result
You can add, track, and move job applications
through a 6-stage pipeline. The core product works.
[Screenshot of Kanban board]

SLIDE 8 — What's next
Sprint 3: Contacts, reminders, dashboard.
The pipeline becomes a tool. The tool becomes useful.

SLIDE 9 — Takeaway
Flexibility is not always a feature.
An opinionated 6-stage pipeline gets used.
An infinitely configurable one becomes a project.

SLIDE 10 — CTA
Follow for Sprint 3 — MVP closes out.
GitHub · Notion · live app in comments.
```

**Caption:**

```
Sprint 2 closed. HireTrace now has a working Kanban pipeline.

Swipe to see what shipped, what the retro changed about
the spec template, and what's next.

#HireTrace #BuildInPublic #ScrumMaster #NextJS #Agile
```

---

### POST 18 — What the Spec Drove

**Week 6, Saturday · Text + Screenshot**
**Asset:** Screenshot of spec.md showing AC for the application pipeline feature → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
Here's what a feature spec looks like before the code exists.

[Screenshot of spec.md acceptance criteria section]

Every feature in HireTrace has:
→ A plain-language description
→ Numbered, testable acceptance criteria
→ Edge cases — what happens when things go wrong
→ API contract — endpoint, request shape, response shape
→ Test case references — which RTL tests cover which AC

This is not extra work. This is the work.

The code is the easy part. Knowing exactly what the code
needs to do — that's what spec-driven development makes explicit.

When the spec is written:
The developer knows when they're done.
The tester knows what to test.
The reviewer knows why a decision was made.

One document. Three audiences. Zero ambiguity.

Full spec.md in the GitHub repo. Link in comments.

#HireTrace #BuildInPublic #SpecDrivenDevelopment #SoftwareEngineering #Documentation
```

---

## SPRINT 3 POSTS — MVP (Weeks 7 & 8)

---

### POST 19 — Contact Tracking Built

**Week 7, Tuesday · Text + Screenshot**
**Asset:** Screenshot of contact section on application detail page → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
You now know who to follow up with.

HireTrace tracks contacts per application — recruiter name,
role, email, LinkedIn, and notes.

This was a deliberate product decision made in the spec phase.

Most job trackers treat the application as the unit.
HireTrace treats the relationship as the unit.

Because the application doesn't make a decision.
A person does. And knowing who that person is — with their
details one click away — is the difference between a timely
follow-up and a missed opportunity.

The data model: Contact is linked to Application, not to User.
One application can have multiple contacts. Contacts don't
exist outside an application context.

That constraint was in the spec before the schema was written.
Constraints are decisions. Decisions need reasons.
The reason is in product.md.

#HireTrace #BuildInPublic #NextJS #ProductOwner #SpecDrivenDevelopment
```

---

### POST 20 — Dashboard Metrics

**Week 7, Thursday · Text + Screenshot**
**Asset:** Screenshot of HireTrace dashboard summary stats bar → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
The dashboard now shows you what matters.

Total applications. Active pipeline. Interviews scheduled.
Offers received. Overdue follow-ups.

Five numbers. Complete picture.

Here's the product thinking behind the metric selection:

I started with 12 potential metrics. Then asked one question
for each: "Does knowing this number change what the user
does next?"

If yes — it stays.
If it's just interesting — it goes.

Conversion rate stayed. (Tells you if applications are landing.)
Time-in-stage stayed. (Tells you if something is stalled.)
Total applications sent did not stay on the dashboard.
A vanity metric. Volume without conversion is noise.

Good metrics drive action.
Interesting metrics drive dashboards nobody uses.

#HireTrace #BuildInPublic #ProductOwner #UX #Metrics #JobSearch
```

---

### POST 21 — Reminder System

**Week 7, Saturday · Text + Screenshot**
**Asset:** Screenshot of overdue follow-up indicator on dashboard → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
The follow-up reminder is the feature that makes
HireTrace actually useful.

Every application has a follow-up date. When that date
passes without a status update, the application is flagged
on the dashboard. Red. Unmissable.

Here's why this matters more than it sounds:

The average job seeker applies to 30+ roles. At that volume,
follow-up timing is nearly impossible to manage manually.
The follow-up window is typically 5–7 business days.
Miss it and you're either forgotten or look unprepared.

The reminder doesn't send an email. It doesn't send a push
notification. It makes the thing you need to do impossible
to ignore when you open the app.

Friction reduction, not notification spam.

That's a product decision. It's in the spec. It has a reason.

#HireTrace #BuildInPublic #ProductOwner #UX #JobSearch #NextJS
```

---

### POST 22 — MVP is Live

**Week 8, Tuesday · Text + Screenshot**
**Asset:** Screenshot of live HireTrace app on Vercel → HireTrace Screenshot Frame
**Status:** `[ ]` Not posted

```
HireTrace MVP is live.

3 sprints. 6 weeks. 28 Must Have items. All done.

You can now:
→ Register and log in securely
→ Add and manage job applications
→ Move them through a 6-stage Kanban pipeline
→ Track contacts per application
→ Set follow-up reminders
→ See your pipeline at a glance on the dashboard

Built with Next.js 15, TypeScript, Tailwind CSS,
PostgreSQL on Railway, deployed on Vercel.

Spec-driven from the first document to the last commit.

Every feature has a spec. Every spec has acceptance criteria.
Every AC has a test. Every test is passing.

This is what 6 weeks of building in public looks like.

3 more sprints to the full release. Follow along.

Live app: [link]
GitHub: [link]
Notion: [link]

#HireTrace #BuildInPublic #MVP #NextJS #ScrumMaster #ProductOwner #FullStack
```

---

### POST 23 — Sprint 3 Carousel

**Week 8, Thursday · Carousel PDF**
**Asset:** Build in Canva using HireTrace Carousel Template. Export as PDF.\*\*
**Status:** `[ ]` Not posted

**Slide content:**

```
SLIDE 1 — Hook
Sprint 3 done. MVP shipped.
Here's the full story.

SLIDE 2 — Context
HireTrace | Sprint 3
Goal: Contacts + Reminders + Dashboard = MVP complete
Duration: 2 weeks | Phase 1 of 3 closed

SLIDE 3 — What shipped
✓ Contact tracking per application
✓ Follow-up reminder with overdue flagging
✓ Dashboard — 5 key metrics
✓ README.md complete
✓ Notion workspace fully updated

SLIDE 4 — The product decision
12 metrics considered for the dashboard. 5 made the cut.
Filter: "Does knowing this change what the user does next?"
Vanity metrics cut. Action metrics kept.

SLIDE 5 — Test coverage
[Fill at sprint close]

SLIDE 6 — The retro
[Fill at sprint close]

SLIDE 7 — Phase 1 complete
28 Must Have items. All done.
The foundation is solid. The product is real.
[Screenshot of live app]

SLIDE 8 — What's next
Phase 2 — Sprints 4 and 5.
Notes. Advanced metrics. Resume management. Email reminders.
The useful tool becomes a compelling one.

SLIDE 9 — Takeaway
MVP doesn't mean minimum effort.
It means minimum scope to deliver maximum learning.
We learned a lot. Sprint 4 is better for it.

SLIDE 10 — CTA
HireTrace is live. Try it.
Link in comments. Follow for Phase 2.
```

**Caption:**

```
Sprint 3 closed. MVP is live.

Swipe to see what shipped, what the retro surfaced,
and what Phase 2 looks like.

Live app: [link]
GitHub: [link]
Notion: [link]

#HireTrace #BuildInPublic #MVP #ScrumMaster #NextJS #Agile
```

---

### POST 24 — Phase 1 Retrospective

**Week 8, Saturday · Text only**
**Asset:** None
**Status:** `[ ]` Not posted

```
6 weeks. 3 sprints. 28 features. 1 live product.

Here's what building HireTrace Phase 1 actually taught me.

On being the Product Owner:
Scope boundaries are the most valuable thing you write.
Knowing what you're not building prevents more wasted time
than any sprint ceremony.

On being the Scrum Master:
Sprint goals are not task lists. This seems obvious until
you're under pressure and start listing tasks and calling
them goals. Writing the goal first — then pulling items —
is a muscle. It takes repetition.

On being the Developer:
TypeScript strict mode from commit one. Not from "when
things get complex." Retrofitting types is a tax on future-you.

On being the Tester:
Writing the test before the component is uncomfortable
until it isn't. Then it becomes the only way that makes sense.

On building in public:
The posts made me more deliberate. Knowing I'd have to
explain every decision made me make better decisions.

Phase 2 starts next sprint.

#HireTrace #BuildInPublic #ScrumMaster #ProductOwner #FullStack #Retrospective
```

---

## SPRINT 4–6 POST TOPICS

Full post content for Sprints 4–6 will be written at Sprint 3 close. Topics are planned below.

| Post | Sprint   | Week | Slot     | Topic                                                                  |
| ---- | -------- | ---- | -------- | ---------------------------------------------------------------------- |
| 25   | Sprint 4 | 9    | Tuesday  | Interview notes — why notes belong to stages not applications          |
| 26   | Sprint 4 | 9    | Thursday | API rate limiting — the security decision most solo devs skip          |
| 27   | Sprint 4 | 10   | Tuesday  | Sprint 4 retro insight                                                 |
| 28   | Sprint 4 | 10   | Thursday | Sprint 4 carousel                                                      |
| 29   | Sprint 5 | 11   | Tuesday  | Resume version linking — the most requested feature nobody builds well |
| 30   | Sprint 5 | 11   | Thursday | Email notifications — Resend integration walkthrough                   |
| 31   | Sprint 5 | 12   | Tuesday  | Sprint 5 retro insight                                                 |
| 32   | Sprint 5 | 12   | Thursday | Sprint 5 carousel                                                      |
| 33   | Sprint 6 | 13   | Tuesday  | Outcome analytics — what your job search data actually tells you       |
| 34   | Sprint 6 | 13   | Thursday | Google OAuth — the 20% of auth that takes 80% of the time              |
| 35   | Sprint 6 | 14   | Tuesday  | Sprint 6 retro insight                                                 |
| 36   | Sprint 6 | 14   | Thursday | Sprint 6 carousel — full release                                       |
| 37   | Sprint 6 | 14   | Saturday | The complete HireTrace build story — long-form retrospective           |

---

## Post Log

Record impressions 48 hours after each post. Update after every publish.

| #   | Date Posted | Format            | Impressions | Comments | Link |
| --- | ----------- | ----------------- | ----------- | -------- | ---- |
| 01  |             | Text              |             |          |      |
| 02  |             | Text + Screenshot |             |          |      |
| 03  |             | Text              |             |          |      |
| 04  |             | Text + Screenshot |             |          |      |
| 05  |             | Text              |             |          |      |
| 06  |             | Text + Screenshot |             |          |      |
| 07  |             | Text + Screenshot |             |          |      |
| 08  |             | Text + Screenshot |             |          |      |
| 09  |             | Text + Screenshot |             |          |      |
| 10  |             | Text              |             |          |      |
| 11  |             | Carousel          |             |          |      |
| 12  |             | Text + Screenshot |             |          |      |
| 13  |             | Text + Screenshot |             |          |      |
| 14  |             | Text + Screenshot |             |          |      |
| 15  |             | Text + Screenshot |             |          |      |
| 16  |             | Text              |             |          |      |
| 17  |             | Carousel          |             |          |      |
| 18  |             | Text + Screenshot |             |          |      |
| 19  |             | Text + Screenshot |             |          |      |
| 20  |             | Text + Screenshot |             |          |      |
| 21  |             | Text + Screenshot |             |          |      |
| 22  |             | Text + Screenshot |             |          |      |
| 23  |             | Carousel          |             |          |      |
| 24  |             | Text              |             |          |      |

---

_linkedin.md v2.0 — April 17, 2026 — HireTrace_
_Every post in this file is written and ready to publish. Copy the text, attach the noted asset, post. Update the log after 48 hours. Posts 25–37 to be written at Sprint 3 close._
