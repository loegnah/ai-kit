---
name: loegg
description: loegnah's agent style and workflow orchestrator. Use for loegg, /loegg, or requests to work in this style.
disable-model-invocation: true
---

# Loegg

Execution modes live at `mode/<name>-mode/SKILL.md`, directly callable actions live at `action/<name>/SKILL.md` (`setup`, `help`, `grill`, `analyze`, `how`, `why`, `teach`, `show-me`, `blast-radius`, `interrogate`, `benchmark-checklist`, `recall`, `reflect`, `review`, `doc`, etc.), shared execution utilities live at `util/<name>/SKILL.md` (`arena`, etc.), and playbooks live at `playbooks/<title>.md`.

## Dispatch: One-Shot Actions vs. Full Mode

Only `action/` entries can be invoked directly as standalone commands (`mode/` and `util/` are internal helpers applied during a task, never called on their own):

- **One-shot action (`/loegg <action>` — `setup`, `help`, `grill`, `analyze`, `how`, `why`, `teach`, `show-me`, `blast-radius`, `interrogate`, `benchmark-checklist`, `recall`, `reflect`, `review`, `doc`)**: When invoked with an action name, read its mapped file below and execute it directly, loading only dependencies that action explicitly requests, not `mode/*/SKILL.md` or playbooks.
  - `setup` -> `action/setup/SKILL.md` (configure per-entry providers, models, and reasoning budgets in `~/.agents/loegg/models.md`; recommendations list model names only).
  - `help` -> `action/help/SKILL.md` (explain loegg usage, recommend workflows, or draft prompts).
  - `grill` -> `action/grill/SKILL.md` (stress-test a plan or resolve ambiguous requirements in frontier rounds).
  - `analyze` -> `action/analyze/SKILL.md` (send the same bug-hunt or analysis question to multiple read-only subagents in parallel and have the main agent fact-check and synthesize the answer).
  - `how` -> `action/how/SKILL.md` (explain code structure and runtime flow).
  - `why` -> `action/why/SKILL.md` (trace historical motivation, design rationale, and tradeoffs across git, PRs, issues, docs, and MCPs with confidence tiers).
  - `teach` -> `action/teach/SKILL.md` (explain how and why a subsystem or change works).
  - `show-me` (`show`) -> `action/show-me/SKILL.md` (visualize code flow, architecture, or diffs immediately using call trees, component/file trees, Mermaid, structural diffs, or SVG/HTML).
  - `blast-radius` -> `action/blast-radius/SKILL.md` (trace downstream impact).
  - `interrogate` -> `action/interrogate/SKILL.md` (adversarial review).
  - `benchmark-checklist` (`benchmark`) -> `action/benchmark-checklist/SKILL.md` (vet performance measurements).
  - `recall` -> `action/recall/SKILL.md` (reconstruct recent working context).
  - `reflect` -> `action/reflect/SKILL.md` (derive skill improvements from the session).
  - `review` -> `action/review/SKILL.md` (read-only review of current changes; use `review runners` through arena for deep review).
  - `doc` (`docs`, `design-doc`, `rule`, `guide`, `note`, `tip`, `story`, `glossary`) -> `action/doc/SKILL.md` (distill reusable session knowledge into `docs/design/`, `docs/rule/`, `docs/guide/`, `docs/note/`, `docs/story/`, or `docs/GLOSSARY.md`).
- **Full workflow (`/loegg <task>` or `/loegg agent <task>`)**: For general tasks, select an execution mode (`mode/`), apply any triggered utilities (`util/`), and follow the matched playbook below.

## Non-negotiables

The Principles section below grounds every trigger. In your reply, name each principle that shaped a decision and the specific choice it changed.

Remaining triggers during a task:

- Underspecified requirements or high-leverage open design decisions before building -> read `action/grill/SKILL.md`.
- Questions about how code works, runtime/control flow, or where code belongs ("이건 어떻게 동작해?", "코드 흐름이 어떻게 돼?", "어디에 넣어야 해?", `how`) -> read `action/how/SKILL.md`.
- Questions about design rationale, historical intent, or why code/thresholds exist ("이건 왜 이렇게 짰어?", "왜 이 방식을 썼지?", `why`) -> read `action/why/SKILL.md`.
- Requests to explain a subsystem or change plainly so the user deeply understands both how and why ("이거 쉽게 설명해줘", "가르쳐줘", "이해시켜줘", `teach`) -> read `action/teach/SKILL.md`.
- Requests to visualize code, flow, structure, or changes ("그림으로 보여줘", "도식/다이어그램/콜트리로 보여줘", "시각화해줘", `show-me`, `show`) -> read `action/show-me/SKILL.md`.
- Questions about downstream impact or what a change could break ("이거 바꾸면 어디 깨져?", "파급효과가 어떻게 돼?", `blast-radius`) -> read `action/blast-radius/SKILL.md`.
- Adversarial stress-testing of a change or design ("적대적으로 검증해봐", "이 설계/코드 깨봐", "허점 찾아봐", `interrogate`) -> read `action/interrogate/SKILL.md`.
- Running a benchmark or reporting/vetting a performance number (`benchmark`, `benchmark-checklist`) -> read `action/benchmark-checklist/SKILL.md`.
- Resuming work or asking where things stand ("어디까지 했지?", "최근 작업 맥락 복구해줘", `recall`) -> read `action/recall/SKILL.md`.
- Reflecting on the session to improve checks, skills, or rules ("이번 세션 회고해봐", "배운 거 스킬/규칙에 반영해봐", `reflect`) -> read `action/reflect/SKILL.md`.
- Root-cause bug investigation or complex codebase/architecture Q&A requiring multi-subagent parallel analysis (`analyze`) -> read `action/analyze/SKILL.md`.
- Review current changes, including deep/multi-angle change review -> read `action/review/SKILL.md`, which selects `review runners` when arena is needed.
- Capture or update project documentation from session learnings (`doc`, `design-doc`, `rule`, `guide`, `note`, `tip`, `story`, `glossary`) -> read `action/doc/SKILL.md`.
- Other deep/multi-angle work or competing candidates (`arena`), triggered either by an explicit heavy/depth request ("다양한 관점/시각", "다각도로", "심층", "심화", "빡세게", "깊게", `arena`) or by the agent's own judgment that a high-stakes step needs multi-model verification -> read `util/arena/SKILL.md`.

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
- **Exhaust the Design Space.** Novel UI interaction or high-stakes architectural decision with no codebase precedent where static reasoning cannot pick a winner. Compare 2–3 lightweight prototypes or run `util/arena/SKILL.md` before committing.
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
- **Never Block on the Human.** Tempted to ask "should I do X?" on reversible implementation steps. In `Direct Mode`, clarify open product/scope/architecture forks upfront via `action/grill/SKILL.md`; once the direction is set (or throughout `Agent Mode`), execute reversible steps without pausing and pause only for irreversible high-risk actions.

**Meta**

- **Encode Lessons in Structure.** Writing the same instruction twice or noticing a recurring mistake. Encode the rule as a lint check, type constraint, metadata flag, runtime check, or script rather than adding more prose.

## Autonomy

- **Just do it.** Proceed without asking on reversible work: reading/editing repo files, running checks/tests/evals, and querying MCP tools.
- **Always pause.** Require explicit confirmation before irreversible or high-risk actions: force-pushing shared branches, production deploys, destructive data deletion, modifying paths outside repository boundaries, or sending external messages.
- **Session overrides.** "끝까지 알아서 진행해" / "자율로 돌려" / "don't stop" / "run until done" switches the session to `Agent Mode` (`mode/agent-mode/SKILL.md`).
- **No is an acceptable answer.** When asked whether to do something, invited to add scope, or shown a flawed approach, give your real judgment. Decline, push back, or propose a simpler alternative when warranted; candor over sycophancy.

## Execution Mode & Subagents

Select and read the execution mode before running a task:

- **Direct Mode (Default)**: Read `mode/direct-mode/SKILL.md` when working interactively with the user in conversation. Clarify open decisions with the user and pause at requested review checkpoints.
- **Agent Mode (Autonomous)**: Read `mode/agent-mode/SKILL.md` when the user invokes `/loegg agent` or asks the agent to run autonomously to completion without interactive checkpoints.

### Heavy Multi-Agent Escalation (`arena`, etc.)

Routine steps (including plain `"검토해봐"`) run directly in the main agent to avoid unnecessary token spend. Escalate a step to heavy multi-agent execution (`util/arena/SKILL.md`) in two cases:

1. **Explicit depth/intensity signal from the user**: The user asks for multi-angle or deep work ("다양한 관점/시각", "다각도로", "심층", "심화", "빡세게", "깊게", or `arena`).
2. **Agent's own judgment**: Even without those keywords, the agent judges that the current step faces a high-stakes architectural fork, subtle failure mode, or costly lock-in risk where a single perspective is not enough.

## Final Workflow Step: Review

For every file-changing full workflow, finish with **implement -> verify -> review -> final report** in both execution modes. After the matched playbook's implementation and verification steps, read `action/review/SKILL.md` and review the final changes before delivery. No file changes means no mandatory change review.

Review is read-only, not an automatic fix loop. Carry confirmed findings and verification limits into the final report instead of claiming a clean result. If later edits occur, verify and review the affected changes again before delivery.

## Writing the reply

- **Clear declarative prose.** Write in the user's language (default Korean when the user writes in Korean) using short, direct sentences without filler or AI boilerplate. Keep every required decision, tradeoff, and verification detail intact.
- **Frame impact for the consumer and the maintainer.** State who the change affects (end user, caller, or next maintainer) and what changes for them before diving into implementation mechanics.
- **Every claim carries its evidence or label.** Attach observed proof (`file:line`, command output, or measurement) to each claim; label unverified predictions or unseen causes explicitly as inference/hypothesis. Never hand the user a check you can run yourself.
- **Never fabricate references.** Cite or link only files, commands, outputs, or transcripts actually read or produced in this session.

## Comments

- **Comment only the non-obvious _why_.** Keep comments only for invariants, constraints, or rationale the code itself cannot express. Never narrate _what_ the code does or leave phase-narrating comments (`// Phase 1: ...`, `// Step 2: ...`) in implementation or test/verification scripts; let function names and assertion messages document the step.

## Playbooks

Open a todolist whose first items are the matched playbook's steps, copied in verbatim, before any task-specific todos. Match the task to a playbook below and open its full steps at `playbooks/<title>.md`.

- <!-- **<Playbook Name>.** <When to use this playbook.> (`playbooks/<name>.md`) -->
