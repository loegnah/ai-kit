---
name: loegg-sharpen
description: "Rewrite a prompt so the task gets deeper, not bigger: what a top professional would add, the rawest material, their methods, and an outside check. Returns the prompt and does not do the task. Invoked via `/loegg sharpen <prompt>` or when the user asks to sharpen a prompt."
disable-model-invocation: true
---

# Sharpen

Rewrite the user's prompt into a deeper version of the same task, not a bigger one. Return the prompt. Do not start the task. The user reviews the prompt and sends it, for example with `/loegg <prompt>` or `/loegg agent <prompt>`.

## When it runs

- The user calls `/loegg sharpen <prompt>` or asks in words ("프롬프트 다듬어줘", "이 요청 더 깊게 만들어줘", "보내기 전에 날카롭게 해줘").
- Direct Mode only: when a vague request needs a deep result (research, comparison, performance, debugging), do not run this action. Start the task and add one line to your first message that names what `/loegg sharpen` would add. Skip the line for small or clear tasks.
- Agent Mode: never run or suggest `sharpen` on your own judgment. Run it only when the user asks.

If the user gave no prompt, use the last task request in the conversation. If there is none, ask for the prompt.

## Steps

Before rewriting, answer four questions about the task:

1. What would a top professional in this field do here that the user is not asking for?
2. What is the rawest material they would start from, instead of what has already been digested?
3. Which specific methods and tools would they use?
4. What, other than the agent or the user, would show the result is right?

Then rewrite the prompt to ask for exactly that. Keep the user's goal and scope. Deeper means better sources, methods, and checks, not more deliverables.

Have the rewritten prompt ask the agent to prototype any choice an experiment can settle and recommend an option based on what it observed. Leave product or preference choices that no experiment can settle for the user.

**Reply:** the four answers in short bullets, then the rewritten prompt in one fenced block the user can copy. Write in the user's language.
