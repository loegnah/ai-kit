# Pause safely

**You own a clean stop. Leave a checkpoint a cold-start agent can resume from.** The complement to the session pickup path in `../action/recall/SKILL.md`.

Use only on an explicit pause ("여기서 멈춰", "pause", "내일 이어서"), going offline, a harness restart, or imminent context compaction. On "keep going" or "don't stop", do not pause.

1. Stop at a safe boundary. Finish the current atomic step or back out of it. Start nothing new, and stop any running subagents.
2. Take no irreversible action to pause. No push and no PR unless one was already out.
3. Make the work durable. Commit uncommitted edits as one `wip: <what>` commit on the current branch, staging only files this task changed (`git add <files>`, never `-A`). If the tree is broken, say so in one line of the commit body. On the default branch, create a work branch first.
4. Write the resume note off-context: intent, what you were doing, progress and what is verified, current state, next steps, key files, and gotchas. Save it as `docs/story/YYMMDD-<title>/RESUME.md` when a `PLAN.md` exists there, otherwise in the scratchpad or `$TMPDIR` as `<slug>-resume.md`. If a decision log exists (`../util/decision-log/SKILL.md`), add a row for the pause and point at the log instead of duplicating it.

**Reply** (following `../SKILL.md` `## Writing the reply`): where you are in the loop, what is on disk versus still only in your head (paths, no diff dumps), the commits made and whether the tree is clean, the resume-note path, and the first action on resume. This is a pause, not a final report.
