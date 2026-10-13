# Fast Code Simplify

Fast, inline simplification of recently changed code without behavior change, executed directly in the current session without subagent delegation.

## Arguments

- `scope` (optional): Target directory or file pattern.

## Constraints

- **Direct In-Session Execution**: Do NOT delegate to a subagent. Apply modifications directly using the `edit` tool.
- Adhere strictly to the shared rules in `catalog/simplify/rules.md`.

## Execution Steps

1. **Detect Target Scope & Changes**
   - If scope provided, set `$TARGET_SCOPE`.
   - If scope omitted:
     - Check uncommitted changes: `git diff --name-only` + `git diff --name-only --cached`.
     - If none, check last commit: `git diff --name-only HEAD~1...HEAD`.
   - If no target files found, inform user and exit.

2. **Inspect & Simplify Directly**
   - Read the target files and check the current diff to understand recently applied changes and context.
   - Refactor target files directly using the `edit` tool:
     - Follow `catalog/simplify/rules.md` (and `catalog/simplify/typescript.md` if targeting TypeScript).
     - Retain exact runtime behavior, edge case handling, and API contracts.
     - Prioritize readability over cleverness; eliminate dead code, redundant wrappers, or unnecessary variables.
     - DO NOT perform `git add` or `git commit`.

3. **Verify & Report Results**
   - Review changes (`git diff`).
   - Summarize modified files and applied refinements in 1-2 lines.
   - Recommend testing and reviewing `git diff`.
