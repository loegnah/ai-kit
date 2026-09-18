# TypeScript Style Refactoring (ts-refactor)

사용자 정의 TypeScript 코드 스타일 규칙을 점검하고, 위반 사항을 취합하여 사용자 확인(컨펌) 후 리팩토링을 수행하는 워크플로입니다.

## Core Principles

1. **점검 선행 및 컨펌 필수 (No Auto-Refactoring Without Approval)**:
   - 점검 후 위반 코드를 취합하여 사용자에게 먼저 보고합니다.
   - **사용자가 명시적으로 승인(컨펌)하기 전에는 절대 코드를 수정하지 않습니다.**
2. **점진적 룰셋 확장 (Extensible Rule Set)**:
   - 룰셋 기반으로 동작하며, 새로운 스타일 규칙을 점진적으로 추가할 수 있는 구조를 유지합니다.
3. **Git 상태 변경 금지**:
   - `git add`, `git commit` 등 git 변경 작업은 수행하지 않습니다. 코드 수정만 수행합니다.

---

## Arguments

- `scope` (optional): 점검 대상 디렉토리 경로 또는 파일 패턴. (생략 시 최근 변경된 파일 또는 전체 소스 대상 확인)

---

## Active Inspection Rules

### Rule 1: 불필요한 Re-export (Pass-through / Barrel Export) 지양

- **개념**: 외부 모듈 또는 다른 파일에서 import한 값을 단순히 다시 export(`export { x } from '...'`, `export * from '...'`, 또는 `import` 후 그대로 `export`)하여 중간 중계자로 동작하는 패턴을 지양합니다.
- **이유**: 의존성 추적 복잡화, 순환 참조 위험 증가, 불필요한 번들/트리 셰이킹 저하를 방지하고 호출처가 원본 정의 모듈을 직접 import하도록 유도합니다.
- **분류 기준**:
  1. **[위반] 일반 파일 단순 Re-export (Pass-through Export)**:
     - 단일 파일이나 일반 모듈에서 다른 모듈의 심볼을 단순 중계 재내보내기하는 경우.
     - 조치: 호출처를 원본 파일 경로로 직접 import하도록 변경하고 중계 re-export 제거.
  2. **[주의 / 지양 권장] 배럴 파일(index.ts 등) 일괄 Re-export**:
     - 특정 디렉토리 내 파일들을 묶어서 한 번에 내보내는 형태(`index.ts`의 barrel export).
     - 원칙적으로 배럴 형태라 하더라도 무조건 통과시키지 않고, **"배럴 파일 일괄 재내보내기 형태이나 지양 권장"**으로 분류하여 사용자에게 명시적으로 보고하고 전환 의사를 확인합니다.

_(추후 새로운 룰이 추가될 경우 Rule 2, Rule 3... 순으로 확장)_

---

## Execution Steps

### 1. 대상 스코프 결정

- 사용자가 `scope`를 지정한 경우 해당 경로를 대상으로 설정합니다.
- 지정되지 않은 경우:
  - 최근 작업/변경된 파일이 있는지 확인 (`git status -s`, `git diff --name-only`).
  - 변경된 파일이 있으면 해당 파일들 및 관련 모듈을 1차 대상으로 제안.
  - 없다면 대상 경로를 사용자에게 묻거나 기본 소스 디렉토리(`src` 등)를 제안합니다.

### 2. 룰셋 기반 정적 점검 (Scan & Collect)

- 대상 스코프 내 `.ts`, `.tsx` 파일들을 검사하여 활성화된 룰을 점검합니다.
- **Rule 1 점검 항목**:
  - `export { ... } from '...'`
  - `export * from '...'`
  - `export * as ... from '...'`
  - `import { x } from '...'; ... export { x };`
- 점검 결과 데이터 수집:
  - 위반 파일 및 라인 번호
  - 재내보내기되는 심볼명 및 원본 정의 파일 경로
  - 분류: `[위반] 단순 Re-export` vs `[주의/지양 권장] 배럴(index.ts) Re-export`
  - 해당 심볼을 참조하고 있는 외부 파일(호출처) 목록

### 3. 사용자 보고 및 컨펌 대기 (Report & Ask Confirmation)

- 수집된 위반 목록을 마크다운 표나 정리된 리스트 형태로 사용자에게 출력합니다.
- 예시 출력 형식:
  ```markdown
  ### TS 코드 스타일 점검 결과

  #### Rule 1: 불필요한 Re-export 점검

  1. `src/features/user/service.ts:5` [위반 - 단순 Re-export]
     - 심볼: `fetchUser` (원본: `src/api/user.ts`)
     - 영향받는 호출처: `src/pages/profile.tsx`, `src/pages/dashboard.tsx`
  2. `src/components/index.ts:1` [주의/지양 권장 - 배럴 Re-export]
     - 심볼: `Button`, `Modal` (원본: 각각 `./Button.tsx`, `./Modal.tsx`)
     - 영향받는 호출처: `src/App.tsx` 외 4곳

  ---

  위 항목들을 호출처에서 원본 경로를 직접 import하도록 변경하고, 불필요한 re-export를 제거하는 리팩토링을 진행할까요?

  - 전체 진행 / 특정 항목만 진행 / 취소
  ```
- **사용자의 확인 및 승인 응답이 올 때까지 대기하며, 사전 승인 없이 코드를 절대 수정하지 않습니다.**

### 4. 사용자 승인 후 리팩토링 수행 (Refactor upon Confirmation)

- 사용자가 컨펌한 항목에 대해 순차적으로 리팩토링을 수행합니다:
  1. **호출처 수정**: 대상 심볼을 import하고 있는 모든 파일의 import 경로를 원본 정의 파일 경로로 직접 import하도록 업데이트합니다.
  2. **중계 코드 제거**: 더 이상 외부에서 사용되지 않는 불필요한 pass-through export 구문을 제거합니다.
  3. **배럴 파일 정리**: 사용자가 승인한 경우 배럴 파일 내 해당 export 항목을 제거하거나, 빈 배럴 파일이면 정리합니다.
  4. **기능 및 타입 불변 유지**: 런타임 동작 변경 없이 오직 import/export 경로만 정리합니다.

### 5. 검증 및 결과 안내

- 프로젝트 검증 명령어 실행 (예: `bun run check` 또는 `tsc --noEmit`, 프로젝트 linter/typecheck).
- 리팩토링으로 수정된 파일 목록 및 제거된 re-export 내역을 사용자에게 간결하게 요약 보고합니다.
