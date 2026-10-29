# Obsidian Note Naming Rules

Shared naming rules for files and notes in the second brain (`~/note/brain/`).
Obsidian runs on standard cross-platform filesystems, so note titles must remain valid across filesystems while preserving natural human expression without arbitrary style constraints.

## Core Principle: No Forced Formatting

- **NEVER force artificial prefixes** (e.g., `guide-`, `note-`, `memo-`).
- **NEVER force hyphenation, snake_case, or lowercase kebab-case**.
- **Natural language is fully allowed**: Korean, English, numbers, spaces, parentheses `()`, brackets `[]`, commas `,`, hyphens `-`, underscores `_` are all valid.
- Reflect the core topic or user-provided title directly as the file name.

## Obsidian & Filesystem Prohibited Characters

File names **MUST NOT** contain any of the following characters:

| Character | Name          | Reason                                                |
| :-------: | :------------ | :---------------------------------------------------- |
|    `*`    | Asterisk      | Filesystem reserved (wildcard)                        |
|    `"`    | Double quote  | Filesystem reserved                                   |
|    `\`    | Backslash     | Path separator                                        |
|    `/`    | Forward slash | Directory separator                                   |
|    `<`    | Less than     | Filesystem reserved / HTML tag                        |
|    `>`    | Greater than  | Filesystem reserved / HTML tag                        |
|    `:`    | Colon         | Filesystem reserved (macOS/Windows drives/streams)    |
|   `\|`    | Pipe          | Obsidian wikilink alias delimiter (`[[note\|alias]]`) |
|    `?`    | Question mark | Filesystem reserved                                   |
|    `#`    | Hash          | Obsidian heading link syntax (`[[note#heading]]`)     |
|    `^`    | Caret         | Obsidian block reference syntax (`[[note^block]]`)    |

### Additional Boundary Rules

- **No leading or trailing spaces**: `" note.md "` → `"note.md"`.
- **No leading dot**: `".note.md"` (creates hidden files on Unix).
- **Extension**: Always ends with `.md`.
- **Length**: Keep under 200 characters to prevent path length overflow on nested storage.

## Validation Checklist

1. Are prohibited characters (`* " \ / < > : | ? # ^`) absent?
2. Are leading/trailing spaces and leading dots removed?
3. Is it in natural language (Korean/English with spaces/parentheses allowed) without forced prefixes?
4. If yes, the file name is valid.
