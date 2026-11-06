# Translation & Language Learning

Translate direct text or file contents naturally, preserving meaning, tone, and domain terminology.

## Modes

| Keywords                                             | Target language | Output                                    |
| :--------------------------------------------------- | :-------------- | :---------------------------------------- |
| `to-eng`, `eng`, `en`, `translate-eng`               | English         | Translation only                          |
| `to-kor`, `kor`, `ko`, `translate-kor`               | Korean          | Translation only                          |
| `to-eng-learn`, `eng-learn`, `en-learn`, `learn-eng` | English         | Translation + 1–3 English learning points |
| `to-kor-learn`, `kor-learn`, `ko-learn`, `learn-kor` | Korean          | Translation + 1–3 Korean learning points  |

## Procedure

1. Determine the mode and whether the input is direct text or a file path. Read file contents before translating.
2. Translate idiomatically, avoiding literal translation and unnatural phrasing.
3. For direct text, output the translation without added quotes, blockquotes, code fences, labels, or decoration. Separate it from any learning notes with one blank line; preserve meaningful formatting in the source.
4. For files:
   - Preserve markup, document structure, code blocks, JSON keys, placeholders, and link destinations. Translate human-readable prose and values, including titles and descriptions in frontmatter, without changing its keys or syntax.
   - Do not overwrite the file unless the user explicitly requests saving or applying the translation. Otherwise, present the translated content; in learning mode, show a Before & After preview with learning points.
   - When saving is explicitly requested, apply the translation and briefly report the changed file. Do not ask for redundant confirmation.
5. In ordinary translation mode, omit translation commentary. In learning mode, explain only 1–3 high-impact points in the requester's language:
   - **English**: idiomatic expressions, common Konglish mistakes, vocabulary nuances, or sentence structure.
   - **Korean**: natural phrasing, particles, speech register, vocabulary nuances, or idioms.
