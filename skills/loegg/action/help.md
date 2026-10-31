# Loegg Help

Answer questions about **loegg** and draft prompts the user can copy and send.

- For a help question, do **not** start the actual task. Spawning subagents and running playbooks spends tokens, so explain the workflow and provide a prompt for the user to send.
- If the user invoked `/loegg help` with a real task request rather than a question, read `../SKILL.md` (`loegg`) and run the task.

## How loegg works

- **Entrypoint**: `../SKILL.md` (`loegg`) orchestrates execution modes, one-shot actions, utilities, playbooks, and principles.
- **Execution Modes (`mode/`)** — internal loop posture (not called directly as standalone skills):
  - **Direct Mode (Default)**: `../mode/direct-mode.md` — interactive mode where the user collaborates turn-by-turn with the agent.
  - **Agent Mode (Autonomous)**: `../mode/agent-mode.md` — autonomous mode where the agent resolves forks and drives the task to completion on its own (invoked via `/loegg agent <task>`).

## Directly Callable Actions (`action/`)

Can be invoked one-shot via `/loegg <action>` or triggered during a workflow:

- **`setup`** (`setup.md`): Configure subagent models and reasoning budgets in `~/.agents/loegg/models.md` (`/loegg setup`).
- **`help`** (`help.md`): Explain loegg usage and suggest prompts (`/loegg help`).
- **`grill`** (`grill.md`): Stress-test plans and resolve open design decisions in frontier rounds before building (`/loegg grill`).
- **`analyze`** (`analyze.md`): Ask multiple read-only subagents the exact same bug-cause or codebase analysis question in parallel, then have the main agent fact-check and synthesize a single answer (`/loegg analyze <question>`).

## Execution Utilities (`util/`)

Internal helper protocols attached to a task (not called standalone without a task):

- **`arena`** (`../util/arena.md`): Run the same prompt across multiple models in parallel (for root-cause debugging, Q&A analysis, pre-work review, design, or implementation), pick the strongest base, and graft the best parts from the rest. Triggered by adding depth/multi-angle keywords ("다각도로", "다양한 관점", "심층", "심화", "빡세게", "깊게", `arena`) to any request.
