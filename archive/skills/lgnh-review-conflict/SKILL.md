# Review Conflict Resolution

Review the conflict resolution that the user has made during a rebase or merge operation.

## Execution Steps

1. **Check Git Status & Operation Type**
   - Run `git status`.
   - Identify if `.git/MERGE_HEAD` (merge) or `.git/rebase-merge/` / `.git/rebase-apply/` (rebase) exists.

2. **Understand Conflict Context**
   - For rebase: inspect `.git/rebase-merge/onto`, `.git/rebase-merge/stopped-sha`, and log outputs (`git log --oneline HEAD...REBASE_HEAD`).
   - For merge: inspect `git log --oneline HEAD...MERGE_HEAD`, `git log --oneline MERGE_HEAD..HEAD`, and `git log --oneline HEAD..MERGE_HEAD`.

3. **Analyze Resolved Files**
   - Run `git diff --cached --name-only` to find staged resolved files.
   - Run `git diff --cached <file>` for each file.

4. **Apply Review Checklist**
   - Context understanding: Explain WHY conflict occurred.
   - Logical correctness & intent preservation: Honor goals of BOTH branches.
   - Check for missing code, duplicate code, syntax errors, missing imports, remaining conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).

5. **Provide Output**
   - Conflict Context (what each branch tried to do).
   - Status (OK / Issues Found).
   - Per-file analysis & suggested fixes if issues found.
   - Provide next steps (`git rebase --continue` or `git commit`).
