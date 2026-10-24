---
name: loegg-help
description: Explain loegg skills, recommend which skill or playbook fits a task, and draft ready-to-send prompts.
disable-model-invocation: true
---

# Loegg Help

Answer questions about **loegg** and draft prompts the user can copy and send.

- For a help question, do **not** start the actual task. Spawning subagents and running playbooks spends tokens, so explain the workflow and provide a prompt for the user to send.
- If the user invoked `/loegg-help` with a real task request rather than a question, read `../../SKILL.md` (`loegg`) and run the task.

## How loegg works

- **Entrypoint**: `../../SKILL.md` (`loegg`) orchestrates execution modes, playbooks, workflow skills, and principles.
- **Execution Modes**:
  - **Direct Mode (Default)**: `../../mode/direct-mode.md` — primary agent executes directly without subagent token overhead.
  - **Agent Mode (Opt-in)**: `../../mode/agent-mode.md` — multi-agent delegation and multi-model panels (invoked via `/loegg agent`).
- **Setup**: `../setup/SKILL.md` (`meta/setup/SKILL.md`) configures per-role subagent models and reasoning budgets for Agent Mode (invoked via `/loegg setup`).

## Skill Catalog

### Meta (`meta/`)

- **`setup`** (`../setup/SKILL.md`): Configure subagent models and reasoning budgets.
- **`help`** (`SKILL.md`): Explain loegg usage and suggest prompts.

### Discover (`discover/`)

- **`grill`** (`../../discover/grill/SKILL.md`): Stress-test plans and resolve open design decisions in frontier rounds before building.

### Craft (`craft/`)

- <!-- Skills for building, running, and competing implementations (`tdd`, `arena`, `swarm`, etc.). -->

### Critic (`critic/`)

- <!-- Skills for adversarial review, verification, and impact analysis (`interrogate`, `blast-radius`, etc.). -->
