# Loegnah AI KIT

A skill kit for orchestrating and managing AI agent workflows.

## Skills

- **dev-lgnh**: Developer workflows (`implement`, `simplify`, `ts-refactor`, `no-edit`, code reviews, plan execution)
- **sdlc-lgnh**: AI-native SDLC artifact workflows (`intent` → `spec` → `plan` → `run`)
- **git-lgnh**: Git automation and repository maintenance (commit details, branch cleanup, conflict resolution, worktree sync)
- **brain-lgnh**: Second brain knowledge capture and retrieval (`capture`, `capture-daily`, `query`)
- **work-lgnh**: Daily and weekly work logging and progress reporting (`daily`, `weekly`)
- **etc-lgnh**: Developer utilities, code explanation, translation, and language learning workflows (`eli5`, `show-me`, `humanize`, `meta-prompt`, `to-eng`, `to-kor`, `to-eng-learn`, `to-kor-learn`). Translation modes share `skills/etc-lgnh/catalog/translate.md`: ordinary modes output only the translation; learning modes add 1–3 key points. Files are modified only when saving or applying the translation is explicitly requested.

## External Sources & Credits

This kit integrates and adapts skills from the following open-source projects:

- **[Superpowers](https://github.com/obra/superpowers)** (`@obra`)
  - AI-native software development methodology (TDD, systematic debugging, brainstorming, plan execution, subagent-driven development)
  - Integrated into `skills/dev-lgnh/catalog/superpowers/`
- **[Matt Pocock's Skills](https://github.com/mattpocock/skills)** (`@mattpocock`)
  - Engineering & productivity workflows (`code-review`, `grill`, `handoff`)
  - Integrated into `skills/dev-lgnh/catalog/matt/`
- **[Im Not AI](https://github.com/epoko77-ai/im-not-ai)** (`@epoko77-ai`)
  - Korean AI text detection, humanization rules, taxonomy, and verification scripts (`humanize-korean`)
  - Integrated into `skills/etc-lgnh/catalog/humanize-korean.md`

Upstream mappings and synchronization are maintained in [`skills/sources.json`](./skills/sources.json).
