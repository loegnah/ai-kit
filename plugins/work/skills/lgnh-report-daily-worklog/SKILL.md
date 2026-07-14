---
name: lgnh-report-daily-worklog
description: Generate a daily one-line summary report from git commit history. Use when the user asks for a daily breakdown, date-based summary, or says "report-daily-worklog". Accepts multiple author names and produces concise per-date summaries.
---

## Arguments

- `authors`: 쉼표 또는 공백으로 구분된 git author 이름 목록 (예: `hangeol,loegnah` 또는 `"hangeol loegnah"`).
  - 여러 이름이 동일 인물일 수 있으므로 모든 이름의 커밋을 합쳐서 처리한다.
  - 생략 시 `git log --format="%an" | head -1`로 현재 사용자를 확인한다.

## Rules

- 날짜 범위가 별도로 지정되지 않으면 **이번 주**(월요일~오늘)를 기준으로 한다.
- 사용자가 "저번주", "지난주" 등을 언급하면 해당 주(월요일~일요일)를 사용한다.
- 출력 언어는 한국어를 기본으로 한다.
- 오늘 날짜: `date +%Y-%m-%d` 명령으로 확인한다.

## Steps

1. **기간 결정**

- 날짜 인자가 있으면 해당 기간을 사용한다.
- 없으면 이번 주 월요일부터 오늘까지를 계산한다.

2. **커밋 수집**

- 모든 author 이름에 대해 커밋을 수집한다. `--author`를 `\|`로 연결하여 한 번에 조회한다:
  ```
  git log --author="name1\|name2" --after="<start>" --before="<end>" --pretty=format:"%ad | %s" --date=short --all
  ```

3. **날짜별 한줄 요약 작성**

- 커밋을 날짜별로 그룹화한다.
- 각 날짜에 대해 머지 커밋은 제외하고 작업 내용을 아주 간결하게 요약한다.
- **형식**: 각 항목을 `/`로 구분한다. 콤마(`,`)는 절대 사용하지 않는다.
- 한 줄에 해당 날짜의 모든 작업을 담는다.
- 기술 용어는 최소화하되 기능명이나 모듈명은 그대로 사용한다.
- 날짜가 주말(토/일)인 경우 커밋이 없으면 해당 날짜는 출력하지 않는다.

4. **출력 형식**

- 파일로 저장하지 않고 텍스트로 직접 출력한다.
- 형식 예시:

  ```
  **3/10 (월)**
  카테고리 DB 마이그레이션 / blog 레이아웃 개선 / 로그인 UI 수정

  **3/11 (화)**
  S3 리소스 정리 기능 추가 / editor 자동저장 제거 / community 스키마 분리
  ```

- 날짜는 `**M/D (요일)**` 형식으로 볼드 처리한다.
- 요일은 한국어 약어를 사용한다: 월/화/수/목/금/토/일

## Example

```
**3/3 (월)**
editor Radix UI → Base UI 마이그레이션 / Drizzle 초기 마이그레이션 및 DB 복사 스크립트 추가 / Blog 콘솔을 News로 통합 및 매거진 매니저 지원 / magazine 편집 후 네비게이션 및 캐시 무효화 수정 / canWrite 체크 서버 로더로 이동

**3/4 (화)**
account roles JSONB → account_role 조인 테이블 분리 / rolesVersion 세션 무효화 추가 / RN 콘솔 플랫폼 탭 레이아웃 전환 / editor 외부 이미지 붙여넣기 시 자동 재업로드 / 헤더 사용자 정보 뱃지 추가 / changelog 모듈 추가 / community 인트로 페이지 및 서브헤더 구현 / SSR CSS import 수정 / vitest 마이그레이션

**3/5 (수)**
다크모드 36개 파일 적용 / Sonner 토스트 타입별 색상 추가 / community 히어로 배너 편집 기능 / target 모듈 core로 추출 / role 다이얼로그 리디자인 / 플랫폼 기반 RN 매니저 접근 제어 / blog 카드에 조회수·좋아요·댓글 통계 추가 / HoverCard delay 수정

**3/6 (금)**
카테고리 DB 기반 시스템 마이그레이션 / 역할 콘솔 멤버 관리 리디자인 / community 인트로 편집 라우트 분리 및 역할 가드 추가 / FN 버전 뱃지·PRD/POC 뱃지 복구 / RN null minorVersion 처리 / blog 툴바 버튼 재배치 / 드래프트 복원 토스트 수정
```
