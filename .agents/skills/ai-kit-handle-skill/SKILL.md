---
name: ai-kit-handle-skill
description: Use when adding, removing, or renaming a skill in the ai-kit repo. Triggers on requests like "add a skill", "create a skill", "delete a skill". Highlights repo-specific must-dos that are easy to miss.
---

# Managing skills in ai-kit

Skills are organized into entrypoint runners (`qwe-lgnh`, `sdlc-lgnh`) explicitly triggered by `/<runner> <subcommand>`:

## Layout

```
skills/<runner>/
  SKILL.md
  catalog/
    <skill-name>.md
```

Current runners:

- `skills/qwe-lgnh/`: General developer and reporting workflows (`/qwe-lgnh <subcommand>`)
- `skills/sdlc-lgnh/`: AI-Native SDLC workflows (`intent` -> `spec` -> `plan`) (`/sdlc-lgnh <subcommand>`)

## Must-do

- **Add/Modify Catalog File**: Create or edit `<skill-name>.md` under `skills/<runner>/catalog/`.
- **Update Subcommand Matcher**: Add the `/<runner> <subcommand>` mapping to `skills/<runner>/SKILL.md`.
