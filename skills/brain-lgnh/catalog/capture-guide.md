# Capture Guide

Extract reusable setup instructions, how-to guides, and operational workflows from the conversation into the second brain's raw directory (`~/note/brain/raw/`), excluding decisions, trial-and-error noise, and project-specific private data.

## When to Use

- When the user asks to save a guide, how-to, setup manual, or recipe from the session (e.g., "save this guide", "record setup steps", "write howto").
- When extracting clean, general-purpose procedures that any developer can follow without session-specific choices or context.

## Prohibitions

- **NEVER** run `ingest` or `init` workflows.
- Only record the source document in `~/note/brain/raw/`.

## Extraction & Generalization Rules

1. **Exclude**:
   - Decision rationales and personal choices (e.g., "chose option A because of X").
   - Troubleshooting trial-and-error, failed attempts, and transient error outputs.
   - User-specific or environment-specific private data (usernames, internal domains, API keys, tokens).
2. **Generalize**:
   - Replace project-specific absolute paths with placeholders (e.g., `<project-root>`, `<repo>`).
   - Replace private credentials with placeholders (e.g., `<api-key>`, `<token>`).
   - Frame steps in clear, imperative commands.
3. **Structure**:
   - Overview: 1-line purpose of the tool or procedure.
   - Prerequisites: Required runtimes, dependencies, or environment variables.
   - Step-by-step Setup / Installation: Commands and configuration snippets.
   - Usage: Common commands and basic invocation examples.
   - Verification: Smoke test or command to verify successful setup.

## Storage & Naming Conventions

1. **Target Directory**: `~/note/brain/raw/`
2. **File Name**:
   - Connect words with hyphens (`-`).
   - Prefix with `guide-` to indicate procedural documentation.
   - Extension must be `.md`.
   - Example: `~/note/brain/raw/guide-agent-tool-setup.md`

3. **Frontmatter**:
   - Must include `created` date and `type`:
     ```yaml
     ---
     created: YYYY-MM-DD
     type: guide
     ---
     ```

4. **Document Body**:
   - Place `# Title` after frontmatter with normal spaces (no hyphens).
   - Organize logically: Overview -> Prerequisites -> Setup -> Usage -> Verification.

## Execution Steps

1. **Filter & Generalize**: Strip out decisions, opinions, and local environment quirks. Retain only generalizable, reproducible instructions.
2. **Determine File Name**: Create a hyphen-separated filename under `~/note/brain/raw/` starting with `guide-`.
3. **Write Markdown**: Format with `created` and `type: guide` frontmatter and structured sections.
4. **Report**: Confirm creation with the file path and brief summary of the documented procedure.
