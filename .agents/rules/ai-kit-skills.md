# ai-kit 스킬 관리 규칙

스킬 추가/수정/삭제/이름 변경 시 항상 적용한다.

## 구조

- 스킬은 엔트리포인트 러너 단위로 구성된다. `/<runner> <subcommand>` 로 호출된다.
- 레이아웃: `skills/<runner>/SKILL.md` + `skills/<runner>/catalog/<skill-name>.md`
- 현행 러너: `git-lgnh`, `work-lgnh`, `etc-lgnh`, `dev-lgnh`, `brain-lgnh`

## 필수 작업

1. `skills/<runner>/catalog/<skill-name>.md` 추가/수정.
2. `skills/<runner>/SKILL.md`의 서브커맨드 매처 테이블에 `/<runner> <subcommand>` 매핑 추가.
3. 완료 후 `bun run check` 실행. 에러 있으면 수정.
