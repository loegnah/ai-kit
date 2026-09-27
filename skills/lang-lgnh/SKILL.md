---
name: lang-lgnh
description: "Language translation and learning workflow runner (to-eng, to-kor, to-eng-learn, to-kor-learn)."
---

# LANG-LGNH Skill Runner

Execute language translation and language learning workflows when invoked with `/lang-lgnh <keyword>` or matching translation/learning intent.

## Rules

- NEVER run `glob`, `grep`, or directory listings to explore or verify catalog files.
- Read the exact relative file path (`catalog/<filename>.md`) directly.
- **Direct Text Output Rule**: When translating direct text (not a file), output the translated sentence/paragraph with exactly one blank line above and below. NEVER add ornamentation or decoration (no blockquotes `>`, no quotes `""` or `''`, no backticks/code blocks, no prefixes) to the translated text itself for seamless copying.

## Workflow Dispatcher

Match the user's keyword or intent against the workflows below:

| Category        | Keywords / Intent                                    | Target Workflow              | Catalog File              |
| :-------------- | :--------------------------------------------------- | :--------------------------- | :------------------------ |
| **Translation** | `to-eng`, `eng`, `en`, `translate-eng`               | Translate to English         | `catalog/to-eng.md`       |
| **Translation** | `to-kor`, `kor`, `ko`, `translate-kor`               | Translate to Korean          | `catalog/to-kor.md`       |
| **Learning**    | `to-eng-learn`, `eng-learn`, `en-learn`, `learn-eng` | English Learning Translation | `catalog/to-eng-learn.md` |
| **Learning**    | `to-kor-learn`, `kor-learn`, `ko-learn`, `learn-kor` | Korean Learning Translation  | `catalog/to-kor-learn.md` |

## Execution Procedure

1. **Match Workflow**: Identify the catalog file from the table above.
2. **Read Catalog Directly**: Read `catalog/<filename>.md` directly using relative path.
3. **Execute Steps**: Follow the instructions in the catalog file sequentially.

## Fallback / No-Keyword Behavior

If invoked without a keyword (`/lang-lgnh` only) or if no workflow matches:

- Print the table above to guide available commands and ask the user to choose.
- Do not read any catalog files or inspect directories.
