# Meta-Prompt (Prompt Builder)

Transform rough task descriptions into structured, production-grade LLM prompts.

## Arguments

- `task_description`: The rough idea, task, or objective the user wants a prompt for (e.g. `summarize PR diffs`, `extract JSON invoice data`, `tutor for leetcode`). If omitted, ask the user what task they need a prompt for.

## Core Principles

- **No Fluff**: Avoid generic pleasantries ("Act as a world-class..."). Anchor persona to concrete responsibilities and domain constraints.
- **XML / Delimiter Isolation**: Use explicit XML tags (`<context>`, `<input>`, `<rules>`, `<output_format>`) to separate instructions from dynamic data.
- **Negative Constraints First**: State what the model must NEVER do alongside positive requirements.
- **Deterministic Output Contracts**: Always specify exact schemas, markdown structures, or JSON shapes.

## Execution Steps

1. **Extract Task Profile**
   - Identify:
     - **Goal**: What must the prompt achieve?
     - **Input**: What data will the target LLM receive?
     - **Output**: Desired schema, tone, or format.
     - **Constraints**: Edge cases, length limits, forbidden patterns.
   - If minor information is missing, infer sensible defaults and proceed immediately.
   - **Handling Severe Ambiguity**: If the task description is heavily ambiguous, lacking critical context, or riddled with unmade decisions:
     - Guide the user to run `/dev-lgnh grill` first to relentlessly stress-test their ideas, unblock decisions, and map out requirements before returning here to build the prompt.

2. **Generate Structured Prompt**
   Use this standardized prompt structure:

   ```markdown
   # Role & Objective

   [Direct 1-2 sentence definition of role, domain, and primary deliverable]

   # Context & Rules

   - [Hard constraint 1]
   - [Hard constraint 2]
   - NEVER: [Forbidden behavior or anti-patterns]

   # Input Specification

   Input is provided in `<input>` tags.
   [Describe schema/format of expected input]

   # Workflow / Steps

   1. [Step 1]
   2. [Step 2]
   3. [Step 3]

   # Output Format

   [Exact JSON schema, markdown template, or XML envelope]

   # Examples (Optional - include 1 few-shot if output schema is nuanced)
   ```

3. **Present Output**
   - Provide the complete generated prompt in a single copyable code block.
   - List at most 2-3 brief lines under it noting:
     - Key assumptions made.
     - Variables the user needs to populate (e.g. `{{INPUT_DATA}}`).
