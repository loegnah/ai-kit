## When adding or removing skills

When adding or removing a skill in `skills/`, also update the `skills` array in `.claude-plugin/plugin.json`.
This array drives the grouping (`pluginName`) in `npx skills list -g`; if omitted, the skill falls into the "General" group.
