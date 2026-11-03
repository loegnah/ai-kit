# Perf issue

**You own the measurement story. Tie every fix to a vetted measurement—never guess performance from reading source alone.**

Enforces the **Explain the Number** principle in `../SKILL.md`. For sustained, multi-iteration optimization against a target metric rather than a one-off fix, use `playbooks/hillclimb.md`.

1. Capture a baseline measurement or trace on the real surface. Vet the baseline—and every later number—with `../action/benchmark-checklist/SKILL.md` (`benchmark-checklist`). State the decision threshold, noise floor, and identified limiter before claiming a bottleneck.
2. Ground hypotheses with `../action/how/SKILL.md` (`how`). Do not claim a performance ceiling without measuring it. Try the performance mantras in order, cheapest first:
   1. **Don't do it.** Stop work whose result nothing uses rather than making it cheaper.
   2. **Do it, but don't do it again.** Cache, memoize, or deduplicate repeated work.
   3. **Do it less.** Batch, coalesce, or narrow the input set.
   4. **Do it later.** Defer off the critical path.
   5. **Do it when they're not looking.** Precompute or run in background idle windows.
   6. **Do it concurrently.** Parallelize independent work across cores/IO.
   7. **Do it cheaper.** Optimize the algorithm, data structure, or allocation path.

   When an earlier mantra meets the target, stop.

3. Plan and implement the fix from the trace. If it crosses module boundaries, run `../action/architect/SKILL.md` (`architect`) first. Apply one verifiable change at a time (**Sequence Work into Verifiable Units** in `../SKILL.md`) and capture a post-fix trace/measurement under identical tuned conditions.
4. Compare baseline vs. post-fix artifacts and vet the result with `../action/benchmark-checklist/SKILL.md`. "Inconclusive", within noise, or measured on the wrong surface is not a pass—revert or flag it.
5. Run static checks (`bun run check` / tests) and `../action/review/SKILL.md` (`review`).

**Reply** (following `../SKILL.md` `## Writing the reply`): verdict, baseline number, post-fix number, delta (with run count, range, and limiter per `benchmark-checklist`), verification evidence, and review findings.
