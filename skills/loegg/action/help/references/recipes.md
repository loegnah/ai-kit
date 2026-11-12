# Prompts worth copying

Swap in the real paths, symptoms, and done checks. Informal Korean or English both work.

## Understand

- `/loegg how <subsystem>. 그다음 why로 최근에 왜 깨졌는지 찾아줘.`
- `/loegg why <symptom>. 아는 것, 사용한 근거, 가설을 정리해줘. 코드는 아직 바꾸지 마.`
- `/loegg analyze <bug or question> 다각도로` (independent read-only runners, main agent fact-checks)
- `/loegg teach <change>. 왜 <other way>가 아니라 이렇게 했는지, 무엇을 트레이드오프했는지.`
- `/loegg recall <topic> 최근 7일` or `/loegg recall 이전 세션 이어서 해줘. 끝난 건 다시 하지 마.`

## Build

- Bug: `/loegg <symptom>. 먼저 재현하고, 원인 찾고, 고치고, 재현 스크립트로 검증해줘.`
- Bug with a cheap test: `/loegg <bug>. 실패하는 테스트 먼저 쓰고 실패 이유 확인한 다음 고쳐줘.`
- Feature: `/loegg <behavior> 추가해줘. <current output>은 그대로 유지돼야 해. 둘 다 검증해.`
- Refactor: `/loegg <code>를 한 모듈로 모아줘. 동작 변화 없음. 현재 출력 먼저 기록하고 이후 동일함을 증명해.`
- Perf: `/loegg <operation>이 <fixture>에서 <time> 걸려. 측정해서 원인 고치고 전후 수치 보여줘.`

## Design and plan

- `/loegg <feature> 몇 가지 방식으로 프로토타입 만들어서 비교해줘.`
- `/loegg architect <feature>. 열린 질문은 프로토타입으로 답하고, 구현 전에 설계 먼저 보여줘.`
- `/loegg grill <plan>` (resolve open decisions in rounds before building)
- `/loegg <migration> 계획만 세워줘. 단계마다 검증 게이트가 있어야 해.` (multi-phase plan, stops for approval)

## Review

- `/loegg review` (main agent) or `/loegg review 깊게` (`review runners` through arena)
- `/loegg ui-audit <path or url>` (read-only UI, accessibility, state-completeness, and AI-slop audit)
- `/loegg interrogate 이 브랜치 전체. 실제 실행으로 증명된 버그만, 아직 수정하지 마.`
- `/loegg blast-radius <change>. 어디가 깨질 수 있는지, 안전하다는 근거를 실행으로 증명해.`

## Away and back

- `/loegg agent <goal>. 완료 조건은 <checks>. 결정 로그 남기고 끝까지 진행해.` Read the reply's **Attention** section first.
- `/loegg 여기서 멈춰. 내일 이어서 할 수 있게 정리해줘.` (pause safely), then later `/loegg recall 이어서 해줘`.
- `/loegg reflect` to turn the session's lessons into skill edits. Approve only edits that change a future decision.
