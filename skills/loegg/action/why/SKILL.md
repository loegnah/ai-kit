---
name: loegg-why
description: "Answer why code is shaped this way from the record, not the code: commits and PR discussions first, connected sources only if that trail is thin. Invoked via `/loegg why`. Use `/loegg how` for runtime behavior."
disable-model-invocation: true
---

# Why

Answer from the record, not the code: read the commits and PR discussions that introduced the target and each later change, and other sources only if that trail is thin. Cite what the authors wrote, mark your own inferences as inferences, and say what the record does not answer.

Build the anchor first: file paths and line ranges, key symbols, the last few commits touching the target (`git log --oneline -20 -- <file>`, `git blame -L <start>,<end> <file>`), and the PR bodies behind substantive commits (`gh pr view <number> --json title,body,comments,reviews`). If the target is vague, make your best guess from conversation context, state it briefly, and proceed.

If the record is thin, extend to the connected issue tracker, docs, chat, and observability MCPs — one pass each, no fan-out. A wide multi-source sweep belongs to `/loegg recall`, not here.

Keep the confidence separation: what the record says, what you can reasonably infer, what you don't know. If the question is a precursor to changing the code, convert the lineage into Preserve / Change / Avoid / Risk constraints for the plan.
