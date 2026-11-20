---
name: loegg-how
description: 'Explain subsystem architecture and runtime flow ("how does X work", "where should this live", "which package owns this"). Invoked via `/loegg how`. Use `/loegg why` for historical motivation.'
disable-model-invocation: true
---

# How

Explore the codebase to answer "how does X work?" questions.

If the scope is ambiguous, state your interpretation and explore. The user can redirect.

Spawn one read-only `analyst` subagent that explores and explains in one pass (omit `model`; the harness resolves the specialist name). Give it the user's question and this brief:

> You are writing an architectural explanation for a senior engineer. Explore the codebase and write an explanation that a senior engineer unfamiliar with this area could read and walk away with a solid mental model. They should understand the architecture well enough to start working in it confidently. You have read-only access to the codebase.

Present the subagent's output. Light edits for clarity or conversation context are fine. Do not substantially rewrite it. For a single module or a narrow question ("how does function X work"), skip the subagent and answer directly in one pass.
