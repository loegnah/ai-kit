# Translate to English (to-eng)

Translate sentences or file contents into natural, idiomatic English based on full contextual understanding.

## Target Audience & Language

- Output translation: Natural English.
- Summary of notes/decisions: In the requester's language (e.g. Korean if requested in Korean, English if requested in English).

## Input Types

1. **Direct Text**: Sentences, paragraphs, or clipboard text passed directly.
2. **File Path**: Relative or absolute path to a file (e.g. `docs/intro.md`, `locales/ko.json`).

## Core Principles

- **Context-Aware & Idiomatic**: Avoid mechanical word-for-word translation. Grasp intent, tone, and domain context to produce natural, fluent English.
- **In-Place File Translation**: When a file path is provided, directly modify/rewrite the file with the translated content. Preserve original formatting, frontmatter, code blocks, and markdown structure.
- **Notable Points Summary**: Conclude with a brief summary of key translation decisions (e.g. chosen terminology, nuanced phrasing, intentional paraphrasing).
- **Clean Copying for Direct Text**: When translating direct text, isolate the translated text with exactly one blank line above and below. Strictly avoid any quotation marks, blockquotes, code blocks, or decoration on the translation.

## Execution Steps

1. **Identify Input**:
   - Check if the argument is a valid file path or inline text.
2. **Translate**:
   - **If File Path**:
     - Read the file content.
     - Translate content into natural English while strictly preserving structure/markup.
     - Directly overwrite the file with the translated content.
   - **If Direct Text**:
     - Translate the text into natural English.
     - Print the translated text with exactly one blank line above and below.
     - Keep the translated sentence completely undecorated (NO blockquotes `>`, NO quotation marks `""` or `''`, NO backticks, NO styling) for easy copying.
3. **Summary & Notes**:
   - At the end, provide a concise summary of notable translation points or nuances in the requester's language.

## Direct Text Output Example

```text

This is the translated sentence ready for copying.

### 주요 번역 포인트
- Terminology or nuance note...
```
