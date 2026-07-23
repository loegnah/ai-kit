---
name: lgnh
description: "Run user-driven lgnh workflows explicitly invoked via `/lgnh <keyword>`."
---

# LGNH Skill Runner

Execute custom developer and work reporting workflows ONLY when explicitly invoked with `/lgnh <keyword>`.

## Keyword Subcommand Matcher

When the user inputs `/lgnh <keyword>`, match `<keyword>` against the keywords below to execute the corresponding catalog workflow:

| Keywords                                                     | Target Workflow      | Catalog File                      |
| :----------------------------------------------------------- | :------------------- | :-------------------------------- |
| `commit`, `commit-detail`, `ci`                              | Commit Detail        | `catalog/commit-detail.md`        |
| `branch`, `clear-gone`, `gone`, `branch-clean`               | Branch Clear Gone    | `catalog/branch-clear-gone.md`    |
| `simplify`, `code-simplify`, `clean-code`, `refactor-simple` | Code Simplify        | `catalog/code-simplify.md`        |
| `rebase`, `rebase-worktrees`, `sync-worktrees`               | Rebase Worktrees     | `catalog/rebase-worktrees.md`     |
| `conflict`, `resolve`, `resolve-conflict`, `fix-conflict`    | Resolve Conflict     | `catalog/resolve-conflict.md`     |
| `daily`, `worklog`, `report-daily`, `daily-log`              | Daily Worklog Report | `catalog/report-daily-worklog.md` |
| `weekly`, `report-weekly`, `weekly-report`                   | Weekly Work Report   | `catalog/report-weekly.md`        |

## Execution Procedure

1. **Locate Skill Directory**:
   - Find the resolved installation directory of this `skills/lgnh/SKILL.md` file.
2. **Read Catalog Instruction**:
   - Read `<lgnh_skill_dir>/catalog/<filename>.md` matching the `<keyword>` using `read`.
3. **Execute Steps**:
   - Follow the instructions in the catalog file sequentially.
