---
name: loegg-interrogate
description: "Adversarial stress-test of a change or design where adversaries try to break the code and only findings proven by a real run survive. Invoked via `/loegg interrogate` or triggered during a loegg workflow."
disable-model-invocation: true
---

# Interrogate

Adversaries try to break a change or a design. A finding survives only when a run proves it. Report the findings. Do not apply fixes.

## Frame

The scope is what the user names. Otherwise it is the branch diff from its merge base with the base branch, through the working tree. State the intent in your own words from the user's message, the commits, and the PR description. Ask the user (or use `../grill/SKILL.md`) when the intent is unclear.

## Fan out

Run Phase 1 (steps 4–5) and Phase 2 of `../../util/arena/SKILL.md` (`arena`), with four changes. Read the `review runners` role from `~/.agents/loegg/models.md` (configured via `../setup/SKILL.md`) in place of `arena runners`. Copy the scope's uncommitted changes into each isolated workspace/worktree. Spawn each adversary with execution access so it can run repros (following the subagent rules in `../../SKILL.md` and `../setup/SKILL.md`). In place of the arena task and rationale, give each adversary the scope, the intent, and this brief:

> Break this change. Prove each finding with a run against the real code, such as a failing test, a repro script, or command output that shows the wrong behavior. For a design or plan, run a prototype or probe the current tree. Keep repros in your own worktree. Report each finding with a title, the exact command, the output it printed, and the output the intent requires. Leave out anything you did not run. That covers style, naming, structure, and risks that need a future change to matter. No findings is a valid result.

## Verify

Verify each finding in the main agent (per arena Phase 4 fact-checking) by rerunning its command against the code. Keep a finding when the output shows the failure and the failure breaks the intent. Drop the rest. Merge findings that share a root cause.

Skip arena Phase 3 (Base selection) and Phase 4 grafting: adversaries find different failures, so the verdict keeps every verified finding rather than picking a single Base list.

## Output

- **Intent**: the restatement.
- **Findings**: for each verified finding, the command, its output, how it breaks the intent, and the adversaries that found it. Say "no verified findings" when none survive.
- **Dropped**: for each adversary, the count of dropped findings and why.
