# Multi-phase plan

**Use this playbook when a task spans multiple phases, subsystems, or stacked PRs and needs an explicit, verifiable execution plan before or during implementation.**

1. Skip the plan for 1–2 file changes with an obvious approach—state that it is small and execute directly via `playbooks/feature.md`, `playbooks/bug-fix.md`, or `playbooks/refactoring.md`.
2. Resolve open questions before locking the plan:
   - For empirical or technical forks, run a quick throwaway check via `playbooks/prototype.md` or inspect the codebase via `../action/how/SKILL.md` (`how`) and `../action/why/SKILL.md` (`why`).
   - For open product, scope, or architectural decisions in Direct Mode, clarify upfront with the user via `../action/grill/SKILL.md` (`grill`). In Agent Mode, resolve via prototype or `../util/arena/SKILL.md` (`arena`) (**Never Block on the Human** in `../SKILL.md`).
3. Map the blast radius and boundaries: run `../action/architect/SKILL.md` (`architect`) or `../action/blast-radius/SKILL.md` (`blast-radius`) when changing core contracts across phases. Follow **Outcome-Oriented Execution** and **Migrate Callers Then Delete Legacy APIs** (`../SKILL.md`)—plan clean phase boundaries rather than permanent compatibility shims.
4. Decompose into verifiable phases (**Sequence Work into Verifiable Units**, **Separate Before Serializing Shared State** in `../SKILL.md`). Each phase must end in a green check (static checks + tests + real-surface verification) before the next phase begins.
5. Write the plan using the structure below (save to `docs/design/` via `../action/doc/SKILL.md` when the user wants a persisted plan file, or present inline in chat):

```markdown
# <Plan Title>

- **Goal**: <1–3 sentences on what changes, for whom, and the target end state.>
- **Phase order & dependencies**: <e.g., Phase 1 (types/subtraction) -> Phase 2A & 2B (parallel slices) -> Phase 3 (caller migration & cleanup).>

## Phase <N>: <Verb phrase naming the deliverable>

- **Depends on**: <None | Phase M>
- **Files**:
  - [ ] Edit / Create / Delete `<path>`
- **Changes**:
  - [ ] <Concrete symbol and behavior change>
- **Verification gate** (must pass before advancing):
  - [ ] Static & unit check: `<command, e.g. bun run check / test command>`
  - [ ] Real-surface check: `<exact runtime command, browser/CLI scenario, or equivalence proof and expected output>`
```

6. Execute or hand off:
   - If the user asked for a plan only, present the plan and stop for approval.
   - If executing the plan now, copy the phases into the todolist and execute phase by phase, verifying each phase's gate before starting the next, and finishing with `../action/review/SKILL.md` (`review`).

**Reply** (following `../SKILL.md` `## Writing the reply`): the phase breakdown and dependency order, key architectural choices and rejected alternatives, what prototypes/grounding proved, and the verification gate for each phase.
