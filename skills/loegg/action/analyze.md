# Analyze

Find root causes of bugs or answer complex codebase/architecture questions by dispatching the **exact same question** to multiple read-only subagents in parallel, then having the main agent fact-check, cross-verify, and synthesize one definitive answer.

Read-only action: do **not** modify files.

## Step 1. Frame the Question & Grounding

1. **Clarify the target**: State the exact bug symptom, error trace, or question to answer in one clear paragraph.
2. **Gather seed context**: Collect the relevant entry files, stack traces, git changes, or reproduction clues so every subagent starts from the same facts without wasting turns rediscovering basics.
3. **Define the evaluation lens**: Identify what makes an answer high-signal for this request (e.g., proven code path `file:line`, mechanism of failure, ruled-out hypotheses, edge cases).

## Step 2. Fan Out Identical Question

Spawn 2+ read-only subagents concurrently in a single tool call (using `analyze runners` from `~/.agents/loegg/models.md` configured via `action/setup.md`, or `scout1` / `scout2` when the harness manages models per agent role):

- Give every subagent the **exact same question and seed context**.
- For explicit models, pass each complete configured identifier (`provider/model:effort`, or the harness's verified syntax) unchanged, including its provider prefix. Keep `inherit-parent` / `auto` as omitted `model` parameters; also omit `model` when the harness forbids explicit selection. Different providers for the same model do not provide model-family diversity.
- Require each subagent to investigate independently and return:
  1. **Direct answer / root-cause hypothesis** with exact `file:line` citations and runtime/code mechanism.
  2. **Ruled-out alternatives** (what else it checked and why that was not the cause).
  3. **Open uncertainties or edge cases** that could falsify its conclusion.

If a subagent fails or times out, proceed with the remaining responses and note the dropout.

## Step 3. Main Agent Fact-Check & Synthesis

Read every subagent's report end to end. As the lead agent, **never blindly average or stitch summaries together**:

1. **Verify claims against code**: Check cited `file:line` paths and call flows directly in the codebase. Immediately discard hallucinated symbols, misread control flow, or surface-level guesses lacking a mechanism.
2. **Cross-compare findings**:
   - **Consensus**: Claims multiple subagents reached independently and code verification confirms are highest confidence.
   - **Unique sharp catches**: If only one subagent spotted a real edge case or deeper root cause that holds up in the code, adopt and graft it into the core explanation (or follow `../util/arena.md` Base + Graft selection when one report is clearly superior).
   - **Conflicts**: When subagents contradict each other, inspect the exact code branch yourself to settle who is right and why the other misread it.

## Step 4. Deliver the Synthesized Answer

Present one coherent, evidence-backed response:

- **Conclusion / Root Cause**: Direct answer or confirmed root cause first, with exact `file:line` references and step-by-step mechanism.
- **Key Evidence & Ruled-Out Hypotheses**: Why this explanation holds and why competing explanations were rejected.
- **Recommended Next Step** (if applicable): Minimal fix direction, follow-up check, or tradeoff decision.
- **Subagent Synthesis Note**: Brief 1–2 line summary of where the subagents agreed, which unique insight was adopted, and what was dismissed during main-agent verification.
