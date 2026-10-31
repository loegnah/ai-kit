---
name: loegg
description: loegnah's agent style and workflow orchestrator. Use for loegg, /loegg, or requests to work in this style.
disable-model-invocation: true
---

# Loegg

Execution modes live at `mode/<name>-mode.md`, directly callable actions live at `action/<name>.md` (`setup`, `help`, `grill`, `analyze`, `review`, etc.), shared execution utilities live at `util/<name>.md` (`arena`, etc.), and playbooks live at `playbooks/<title>.md`.

## Dispatch: One-Shot Actions vs. Full Mode

Only `action/` files can be invoked directly as standalone commands (`mode/` and `util/` are internal helpers applied during a task, never called on their own):

- **One-shot action (`/loegg <action>` — `setup`, `help`, `grill`, `analyze`, `review`)**: When invoked with an action name, read `action/<action>.md` and execute it directly, loading only dependencies that action explicitly requests, not `mode/*.md` or playbooks.
  - `setup` -> `action/setup.md` (configure per-entry providers, models, and reasoning budgets in `~/.agents/loegg/models.md`; recommendations list model names only).
  - `help` -> `action/help.md` (explain loegg usage, recommend workflows, or draft prompts).
  - `grill` -> `action/grill.md` (stress-test a plan or resolve ambiguous requirements in frontier rounds).
  - `analyze` -> `action/analyze.md` (send the same bug-hunt or analysis question to multiple read-only subagents in parallel and have the main agent fact-check and synthesize the answer).
  - `review` -> `action/review.md` (read-only review of current changes; use `review runners` through arena for deep review).
- **Full workflow (`/loegg <task>` or `/loegg agent <task>`)**: For general tasks, select an execution mode (`mode/`), apply any triggered utilities (`util/`), and follow the matched playbook below.

## Non-negotiables

The Principles section below grounds every trigger. In your reply, name each principle that shaped a decision and the specific choice it changed.

Remaining triggers during a task:

- Underspecified requirements or high-leverage open design decisions before building -> read `action/grill.md`.
- Root-cause bug investigation or complex codebase/architecture Q&A requiring multi-subagent parallel analysis (`analyze`) -> read `action/analyze.md`.
- Review current changes, including deep/multi-angle change review -> read `action/review.md`, which selects `review runners` when arena is needed.
- Other deep/multi-angle work or competing candidates (`arena`), triggered either by an explicit heavy/depth request ("다양한 관점/시각", "다각도로", "심층", "심화", "빡세게", "깊게", `arena`) or by the agent's own judgment that a high-stakes step needs multi-model verification -> read `util/arena.md`.
- <!-- <condition or trigger> -> `action/<name>.md` or `util/<name>.md`. -->

## Principles

Read the leaf skill in full for any principle you apply.

**Core**

- <!-- **<Principle Title>.** <When it applies and what it requires.> -->

**Architecture**

- <!-- **<Principle Title>.** <When it applies and what it requires.> -->

**Verification**

- <!-- **<Principle Title>.** <When it applies and what it requires.> -->

**Delegation**

- <!-- **<Principle Title>.** <When it applies and what it requires.> -->

**Meta**

- <!-- **<Principle Title>.** <When it applies and what it requires.> -->

## Autonomy

- **Just do it.** <!-- Reversible work that proceeds without asking. -->
- **Always pause.** <!-- Irreversible or high-risk actions that require confirmation. -->

## Execution Mode & Subagents

Select and read the execution mode before running a task:

- **Direct Mode (Default)**: Read `mode/direct-mode.md` when working interactively with the user in conversation. Clarify open decisions with the user and pause at requested review checkpoints.
- **Agent Mode (Autonomous)**: Read `mode/agent-mode.md` when the user invokes `/loegg agent` or asks the agent to run autonomously to completion without interactive checkpoints.

### Heavy Multi-Agent Escalation (`arena`, etc.)

Routine steps (including plain `"검토해봐"`) run directly in the main agent to avoid unnecessary token spend. Escalate a step to heavy multi-agent execution (`util/arena.md`) in two cases:

1. **Explicit depth/intensity signal from the user**: The user asks for multi-angle or deep work ("다양한 관점/시각", "다각도로", "심층", "심화", "빡세게", "깊게", or `arena`).
2. **Agent's own judgment**: Even without those keywords, the agent judges that the current step faces a high-stakes architectural fork, subtle failure mode, or costly lock-in risk where a single perspective is not enough.

## Final Workflow Step: Review

For every file-changing full workflow, finish with **implement -> verify -> review -> final report** in both execution modes. After the matched playbook's implementation and verification steps, read `action/review.md` and review the final changes before delivery. No file changes means no mandatory change review.

Review is read-only, not an automatic fix loop. Carry confirmed findings and verification limits into the final report instead of claiming a clean result. If later edits occur, verify and review the affected changes again before delivery.

## Writing the reply

- <!-- Reply style, language, formatting, and evidence rules. -->

## Comments

- <!-- Code comment rules. -->

## Playbooks

Open a todolist whose first items are the matched playbook's steps, copied in verbatim, before any task-specific todos. Match the task to a playbook below and open its full steps at `playbooks/<title>.md`.

- <!-- **<Playbook Name>.** <When to use this playbook.> (`playbooks/<name>.md`) -->
