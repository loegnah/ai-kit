# Agent Mode

Multi-agent orchestration mode for complex, high-stakes, or large-scale work. Invoked explicitly (e.g., `/loegg agent ...`).

## Execution Rules

- **Orchestrator stays in the lead.** The main chat owns framing, playbook tracking, synthesis, and final verification while delegating heavy execution to subagents.
- **Role-based model routing.** Use the per-role model and reasoning budget mappings configured via `meta/setup/SKILL.md`.
- **Multi-model panels enabled.**
  - Competing design or implementation bakeoffs (`arena`: N candidates + 1 cross-judge, pick a base and graft).
  - Multi-model adversarial review panels (`interrogate` style) for contested designs or risky diffs.
- **Isolated workspaces.** Parallel candidates or workers that write code must use disjoint files, separate directories, or isolated git worktrees.

## Workflow Cadence

- <!-- Ground context -> clarify with user if needed -> fan out candidates/workers -> cross-judge & synthesize -> verify on the real surface. -->
