---
name: loegg-reflect
description: "Spawn three parallel review lenses (Judgment, Tooling, Divergent) over the active session transcript, synthesize durable learnings in the main agent, and route approved improvements into skills or structural checks. Invoked via `/loegg reflect`."
disable-model-invocation: true
---

# Reflect

Mine the current conversation for durable learnings, then route them into skill edits.

Invoke when the user runs `/loegg reflect` or asks to reflect on the session. Skip when the conversation is trivial, off-topic, or already covered by an existing skill the parent followed correctly. One-offs are not learnings.

## 1. Locate the active transcript

Before fanning out, find this conversation's transcript in the active workspace's session directory. Do not glob across every project's directory. That crosses workspace boundaries and reads private chats from unrelated projects.

Where the transcript lives depends on your harness:

- **Cursor:** the `agent-transcripts/` directory the system prompt names.

  ```bash
  ls -t <agent-transcripts>/*.jsonl <agent-transcripts>/*/*.jsonl <agent-transcripts>/*/subagents/*.jsonl 2>/dev/null | head -10
  ```

  That covers the legacy flat (`<id>.jsonl`), current nested (`<id>/<id>.jsonl`), and subagent (`<parent>/subagents/<child>.jsonl`) layouts. For each candidate, read the first JSONL line. Take the file whose `message.content[0].text` contains the conversation's opening user prompt.

- **Claude Code:** `~/.claude/projects/<slug>/<session-id>.jsonl`, where `<slug>` is the workspace path with every character that isn't a letter or digit turned into "-".
- **Pi:** `~/.pi/agent/sessions/--<slug>--/*.jsonl`, where `<slug>` is the workspace path with the leading slash dropped and each "/" turned into "-".
- **Codex:** `~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl`. Keep only files whose first line has `payload.cwd` equal to the workspace path.
- **OMP:** `history://` or `~/.omp/agent/sessions/` for the active workspace.
- **Other harnesses:** check the harness's session directory for this workspace.

Outside Cursor, take the newest candidates first and confirm one by finding the conversation's opening user prompt in its first user message. If none matches, pass a tight digest of the session instead.

## 2. Spawn three reviewers in parallel

One message, three `Task` calls, `subagent_type: generalPurpose`, agent mode (`readonly: false`). Reviewers need MCP access to look up the tickets, chat threads, and observability traces the transcript references, and readonly strips MCPs.

**Other harnesses.** The spawns in this skill use Cursor's `Task` tool. In another harness, use its subagent tool: `Agent` in Claude Code (`subagent_type: general-purpose`), `task` in OpenCode (`subagent_type: general`), `spawn_agent` in Codex. Keep the prompt and the model. Drop parameters your tool doesn't have. If your harness has no subagent tool, as in Pi without an extension, run each role yourself, one after another.

Use the `review runners` role from `~/.agents/loegg/models.md` (configured via `../setup/SKILL.md`) for the three review lenses. Pass each configured `provider/model:effort` identifier unchanged, or omit `model` when unconfigured, set to `inherit-parent` / `auto`, or restricted by the harness (following `../../SKILL.md` `Execution Mode & Subagents`).

| Lens      | Role line (`~/.agents/loegg/models.md`) | Prompt template                    |
| --------- | --------------------------------------- | ---------------------------------- |
| Judgment  | `review runners`                        | `references/judgment-reviewer.md`  |
| Tooling   | `review runners`                        | `references/tooling-reviewer.md`   |
| Divergent | `review runners`                        | `references/divergent-reviewer.md` |

Pass each template verbatim, substituting the transcript path or digest where marked. Reviewers return findings in the subagent response body.

## 3. Synthesize

Once all three reviewers return, the main agent spot-verifies cited claims (reading code or calling MCP tools as needed without modifying state) and synthesizes the findings directly using the criteria and output table in `references/synthesizer.md`, producing the Accepted / Rejected / Backlog lists.

## 4. Structural enforcement check

Move any Accepted item that a lint rule, script, metadata flag, or runtime check would enforce more reliably to Backlog, per the **Encode Lessons in Structure** principle in `../../SKILL.md`.

## 5. Apply

Present the synthesizer's full Accepted / Rejected / Backlog output and wait for explicit approval before applying any Accepted edit. The user picks the subset and may redirect routings. Skill changes affect every future agent in the org. Do not auto-apply. If rows are already approved, continue here with that subset rather than restarting the review or asking for approval again.

For an approved edit targeting repeated unwanted agent behavior evidenced in the session, or an explicit request to evaluate skill behavior, use [`references/skill-eval.md`](references/skill-eval.md) before applying the edit. Routine wording, reference, and typo edits do not trigger behavioral trials; do not load the reference for them.

Keep Backlog items in the summary. File to an external devex or backlog tracker only when the user explicitly authorizes that external action.

Before approval, show the canonical repository-local destination from project rules (in this repository, `skills/`). Edit approved source files there in place. Never edit `plugins/cache/`, copy skills to home/global folders, or modify paths outside the repository. Never open a PR or push.

Follow each approved row's Routing exactly:

- Trivial existing-skill edit (a one-line bullet, a tightened sentence, a stale fact corrected): the parent does it directly.
- Substantive existing-skill edit (a new section, a new pattern table, more than ~10 lines): edit the target skill file directly following its existing layout and the conventions in `../../SKILL.md`.
- `tune description: <skill path>` (the skill exists but didn't trigger when it should have): update the skill's `description` frontmatter or trigger line in `../../SKILL.md` so future runs match it.
- `new skill: <kebab-name>`: create the new action or skill file following the repository's skill structure and register it in its parent `SKILL.md`.

If your environment ships a SKILL.md validator, run it on every touched skill before declaring done.

## 6. Summarize for the user

Short list, no preamble:

- Edits applied: `<skill path>`. What changed, one line each.
- New skills created: `<skill path>`. One line each (rare).
- Backlog: proposed items, or externally filed items with links when explicitly authorized.
- Dropped: one line per rejected finding + reason from the synthesizer.
