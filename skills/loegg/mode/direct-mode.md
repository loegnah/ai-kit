# Direct Mode (Default)

The primary agent executes the workflow directly without delegating single tasks or running multi-model bakeoffs.

## Execution Rules

- **Primary agent owns execution.** Read code, design, implement, and verify directly in the main chat.
- **No single-task delegation.** Never spawn a subagent for a single task, serial step, or routine edit.
- **No multi-model panels by default.** Skip multi-model design bakeoffs (`arena`) and multi-model review panels unless the user explicitly asks for them.
- **Allowed subagent exceptions:**
  - Read-only exploration (`scout`) when broad search would bloat the main context window.
  - Parallel workers (`implementer1`..`implementer4`) only when 2 or more independent slices touch non-overlapping files concurrently.

## Workflow Cadence

- <!-- Clarify requirements via `grill` when underspecified -> implement directly -> verify on the real surface (`bun run check`, tests, or runtime). -->
