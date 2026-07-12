---
name: ai-kit-handle-skill
description: Use when adding, removing, or renaming a skill in the ai-kit repo. Triggers on requests like "add a skill", "create a skill", "delete a skill". Highlights repo-specific must-dos that are easy to miss.
---

# Managing skills in ai-kit

Follow the usual skill-authoring conventions. This skill only lists repo-specific points that must not be missed.

## Layout

This repo is a **marketplace** with multiple plugins:

```
plugins/
  dev/skills/<skill-name>/SKILL.md
  work/skills/<skill-name>/SKILL.md
.claude-plugin/marketplace.json
```

- **work**: report-related skills (`lgnh-report-*`)
- **dev**: everything else

## Must-do

- **Place the skill under the right plugin**: `plugins/dev/skills/` or `plugins/work/skills/`.
- **Update `.claude-plugin/marketplace.json`**: when a skill is added, removed, or renamed, update that plugin entry’s `skills` array (paths like `./skills/<skill-name>`).
  - This array drives the grouping (`pluginName: dev` / `work`) in `npx skills list -g`; a missing entry drops the skill into the "General" group.
