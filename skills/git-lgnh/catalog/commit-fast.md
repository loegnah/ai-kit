# Commit Fast

Quickly stage all changes and create a git commit, skipping tests, linting, and typechecks.

## Execution Steps

1. **Stage & Inspect (Single Run)**
   - Run `git add -A && git status -s && git diff --cached --stat`
   - If output is empty (working tree is clean), report to user and stop immediately.

2. **Create Commit Message**
   - Quickly inspect the staged diff to determine changes.
   - Use English only.
   - Use a conventional commit prefix: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, etc.
   - Write a concise subject line (under 72 characters).
   - Add concise bullet points (`- `) only for complex changes that need context; skip body for standard/simple changes.

3. **Execute Commit**
   - Run `git commit -m "<message>"`
   - If body bullets are needed, write the subject, an empty line, and the bullets inside a **single** `-m` argument (never split bullets across multiple `-m` flags):
     ```bash
     git commit -m "feat(scope): subject

     - bullet 1
     - bullet 2"
     ```
