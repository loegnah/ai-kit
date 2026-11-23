# Pause safely

**You own a clean stop. Leave a checkpoint a cold-start agent can resume from.** The complement to the session pickup path in `../action/recall/SKILL.md`.

Use only on an explicit pause ("여기서 멈춰", "pause", "내일 이어서"), going offline, a harness restart, or imminent context compaction. On "keep going" or "don't stop", do not pause.

1. Stop at a safe boundary. Finish the current atomic step or back out of it. Start nothing new, and stop any running subagents.
2. Take no irreversible action to pause. No push and no PR unless one was already out.
3. Write the resume note off-context: when and why you stopped, where (last checked box and what is half-done), what is verified, next steps, key files, and gotchas. Where it goes:
   - `docs/story/<story-dir>/PLAN.md` exists: write it as that file's `## Paused` section, replacing any earlier one. Check off every box that passed its gate first.
   - Only `INTENT.md` exists: update its `Direction` and `Open questions` instead.
   - Neither exists: save it in the scratchpad or `$TMPDIR` as `<slug>-resume.md`.

   If a decision log exists (`../util/decision-log/SKILL.md`), add a row for the pause and point at the log instead of duplicating it.

4. Make the work durable. Commit uncommitted edits, including the note when it landed in `docs/story/`, as one `wip: <what>` commit on the current branch, staging only files this task changed (`git add <files>`, never `-A`). If the tree is broken, say so in one line of the commit body. On the default branch, create a work branch first.

**Reply** (following `../SKILL.md` `## Writing the reply`): where you are in the loop, what is on disk versus still only in your head (paths, no diff dumps), the commits made and whether the tree is clean, the resume-note path, and the first action on resume. This is a pause, not a final report.
