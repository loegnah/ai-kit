---
name: import-external-skills
description: "외부 저장소나 패키지의 스킬을 npx skills add로 설치한 뒤, 지정된 카탈로그 디렉토리(예: skills/<runner>/catalog/<name>)로 이동하고 skills-lock.json의 skillPath를 갱신합니다. '외부 스킬 설치', '외부 스킬 추가', '스킬 카탈로그로 이동', 'import external skills' 등의 요청 시 사용합니다."
---

# Import External Skills

외부 저장소(GitHub, 패키지 등)의 스킬을 `npx skills add`로 설치한 후, 원하는 러너의 카탈로그 디렉토리(예: `skills/<runner>/catalog/<name>`)로 이동하고 `skills-lock.json`의 `skillPath`를 자동으로 갱신합니다.

## 사용 예시

- "https://github.com/obra/superpowers 스킬을 모두 설치해서 etc-lgnh에 카탈로그로 superpowers 라는 이름으로 넣어줘"
- "obra/superpowers에서 brainstorming 스킬만 가져와서 dev-lgnh 카탈로그에 넣어줘"
- "이미 .agents/skills에 설치된 스킬들을 etc-lgnh의 superpowers 카탈로그로 옮겨줘"

## 핵심 원칙

1. **저장소 내부 격리 원칙**:
   - `npx skills add`로 로컬 `.agents/skills`에 설치된 스킬 파일들을 지정된 `./skills/<runner>/catalog/<name>/` 디렉토리로 이동합니다.
   - 프로젝트 루트 외부의 파일은 절대 건드리지 않습니다.
2. **Lockfile 동기화**:
   - `skills-lock.json`의 `skillPath`를 새로 이동된 상대 경로(예: `skills/etc-lgnh/catalog/superpowers/brainstorming/SKILL.md`)로 수정합니다.
3. **자체 스킬 보존**:
   - `.agents/skills/import-external-skills`는 이 프로젝트 전용 도구이므로 이동하거나 삭제하지 않습니다.

## 실행 절차

### 1. 매개변수 파악

사용자 요청에서 다음 정보를 파악합니다:

- **소스**: URL (예: `https://github.com/obra/superpowers`) 또는 저장소 식별자 (`obra/superpowers`)
- **대상 러너**: 예: `etc-lgnh`, `dev-lgnh`, `sdlc-lgnh` 등
- **카탈로그 이름**: 예: `superpowers` (최종 대상: `skills/<runner>/catalog/<name>`)
- **특정 스킬 필터** (선택): 특정 스킬만 요청한 경우 해당 스킬 이름 목록

### 2. 자동화 스크립트 실행

내장 스크립트를 실행하여 설치, 이동, `skills-lock.json` 갱신을 한 번에 수행합니다:

```bash
bun run .agents/skills/import-external-skills/scripts/relocate.ts <source> --runner <runner> --name <name>
```

#### 주요 옵션:

- 직접 경로 지정: `-t skills/<runner>/catalog/<name>`
- 특정 스킬만 설치/이동: `-s <skill1>,<skill2>`
- 이미 `.agents/skills`에 다운로드된 파일만 이동: `--move-only`
- 사전 미리보기: `--dry-run`

### 3. 검증 및 무결성 확인

1. `skills-lock.json` 파일의 `skillPath`가 대상 경로로 올바르게 업데이트되었는지 확인합니다.
2. 프로젝트 린트 및 타입 검사를 수행합니다:
   ```bash
   bun run check
   ```

### 4. 결과 보고

- 설치 및 이동된 스킬 목록과 최종 경로
- `skills-lock.json`의 `skillPath` 변경 내역
- 해당 러너의 `SKILL.md`에 추가할 수 있는 서브커맨드 매핑 권장 형식 안내
