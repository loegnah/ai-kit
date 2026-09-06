---
name: ai-kit-handle-skill
description: Use when adding, removing, or renaming a skill in the ai-kit repo. Triggers on requests like "add a skill", "create a skill", "delete a skill". Highlights repo-specific must-dos that are easy to miss.
---

# Managing skills in ai-kit

Skills are organized into entrypoint runners (`git-lgnh`, `work-lgnh`, `qwe-lgnh`, `sdlc-lgnh`) explicitly triggered by `/<runner> <subcommand>`:

## Layout

```
skills/<runner>/
  SKILL.md
  catalog/
    <skill-name>.md
```

Current runners:

- `skills/git-lgnh/`: Git automation and repository maintenance (`/git-lgnh <subcommand>`)
- `skills/work-lgnh/`: Work log and reporting workflows (`/work-lgnh <subcommand>`)
- `skills/qwe-lgnh/`: General developer and explanation workflows (`/qwe-lgnh <subcommand>`)
- `skills/sdlc-lgnh/`: AI-Native SDLC workflows (`intent` -> `spec` -> `plan`) (`/sdlc-lgnh <subcommand>`)

## Must-do

- **Add/Modify Catalog File**: Create or edit `<skill-name>.md` under `skills/<runner>/catalog/`.
- **Update Subcommand Matcher**: Add the `/<runner> <subcommand>` mapping to `skills/<runner>/SKILL.md`.
