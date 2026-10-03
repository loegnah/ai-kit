# Upsert

Update an existing note in the second brain's raw directory (`~/note/brain/raw/`) by appending new content, or create a new note if none exists.

## When to Use

- When the user asks to add, append, update, or upsert information into notes (e.g., "add to notes", "update note", "append this", "upsert to brain").
- When recording information where a note on the topic may already exist in `~/note/brain/raw/`.

## Prohibitions

- **NEVER** run `ingest` or `init` workflows.
- Only record or update documents in `~/note/brain/raw/`. NEVER directly edit `~/note/brain/wiki/` or `~/note/brain/refs/`.

## Storage & Naming Conventions

1. **Target Directory**: `~/note/brain/raw/`
2. **File Name**:
   - Concise name reflecting the core content.
   - Connect words with hyphens (`-`). No spaces or special characters.
   - Extension must be `.md`.
   - Example: `~/note/brain/raw/react-19-migration-plan.md`

3. **Frontmatter** (for new files):
   - Must include `created` date at the top:
     ```yaml
     ---
     created: YYYY-MM-DD
     ---
     ```

## Execution Steps

1. **Search Existing Note**:
   - Search for matching files in `~/note/brain/raw/` using topic keywords or relevant filename patterns.
   - If multiple candidates exist, ask the user to clarify which file to update.

2. **Branch**:
   - **Update (Existing File Found)**:
     - Read the file content.
     - Append a new section with a date header at the end of the document:
       ```markdown
       ## YYYY-MM-DD

       <new content>
       ```
     - Preserve existing frontmatter and preceding content without loss.
   - **Insert (No Matching File)**:
     - Determine a concise hyphen-separated filename under `~/note/brain/raw/`.
     - Create a new Markdown file formatted with `created: YYYY-MM-DD` frontmatter and structured body.

3. **Report**:
   - Confirm the operation (Updated or Created) with the full file path and a brief summary of what was written.
