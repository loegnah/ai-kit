# Stage 2: Technical Specification (spec.md)

Translate `intent.md` into technical requirements, architecture design, and policy specifications in `spec.md`.

## Language

Respond in the same language the user is using (e.g., Korean if the user communicates in Korean). Match the user's language for artifact content and discussions.

## Arguments

- `target` (optional): Path to target story directory (e.g. `docs/story/2026-09-06-feature/`).

## Constraints

- Translate business language from `intent.md` into concrete interface specifications and system architecture.
- Actively apply project and organizational policies (security, authentication, error handling, UX, performance).
- Explicitly surface technical risks or conflicting policies under the `Areas of Concern` section.

## Execution Steps

1. **Locate Target Directory & `intent.md`**
   - If argument provided, resolve `<target_dir>`.
   - If omitted:
     - Search `docs/story/` for the most recently modified directory containing `intent.md`.
   - Read `<target_dir>/intent.md`. If missing, report error and instruct user to run `/dev-lgnh intent` first.

2. **Explore Codebase Context & Policies**
   - Inspect existing codebase architecture, directory layout, types, and relevant APIs.
   - Review project rules (`CLAUDE.md`, `AGENTS.md`, configuration files).
   - Address open questions and constraints identified in `intent.md`.

3. **Write `spec.md`**
   - Save to `<target_dir>/spec.md` using the standard template:
     ```markdown
     # Technical Specification: [Feature Name] (Based on: intent.md YYYY-MM-DD)

     - Author / Reviewer: [Author / Reviewer]
     - Status: [Draft | Approved]

     ## 1. Architecture Overview

     - Integration architecture connecting existing systems with new features (data flow, component relationships)

     ## 2. Functional Requirements

     - Feature 1: Inputs, validation rules, expected outcomes
     - Feature 2: Processing conditions and edge cases

     ## 3. Interfaces & Data Contracts

     - API endpoint specifications (HTTP method, path, request/response JSON schema)
     - DB schema changes or event message/type definitions

     ## 4. Policies & Standards Applied

     - Security: Authentication/authorization, permission scopes, sensitive data handling
     - Performance: Caching strategies, external API timeouts, resource limits
     - UX / Error Handling: User feedback guidance on error conditions

     ## 5. Areas of Concern & Policy Conflicts

     - Potential policy conflicts, system limitations, or technical risks
     - Resolution and decisions regarding open questions from intent.md
     ```
4. **Report & Guide Next Step**
   - Summarize generated `spec.md`, explicitly highlighting any entries under `Areas of Concern`.
   - Guide next step: Inform the user to review/approve the specification, then run `/dev-lgnh plan <target_dir>` (or `/dev-lgnh plan`) to formulate the Stage 3 implementation plan.
