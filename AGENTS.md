## Lint & Format

- When complete a task, run lint and format (`bun run check`).
  If there are any errors, fix them.

## When adding or removing skills

Skills live under `plugins/<plugin>/skills/`.

- **work**: report-related skills (`lgnh-report-*`)
- **dev**: everything else

When adding, removing, or renaming a skill:

1. Put it under the correct plugin’s `skills/` directory.
2. Update that plugin’s `skills` array entry in `.claude-plugin/marketplace.json`.

This array drives the grouping (`pluginName`) in `npx skills list -g`; if omitted, the skill falls into the "General" group.
