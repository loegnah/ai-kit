# Korean Learning Translation (to-kor-learn)

Translate into Korean with educational insights focusing on Korean language learning, natural collocations, particles (조사), and nuance.

## Target Audience & Language

- Explanations and guidance: In the requester's language (e.g. English or Korean).
- Translations and examples: Natural Korean.

## Input Types

1. **Direct Text**: Sentences, paragraphs, or text to translate and learn from.
2. **File Path**: Relative or absolute path to a file.

## Core Principles

- **NO Direct In-Place File Edits**: NEVER modify the file immediately when a file path is provided.
  - Present the proposed changes (Before vs. After) and the reasoning/learning points first.
  - Await user review or confirmation before making any edits.
- **Focus on Key Learning Points**: Do NOT explain trivial or obvious details. Focus strictly on high-impact learning points:
  - Natural Korean phrasing vs. awkward translationese (번역투 교정).
  - Proper particle usage (조사: 은/는, 이/가, 을/를 등) and contextual speech styles (존댓말/반말, 문체).
  - Key vocabulary nuances and idioms.
- **Concise & Practical**: Deliver high-signal explanations highlighting only what matters.

## Execution Steps

1. **Analyze Input**:
   - Check if input is a file path or inline text.
2. **Formulate Translation & Learning Points**:
   - Determine natural Korean translation.
   - Extract 1–3 key learning points (nuance, particle selection, avoiding translationese).
3. **Present to User**:
   - **If File Path**:
     - Show the planned changes with a Before & After preview.
     - Explain _why_ changes are made from a learning perspective (key points only).
     - Ask the user if they want to proceed with applying the changes to the file.
   - **If Direct Text**:
     - Show the natural Korean translation.
     - Present the key learning points clearly below the translation.
