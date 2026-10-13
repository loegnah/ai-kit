# Code Simplification Rules

Core rules and guidelines to follow when simplifying and refactoring code.

## 1. Preserve Existing Behavior

- Retain exact runtime behavior, API contracts, input validation, and return values.
- Do not introduce breaking changes or alter existing function/method signatures unless explicitly asked.
- Keep existing error handling and edge case branches intact.

## 2. Prioritize Readability Over Brevity

- Code should be obvious and readable at a glance.
- Avoid extreme single-line rewrites, cryptic abbreviations, or deeply nested ternaries.
- Delete dead code and unnecessary intermediate abstractions, but do not sacrifice clarity.
- Prefer boring, straightforward design to clever one-liners.

## 3. Adhere to Project Standards

- Follow project coding standards and file conventions.
- Maintain consistent naming and code formatting style matching the surrounding codebase.

## 4. Language-Specific Guidelines

- **TypeScript**: When working with TypeScript files, strictly adhere to `catalog/simplify/typescript.md`:
  - Avoid intermediate pass-through re-exports.
  - Avoid directory-level barrel files (`index.ts`) unless required by framework/package entry points.

## 5. Git Safety & Constraints

- **NEVER perform git state modifications or commits** (e.g., `git add`, `git commit`, `git stash`).
- Do NOT alter git repository status. Strictly limit actions to simplifying target code in working files.
