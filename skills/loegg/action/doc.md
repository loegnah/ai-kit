# Doc (`design` / `rule` / `guide` / `note` / `story` / `glossary`)

Distill reusable knowledge from the current session and save it as a concise Markdown document under the appropriate `docs/` location (`docs/design/`, `docs/rule/`, `docs/guide/`, `docs/note/`, `docs/story/`, or `docs/GLOSSARY.md`). Run standalone with `/loegg doc [category]`, or when asked to document takeaways during a workflow.

## Language

Write the document in the user's language (default Korean if the conversation is in Korean). Skill instructions are in English.

## Arguments

- `category / topic` (optional):
  - If invoked with a specific category keyword (`design-doc`, `rule`, `guide`, `note`, `tip`, `story`, `glossary`), route directly to that category unless the content clearly belongs elsewhere.
  - If invoked generally (`doc`, `docs`) or without a category, classify the session takeaway into one of the six targets below (or split into separate targets if multiple distinct categories apply).

## Directory Taxonomy & Routing Rules

### 1. Respect Project Guidelines, `README.md`, and Existing `docs/` Structure First

- **Project Instructions & Docs Policy**: Check already-loaded agent instructions (`AGENTS.md`, `CLAUDE.md`, etc.) and root `README.md` (or `docs/README.md`) to see if the project specifies where documentation, rules, or architecture notes belong, or requires updating an index/table of contents.
- **Existing Directory / File Conventions**: Inspect the project's existing `docs/` tree (or guideline-specified path). If the project already uses an established directory or file (e.g., `docs/architecture/` instead of `docs/design/`, `docs/rules/` instead of `docs/rule/`, `docs/guides/` instead of `docs/guide/`, `docs/notes/` or `docs/tips/` instead of `docs/note/`, `docs/stories/`, `docs/log/` or `docs/journal/` instead of `docs/story/`, or root `GLOSSARY.md` / `docs/glossary.md`), use that existing path and follow its naming/formatting conventions.

### 2. Default Target Structure

When no equivalent path exists, route by content nature into these targets under `docs/`:

| Target Path        | Type        | Criterion ("One-Line Rule")            | What Belongs Here                                                                                                            |
| :----------------- | :---------- | :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `docs/design/`     | Directory   | **"How it is structured & why"**       | System/module architecture, data & state flow, schemas, component boundaries, design rationale / ADRs.                       |
| `docs/rule/`       | Directory   | **"What MUST or NEVER be done"**       | Coding conventions, strict invariants, Do / Don't constraints, naming/pattern enforcement rules.                             |
| `docs/guide/`      | Directory   | **"How to set up, run, or do it"**     | Step-by-step how-to guides, local/dev setup, deployment/migration procedures, operational workflows.                         |
| `docs/note/`       | Directory   | **"What we learned & watch outs"**     | Timeless tips, troubleshooting conclusions, gotchas/caveats/pitfalls, investigation findings. Conclusion only; kept current. |
| `docs/story/`      | Directory   | **"What we tried & how it went"**      | Dated record of an attempt/experiment: goal, what was done, result (including failures), takeaway. Append-only.              |
| `docs/GLOSSARY.md` | Single File | **"What domain terms & symbols mean"** | Ubiquitous language, domain terms, abbreviations, business-term <-> code-symbol mappings, disambiguations.                   |

### 3. Update vs. Create

- **Directory Targets (`design`, `rule`, `guide`, `note`)**: If an existing file in the target folder already covers the same topic, update/append to that file rather than creating a duplicate; otherwise create `<target-dir>/<kebab-case-slug>.md` (or match the directory's existing filename style).
- **Story Target (`docs/story/`)**: Always create a new file `docs/story/YYMMDD-<title>.md`; `YYMMDD` is today's date from the environment (e.g. `date +%y%m%d`), never guessed, and `<title>` is a short kebab-case title (Korean allowed). A follow-up attempt on the same topic is a new file that links the earlier story; never rewrite an existing story except to fix typos or add a link to a promoted note/rule.
- **Single-File Target (`docs/GLOSSARY.md`)**: Always upsert into the single glossary file—create `docs/GLOSSARY.md` if absent, or add/update entries in place (sorted logically by domain group or alphabetically) without duplicating existing terms.
- **`note` vs `story`**: A `note` states a conclusion that stays true and is edited in place; a `story` records what happened at a point in time and is never edited. If a story yields a reusable lesson, also write it as a `note` or `rule` and link it from the story.

## Category-Specific Document Templates

Keep all documents terse, concrete, and free of session trial-and-error chatter. Include exact file paths, commands, or code snippets.

### A. `docs/design/` Template

- `# <Title>`
- **Overview / Context**: Purpose and scope of the module or system (1–3 lines).
- **Structure & Flow**: Component responsibilities, data/control flow (use a Mermaid diagram when helpful).
- **Key Decisions & Tradeoffs**: Why this design was chosen over alternatives.
- **Related Files**: Key entrypoints and file paths.

### B. `docs/rule/` Template

- `# <Title>`
- **Scope**: Where and when this rule applies.
- **Rules (`MUST` / `NEVER`)**: Direct imperative statements of required and forbidden patterns.
- **Examples**: Minimal `Good` vs. `Bad` code or command examples.
- **Rationale**: Brief reason why violating this rule causes bugs or maintenance debt (1–2 lines).

### C. `docs/guide/` Template

- `# <Title>`
- **Goal / When to Use**: What this guide accomplishes and when to follow it (1–2 lines).
- **Prerequisites** (if applicable): Required tools, env vars, permissions, or prior state.
- **Steps**: Ordered, copy-pasteable commands and actions.
- **Verification**: How to confirm the procedure succeeded.

### D. `docs/note/` Template

- `# <Title>`
- **Context / Situation**: When this note, tip, or gotcha applies (1–3 lines).
- **Key Tip / Root Cause & Solution**: Actionable takeaway, fix, or workaround.
- **Gotchas / Caveats** (if applicable): Pitfalls, edge cases, or side effects to watch out for.
- **References** (optional): Relevant repo paths or commands.

### E. `docs/story/` Template

- `# <Title>`
- **Goal**: Why this was tried and what was expected (1–2 lines).
- **Attempt**: What was actually done, in order, with exact commands, paths, or settings.
- **Result**: Success / failure / partial, with the evidence (output, error, measurement). Keep failures.
- **Takeaway**: 1–3 lines of what to do differently next time; link the promoted `note`/`rule` if one was written.

### F. `docs/GLOSSARY.md` Template (Single-File Upsert)

- `# Glossary`
- Maintain a clean Markdown table or structured term list (follow existing format if the file already exists):
  - **Term (용어)**: Domain/business term or abbreviation.
  - **Code / Symbol (코드 명칭)**: Corresponding entity, table, module, or identifier in code.
  - **Definition (정의)**: Clear, concise meaning in this project.
  - **Notes / Disambiguation (비고)**: Easily confused terms or key constraints (optional).

## Execution Steps

1. **Extract & Classify**: Identify the reusable takeaway(s) from the current session (or user argument) and classify into `design`, `rule`, `guide`, `note`, `story`, or `glossary`. If nothing is clear to document, ask the user what to capture.
2. **Resolve Path**: Check project instructions (`AGENTS.md` / `CLAUDE.md`), `README.md`, and existing `docs/` paths first; otherwise fall back to `docs/design/`, `docs/rule/`, `docs/guide/`, `docs/note/`, `docs/story/`, or `docs/GLOSSARY.md` (creating the directory if it does not exist).
3. **Write / Update Markdown**: Apply the matching category template and write concise, high-signal Markdown.
4. **Report**: Output the saved file path(s), chosen category, and a 1–2 line summary.
