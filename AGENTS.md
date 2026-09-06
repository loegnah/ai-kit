## Lint & Format

- When complete a task, run lint and format (`bun run check`).
  If there are any errors, fix them.

## When adding or removing skills

Skills are organized into entrypoint runners:

- `skills/qwe/`: General developer and reporting workflows (`/qwe <subcommand>`)
- `skills/asd/`: AI-Native SDLC workflows (`/asd <subcommand>`)

To add/modify skills:

1. Add/modify skill instruction files under `skills/<runner>/catalog/<skill-name>.md`.
2. Add the `/<runner> <subcommand>` mapping in `skills/<runner>/SKILL.md`.
