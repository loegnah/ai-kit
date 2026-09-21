# TypeScript Style Refactoring (ts-refactor)

Inspect custom TypeScript code style rules, collect violations, and execute refactoring only after explicit user confirmation.

## Core Principles

1. **Inspection First & Explicit Confirmation Required (No Auto-Refactoring)**:
   - Collect and report style violations to the user first.
   - **NEVER modify code until the user explicitly confirms and approves the changes.**
2. **Extensible Rule Set**:
   - Follows a modular rule-based structure allowing gradual addition of new style rules.
3. **No Git State Modification**:
   - Never run git modifications like `git add` or `git commit`. Strictly perform in-place code edits.

---

## Arguments

- `scope` (optional): Target directory path or file pattern (if omitted, defaults to recently modified files or source directory).

---

## Active Inspection Rules

### Rule 1: Avoid Unnecessary Re-Exports (Pass-Through / Barrel Exports)

- **Concept**: Avoid intermediate pass-through patterns where imported values from external modules or other files are merely re-exported (`export { x } from '...'`, `export * from '...'`, or `import` followed directly by `export`).
- **Rationale**: Reduces dependency tracking complexity, circular dependency risks, and bundler/tree-shaking overhead while directing call sites to import directly from source definitions.
- **Classification Criteria**:
  1. **[Violation] Simple Pass-Through Export in Regular Files**:
     - Single files or standard modules simply re-exporting symbols from other modules.
     - Action: Update call sites to import directly from the original definition file and delete intermediate re-exports.
  2. **[Warning / Discouraged] Bulk Barrel Re-Exports (`index.ts`, etc.)**:
     - Bundling underlying directory modules into a single `index.ts` barrel export.
     - Principle: Do not blindly pass barrel exports; classify them as **"Barrel bulk re-export (discouraged)"**, report them explicitly to the user, and ask whether to migrate.

_(Future rules will expand sequentially as Rule 2, Rule 3, etc.)_

---

## Execution Steps

### 1. Determine Target Scope

- If the user specifies `scope`, target that path.
- If omitted:
  - Check recently touched/modified files (`git status -s`, `git diff --name-only`).
  - If changed files exist, propose those files and their related modules as the primary scope.
  - If none exist, ask the user or propose the default source directory (e.g., `src`).

### 2. Rule-Based Static Inspection (Scan & Collect)

- Inspect `.ts` and `.tsx` files in scope against active rules.
- **Rule 1 Inspection Targets**:
  - `export { ... } from '...'`
  - `export * from '...'`
  - `export * as ... from '...'`
  - `import { x } from '...'; ... export { x };`
- Collected Data Points:
  - Violating file and line numbers
  - Re-exported symbol names and original definition paths
  - Category: `[Violation] Simple Re-Export` vs `[Warning / Discouraged] Barrel Re-Export`
  - External callers referencing the symbol

### 3. Report to User & Await Confirmation

- Present collected violations as a markdown table or structured list.
- Example output format:
  ```markdown
  ### TypeScript Code Style Inspection Results

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
