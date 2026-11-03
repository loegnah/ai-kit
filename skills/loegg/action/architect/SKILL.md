---
name: loegg-architect
description: "Sketch caller usage, types, function signatures, and module boundaries before writing implementation code, comparing candidate shapes via `arena` when the design space is open. Invoked via `/loegg architect` or triggered during a loegg workflow."
disable-model-invocation: true
---

# Architect

Sketch types, function signatures, class shapes, and module boundaries with `not implemented` bodies and pseudocode. Synthesize across candidate perspectives, then fill in code against the chosen sketch.

## Start

Open a todolist with one entry per phase before starting:

1. Ground
2. Sketch
3. Agree
4. Implement
5. Scrap

## Phase A: Ground the problem

Build a real mental model of every system the new code touches. Run `../how/SKILL.md` (`how`) over the relevant subsystems. Naming a file isn't grounding—produce the architectural explanation `how` prescribes. If the design redefines ownership or layering, also run `../why/SKILL.md` (`why`) on the existing shape so historical rationale becomes a constraint, not a guess.

Skip Phase A only when the work is genuinely greenfield with no surrounding system to integrate.

## Phase B: Sketch

Run `../../util/arena/SKILL.md` (`arena`) with the design-sketch task and the Phase A grounding artifacts. Pass `references/runner-prompt.md` as each runner's prompt.

Use the `arena runners` role from `~/.agents/loegg/models.md` (configured via `../setup/SKILL.md`), following the runner selection and harness fallback rules in `../../util/arena/SKILL.md` Phase 1.

Design it twice. Require at least two structurally distinct candidates before synthesis, even when the first looks sufficient. This is the **Exhaust the Design Space** principle in `../../SKILL.md` made concrete: whole-shape alternatives, not point fixes inside one shape.

Screen every candidate against [`references/design-red-flags.md`](references/design-red-flags.md) before synthesis. Assume the next contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles. Prefer the design where a change that looks right from one file is right for the whole repo.

Compare viable candidates on interface depth. Prefer the design that hides more complexity behind a smaller, simpler public surface. A rich interface can keep call chains short by concentrating capability instead of scattering it across layers.

Arena returns one synthesized design package. Its synthesis decision fills the rationale's "Synthesis decision" section.

## Phase C: Agree

- In **Direct Mode** (`../../mode/direct-mode/SKILL.md`), if open architectural or product forks remain or the user asked to review the design before coding ("/loegg architect with checkpoint", "설계 먼저 보여줘"), surface the synthesized design (and resolve open questions via `../grill/SKILL.md` if needed) before implementing. Otherwise proceed directly to Phase D.
- In **Agent Mode** (`../../mode/agent-mode/SKILL.md`), proceed directly to implementation with the synthesized design without pausing.

The synthesis can ship as its own commit either way, as the "scaffold first" mode of the **Foundational Thinking** principle in `../../SKILL.md`. Planned and scoped breakage during fill-in is fine, per the **Outcome-Oriented Execution** principle. For adversarial pressure on the design before implementing, run `../interrogate/SKILL.md` (`interrogate`) on the synthesized sketch.

If the user pushes back on the shape, treat that as Phase A evidence. Re-ground and re-run Phase B before writing more code.

## Phase D: Implement against the sketch

Replace `not implemented` bodies with code, pseudocode with logic. The synthesized sketch is the contract. Deviations from it are signal to surface, not friction to absorb silently. If a function needs a parameter the sketch didn't anticipate, ask whether the sketch was wrong, the requirement was missed, or the implementation is overreaching.

## Phase E: Scrap when the architecture is wrong

If implementation keeps producing friction the sketch can't absorb, throw the sketch out. Don't bolt fixes onto a wrong design, per the **Redesign from First Principles** and **Fix Root Causes** principles in `../../SKILL.md`.

The signal is a _pattern_, not single instances. Tells:

- The same shape of workaround appearing repeatedly across unrelated code.
- Multiple unrelated edge cases that all need special-case branches.
- Types that need escape hatches (`any`, casts, optional fields always set in practice) to compile.
- The "we need a lock" reflex when the sketch said the state wasn't shared.
- Callers having to know the abstraction's internal rules to use it.
- Two or more independent Phase D deviations of the same shape across the implementation.

Use judgment. A few edge cases don't condemn an architecture. Some problems are legitimately complex. Complexity in the data is not complexity in the design.

When you scrap:

1. Re-run `../how/SKILL.md` (`how`) over what's been built.
2. Redesign as if the new constraints had been day-one assumptions, per **Redesign from First Principles**.
3. Subtract before adding, per **Subtract Before You Add**. The new sketch should be smaller than the old one before it grows.
4. Return to Phase B and re-run `arena`.

## Outputs

The caller's usage is written first and the type sketch derived from it. One file with new types and signatures for small changes. Module map plus type definitions for larger work. The rationale ships alongside, shaped per `references/rationale-template.md`, including the usage sketch and the synthesis decision.
