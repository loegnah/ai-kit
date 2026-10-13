# TypeScript Refactoring Rules

Language-specific style rules inspected when refactoring TypeScript code.

## Rule 1: Avoid Unnecessary Re-Exports (Pass-Through / Barrel Exports)

- **Concept**: Avoid intermediate pass-through patterns where imported values from external modules or other files are merely re-exported (`export { x } from '...'`, `export * from '...'`, or `import` followed directly by `export`).
- **Rationale**: Reduces dependency tracking complexity, circular dependency risks, and bundler/tree-shaking overhead while directing call sites to import directly from source definitions.
- **Classification Criteria**:
  1. **[Violation] Simple Pass-Through Export in Regular Files**:
     - Single files or standard modules simply re-exporting symbols from other modules.
     - Action: Update call sites to import directly from the original definition file and delete intermediate re-exports.
  2. **[Warning / Discouraged] Bulk Barrel Re-Exports (`index.ts`, etc.)**:
     - Bundling underlying directory modules into a single `index.ts` barrel export.
     - Principle: Do not blindly pass barrel exports; classify them as **"Barrel bulk re-export (discouraged)"**, report them explicitly to the user, and ask whether to migrate.
     - **Exception**: Files explicitly required by framework conventions or package entry point specifications (e.g., `src/index.ts`, bundler/runtime entry points) are permitted.

### Inspection Targets

- `export { ... } from '...'`
- `export * from '...'`
- `export * as ... from '...'`
- `import { x } from '...'; ... export { x };`

### Collected Data Points

- Violating file and line numbers
- Re-exported symbol names and original definition paths
- Category: `[Violation] Simple Re-Export` vs `[Warning / Discouraged] Barrel Re-Export`
- External callers referencing the symbol

_(Future rules will expand sequentially as Rule 2, Rule 3, etc.)_
