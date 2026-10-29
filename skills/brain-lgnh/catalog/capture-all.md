# Capture All

Record newly discovered information, meeting notes, ideas, decisions, or raw knowledge from the conversation or user input into the second brain's raw directory (`~/note/brain/raw/`).

## When to Use

- When the user asks to save, record, remember, or capture full notes/findings (e.g., "save this", "take note", "capture findings", "remember this").
- When capturing unconstrained raw information including decisions and context before subsequent wiki processing.

## Prohibitions

- **NEVER** run `ingest` or `init` workflows.
- Only record the source document in `~/note/brain/raw/`.
- **NEVER** write to `brain-hindsight` MCP (e.g., `retain`, `sync_retain`). Save as a file only.

## Storage & Naming Conventions

1. **Target Directory**: `~/note/brain/raw/`
2. **File Name**:
   - Follow shared naming rules in `catalog/naming.md`.
   - Do NOT force hyphenation or no-spaces. Use natural language (Korean, English, spaces, parentheses allowed) reflecting the core content.
   - Only exclude Obsidian prohibited characters (`* " \ / < > : | ? # ^`).
   - Extension must be `.md`.
   - Example: `~/note/brain/raw/React 19 마이그레이션 계획.md`

3. **Frontmatter**:
   - Must include `created` date at the top:
     ```yaml
     ---
     created: YYYY-MM-DD
     ---
     ```

4. **Document Body**:
   - Place `# Title` after frontmatter with normal spaces (no hyphens).
   - Organize content cleanly using headers, bullet lists, and code blocks.

## Execution Steps

1. **Extract Content**: Identify the core information, decisions, context, or notes from user input or conversation history.
2. **Determine File Name**: Formulate a natural file name reflecting the core content according to `catalog/naming.md`.
3. **Write Markdown**: Format with `created` frontmatter and structured body.
4. **Report**: Confirm creation with the file path and brief summary.
