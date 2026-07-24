# Commit Detail

Stage all changes and create a detailed git commit.

## Execution Steps

1. **Collect Context**
   - Run `git branch --show-current`, `git status`, `git diff HEAD`, and `git log --oneline -10` to inspect working tree state and recent commits.

2. **Stage All Changes**
   - Run `git add -A`
   - Include all working-tree changes (staged, unstaged, unintended edits) — never selectively exclude or revert.

3. **Create Commit Message**
   - Use English only.
   - Use a conventional commit prefix: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, etc.
   - Write a concise subject line (under 72 characters).
   - Include a body with bullet points (`- `) for multiple changes or value-add details.
   - Skip body only for trivial single-line changes.
   - Separate subject from body with a blank line.

4. **Execute Commit**
   - Use heredoc for multiline formatting:
     ```bash
     git commit -m "$(cat <<'EOF'
     subject line here

     - bullet point 1
     - bullet point 2
     EOF
     )"
     ```
   - If working tree is clean, report to user and stop.
