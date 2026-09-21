# Stage 1: Intent Capture (intent.md)

Capture business and user intent into `intent.md` as the first version-controlled artifact of the AI-Native SDLC.

## Language

Respond in the same language the user is using (e.g., Korean if the user communicates in Korean). Match the user's language for artifact content and discussions.

## Arguments

- `slug` or `feature-name` (optional): Short hyphen-separated slug for directory naming (e.g., `user-auth`, `PAY-1042-refund`).

## Constraints

- Focus on **"Why & What is the problem, and what is the desired outcome"**, rather than "How to implement".
- Use business and user vocabulary rather than technical implementation jargon.
- Explicitly identify and document constraints and open questions.

## Execution Steps

1. **Resolve Target Directory**
   - Base path convention: `docs/story/YYYY-MM-DD-<slug>/` (or `docs/story/<ticket>-<slug>/`).
   - If argument provided, format `<slug>` appropriately.
   - If argument omitted:
     - Check git branch name (e.g. `feature/user-auth` -> `user-auth`).
     - If no branch hint, prompt the user for a short feature slug.
   - Ensure the directory exists (`mkdir -p <target_dir>`).

2. **Gather Requirements (Interview / Analysis)**
   - Analyze user prompt. If information is missing, clarify:
     - **Problem Definition**: What problem is occurring and who is impacted?
     - **Proposed Outcome**: What will users be able to do, and how is success measured?
     - **Affected Users & Systems**: Target user groups and related systems/components.
     - **Constraints**: Mandatory technical and business boundaries (e.g., security policies, auth mechanisms, latency).
     - **Open Questions**: Unresolved questions to be answered during technical specification.

3. **Write `intent.md`**
   - Save to `<target_dir>/intent.md` using the standard template:
     ```markdown
     # Intent: [Feature or Change Name]

     - Author: [Author Name / Team]
     - Date: YYYY-MM-DD
     - Status: [Draft | In Review | Approved]

     ## 1. Problem Definition

     - What problem is currently occurring?
     - Who is affected, and what is the quantitative or qualitative impact?

     ## 2. Proposed Outcome

     - What will users be able to do once completed?
     - How will success be measured?

     ## 3. Affected Users & Systems

     - Target user groups
     - Relevant systems and components

     ## 4. Constraints

     - Mandatory technical and business boundaries

     ## 5. Open Questions

     - Unresolved questions to be clarified during the design/specification phase
     ```
4. **Report & Guide Next Step**
   - Output created file path and a concise summary.
   - Guide next step: Inform the user to review/approve the intent artifact, then run `/dev-lgnh spec <target_dir>` (or `/dev-lgnh spec`) to proceed with Stage 2 Design.
