# TypeScript Simplification Rules

Rules to follow when simplifying and organizing TypeScript code.

## 1. Avoid Pass-Through Re-Exports

- Avoid intermediate pass-through re-exports where symbols imported from external modules or other files are simply re-exported (`export { x } from '...'`, `export * from '...'`, or `import { x } from '...'; export { x };`).
- Consumers should directly import symbols from the original module where they are defined, rather than going through an intermediary module.
- Remove simple pass-through re-exports unless re-exporting is strictly required at a public package API boundary.

## 2. Avoid Barrel Files (`index.ts`)

- Avoid creating directory-level `index.ts` files solely intended to bundle and re-export underlying modules.
- Barrel files increase the risk of circular dependencies, obscure dependency tracking, and hinder tree-shaking; prefer importing each module file directly.
- **Exception**: Files explicitly required by framework conventions or package entry point specifications (e.g., `src/index.ts`, bundler/runtime entry points) are permitted.
