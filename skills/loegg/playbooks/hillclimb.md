# Hillclimb

**You own the metric and the experiment's integrity.** Use this playbook for sustained, iterative improvement of one measurable metric against a target. A one-off fix belongs in `playbooks/bug-fix.md` or `playbooks/perf-issue.md`; this is the scientific keep-or-revert loop.

Core discipline: **one hypothesis, one change, one measurement, keep or revert**. Never stack unmeasured changes, and never claim a win from code inspection alone (**Prove It Works**, **Explain the Number** in `../SKILL.md`).

1. Ground the workload and architecture before choosing the metric. Run `../action/how/SKILL.md` (`how`) over the target, name the realistic workload dimensions that move the result (data size, history, state, concurrency), and select a case that reproduces the symptom. Fix one metric, the direction that counts as better, and a checkable stop predicate that pairs a target with a minimum iteration floor (e.g., "at least 50% faster than baseline across at least 5 iterations").
2. Build the measurement harness, prove its sensitivity, and freeze it (**Build the Lever** in `../SKILL.md`). Vet the harness with `../action/benchmark-checklist/SKILL.md` (`benchmark-checklist`) before freezing it, and make it print its error count and work-completed count so every iteration checks questions 4 and 7 automatically. Once frozen, one repeatable command emits the metric (sampled across multiple runs to clear noise). Record the baseline metric and a green run of the regression gate (`bun run check` and test suite) before any change.
3. Open a decision log (`/tmp/hillclimb-<slug>-decision.tsv`, kept outside git tracking) with one row per attempt: `id`, `hypothesis`, `change`, `before`, `after`, `delta`, `tests`, `verdict` (`kept` or `reverted`), `note`. Read it before each attempt so rejected ideas are never repeated.
4. Ground each hypothesis in the architecture model from Step 1 so it names a specific mechanism ("defer X off the critical path because it blocks Y"), not vague guesswork. For performance metrics, order hypotheses using the 7 performance mantras in `playbooks/perf-issue.md` Step 2.
5. Loop, one hypothesis per iteration (**Sequence Work into Verifiable Units** in `../SKILL.md`):
   - Apply one scoped change (or fan out independent hypotheses across isolated git worktrees per **Separate Before Serializing Shared State**).
   - Measure before and after with the frozen harness, and run the regression gate.
   - **Accept** only when the metric moves past the noise floor and the regression gate stays green. Otherwise **revert** the change in full. A tweak that "might help" is never kept.
   - Commit each accepted win individually (`git add <changed-files>`) and log the row (`kept` or `reverted`) in `decision.tsv`.
6. Push past the first plateau. After several consecutive rejects, pivot to a different mantra category, combine near-misses, or re-profile the new limiter before concluding the ceiling is reached. Correctness and simplicity outrank raw numbers: revert any win that breaks behavior, and keep a simplification that holds the metric (**Laziness Protocol** in `../SKILL.md`).
7. Stop when the predicate is met or remaining ideas are marginal relative to complexity cost. Run `../action/review/SKILL.md` (`review`) on the final diff. If the user asked to open a PR, run `playbooks/opening-a-pr.md`.

**Reply** (following `../SKILL.md` `## Writing the reply`): the metric and target, baseline -> final with percent delta and limiter, iterations run (`kept` vs. `reverted`), one line per accepted change, the `decision.tsv` summary, review findings, and the best next hypothesis if pushed further.
