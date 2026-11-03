---
name: loegg-how
description: 'Explain subsystem architecture, runtime control flow, and code placement ("how does X work", "where should this live", "which package owns this"). Invoked via `/loegg how` or triggered during a loegg workflow. Use `/loegg why` for historical motivation.'
disable-model-invocation: true
---

# How

Explore the codebase to answer "how does X work?" questions. Produce architectural explanations at the level of a senior engineer onboarding onto a subsystem, enough to build a working mental model, not so much that it reads like annotated source code.

When spawning parallel explorers (Step 2), use the `analyze runners` role from `~/.agents/loegg/models.md` (configured via `../setup/SKILL.md`). Pass each configured `provider/model:effort` identifier unchanged, or omit `model` when unconfigured, set to `inherit-parent` / `auto`, or restricted by the harness (e.g., use `scout1` / `scout2` in OMP). Keep all explorers read-only (`readonly: true` where supported). Follow the subagent rules in `../../SKILL.md` (`Execution Mode & Subagents`).

## 1. Assess complexity

If the scope is ambiguous, state your interpretation and explore. The user can redirect.

- **Simple** (a single module, a small utility, a narrow question such as "how does function X work"): no subagents. The main agent explores and explains directly in one pass using the structure in `references/explainer-prompt.md` (without the explorer-findings section). Go to step 4.
- **Complex** (a subsystem spanning multiple files or services, a cross-cutting feature, a full architectural overview, or when the user asks for depth): go to step 2.

When in doubt, take the simple path.

**Other harnesses.** The spawns in this skill use Cursor's `Task` tool. In another harness, use its subagent tool: `Agent` in Claude Code (`subagent_type: general-purpose`), `task` in OpenCode (`subagent_type: general`), `spawn_agent` in Codex. Keep the prompt and the model. Drop parameters your tool doesn't have. If your harness has no subagent tool, as in Pi without an extension, run each role yourself, one after another.

## 2. Explore (complex only)

Decompose the question into 2 to 4 angles, each a distinct slice of the subsystem. Spawn all explorers in a single message, each with `references/explorer-prompt.md` and its angle filled in.

## 3. Synthesize (complex only)

Once all explorers have returned, the main agent verifies key claims against the codebase and synthesizes every explorer's findings directly using the instructions and structure in `references/explainer-prompt.md` (reconciling overlaps and resolving any contradictions in the code).

## 4. Present

Present the synthesized explanation to the user following `../../SKILL.md` (`## Writing the reply`).

## Output format

The explanation uses the sections defined in `references/explainer-prompt.md`, dropping any that do not apply: Overview, Key Concepts, How It Works, Where Things Live, Gotchas.
