---
name: loegg-setup
description: "Configure general-purpose subagents and role mappings for OMP (`@<role>` routing) and Claude Code (`opus`/`sonnet`/`haiku` subagents) used across ordinary sessions and loegg workflows. Invoked via `/loegg setup`."
disable-model-invocation: true
---

# Setup Loegg

Configure general-purpose specialist subagents for **OMP** and **Claude Code** so both everyday work and **loegg** multi-agent workflows (`arena`, `analyze`, `review`, `ui-audit`, `interrogate`, `architect`, `how`, `why`, `recall`, `reflect`, `feature`) dispatch subagents by **agent name**, never by passing raw `provider/model:effort` strings at call time.

> **Repository boundary rule**: Inside a repository whose `AGENTS.md` forbids touching paths outside the repo root, do not modify `~/.omp/`, `~/.claude/`, or `~/.agents/` without explicit user approval.

## Core Design

- **No `~/.agents/loegg/models.md` or per-call `model` strings**: Neither OMP (with `task.perCallModel: off` by default) nor Claude Code (`Agent` tool accepts aliases only and runs on a single provider) supports passing `provider/model:effort` identifiers at spawn time. If legacy `~/.agents/loegg/models.md` or `~/.claude/rules/loegg` exists, remove it after confirming with the user.
- **Shared general-purpose specialist roster**: Both harnesses expose the same 10 general-purpose agent names (`architect`, `builder`, `debugger`, `analyst`, `refactorer`, `implementer`, `reviewer`, `security-reviewer`, `supervisor`, `scout`) without `loegg-` prefixes so they work identically in ordinary coding sessions and inside `/loegg`.
- **Harness-native model binding**:
  - **OMP**: Canonical role-based templates live in `agents/omp/*.md` and install into `~/.omp/agent/agents/*.md` (plus bundled overrides under `task.agentModelOverrides` in `~/.omp/agent/config.yml`). Every agent binds exclusively to **`@<role>`** aliases in `config.yml` (`modelRoles`), never concrete model names; multi-model roles in `config.yml` handle pool/random selection at the OMP layer.
  - **Claude Code**: Canonical subagent templates live in `agents/claude/*.md` and install or customize into `~/.claude/agents/*.md` using official frontmatter (`model: opus | sonnet | haiku`, `effort: low | medium | high | xhigh | max`). Because both template folders live inside `action/setup/agents/`, `npx skills add` ships them together with **loegg**.

---

## Step 1. Detect Target Harness

Identify which harness to configure from the current session's subagent tool (`task` with `tasks[]` -> **OMP**; `Agent` with `subagent_type` -> **Claude Code**), or ask via the structured-question tool whether to set up **OMP**, **Claude Code**, or **Both**.

---

## Step 2A. OMP Setup (Role-Based Routing Only)

Never write concrete `provider/model` identifiers into OMP agent files or **loegg** configs. Every OMP subagent resolves through `@<role>` entries in `~/.omp/agent/config.yml`.

### 1. Inspect existing OMP roles and agents

Read `~/.omp/agent/config.yml` (`modelRoles` and `task.agentModelOverrides`), `~/.omp/agent/agents/*.md`, and the canonical templates in `agents/omp/*.md`. Check them against the standard role-backed specialist roster:

| Agent               | Template / Source                   | Target in OMP                        | Bound `@<role>` Priority                            | Purpose                                                    |
| :------------------ | :---------------------------------- | :----------------------------------- | :-------------------------------------------------- | :--------------------------------------------------------- |
| `architect`         | `agents/omp/architect.md`           | `~/.omp/agent/agents/architect.md`   | `@architect`, `@debugger`, `@builder`, `@default`   | System architecture, module boundaries, design trade-offs  |
| `builder`           | `agents/omp/builder.md`             | `~/.omp/agent/agents/builder.md`     | `@builder`, `@refactorer`, `@worker`, `@default`    | Complex end-to-end feature, API, and UI implementation     |
| `debugger`          | `agents/omp/debugger.md`            | `~/.omp/agent/agents/debugger.md`    | `@debugger`, `@architect`, `@builder`, `@default`   | Root-cause bug hunting, repros, runtime/infra failures     |
| `analyst`           | `agents/omp/analyst.md`             | `~/.omp/agent/agents/analyst.md`     | `@analyst`, `@reviewer`, `@architect`, `@default`   | Long-context doc, log, transcript, and code-flow synthesis |
| `refactorer`        | `agents/omp/refactorer.md`          | `~/.omp/agent/agents/refactorer.md`  | `@refactorer`, `@architect`, `@builder`, `@default` | Multi-file structural refactoring and API migration        |
| `implementer`       | `agents/omp/implementer.md`         | `~/.omp/agent/agents/implementer.md` | `@worker`, `@smol`, `@default`                      | Fast parallel worker for non-overlapping slices            |
| `supervisor`        | `agents/omp/supervisor.md`          | `~/.omp/agent/agents/supervisor.md`  | `@architect`, `@debugger`, `@reviewer`              | Requirement compliance and completion verification         |
| `scout`             | OMP Bundled (`agentModelOverrides`) | `~/.omp/agent/config.yml`            | `@finder`                                           | Fast read-only codebase search and pattern discovery       |
| `reviewer`          | OMP Bundled (`agentModelOverrides`) | `~/.omp/agent/config.yml`            | `@reviewer`                                         | Code review for regressions and defects                    |
| `security-reviewer` | OMP Bundled (`agentModelOverrides`) | `~/.omp/agent/config.yml`            | `@auditor`                                          | Read-only security and strict logic auditing               |

_(Bundled `task` -> `@builder` and `sonic` -> `@lite` remain available for general OMP delegation.)_

### 2. Verify and confirm with the user

1. Check that every referenced `@<role>` (`architect`, `builder`, `debugger`, `analyst`, `refactorer`, `worker`, `finder`, `reviewer`, `auditor`, `lite`, `smol`, `default`) exists under `modelRoles` in `~/.omp/agent/config.yml`.
2. Flag any `~/.omp/agent/agents/*.md` file that hardcodes a `provider/model` string instead of `@<role>`, or any missing specialist agent file.
3. Present the detected `agent -> @role` mapping (alongside the current `modelRoles` pools from `config.yml`) via the structured-question tool and ask whether to:
   - Keep the current role-backed setup as-is (when all agents and `@<role>` mappings are already in place),
   - Install or update `~/.omp/agent/agents/<name>.md` from `agents/omp/<name>.md` (and/or add missing `task.agentModelOverrides` entries in `~/.omp/agent/config.yml`), or
   - Remap which `@<role>` backs specific agents.
4. When installing or updating `~/.omp/agent/agents/<name>.md`, copy the body from `agents/omp/<name>.md` and keep `model:` strictly as `@<role>` entries—never concrete model IDs.

---

## Step 2B. Claude Code Setup (`~/.claude/agents/*.md`)

Claude Code subagents are general-purpose Markdown files following the Claude Code subagent specification. Canonical templates live in `agents/claude/*.md` and install into `~/.claude/agents/*.md`.

### 1. Subagent frontmatter rules (Claude Code spec)

- **`name`**: General-purpose lowercase identifier (`architect`, `builder`, `debugger`, `analyst`, `refactorer`, `implementer`, `reviewer`, `security-reviewer`, `supervisor`, `scout`). Never prefix with `loegg-` or include `:`.
- **`model`**: Choose among `opus`, `sonnet`, `haiku` (or `inherit`).
- **`effort`**: Explicitly set `low`, `medium`, `high`, `xhigh`, or `max` in frontmatter. Without `effort`, switching to a different model resets Opus 5.5, Sonnet 5.5, and Haiku 5.5 subagents to `medium` effort; unsupported higher levels automatically clamp to the model's ceiling.
- **Tool restrictions**:
  - **Read-only specialists** (`analyst`, `reviewer`, `security-reviewer`, `supervisor`, `scout`): Set `disallowedTools: Write, Edit, NotebookEdit` and **omit `tools`**. Omitting `tools` preserves `Read`, `Grep`, `Glob`, `Bash`, and connected MCP servers (`mcp__*` needed by `why`/`analyze`) while strictly blocking file mutations.
  - **Write-capable specialists** (`architect`, `builder`, `debugger`, `refactorer`, `implementer`): Omit both `tools` and `disallowedTools` to inherit the full subagent tool pool.

### 2. Recommended Claude Code defaults

| Agent               | Mode          | Default `model` | Default `effort` | Role                                                       |
| :------------------ | :------------ | :-------------- | :--------------- | :--------------------------------------------------------- |
| `architect`         | Write-capable | `opus`          | `high`           | System architecture, module boundaries, design trade-offs  |
| `debugger`          | Write-capable | `opus`          | `high`           | Root-cause debugging, repros, runtime/test failures        |
| `reviewer`          | Read-only     | `opus`          | `high`           | Code review for bugs, regressions, and broken callers      |
| `security-reviewer` | Read-only     | `opus`          | `xhigh`          | Security boundaries, data-loss hazards, strict logic audit |
| `builder`           | Write-capable | `sonnet`        | `high`           | End-to-end feature, API, and UI implementation             |
| `refactorer`        | Write-capable | `sonnet`        | `high`           | Multi-file structural refactoring and dead-code removal    |
| `analyst`           | Read-only     | `sonnet`        | `high`           | Parallel codebase, log, spec, and MCP context synthesis    |
| `supervisor`        | Read-only     | `sonnet`        | `high`           | Requirement and acceptance-criteria verification           |
| `implementer`       | Write-capable | `sonnet`        | `medium`         | Fast parallel worker for bounded, non-overlapping slices   |
| `scout`             | Read-only     | `haiku`         | `high`           | Fast codebase file/symbol discovery                        |

### 3. Configure and write `~/.claude/agents/*.md`

1. Inspect existing `~/.claude/agents/*.md` if present, and read the canonical templates from `agents/claude/*.md`.
2. Ask the user via the structured-question tool whether to install/update `~/.claude/agents/*.md` from `agents/claude/*.md` with the defaults above, adjust global reasoning effort, or customize `model` (`opus` / `sonnet` / `haiku`) and `effort` (`low` / `medium` / `high` / `xhigh` / `max`) for specific agents.
3. Write the confirmed `~/.claude/agents/<name>.md` files, preserving each template's general-purpose `name`, `disallowedTools`, and prompt body while applying the chosen `model` and `effort`.
4. Remove `~/.claude/rules/loegg` if that legacy symlink exists. Never symlink anything into `~/.claude/rules/`.

---

## Step 3. Workflow-to-Agent Roster (`loegg` Dispatch Defaults)

Both OMP (`task` with `agent`, omitting `model`) and Claude Code (`Agent` with `subagent_type`, omitting `model`) map **loegg** workflows onto the same general-purpose specialist names:

| Workflow Slot                                     | Used By                                                                    | Default Specialist Agents                                                                                             |
| :------------------------------------------------ | :------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `arena runners` (Design / Review / Investigation) | `util/arena`, `action/architect`                                           | `architect`, `security-reviewer`, `refactorer` (use `debugger` in place of `refactorer` for bug root-cause arenas)    |
| `arena runners` (Build)                           | `util/arena` (Build mode)                                                  | `builder`, `refactorer`, `architect`                                                                                  |
| `arena cross-judge`                               | `util/arena` Phase 3, `util/decision-log`                                  | `security-reviewer` or `supervisor` (in Claude Code, skip cross-family requirement or disclose single-provider scope) |
| `analyze runners`                                 | `action/analyze`, `action/why`, `action/how`, `action/recall`              | `debugger`, `analyst`, `scout`                                                                                        |
| `review runners`                                  | `action/review`, `action/ui-audit`, `action/interrogate`, `action/reflect` | `reviewer`, `security-reviewer`, `supervisor`                                                                         |
| `parallel workers`                                | `playbooks/feature.md`, parallel implementation                            | `implementer` (bounded slices), `builder` (complex slices)                                                            |

If the user asks to customize which specialist agent names run specific workflow slots, save **agent names only** (never model identifiers) to `~/.agents/loegg/omp.md` (for OMP) or `~/.agents/loegg/claude.md` (for Claude Code):

```markdown
# loegg workflow agent overrides (agent names only; omit `model` at spawn time)

arena runners: architect, security-reviewer, refactorer
arena build runners: builder, refactorer, architect
arena cross-judge: security-reviewer
analyze runners: debugger, analyst, scout
review runners: reviewer, security-reviewer, supervisor
parallel workers: implementer
```

If the user accepts the default workflow roster above, no `~/.agents/loegg/*.md` file needs to be created. Confirm the active harness, verified specialist agents, and their `@<role>` (OMP) or `model`/`effort` (Claude Code) bindings to the user.
