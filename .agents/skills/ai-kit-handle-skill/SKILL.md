---
name: ai-kit-handle-skill
description: Use when adding, removing, or renaming a skill in the ai-kit repo. Triggers on requests like "add a skill", "create a skill", "delete a skill". Highlights repo-specific must-dos that are easy to miss.
---

# Managing skills in ai-kit

Follow the usual skill-authoring conventions. This skill only lists repo-specific points that must not be missed.

## Must-do

- **Update `.claude-plugin/plugin.json`**: whenever a skill is added, removed, or renamed in `skills/`, update the `skills` array accordingly.
  - This array drives the grouping (`pluginName: loegnah-ai-kit`) in `npx skills list -g`; a missing entry drops the skill into the "General" group.
