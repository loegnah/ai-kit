# Mattpocock Skill Catalog

Curated external skills catalog for `mattpocock`.

## Primary Entrypoint

- **Default Workflow**: `ask-matt`
- **Path**: `catalog/mattpocock/ask-matt/SKILL.md`
- **Instruction**: When invoking this catalog without a specific sub-task keyword, start by reading and executing this primary workflow.

## Available Skills (38)

| Skill                           | Description                                                                                                                              | Path                                                        |
| :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| `ask-matt`                      | Ask which skill or flow fits your situation.                                                                                             | `catalog/mattpocock/ask-matt/SKILL.md`                      |
| `chief-of-staff`                | Pursue a long-running goal in a single session by co-ordinating subagents.                                                               | `catalog/mattpocock/chief-of-staff/SKILL.md`                |
| `claude-handoff`                | Hand the current conversation off to a fresh background agent that picks up the work immediately.                                        | `catalog/mattpocock/claude-handoff/SKILL.md`                |
| `code-review`                   | Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes: Standards (does the code...                  | `catalog/mattpocock/code-review/SKILL.md`                   |
| `codebase-design`               | Shared vocabulary for designing deep modules.                                                                                            | `catalog/mattpocock/codebase-design/SKILL.md`               |
| `diagnosing-bugs`               | Diagnosis loop for hard bugs and performance regressions.                                                                                | `catalog/mattpocock/diagnosing-bugs/SKILL.md`               |
| `domain-modeling`               | Build and sharpen a project's domain model.                                                                                              | `catalog/mattpocock/domain-modeling/SKILL.md`               |
| `git-guardrails-claude-code`    | Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, branch -D, etc.                                     | `catalog/mattpocock/git-guardrails-claude-code/SKILL.md`    |
| `grill-me`                      | A relentless interview to sharpen a plan or design.                                                                                      | `catalog/mattpocock/grill-me/SKILL.md`                      |
| `grill-with-docs`               | A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.                               | `catalog/mattpocock/grill-with-docs/SKILL.md`               |
| `grilling`                      | Grill the user relentlessly about a plan, decision, or idea.                                                                             | `catalog/mattpocock/grilling/SKILL.md`                      |
| `handoff`                       | Compact the current conversation into a handoff document for another agent to pick up.                                                   | `catalog/mattpocock/handoff/SKILL.md`                       |
| `implement`                     | Implement a piece of work based on a spec or set of tickets.                                                                             | `catalog/mattpocock/implement/SKILL.md`                     |
| `implement-spec`                | Implement the result of /to-spec and /to-tickets in code.                                                                                | `catalog/mattpocock/implement-spec/SKILL.md`                |
| `improve-codebase-architecture` | Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.            | `catalog/mattpocock/improve-codebase-architecture/SKILL.md` |
| `loop-me`                       | Grill me about specs for the workflows I want to build, within this workspace.                                                           | `catalog/mattpocock/loop-me/SKILL.md`                       |
| `migrate-to-shoehorn`           | Migrate test files from as type assertions to @total-typescript/shoehorn.                                                                | `catalog/mattpocock/migrate-to-shoehorn/SKILL.md`           |
| `pr`                            | Use when writing a PR body.                                                                                                              | `catalog/mattpocock/pr/SKILL.md`                            |
| `prototype`                     | Build a throwaway prototype to answer a design question.                                                                                 | `catalog/mattpocock/prototype/SKILL.md`                     |
| `research`                      | Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo.                       | `catalog/mattpocock/research/SKILL.md`                      |
| `retro`                         | Conduct a retrospective on a coding session.                                                                                             | `catalog/mattpocock/retro/SKILL.md`                         |
| `scaffold-exercises`            | Create exercise directory structures with sections, problems, solutions, and explainers that pass linting.                               | `catalog/mattpocock/scaffold-exercises/SKILL.md`            |
| `setup-matt-pocock-skills`      | Configure this repo for the engineering skills: set up its issue tracker, triage label vocabulary, and domain doc layout.                | `catalog/mattpocock/setup-matt-pocock-skills/SKILL.md`      |
| `setup-pre-commit`              | Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo.                                 | `catalog/mattpocock/setup-pre-commit/SKILL.md`              |
| `setup-ts-deep-modules`         | Wire dependency-cruiser into a TypeScript repo so each package is a deep module, with implementation hidden in subfol...                 | `catalog/mattpocock/setup-ts-deep-modules/SKILL.md`         |
| `tdd`                           | Test-driven development.                                                                                                                 | `catalog/mattpocock/tdd/SKILL.md`                           |
| `teach`                         | Teach the user a new skill or concept, within this workspace.                                                                            | `catalog/mattpocock/teach/SKILL.md`                         |
| `to-questionnaire`              | Turn a decision you can't fully answer into a questionnaire for someone else to fill in.                                                 | `catalog/mattpocock/to-questionnaire/SKILL.md`              |
| `to-spec`                       | Turn the current conversation into a spec and publish it to the project issue tracker: no interview, just synthesis o...                 | `catalog/mattpocock/to-spec/SKILL.md`                       |
| `to-tickets`                    | Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edge...                 | `catalog/mattpocock/to-tickets/SKILL.md`                    |
| `triage`                        | Move issues and external PRs through a state machine of triage roles, categorise, verify, grill if needed, and write agent-ready briefs. | `catalog/mattpocock/triage/SKILL.md`                        |
| `wait-what`                     | Stop.                                                                                                                                    | `catalog/mattpocock/wait-what/SKILL.md`                     |
| `wayfinder`                     | Plan a huge chunk of work (more than one agent session can hold) as a shared map of decision tickets on your issue tr...                 | `catalog/mattpocock/wayfinder/SKILL.md`                     |
| `wizard`                        | Generate an interactive bash wizard that walks a human through steps only they can perform.                                              | `catalog/mattpocock/wizard/SKILL.md`                        |
| `writing-beats`                 | Writing, exploit; assemble raw material into a journey of beats, grounding each term before a beat leans on it.                          | `catalog/mattpocock/writing-beats/SKILL.md`                 |
| `writing-for-agents`            | Writing documents for agents.                                                                                                            | `catalog/mattpocock/writing-for-agents/SKILL.md`            |
| `writing-fragments`             | Writing, explore: mine raw fragments, no structure yet.                                                                                  | `catalog/mattpocock/writing-fragments/SKILL.md`             |
| `writing-shape`                 | Writing, exploit: shape raw material into an article, paragraph by paragraph.                                                            | `catalog/mattpocock/writing-shape/SKILL.md`                 |

## Execution & Composition Guidelines

1. **Orientation**: Read this index first to become aware of all available skills in this catalog.
2. **Primary Flow**: Follow the primary workflow (`catalog/mattpocock/ask-matt/SKILL.md`) as the default approach.
3. **Proactive Composition**: While executing the primary workflow or when specific tasks arise (e.g. testing, debugging, reviewing, planning), proactively read and utilize the relevant sub-skills from the table above.
