# Setup Loegg

Configure which models and reasoning budgets **loegg** uses when spawning subagents.

## Settings File Path

- **Canonical path (Single Source of Truth)**: `~/.agents/loegg/models.md`
- **Claude Code auto-load (optional symlink)**: If `~/.claude/rules` exists, link `~/.agents/loegg` into it (`ln -sfn ~/.agents/loegg ~/.claude/rules/loegg`) so Claude Code loads `models.md` automatically while keeping a single file to maintain.
- **Other harnesses (OMP, OpenCode, Codex, Pi, etc.)**: **loegg** skills (`util/arena.md`, `action/analyze.md`) read `~/.agents/loegg/models.md` directly when selecting subagent models.

> **Repository boundary rule**: When editing inside a repository whose `AGENTS.md` forbids touching files outside the repo root, do not write to `~/.agents/` unless the user explicitly runs `/loegg setup` outside that restriction.

## Step 1. Detect available models & load current state

1. **Detect models**: Enumerate the model slugs your subagent tool accepts in this session (or run the harness model-listing command if available). If detection is unavailable, ask the user which model slugs they use. Never write an unverified model slug.
   - Special aliases `inherit-parent` and `auto` are always valid (they mean: omit the `model` parameter so the subagent inherits the parent chat model or the harness's built-in role tier, such as OMP's `scout1~2` and `implementer1~4`).
2. **Load existing config**: If `~/.agents/loegg/models.md` already exists, read its `# budget:` line and role entries as the starting state. Drop any retired role keys not listed in Step 3.

## Step 2. Choose reasoning budget

Ask the user for their preferred reasoning budget using the structured-question tool (naming the current budget if `~/.agents/loegg/models.md` already exists):

- `unlimited — max reasoning`: Use `max` reasoning effort across roles.
- `large — xhigh reasoning` (Recommended): Default `xhigh` reasoning effort.
- `medium — high reasoning`: Step down one level (`high`).
- `small — medium reasoning`: Step down two levels (`medium`).

### Applying the budget

Map the chosen budget to the effort suffix of every real model slug (`:max` / `:xhigh` / `:high` / `:medium` or `-max` / `-xhigh` / `-high` / `-medium`). If a model does not support the target effort level, fall back to the highest supported effort at or below the target. Leave `inherit-parent` and `auto` unchanged.

## Model Guide (Available Models & Characteristics)

| Model                        | Summary                                                                           | Best Fit                                                     |
| :--------------------------- | :-------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| `opus-5.5`                   | Deepest architecture judgment, tradeoff synthesis, and prose quality.             | `arena runners` (Base), `arena cross-judge pool`             |
| `sonnet-5.5`                 | Balanced design reasoning, code reading, and implementation speed.                | `arena runners`, `analyze runners`, `parallel workers`       |
| `haiku-5.5`                  | Fast, lightweight Claude worker for bounded coding slices.                        | `parallel workers`                                           |
| `gpt-6.1-sol`                | Strongest root-cause debugging, security auditing, and strict logic verification. | `analyze runners`, `arena runners`, `arena cross-judge pool` |
| `gpt-6.1-terra`              | End-to-end feature/API building and structured code generation.                   | `arena runners` (Build), `parallel workers`                  |
| `gpt-6-luna`                 | Fast general-purpose OpenAI coding and reasoning.                                 | `parallel workers`, `analyze runners`                        |
| `gemini-4-argon`             | Large-context architecture, multi-file refactoring, and code review.              | `arena runners`, `arena cross-judge pool`, `analyze runners` |
| `gemini-3.8-flash`           | High-speed repo scanning, log/doc synthesis, and fast daily execution.            | `analyze runners`, `parallel workers`                        |
| `deepseek-v4.1-flash`        | Ultra-fast code search, scout exploration, and low-cost parallel worker.          | `parallel workers`, fast `analyze runners`                   |
| `muse-spark-1.3-contributor` | Fast alternative scout/worker with diverse reasoning path.                        | `parallel workers`, secondary `analyze runners`              |

> **Panel diversity rule (`arena` / `analyze`)**: Always pair at least **two distinct model families** (e.g., `opus-5.5` + `gpt-6.1-sol` + `gemini-4-argon`) so candidates do not share blind spots.

## Step 3. Configure per-role subagent models

Build the working role table using the detected models (adjusted for the Step 2 budget). Present the table and ask via the structured-question tool whether to accept defaults or customize specific roles:

| Role                     | Recommended Models                                                    | Why this combination works                                                                                                                                              |
| :----------------------- | :-------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arena runners`          | `opus-5.5:xhigh, gpt-6.1-sol:xhigh, gemini-4-argon:high`              | **3-family panel**: `opus-5.5` (architecture/design Base) + `gpt-6.1-sol` (strict logic/edge-case verification) + `gemini-4-argon` (broad structural/refactoring view). |
| `arena cross-judge pool` | `gpt-6.1-sol:high, gemini-4-argon:high, opus-5.5:high`                | **Cross-family judge pool**: Picks one model from a family different from the parent chat model to score the rubric without self-bias.                                  |
| `analyze runners`        | `gpt-6.1-sol:xhigh, gemini-4-argon:high, sonnet-5.5:high`             | **Root-cause & Q&A investigators**: `gpt-6.1-sol` (debugger/auditor strength) + `gemini-4-argon` (wide repo context) + `sonnet-5.5` (code flow synthesis).              |
| `parallel workers`       | `gpt-6.1-terra:high, gemini-3.8-flash:high, deepseek-v4.1-flash:high` | **Fast implementation workers**: `gpt-6.1-terra` (builder) + `gemini-3.8-flash` / `deepseek-v4.1-flash` for high-speed non-overlapping slice edits.                     |

**Harness fallback rule (e.g., OMP)**: If the harness forbids passing `model` to `task`, set roles to `inherit-parent` (or omit `model` at spawn time) and fan out using the harness's configured role agents (`debugger` / `reviewer` / `architect` / `scout1~2` for analysis and arena; `implementer1`~`implementer4` / `builder` for implementation).

## Step 4. Validate & write `~/.agents/loegg/models.md`

1. Verify every non-alias slug in the final table is available in the user's harness (or confirmed by the user).
2. Create `~/.agents/loegg/` if needed and write `~/.agents/loegg/models.md` (overwriting the whole file so re-runs stay idempotent):

```markdown
# loegg model configuration. One line per role. Delete a line to fall back to skill defaults.

# `inherit-parent` or `auto`: omit the subagent `model` parameter (use parent model or harness role defaults).

# budget: large (xhigh)

arena runners: opus-5.5:xhigh, gpt-6.1-sol:xhigh, gemini-4-argon:high
arena cross-judge pool: gpt-6.1-sol:high, gemini-4-argon:high, opus-5.5:high
analyze runners: gpt-6.1-sol:xhigh, gemini-4-argon:high, sonnet-5.5:high
parallel workers: gpt-6.1-terra:high, gemini-3.8-flash:high, deepseek-v4.1-flash:high
```

3. If `~/.claude/rules` exists on the machine, create or update the symlink `ln -sfn ~/.agents/loegg ~/.claude/rules/loegg`.
4. Confirm the written path (`~/.agents/loegg/models.md`) and active role mappings to the user.
