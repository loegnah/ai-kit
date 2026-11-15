# Optional skill behavior trial

Use only for an approved change addressing repeated unwanted agent behavior evidenced in the session, or when the user explicitly requests a behavioral evaluation. Skip routine wording, reference, and typo edits. This is not a new gate for every skill edit.

## Define the trial

- Name one observed failure and the action or output that would count as correct. Judge observable behavior, not whether the agent quotes the rule.
- Reuse a small task from the session with enough repository facts to decide correctly. Add a counterexample where the rule should not apply (for example, a one-line fix versus independent multi-file work).
- Use isolated scratch state inside the repository. Do not drive a shared app, use production data, send external messages, or write outside the repository for a trial.

## Compare current and proposed instructions

1. Before editing, run the failure scenario in a fresh agent context with the current skill. Save the task, supplied facts, instructions, and observed actions or output in repository-local scratch state.
2. Apply the approved edit. Run the same task in another fresh context with only the skill text changed; keep the model, tools, facts, and settings the same where the harness permits. Then run the counterexample with the revised skill. Use only these three runs initially, not an arena or a full workflow per run.
3. Compare against the expected behavior. If the old skill passes too, report that no improvement was demonstrated. If the new skill fails or breaks the counterexample, report the failure and revise only within the approved scope; do not broaden the trial automatically.
4. Record the scenario, expected and observed behavior, and any limits in the reflection summary, then remove scratch state and stop only processes the trial started. A text-only trial cannot establish tool-use behavior; disclose that limit. If isolated runs are unavailable, report the behavior as unverified rather than treating your own reading as a pass.

## Choose the smallest correction

- Missing output element: add the required slot to the existing template.
- Wrong output shape: show the intended structure rather than adding a prohibition list.
- Wrong trigger: state the observable condition under which the rule applies.

One comparison is a smoke check, not proof of reliable improvement across models or tasks. Do not claim the edit worked unless the observed comparison supports it.
