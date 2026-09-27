# Branch Recommend

Recommend a branch name from the commits this branch diverged with, plus uncommitted changes.

## Execution Steps

1. **Resolve Base Branch**

   ```bash
   git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null || echo main
   ```
   - Fallback order: `origin/HEAD` → `main` → `master` → `develop`.

2. **Find Divergence Point**

   ```bash
   git merge-base HEAD <base> || echo "no common ancestor (unrelated history)"
   ```
   - If there is no merge-base, treat the whole branch as new work from scratch.

3. **Collect Diverged Commits**

   ```bash
   git log <merge-base>..HEAD --no-merges --format='%s'
   ```
   - Read every subject line; do not sample.
   - Also read the current branch name (`git branch --show-current`) to avoid repeating it.

4. **Collect Uncommitted Work (only if dirty)**

   ```bash
   git status -s && git diff --stat HEAD
   ```
   - Include staged, unstaged, and untracked files.
   - If the diverged commit list is empty, derive type/scope/summary from the uncommitted files alone.
   - Untracked-only changes count: `git status -s` is the source of truth.

5. **Derive Type**
   - Map the dominant conventional-commit prefix to a branch type:
     | Commit prefix                | Branch type |
     | :--------------------------- | :---------- |
     | `feat`                       | `feat`      |
     | `fix`/`hotfix`               | `fix`       |
     | `refactor`/`perf`            | `refactor`  |
     | `test`                       | `test`      |
     | `docs`                       | `docs`      |
     | `chore`/`build`/`ci`/`style` | `chore`     |
   - No conventional prefixes: infer from the changed files and messages; default to `feat`.

6. **Derive Scope and Summary**
   - Scope = the common path/area of the changed files (e.g. `skills/git-lgnh`), or the shared domain noun in the commit messages. Omit the scope if nothing is coherent.
   - Summary = the single action the branch delivers, in 2-4 words, `kebab-case`, imperative.
   - Ignore the branch's own name as a source; it is usually stale or already generic.

7. **Report**
   - Output the evidence first: merge-base commit (short hash + subject), the diverged commit subjects, and the uncommitted file list.
   - Then output:
     ```
     Recommended: <type>/<scope>-<summary>
     Alternatives: <name> | <name>
     ```
   - Always give at least two alternatives with a different scope or phrasing.
   - Use English, lowercase, and `-` separators. No dates, no ticket numbers unless present in the commits.
   - Do NOT create or check out the branch; only suggest.
