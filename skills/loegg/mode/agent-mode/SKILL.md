# Agent Mode

Autonomous execution mode where the agent drives work to completion on its own without waiting for turn-by-turn human input (e.g., `/loegg agent ...`, "알아서 끝까지 진행해", or unattended/background runs).

## Execution Rules

- **Define done before the first iteration.** State the exit condition as a checkable predicate (tests green, repro fixed, metric at target, every phase box checked). The predicate is the main drive; return to it after every side fix.
- **Never block on the human for reversible calls.** Do not pause to ask questions or wait for intermediate checkpoints. Make the strongest architectural/product call from codebase evidence, record the rationale, and keep moving.
- **Only pause for irreversible high-risk actions.** Stop only before destructive data operations, force-pushing shared branches, or production deploys not explicitly authorized. For a call only the user can make, apply a sensible default, report it with the alternative the user could choose, and continue.
- **Self-resolve ambiguity via `arena` or prototypes.** When facing a non-trivial design fork that would normally go to the user in Direct Mode, test it empirically (`../../playbooks/prototype.md`) or run `../../util/arena/SKILL.md` to pick and graft the strongest approach autonomously.
- **Keep the decision log.** Open it via `../../util/decision-log/SKILL.md` at the start and add a row per iteration: what changed and whether the predicate moved.
- **Smallest justified change per iteration.** Verify each change against the predicate, keep it if it advanced, and revert it if it did not. A change that "might help" is reverted, not left to ride (**Sequence Work into Verifiable Units** in `../../SKILL.md`).
- **A plateau is not a stop.** Pivot the approach, re-ground, or combine near-misses to push past it. Never relax the predicate to declare victory. Surface a genuine dead end with evidence instead of spinning.
- **Mid-run discoveries that serve the goal are yours.** Fix flaky verifiers, related bugs, and tooling failures you hit instead of parking them for the human (broken skills follow the trigger in `../../SKILL.md`); keep out-of-scope fixes in separate commits and report them.
- **Wait on events without polling by hand.** For an event (CI, a long build, a background agent), use the harness's wake mechanism (background task notification, `/loop`, or a scheduled wakeup) with a long fallback heartbeat. Without one, wait with a timed shell command.
- **End-to-end verification and decision trail.** Drive the task all the way through verification (`bun run check`, tests, runtime proof) and report the final result along with key decisions made and alternatives rejected.

## Workflow Cadence

- Ground context -> state the exit predicate and open the decision log -> resolve forks autonomously (via prototype or `arena`) -> iterate (implement -> verify against the predicate -> keep or revert -> log) -> verify on the real surface -> review final changes (`../../action/review/SKILL.md`) -> close the decision log (`../../util/decision-log/SKILL.md` `## Before handing back`) -> deliver the final report with the exit predicate's final state, iterations run, what landed, what was discarded, review findings, and the decision log's **Attention** section.
- On an explicit pause or imminent context compaction, follow `../../playbooks/pause-safely.md`.
