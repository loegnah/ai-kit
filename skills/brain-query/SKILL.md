---
name: brain-query
description: Second brain에서 정보를 검색한다. index.md를 기점으로 관련 페이지를 탐색하고, 사용자가 어떤 지식이나 경험에 대해 질문하거나 "찾아줘", "정리해줘", "brain에서 확인해줘" 같은 요청을 할 때 사용.
---

# Query Workflow

## working directory

- `/Users/loegnah/note/brain` 를 기준으로 진행한다.

## 정의

Brain wiki에서 답을 찾는 표준 워크플로우.

## 절차

1. **카탈로그 확인**: `index.md`를 먼저 읽어 관련 페이지 후보 탐색.
2. **확장 탐색**: 후보 페이지 본문에서 `[[wikilink]]`를 따라가며 관련 컨텍스트 수집.
   - 필요시 `wiki/` 하위 폴더를 Grep해서 키워드 매칭 페이지 추가 발굴.
3. **종합 답변**: 모은 페이지를 한국어로 종합해 답변.
   - 출처 페이지를 `[[wikilink]]`로 인용.
   - 페이지 간 모순이 있으면 명시.
   - 정보가 부족하면 부족하다고 답함 — 추측 금지.
4. **저장 제안**: 답이 분석/비교/요약처럼 재활용 가치가 있으면 사용자에게 물어보고 `wiki/analyses/`에 저장.
   - frontmatter: `type: analysis, tags, created, updated, based_on: [...]`
   - `based_on`에 인용한 페이지를 wikilink 리스트로 기록.
5. **`log.md`**: analysis를 저장한 경우에만 `log.md`에 append. 단순 조회는 로깅하지 않음.

## 주의

- 답이 wiki에 없으면 솔직히 "없다"고 답하고, 필요시 ingest 워크플로우로 보강 제안.
- `refs/`도 참고 가능 (읽기 전용). 단, 수정 금지.
- 페이지 경로 언급은 항상 `[[wikilink]]` 형식으로 — 사용자가 클릭해서 열 수 있어야 함.
- 한국어로 답변.

## 출력 형식

```
답변: <본문>

참고: [[page1]], [[page2]]
(필요시) 저장할까? → wiki/analyses/<제목>.md
```
