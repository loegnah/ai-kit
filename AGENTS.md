## Scope & Boundaries (!IMPORTANT / CRITICAL)

- **ABSOLUTE RULE: NEVER** touch, modify, create, or delete ANY files outside this repository directory (such as `~/.agents/`, user home directory, or any global paths) under ANY circumstances. All operations MUST strictly stay within the project root.
- **SKILLS DEFINITION**: In this repository, `skill` or `skills` **EXCLUSIVELY** refers to the local `./skills/` directory inside this repository—**NEVER** external, home, or global skill directories.

## Lint & Format

- When complete a task, run lint and format (`bun run check`).
  If there are any errors, fix them.

## When adding or removing skills

Skills are organized into entrypoint runners and orchestrators under `skills/`:

- `skills/loegg/`: Agent style and workflow orchestrator (`/loegg <action|task>`)
- `skills/dev-lgnh/`: Developer workflows (`/dev-lgnh <subcommand>`)
- `skills/sdlc-lgnh/`: Software development lifecycle workflows (`/sdlc-lgnh <subcommand>`)
- `skills/git-lgnh/`: Git automation and repository maintenance (`/git-lgnh <subcommand>`)
- `skills/brain-lgnh/`: Second brain capture and query workflows (`/brain-lgnh <subcommand>`)
- `skills/work-lgnh/`: Work log and reporting workflows (`/work-lgnh <subcommand>`)
- `skills/etc-lgnh/`: General developer, explanation, translation, and language learning workflows (`/etc-lgnh <subcommand>`)

To add/modify skills:

1. For `*-lgnh` runners: add/modify instruction files under `skills/<runner>/catalog/<skill-name>.md` (or `catalog/<name>/INDEX.md` for multi-skill catalogs) and register the mapping in `skills/<runner>/SKILL.md`.
2. For `loegg`: add/modify files under `skills/loegg/action/`, `mode/`, `util/`, or `playbooks/` and register the dispatch rule in `skills/loegg/SKILL.md`.
3. If the skill is exposed as a top-level `/qwe` command, update `commands/qwe.md`.
