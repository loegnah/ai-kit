---
name: etc-lgnh
description: "General developer, code explanation, translation, and language learning workflow runner."
disable-model-invocation: false
---

# ETC-LGNH Skill Runner

Execute custom developer, code explanation, translation, and language learning workflows when invoked with `/etc-lgnh <keyword>` or matching workflow intent.

## Rules

- NEVER run `glob`, `grep`, or directory listings to explore or verify catalog files.
- Read the exact relative file path (`catalog/<filename>.md`) directly.

## Workflow Dispatcher

Match the user's keyword or intent against the workflows below:

| Keywords / Intent                                    | Target Workflow     | Catalog File                 |
| :--------------------------------------------------- | :------------------ | :--------------------------- |
| `eli5`, `explain-5`, `explain`                       | ELI5 Explainer      | `catalog/eli5.md`            |
| `show-me`, `show`                                    | Show Me             | `catalog/show-me.md`         |
| `humanize`, `humanize-korean`, `de-ai`, `im-not-ai`  | Humanize Korean     | `catalog/humanize-korean.md` |
| `meta-prompt`, `prompt`, `prompt-gen`                | Meta-Prompt         | `catalog/meta-prompt.md`     |
| `to-eng`, `eng`, `en`, `translate-eng`               | English Translation | `catalog/translate.md`       |
| `to-kor`, `kor`, `ko`, `translate-kor`               | Korean Translation  | `catalog/translate.md`       |
| `to-eng-learn`, `eng-learn`, `en-learn`, `learn-eng` | English Learning    | `catalog/translate.md`       |
| `to-kor-learn`, `kor-learn`, `ko-learn`, `learn-kor` | Korean Learning     | `catalog/translate.md`       |

## Execution Procedure

1. **Match Workflow**: Identify the catalog file from the table above.
2. **Read Catalog Directly**: Read `catalog/<filename>.md` directly using relative path.
3. **Execute Steps**: Follow the instructions in the catalog file sequentially.

## Fallback / No-Keyword Behavior

If invoked without a keyword (`/etc-lgnh` only) or if no workflow matches:

- Print the table above to guide available commands and ask the user to choose.
- Do not read any catalog files or inspect directories.
