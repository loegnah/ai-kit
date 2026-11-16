# Doc

Distill reusable knowledge from the current session and save it as a concise Markdown document under the appropriate `docs/` location (`docs/design/`, `docs/rule/`, `docs/guide/`, `docs/note/`, `docs/story/`, or `docs/GLOSSARY.md`). Run standalone with `/loegg doc [category]`, or when asked to document takeaways during a workflow.

## Language

Write the document in the user's language (default Korean if the conversation is in Korean). Skill instructions are in English. For Korean documents, follow [`references/korean-writing.md`](references/korean-writing.md) while writing and run its self-check before saving.

## Arguments

- `category / topic` (optional):
  - If invoked with a category argument (`/loegg doc <design|rule|guide|note|story|glossary>`), route directly to that category unless the content clearly belongs elsewhere.
  - If invoked generally (`doc`, `docs`) or without a category, classify the session takeaway into one of the six targets below (or split into separate targets if multiple distinct categories apply).

## Directory Taxonomy & Routing Rules

### 1. Respect Project Guidelines, `README.md`, and Existing `docs/` Structure First

- **Project Instructions & Docs Policy**: Check already-loaded agent instructions (`AGENTS.md`, `CLAUDE.md`, etc.) and root `README.md` (or `docs/README.md`) to see if the project specifies where documentation, rules, or architecture notes belong, or requires updating an index/table of contents.
- **Existing Directory / File Conventions**: Inspect the project's existing `docs/` tree (or guideline-specified path). If the project already uses an established directory or file (e.g., `docs/architecture/` instead of `docs/design/`, `docs/rules/` instead of `docs/rule/`, `docs/guides/` instead of `docs/guide/`, `docs/notes/` or `docs/tips/` instead of `docs/note/`, `docs/stories/`, `docs/log/` or `docs/journal/` instead of `docs/story/`, or root `GLOSSARY.md` / `docs/glossary.md`), use that existing path and follow its naming/formatting conventions.

### 2. Default Target Structure

When no equivalent path exists, route by content nature into these targets under `docs/`:

| Target Path        | Type        | Criterion ("One-Line Rule")                | What Belongs Here                                                                                                                                                                                                                                                      |
| :----------------- | :---------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/design/`     | Directory   | **"How it is structured & why"**           | System/module architecture, data & state flow, schemas, component boundaries, design rationale / ADRs.                                                                                                                                                                 |
| `docs/rule/`       | Directory   | **"What MUST or NEVER be done"**           | Coding conventions, strict invariants, Do / Don't constraints, naming/pattern enforcement rules.                                                                                                                                                                       |
| `docs/guide/`      | Directory   | **"How to set up, run, or do it"**         | Step-by-step how-to guides, local/dev setup, deployment/migration procedures, operational workflows.                                                                                                                                                                   |
| `docs/note/`       | Directory   | **"What we learned & watch outs"**         | Timeless tips, troubleshooting conclusions, gotchas/caveats/pitfalls, investigation findings. Conclusion only; kept current.                                                                                                                                           |
| `docs/story/`      | Directory   | **"What we planned, tried & how it went"** | One folder per effort (`<title>/`, or `YYMMDD-<title>/` when pinned to a date): `PLAN.md` for multi-phase execution plans updated as phases clear, and `STORY.md` (append-only body) for goal, what was done, result (including failures), takeaway, and related docs. |
| `docs/GLOSSARY.md` | Single File | **"What domain terms & symbols mean"**     | Ubiquitous language, domain terms, abbreviations, business-term <-> code-symbol mappings, disambiguations.                                                                                                                                                             |

### 3. Update vs. Create

- **Directory Targets (`design`, `rule`, `guide`, `note`)**: If an existing file in the target folder already covers the same topic, update/append to that file rather than creating a duplicate; otherwise create `<target-dir>/<kebab-case-slug>.md` (or match the directory's existing filename style).
- **Story Target (`docs/story/`)**: One folder per effort, not per day. Before creating one, read `docs/story/INDEX.md` (list `docs/story/` when it is absent) and reuse the folder whose goal matches the current work, whatever its date prefix; work toward a different goal gets a new folder that links the earlier story. Name a new folder `<title>/` (short kebab-case, Korean allowed) by default, or `YYMMDD-<title>/` when the work is pinned to one date (an incident, a single experiment run) or the user asks; take `YYMMDD` from the environment (`date +%y%m%d`), never guessed. `<story-dir>` below means either form. For multi-phase work (see `../../playbooks/multi-phase-plan.md`), create `PLAN.md` in that folder and check off `- [ ]` -> `- [x]` in place as each phase passes verification. Record the outcome in `STORY.md` (linking `./PLAN.md` under `Related Docs` when present). The `STORY.md` body below `---` is append-only: continuing on a later day adds a new `## YYYY-MM-DD — <focus>` section. Edit only the top summary block and `Related Docs` in place to reflect the latest state.
- **Story Index (`docs/story/INDEX.md`)**: Whenever you create a story folder or change a story's `Goal`, `Status`, or `Updated`, upsert its row in the same edit (create the file if absent, backfilling rows for existing folders). Keep one row per folder, sorted by `Updated` descending; see the template in E.
- **Single-File Target (`docs/GLOSSARY.md`)**: Always upsert into the single glossary file—create `docs/GLOSSARY.md` if absent, or add/update entries in place (sorted logically by domain group or alphabetically) without duplicating existing terms.
- **`note` vs `story`**: A `note` states a conclusion that stays true and is edited in place; a `story` records what happened over time and only grows by appended sections. If a story yields a reusable lesson, also write or update it in `design`, `rule`, `guide`, `note`, or `GLOSSARY.md` and link it under `Related Docs` in `STORY.md`.

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

#### Reusable verification procedures

When a verification procedure is needed repeatedly, or an existing recipe no longer matches the app, update the target project's existing verification guide first. If none exists, use `<target-project>/docs/guide/verification.md`, adapting to that project's established docs layout (for example `docs/guides/`). Keep project-specific commands out of loegg; do not create a guide for every task.

Record the launch command and readiness condition, required environment variable names (never secret values), user-facing actions, expected evidence, and cleanup for processes or scratch state the check creates. Reuse existing scripts rather than copying their implementation. Base runnable instructions on an observed run; label any unexecuted branch as unverified. A saved recipe is not a passing result: execute the relevant steps for the current change and update stale instructions from what actually happened.

### D. `docs/note/` Template

- `# <Title>`
- **Context / Situation**: When this note, tip, or gotcha applies (1–3 lines).
- **Key Tip / Root Cause & Solution**: Actionable takeaway, fix, or workaround.
- **Gotchas / Caveats** (if applicable): Pitfalls, edge cases, or side effects to watch out for.
- **References** (optional): Relevant repo paths or commands.

### E. `docs/story/` Template (`docs/story/<story-dir>/STORY.md`)

Use a **hybrid layout**: a fixed summary/index block at the top for instant scanning, followed by a freeform section below `---` adapted to the work.

```markdown
# <Title>

- **Started**: YYYY-MM-DD
- **Updated**: YYYY-MM-DD
- **Status**: In Progress | Done | Partial | Failed | Superseded
- **Goal**: Why this work was started and what was expected (1–2 lines).
- **Result**: Final outcome and verification summary (1–2 lines).
- **Takeaway**: Key conclusion or watch-out for next time (1–3 lines).

## Related Docs

- [`docs/note/...`](../../note/...) — 1-line description (include all created, updated, or referenced `design`, `rule`, `guide`, `note`, `GLOSSARY.md`, prior `story`, or sibling files in this `<story-dir>/` folder)

---

## <Freeform Section(s)>

(When the story spans several days, open each day's entry with `## YYYY-MM-DD — <focus>` and nest its headings under it. Write freely using headings that fit the work—e.g., `## Changes`, `## Attempt & Trial-and-Error`, `## Root Cause`, `## Verification & Benchmarks`, `## Follow-up`. Include exact file paths, commands, code snippets, and failed attempts worth remembering.)
```

`docs/story/INDEX.md` (one row per story folder, newest `Updated` first; the folder may hold only `PLAN.md` so far):

```markdown
# Story Index

| Story                           | Goal        | Status      | Updated    |
| :------------------------------ | :---------- | :---------- | :--------- |
| [`<story-dir>`](./<story-dir>/) | 1-line goal | In Progress | YYYY-MM-DD |
```

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
3. **Write / Update Markdown**: Apply the matching category template and write concise, high-signal Markdown. For Korean documents, run the `references/korean-writing.md` self-check before saving.
4. **Report**: Output the saved file path(s), chosen category, and a 1–2 line summary.
