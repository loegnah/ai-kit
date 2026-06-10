---
name: code-simplify
description: Simplify and refine recently modified code using the code-simplifier agent while preserving functionality. Use when the user says "code-simplify", "simplify code", "refine code", "clean up code", or wants to improve clarity and consistency of recent changes.
---

# Code Simplify

`code-simplifier` 에이전트를 호출하여 최근 수정된 코드를 정제(simplify/refine)합니다. 기능은 그대로 유지하며 가독성, 일관성, 유지보수성을 개선합니다.

## Arguments

- **scope** (optional): 정제 대상 디렉토리 또는 파일 패턴. 생략 시 아래 자동 감지 로직을 따릅니다.

## Execution Steps

### Step 1: Detect Target Scope

사용자가 scope를 지정한 경우 그 값을 그대로 `$TARGET_SCOPE`로 사용합니다.

scope가 없으면 아래 우선순위로 자동 감지합니다:

1. **커밋되지 않은 수정사항이 있는 경우**: `git diff --name-only` + `git diff --name-only --cached` 결과 (staged + unstaged 모두).
2. **커밋되지 않은 수정사항이 없는 경우**: 직전 커밋의 변경 파일. `git diff --name-only HEAD~1...HEAD` 결과.

감지된 파일이 비어 있으면 사용자에게 "정제 대상 파일이 없다"고 알리고 종료합니다.

### Step 2: Invoke code-simplifier Agent

Agent tool로 `code-simplifier` 에이전트를 호출하세요:

- subagent_type: `code-simplifier`
- description: "Simplify and refine recent code"
- prompt에 반드시 포함할 내용:
  - 정제 대상 파일 목록: `$TARGET_SCOPE`
  - 기능은 절대 변경하지 말 것 (동작, 반환값, API 계약, 외부 사이드이펙트 유지)
  - 프로젝트의 코딩 표준(CLAUDE.md 등)을 따를 것
  - 가독성과 명확성을 우선시할 것 (간결함보다 명확함)
  - 과도한 단순화 금지 - 중첩 삼항 연산자, 과도하게 압축된 한 줄 코드 등은 피할 것
  - 완료 후 출력할 내용:
    1. 변경된 파일 목록
    2. 각 파일에 적용된 주요 정제 내용 요약

### Step 3: Report Results

에이전트가 반환한 결과를 사용자에게 간결하게 요약해 보여주세요:

- 변경된 파일 수와 경로
- 주요 개선 사항 요약 (1~2줄)
- 검토를 위해 `git diff` 확인 및 테스트 실행을 권장

## Important Notes

- `code-simplifier`는 기능을 변경하지 않고 코드의 구조와 표현만 다듬습니다
- 변경 후에는 반드시 테스트를 실행하여 회귀가 없는지 확인하세요
