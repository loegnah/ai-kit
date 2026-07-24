# Code Simplify

Simplify recently changed code without behavior change.

## Arguments

- `scope` (optional): Target directory or file pattern.

## Execution Steps

1. **Detect Target Scope**
   - If scope provided, set `$TARGET_SCOPE`.
   - If scope omitted:
     - Check uncommitted changes: `git diff --name-only` + `git diff --name-only --cached`.
     - If none, check last commit: `git diff --name-only HEAD~1...HEAD`.
   - If no files found, inform user and exit.

2. **Simplify & Refine Code**
   - Retain exact behavior, API contracts, and return values.
   - Follow project coding standards (`CLAUDE.md`, etc.).
   - Prioritize readability over brevity. Avoid extreme single-line rewrites or nested ternaries.

3. **Report Results**
   - Summarize changed files and applied refinements in 1-2 lines.
   - Recommend testing and checking `git diff`.
