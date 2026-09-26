# Translate to Korean (to-kor)

Translate sentences or file contents into natural, fluent Korean based on full contextual understanding.

## Target Audience & Language

- Output translation: Natural Korean (자연스러운 한국어).
- Summary of notes/decisions: In the requester's language (e.g. Korean if requested in Korean, English if requested in English).

## Input Types

1. **Direct Text**: Sentences, paragraphs, or snippets passed directly.
2. **File Path**: Relative or absolute path to a file.

## Core Principles

- **Context-Aware & Fluent**: Avoid unnatural translationese (번역투) or stiff word-for-word substitutions. Translate naturally according to context, tone, and technical terminology.
- **In-Place File Translation**: When a file path is provided, directly modify/rewrite the file with the translated content. Preserve original file formatting, markdown syntax, and code blocks.
- **Notable Points Summary**: Conclude with a brief summary of key translation decisions (e.g. specialized terms chosen, idiomatic rephrasing).

## Execution Steps

1. **Identify Input**:
   - Check if the argument is a valid file path or inline text.
2. **Translate**:
   - **If File Path**:
     - Read the file content.
     - Translate content into natural Korean while strictly preserving markup and structure.
     - Directly overwrite the file with the translated content.
   - **If Direct Text**:
     - Translate the text into natural Korean.
     - Print the translated text clearly.
3. **Summary & Notes**:
   - At the end, provide a concise summary of notable translation points or nuances in the requester's language.
