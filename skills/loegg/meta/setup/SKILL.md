---
name: loegg-setup
description: Configure subagent models and reasoning budgets for loegg skills.
disable-model-invocation: true
---

# Setup Loegg

Configure which models and reasoning budgets **loegg** skills use when spawning subagents.

## Step 1. Choose reasoning budget

Ask the user for their preferred reasoning budget using the structured-question tool:

- `unlimited`: Use `max` reasoning effort across roles.
- `large` (Recommended): Default `xhigh` reasoning effort.
- `medium`: Step down one level (`high`).
- `small`: Step down two levels (`medium`).

## Step 2. Configure per-role subagent models

Present the role table and ask whether to accept defaults or customize specific roles:

| Role                   | Default Model                   | Notes                                                          |
| :--------------------- | :------------------------------ | :------------------------------------------------------------- |
| `arena runners`        | <!-- `<model-a>, <model-b>` --> | Multi-model panel (2+ models run identical prompt in parallel) |
| <!-- `<role-name>` --> | <!-- `<default-model>` -->      | <!-- `<single or multi-model panel>` -->                       |

## Step 3. Write configuration

Write the chosen configuration to the target rule/config file so **loegg** skills can read it at task start:

```markdown
# loegg subagent models

- arena runners: <!-- <model-a>, <model-b> -->
- <!-- <role-name>: <model-slug> -->
```
