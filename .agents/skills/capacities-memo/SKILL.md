---
name: capacities-memo
description: Creates and records a new "Memo" type object inside the "mcp" collection using the Capacities API.
---

# Capacities Memo Skill

Creates a memo entry in the "mcp" collection as a "Memo" type object using the Capacities API and a Bun script (`scripts/create-capacities-memo.ts`). Input markdown content (bold, italic, lists, etc.) is parsed and automatically converted into Capacities rich-text blocks.

## 🛠 Prerequisites

Ensure the following environment variable is set before running this skill:

- **`CAPACITIES_API_KEY`**: Your API key generated from the Capacities Developer Console. This must be set in your `.env` file or system environment variables.

## 📥 Parameters & Arguments

Parameters must be passed as CLI arguments when running the Bun script. Always wrap arguments in double quotes (`"`) to handle spaces and special characters.

- **`title`** (Argument 1, `process.argv[2]`, Required):
  - **Description**: The title of the memo to be created.
  - **Example**: `"AI Development Log - 2026-07-18"`
- **`content`** (Argument 2, `process.argv[3]`, Required):
  - **Description**: The markdown-formatted body of the memo. Markdown syntax (bold, italic, headers, bullet points, etc.) is parsed internally into Capacities rich-text blocks.
  - **Example**: `"# Today's Summary\n- Modified the **Capacities skill** definition.\n- Improved code readability."`

## 🚀 Execution Steps

### Step 1: Arguments & Environment Validation

Verify that both `title` and `content` are provided and that the `CAPACITIES_API_KEY` environment variable is correctly set.

### Step 2: Write Memo via Bun Script

Run the following command from the project root to create a new Memo object in Capacities:

```bash
bun run scripts/create-capacities-memo.ts "<title>" "<content>"
```

### Step 3: Result Handling & Reporting

- **On Success**: Outputs the unique object ID (e.g., `id: "..."`) of the created memo and a success message. Summarize the result and present the completion status to the user.
- **On Failure**: Prints error messages to `stderr` and exits the process. Diagnose the failure (e.g., missing API key, network issues) and report it to the user.
