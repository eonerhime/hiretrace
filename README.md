# HireTrace

A job application pipeline tracker — built for job seekers who need clarity, control, and confidence over their search.

Built in public using **Spec-Driven Development** as a portfolio showcase project.

---

## What is HireTrace?

Most job seekers manage their search in spreadsheets — tools that were never designed for the non-linear, relationship-driven process of finding work. HireTrace replaces that friction with a purpose-built pipeline tracker that surfaces what matters: where you stand, what needs attention, and what's working.

**Core features (MVP):**

- 6-stage Kanban pipeline — Applied → Screening → Interview → Assessment → Offer → Closed
- Contact tracking per application (recruiter, hiring manager)
- Follow-up reminder system with overdue flagging
- Dashboard with summary metrics and pipeline distribution
- Secure authentication (email/password)

---

## Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Framework  | Next.js 15 (App Router)      |
| Language   | TypeScript (strict mode)     |
| Styling    | Tailwind CSS                 |
| Database   | PostgreSQL via Neon          |
| ORM        | Prisma                       |
| Validation | Zod                          |
| Deployment | Vercel                       |
| Testing    | React Testing Library + Jest |

---

## Project Status

**Current phase:** Pre-Sprint — documentation complete, Sprint 1 starts 06 May 2026

**Release plan:**

- Phase 1 — MVP (Sprints 1–3) — target: 16 June 2026
- Phase 2 — Enhanced (Sprints 4–5) — target: 14 July 2026
- Phase 3 — Full Release (Sprint 6) — target: 28 July 2026

---

## Methodology — Spec-Driven Development

Every feature in HireTrace starts as a specification before it becomes code. The development sequence is:

```
product.md → plan.md → spec.md → features.md → tasks.md → implementation → testing
```

All SDD documents are public and committed to this repository. This project is as much a demonstration of process as it is of code.

---

## SDD Documents

All project documents live in the `/docs` directory.

| Document                                            | Purpose                                             |
| --------------------------------------------------- | --------------------------------------------------- |
| [`product.md`](docs/product.md)                     | Mission, personas, 46-item backlog, release plan    |
| [`plan.md`](docs/plan.md)                           | Sprint calendar, capacity model, Definition of Done |
| [`spec.md`](docs/spec.md)                           | Feature specs, acceptance criteria, API contracts   |
| [`features.md`](docs/features.md)                   | Feature breakdown per PBI                           |
| [`tasks.md`](docs/tasks.md)                         | Atomic dev tasks per feature                        |
| [`implementation.md`](docs/implementation.md)       | Stack decisions, architecture, ADRs, changelog      |
| [`testing.md`](docs/testing.md)                     | Test philosophy, suites, cases, results log         |
| [`linkedin.md`](docs/linkedin.md)                   | Content strategy and post log                       |
| [`sprints/sprint-01.md`](docs/sprints/sprint-01.md) | Sprint 1 tracking document                          |

---

## Local Development Setup

> ⚠️ Sprint 1 starts 06 May 2026. Setup instructions will be completed and verified at that point. The steps below reflect the planned setup — update this section at PBI-043 (Sprint 3).

### Prerequisites

- Node.js 20+
- npm 10+
- A Neon account (free at neon.tech)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/[username]/hiretrace.git
cd hiretrace

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in .env.local with your Neon connection strings and JWT secret

# 4. Run database migrations
npx prisma migrate dev

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
npm test              # run all tests
npm test -- --watch   # watch mode
npm test -- --coverage # with coverage report
```

---

## Branch Strategy

| Branch                 | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `main`                 | Protected — production-ready code only. No direct commits. |
| `develop`              | Integration branch — all feature branches merge here       |
| `feature/PBI-XXX-desc` | One branch per PBI — opened from `develop`                 |

All commits go to `develop` or a `feature/` branch. `main` receives merges only at sprint close or phase gates.

---

## Follow the Build

This project is built in public. Follow along on LinkedIn for sprint updates, technical decisions, and retrospectives — 3 posts per week throughout the build.

- **LinkedIn:** [Emo Onerhime](https://linkedin.com/in/emoonerhime)
- **Notion workspace:** _(link added at Sprint 1 close)_
- **Live app:** _(link added at MVP launch — 16 June 2026)_

---

## Licence

MIT

---

_HireTrace — Built in public using Spec-Driven Development — 2026_
