# Prototype

**You own the design decision, not production code. The prototype is a throwaway instrument to settle a design or empirical fork cheaply; the real build follows `playbooks/feature.md`.**

This is the one playbook where the **Laziness Protocol**'s "smallest production change" and the production verification bar invert in favor of **Exhaust the Design Space** (`../SKILL.md`). Prioritize speed of comparison over code polish. Explore variations, throw weak approaches away, and pick the winner from live observation.

1. Scope the decision the prototype exists to make: which layout, which interaction, which density, or—for an empirical/technical fork—which behavior, timing, or library approach. If there is no open decision to settle, skip the prototype and route directly to `playbooks/feature.md`.
2. Gather references when the design space is open. In Direct Mode, summarize the candidate directions and let the user pick or refine if needed; when the direction or fork is already clear (or in Agent Mode), proceed directly.
3. Build throwaway in an isolated scratch directory (`/tmp/prototype-<slug>/`), separate from production source:
   - **Visual / UI decision**: vanilla HTML/CSS/JS, inline SVG (`../action/show-me/SKILL.md`), or the lightest standalone setup that renders the idea.
   - **Behavioral / timing / architecture decision**: the smallest standalone script that exercises the exact question.
   - Do not pollute production files, tests, or abstractions.
4. When comparing alternatives, build 2–3 variants behind one switcher (buttons, keypress, or CLI flag) with each variant clearly labeled (**Exhaust the Design Space** in `../SKILL.md`).
5. Observe on the matching surface: render and drive each visual variant (capturing screenshots if helpful) or run the behavioral/timing script and log the output. Here, live observation is the test.
6. Present the variants, observed evidence, tradeoffs, and your recommended winner. Once the decision is made, hand the chosen direction to `playbooks/feature.md` (or `../action/architect/SKILL.md`) for the real build and clean up scratch artifacts when done.

**Reply** (following `../SKILL.md` `## Writing the reply`): the variants explored, the observed evidence (outputs, timings, or visuals), tradeoffs, your recommendation, and the scratch path. State plainly that the prototype is throwaway.
