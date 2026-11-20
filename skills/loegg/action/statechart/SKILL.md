# Statechart

Run pstack's TLA+ model checker and show the Mermaid statechart and rule-violation paths from its report. Use only for `/loegg statechart`; for visualization without model checking, use `/loegg show-me`.

## Prepare

1. Resolve `../../../dev-lgnh/catalog/pstack/statechart/` relative to the real path of this action file. If the catalog is absent, say that this action needs the sibling `dev-lgnh` skill and stop.
2. Reuse existing tools. If `TLA2TOOLS` is set, validate that it is an absolute path to a readable JAR and resolve `JAVA` (or `java` on `PATH`) to an existing executable. Shared paths outside the target repository are valid. Otherwise, take the Java and TLC tool specs from `JAVA_TOOL` and `TLC_TOOL` in pstack's `scripts/run.ts`. Look up the installed tools with `mise which java --tool "$java_tool"` and `mise where "$tlc_tool"`, setting `MISE_OFFLINE=true` and `MISE_AUTO_INSTALL=false` for both lookups. The latter directory must contain a readable `tla2tools.jar`.
3. If anything needs a download or installation, name the missing tools, say where they would be installed, and ask for explicit approval before running any command that can download them. `/loegg statechart` alone is not approval; no or no answer means stop. If `mise` itself is missing, give the [installation instructions](https://mise.jdx.dev/installing-mise.html); do not install it yourself. After approval, only if repository rules allow the shared cache write, run `mise install` with the missing tool specs and repeat the offline lookups. If repository rules prohibit the write, stop and ask the user to prepare the shared tools separately.
4. Use the supplied `.tla` spec and `.cfg`, or derive a bounded model and config from the code and rules the user wants checked. State which behavior the model omits. Read the upstream `SKILL.md` for its model, view, and report instructions; this action overrides its tool setup, scratch path, and renderer instructions.

## Run

Resolve paths before running. Keep the spec, config, any generated view, per-run temp directory, and output inside the target repository; do not follow those paths outside it. Create the per-run temp directory and use a new or empty output directory. Always pass the resolved `TLA2TOOLS` and `JAVA` paths so the checker cannot enter pstack's automatic install path. From the repository root on POSIX:

```sh
TLA2TOOLS="$jar" JAVA="$java" MISE_OFFLINE=true MISE_AUTO_INSTALL=false \
  TMPDIR="$temp" TEMP="$temp" TMP="$temp" \
  "$statechart_dir/scripts/statechart" "$spec" --config "$config" --out "$out"
```

The launcher selects Node, Bun, or Deno. On Windows, set the same environment variables for the child process and run Bun with `scripts/statechart.ts` and the same arguments. If no supported runtime is on `PATH`, check for an installed Bun via the same offline lookup (`mise which bun --tool bun`). Run `mise install bun` only after approval, then invoke Bun by its resolved path with `scripts/statechart.ts`. Do not use `mise exec` to fetch a runtime implicitly.

Use absolute paths in the command. Append `--view "$view"` only for a trusted local view module. Remove only the temp directory created for the run; keep the output and any generated model needed to reproduce it.

## Report

- Exit `0`: no rule checked by TLC was broken. Exit `1`: a rule broke; read the generated report. Other exits are failed or interrupted checks, not verdicts.
- Link `report.md`; show `chart.mmd` as a Mermaid block if the checker produced it. Give the shortest reported path and the broken rule for each finding. If a large model produced no chart, say so instead of drawing a substitute and calling it TLC output.
- Distinguish model findings from bugs reproduced against real code. Call out unchecked rules and model limits. Give the rerun command with a fresh output path.
