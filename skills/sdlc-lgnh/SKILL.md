---
name: sdlc-lgnh
description: "AI-native software development lifecycle (SDLC) workflow runner."
---

# SDLC-LGNH Skill Runner (AI-Native SDLC)

Execute AI-Native SDLC artifact workflows (`intent.md` -> `spec.md` -> `plan.md`) ONLY when explicitly invoked with `/sdlc-lgnh <keyword>`.

## Keyword Subcommand Matcher

When the user inputs `/sdlc-lgnh <keyword>`, match `<keyword>` against the keywords below to execute the corresponding catalog workflow:

**키워드 없이 `/sdlc-lgnh`만 입력된 경우**: 아래 표(사용 가능한 키워드와 워크플로 목록)를 그대로 출력하고, 실행할 워크플로를 선택해 달라고 안내한 뒤 종료한다. 카탈로그 파일을 읽거나 실행하지 않는다.

| Keywords                                                             | Target Workflow             | Catalog File        |
| :------------------------------------------------------------------- | :-------------------------- | :------------------ |
| `intent`, `draft-intent`, `init`                                     | Stage 1: Intent Capture     | `catalog/intent.md` |
| `spec`, `draft-spec`, `design`                                       | Stage 2: Spec Specification | `catalog/spec.md`   |
| `plan`, `draft-plan`, `build-plan`                                   | Stage 3: Plan Mode          | `catalog/plan.md`   |
| `run`, `execute`, `exec`, `build`, `impl`, `verify`, `test`, `check` | Run & Verify Plan           | `catalog/run.md`    |

## Execution Procedure

1. **Locate Skill Directory**:
   - Find the resolved installation directory of this `skills/sdlc-lgnh/SKILL.md` file.
2. **Read Catalog Instruction**:
   - Read `<sdlc_lgnh_skill_dir>/catalog/<filename>.md` matching the `<keyword>` using `read`.
3. **Execute Steps**:
   - Follow the instructions in the catalog file sequentially.

## No-Keyword Behavior

`<keyword>`가 비어 있으면(`/sdlc-lgnh`만 입력) 카탈로그를 실행하지 말고, 위 Keyword Subcommand Matcher 표를 출력해 사용 가능한 명령어를 안내한다.
