# Setup Loegg

Configure which providers, models, and reasoning budgets **loegg** uses when spawning subagents.

## Settings File Path

- **Canonical path (Single Source of Truth)**: `~/.agents/loegg/models.md`
- **Claude Code auto-load (optional symlink)**: If `~/.claude/rules` exists, link `~/.agents/loegg` into it (`ln -sfn ~/.agents/loegg ~/.claude/rules/loegg`) so Claude Code loads `models.md` automatically while keeping a single file to maintain.
- **Other harnesses (OMP, OpenCode, Codex, Pi, etc.)**: **loegg** skills (`util/arena.md`, `action/analyze.md`, `action/review.md`) read `~/.agents/loegg/models.md` directly when selecting subagent models.

> **Repository boundary rule**: When editing inside a repository whose `AGENTS.md` forbids touching files outside the repo root, do not write to `~/.agents/` unless the user explicitly runs `/loegg setup` outside that restriction.

## Step 1. Detect available models & load current state

1. **Detect providers and models**: Enumerate the provider-qualified model identifiers your subagent tool accepts in this session (or run the harness model-listing command if available). Keep each provider/model pair distinct. If detection is unavailable, ask the user for their providers and full model identifiers. Never infer a provider from a model family or write an unverified identifier.
   - Special aliases `inherit-parent` and `auto` are always valid (they mean: omit the `model` parameter so the subagent inherits the parent chat model or the harness's built-in role tier, such as OMP's `scout1~2` and `implementer1~4`). Never add a provider or effort suffix to aliases.
2. **Load existing config**: If `~/.agents/loegg/models.md` already exists, read its `# budget:` line and role entries as the starting state. Preserve existing provider prefixes. Resolve any old provider-less entries through detected pairs or user confirmation before saving; never silently assign a provider. Drop any retired role keys not listed in Step 3.

## Step 2. Choose reasoning budget

Ask the user for their preferred reasoning budget using the structured-question tool (naming the current budget if `~/.agents/loegg/models.md` already exists):

- `unlimited — max reasoning`: Use `max` reasoning effort across roles.
- `large — xhigh reasoning` (Recommended): Default `xhigh` reasoning effort.
- `medium — high reasoning`: Step down one level (`high`).
- `small — medium reasoning`: Step down two levels (`medium`).

### Applying the budget

Map the chosen budget to the effort suffix of every real model identifier (`:max` / `:xhigh` / `:high` / `:medium` or `-max` / `-xhigh` / `-high` / `-medium`, as accepted by the harness). Change only the effort suffix; preserve the provider and model name. Check supported effort levels for the selected provider/model pair, not just the model family. If that pair does not support the target effort level, fall back to the highest supported effort at or below the target. If it accepts no effort suffix, keep its verified identifier unchanged. Leave `inherit-parent` and `auto` unchanged.

## Model Guide (Available Models & Characteristics)

Recommendations below list model names only, without provider prefixes or effort suffixes. They are not identifiers to save or pass to subagent tools.

| Model                        | Summary                                                                           | Best Fit                                                                       |
| :--------------------------- | :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `opus-5.5`                   | Deepest architecture judgment, tradeoff synthesis, and prose quality.             | `arena runners` (Base), `arena cross-judge pool`, `review runners`             |
| `sonnet-5.5`                 | Balanced design reasoning, code reading, and implementation speed.                | `arena runners`, `analyze runners`, `parallel workers`                         |
| `haiku-5.5`                  | Fast, lightweight Claude worker for bounded coding slices.                        | `parallel workers`                                                             |
| `gpt-6.1-sol`                | Strongest root-cause debugging, security auditing, and strict logic verification. | `analyze runners`, `arena runners`, `arena cross-judge pool`, `review runners` |
| `gpt-6.1-terra`              | End-to-end feature/API building and structured code generation.                   | `arena runners` (Build), `parallel workers`                                    |
| `gpt-6-luna`                 | Fast general-purpose OpenAI coding and reasoning.                                 | `parallel workers`, `analyze runners`                                          |
| `gemini-4-argon`             | Large-context architecture, multi-file refactoring, and code review.              | `arena runners`, `arena cross-judge pool`, `analyze runners`, `review runners` |
| `gemini-3.8-flash`           | High-speed repo scanning, log/doc synthesis, and fast daily execution.            | `analyze runners`, `parallel workers`                                          |
| `deepseek-v4.1-flash`        | Ultra-fast code search, scout exploration, and low-cost parallel worker.          | `parallel workers`, fast `analyze runners`                                     |
| `muse-spark-1.3-contributor` | Fast alternative scout/worker with diverse reasoning path.                        | `parallel workers`, secondary `analyze runners`                                |

> **Panel diversity rule (`arena` / `analyze` / deep `review`)**: Always pair at least **two distinct model families** (e.g., `opus-5.5` + `gpt-6.1-sol` + `gemini-4-argon`) so candidates do not share blind spots. If the harness cannot provide distinct families, use its available agent roles and disclose the diversity limit.

## Step 3. Configure per-role subagent models

Use the table below to recommend model names, then resolve each selected model to a provider-qualified identifier before presenting the working role table. Ask via the structured-question tool whether to accept the resolved table or customize specific entries:

| Role                     | Recommended Models                                     | Why this combination works                                                                                                                                                            |
| :----------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `arena runners`          | `opus-5.5, gpt-6.1-sol, gemini-4-argon`                | **3-family panel**: `opus-5.5` (architecture/design Base) + `gpt-6.1-sol` (strict logic/edge-case verification) + `gemini-4-argon` (broad structural/refactoring view).               |
| `arena cross-judge pool` | `gpt-6.1-sol, gemini-4-argon, opus-5.5`                | **Cross-family judge pool**: Picks one model from a family different from the parent chat model to score the rubric without self-bias.                                                |
| `analyze runners`        | `gpt-6.1-sol, gemini-4-argon, sonnet-5.5`              | **Root-cause & Q&A investigators**: `gpt-6.1-sol` (debugger/auditor strength) + `gemini-4-argon` (wide repo context) + `sonnet-5.5` (code flow synthesis).                            |
| `review runners`         | `gpt-6.1-sol, opus-5.5, gemini-4-argon`                | **Independent change reviewers**: strict correctness/security checks + contract/design regressions + cross-file impact. Used by deep review; ordinary review stays in the main agent. |
| `parallel workers`       | `gpt-6.1-terra, gemini-3.8-flash, deepseek-v4.1-flash` | **Fast implementation workers**: `gpt-6.1-terra` (builder) + `gemini-3.8-flash` / `deepseek-v4.1-flash` for high-speed non-overlapping slice edits.                                   |

### Resolve providers per entry

1. For every selected model in every role, let the user choose its provider from detected pairs or enter a full identifier. If only one verified pair exists, offer it as the default; do not hard-code providers in recommendations.
2. When multiple providers offer the same model, ask which provider to use. Provider choice belongs to each entry, not to the entire setup or model family; different agents may use different providers for the same model.
3. Apply Step 2's budget to the selected pair and show the full identifier, such as `google-antigravity/gemini-4-argon:medium`. Preserve a user-supplied provider prefix exactly. If the supplied effort differs from the chosen budget, show the adjusted identifier before confirmation.
4. The final table must contain verified `provider/model:effort` identifiers (or the harness's verified provider-qualified syntax), or unchanged aliases. A different provider for the same underlying model does not count as a different model family.

**Harness fallback rule (e.g., OMP)**: If the harness forbids passing `model` to `task`, set roles to `inherit-parent` (or omit `model` at spawn time) and fan out using the harness's configured role agents (`debugger` / `reviewer` / `architect` / `scout1~2` for analysis, review, and arena; `implementer1`~`implementer4` / `builder` for implementation).

## Step 4. Validate & write `~/.agents/loegg/models.md`

1. Verify every non-alias entry includes its selected provider and is accepted by the user's harness with its final effort suffix (or confirmed by the user). If any provider remains unresolved, ask before writing; do not save bare model recommendations.
2. Create `~/.agents/loegg/` if needed and write `~/.agents/loegg/models.md` (overwriting the whole file so re-runs stay idempotent). Use the confirmed role table, not the recommendation table. The following example illustrates the format only; its providers and effort support must not be assumed available:

```markdown
# loegg model configuration. One line per role. Delete a line to fall back to skill defaults.

# `inherit-parent` or `auto`: omit the subagent `model` parameter (use parent model or harness role defaults).

# Real entries retain the full provider/model identifier and supported effort suffix.

# Provider names below are examples, not defaults. Replace with confirmed identifiers.

# budget: large (xhigh)

arena runners: anthropic/opus-5.5:xhigh, openai-codex/gpt-6.1-sol:xhigh, google-antigravity/gemini-4-argon:high
arena cross-judge pool: openai-codex/gpt-6.1-sol:high, google-antigravity/gemini-4-argon:high, anthropic/opus-5.5:high
analyze runners: openai-codex/gpt-6.1-sol:xhigh, google-antigravity/gemini-4-argon:high, anthropic/sonnet-5.5:high
review runners: openai-codex/gpt-6.1-sol:xhigh, anthropic/opus-5.5:xhigh, google-antigravity/gemini-4-argon:high
parallel workers: openai-codex/gpt-6.1-terra:high, google-antigravity/gemini-3.8-flash:high, deepseek/deepseek-v4.1-flash:high
```

3. If `~/.claude/rules` exists on the machine, create or update the symlink `ln -sfn ~/.agents/loegg ~/.claude/rules/loegg`.
4. Confirm the written path (`~/.agents/loegg/models.md`) and active role mappings, including each provider, to the user.
