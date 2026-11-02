---
name: loegg
description: loegnah's agent style and workflow orchestrator. Use for loegg, /loegg, or requests to work in this style.
disable-model-invocation: true
---

# Loegg

Execution modes live at `mode/<name>-mode.md`, directly callable actions live at `action/<name>.md` (`setup`, `help`, `grill`, `analyze`, `review`, `doc`, etc.), shared execution utilities live at `util/<name>.md` (`arena`, etc.), and playbooks live at `playbooks/<title>.md`.

## Dispatch: One-Shot Actions vs. Full Mode

Only `action/` files can be invoked directly as standalone commands (`mode/` and `util/` are internal helpers applied during a task, never called on their own):

- **One-shot action (`/loegg <action>` — `setup`, `help`, `grill`, `analyze`, `review`, `doc`)**: When invoked with an action name, read `action/<action>.md` and execute it directly, loading only dependencies that action explicitly requests, not `mode/*.md` or playbooks.
  - `setup` -> `action/setup.md` (configure per-entry providers, models, and reasoning budgets in `~/.agents/loegg/models.md`; recommendations list model names only).
  - `help` -> `action/help.md` (explain loegg usage, recommend workflows, or draft prompts).
  - `grill` -> `action/grill.md` (stress-test a plan or resolve ambiguous requirements in frontier rounds).
  - `analyze` -> `action/analyze.md` (send the same bug-hunt or analysis question to multiple read-only subagents in parallel and have the main agent fact-check and synthesize the answer).
  - `review` -> `action/review.md` (read-only review of current changes; use `review runners` through arena for deep review).
  - `doc` (`docs`, `design-doc`, `rule`, `guide`, `note`, `tip`, `story`, `glossary`) -> `action/doc.md` (distill reusable session knowledge into `docs/design/`, `docs/rule/`, `docs/guide/`, `docs/note/`, `docs/story/`, or `docs/GLOSSARY.md`).
- **Full workflow (`/loegg <task>` or `/loegg agent <task>`)**: For general tasks, select an execution mode (`mode/`), apply any triggered utilities (`util/`), and follow the matched playbook below.

## Non-negotiables

The Principles section below grounds every trigger. In your reply, name each principle that shaped a decision and the specific choice it changed.

Remaining triggers during a task:

- Underspecified requirements or high-leverage open design decisions before building -> read `action/grill.md`.
- Root-cause bug investigation or complex codebase/architecture Q&A requiring multi-subagent parallel analysis (`analyze`) -> read `action/analyze.md`.
- Review current changes, including deep/multi-angle change review -> read `action/review.md`, which selects `review runners` when arena is needed.
- Capture or update project documentation from session learnings (`doc`, `design-doc`, `rule`, `guide`, `note`, `tip`, `story`, `glossary`) -> read `action/doc.md`.
- Other deep/multi-angle work or competing candidates (`arena`), triggered either by an explicit heavy/depth request ("다양한 관점/시각", "다각도로", "심층", "심화", "빡세게", "깊게", `arena`) or by the agent's own judgment that a high-stakes step needs multi-model verification -> read `util/arena.md`.
- <!-- <condition or trigger> -> `action/<name>.md` or `util/<name>.md`. -->

## Principles

Apply the matching principles below as you work; each entry states when it triggers and what it requires.

**Core**

- **Laziness Protocol.** Refactoring, sizing a diff, or tempted to add abstractions, layers, or signal threading. Consolidate decisions in one place and bias to deletion and the smallest change that solves the problem.
- **Foundational Thinking.** Before writing logic: choosing core types and data structures, sequencing scaffold-vs-feature work, or checking what concurrent actors share. Define the data shape first, subtract dead code before laying scaffolds, and isolate shared concurrent state.
- **Redesign from First Principles.** Integrating a new requirement into an existing design. Do not bolt it on; redesign as if the requirement had been foundational from day one and propagate it through types, callers, and docs.
- **Attack the Premise.** Two or more fixes that share one premise have failed the same gate. Write the shared premise down in one sentence and test it directly before writing a third fix that assumes it.
- **Subtract Before You Add.** Sequencing an addition, refactor, or rewrite. Remove dead code, redundant validators, and orphan references first, then build on the simpler base.
- **Minimize Reader Load.** Reviewing or shaping code that is hard to trace. Minimize both indirection layers (collapse one-caller wrappers and pass-through layers that do not change the abstraction) and held state (prefer pure returns and narrow local state over mutable module/global state so a reader can trace origin and mutation in under 30 seconds).
- **Outcome-Oriented Execution.** Planned rewrites and migrations with explicit phase boundaries. Converge directly on the target architecture instead of preserving smooth intermediate states with throwaway compatibility shims; require full static and runtime verification at completion.
- **Experience First.** Product, UX, API, or feature-scope tradeoffs. Choose delight and clarity for the consumer (end user, caller, or next maintainer) over implementation convenience; ship fewer polished capabilities over more rough ones.
- **Exhaust the Design Space.** Novel UI interaction or high-stakes architectural decision with no codebase precedent where static reasoning cannot pick a winner. Compare 2–3 lightweight prototypes or run `util/arena.md` before committing.
- **Build the Lever.** Repetitive multi-file edits, migrations, code generation, or checks that cannot be reliably verified by hand. Learn the recipe on one unit, then build a deterministic script or tool to run and verify the rest. Delete one-off levers before commit; keep reusable levers under `scripts/lever/<purpose>/` (`verify`, `codemod`, `codegen`, `analyze`) unless the project defines another convention.

**Architecture**

- **Model the Domain.** Writing stateful logic, growing `if/else` chains, or repeating a shape assumption across files. Encode the domain in a structure (state machine, discriminated union, lookup table/registry, or reducer) so illegal states become unrepresentable.
- **Boundary Discipline.** Wiring validation, error handling, or framework adapters. Parse and validate at system boundaries (CLI, config, network, external APIs); trust internal types and keep core business logic in pure functions.
- **Type System Discipline.** Designing types or signatures in a statically typed language. Make illegal states unrepresentable, brand distinct semantic primitives (`UserId` vs. `OrderId`), parse external data at boundaries, and derive types from authoritative schemas.
- **Make Operations Idempotent.** Designing commands, lifecycle steps, or loops that run amid crashes, restarts, and retries. Derive actions from current state vs. target state so running twice converges to the same end state, and make partial artifacts recognizable as stale.
- **Migrate Callers Then Delete Legacy APIs.** Introducing a new internal API while old callers exist and no external backward-compatibility contract applies. Migrate all callers and delete the legacy API in the same wave without leaving shims or deprecated aliases.
- **Separate Before Serializing Shared State.** Concurrent actors (workers, processes, subagents) might write to the same file, branch, key, or state object. Eliminate shared write targets first by giving each actor its own output target and merging at the read boundary; serialize structurally only when a single writer is a true invariant.

**Verification**

- **Prove It Works.** After completing a task, before declaring done. Verify against the real surface and actual output—never infer correctness from "it compiles", cached state, or proxy checks.
- **Fix Root Causes.** Debugging a defect. Reproduce first, trace the symptom back to the first place the system created or mishandled the wrong state, and fix it there rather than masking the symptom with guards or swallowed errors.
- **Sequence Work into Verifiable Units.** Multi-step work (sweeps, migrations, stacked changes). Break work into small units that each end in a verifiable green check before advancing (e.g., failing test -> fix, subtraction -> reshape).
- **Test Behavior, Not Implementation.** Writing, updating, or keeping a test. Assert observable caller/user contracts so the test fails when behavior breaks and still passes when internal structure changes.
- **Explain the Number.** Before measuring, and before trusting, reporting, or acting on a measured number (speedup, regression, throughput, latency, or eval score). State the decision threshold and noise floor before running, identify the actual bottleneck/limiter from profiling or counters, and rule out cached/skipped work with evidence.

**Delegation**

- **Guard the Context Window.** Large outputs, long files, repeated reads, or broad codebase exploration. Route bulk exploration to read-only subagents and keep concise syntheses in the main thread.
- **Never Block on the Human.** Tempted to ask "should I do X?" on reversible implementation steps. In `Direct Mode`, clarify open product/scope/architecture forks upfront via `action/grill.md`; once the direction is set (or throughout `Agent Mode`), execute reversible steps without pausing and pause only for irreversible high-risk actions.

**Meta**

- **Encode Lessons in Structure.** Writing the same instruction twice or noticing a recurring mistake. Encode the rule as a lint check, type constraint, metadata flag, runtime check, or script rather than adding more prose.

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
