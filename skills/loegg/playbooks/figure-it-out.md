# Figure it out

**You own the workflow. When no other playbook fits, design one, then run it.** The first deliverable is the workflow itself: phases that scale rigor to the task, run the scientific method, and leave a decision trail a human can audit after stepping away.

Use this playbook when no other playbook in `../SKILL.md` fits, or for a large or cross-cutting effort (a migration across many call sites, an ambitious multi-part change, work the user steps away from) even when a narrower playbook like `playbooks/feature.md` partly fits. Use `playbooks/multi-phase-plan.md` instead when the user wants a plan document to approve before execution.

1. Frame. Ground first (`../action/how/SKILL.md`, `../action/why/SKILL.md`, or `../action/analyze/SKILL.md`), then state before starting:
   - **Done** as a falsifiable predicate (**Prove It Works** in `../SKILL.md`).
   - **Scope**, quantified: rough units and effort, plus the blockers grounding surfaced.
   - **Rigor level**, biased high. One-way doors and wide blast radius get more gates and artifacts; reversible low-stakes steps get fewer. Rigor is gates and artifacts, not "try harder".
   - In Direct Mode, present the framing and tradeoffs before a long run (`../action/grill/SKILL.md` for open decisions). In Agent Mode, record the framing in the decision log and proceed (**Never Block on the Human** in `../SKILL.md`).
2. Design the workflow. Decompose into atomic, independently verifiable units and sequence riskiest-unknown-first. Scaffold and verification come before features (**Foundational Thinking**, **Sequence Work into Verifiable Units** in `../SKILL.md`).
   - Build the verification harness before the work, with a baseline captured from the pre-change state, so each check reads "old value vs. new value" (**Build the Lever** in `../SKILL.md`).
   - For one-way-door design decisions, run `../action/architect/SKILL.md` (`architect`). Skip it for mechanical work whose shape is already concrete; a second arena over a settled design is over-engineering (**Laziness Protocol** in `../SKILL.md`).
   - Fan out only across real seams, with one output target per worker (**Separate Before Serializing Shared State** in `../SKILL.md`). Do not over-fan.
   - Write the designed phase list down. Add its steps to the todolist between this step and step 4.
3. Open the decision log via `../util/decision-log/SKILL.md` and add a row as each designed step lands, not at the end.
4. Run each designed step as an experiment: state the hypothesis, make the smallest change, measure against the predicate on the real artifact, keep it if it advanced, revert it if it did not.
   - Verify by inspecting the artifact, never a self-report. When something passes too easily, suspect the observation method before the system.
   - Review delegated work separately from the worker. If a worker games the gate, reset and harden the brief. If the gate itself is wrong, fix the gate as its own change rather than routing around it.
   - A verdict is `VERIFIED`, `NOT VERIFIED`, or `INCONCLUSIVE`. Inconclusive is not a pass. Do not hide a negative.
5. Verify the whole against the step 1 predicate on the real product, not just the harness. Encode any recurring correction as a gate, lint rule, check, or script (**Encode Lessons in Structure** in `../SKILL.md`).
6. Review final changes via `../action/review/SKILL.md` (`review`), then close the decision log per `../util/decision-log/SKILL.md` (`## Before handing back`).

**Reply** (following `../SKILL.md` `## Writing the reply`): the workflow you designed, the rigor level and why, the decision-log path, what is verified against the predicate, review findings, what is still open, and the decision log's **Attention** section.
