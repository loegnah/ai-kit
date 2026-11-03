# Feature

**You own the design. Plan, implement (or delegate independent slices), verify, and review.**

1. Ground the subsystem: run `../action/how/SKILL.md` (`how`) over the affected subsystem (and `../action/grill/SKILL.md` in Direct Mode if requirements are underspecified).
2. Sketch the architecture: when the feature crosses module boundaries or has non-trivial design choices, run `../action/architect/SKILL.md` (`architect`) to lock in the caller usage, data shape, and signatures before writing logic.
3. Write the throughput checkpoint as four todo items. A dimension that genuinely does not apply (single file, no fan-out) keeps its item with `n/a: <reason>` rather than being dropped:
   - **Blocking first steps.** Gates and shared types/contracts run before fan-out.
   - **Independent workstreams.** Disjoint files, services, or layers parallelize (`parallel workers` in `~/.agents/loegg/models.md`); shared writes serialize.
   - **Shared mutable state.** Default to splitting the target (**Separate Before Serializing Shared State** in `../SKILL.md`). Serialize only for real invariants.
   - **Smallest safe decomposition.** If executing directly in the main agent is best, name why.
4. Implement from the data shape: define the organizing structure first (**Model the Domain** in `../SKILL.md`—a state machine over scattered booleans, a lookup table/registry over branching, a typed model over repeated shape assumptions). Execute single-slice or tightly coupled work directly in the main agent; fan out 2+ genuinely independent slices to `parallel workers` (configured via `../action/setup/SKILL.md`). When the implementation admits multiple competing shapes, run `../util/arena/SKILL.md` (`arena`) in Build mode.
5. Verify on the real surface (**Prove It Works** in `../SKILL.md`): run static checks (`bun run check` / typecheck / lint), tests, and exercise the actual surface (browser/Playwright for web/UI, terminal/PTY for CLI/TUI, live request/script for services/libraries). "Inconclusive" or wrong-surface is not a pass.
6. Sequence verifiable commits (**Sequence Work into Verifiable Units** in `../SKILL.md`): build and verify each small logical unit before the next.
7. Review final changes: run `../action/review/SKILL.md` (`review`) (and `../action/interrogate/SKILL.md` if the design is contested).

**Reply** (following `../SKILL.md` `## Writing the reply`): what you built, what you chose and why, the throughput checkpoint, verification evidence, review findings, and any open decisions. Use tables for design alternatives.
