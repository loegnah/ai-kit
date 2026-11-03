# Refactoring

**You own the contract. The structure changes; the behavior does not.** Distinct from `playbooks/feature.md` (which adds or changes behavior) and `playbooks/bug-fix.md` (which corrects broken behavior).

If the cleanup reveals a missing feature or a real bug, split it out and finish the structural change first against the pinned contract. If a behavior redesign is required, name it and route to `playbooks/feature.md`.

1. Pin the behavior contract first. Run `../action/how/SKILL.md` (`how`) over the affected subsystem to learn the contract, then write or run a characterization test, snapshot, or equivalence harness that captures current behavior before any structure moves (**Test Behavior, Not Implementation** in `../SKILL.md`). If the area has no coverage, write the pin before touching structure. Typecheck and lint alone are not a behavior pin.
2. Name the structure the code is missing (**Model the Domain** in `../SKILL.md`). Boring code stays when the shape is already clear and local. The reshape must delete branches or invalid states, not add indirection.
3. Name the target shape. State what the module layout, types, and call graph should be if built today (**Foundational Thinking**, **Redesign from First Principles** in `../SKILL.md`). If the target crosses module boundaries, run `../action/architect/SKILL.md` (`architect`) to explore and lock the shape before moving code.
4. Subtract before you add (**Subtract Before You Add**, **Laziness Protocol** in `../SKILL.md`). Delete dead code, collapse one-caller wrappers, drop redundant validators, and remove orphan references before introducing the new shape. A speculative cleanup that "might help" gets reverted.
5. Move in small behavior-preserving steps, each keeping the pin green. For internal API reshapes, migrate every caller and delete the old API in the same wave (**Migrate Callers Then Delete Legacy APIs**, **Outcome-Oriented Execution** in `../SKILL.md`)—no compatibility shims, no parallel old-and-new paths. Spot-check every rename against actual files (including strings, docs, and config). For repetitive multi-file moves, use a deterministic codemod script (**Build the Lever** in `../SKILL.md`) or fan out independent file slices to `parallel workers`.
6. Prove behavior is unchanged on the real surface (**Prove It Works** in `../SKILL.md`), not just "it compiles". Run static checks (`bun run check`), the behavior pin, and an equivalence check (diffing old-vs-new outputs or running a smoke test on the real surface).
7. Confirm the change is worth keeping. The success measure is reduced reader load (**Minimize Reader Load** in `../SKILL.md`). If the diff does not lower indirection or state complexity, revert it.
8. Sequence commits (**Sequence Work into Verifiable Units** in `../SKILL.md`): subtraction first, then the reshape, then follow-on cleanup. Run `../action/review/SKILL.md` (`review`).

**Reply** (following `../SKILL.md` `## Writing the reply`): the structure that changed, the behavior pin held against it, the equivalence proof, the reader-load reduction, review findings, and what shipped vs. what was reverted.
