# Stage 3 Execution: Run Plan

Execute the approved `plan.md` sequentially and maintain `plan.md` as the single source of truth.

## Language

Respond in the same language the user is using (e.g., Korean if the user communicates in Korean). Match the user's language for status reports and discussions.

## Arguments

- `target` (optional): Path to target story directory or `plan.md` file.

## Constraints

- Strictly adhere to **Order of Work** and **Files that change** in `plan.md`.
- If implementation diverges or unexpected adjustments are needed, update `plan.md` simultaneously (Single Source of Truth).
- Avoid unrequested abstractions or speculative complexity.

## Execution Steps

1. **Locate & Validate `plan.md`**
   - If argument provided, resolve `<target_dir>`.
   - If omitted:
     - Search `docs/story/` for the most recently modified directory containing `plan.md`.
   - Read `<target_dir>/plan.md`. If missing, instruct user to run `/asd plan` first.
   - Verify plan status is approved or ready for implementation.

2. **Sequential Implementation**
   - Follow `Order of Work` step-by-step.
   - For each step:
     - Apply surgical, clean code changes using the appropriate editing tools.
     - Implement only files enumerated in `Files that change`.
   - If unforeseen adjustments are required during implementation:
     - Update `plan.md` immediately to reflect modified file list or execution order.

3. **Update Plan Status**
   - Once all steps in `Order of Work` are complete, update `plan.md` status line:
     - `상태: [구현완료(completed)]`

4. **Report & Guide Next Step**
   - Provide a concise summary of modified files and completed work order.
   - Guide next step: Inform the user that implementation is complete, and suggest running `/asd verify <target_dir>` (or `/asd verify`) to validate Proof criteria.
