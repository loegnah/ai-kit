---
name: ai-kit-handle-skill
description: Use when adding, removing, or renaming a skill in the ai-kit repo. Triggers on requests like "add a skill", "create a skill", "delete a skill". Highlights repo-specific must-dos that are easy to miss.
---

# Managing skills in ai-kit

Skills are managed under a single entrypoint runner (`qwe`) explicitly triggered by `/qwe <subcommand>`:

## Layout

```
skills/qwe/
  SKILL.md
  catalog/
    <skill-name>.md
```

## Must-do

- **Add/Modify Catalog File**: Create or edit `<skill-name>.md` under `skills/qwe/catalog/`.
- **Update Subcommand Matcher**: Add the `/qwe <subcommand>` mapping to `skills/qwe/SKILL.md`.
