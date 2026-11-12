---
name: loegg-ui-audit
description: "Read-only UI, accessibility, state-completeness, and AI-slop audit of pages, components, or live URLs. Invoked via `/loegg ui-audit` or triggered when auditing frontend/UI quality."
disable-model-invocation: true
---

# UI Audit

Audit web pages, UI components, app screens, or live URLs for functional UI defects, accessibility/focus/motion gaps, missing interactive or data states, and machine-made AI-slop tells. Run standalone with `/loegg ui-audit [target]`, or when asked to inspect UI/frontend quality without changing code.

Read-only action: do **not** edit project files, stage changes, install packages, start unrequested dev servers, or pass flags that write into the repository (`--before`, `--kept`, or `--render` writing `.hallmark/`). Write any temporary browser screenshots only to `$TMPDIR` and delete them before finishing.

## Step 1. Establish Scope & Surface Type

1. **Resolve target**: Honor an explicit file, directory, route, or live `http(s)://` URL. If omitted, inspect current staged, unstaged, and non-ignored untracked UI files (`.html`, `.css`, `.jsx`, `.tsx`, `.vue`, `.svelte`, `.astro`). If no UI files or URLs are in scope, report **No UI targets to audit** and stop.
2. **Read project system first**: Check existing design tokens and conventions (`:root`, `tokens.css`, Tailwind config/theme, `design.md` / `DESIGN.md`, component primitives) before judging so intentional project brand tokens or utility conventions are not misreported as defects.
3. **Classify surface (`scope`)** so marketing-page rules never misfire on product screens:
   - **`app`** — dashboard, admin, console, settings, internal tool, or dense table/form workspace: judge hierarchy, density, responsive controls, keyboard/focus, and data/control states; skip marketing hero, fold, section-rhythm, and 80-word screen-budget rules.
   - **`component`** — single reusable UI element (button, input, field, modal, card, nav, tab, badge): judge tokens, contrast, focus/motion, layout stability, and interactive state coverage; skip page-level composition rules.
   - **`page`** — landing, marketing, or public content page: judge full Floor, AI-slop composition/copy tells, fold hierarchy, copy honesty, and responsive layout.

## Step 2. Run Mechanical Static Pass (When Available)

Resolve Hallmark's zero-dependency static checker relative to the real path of this skill file (`../../../dev-lgnh/catalog/hallmark/scripts/sloplint.mjs`, following symlinks).

- When present and local UI files are in scope, run:
  ```bash
  node <resolved-sloplint.mjs> <target-files-or-dirs> --scope <page|component|app> --json
  ```
  `sloplint.mjs` exits `1` when Floor findings exist—parse `stdout` JSON (`summary` and `findings[]`: `gate`, `grade`, `tier`, `file`, `line`, `evidence`, `fix`) regardless of exit status. Never pass `--before`, `--kept`, or `--render`.
- Filter and verify every mechanical hit against the real file (`file:line`):
  - Drop Gate `20` (missing Hallmark CSS stamp) unless the project actually uses Hallmark stamps.
  - Drop raw-token warnings (`24a`, `48`, `74`) when the project intentionally styles with standard Tailwind/CSS conventions rather than a strict `:root` token-only system.
- When `sloplint.mjs` is absent or the target is a live external URL only, skip this step and audit directly against Step 3.

## Step 3. Audit Against Two Tiers

Every retained finding must cite a concrete `file:line` (or route + DOM selector on a live URL) and user-visible impact.

### 1. `[Floor]` — Functional, Accessibility, Layout & Honesty Defects

- **Keyboard & focus**: Interactive controls missing instant `:focus-visible` (>= 3:1 contrast) or using `outline: none` without replacement; input `border-width` shifting across states; tooltips delaying focus; auto-rotating carousels/marquees without hover and focus pause.
- **Motion & script resilience**: `transition: all` or animating layout box properties (`width`, `height`, `top`, `left`); transitions/keyframes without `prefers-reduced-motion: reduce`; reveal classes hiding content at rest (`opacity: 0` / `visibility: hidden`) with no JS-off fallback (`.js` scoping or `@starting-style`).
- **Responsive & overflow**: Horizontal scroll traps across 320px–1920px (`100vw` widths, missing `overflow-x: clip`, image grid tracks on bare `1fr` instead of `minmax(0, 1fr)`, unbreakable headings without `min-width: 0`, wrapping button or primary nav labels).
- **Contrast & legibility**: Body/UI contrast below threshold (4.5:1 body, 3:1 large text/icons/field borders), unreadable text over tinted/accent fills, or strained font sizes (< 12px prose, < 11px functional UI).
- **Missing UI states**:
  - **Data regions (`app` / stateful views)**: Must handle all **4 states**—`loading` (shape-matched skeleton/indicator), `empty` (clear explanation + primary action), `error` (what failed + recovery action), and `populated`. Drawing only the happy path is an incomplete screen.
  - **Interactive controls & forms**: Check the **8 control states** (`default`, `hover` gated by `@media (hover: hover)`, `:focus-visible`, `:active`, `disabled` with native `disabled`/`aria-disabled` + visual + cursor, `loading` without width jump, `error` with `aria-invalid` + `aria-describedby` message rather than color alone, `success`). Visible `<label>` required (placeholder is never the label).
- **Dishonest UI**: Forms or buttons showing fake completion ("Sent", "Saved", "Subscribed") with no real request/handler wired; invented metrics, testimonials, ratings, or customer logos.

### 2. `[Slop]` — Machine-Made Defaults & Visual Craft Tells

- **AI surface & layout clichés**: Purple-to-blue/pink gradients, floating blurred glow orbs behind text, cards nested inside cards, 3 equal icon-in-colored-circle feature cards, hand-drawn fake browser/OS traffic-light bars, emoji standing in for UI icons, decorative toasts for already-visible state changes.
- **Typography & copy tells** (`page` scope especially): Inert uppercase/tracked-caps eyebrows above headings (`FEATURES`, `TRUSTED BY`), a single italic or accent-colored word inside a heading, monospace used as decorative label costume on non-code metadata, middle-dot meta strings (`A · B · C`) or arrows glued to link labels (`Learn more →`), generic AI buzzword copy ("seamless", "elevate", "supercharge", "built for modern teams").
- **Cold visual check (when a live URL or already-running preview is available and a browser tool exists)**: Capture desktop (`1440x900`) and mobile (`375x812`) screenshots to `$TMPDIR` (and remove them afterward). Judge what is actually painted without excusing intent: squint-test hierarchy, clipped/overlapping text, dead empty bands, and—when comparing before vs. after—**anything the previous screen did better**.

## Step 4. Choose Audit Depth

- **Default**: Run directly in the main agent without spawning subagents.
- **Deep / multi-angle**: When the user asks for depth ("다각도로", "다양한 관점", "심층", "심화", "빡세게", "깊게", `arena`), run `../../util/arena/SKILL.md` in read-only Review mode using **`review runners`** (configured via `../setup/SKILL.md`). Verify every retained finding against the actual files or rendered surface in the main agent and deduplicate.

## Step 5. Deliver Report

1. **Read (2–3 lines)**: Audited target + classified scope (`page` / `component` / `app`), at least one strength that already works and should stay, and finding counts (`Floor` vs. `Slop`).
2. **Findings** (grouped by tier, highest impact first):
   - **`[Floor] Short actionable title` — `file:line`**: Failure condition, user-visible impact, and minimal fix.
   - **`[Slop] Short actionable title` — `file:line`**: Machine-made tell or craft issue, whether project context excuses it, and minimal fix.
   - If nothing actionable remains, say **No UI findings**.
3. **Fix Depth & Limits**: Recommend the lightest fix depth that resolves the findings (`polish` = tokens/states/tells in place; `restyle` = keep layout, replace visual system; `redesign` = recompose layout) and state verification limits (`sloplint` static pass run vs. skipped; live browser render inspected vs. static-only).
