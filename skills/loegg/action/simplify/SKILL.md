---
name: loegg-simplify
description: "Simplify recently changed code without changing behavior. Delegates to a refactorer subagent by default; `fast` runs it in the main agent. Invoked via `/loegg simplify [fast] [scope]`."
disable-model-invocation: true
---

# Simplify

Make recently changed code easier to read without changing what it does. Use for `/loegg simplify`, "코드 단순화해줘", "방금 바꾼 코드 정리해줘".

This action edits code. `../review/SKILL.md` (`review`) stays read-only, and `../../playbooks/refactoring.md` reshapes structure against a pinned contract. Simplify stays inside the changed code and the helpers it directly touches.

## Scope

- An explicit file, directory, or pattern wins.
- Otherwise use uncommitted changes: `git diff --name-only HEAD` plus `git ls-files --others --exclude-standard`.
- If there are none, use the last commit: `git diff --name-only HEAD~1 HEAD`.
- If no files match, say so and stop.

## Execution

- **Delegated (default)**: Spawn one `refactorer` subagent (role from `../setup/SKILL.md`; a general-purpose subagent when the role is not registered). Its fresh view catches complexity the author of the change reads past, and the main context stays clean (**Guard the Context Window**). Brief it per `### Subagent Rules` in `../../SKILL.md`: the restated goal, the intent of the recent change, the target files, the behavior to preserve, and the absolute path of this file so it follows `## Rules`. Review its diff yourself before reporting.
- **`fast`** (`/loegg simplify fast [scope]`): Read the target files and their diff, then edit them directly in the main agent.

## Rules

1. **Preserve behavior.** Keep runtime behavior, API contracts, signatures, input validation, return values, error handling, and edge-case branches. Change a signature only when the user asked.
2. **Readability over brevity.** Code reads at a glance. No dense one-liners, cryptic abbreviations, or nested ternaries. Boring beats clever.
3. **Subtract.** Delete dead code, unused variables, redundant wrappers, and one-caller pass-through layers (**Laziness Protocol**, **Subtract Before You Add**, **Minimize Reader Load**). Keep an abstraction when removing it makes the code harder to read.
4. **Comments.** Apply `## Comments` in `../../SKILL.md`: delete comments that narrate what the code does and keep only the non-obvious why.
5. **Project standards.** Match the surrounding naming, file conventions, and formatting.
6. **Language rules.** TypeScript and TSX: follow `references/typescript.md`.
7. **Git.** Never change git state (`git add`, `git commit`, `git stash`, and the like). Edit working files only.

## Verify and report

1. Run the project's checks that cover the scope: formatter, linter, typecheck, and the tests that touch the changed files (**Prove It Works**). When no test covers a simplified path, say so.
2. Reread the diff. Revert any edit that changes behavior or leaves the scope.
3. Report the touched files, the main simplifications in one or two lines, the checks you ran, and what stays unverified.
