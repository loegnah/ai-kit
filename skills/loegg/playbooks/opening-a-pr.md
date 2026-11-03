# Opening a PR

**Run when the user asks to open or update a pull request, or at the end of a code-changing playbook when PR creation is in scope.**

1. **Pre-PR verification & review**:
   - Confirm all static checks (`bun run check`, lint, typecheck, tests) and real-surface verification have passed (**Prove It Works** in `../SKILL.md`).
   - Ensure `../action/review/SKILL.md` (`review`) has been run on the final diff and no unaddressed P0/P1 defects remain.
   - Reread the diff to remove any accidental debug logs or phase-narrating comments (`../SKILL.md` `## Comments`).
2. **Commits**:
   - Organize changes into clean, logical commits that tell the story of the change (**Sequence Work into Verifiable Units** in `../SKILL.md`).
   - Stage only the intended files (`git add <files>`, never blind `git add -A` over untracked noise).
3. **Title**:
   - Use Conventional Commits: `type(scope): subject` with no trailing period (e.g., `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`).
   - Keep the subject short, imperative, and concrete.
4. **Description**:
   - Write a concise one-minute briefing (under ~40 lines) following `../SKILL.md` (`## Writing the reply`). Use `##` headings in this order, dropping any section that has nothing to say:
     - `## Why`: the problem and approach in 1–3 short sentences.
     - `## What changed`: 1–3 short bullets naming the key symbols or paths that carry the change.
     - `## Scope`: 1–3 short items on what this PR covers and what it deliberately leaves out.
     - `## Tradeoffs`: rejected alternatives a reviewer would ask about (skip when there was no real fork).
     - `## Blast Radius`: 1–2 sentences on what callers or surfaces this touches and why it is safe.
     - `## Verification`: 1–3 bullets with the exact commands/scenarios run and their observed outcome (for perf changes, report the primary `before -> after` number vetted by `../action/benchmark-checklist/SKILL.md`).
5. **Create the PR**:
   - Push the branch and open the PR via `gh pr create --base <base-branch>` (open ready for review by default, not draft, unless the user explicitly requested a draft).
   - For stacked PRs, base each child branch on its parent branch and target `--base <parent-branch>`.

**Reply**: the PR URL (`https://github.com/<owner>/<repo>/pull/<number>`), commit summary, and verification summary.
