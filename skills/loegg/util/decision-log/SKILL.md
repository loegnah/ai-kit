# Decision Log

Execution utility attached to long-running, autonomous, multi-phase, or unattended work: keep one append-only TSV decision trail so a human who steps away can audit the result from evidence instead of trusting a summary.

Use **decision-log** when:

- The session runs in Agent Mode (`../../mode/agent-mode/SKILL.md`) or the user steps away ("끝까지 알아서 해", "자고 올게", "run until done").
- A playbook names it: `../../playbooks/figure-it-out.md`, `../../playbooks/hillclimb.md`, `../../playbooks/multi-phase-plan.md`, `../../playbooks/pause-safely.md`.
- Work spans enough forks, pivots, or reverts that the final diff alone cannot show why it took its shape.

Other skills route their audit trail here instead of inventing one. Reference this file and let it own the format.

## Format

One TSV file, one row per decision. Cells stay single-line. Evidence is a pointer, not prose. Start a clean log from `references/decision-log-template.tsv`.

- **ts.** ISO8601 UTC timestamp.
- **phase.** The phase, workstream, or iteration id.
- **decision.** What was chosen or done, one line.
- **why.** The reason in plain words. Name a principle plainly when one drove it, not as a jargon tag.
- **evidence.** A pointer that proves it: commit SHA, PR number, `file:line`, command output path, artifact or screenshot path. Never a paragraph.
- **result.** The outcome or predicate state: `tests green`, `reverted`, `pixel-diff 0`, `INCONCLUSIVE`, `open`.

```
ts	phase	decision	why	evidence	result
2026-05-24T09:02:00Z	frame	counted the work first, about 100 components	wanted the size before a long run	commit 3a9f1c2	found 5 blockers to settle first
2026-05-24T11:15:00Z	widget	moved widget styles without changing the look	keep the change small and identical	commit 7c21e0a, pixel-diff 0	identical, tests pass
2026-05-24T12:30:00Z	widget	discarded a worker's result because its screenshots were blank	checked the real files instead of its summary	worktree reset	reverted, tightened the brief
```

## Logging a row

Run `scripts/log.sh <logfile> <phase> <decision> <why> <evidence> <result>`. It stamps `ts`, writes the header on first use, strips tabs and newlines, and prefixes any cell starting with `=`, `+`, `-`, or `@` with a single quote so the log is safe to open in a spreadsheet. A bare `printf` append works too, but apply the same sanitizing when cells come from generated or user-supplied text.

Log decision points and checkpoints, not every action: a fork chosen, a unit completed with its verification result, a pivot or revert with its trigger, a blocker surfaced, a gate fixed. For loops, one row per iteration. Skip the trivial and self-evident. Write rows the way you would tell a teammate, following `../../SKILL.md` (`## Writing the reply`).

### Multiple runs on one log

A run is one agent conversation, including its later turns and any summary of it. A pickup, a replacement agent, or a new chat starts a new run. When a run appends to a log that already has rows, its first row has phase `start`, and so does its first row after another run's `start` row. A run returning to a log in a later turn first reads the last rows to see whether another run wrote since. A `start` row names the `ts` range of earlier rows this run did not write, and its evidence names this run (session id or agent id). Use phase `start` for nothing else.

## Where it lives

- Default: a working artifact, not committed. Use `decisions.tsv` in the work dir, or `.audit/<task-slug>.tsv` when several efforts run at once, and keep it out of git.
- Commit it only when the work is ambitious enough that a reviewer needs the trail to trust the result.
- A playbook may name its own path (for example `hillclimb.md`); the format stays the same.

## Rules

- Append-only. A wrong call gets a new row that supersedes it. Never edit or delete history.
- Prefer evidence produced by committed or rerunnable scripts over one-off checks (**Build the Lever**, **Encode Lessons in Structure** in `../../SKILL.md`).

## Before handing back

### Audit the log against the transcript

Read this run's transcript (locations per harness in `../../action/recall/SKILL.md`; only the active workspace, never other projects). Walk this run's rows, from each of its `start` rows (or the first row if it created the log) to the next `start` row of another run:

- Every row maps to a real decision or action.
- Each row's evidence resolves and shows what the row claims.
- A fork, pivot, or abandoned approach that shaped the work but is not logged is a gap. Add it.

Correct the log, not the story. Never edit or remove a row, even a wrong one. Add a superseding row with what actually happened and a pointer that resolves. Rows from other runs are out of this audit's scope unless this run's work proves one wrong.

### Cross-model review of the trail

Spawn one read-only subagent from a model family different from the one that did the work. Pick it from `review runners` in `~/.agents/loegg/models.md` (configured via `../../action/setup/SKILL.md`), skipping entries in the parent's family and `inherit-parent` / `auto`. If no other-family entry runs, use the harness's reviewer role and disclose that self-family review is a diversity limit. It reads the trail and the transcript, and flags what the user should look at. It does not redo the work.

- Decisions logged with weak or absent evidence.
- Verification steps skipped or claimed without proof in the transcript.
- Choices that look risky in hindsight (premature, scope-creeping, papering over a symptom).
- Gaps the user would miss on a casual skim.

Every reply for a run that produced a trail ends with an **Attention** section: first the reviewer's model on its own line (`reviewed by <model>`), then each flag pointing at specific rows or moments. "No flags" is a valid value. The model name is not optional.

## Reading the trail

Read top to bottom, follow evidence pointers, spot-check. `column -s$'\t' -t decisions.tsv` renders it in a terminal; GitHub renders a committed TSV as a table.
