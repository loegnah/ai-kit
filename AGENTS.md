## Lint & Format

- When complete a task, run lint and format (`bun run check`).
  If there are any errors, fix them.

## When adding or removing skills

Skills are organized into entrypoint runners:

- `skills/git-lgnh/`: Git automation and repository maintenance (`/git-lgnh <subcommand>`)
- `skills/work-lgnh/`: Work log and reporting workflows (`/work-lgnh <subcommand>`)
- `skills/qwe-lgnh/`: General developer and explanation workflows (`/qwe-lgnh <subcommand>`)
- `skills/sdlc-lgnh/`: AI-Native SDLC workflows (`/sdlc-lgnh <subcommand>`)

To add/modify skills:

1. Add/modify skill instruction files under `skills/<runner>/catalog/<skill-name>.md`.
2. Add the `/<runner> <subcommand>` mapping in `skills/<runner>/SKILL.md`.
