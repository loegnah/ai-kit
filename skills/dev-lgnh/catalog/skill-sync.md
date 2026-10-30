# Project Skill Sync (`skill-sync` / `update-skills`)

Audit and update project-local skills so they stay aligned with the current codebase (scripts, file paths, tech stack, and project rules).

## Language

Respond in the user's language (default Korean if the conversation is in Korean). Catalog instructions are in English.

## Arguments

- `target` (optional): Specific skill directory, file path, or skill name to audit and update. If omitted, scan all project-local skill directories.

## Boundaries & Exclusions

1. **Project-Local Only**:
   - Scan ONLY local skill directories inside the current project root: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.omp/skills/`, and `skills/`.
   - NEVER read, modify, or touch global paths (`~/.claude/`, `~/.agents/`, `~/.omp/`, or anything outside the repository root).
2. **Skip Vendored / Locked Skills**:
   - Check `skills-lock.json` or catalog `INDEX.md` files for upstream-vendored catalogs (e.g., `superpowers`, `mattpocock`, `pstack`).
   - Do NOT edit vendored upstream skills unless the user explicitly targets them; report any drift separately as upstream-managed.

## 7-Point Drift Checklist

Check each local skill (`SKILL.md` and its supporting files) against the live repository:

| #   | Check Area                    | What to Compare Against                                                       | Common Drift Examples                                                                                       |
| :-- | :---------------------------- | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| 1   | **Commands & Scripts**        | `package.json`, `Makefile`, `justfile`, CI workflows                          | Outdated package manager (`npm`/`yarn` vs `bun`/`pnpm`), renamed scripts, old linter (`eslint` vs `oxlint`) |
| 2   | **File & Directory Paths**    | Actual repository directory tree                                              | Moved or deleted folders (`src/pages` -> `src/app`), renamed config files, stale glob patterns              |
| 3   | **Tech Stack & Dependencies** | `package.json`, `Cargo.toml`, `pyproject.toml`, config files                  | References to removed libraries, deprecated CLI flags, or replaced frameworks                               |
| 4   | **Project Rules Alignment**   | Root `AGENTS.md`, `CLAUDE.md`, `docs/rule/`                                   | Skill enforces conventions that contradict or duplicate current root project instructions                   |
| 5   | **Triggers & Frontmatter**    | `SKILL.md` frontmatter (`name`, `description`, `disable-model-invocation`)    | Stale domain keywords in `description`, missing `disable-model-invocation: true` on heavy workflows         |
| 6   | **Internal References**       | Relative links inside the skill (`catalog/*.md`, `references/*`, `scripts/*`) | Broken relative paths, missing templates, or unregistered catalog files in dispatcher tables                |
| 7   | **Dead or Duplicate Skills**  | Overlap across local skills and current product features                      | Skills for deleted features, or duplicate rules across multiple skills that should be consolidated          |

## Execution Steps

### 1. Discover Local Skills & Project Context

- Find all local skill files under `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.omp/skills/`, and `skills/` (or the user-specified `target`), excluding vendored lockfile paths.
- Read project ground-truth context: `package.json` (or equivalent manifest), root `AGENTS.md` / `CLAUDE.md`, and top-level directory structure.

### 2. Audit Against the 7-Point Checklist

- Inspect each discovered skill and its referenced sub-files.
- Verify every mentioned command, script name, file path, and dependency against the repository.
- Classify findings into:
  - **Safe Updates**: Broken paths, renamed scripts, outdated commands, missing dispatcher entries, frontmatter fixes.
  - **Structural Changes**: Deleting obsolete skills, merging duplicates, or changing core workflow rules.

### 3. Apply or Confirm

- **Safe Updates**: Apply directly to the skill files.
- **Structural Changes**: Present a concise summary table (`Skill` | `Drift Found` | `Proposed Change`) and ask the user before deleting files or altering core workflow behavior.
- Leave up-to-date skills untouched.

### 4. Verify & Report

- Verify all updated relative paths and dispatcher tables resolve cleanly.
- If the project defines a lint/format check (e.g., `bun run check`), run it on the modified files.
- Output a concise report of updated skills (`File` | `What Changed`) and any structural items awaiting confirmation.
