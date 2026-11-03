# CLAUDE.md - Guidelines & Invariants for io-ad-automation

This file instructs Claude (and any AI agent working on this repo via GitHub MCP, Claude Code, or Claude Web/Desktop) on the architecture, business invariants, and clean coding standards required for `ad-automation`.

---

## 0. The Mandatory Refactoring Engineering Loop (Read ➡️ Plan ➡️ Loop ➡️ Commit)

Before any refactor or clean-up task, you MUST follow this structured engineering methodology. Do not refactor from memory, "by feel", or make multi-file bulk changes without per-task test verification.

### Phase 1: Read & Break Down Tasks (Scan & Plan)
1. **Branch Workflow (Mandatory, do this FIRST)**:
   - Work and commit directly on the `dev` branch. Never work on or commit to `main`.
   - Do NOT create branches and do NOT open a PR. (Claude cannot create branches in this workflow. If the owner later asks for a branch and PR flow, they will say so explicitly.)
   - If you cannot confirm you are on `dev`, STOP and tell the owner. If you have a terminal, check `git branch --show-current` and `git status --short`; stop if the branch is not `dev` or there are changes you did not make, then run `git pull origin dev`.
   - Commit each task as its own small commit (one task = one commit) so any task can be reverted alone.
   - Never force-push, rewrite history, or delete anything on `dev`. Only add new commits.
   - Because every commit lands on the shared `dev` branch, a broken commit breaks everyone: the verification gate in Phase 2 is mandatory.
2. **Read Before Touching**: Read the target file(s) and their corresponding test files via GitHub connector or local workspace.
3. **Identify Smells**: Use the clean-code catalog to identify concrete code smells (Long Method, Large Class, Feature Envy, Primitive Obsession, Divergent Change, etc.).
4. **Build the Task List & Checkpoint**: Break down the refactoring into a numbered checklist (`[ ]`) ordered strictly by **Risk Level**:
   - **Low Risk (First)**: Pure structural moving, companion `.html`/`.scss` extractions in `apps/web`.
   - **Medium Risk**: Route modularization and service/controller extractions in `apps/api`.
   - **High Risk (Last)**: Worker step functions, advisory locking, external platform writes in `apps/worker`, and rules engine in `packages/engine`.
   - **User Checkpoint**: Present the task list to the user for review before beginning automated modifications, especially prior to High Risk tasks.

---

### Phase 2: The Atomic Refactoring Loop (Execute Task-by-Task)
For **EACH task** on your checklist, execute this strict 5-step loop without skipping any step:

```
+--------------------------------------------------------------------------+
|                         THE ATOMIC REFACTOR LOOP                         |
+--------------------------------------------------------------------------+
| 1. REFACTOR (Clean Code Standards):                                      |
|    - Apply safe Fowler techniques (Extract Function, Guard Clauses).     |
|    - Follow the area guide (apps/web/CLAUDE.md, apps/api/CLAUDE.md,      |
|      apps/worker/CLAUDE.md).                                             |
|    - STRICTLY NO ONE-LINERS: 1 CSS property per line (zero raw hex),     |
|      multi-line HTML tags and control blocks, multi-line TS statements,  |
|      and mandatory braces on all guards: if (...) { ... }                |
|                                                                          |
| 2. RUN TESTS AND BUILD (Task Verification Gate):                         |
|    Run the verification commands for the area touched:                   |
|    - apps/web:      npm --prefix apps/web run build   (type+template)    |
|                     npm --prefix apps/web test                           |
|    - apps/api:      npm run typecheck && npx vitest run apps/api/        |
|    - apps/worker:   npm run typecheck && npx vitest run apps/worker/     |
|    - packages/core: npm run typecheck && npx vitest run packages/core/   |
|    (No terminal: do strict compiler analysis, keep commits small, and    |
|     say plainly that nothing was executed. Never claim tests passed.)    |
|                                                                          |
| 3. ZERO-ERROR CHECK (Hard Gate):                                         |
|    - Any test fails or build breaks: STOP and FIX immediately.           |
|      Never commit broken code or weaken/delete an existing test.         |
|    - 0 errors and build passes: proceed to step 4.                       |
|                                                                          |
| 4. ATOMIC COMMIT:                                                        |
|    - Commit ONLY the files changed for this task directly to dev.        |
|      One task = one commit (e.g. "refactor(web): extract ..."). No PR.   |
|    - Mark the task as [x] on your checklist.                             |
|                                                                          |
| 5. MOVE TO NEXT TASK:                                                    |
|    - If the next task is HIGH RISK (worker, locking, writers, engine),   |
|      PAUSE and wait for explicit user confirmation first.                |
|    - Otherwise advance to the next task and repeat the loop until all    |
|      approved tasks are verified and marked [x].                         |
+--------------------------------------------------------------------------+
```

**Priority Invariant**:
- **This file (`CLAUDE.md`) and docs/RULES.md win.** Never apply any refactoring technique that changes a public API contract, payload shape, DB column, selector, or business rule outcome.

---

## 1. Project Overview & Sub-Area Guide Selection
This is a TypeScript monorepo using npm workspaces:
- `packages/core`: Core types, domain schemas, rule definitions, and constants.
- `packages/db`: PostgreSQL client, schema migrations, and repositories.
- `packages/engine`: Pure ad optimization rules engine, bidding algorithms, scheduling (follow `docs/RULES.md`).
- `packages/integrations`: Connectors for Amazon Ads, Google Ads, Meta, SP-API, Helium10, Keepa, Shopify.
- `packages/assistant`: AI chat assistant tools and scripted flows.
- `apps/api`: Express.js REST API (**must follow `apps/api/CLAUDE.md`**).
- `apps/worker`: BullMQ background job processing workers (**must follow `apps/worker/CLAUDE.md`**).
- `apps/web`: Angular front-end dashboard (**must follow `apps/web/CLAUDE.md`**).

> **When working on a specific area**: Apply both this root guide AND the area guide (`apps/api/CLAUDE.md`, `apps/worker/CLAUDE.md`, or `apps/web/CLAUDE.md`).

---

## 2. Inviolable Business Invariants (DO NOT BREAK)
1. **Rules as Source of Truth**:
   - All rule codes (`PERF-LRN`, `PERF-SPC`, `KW-SEED`, `KW-SRCNEG`, `BRL-1..3`, `SCH-1..3`, `CIRCUIT`, etc.) defined in `docs/RULES.md` and `packages/core/src/rules.ts` are strictly contractual.
   - Refactorings must NEVER alter evaluation outcomes, decision logic, rule triggers, or parameter bounds.
2. **Behavior-Preserving Only**:
   - Refactoring is strictly restructuring without changing observable behavior.
   - No public API endpoints, response payloads, database column names, or function contracts may change during a refactor.
3. **Tests Are Sacred**:
   - Never edit, delete, skip, or weaken an existing test to make a refactor pass. If a test fails, the refactor is wrong: revert it immediately.

---

## 3. Clean Code & Readability Standards (Mandatory)

The owner and reviewers CANNOT read dense, tangled code. Every file must be understandable by skimming names and short functions. Optimize for the human reader, not for brevity.

### A. Hard Limits (Measurable, never exceed)
| Metric | Limit                                                           |
|---|---                                                                   |
| File length | 300 lines target, 400 absolute max                         |
| Function length | 30 lines target, 40 max                                |
| Function parameters | 4 max (use a named options object beyond that)     |
| Nesting depth | 2 levels max (use guard clauses / early returns)         |
| Cyclomatic complexity | 10 max per function                              |
| Line width | 100 chars max, one statement per line                       |

If a change would break a limit, split the code first, then make the change.

---

### B. 🚨 STRICT PROHIBITION: NO ONE-LINERS (HTML, CSS/SCSS, TS)

**Claude must NEVER compress multiple statements, declarations, CSS properties, or HTML elements onto a single line.** Every language must follow clean, multi-line formatting:

#### 1. CSS & SCSS Rules: Exactly ONE property per line
- **NEVER** write single-line CSS rule blocks (e.g. `.tile { border: 1px; display: grid; }`).
- Selector and opening `{` on the first line.
- Exactly **ONE CSS property per line**, indented 2 spaces.
- Closing `}` on its own separate line, un-indented.
- Always leave an empty line between separate CSS rule blocks.
- **Zero Raw Hex**: NEVER use raw hex values (`#fff`, `#1d2b4f`). Strictly use semantic custom properties from `src/styles/_tokens.scss` (`var(--border)`, `var(--bg-surface)`, `var(--text)`, `var(--tc)`).
- **No Fallback Hex**: Do NOT pass raw hex codes as fallback arguments to `var()` (e.g. `var(--color, #fff)` is forbidden).

```scss
/* ❌ STRICTLY FORBIDDEN: Single-line CSS blocks or multiple properties per line */
:host { display: block; }
.tile { border: 1px solid var(--border); border-top: 3px solid var(--tc); display: grid; }
.up { color: var(--success-text); } .down { color: var(--danger-text); }
button.active { background: #1d2b4f; color: #fff; }

/* ✅ MANDATORY: Clean, expanded multi-line SCSS with semantic tokens */
:host {
  display: block;
}

.tile {
  border: 1px solid var(--border);
  border-top: 3px solid var(--tc);
  display: grid;
}

.up {
  color: var(--success-text);
}

.down {
  color: var(--danger-text);
}

button.active {
  background: var(--primary-strong);
  color: var(--on-primary);
}
```

#### 2. HTML Rules: Indented, multi-line tags & control blocks
- **NEVER** compress nested tags onto a single line (e.g. `<div class="card"><h2 id="title">Title</h2><p>{{ text }}</p></div>`).
- **NEVER** compress Angular control flow blocks (`@if`, `@for`, `@switch`, `@case`, `@empty`) onto a single line (e.g. `@if (t.simulated) { <span class="sim">simulated</span> }` is strictly forbidden).
- Every control flow block MUST have opening brace `{` on the statement line, body indented 2 spaces on new lines, and closing brace `}` on its own line.
- Tags with 3 or more attributes or exceeding 100 characters MUST have each attribute on a separate line indented 2 spaces.

```html
<!-- ❌ STRICTLY FORBIDDEN: Cramming nested tags or control flow on one line -->
<div class="card"><h2 id="title">Title</h2><p>{{ text }}</p></div>
<div class="l">{{ t.label }}@if (t.simulated) { <span class="sim">simulated</span> }</div>
@for (item of items(); track item.id) { <tr><td>{{ item.name }}</td><td>{{ item.price }}</td></tr> }

<!-- ✅ MANDATORY: Proper multi-line indentation -->
<div class="card">
  <h2 id="title">Title</h2>
  <p>{{ text }}</p>
</div>

<div class="l">
  {{ t.label }}
  @if (t.simulated) {
    <span class="sim">simulated</span>
  }
</div>

@for (item of items(); track item.id) {
  <tr>
    <td>{{ item.name }}</td>
    <td>{{ item.price }}</td>
  </tr>
}
```

#### 3. TypeScript Rules: Multi-line objects, statements, and guard clauses
- **NEVER** write single-line interfaces, type definitions, or object literals with multiple keys.
- **NEVER** write multiple variable or property declarations on one line (e.g. `const a = 1; const b = 2;` or `readonly a = 1; readonly b = 2;`).
- **NEVER** write single-line guard clauses without braces (`if (cond) return;`). Mandatory `{}` on all conditionals.
- **NEVER** write one-liner arrow functions containing statements or dense logic.
- Break down chained operations and giant `Promise.all` arrays into named intermediate variables.

```typescript
/* ❌ STRICTLY FORBIDDEN: Single-line interfaces, multiple declarations, objects, or guard clauses */
export interface Card { id: string; name: string; count: number; }
const d = by[c] ?? null; const m = chMeta(c);
if (item) return 1;
return { ...c, simulated: !!a?.simulated, none, title: none ? 'A' : 'B' };
const [cur, tot, prev, prevTot] = await Promise.all([a(), b(), c(), d()]);

/* ✅ MANDATORY: Expanded lines with intermediate variables */
export interface Card {
  id: string;
  name: string;
  count: number;
}

const data = by[c] ?? null;
const meta = chMeta(c);

if (item) {
  return 1;
}

const isNone = Boolean(av && c.id !== 'all' && !a);
const title = isNone 
  ? `No ${c.label} rows on this tab` 
  : `${a.rows.toLocaleString('en-US')} rows`;

return {
  ...c,
  simulated: Boolean(a?.simulated),
  none: isNone,
  title,
};
```

---

### C. How to Split Large Files (By Responsibility, Not Line Count)
- **Routes file** → `routes/` (URL wiring only) + `controllers/` (parse request, call service, shape response) + `services/` (business logic) + `repositories/` (database access) + `mappers/` (shape conversion).
- **Engine file** → One file per rule family (e.g. `kw.rules.ts`, `brl.rules.ts`, `sch.rules.ts`) + a thin `evaluate.ts` that only orchestrates.
- Shared types go in `types.ts`, constants in `constants.ts`, next to the module.
- Each folder gets an `index.ts` that re-exports the public API so existing imports keep working. NEVER change an import path used outside the module being split.
- Moving code is not allowed to change it: extract and move logic as-is, ensure tests pass, and only then simplify in a separate commit.

### D. Function & Expression Rules
- One function = one reason to change. Name it with a verb phrase.
- **No dense one-liners**: No big `Promise.all` tuples, nested `.reduce()`, chained `.map().filter().reduce()` longer than 3 steps, or nested ternaries. Use named intermediate variables instead.
- **No nested ternaries**: Replace `a ? b : c ? d : e` with `if / else` or a lookup map.
- **Guard clauses and early returns first**: Happy path stays flat. No needless `else`.
- Separate pure calculation (no I/O) from side effects (DB, HTTP, queues). Pure functions are easy to test and safe to refactor.

### E. Naming & Constants
- Intention-revealing names: `hasExceededDailyBudget`, not `chk` or `flag2`.
- No single-letter names except short loop counters. No unexplained abbreviations.
- No magic numbers or strings. Thresholds and rule parameters live in named constants in `packages/core` and reference their rule code (e.g. `// PERF-LRN`).
- Booleans start with `is`, `has`, `can`, `should`.

### F. Types & Error Handling
- No `any`. Use `unknown` plus narrowing, or a proper TypeScript interface.
- No empty `catch`. Handle the error, rethrow it, or log with context.
- Do not swallow errors to make a test pass.

---

## 4. Testing & Verification Standards (Mandatory)

Refactoring without tests is guesswork. Every change must be validated by running the appropriate test and build suite.

### A. Inviolable Testing Principles
1. **Tests Are Sacred**: Never edit, delete, skip (`.skip()`), or weaken an existing test to make a refactor pass. If a test fails after your change, the refactoring is wrong: revert or fix the code immediately.
2. **Characterization Tests First**: If a file lacks unit tests (such as complex rule files or writer modules), write characterization tests capturing its current behavior *before* modifying the implementation.
3. **Deterministic & Isolated**: Unit tests must never depend on real external network APIs or live database state. Inject mocks/fakes for external platform calls (Amazon Ads, Google, Meta APIs).
4. **Zero-Error Gate**: Every commit must produce zero TypeScript compiler errors and 100% passing tests.

### B. Verification Commands by Area

Execute the command for the specific workspace being modified:

| Area / Scope | Verification Command | Description                        |
|---|---|---                                                               |
| **Whole Backend Typecheck** | `npm run typecheck` | Validates TypeScript project references for `packages/*`, `apps/api`, and `apps/worker` (`tsc -b`). Does NOT include `apps/web`.|
| **All Backend Tests** | `npm test` | Runs the complete Vitest test suite across all workspaces.|
| **Ad Engine (`packages/engine`)** | `npx vitest run packages/engine/` | Tests optimization rules, bids, budget allocation, and schedules.|
| **Domain Core (`packages/core`)** | `npx vitest run packages/core/` | Tests domain schemas, Zod validations, and business constants.|
| **Database Repos (`packages/db`)** | `npx vitest run packages/db/` | Tests migrations, repositories, and query builders.|
| **REST API (`apps/api`)** | `npx vitest run apps/api/` | Tests API routes, controller logic, auth guards, and DTOs.|
| **Background Worker (`apps/worker`)** | `npx vitest run apps/worker/` | Tests BullMQ jobs, `runJob` idempotency, and advisory locks.|
| **Web Frontend Build (`apps/web`)** | `npm --prefix apps/web run build` | Compiles Angular application bundle and checks template/style bindings.|
| **Web Frontend Unit Tests** | `npm --prefix apps/web test` | Runs Karma/Jasmine unit tests for Angular components and services in headless Chrome.|

### C. Testing Environment Execution Rules
- **When using Claude Desktop / CLI / Agent with Terminal**:
  You MUST run the appropriate test command locally before committing. Inspect the exit code: if code is 0, proceed to commit. If non-zero, fix the error immediately.
- **When using Claude Web / Desktop chat (no terminal)**:
  Perform rigorous static analysis against TypeScript rules and keep each commit small. You cannot run shell commands, so state plainly that nothing was executed. Never claim tests passed if you did not execute them.

---

## 5. Final Report Format (No PR)
There is no PR in this workflow. Every commit lands directly on `dev`. Put a short plain-English summary in each commit message, and give the full report once, after every approved task is committed and verified. The report covers:
1. **What changed & Why**: Plain-English bullet points explaining the structural simplification.
2. **Smells & Techniques**: Which code smells were found and which refactoring techniques fixed them.
3. **Business Rules Checked**: Explicit confirmation that no logic in `docs/RULES.md` was altered.
4. **Formatting Compliance**: Explicit confirmation that NO one-liners were introduced (CSS properties, HTML elements/control blocks, and TS statements are strictly multi-line).
5. **Testing Verification**: State the exact test commands executed and confirm zero errors, or state plainly that none could be run.

