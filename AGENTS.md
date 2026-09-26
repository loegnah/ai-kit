## Scope & Boundaries (!IMPORTANT / CRITICAL)

- **ABSOLUTE RULE: NEVER** touch, modify, create, or delete ANY files outside this repository directory (such as `~/.agents/`, user home directory, or any global paths) under ANY circumstances. All operations MUST strictly stay within the project root.
- **SKILLS DEFINITION**: In this repository, `skill` or `skills` **EXCLUSIVELY** refers to the local `./skills/` directory inside this repository—**NEVER** external, home, or global skill directories.

## Lint & Format

- When complete a task, run lint and format (`bun run check`).
  If there are any errors, fix them.

## When adding or removing skills

Skills are organized into entrypoint runners:

- `skills/git-lgnh/`: Git automation and repository maintenance (`/git-lgnh <subcommand>`)
- `skills/work-lgnh/`: Work log and reporting workflows (`/work-lgnh <subcommand>`)
- `skills/etc-lgnh/`: General developer and explanation workflows (`/etc-lgnh <subcommand>`)
- `skills/dev-lgnh/`: Development and SDLC workflows (`/dev-lgnh <subcommand>`)
- `skills/brain-lgnh/`: Second brain capture and query workflows (`/brain-lgnh <subcommand>`)
- `skills/lang-lgnh/`: Language translation and learning workflows (`/lang-lgnh <subcommand>`)

To add/modify skills:

1. Add/modify skill instruction files under `skills/<runner>/catalog/<skill-name>.md`.
2. Add the `/<runner> <subcommand>` mapping in `skills/<runner>/SKILL.md`.
