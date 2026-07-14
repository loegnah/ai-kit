---
name: lgnh-report-weekly
description: Generate a weekly work report from git commit history. Use when the user asks for a weekly report, work summary, or says "report-weekly". Analyzes commits to produce a structured markdown report.
---

## Rules

- 날짜 범위가 별도로 지정되지 않으면 **저번 주**(월요일~일요일)를 기준으로 함.
- 사용자가 날짜를 명시하면 해당 기간을 사용함.
- 별도의 언급이 없으면 현재 git user의 커밋만 분석함.
- 출력 언어는 한국어를 기본으로 함.
- 오늘 날짜: `date +%Y-%m-%d` 명령으로 확인함.
- **문체 및 서술 규정**: 서술형 표현(존댓말, '함/음' 등의 서술성 종결어미)을 최소화하고, 조사 및 불필요한 동사를 생략한 **명사형 종결** 및 **핵심 키워드** 중심으로 기술함.

## Steps

1. **기간 결정**

- 날짜 인자가 있으면 해당 기간 사용.
- 없으면 저번 주 월요일~일요일 계산.
- `git log --format="%an" | head -1` 명령으로 현재 사용자 확인.

2. **커밋 수집**

- 해당 기간의 커밋 수집:
  ```
  git log --author="<user>" --after="<start_date>" --before="<end_date_+1day>" --oneline --no-merges
  ```
- 각 커밋의 상세 변경 내용 확인:
  ```
  git log --author="<user>" --after="<start_date>" --before="<end_date_+1day>" --no-merges --stat
  ```
- 필요시 개별 커밋의 diff 확인을 통해 작업 내용 상세 파악.

3. **작업 분류 및 정리**

- 커밋 분석 후 관련 작업 그룹화.
- 각 그룹별 작업 주제(볼드체)와 세부 내용(불릿 리스트) 정리.
- 비개발자 상급자 보고용 형태로 작성.
- 기술 용어를 배제하고 최대한 쉬운 단어 선택.
- **핵심 요약 강조**: 장황한 설명을 피하고 명사형 키워드로 간결히 기술. 최대 2줄 이내로 축약하며, 가급적 1줄 내외로 작성.

4. **마크다운 파일 출력**

- 파일명: `report-weekly-YYMMDD-YYMMDD.md` (기간 시작일-종료일, 2자리 연도)
- 프로젝트 루트에 생성.
- Heading(`#`, `##` 등) 사용 금지.
- 각 작업 주제는 **볼드체**로 표시.
- 주제 바로 다음 줄부터 `-` 형식의 불릿 리스트로 세부 내용 작성 (빈 줄 금지).
- 단락과 단락 사이에는 빈 줄 1개 추가.

## Example

```
**Community 페이지 신규 개발**
- 커뮤니티 소개 페이지 신규 개발(배너, 기능 카드, 상단 헤더 등) 및 사용자 정보 표시

**역할/권한 시스템 개편**
- 즉시 반영 구조의 사용자 역할 관리 개선
- 플랫폼별 접근 제어 추가, 역할 관리 화면 리디자인 및 멤버 관리 기능 구현

**에디터 개선**
- 외부 이미지 자동 재업로드 기능 추가
- 에디터 내부 UI 라이브러리 교체를 통한 성능 및 유지보수성 향상

**Changelog 모듈 추가**
- 시스템 업데이트 이력 확인용 변경 로그 기능 신규 추가

**DB 마이그레이션 및 빌드 인프라**
- 테스트 도구 전환, Docker 환경 개선 및 빌드 오류 수정

**FN / RN 버그 수정**
- Feature Notes 버전 및 상태 배지 표시 오류 수정
- Release Notes 버전 정렬 오류 수정
```
