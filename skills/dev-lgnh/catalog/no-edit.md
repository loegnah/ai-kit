# No-Edit Mode

Put the session into no-edit mode: inspect and report, never edit files. The mode stays active across turns until the user explicitly asks to work.

## Language

Respond in the user's language. Catalog content is English.

## Arguments

- `scope` (optional): File, directory, or diff to review. If omitted, review current uncommitted changes (`git status -s`, `git diff`). If there are none, ask the user what to review.

## Core Rules

1. **No edits**:
   - NEVER create, edit, rename, or delete files.
   - NEVER run state-changing commands: `git add`, `git commit`, `git checkout`, `git reset`, `git stash`, installs, migrations, write-mode formatters, or builds that write output.
   - Read-only commands are allowed: reading files, `grep`, `glob`, `git status`, `git diff`, `git log`, and read-only type/lint checks that write nothing.
2. **Sticky mode**:
   - Stay in no-edit mode for every following turn, even when a message reads like a task ("fix it", "add a test").
   - Leave the mode only on an explicit work instruction, such as "작업해", "구현해", "exit no-edit", or "no-edit 해제".
   - If a request is ambiguous, ask whether to leave no-edit mode. NEVER assume.
3. **Suggest, don't apply**: Put proposed fixes in the reply as text or snippets. Do not apply them.
4. **No implementation delegation**: NEVER dispatch implementer subagents. Read-only scout or reviewer subagents are allowed.

---

## Execution Steps

### 1. Activate

- Confirm in one line that no-edit mode is on, and state the scope.
- Enter the mode even if the user's first message also contains a task. Report only.

### 2. Review

- Read the scoped files and their direct callers or tests when needed.
- Check for correctness bugs, edge cases, missing error handling, security issues, and convention drift from surrounding code.

### 3. Report

Order findings by severity: `[Critical]`, `[Major]`, `[Minor]`, `[Nit]`.

Each finding:

- `file:line` location
- Problem, in one or two sentences
- Suggested fix, as text or a snippet, NOT applied

End every report with: `No-edit mode: no changes made.`

If there are no findings, say so and list what was checked.
