# Implement (Subagent-Driven Implementation)

Execute code implementation and unit testing by dispatching tasks to omp's `implementer1`, `implementer2`, and `implementer3` subagents, followed by integration verification.

## Language

Respond in the user's language (e.g., Korean if the user communicates in Korean). Match user language for reports and discussions.

## Arguments

- `target` (optional): Path to target story directory (`docs/story/...`), `plan.md`, or a specific task description.

## Core Principles

1. **Strict Slice Independence (Disjoint File Sets)**:
   - Partition work into 1 to 3 independent slices.
   - **Never assign the same file to multiple subagents simultaneously.** Shared files (e.g., barrel exports, common entrypoints) must be handled by the main orchestrator after subagents complete.
2. **Subagent Specialization**:
   - `implementer1`: First slice (e.g., core logic, backend service, data layer).
   - `implementer2`: Second slice (e.g., UI components, API layer, consumer module).
   - `implementer3`: Third slice (e.g., CLI commands, test suites, utility modules).
   - Use only as many implementers as needed (1, 2, or 3). Do not invent artificial slices.
3. **Subagent Scope & Verification**:
   - Subagents implement code and run isolated slice-level unit tests.
   - Subagents skip repository-wide formatters, linters, or global builds mid-flight.
4. **Integration Owner Verification**:
   - The main agent acts as the integration owner: collects subagent diffs, handles shared wiring, and executes full repository verification (`bun run check`, test suites).

---

## Execution Steps

### 1. Scope & Plan Slicing

1. Locate task requirements:
   - If `target` is provided, read the target plan or brief.
   - If omitted, read the most recent `docs/story/*/plan.md` or parse the user's implementation prompt.
2. Partition into 1–3 non-overlapping slices:
   - Identify files to create, modify, and test for each slice.
   - Verify zero file overlap across slices.
   - Isolate any shared wiring files (e.g., `index.ts`, shared router) for post-merge integration.

### 2. Dispatch Subagents via omp `task` Tool

Dispatch subagents concurrently in a single `task` call:

```typescript
task({
  context: `# Goal\n[High-level objective]\n\n# Contract\n[Shared interfaces, types, signatures, and conventions]`,
  tasks: [
    {
      agent: "implementer1",
      name: "Slice1Name",
      solutionSpace:
        "[Solution space description: e.g. single fix, isolated service, or defined interface]",
      task: `# Target Files\n- path/to/file1.ts\n- path/to/file1.test.ts\n\n# Change\n[Exact requirements and logic]\n\n# Acceptance\n[Unit tests pass, behavior verified]`,
    },
    {
      agent: "implementer2",
      name: "Slice2Name",
      solutionSpace: "[Solution space description]",
      task: `# Target Files\n- path/to/file2.ts\n- path/to/file2.test.ts\n\n# Change\n[Exact requirements and logic]\n\n# Acceptance\n[Unit tests pass, behavior verified]`,
    },
  ],
});
```

### 3. Reconcile & Integrate (Integration Owner)

1. Review subagent outputs:
   - Confirm status, touched files, and test results from each implementer.
2. Wire shared entrypoints:
   - Apply any necessary shared wiring, exports, or router updates directly in the main session.

### 4. Full Verification

Run full repository checks:

- Typecheck & Lint: `bun run check`
- Full test suite: `bun test` (or relevant test runner)

If any check fails:

- Diagnose the root cause across integrated files.
- Apply surgical fixes directly, or dispatch a targeted fix if scope is large.
- Re-run verification until all checks pass cleanly.

### 5. Report & Deliver

Provide a concise deliverable summary:

- Implemented slices and assigned implementer subagents.
- List of modified and created files.
- Verification command output (test pass count, 0 lint/typecheck errors).
- Status update in `plan.md` if working within a story workflow (`Status: [Completed]`).
