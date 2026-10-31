# Arena

Execution utility attached to a task step: run the exact same prompt across multiple models in parallel, pick the single strongest result as the **Base**, graft the sharpest missing pieces from the others into it, and have the main agent verify and deliver one coherent result.

Use **arena** when:

- **User requests depth or multiple angles**: The user attaches a heavy, deep, or multi-perspective signal ("다양한 관점/시각에서", "다각도로", "심층", "심화", "빡세게", "깊게", `arena`) to a bug investigation, question/analysis, review, design, or implementation request. Plain requests without a depth signal stay in the main agent unless the next rule applies.
- **Agent judges it necessary**: Even without an explicit keyword, you judge that a single attempt or single perspective at a high-stakes root-cause hunt, review, design, or implementation risks locking in the wrong shape or missing subtle failure modes.

Open a todolist with one entry per phase (`Frame`, `Fan out`, `Pick a base`, `Graft & verify`, `Deliver`) before launching subagents.

## Phase 1: Frame

Every candidate receives the **exact same prompt**, so the prompt is the contract.

1. **State the target artifact**:
   - **Investigation / Review / Analysis mode** (default for Q&A, root-cause bug analysis, or pre-work review): Read-only analysis or critique—surfacing root causes, architectural fit, failure modes, edge cases, and simpler alternatives.
   - **Build / Design mode**: Competing code implementations or type/architecture sketches.
2. **Package shared grounding**: Gather the relevant files, context, and intent so every runner starts from the same facts.
3. **Derive the rubric**: Define 3–5 concrete, gradeable criteria for what a great result looks like on _this_ task (e.g., codebase accuracy, root-cause depth, feasibility, minimal surface area). Only the main agent (and optional cross-judge) sees the rubric; candidates see only the task prompt.
4. **Pick the runners**: Use the runner role named by the calling action (`review runners` for `action/review.md`); otherwise use `arena runners`. Read that role from `~/.agents/loegg/models.md` (configured via `action/setup.md`), and run one subagent per comma-separated entry. Do not substitute another configured role when the selected role is missing. If unconfigured, configured with aliases (`inherit-parent` / `auto`), or the harness forbids explicit `model` parameters (e.g., OMP), omit `model` for those runners and use the harness's configured agent roles. Run at least 2 candidates; if fewer than 2 entries are configured, supplement with harness defaults. Investigation / Review runners are read-only. Prefer distinct model families when available; otherwise use distinct harness agent roles (`scout1`, `scout2`, etc.) and disclose the diversity limit.
   - For every explicit runner or cross-judge model, pass the complete configured identifier, including provider prefix and effort suffix, unchanged to the subagent tool. Never strip or replace the provider. Judge family diversity by the underlying model, not the provider; two providers serving the same model are not distinct families.
5. **Isolate workspaces (Build mode only)**: When candidates write files, give each candidate an isolated git worktree or `/tmp/arena-<slug>/candidate-<n>/`. In Investigation / Review mode, spawn candidates as read-only subagents.

## Phase 2: Fan out

Spawn all N subagents concurrently in a single tool call with:

- The identical task prompt and shared grounding context.
- Instructions to produce the artifact (review or code) plus a short rationale naming alternatives or risks considered and rejected.

If a candidate fails or produces empty output, proceed with the remaining candidates and note the dropout.

## Phase 3: Pick a base

Read every candidate's output end to end before choosing.

1. Score each candidate against the Phase 1 rubric criterion by criterion (optionally alongside a read-only cross-judge subagent chosen from `arena cross-judge pool` in `~/.agents/loegg/models.md`, preferring a model family different from the parent).
2. **Pick one winning candidate as the Base.** Never average diverging candidates together.
   - In **Investigation / Review mode**, pick the analysis with the most accurate mental model of the codebase, the deepest root-cause evidence, and the highest-signal critique.
   - In **Build mode**, pick the candidate with the cleanest boundary and smallest maintainable surface.

## Phase 4: Graft & main agent review

Walk each losing candidate once more to extract only what the Base missed (typically 1–2 sharp points or edge cases per candidate):

1. **Fact-check against the codebase**: As the lead agent, verify both the Base's claims and any candidate grafts against actual code. Discard false alarms, nitpicks, or hallucinated constraints.
2. **Graft by hand**: Fold valid insights from the other models directly into the Base so the final artifact reads under **one coherent mental model**, not a stitched checklist.
   - If all candidates converged on the same conclusion, note the consensus—no graft is needed.
   - If candidates wildly diverged because the prompt was underspecified, re-frame Phase 1 or surface the core decision to the user via `action/grill.md`.

## Phase 5: Deliver

- **In Investigation / Review mode**: Present the synthesized answer/analysis/review to the user, structured clearly (key conclusions or root cause, blockers/risks, tradeoffs requiring user decision, and a brief note on which model served as Base, what was grafted from others, and what was dismissed).
- **In Build mode**: Run verification on the synthesized code (`bun run check`, tests, or runtime) before reporting completion alongside the synthesis summary.
