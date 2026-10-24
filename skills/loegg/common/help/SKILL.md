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

- **Entrypoint**: `../../SKILL.md` (`loegg`) orchestrates playbooks, workflow skills, and principles.
- **Setup**: `../setup/SKILL.md` (`common/setup/SKILL.md`) configures per-role subagent models and reasoning budgets (invoked via `/loegg setup`).

## Skill Catalog

### Common (`common/`)

- **`setup`** (`../setup/SKILL.md`): Configure subagent models and reasoning budgets.
- **`help`** (`SKILL.md`): Explain loegg usage and suggest prompts.

### Workflows & Playbooks

- <!-- Add categories and skills here as they are created. -->
