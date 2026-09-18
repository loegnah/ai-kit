---
name: update-external-skills
description: "외부 저장소에서 가져온 스킬들을 최신 상태로 업데이트하고 동기화합니다. '외부 스킬 업데이트', '외부출처스킬 업데이트', 'update external skills' 등의 요청 시 사용합니다."
---

# Update External Skills

외부 저장소(upstream)에서 가져온 스킬들을 `skills/sources.json` 매니페스트에 정의된 출처 및 매핑 정보를 바탕으로 최신화합니다.

## 대상 스킬 및 출처 매니페스트

- 매니페스트 경로: `skills/sources.json`
- 관리 대상:
  - `superpowers`: `https://github.com/obra/superpowers`
  - `matt`: `https://github.com/mattpocock/skills`
  - `humanize-korean`: `https://github.com/epoko77-ai/im-not-ai`

## 실행 절차

### 1. 매니페스트 확인 및 대상 선정

1. `skills/sources.json`을 읽고 등록된 스킬 소스 목록을 확인합니다.
2. 사용자가 특정 스킬만 지목한 경우(예: "superpowers 업데이트해줘") 해당 스킬만 처리하고, 별도 언급이 없으면 전체 소스를 대상으로 진행합니다.

### 2. Upstream 최신 소스 확보

1. 임시 작업 디렉토리(예: `_temp_upstream/<skill-name>`)를 생성합니다.
2. `git clone --depth 1 <repo-url> <temp-dir>` 명령으로 최신 코드를 shallow clone합니다.

### 3. 파일 비교 및 동기화 (로컬 규칙 보존)

각 소스의 매핑 규칙(`upstreamPath` / `mappings`)에 따라 파일을 복사하되, 아래 로컬 보존 규칙을 엄격히 준수합니다.

- **러너 상대 경로 규칙 보존**:
  - `skills/<runner>/SKILL.md` 및 `catalog/`의 구조와 참조 경로가 깨지지 않아야 합니다.
- **TypeScript 포팅 스크립트 주의**:
  - `humanize-korean`의 경우 원본 Python 스크립트(`scripts/*.py`)가 로컬에는 TypeScript(`scripts/*.ts`)로 포팅되어 있습니다.
  - Python 원본 변경 시 단순 덮어쓰기가 아닌 로직 차이점을 분석하여 TS 코드에 반영해야 합니다.
- **문서 및 프론트매터 호환성**:
  - 기존 러너(`dev-lgnh`, `etc-lgnh`)에서 인식하는 frontmatter `name`이나 키워드 매핑이 유지되는지 확인합니다.

### 4. 정리 및 검증

1. 임시 작업 디렉토리를 완전 삭제합니다 (`rm -rf _temp_upstream`).
2. 프로젝트 표준 린트/포맷/타입 검사를 실행합니다:
   ```bash
   bun run check
   ```
3. 에러 발생 시 즉시 수정합니다.

### 5. 결과 보고

- 업데이트된 스킬 목록
- 변경된 주요 내용 (커밋 로그 또는 주요 파일 diff 요약)
- 로컬 커스터마이징 유지 사항
