# Capture Daily

Record information, notes, or findings into today's daily note (`~/note/brain/daily/YYYY-MM-DD.md`), creating it if it doesn't exist.

## When to Use

- When the user asks to capture or save information into today's daily note (e.g., `/brain-lgnh capture-daily`, "save to daily", "daily memo").
- When recording transient thoughts, scratchpad findings, or daily progress without creating a dedicated standalone raw document.

## Prohibitions

- **NEVER** run `ingest` or `init` workflows.
- Only write or append to today's daily note in `~/note/brain/daily/`.

## Storage & Format Conventions

1. **Target Directory**: `~/note/brain/daily/`
2. **File Path**:
   - `~/note/brain/daily/YYYY-MM-DD.md` based on today's date (determined via current date `date +%Y-%m-%d`).
3. **No Frontmatter**:
   - Daily notes do **NOT** use YAML frontmatter.
4. **Document Structure**:
   - Topics organized with `## <Topic>` or `[[<Topic>]]`.
   - Structured content underneath using bullet lists, code blocks, or paragraphs.
   - Example:
     ```markdown
     ## React 19 Upgrade Notes

     - Verified compatibility with TanStack Start.
     - Resolved peer dependency warnings.
     ```

## Execution Steps

1. **Determine Date & File Path**:
   - Resolve today's date in `YYYY-MM-DD` format via `date +%Y-%m-%d`.
   - Target path is `~/note/brain/daily/YYYY-MM-DD.md`.
2. **Format Entry**:
   - Frame the content under a relevant topic header: `## <Topic>` or `[[<Topic>]]`.
   - Format details cleanly using structured markdown (bullets, code blocks, etc.).
3. **Write or Append**:
   - Check if `~/note/brain/daily/YYYY-MM-DD.md` exists.
   - **If file exists**: Append the new section at the end of the file after a blank line.
   - **If file does not exist**: Create the file directly containing the formatted content without frontmatter.
4. **Report**:
   - Confirm the operation with the file path and a brief summary of the captured content.
