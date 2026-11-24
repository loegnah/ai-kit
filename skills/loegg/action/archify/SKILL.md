# Archify

Create a source-grounded, reproducible diagram for design, review, or sharing. `/loegg archify [topic]` takes this path even for a small topic; `show-me` and other workflows can use the same procedure when warranted. If no topic is given, use the active topic or change.

## Prepare

1. Resolve the separately installed Archify skill through the harness (`skill://archify` where supported), or look in the project and user `.agents/skills/archify/` and `.claude/skills/archify/` directories. Use an installation containing both `SKILL.md` and `bin/archify.mjs`. Read its `SKILL.md` for type selection, authoring, and repair; this action sets the permissions and path rules. Do not install or update tools automatically.
2. Reuse Node.js 18+ and Chrome/Chromium (`ARCHIFY_CHROME` can point to an installed executable). If a prerequisite is missing, or the requested scope is read-only, report the blocker. In an automatic invocation the caller can still give an inline explanation; do not call it an Archify result.

## Run and report

- Choose the diagram type from the question. Ground repository-backed diagrams in Archify's required evidence at a pinned revision. If the requested view depends on uncommitted changes, stop and explain the evidence limit rather than diagramming an older revision.
- Use a fresh `.archify/<type>-<slug>-<timestamp>/` under the target project for `candidate.json`, the standalone HTML, and verification receipts. Resolve the paths first and keep all writes inside the project, even when the installed skill is elsewhere.
- Set `TMPDIR`, `TMP`, and `TEMP` to a fresh project-local scratch directory for the child process; on macOS also set `MAC_CHROMIUM_TMPDIR` there for Chrome's socket. Set `ARCHIFY_UPDATE_CHECK_DISABLED=1` to prevent the update lookup and cache. If the browser cannot run within the allowed write scope, report it as blocked. Remove only the scratch directory created for the run.
- Run the installed `bin/archify.mjs` with Node from the target project using `finalize` and the selected quality profile. Pass `--repo-root` for repository-backed diagrams. Keep the candidate, HTML, and receipts for reproduction. Link them on success and distinguish automated browser checks from visual inspection. If a gate fails after Archify's focused repair steps, report the failed gate; do not present partial HTML as a verified result.
