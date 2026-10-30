# Agent Mode

Autonomous execution mode where the agent drives work to completion on its own without waiting for turn-by-turn human input (e.g., `/loegg agent ...`, "알아서 끝까지 진행해", or unattended/background runs).

## Execution Rules

- **Never block on the human for reversible calls.** Do not pause to ask questions or wait for intermediate checkpoints. Make the strongest architectural/product call from codebase evidence, record the rationale, and keep moving.
- **Only pause for irreversible high-risk actions.** Stop only before destructive data operations, force-pushing shared branches, or production deploys not explicitly authorized.
- **Self-resolve ambiguity via `arena` or prototypes.** When facing a non-trivial design fork that would normally go to the user in Direct Mode, test it empirically or run `util/arena.md` to pick and graft the strongest approach autonomously.
- **End-to-end verification and decision trail.** Drive the task all the way through verification (`bun run check`, tests, runtime proof) and report the final result along with key decisions made and alternatives rejected.

## Workflow Cadence

- <!-- Ground context -> resolve forks autonomously (via prototype or `arena`) -> implement -> verify on the real surface -> deliver final report with decision trail. -->
