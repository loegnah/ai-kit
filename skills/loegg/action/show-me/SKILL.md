# Show Me (Visual Explainer)

Help the user understand the current topic, architecture, control flow, or file changes visually with concise diagrams, code-shape sketches, and focused visual artifacts ("그림으로 보여줘", "도식/다이어그램/콜트리로 보여줘", "시각화해줘"). Skip preambles and keep prose to 1–2 supporting sentences per visual.

## Arguments

- `topic` (optional): The concept, architecture, code flow, or file changes to visualize. If omitted, visualize the active topic or recent changes in the current session.

## Core Visual Patterns

Pick the **1–2 smallest views** that make the key point immediately clear:

1. **Logic / Algorithm**: Concise pseudocode

   ```text
   on(save)
     if content is unchanged
       return cached result
     write new content
     return fresh result
   ```

2. **Runtime Control Flow**: Hierarchical call tree

   ```text
   submitForm
     createSession
       persistPrompt
       launchAgent
     navigateToSession
   ```

3. **UI Structure**: Component tree with boundaries and relevant state

   ```tsx
   <SessionPage> (apps/example/src/routes/session.tsx)
     useSessionEvents()
     <SessionToolbar>
       <RunSkillButton> (packages/ui)
   ```

4. **File Architecture / Refactor**: Shallow annotated file tree

   ```text
   src/
   ├── commands/       # parses user actions
   ├── sessions/       # owns session state
   └── transport/      # sends API requests
   ```

5. **Interaction / State / Flow**: Mermaid diagram

   ```mermaid
   sequenceDiagram
       participant User
       participant UI
       participant Daemon
       User->>UI: choose command
       UI->>Daemon: send expanded prompt
       Daemon-->>UI: stream result
   ```

6. **Changes / Transitions**: Targeted structural diff matching the topic shape
   - Component change:
     ```diff
      <SessionPage>
        useSessionEvents()
        <SessionToolbar>
     +    <RunSkillButton />
        <SessionTimeline>
     +    <SkillResultCard />
     ```
   - File layout change:
     ```diff
      src/
      ├── commands/
     +│   └── show-me.ts
      ├── sessions/
     -└── transport.ts
     +└── transport/
     +    ├── client.ts
     +    └── stream.ts
     ```
   - Call tree change:
     ```diff
      submitForm
        createSession
          persistPrompt
     +    expandSkillMention
          launchAgent
     -  navigateToSession
     +  navigateToSession
     +    subscribeToEvents
     ```

7. **Target Code**: Short verbatim snippet when exact syntax or ordering is the point.

8. **Dense Layout / Geometry / UI Preview**: Inline SVG (` ```svg `) or self-contained HTML artifact when Mermaid or text trees cannot express spatial layout.

## Execution Steps

1. **Clarify Target**: Ground the target from the user's argument, recent conversation, or active diff (`file:line`).
2. **Select Representation**: For architecture, workflows, sequences, data flow, or lifecycles, use [`../archify/SKILL.md`](../archify/SKILL.md) when the user asks for a standalone diagram for sharing, presentation, or review, or when 1–2 inline views would obscure important boundaries, branches, or failure paths. Repository size and "make it look nice" alone do not qualify.
3. **Deliver One Representation**: If Archify succeeds, deliver its artifact without redrawing it inline. If blocked, state why and fall back to an inline view. Otherwise, pick the smallest fitting views from the patterns above; keep only the calls, files, states, and boundaries that answer the question.
