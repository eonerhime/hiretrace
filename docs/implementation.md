# HireTrace — Implementation Document

**Document Type:** Technical Reference Artifact
**Version:** 1.0
**Date:** April 17, 2026
**Status:** Active
**Author:** Developer
**Repository:** _(to be added)_

---

## Cross-References

| Document     | Relationship                                                 |
| ------------ | ------------------------------------------------------------ |
| `product.md` | Product scope and constraints that drive technical decisions |
| `plan.md`    | Sprint dates and phase gates referenced in changelog         |
| `spec.md`    | Feature specs that implementation decisions must satisfy     |
| `tasks.md`   | Tasks reference this document for ADR and decision logging   |
| `testing.md` | Test infrastructure decisions recorded here                  |

---

## Table of Contents

1. [Stack](#1-stack)
2. [Architecture](#2-architecture)
3. [Directory Structure](#3-directory-structure)
4. [Infrastructure](#4-infrastructure)
5. [Branch Strategy](#5-branch-strategy)
6. [Environment Variables](#6-environment-variables)
7. [Architectural Decision Records](#7-architectural-decision-records)
8. [Known Trade-offs & Constraints](#8-known-trade-offs--constraints)
9. [Changelog](#9-changelog)

---

## 1. Stack

### Application

| Layer            | Technology            | Version | Purpose                                        |
| ---------------- | --------------------- | ------- | ---------------------------------------------- |
| Framework        | Next.js               | 15      | Full-stack React framework — App Router        |
| Language         | TypeScript            | 5.x     | Strict mode enforced from commit one           |
| Styling          | Tailwind CSS          | 4.x     | Utility-first CSS — no custom CSS files        |
| ORM              | Prisma                | 7.x     | Type-safe database access layer                |
| Validation       | Zod                   | 3.x     | Schema validation — server and client          |
| Forms            | react-hook-form       | 7.x     | Form state management                          |
| Form resolver    | @hookform/resolvers   | 3.x     | Connects Zod schemas to react-hook-form        |
| Auth (tokens)    | jose                  | 5.x     | JWT signing and verification (Edge-compatible) |
| Password hashing | bcryptjs              | 2.x     | bcrypt implementation for Node.js              |
| Testing          | React Testing Library | 14.x    | Component and integration testing              |
| Testing runner   | Jest                  | 29.x    | Test runner for RTL                            |

### Infrastructure

| Service            | Provider | Purpose                                           |
| ------------------ | -------- | ------------------------------------------------- |
| Database           | Neon     | Serverless PostgreSQL — free tier                 |
| Deployment         | Vercel   | Hosting — preview (develop) and production (main) |
| Repository         | GitHub   | Source control and CI trigger                     |
| Project management | Notion   | Public-facing project hub                         |

---

## 2. Architecture

### Request Lifecycle

```
Browser
  ↓
Vercel Edge Network
  ↓
middleware.ts (JWT verification — runs before every request)
  ↓ (authenticated)              ↓ (unauthenticated)
Next.js App Router          Redirect → /login
  ↓                         401 JSON (API routes)
Page Component / API Route Handler
  ↓
Prisma Client (singleton — lib/prisma.ts)
  ↓
Neon PostgreSQL (pooled connection)
```

### Rendering Strategy

| Route type            | Strategy                   | Reason                                                         |
| --------------------- | -------------------------- | -------------------------------------------------------------- |
| `/login`, `/register` | Client Component           | Form interactivity required                                    |
| `/dashboard`          | Server Component (default) | Data fetched server-side; no client state needed at page level |
| `/api/*`              | Route Handler              | REST API — JSON responses                                      |
| `middleware.ts`       | Edge Runtime               | Runs before rendering; must be Edge-compatible                 |

### Auth Flow

```
Register:
  Client → POST /api/auth/register → Zod validate → bcrypt hash → prisma.user.create → 201

Login:
  Client → POST /api/auth/login → Zod validate → prisma.user.findUnique → bcrypt.compare → SignJWT → Set HTTP-only cookie → 200

Protected request:
  Browser sends cookie automatically → middleware.ts reads cookie → jwtVerify → next() or redirect

Logout:
  Client → POST /api/auth/logout → Clear cookie (Max-Age=0) → 200 → client redirects to /login
```

---

## 3. Directory Structure

```
hiretrace/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/
│   │       │   └── route.ts
│   │       ├── logout/
│   │       │   └── route.ts
│   │       └── register/
│   │           └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── (shared UI components — added Sprint 2+)
├── lib/
│   ├── prisma.ts          ← Prisma client singleton
│   └── schemas/
│       └── auth.ts        ← Zod schemas for auth
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── docs/
│   ├── product.md
│   ├── plan.md
│   ├── spec.md
│   ├── features.md
│   ├── tasks.md
│   ├── linkedin.md
│   ├── notion-setup.md
│   ├── implementation.md  ← this file
│   ├── testing.md
│   └── sprints/
│       └── sprint-01.md
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── .env.local             ← gitignored
└── .gitignore
```

**Rules:**

- No business logic in page components — pages compose components and call server actions or API routes
- No direct `new PrismaClient()` outside `lib/prisma.ts`
- No inline styles — Tailwind utility classes only
- No `any` type — TypeScript strict mode enforced
- All Zod schemas live in `lib/schemas/` — never defined inline in components or routes

---

## 4. Infrastructure

### Database — Neon

**Provider:** neon.tech
**Plan:** Free tier
**Engine:** PostgreSQL 17
**Connection mode:** Pooled (runtime) + Direct (migrations)

**Connection string format:**

```
Pooled:  postgresql://USER:PASSWORD@HOST-pooler.region.aws.neon.tech/DATABASE?sslmode=require
Direct:  postgresql://USER:PASSWORD@HOST.region.aws.neon.tech/DATABASE?sslmode=require
```

**Prisma datasource configuration:**

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")      ← pooled — used at runtime
  directUrl = env("DIRECT_URL")        ← direct — used by prisma migrate
}
```

**Known constraint:** Neon free tier pauses compute after a period of inactivity. Cold start on resume is under 1 second. Acceptable for a portfolio project. Not suitable for production applications with SLA requirements.

**Connection string usage:**

- `DATABASE_URL` (pooled) — `lib/prisma.ts` — runtime queries only
- `DIRECT_URL` (direct) — `prisma.config.ts` — all Prisma CLI commands
- Pooled URL throws P1001 on migrate commands — direct URL required for CLI
- `prisma.config.ts` uses `@next/env` `loadEnvConfig` to read `.env.local`

---

### Deployment — Vercel

**Provider:** vercel.com
**Plan:** Hobby (free)
**Trigger:** Push to `develop` → preview deployment. Push to `main` → production deployment.
**Framework preset:** Next.js (auto-detected)
**Build command:** `next build` (default)
**Output directory:** `.next` (default)

**Environment scopes:**

- Preview — `develop` branch deployments
- Production — `main` branch deployments (active from Sprint 3 close — MVP launch)

**Known constraint:** Vercel Hobby plan has a 100GB bandwidth limit per month. Sufficient for a portfolio project.

---

### Repository — GitHub

**Repository:** `github.com/[username]/hiretrace`
**Visibility:** Public
**Default branch:** `main` (protected)
**Integration branch:** `develop`

See §5 for full branch strategy.

---

## 5. Branch Strategy

### Branch Types

| Branch    | Pattern                      | Purpose                                      | Merges into             |
| --------- | ---------------------------- | -------------------------------------------- | ----------------------- |
| `main`    | `main`                       | Production-ready code only                   | —                       |
| `develop` | `develop`                    | Integration branch — all features merge here | `main` (at phase gates) |
| Feature   | `feature/PBI-XXX-short-desc` | One branch per PBI                           | `develop`               |

### Rules

- **Create `develop` before your first commit** — the very first action after creating the repository is: create `develop` from `main`, push it, then route all subsequent commits there. Committing directly to `main` and migrating later is avoidable friction.
- **Never commit directly to `main`** — branch protection enforces this; enable it immediately at repo creation
- **Never commit directly to `develop` for application code** — always use a feature branch
- **Documentation commits** (`/docs` changes only) may go directly to `develop`
- **`/docs` folder must be named exactly `docs`** — all cross-references in all SDD documents use this path. Using any other name (`spec`, `documentation`, etc.) breaks every document link.
- **Feature branch lifecycle:** create from `develop` → develop → open PR → self-review checklist → merge to `develop` → delete branch
- **`main` receives merges** only at sprint close (after review) or phase gate

### Pull Request Self-Review Checklist

Before merging any feature branch to `develop`:

- [ ] `tsc --noEmit` passes
- [ ] `npm run lint` passes with no warnings
- [ ] `npm test` passes with no failures
- [ ] Manual test against AC in `spec.md`
- [ ] No `console.log` statements left in code
- [ ] No `.env` values hardcoded in any file
- [ ] No `any` types introduced

### Commit Message Convention

```
[PBI-XXX] Short description of what this commit does

Examples:
[PBI-004] Add user registration API route
[PBI-004] Add registration form with Zod validation
[PBI-004] Add RTL tests for registration form
[DOCS] Update tasks.md Sprint 1 progress
```

---

## 6. Environment Variables

### Full Variable Reference

| Variable          | Scope | Description                                          | Set in               |
| ----------------- | ----- | ---------------------------------------------------- | -------------------- |
| `DATABASE_URL`    | All   | Neon pooled connection string                        | `.env.local`, Vercel |
| `DIRECT_URL`      | All   | Neon direct connection string (migrations only)      | `.env.local`, Vercel |
| `JWT_SECRET`      | All   | Secret key for signing JWTs — min 32 chars           | `.env.local`, Vercel |
| `NEXTAUTH_URL`    | All   | Base URL of the application                          | `.env.local`, Vercel |
| `NEXTAUTH_SECRET` | All   | NextAuth secret — reserved for Sprint 6 Google OAuth | `.env.local`, Vercel |

### Generating Secrets

Generate `JWT_SECRET` and `NEXTAUTH_SECRET` using:

```bash
openssl rand -base64 32
```

Run this twice — use one output for each variable. Never reuse secrets across variables.

### Rules

- `.env.local` is never committed — confirmed in `.gitignore`
- `.env.example` is committed with all keys and empty values
- Secrets are never logged, returned in API responses, or hardcoded in source
- Vercel environment variables are set per scope (Preview / Production) — not globally

---

## 7. Architectural Decision Records

Each ADR records a decision made, the options considered, and the rationale. ADRs are never deleted — superseded decisions are marked and a new ADR is added.

---

### ADR-001 — Next.js App Router over Pages Router

**Date:** April 17, 2026
**Status:** Accepted

**Decision:** Use Next.js App Router (introduced in Next.js 13, stable in 14+).

**Options considered:**

- App Router — file-based routing in `app/`, Server Components by default, Route Handlers for API
- Pages Router — legacy Next.js routing in `pages/`, API routes in `pages/api/`

**Rationale:** App Router is the current Next.js standard and the direction of the framework. Server Components reduce client bundle size. Route Handlers replace API routes cleanly. Using Pages Router in a 2026 portfolio project signals unfamiliarity with current Next.js.

**Trade-off:** App Router has a steeper learning curve for developers familiar only with Pages Router. Accepted — the project is a learning and showcase artifact.

---

### ADR-002 — jose over jsonwebtoken for JWT

**Date:** April 17, 2026
**Status:** Accepted

**Decision:** Use `jose` for JWT signing and verification.

**Options considered:**

- `jsonwebtoken` — the most widely known JWT library for Node.js
- `jose` — JOSE (JSON Object Signing and Encryption) standard implementation, Edge Runtime compatible

**Rationale:** Next.js middleware runs on the Edge Runtime, which does not support Node.js built-ins that `jsonwebtoken` depends on. `jose` is Edge-compatible and is the library recommended in Next.js documentation for middleware JWT verification.

**Trade-off:** `jose` API is less familiar than `jsonwebtoken` to most developers. Accepted — the API surface used in this project is minimal (SignJWT, jwtVerify).

---

### ADR-003 — HTTP-only Cookie over localStorage for Session Storage

**Date:** April 17, 2026
**Status:** Accepted

**Decision:** Store the JWT session token in an HTTP-only cookie.

**Options considered:**

- HTTP-only cookie — set by server, not accessible via JavaScript, sent automatically with requests
- localStorage — accessible via JavaScript, requires manual inclusion in request headers

**Rationale:** HTTP-only cookies are not accessible via `document.cookie` or JavaScript, which eliminates XSS-based token theft. localStorage tokens are vulnerable to any XSS attack on the page. For an auth token, HTTP-only cookie is the correct security posture.

**Trade-off:** Slightly more complex server-side cookie management. Accepted — security is not negotiable for auth token storage.

---

### ADR-004 — Neon over Railway for PostgreSQL Hosting

**Date:** April 17, 2026
**Status:** Accepted

**Decision:** Use Neon for PostgreSQL hosting.

**Options considered:**

- Railway — $5/month after trial credits exhaust
- Neon — free tier, no credit card required, no expiry
- Supabase — free tier but pauses after 1 week of inactivity
- Vercel Postgres — free on Hobby but tightly coupled to Vercel pricing

**Rationale:** Neon's free tier has no time limit and no monthly cost. Serverless PostgreSQL with connection pooling built in. Native Prisma support via `directUrl` for migrations. Compute pauses on inactivity but resumes in under 1 second — acceptable for a portfolio project.

**Trade-off:** Neon free tier has 0.5GB storage limit. Sufficient for HireTrace's data model. Cold start on resume adds latency to the first request after inactivity — acceptable for a portfolio context.

---

### ADR-005 — Prisma over raw SQL or other ORMs

**Date:** April 17, 2026
**Status:** Accepted

**Decision:** Use Prisma as the ORM.

**Options considered:**

- Prisma — type-safe ORM with schema-first approach and migration system
- Drizzle — lightweight, TypeScript-native ORM
- Raw SQL via `pg` — maximum control, no abstraction
- Sequelize — mature ORM, less TypeScript-native

**Rationale:** Prisma generates fully typed client code from the schema, eliminating an entire class of runtime DB errors. The migration system (`prisma migrate dev`) is straightforward for a solo developer. Prisma Studio provides a free GUI for inspecting data during development. The `schema.prisma` file is also a readable data model document — useful for the portfolio showcase.

**Trade-off:** Prisma adds cold start overhead in serverless environments (Prisma Client initialisation). Mitigated by the singleton pattern in `lib/prisma.ts`. Accepted.

---

### ADR-006 — bcryptjs over bcrypt for Password Hashing

**Date:** April 17, 2026
**Status:** Accepted

**Decision:** Use `bcryptjs` instead of `bcrypt`.

**Options considered:**

- `bcrypt` — native Node.js bcrypt binding, requires node-gyp compilation
- `bcryptjs` — pure JavaScript bcrypt implementation, no native compilation required

**Rationale:** `bcrypt` requires native compilation via node-gyp, which can fail in certain deployment environments and CI pipelines. `bcryptjs` is a pure JavaScript implementation with identical API and equivalent security. Vercel's build environment handles it without additional configuration.

**Trade-off:** `bcryptjs` is marginally slower than `bcrypt` due to lack of native bindings. At 10 salt rounds and typical auth traffic for a portfolio project, the difference is imperceptible.

---

### ADR-007 — Content Security Policy Trade-offs

**Date:** April 17, 2026
**Status:** Accepted — under review for Sprint 4

**Decision:** Accept `unsafe-eval` and `unsafe-inline` in the CSP for the current sprint.

**Context:** Next.js requires `unsafe-eval` in development for hot module replacement and `unsafe-inline` for its inline script injection. Removing these breaks the development experience and requires significant CSP tuning.

**Rationale:** For a portfolio project at this stage, the pragmatic trade-off is to accept the looser CSP and revisit in Sprint 4 when the feature set is stable enough to tune the policy without constant breakage.

**Trade-off:** Reduced XSS protection compared to a strict CSP. Accepted at this stage. Sprint 4 backlog item to tighten.

---

### ADR-008 — Tailwind CSS v4 Syntax

**Date:** April 19, 2026
**Status:** Accepted

**Decision:** Use single import syntax in `app/globals.css`.

**Context:** Next.js 16 installs Tailwind v4. The `@tailwind base`,
`@tailwind components`, and `@tailwind utilities` directives no longer
exist. `tailwind.config.ts` is not required in v4.

**Change:** `app/globals.css` contains a single line:
`@import "tailwindcss";`

---

### ADR-009 — Prisma v6 Configuration Pattern

**Date:** April 19, 2026
**Status:** Accepted

**Decision:** Use Prisma v6 `defineConfig` pattern with dual connection
strings and `@prisma/client` import path.

**Context:** Prisma v6 introduced three breaking changes:

1. Connection URLs moved from `schema.prisma` to `prisma.config.ts`
2. `dotenv/config` does not read `.env.local` — use `@next/env` `loadEnvConfig`
3. Generated client moved from `@prisma/client` to `@prisma/clienta`
4. Pooled Neon URL throws P1001 on all Prisma CLI commands — `DIRECT_URL`
   required in `prisma.config.ts`; `DATABASE_URL` used only in `lib/prisma.ts`

**Changes:**

- `schema.prisma` datasource block contains no `url` or `directUrl`
- `prisma.config.ts` uses `loadEnvConfig` and `DIRECT_URL`
- `lib/prisma.ts` uses `DATABASE_URL` at runtime
- All Prisma imports use `from '@prisma/clienta'`

### ADR-010 — Prisma v7 Requires Database Adapter

**Date:** April 19, 2026
**Status:** Accepted

**Decision:** Use `PrismaNeon` adapter from `@prisma/adapter-neon` for all
Prisma client construction.

**Context:** Prisma v7 removed adapterless client construction. Calling
`new PrismaClient()` without an adapter throws `PrismaClientInitializationError`
at runtime. Three adapter patterns were attempted before finding the correct one:

1. `datasourceUrl` property — does not exist in v7 type definitions
2. `datasources.db.url` property — does not exist in v7 type definitions
3. `new PrismaNeon(pool)` with Pool instance — type mismatch
4. `new PrismaNeon(sql)` with neon() function — type mismatch
5. `new PrismaNeon({ connectionString })` config object — correct ✅

**Change:** `lib/prisma.ts` uses `PrismaNeon` with a `connectionString` config
object. Requires `@neondatabase/serverless` and `@prisma/adapter-neon`.

---

## 8. Known Trade-offs & Constraints

| ID    | Area       | Constraint                                                                                                                   | Impact                                          | Sprint to Revisit         |
| ----- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------- |
| C-001 | Database   | Neon free tier: 0.5GB storage limit                                                                                          | Low — HireTrace data model is lightweight       | —                         |
| C-002 | Database   | Neon compute pauses on inactivity — cold start ~1s                                                                           | Low — acceptable for portfolio                  | —                         |
| C-003 | Database   | Single Neon instance used for both dev and production                                                                        | Medium — no environment isolation               | Sprint 4 if budget allows |
| C-004 | Security   | CSP allows `unsafe-eval` and `unsafe-inline`                                                                                 | Medium — reduced XSS protection                 | Sprint 4                  |
| C-005 | Deployment | Vercel Hobby plan: 100GB/month bandwidth                                                                                     | Low — portfolio traffic                         | —                         |
| C-006 | Auth       | No refresh token — JWT expires after 7 days, requires re-login                                                               | Low — acceptable for this use case              | —                         |
| C-007 | Testing    | No E2E tests until Sprint 6                                                                                                  | Medium — manual testing covers gap until then   | Sprint 6                  |
| C-008 | Prisma     | Pooled `DATABASE_URL` throws P1001 on Prisma CLI — `DIRECT_URL` required in `prisma.config.ts`                               | Low — two env vars required, clearly documented | —                         |
| C-009 | Prisma     | `dotenv/config` reads `.env` not `.env.local` — `@next/env` `loadEnvConfig` required in `prisma.config.ts`                   | Low — one additional dependency                 | —                         |
| C-010 | Prisma     | v7 requires adapter for all client construction — adds `@neondatabase/serverless` and `@prisma/adapter-neon` as dependencies | Low — two additional packages, well documented  | —                         |

---

## 9. Changelog

Record every significant technical change, decision, or milestone here. One entry per sprint or significant event. Most recent at the top.

---

### Pre-Sprint — April 17, 2026

**Status:** Complete

**Infrastructure established:**

- GitHub repository `hiretrace` created — public, Node.js `.gitignore`
- `README.md` placeholder committed to `main` at repo creation
- `develop` branch created from `main` immediately — before any SDD document commits
- `main` branch protected (PR required before merge)
- All SDD document commits routed to `develop` — not `main`
- `/docs` directory created on `develop` with exact name `docs`
- Vercel project connected to GitHub — preview deployments on push to `develop`
- Notion workspace created and published publicly
- Neon account active — PostgreSQL instance to be provisioned at Sprint 1 start (PBI-002)

**Documents committed to `/docs` on `develop`:**

- `product.md` v1.0
- `plan.md` v1.0
- `spec.md` v1.0 (Sprint 1 slice)
- `linkedin.md` v2.0
- `notion-setup.md` v1.0
- `features.md` v1.0 (Sprint 1 slice)
- `tasks.md` v1.0 (Sprint 1 slice)
- `implementation.md` v1.0 (this document)
- `testing.md` v1.0
- `sprints/sprint-01.md` v1.0

**Architectural decisions recorded:** ADR-001 through ADR-007

**Stack locked:** Next.js 15, TypeScript strict, Tailwind CSS, Prisma, Zod, react-hook-form, jose, bcryptjs, RTL, Jest, Neon, Vercel

**Version corrections (actual installed versions):**

- Next.js 16.x (not 15 as planned — create-next-app pulled latest)
- Tailwind CSS 4.x (breaking change from v3 — globals.css updated)
- Prisma 6.x (breaking changes — prisma.config.ts pattern, @prisma/client import)
- PostgreSQL 17 on Neon (not 16 — Neon default)
- Prisma client v7.7.0 (requires adapter pattern — see ADR-010)
- Added dependencies: `@neondatabase/serverless`, `@prisma/adapter-neon`, `@next/env`

---

### Sprint 1 — 06 May – 19 May 2026

_(to be completed at sprint close)_

---

### Sprint 2 — 20 May – 02 Jun 2026

_(to be completed at sprint close)_

---

### Sprint 3 — 03 Jun – 16 Jun 2026 — MVP

_(to be completed at sprint close)_

---

### Sprint 4 — 17 Jun – 30 Jun 2026

_(to be completed at sprint close)_

---

### Sprint 5 — 01 Jul – 14 Jul 2026

_(to be completed at sprint close)_

---

### Sprint 6 — 15 Jul – 28 Jul 2026 — Full Release

_(to be completed at sprint close)_

---

_implementation.md v1.0 — April 17, 2026 — HireTrace_
_This is the single source of truth for all technical decisions. Every ADR is permanent — superseded decisions are marked, not deleted. Update the changelog at every sprint close._
