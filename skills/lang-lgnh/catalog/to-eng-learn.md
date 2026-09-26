# English Learning Translation (to-eng-learn)

Translate into English with educational insights focusing on practical English learning, nuances, and key expressions.

## Target Audience & Language

- Explanations and guidance: In the requester's language (e.g. Korean).
- Translations and examples: Natural English.

## Input Types

1. **Direct Text**: Sentences, paragraphs, or text to translate and learn from.
2. **File Path**: Relative or absolute path to a file.

## Core Principles

- **NO Direct In-Place File Edits**: NEVER modify the file immediately when a file path is provided.
  - Present the proposed changes (Before vs. After) and the reasoning/learning points first.
  - Await user review or confirmation before making any edits.
- **Focus on Key Learning Points**: Do NOT explain every minor grammar detail or trivia. Focus strictly on critical learning points:
  - Idiomatic native expressions vs. common non-native mistakes (Konglish, awkward phrasing).
  - Subtle nuance differences between candidate words/expressions.
  - Sentence structure improvements.
- **Concise & Practical**: Keep explanations punchy, high-signal, and easy to absorb.

## Execution Steps

1. **Analyze Input**:
   - Check if input is a file path or inline text.
2. **Formulate Translation & Learning Points**:
   - Determine natural English translation.
   - Extract 1–3 key learning points (essential vocabulary choice, nuance distinction, idiomatic pattern).
3. **Present to User**:
   - **If File Path**:
     - Show the planned changes with a Before & After preview.
     - Explain _why_ changes are made from a learning perspective (key points only).
     - Ask the user if they want to proceed with applying the changes to the file.
   - **If Direct Text**:
     - Show the natural English translation.
     - Present the key learning points clearly below the translation.
