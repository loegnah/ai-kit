# Query

Search and answer questions using information stored in the second brain via `brain-hindsight` MCP when available, falling back to local file exploration (`~/note/brain`).

## When to Use

- When the user asks questions about notes, wiki, or records in their second brain (e.g., "search my brain", "check the wiki", "find in notes").
- When synthesizing information across multiple brain pages.

## Prohibitions

- **NEVER** run `ingest` or `init` workflows.
- `refs/` directory is strictly read-only (do not modify or delete).

## Execution Steps

1. **Detect Mode**:
   - Check if `brain-hindsight` MCP tools (`xd://mcp__brain_hindsight_reflect`, `xd://mcp__brain_hindsight_recall`) are available in the current environment.
   - If available, execute **Path A (MCP Mode)**. Otherwise, proceed with **Path B (Local File Mode)**.

2. **Path A: Brain-Hindsight MCP Mode (Preferred)**:
   - **Reasoning & Synthesis**: Use `reflect` for broad questions, analysis, meeting summaries, or decisions across topics (e.g., `{"budget": "mid", "query": "<user query>"}`).
   - **Fact Lookup**: Use `recall` for specific facts, error messages, configurations, or exact term retrieval (e.g., `{"query": "<keyword>"}`).
   - Formulate the response based on the returned synthesis or memory units, noting relevant source documents.

3. **Path B: Local File Search Mode (Fallback)**:
   - **Catalog Check**: Read `~/note/brain/index.md` first to identify candidate pages by category.
   - **Explore & Cross-Reference**:
     - Follow `[[wikilink]]` references in candidate pages to gather context.
     - Grep in `~/note/brain/wiki/` or `~/note/brain/refs/` when needed to locate specific keywords.

4. **Synthesize Answer**:
   - Compose a clear, structured response.
   - Cite source pages using `[[wikilink]]` format (e.g., `[[260918 OTR DevRel 파트 회의]]`).
   - If information is conflicting, state it clearly.
   - If information is missing or insufficient, state that honestly—never speculate.
5. **Suggest Saving (Optional)**:
   - If the answer has lasting value (analysis, comparison, summary), ask user confirmation before saving to `~/note/brain/wiki/analyses/<title>.md`.
   - When saved, frontmatter includes:
     ```yaml
     ---
     type: analysis
     created: YYYY-MM-DD
     updated: YYYY-MM-DD
     based_on:
       - "[[Page1]]"
       - "[[Page2]]"
     ---
     ```
