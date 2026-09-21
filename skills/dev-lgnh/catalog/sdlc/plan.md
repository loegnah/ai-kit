# Stage 3: Build Plan (plan.md)

Construct a concrete, file-level implementation plan based on `spec.md` in Plan Mode before writing any application code.

## Language

Respond in the same language the user is using (e.g., Korean if the user communicates in Korean). Match the user's language for artifact content and discussions.

## Arguments

- `target` (optional): Path to target story directory (e.g. `docs/story/2026-09-06-feature/`).

## Constraints

- **Strict Plan Mode (No code modifications)**: Do NOT modify any application or source files during this step. Focus purely on writing `plan.md`.
- Detail the exact file paths and work order so that any third-party engineer could implement it identically.
- Must include changing files, sequential steps, risk mitigations, and automated proof criteria.

## Execution Steps

1. **Locate Target Directory & `spec.md`**
   - If argument provided, resolve `<target_dir>`.
   - If omitted:
     - Search `docs/story/` for the most recently modified directory containing `spec.md`.
   - Read `<target_dir>/spec.md` and `<target_dir>/intent.md`. If `spec.md` is missing, instruct user to run `/dev-lgnh spec` first.

2. **Blast Radius & Codebase Investigation**
   - Investigate exact files that will need to be created, modified, or tested.
   - Run LSP / grep / file reading tools to check symbols, callsites, dependencies, and potential regressions.
   - Clarify 3 core planning questions:
     1. What is the most dangerous functionality that could break with this change?
     2. What alternatives were considered and why were they rejected?
     3. What is the minimal automated proof (test/check) required to verify success?

3. **Write `plan.md`**
   - Save to `<target_dir>/plan.md` using the standard template:
     ```markdown
     # Implementation Plan: [Feature Name] (Based on: spec.md YYYY-MM-DD)

     - Assigned Engineer: [Name]
     - Status: [Planning | Approved | Completed]

     ## 1. Files That Change

     - [Create] `path/filename`: Purpose and role
     - [Modify] `path/filename`: Details of changes
     - [Test] `path/filename`: Scope of unit/integration tests

     ## 2. Order of Work

     1. Step 1 details
     2. Step 2 details
     3. Step 3 details

     ## 3. Risks & Mitigations

     - Risk: Anticipated risk factor
     - Mitigation: Prevention and fallback strategy

     ## 4. Verification & Proof of Completion

     - Automated Tests: Test command to run (e.g., `pytest tests/...`, `bun test ...`)
     - Lint / Build: Lint or check command to run (e.g., `bun run check`)
     - Manual / Visual Verification: UI mockup comparison, console logs, etc.
     ```
4. **Report & Guide Next Step**
   - Output `plan.md` summary, highlighting risk mitigations and proof criteria.
   - Guide next step: Inform the user to review/approve the plan, then run `/dev-lgnh run <target_dir>` (or `/dev-lgnh run`) to begin implementation.
