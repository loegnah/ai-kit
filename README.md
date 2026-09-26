# Loegnah AI KIT

A skill kit for orchestrating and managing AI agent workflows.

## Skills

- **dev-lgnh**: Development and SDLC workflows (`intent` → `spec` → `plan` → `run`, code reviews, plan execution)
- **git-lgnh**: Git automation and repository maintenance (commit details, branch cleanup, conflict resolution, worktree sync)
- **brain-lgnh**: Second brain knowledge capture and retrieval (`capture`, `query`)
- **work-lgnh**: Daily and weekly work logging and progress reporting (`daily`, `weekly`)
- **etc-lgnh**: Developer utilities and code explanation workflows (`eli5`, `show-me`, `humanize`)
- **lang-lgnh**: Language translation and learning workflows (`to-eng`, `to-kor`, `to-eng-learn`, `to-kor-learn`)

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
