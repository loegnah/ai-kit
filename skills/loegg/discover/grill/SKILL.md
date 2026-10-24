---
name: loegg-grill
description: Stress-test a plan, decision, or underspecified request in frontier rounds until reaching a shared understanding.
disable-model-invocation: true
---

# Grill

Interview the user relentlessly until you reach a shared understanding. Map the problem as a **design tree**: every decision branches into the decisions that hang off it.

## Rules

1. **Work the tree in rounds.** The **frontier** is every load-bearing decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round, number each question, and give your recommended answer. Wait for the user's answers before the next round.
2. **High-leverage filter.** Only put decisions on the frontier that materially change architecture, data shape, edge-case behavior, or scope. Do not interrogate trivial implementation details.
3. **Facts are your job; decisions are the user's.** Never ask the user for a fact you can look up in the codebase, filesystem, or tools. Read the code (or dispatch a `scout` if broad exploration is needed) to settle factual prerequisites first, then present only the open decisions to the user.
4. **Word each question so "yes" accepts your recommended answer.**
5. **Recompute the frontier each round.** Settled decisions push the frontier outward and unblock downstream questions. A question whose answer depends on another question still open in this round belongs to a _later_ round.
6. **Do not act until the frontier is empty.** Once every branch of the design tree is settled and nothing is left silently assumed, confirm shared understanding before writing code or running a build playbook.

## Round Format

```markdown
❓ **Q1** - **<question title>**: <question body and tradeoffs/options>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body and tradeoffs/options>

➡️ <your recommended answer>
```
