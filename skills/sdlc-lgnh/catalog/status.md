# Lifecycle Status Overview

Scan the `docs/story/` directory to inspect artifact statuses across all SDLC tasks and determine the next action.

## Language

Respond in the same language the user is using (e.g., Korean if the user communicates in Korean). Match the user's language for status tables and summaries.

## Arguments

- (None)

## Execution Steps

1. **Scan `docs/story/` Directory**
   - Check if `docs/story/` exists. If not, report that no story artifacts have been created yet and recommend `/sdlc-lgnh intent`.
   - List all task subdirectories under `docs/story/`.

2. **Inspect Artifact Existence & Status**
   - For each directory:
     - Check for `intent.md`, `spec.md`, `plan.md`.
     - Read the status line (`상태: ...`) from each existing file.
     - Determine current lifecycle stage:
       - `intent.md` only: Stage 1 (Next: `/sdlc-lgnh spec <dir>`)
       - `intent.md` + `spec.md`: Stage 2 (Next: `/sdlc-lgnh plan <dir>`)
       - `intent.md` + `spec.md` + `plan.md`: Stage 3 (Next: `/sdlc-lgnh run <dir>` or `/sdlc-lgnh verify <dir>`)

3. **Render Status Summary**
   - Display a clean summary table:
     ```markdown
     | Directory | Title | intent.md | spec.md | plan.md | Recommended Next Action |
     | :-------- | :---- | :-------- | :------ | :------ | :---------------------- |
     ```

| docs/story/YYYY-MM-DD-slug | Feature Title | approved | approved | planning | `/sdlc-lgnh plan docs/story/...` |

```

- Highlight the most recent or active directory and suggest the immediate command to execute.
```
