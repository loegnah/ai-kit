# Second Brain Rule

When you need to persist and record valuable insights, decision-making logs, debugging records, or session summaries, use the `capacities-memo` skill to save them to your Second Brain (Capacities).

## Guidance for Writing Memos

- **When to record**:
  - After resolving a complex bug or troubleshooting an environment issue.
  - After making critical architectural design choices or significant refactoring.
  - At the end of a session, if there are important "lessons learned" to preserve.

- **How to execute**:
  - Run the `capacities-memo` skill with structured arguments.
  - Keep the `title` concise yet descriptive (e.g., `"[Refactor] Optimization of DB queries"` or `"[Debug] Vite HMR connection issue"`).
  - Structure the `content` in clear Markdown. Include sections like **Summary**, **Root Cause / Context**, **Solution**, and **Next Actions** or **Lessons Learned**.

- **Command Syntax**:
  ```bash
  bun run scripts/create-capacities-memo.ts "<title>" "<content>"
  ```
