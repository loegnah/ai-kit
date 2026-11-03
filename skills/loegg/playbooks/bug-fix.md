# Bug fix

**You own this task. Reproduce, trace the root cause with runtime evidence, fix, verify, and review.**

Be scientific (**Fix Root Causes** in `../SKILL.md`). Every shipped line traces to runtime evidence. Belt-and-suspenders guards that "might help" are hypotheses, not fixes—they do not ship. When evidence refutes a hypothesis, revert what it motivated. Ship the smallest change the evidence justifies, nothing more.

1. Reproduce it yourself on the matching surface (browser automation for UI, terminal/PTY for CLI, test or repro script for runtime/API). Ask the user only with a stated, specific reason the target surface cannot be reached locally, and only after driving it as far as possible. If it won't reproduce directly, synthesize the trigger, tighten conditions, or add temporary instrumentation until it fires.
2. Binary-search the cause. Form candidate hypotheses, then rule them out until one survives. Seed them with `../action/how/SKILL.md` (`how`) over the affected subsystem, `../action/why/SKILL.md` (`why`) for regression history, or `../action/analyze/SKILL.md` (`analyze`) for multi-subagent parallel root-cause investigation. Each pass, take the split that cuts the most remaining problem space, gather runtime evidence, and eliminate. When program state is unclear, add logging/instrumentation and read it as the code runs. Do not guess. Confirm the surviving _mechanism_ with runtime evidence before writing the fix.
3. Plan and apply the fix. If the fix crosses module boundaries or reshapes contracts, run `../action/architect/SKILL.md` (`architect`) first. Apply the minimal root-cause fix and remove any temporary debug instrumentation.
4. Verify on the same surface (**Prove It Works** in `../SKILL.md`). The original repro must now pass alongside static checks (`bun run check` / tests). "Inconclusive" or wrong-surface is not a pass. Unit tests show branch behavior, not full bug absence.
5. Sequence commits (**Sequence Work into Verifiable Units** in `../SKILL.md`) so the failing regression test lands before or alongside the fix when a cheap local test path exists.
6. Review final changes via `../action/review/SKILL.md` (`review`).

**Reply** (following `../SKILL.md` `## Writing the reply`): what was broken, root cause (`file:line` and mechanism), the fix, failing-then-passing repro output verbatim, and review findings.
