# Investigation

**You own the answer. Route, verify, write. Read-only: the deliverable is a cited explanation or a recommendation, not a code change.**

Use this playbook for questions with no requested change: how does X work, why was Y built this way, are we sure about Z, what does this break, should we do X or Y.

1. Route to the matching action and run it:
   - Structure or runtime flow, placement ("어떻게 동작해?", "어디에 넣어야 해?") -> `../action/how/SKILL.md` (`how`).
   - Motivation, history, thresholds ("왜 이렇게 짰어?") -> `../action/why/SKILL.md` (`why`), alongside `how` when both matter.
   - Root-cause or hard Q&A needing independent perspectives -> `../action/analyze/SKILL.md` (`analyze`).
   - Downstream impact -> `../action/blast-radius/SKILL.md` (`blast-radius`).
   - Plain teaching of both how and why -> `../action/teach/SKILL.md` (`teach`).
2. Do not edit files. Throughput checkpoint stays one line: `throughput checkpoint: n/a, read-only investigation`. No change review is required because nothing changed.
3. For a decision between alternatives, give a recommendation with a tradeoffs table. When the deciding fact is observable by running something (behavior, timing, output), settle it with a throwaway check per `playbooks/prototype.md` instead of guessing or asking.
4. If the investigation shows a change is needed, stop and say so. Hand back to the user in Direct Mode, or route to `playbooks/bug-fix.md` / `playbooks/feature.md` in Agent Mode.

**Reply** (following `../SKILL.md` `## Writing the reply`): the routed action's output. For "are we sure?" questions, give your real judgment with reasons, and push back when the premise is wrong.
