# HireTrace — Testing Document

**Document Type:** Test Artifact
**Version:** 1.0
**Date:** April 17, 2026
**Status:** Active
**Author:** Tester
**Repository:** _(to be added)_

---

## Cross-References

| Document            | Relationship                                                    |
| ------------------- | --------------------------------------------------------------- |
| `spec.md`           | Acceptance criteria that every test case is written against     |
| `plan.md`           | DoD test requirements; sprint gates require test suites passing |
| `implementation.md` | Test infrastructure decisions recorded there                    |
| `tasks.md`          | Test writing tasks listed per PBI — results logged here         |
| `sprint-01.md`      | Sprint close requires test results recorded in this document    |

---

## Table of Contents

1. [Test Philosophy](#1-test-philosophy)
2. [Test Infrastructure](#2-test-infrastructure)
3. [Test Types & Scope](#3-test-types--scope)
4. [Sprint 1 Test Cases](#4-sprint-1-test-cases)
5. [Test Results Log](#5-test-results-log)
6. [Coverage Targets](#6-coverage-targets)

---

## 1. Test Philosophy

HireTrace follows a **spec-first testing approach**. Test cases are derived directly from acceptance criteria in `spec.md` — not written after implementation to confirm what was built.

**The chain:**

```
spec.md AC → test case written → implementation begins → test passes → PBI is Done
```

A PBI is not Done until its tests pass. Tests are not written to achieve coverage metrics — they are written to prove that acceptance criteria are met.

**Three rules:**

1. Every AC in `spec.md` has at least one corresponding test case in this document
2. No PBI is marked `[x]` in `product.md` without its tests passing
3. Test results are logged here at sprint close — not assumed

---

## 2. Test Infrastructure

### Installation

```bash
# RTL and Jest are installed as part of Next.js scaffold
# Confirm these are present in package.json devDependencies:
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Configuration

**`jest.config.ts`** at project root:

```typescript
import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterFramework: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
```

**`jest.setup.ts`** at project root:

```typescript
import "@testing-library/jest-dom";
```

**Test file location convention:**

```
components/
  RegisterForm/
    RegisterForm.tsx
    RegisterForm.test.tsx    ← co-located with component
app/
  api/
    auth/
      register/
        route.ts
        route.test.ts        ← co-located with route
```

### Running Tests

```bash
npm test                    # run all tests once
npm test -- --watch         # watch mode during development
npm test -- --coverage      # run with coverage report
npm test -- RegisterForm    # run a specific test file
```

---

## 3. Test Types & Scope

### Sprint 1 — RTL Component Tests

Component tests using React Testing Library. Tests render components and assert on what the user sees and can interact with — not implementation details.

**Scope:** Registration form, login form, auth error states, redirect behaviour.

**What RTL tests do NOT test:**

- API route logic (tested via integration tests from Sprint 4)
- Database operations (tested implicitly via API tests)
- Middleware redirect behaviour (tested manually in Sprint 1; integration-tested in Sprint 4)

### Sprint 2 — RTL Component Tests (expanded)

Pipeline components, Kanban board, application forms, drag-and-drop behaviour.

### Sprint 4 — Integration Tests

API route handlers tested directly — mock Prisma, assert on response status codes and bodies.

### Sprint 6 — E2E Tests

Critical user journeys tested end-to-end using Playwright or Cypress. Decision logged as ADR in `implementation.md` at Sprint 5.

---

## 4. Sprint 1 Test Cases

Test cases are written against AC IDs from `spec.md`. Format: one test case per AC, named to match.

**Test status markers:** `[ ]` Not written · `[~]` Written, not run · `[x]` Written and passing · `[!]` Failing

---

### PBI-004 — User Registration

#### TC-004-01 — Registration form renders all fields

**AC:** AC-004-01
**Type:** RTL — Component
**File:** `components/RegisterForm/RegisterForm.test.tsx`
**Status:** `[ ]`

```typescript
it('renders email, password, confirmPassword fields and submit button', () => {
  render(<RegisterForm />)
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
})
```

---

#### TC-004-02 — Empty form submission shows validation errors

**AC:** AC-004-06
**Type:** RTL — Component
**File:** `components/RegisterForm/RegisterForm.test.tsx`
**Status:** `[ ]`

```typescript
it('shows validation errors when form is submitted empty', async () => {
  const user = userEvent.setup()
  render(<RegisterForm />)
  await user.click(screen.getByRole('button', { name: /create account/i }))
  expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
  expect(await screen.findByText(/at least 8 characters/i)).toBeInTheDocument()
})
```

---

#### TC-004-03 — Password too short shows error

**AC:** AC-004-04
**Type:** RTL — Component
**File:** `components/RegisterForm/RegisterForm.test.tsx`
**Status:** `[ ]`

```typescript
it('shows error when password is fewer than 8 characters', async () => {
  const user = userEvent.setup()
  render(<RegisterForm />)
  await user.type(screen.getByLabelText(/^password/i), 'short')
  await user.click(screen.getByRole('button', { name: /create account/i }))
  expect(await screen.findByText(/at least 8 characters/i)).toBeInTheDocument()
})
```

---

#### TC-004-04 — Mismatched passwords shows error

**AC:** AC-004-05
**Type:** RTL — Component
**File:** `components/RegisterForm/RegisterForm.test.tsx`
**Status:** `[ ]`

```typescript
it('shows error when passwords do not match', async () => {
  const user = userEvent.setup()
  render(<RegisterForm />)
  await user.type(screen.getByLabelText(/^password/i), 'password123')
  await user.type(screen.getByLabelText(/confirm password/i), 'different123')
  await user.click(screen.getByRole('button', { name: /create account/i }))
  expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument()
})
```

---

#### TC-004-05 — Duplicate email shows inline error

**AC:** AC-004-03
**Type:** RTL — Component (mocked fetch)
**File:** `components/RegisterForm/RegisterForm.test.tsx`
**Status:** `[ ]`

```typescript
it('shows duplicate email error on 409 response', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    status: 409,
    json: async () => ({ error: 'An account with this email already exists' }),
  })
  const user = userEvent.setup()
  render(<RegisterForm />)
  await user.type(screen.getByLabelText(/email/i), 'existing@example.com')
  await user.type(screen.getByLabelText(/^password/i), 'password123')
  await user.type(screen.getByLabelText(/confirm password/i), 'password123')
  await user.click(screen.getByRole('button', { name: /create account/i }))
  expect(await screen.findByText(/already exists/i)).toBeInTheDocument()
})
```

---

#### TC-004-06 — Successful registration redirects to login

**AC:** AC-004-02
**Type:** RTL — Component (mocked fetch + router)
**File:** `components/RegisterForm/RegisterForm.test.tsx`
**Status:** `[ ]`

```typescript
it('redirects to /login?registered=true on successful registration', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    status: 201,
    json: async () => ({ message: 'Account created successfully' }),
  })
  const pushMock = jest.fn()
  jest.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }))
  const user = userEvent.setup()
  render(<RegisterForm />)
  await user.type(screen.getByLabelText(/email/i), 'new@example.com')
  await user.type(screen.getByLabelText(/^password/i), 'password123')
  await user.type(screen.getByLabelText(/confirm password/i), 'password123')
  await user.click(screen.getByRole('button', { name: /create account/i }))
  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith('/login?registered=true')
  })
})
```

---

### PBI-005 — User Login

#### TC-005-01 — Login form renders all fields

**AC:** AC-005-01
**Type:** RTL — Component
**File:** `components/LoginForm/LoginForm.test.tsx`
**Status:** `[ ]`

```typescript
it('renders email and password fields and submit button', () => {
  render(<LoginForm />)
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument()
})
```

---

#### TC-005-02 — Invalid credentials shows generic error

**AC:** AC-005-03
**Type:** RTL — Component (mocked fetch)
**File:** `components/LoginForm/LoginForm.test.tsx`
**Status:** `[ ]`

```typescript
it('shows generic error message on 401 response', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    status: 401,
    json: async () => ({ error: 'Invalid email or password' }),
  })
  const user = userEvent.setup()
  render(<LoginForm />)
  await user.type(screen.getByLabelText(/email/i), 'wrong@example.com')
  await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
  await user.click(screen.getByRole('button', { name: /log in/i }))
  expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument()
})
```

---

#### TC-005-03 — Successful login redirects to dashboard

**AC:** AC-005-02
**Type:** RTL — Component (mocked fetch + router)
**File:** `components/LoginForm/LoginForm.test.tsx`
**Status:** `[ ]`

```typescript
it('redirects to /dashboard on successful login', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    status: 200,
    json: async () => ({ message: 'Login successful' }),
  })
  const pushMock = jest.fn()
  jest.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }))
  const user = userEvent.setup()
  render(<LoginForm />)
  await user.type(screen.getByLabelText(/email/i), 'user@example.com')
  await user.type(screen.getByLabelText(/password/i), 'password123')
  await user.click(screen.getByRole('button', { name: /log in/i }))
  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith('/dashboard')
  })
})
```

---

#### TC-005-04 — Registered param shows success message

**AC:** AC-005-02 (login page behaviour)
**Type:** RTL — Component
**File:** `components/LoginForm/LoginForm.test.tsx`
**Status:** `[ ]`

```typescript
it('shows success message when ?registered=true is in URL', () => {
  jest.mock('next/navigation', () => ({
    useSearchParams: () => ({ get: (key: string) => key === 'registered' ? 'true' : null }),
    useRouter: () => ({ push: jest.fn() }),
  }))
  render(<LoginForm />)
  expect(screen.getByText(/account created/i)).toBeInTheDocument()
})
```

---

#### TC-005-05 — Empty login form shows validation errors

**AC:** AC-005-01 (form validation)
**Type:** RTL — Component
**File:** `components/LoginForm/LoginForm.test.tsx`
**Status:** `[ ]`

```typescript
it('shows validation errors when login form submitted empty', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)
  await user.click(screen.getByRole('button', { name: /log in/i }))
  expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
  expect(await screen.findByText(/password is required/i)).toBeInTheDocument()
})
```

---

### PBI-037 — Zod Validation (Schema Unit Tests)

#### TC-037-01 — registerSchema rejects short password

**AC:** AC-037-05
**Type:** Unit — Schema
**File:** `lib/schemas/auth.test.ts`
**Status:** `[ ]`

```typescript
it("rejects password shorter than 8 characters", () => {
  const result = registerSchema.safeParse({
    email: "user@example.com",
    password: "short",
    confirmPassword: "short",
  });
  expect(result.success).toBe(false);
  expect(result.error?.flatten().fieldErrors.password).toContain(
    "Password must be at least 8 characters",
  );
});
```

---

#### TC-037-02 — registerSchema rejects mismatched passwords

**AC:** AC-037-02
**Type:** Unit — Schema
**File:** `lib/schemas/auth.test.ts`
**Status:** `[ ]`

```typescript
it("rejects when password and confirmPassword do not match", () => {
  const result = registerSchema.safeParse({
    email: "user@example.com",
    password: "password123",
    confirmPassword: "different123",
  });
  expect(result.success).toBe(false);
  expect(result.error?.flatten().fieldErrors.confirmPassword).toContain(
    "Passwords do not match",
  );
});
```

---

#### TC-037-03 — registerSchema accepts valid input

**AC:** AC-037-02
**Type:** Unit — Schema
**File:** `lib/schemas/auth.test.ts`
**Status:** `[ ]`

```typescript
it("accepts valid registration input", () => {
  const result = registerSchema.safeParse({
    email: "user@example.com",
    password: "password123",
    confirmPassword: "password123",
  });
  expect(result.success).toBe(true);
});
```

---

#### TC-037-04 — loginSchema rejects invalid email

**AC:** AC-037-02
**Type:** Unit — Schema
**File:** `lib/schemas/auth.test.ts`
**Status:** `[ ]`

```typescript
it("rejects invalid email format", () => {
  const result = loginSchema.safeParse({
    email: "not-an-email",
    password: "password123",
  });
  expect(result.success).toBe(false);
  expect(result.error?.flatten().fieldErrors.email).toContain(
    "Please enter a valid email address",
  );
});
```

---

## 5. Test Results Log

Record results at each sprint close. Update after every `npm test` run that changes status.

### Sprint 1 Results — Target: 19 May 2026

| Test Case | Description                         | Status | Sprint Closed |
| --------- | ----------------------------------- | ------ | ------------- |
| TC-004-01 | Registration form renders           | `[ ]`  |               |
| TC-004-02 | Empty form shows validation errors  | `[ ]`  |               |
| TC-004-03 | Short password shows error          | `[ ]`  |               |
| TC-004-04 | Mismatched passwords shows error    | `[ ]`  |               |
| TC-004-05 | Duplicate email shows inline error  | `[ ]`  |               |
| TC-004-06 | Successful registration redirects   | `[ ]`  |               |
| TC-005-01 | Login form renders                  | `[ ]`  |               |
| TC-005-02 | Invalid credentials shows error     | `[ ]`  |               |
| TC-005-03 | Successful login redirects          | `[ ]`  |               |
| TC-005-04 | Registered param shows message      | `[ ]`  |               |
| TC-005-05 | Empty login form shows errors       | `[ ]`  |               |
| TC-037-01 | Schema rejects short password       | `[ ]`  |               |
| TC-037-02 | Schema rejects mismatched passwords | `[ ]`  |               |
| TC-037-03 | Schema accepts valid input          | `[ ]`  |               |
| TC-037-04 | Schema rejects invalid email        | `[ ]`  |               |

**Sprint 1 summary:**

| Metric                | Value                                  |
| --------------------- | -------------------------------------- |
| Total test cases      | 15                                     |
| Passing               | _(fill at sprint close)_               |
| Failing               | _(fill at sprint close)_               |
| Coverage — components | _(fill at sprint close)_               |
| `npm test` output     | _(paste summary line at sprint close)_ |

---

### Sprint 2 Results — Target: 02 Jun 2026

_(Test cases for PBI-009 to PBI-016, PBI-040 to be added during Sprint 1)_

---

### Sprint 3 Results — Target: 16 Jun 2026

_(Test cases for PBI-017 to PBI-025, PBI-043 to be added during Sprint 2)_

---

### Sprint 4 Results — Target: 30 Jun 2026

_(Integration test cases for API routes to be added during Sprint 3)_

---

### Sprint 5 Results — Target: 14 Jul 2026

_(Test cases for PBI-022, PBI-023, PBI-032 to PBI-034 to be added during Sprint 4)_

---

### Sprint 6 Results — Target: 28 Jul 2026

_(E2E test cases to be added during Sprint 5)_

---

## 6. Coverage Targets

Coverage is a signal, not a goal. These targets exist to prevent untested blind spots — not to hit a number.

| Sprint   | Test Type                            | Target                                                 | Rationale                        |
| -------- | ------------------------------------ | ------------------------------------------------------ | -------------------------------- |
| Sprint 1 | RTL — auth components                | 100% of AC covered                                     | Auth is the highest-risk surface |
| Sprint 2 | RTL — pipeline components            | All CRUD paths covered                                 | Core feature — no untested paths |
| Sprint 3 | RTL — dashboard, contacts, reminders | All AC covered                                         | MVP gate requires this           |
| Sprint 4 | Integration — API routes             | All critical routes covered                            | Phase 2 gate requires this       |
| Sprint 6 | E2E — critical journeys              | Register → Login → Add Application → Progress → Logout | Full release gate requires this  |

**Critical user journeys for E2E (Sprint 6):**

1. User registers → logs in → is redirected to dashboard
2. User adds a job application → it appears in the pipeline
3. User moves application through all 6 stages
4. User adds a contact to an application
5. User sets a follow-up reminder → overdue indicator appears
6. User logs out → cannot access dashboard

---

_testing.md v1.0 — April 17, 2026 — HireTrace_
_Test cases here are derived from `spec.md` AC — not written to confirm implementation. Every AC has a test. Every test must pass before its PBI is Done. Results are logged at sprint close — not assumed._
