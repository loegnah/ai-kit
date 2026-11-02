# Loegnah AI KIT

A skill kit for orchestrating and managing AI agent workflows.

## Skills

- **loegg**: Agent style and workflow orchestrator (`setup`, `help`, `grill`, `analyze`, `review`, `doc`, `direct-mode`, `agent-mode`, `arena`)
- **dev-lgnh**: Developer workflows (`implement`, `simplify`, `simplify-fast`, `refactor`, `no-edit`, `skill-sync`, `superpowers`, `mattpocock`, `pstack`)
- **sdlc-lgnh**: AI-native SDLC artifact workflows (`intent` → `spec` → `plan` → `run`)
- **git-lgnh**: Git automation and repository maintenance (`commit`, `commit-fast`, `branch`, `branch-name`, `conflict`, `rebase`)
- **brain-lgnh**: Second brain knowledge capture and retrieval (`capture`, `capture-daily`, `capture-guide`, `query`, `upsert`)
- **work-lgnh**: Daily and weekly work logging and progress reporting (`daily`, `weekly`)
- **etc-lgnh**: Developer utilities, code explanation, translation, and language learning workflows (`eli5`, `show-me`, `humanize`, `meta-prompt`, `to-eng`, `to-kor`, `to-eng-learn`, `to-kor-learn`). Translation modes share `skills/etc-lgnh/catalog/translate.md`: ordinary modes output only the translation; learning modes add 1–3 key points. Files are modified only when saving or applying the translation is explicitly requested.

## External Sources & Credits

This kit integrates and adapts skills from the following open-source projects:

- **[Superpowers](https://github.com/obra/superpowers)** (`@obra`)
  - AI-native software development methodology (TDD, systematic debugging, brainstorming, plan execution, subagent-driven development)
  - Integrated into `skills/dev-lgnh/catalog/superpowers/`
- **[Matt Pocock's Skills](https://github.com/mattpocock/skills)** (`@mattpocock`)
  - Engineering & productivity workflows (`grill-me`, `code-review`, `claude-handoff`, `write-a-prd`, `tdd`, etc.)
  - Integrated into `skills/dev-lgnh/catalog/mattpocock/`
- **[Pstack](https://github.com/backnotprop/pstack)** (`@backnotprop`)
  - Composable engineering playbooks, multi-model panels (`architect`, `arena`, `interrogate`), and engineering principles
  - Integrated into `skills/dev-lgnh/catalog/pstack/`
- **[Im Not AI](https://github.com/epoko77-ai/im-not-ai)** (`@epoko77-ai`)
  - Korean AI text detection, humanization rules, taxonomy, and verification scripts (`humanize-korean`)
  - Integrated into `skills/etc-lgnh/catalog/humanize-korean.md`

Upstream mappings and synchronization are tracked in [`skills-lock.json`](./skills-lock.json) via `.agents/skills/import-external-skills`.
