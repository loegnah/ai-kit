# Code Simplify

Simplify recently changed code without behavior change by delegating the refactoring task to a subagent with summarized session context.

## Arguments

- `scope` (optional): Target directory or file pattern.

## Constraints

- **Mandatory Subagent Delegation**: Delegate the actual code modification and simplification tasks to a subagent using the `task` tool.
- Adhere strictly to the shared rules in `catalog/simplify/rules.md`.

## Execution Steps

1. **Detect Target Scope & Changes**
   - If scope provided, set `$TARGET_SCOPE`.
   - If scope omitted:
     - Check uncommitted changes: `git diff --name-only` + `git diff --name-only --cached`.
     - If none, check last commit: `git diff --name-only HEAD~1...HEAD`.
   - If no target files found, inform user and exit.

2. **Summarize Session Context**
   - Collect context from the ongoing session:
     - Identify what feature/fix was recently being worked on and the intent behind the changes.
     - Obtain diff details (`git diff` or `git show HEAD`) for the target files.
   - Draft a clear summary containing:
     - Core objective of the session/changes.
     - Target file list and detailed diff context.
     - Behavioral invariants to preserve.

3. **Delegate Simplification to Subagent**
   - Spawn a subagent via the `task` tool:
     - `context`: Pass the session summary, target file paths, diff overview, and references to `catalog/simplify/rules.md`.
     - `tasks`: Instruct subagent to refactor target files following `catalog/simplify/rules.md` (and `catalog/simplify/typescript.md` for TypeScript files) for readability and simplicity while preserving exact behavior.
   - Subagent Guidelines:
     - Strictly follow `catalog/simplify/rules.md`.
     - DO NOT perform `git add` or `git commit`.
4. **Verify & Report Results**
   - Review subagent's changes (`git diff`).
   - Summarize modified files and applied refinements in 1-2 lines.
   - Recommend testing and reviewing `git diff`.
