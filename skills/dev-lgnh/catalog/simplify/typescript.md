# TypeScript Simplification Rules

TypeScript 코드 단순화 및 정리 시 준수해야 하는 규칙입니다.

## 1. 불필요한 Re-export 지양 (Avoid Pass-through Re-exports)

- 외부 모듈이나 타 파일에서 import한 심볼을 단순히 다시 내보내는 중계용 re-export(`export { x } from '...'`, `export * from '...'`, 또는 `import { x } from '...'; export { x };`)를 지양합니다.
- 소비처(호출처)는 중간 중계 모듈이 아닌 심볼이 실제로 정의된 원본 모듈 경로에서 직접 import하도록 변경합니다.
- 패키지 외부 공개 API 경계 등 재내보내기가 불가피한 경우가 아니라면 단순 pass-through re-export는 제거합니다.

## 2. 디렉토리 내 `index.ts` (배럴 파일) 지양 (Avoid Barrel `index.ts`)

- 단순히 하위 모듈들을 묶어서 re-export하기 위한 목적의 디렉토리 단위 `index.ts` 생성을 지양합니다.
- 배럴 파일은 순환 참조 위험을 높이고 의존성 추적 및 트리 셰이킹을 저해하므로 각 모듈 파일을 직접 import하는 것을 우선합니다.
- **예외**: 프레임워크 규칙 또는 패키지 진입점 규격상 필수로 지정된 파일(예: `src/index.ts`, 번들러/엔진의 엔트리포인트 등)은 예외로 허용합니다.
