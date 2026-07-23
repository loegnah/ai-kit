---
name: lgnh-summarize-session
description: "Use when the user requests to summarize the work done during the current session into a markdown file at the project root."
---

# LGNH Summarize Session

Create a detailed, time-agnostic markdown summary of the current session's work and place it in the project root.

## Quick Start

When the user asks to summarize the session, follow this structure to generate the file `summarize-{timestamp}.md` in the project root.

## Markdown Format

Use the following `##` headers as the table of contents. Write in Korean if the request or session context is in Korean.

```markdown
# 작업 요약 (Session Summary)

## 목적 및 배경

[Describe the goal of the session and why this work was necessary]

## 전반적인 작업 내용 요약

[Provide a chronological or logical summary of the changes made, files modified, and implemented features]

## 문제점 및 해결방식

[Describe any major errors, challenges encountered, and how they were resolved]
```

## Guidelines

- **File Name**: `summarize-{timestamp}.md` (e.g., `summarize-20260706-1446.md`). Use the current timestamp formatted as `YYYYMMDD-HHMM` in UTC or local timezone.
- **Time-Agnostic**: Write in a way that is useful for anyone reading this in the future. Avoid relative time references like "yesterday" or "today".
- **Code Snippets**: Minimize code block usage. Only include code where it is absolutely necessary to explain a complex solution or error.
- **Table of Contents**: The main sections must use `##` (h2) markers.
