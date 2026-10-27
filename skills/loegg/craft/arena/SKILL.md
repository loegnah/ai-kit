---
name: loegg-arena
description: Spawn N parallel models with the same prompt (for pre-work review, design, or implementation), pick the strongest base, and graft the best parts of the rest into it.
disable-model-invocation: true
---

# Arena

Run the exact same prompt across multiple models in parallel, pick the single strongest result as the **Base**, graft the sharpest missing pieces from the others into it, and have the main agent verify and deliver one coherent result.

Use **arena** when:

- **User requests depth or multiple angles**: The user asks for a heavy, deep, or multi-perspective review/exploration ("다양한 관점/시각에서", "다각도로", "심층", "심화", "빡세게", "깊게"). Plain `"검토해봐"` without a depth signal stays in the main agent unless the next rule applies.
- **Agent judges it necessary**: Even without an explicit keyword, you judge that a single attempt or single perspective at a high-stakes review, design, or implementation risks locking in the wrong shape or missing subtle failure modes.

Open a todolist with one entry per phase (`Frame`, `Fan out`, `Pick a base`, `Graft & verify`, `Deliver`) before launching subagents.

## Phase 1: Frame

Every candidate receives the **exact same prompt**, so the prompt is the contract.

1. **State the target artifact**:
   - **Review / Analysis mode** (default when asked to review before starting work): Read-only critique of the plan, requirements, or target code—surfacing architectural fit, failure modes, edge cases, and simpler alternatives.
   - **Build / Design mode**: Competing code implementations or type/architecture sketches.
2. **Package shared grounding**: Gather the relevant files, context, and intent so every runner starts from the same facts.
3. **Derive the rubric**: Define 3–5 concrete, gradeable criteria for what a great result looks like on _this_ task (e.g., codebase accuracy, root-cause depth, feasibility, minimal surface area). Only the main agent (and optional cross-judge) sees the rubric; candidates see only the task prompt.
4. **Pick the runners**: Use the `arena runners` entry from the loegg model configuration (`meta/setup/SKILL.md`). If unconfigured, spawn at least 2 runners across distinct model families available in the harness.
5. **Isolate workspaces (Build mode only)**: When candidates write files, give each candidate an isolated git worktree or `/tmp/arena-<slug>/candidate-<n>/`. In Review mode, spawn candidates as read-only subagents.

## Phase 2: Fan out

Spawn all N subagents concurrently in a single tool call with:

- The identical task prompt and shared grounding context.
- Instructions to produce the artifact (review or code) plus a short rationale naming alternatives or risks considered and rejected.

If a candidate fails or produces empty output, proceed with the remaining candidates and note the dropout.

## Phase 3: Pick a base

Read every candidate's output end to end before choosing.

1. Score each candidate against the Phase 1 rubric criterion by criterion (optionally alongside a read-only `arena cross-judge` subagent for large artifacts).
2. **Pick one winning candidate as the Base.** Never average diverging candidates together.
   - In **Review mode**, pick the analysis with the most accurate mental model of the codebase and the highest-signal critique.
   - In **Build mode**, pick the candidate with the cleanest boundary and smallest maintainable surface.

## Phase 4: Graft & main agent review

Walk each losing candidate once more to extract only what the Base missed (typically 1–2 sharp points or edge cases per candidate):

1. **Fact-check against the codebase**: As the lead agent, verify both the Base's claims and any candidate grafts against actual code. Discard false alarms, nitpicks, or hallucinated constraints.
2. **Graft by hand**: Fold valid insights from the other models directly into the Base so the final artifact reads under **one coherent mental model**, not a stitched checklist.
   - If all candidates converged on the same conclusion, note the consensus—no graft is needed.
   - If candidates wildly diverged because the prompt was underspecified, re-frame Phase 1 or surface the core decision to the user via `discover/grill/SKILL.md`.

## Phase 5: Deliver

- **In Review mode**: Present the synthesized review to the user, structured clearly (key conclusions, blockers/risks to fix before starting, tradeoffs requiring user decision, and a brief note on which model served as Base, what was grafted from others, and what was dismissed).
- **In Build mode**: Run verification on the synthesized code (`bun run check`, tests, or runtime) before reporting completion alongside the synthesis summary.
