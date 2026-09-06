# Stage 4: Verification & Proof

Execute verification checks defined in `plan.md`'s Proof section to demonstrate that the implementation meets acceptance criteria.

## Language

Respond in the same language the user is using (e.g., Korean if the user communicates in Korean). Match the user's language for reports and discussions.

## Arguments

- `target` (optional): Path to target story directory or `plan.md` file.

## Constraints

- **Never relax tests arbitrarily**: If a test fails, do not delete tests or weaken assertions; fix the implementation code instead.
- All criteria defined in `plan.md`'s `Proof` section must pass cleanly.

## Execution Steps

1. **Locate Target & Read Proof Section**
   - Resolve target story directory and read `<target_dir>/plan.md`.
   - Extract verification criteria from `## 4. 검증 및 완료 증거 (Proof)`:
     - Automated tests (e.g., `bun test`, `pytest`, `npm test`)
     - Linter / typecheck / build commands (e.g., `bun run check`)
     - Visual/functional checkpoints

2. **Execute Proof Commands**
   - Run the specified automated test suite.
   - Run linter and typecheck commands.
   - Run project build if applicable.

3. **Handle Errors (Self-Correction Loop)**
   - If any test or lint check fails:
     - Diagnose root cause in implementation files.
     - Fix the bug in application code.
     - Re-run verification commands until all checks pass cleanly.

4. **Report Deliverable Evidence**
   - Output exact proof evidence:
     - Test run output showing pass count.
     - Lint/typecheck output with 0 errors.
   - Inform user that the feature is verified and ready for PR creation or deployment.
