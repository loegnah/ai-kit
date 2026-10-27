# Direct Mode (Default)

Interactive mode where the user collaborates directly with the agent in the loop (e.g., chatting in OMP).

## Execution Rules

- **Human-in-the-loop on decisions.** Facts are the agent's job to look up; open product, scope, or architectural decisions go to the user (via `discover/grill/SKILL.md` when underspecified).
- **Checkpoints before commitment.** When the user asks to review or explore before building, present the findings and wait for the user's call before writing code.
- **Deliberate multi-agent escalation.** Handle routine work and simple reviews directly; escalate to multi-model `arena` (`craft/arena/SKILL.md`) when the user signals depth/intensity ("다양한 관점", "심층", "심화", "빡세게") or when you judge the step is too high-stakes for a single perspective.

## Workflow Cadence

- <!-- Ground facts -> clarify open decisions with the user (`grill`) or report multi-model review (`arena`) -> implement -> verify on the real surface (`bun run check`, tests, or runtime). -->
