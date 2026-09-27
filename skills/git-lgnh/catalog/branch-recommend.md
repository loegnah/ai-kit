# Branch Recommend

Recommend a branch name based on the unique commits of the current branch and any uncommitted changes.

## Core Concept

- **Do NOT assume a standard base branch**: Branches like `main`, `master`, or `develop` are NOT necessarily the base.
- **Find the most recent point of divergence**: The base is the point where this branch most recently diverged from its parent history.
- **Isolate unique commits**: Look only at commits that belong exclusively to this branch and do not exist on any other branch.
- **Include uncommitted work**: If the working tree is dirty, include uncommitted changes alongside the unique commits.

## Workflow

1. **Identify Branch-Exclusive Commits**
   - Determine the commits that uniquely belong to the current branch (not present in any other branch).
   - If no unique commits exist yet, derive context solely from uncommitted changes.

2. **Derive Branch Name**
   - **Type**: Map the primary intent to a conventional type (`feat`, `fix`, `refactor`, `chore`, `docs`, `test`).
   - **Scope**: Common module, directory, or domain noun (e.g., `git-lgnh`). Omit if broad or ambiguous.
   - **Summary**: Concise 2-4 words in `kebab-case`, imperative action.

3. **Report**
   - Output the basis: unique commits and uncommitted file summary.
   - Present recommendations:
     ```
     Recommended: <type>/<scope>-<summary>
     Alternatives: <name> | <name>
     ```
   - Only recommend names; do NOT create or checkout branches.
