# Style Refactor

Inspect custom code style rules, collect violations, and execute refactoring only after explicit user confirmation.

## Core Principles

1. **Inspection First & Explicit Confirmation Required (No Auto-Refactoring)**:
   - Collect and report style violations to the user first.
   - **NEVER modify code until the user explicitly confirms and approves the changes.**
2. **Modular Rules per Language**:
   - Language-specific rules live in separate files under `catalog/refactor/` (e.g., `catalog/refactor/typescript.md` for TypeScript). Follow them for each language in scope.
3. **Extensible Rule Set**:
   - Follows a modular rule-based structure allowing gradual addition of new style rules.
4. **No Git State Modification**:
   - Never run git modifications like `git add` or `git commit`. Strictly perform in-place code edits.

---

## Arguments

- `scope` (optional): Target directory path or file pattern (if omitted, defaults to recently modified files or source directory).

---

## Execution Steps

### 1. Determine Target Scope

- If the user specifies `scope`, target that path.
- If omitted:
  - Check recently touched/modified files (`git status -s`, `git diff --name-only`).
  - If changed files exist, propose those files and their related modules as the primary scope.
  - If none exist, ask the user or propose the default source directory (e.g., `src`).

### 2. Rule-Based Static Inspection (Scan & Collect)

- Inspect files in scope against the active rules for their language. For TypeScript files (`.ts`, `.tsx`), follow `catalog/refactor/typescript.md`.
- Collect the data points defined by each applicable rule (violating file and line numbers, affected symbols and their original definition paths, category classification, and external callers).

### 3. Report to User & Await Confirmation

- Present collected violations as a markdown table or structured list.
- Example output format:
  ```markdown
  ### Code Style Inspection Results

  #### Rule 1: Unnecessary Re-Export Check

  1. `src/features/user/service.ts:5` [Violation - Simple Re-Export]
     - Symbol: `fetchUser` (Source: `src/api/user.ts`)
     - Affected Callers: `src/pages/profile.tsx`, `src/pages/dashboard.tsx`
  2. `src/components/index.ts:1` [Warning / Discouraged - Barrel Re-Export]
     - Symbols: `Button`, `Modal` (Sources: `./Button.tsx`, `./Modal.tsx`)
     - Affected Callers: `src/App.tsx` and 4 other files

  ---

  Would you like to refactor callers to import directly from source definitions and remove unnecessary re-exports?

  - Proceed with all / Proceed with specific items / Cancel
  ```
- **Await user confirmation before modifying any code. NEVER edit files without explicit prior approval.**

### 4. Refactor upon Confirmation

- Apply refactoring sequentially for approved items:
  1. **Update Call Sites**: Update import paths across all files consuming target symbols to point directly to original definition files.
  2. **Remove Intermediary Code**: Remove unused pass-through export statements.
  3. **Clean Up Barrels**: When approved, remove barrel export entries or remove empty barrel files.
  4. **Preserve Invariants**: Keep runtime behavior and typing unchanged; only reorganize import/export paths.

### 5. Verification & Summary

- Run project check commands (e.g., `bun run check` or `tsc --noEmit`, project linter/typecheck).
- Provide a concise summary of modified files and eliminated re-exports.
