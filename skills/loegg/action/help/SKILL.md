# Loegg Help

Answer questions about **loegg** and draft prompts the user can copy and send.

- For a help question, do **not** start the actual task. Spawning subagents and running playbooks spends tokens, so explain the workflow and provide a prompt for the user to send.
- If the user invoked `/loegg help` with a real task request rather than a question, read `../../SKILL.md` (`loegg`) and run the task.
- When the user asks how to phrase a request or which workflow fits, recommend the matching action or playbook and adapt a prompt from `references/recipes.md` to their task.

## How loegg works

- **Entrypoint**: `../../SKILL.md` (`loegg`) orchestrates execution modes, one-shot actions, utilities, playbooks, and principles.
- **Execution Modes (`mode/`)** — internal loop posture (not called directly as standalone skills):
  - **Direct Mode (Default)**: `../../mode/direct-mode/SKILL.md` — interactive mode where the user collaborates turn-by-turn with the agent.
  - **Agent Mode (Autonomous)**: `../../mode/agent-mode/SKILL.md` — autonomous mode where the agent resolves forks and drives the task to completion on its own (invoked via `/loegg agent <task>`).
- **Completion order**: File-changing workflows finish with implementation -> verification -> read-only review -> final report.

## Directly Callable Actions (`action/`)

Can be invoked one-shot via `/loegg <action>` or triggered during a workflow:

- **`setup`** (`setup/SKILL.md`): Configure each subagent model's provider and reasoning budget in `~/.agents/loegg/models.md` (`/loegg setup`). Recommendations show model names only; saved entries use full identifiers such as `google-antigravity/gemini-4-argon:medium`. Providers can differ per entry.
- **`help`** (`help/SKILL.md`): Explain loegg usage and suggest prompts (`/loegg help`).
- **`grill`** (`grill/SKILL.md`): Stress-test plans and resolve open design decisions in frontier rounds before building (`/loegg grill`).
- **`architect`** (`architect/SKILL.md`): Sketch caller usage, types, signatures, and module boundaries before writing implementation code, comparing candidate shapes via `arena` (`/loegg architect [target]`).
- **`analyze`** (`analyze/SKILL.md`): Ask multiple read-only subagents the exact same bug-cause or codebase analysis question in parallel, then have the main agent fact-check and synthesize a single answer (`/loegg analyze <question>`).
- **`how`** (`how/SKILL.md`): Explain how code or a subsystem works (`/loegg how <question>`).
- **`why`** (`why/SKILL.md`): Investigate historical motivation and design rationale across git, PRs, issues, docs, and MCPs with strict confidence tiers (`/loegg why <question>`).
- **`teach`** (`teach/SKILL.md`): Explain how and why a subsystem works (`/loegg teach <topic>`).
- **`show-me`** (`show-me/SKILL.md`): Visualize logic, call trees, component/file trees, Mermaid flows, or structural diffs with minimal prose (`/loegg show-me [topic]`).
- **`blast-radius`** (`blast-radius/SKILL.md`): Investigate downstream breakage (`/loegg blast-radius [target]`).
- **`interrogate`** (`interrogate/SKILL.md`): Adversarial review (`/loegg interrogate [target]`).
- **`benchmark-checklist`** (`benchmark-checklist/SKILL.md`): Vet performance measurements (`/loegg benchmark-checklist`).
- **`recall`** (`recall/SKILL.md`): Reconstruct recent working context, or pick up a specific prior session's in-flight work (`/loegg recall [topic]`).
- **`reflect`** (`reflect/SKILL.md`): Review session learnings (`/loegg reflect`).
- **`review`** (`review/SKILL.md`): Review current staged, unstaged, and non-ignored new files without editing (`/loegg review`). For independent parallel reviews, use `/loegg review 깊게`; arena selects `review runners`, not `arena runners`. An explicit file or comparison range overrides the default scope.
- **Review models**: Configure `review runners` with `/loegg setup` independently of other roles. Ordinary review stays in the main agent; deep review uses configured models or harness role defaults when unavailable or restricted.
- **`doc`** (`doc/SKILL.md`): Distill reusable session knowledge into `docs/design/`, `docs/rule/`, `docs/guide/`, `docs/note/`, `docs/story/`, or `docs/GLOSSARY.md` (`/loegg doc [category]`; also accepts `docs`).

## Execution Utilities (`util/`)

Internal helper protocols attached to a task (not called standalone without a task):

- **`arena`** (`../../util/arena/SKILL.md`): Run the same prompt across multiple models in parallel (for root-cause debugging, Q&A analysis, pre-work review, design, or implementation), pick the strongest base, and graft the best parts from the rest. Triggered by adding depth/multi-angle keywords ("다각도로", "다양한 관점", "심층", "심화", "빡세게", "깊게", `arena`) to any request.
- **`decision-log`** (`../../util/decision-log/SKILL.md`): Append-only TSV decision trail for long, autonomous, or multi-phase work, audited against the transcript and reviewed by a different model family before hand-back. Applied automatically in Agent Mode and by playbooks that name it.

## Playbooks (`playbooks/`)

Full task workflows selected automatically during `/loegg <task>` or `/loegg agent <task>`:

- **`investigation`** (`../../playbooks/investigation.md`): Read-only question answered with cited evidence through `how` / `why` / `analyze`, with no code change.

- **`feature`** (`../../playbooks/feature.md`): New or changed behavior built from a clear domain data shape.
- **`bug-fix`** (`../../playbooks/bug-fix.md`): Reproduce, trace root cause with runtime evidence, and ship the minimal fix.
- **`refactoring`** (`../../playbooks/refactoring.md`): Behavior-preserving structural improvement held against a pinned contract.
- **`perf-issue`** (`../../playbooks/perf-issue.md`): One-off performance bottleneck trace and fix against a vetted baseline.
- **`prototype`** (`../../playbooks/prototype.md`): Throwaway sketch to settle a visual or empirical fork before building.
- **`hillclimb`** (`../../playbooks/hillclimb.md`): Iterative keep-or-revert optimization loop against a frozen metric harness.
- **`multi-phase-plan`** (`../../playbooks/multi-phase-plan.md`): Decompose large cross-cutting work into verifiable phases.
- **`figure-it-out`** (`../../playbooks/figure-it-out.md`): Fallback when no playbook fits, or for large cross-cutting work: design a bespoke auditable workflow, then run it.
- **`pause-safely`** (`../../playbooks/pause-safely.md`): Stop cleanly with a `wip:` commit and a resume note; resume via `recall`.
