# loegg 스킬 검토

- **Date**: 2026-11-03
- **Status**: Partial
- **Goal**: `skills/loegg/`가 `~/.agents/skills/`에 정상 설치되어 있다는 전제에서, 오류와 서로 맞지 않는 부분을 찾는다.
- **Result**: `doc` 별칭 정리만 반영했다. 나머지는 아래 "남은 작업"에 정리하고 다음에 진행한다.
- **Takeaway**: 스킬은 전역에 설치해서 쓰므로 이 저장소의 `CLAUDE.md` 기준으로 검토하지 않는다. 문제의 상당수는 pstack 원본(`skills/dev-lgnh/catalog/pstack/`)에서 물려받은 것이다.

## Related Docs

- [`skills/loegg/SKILL.md`](../../../skills/loegg/SKILL.md) — loegg 진입점
- [`skills/loegg/action/architect/SKILL.md`](../../../skills/loegg/action/architect/SKILL.md) — 다음 작업의 주 대상
- [`skills/dev-lgnh/catalog/pstack/architect/SKILL.md`](../../../skills/dev-lgnh/catalog/pstack/architect/SKILL.md) — 비교용 pstack 원본

---

## 완료

- `doc` 별칭 정리: `doc`, `docs`만 남기고 `design-doc`, `rule`, `guide`, `note`, `tip`, `story`, `glossary`를 지웠다.
  - `SKILL.md` dispatch 목록과 작업 중 자동 실행 조건
  - `action/help/SKILL.md`
  - `action/doc/SKILL.md`: 제목을 `# Doc`으로 바꿨다. 분류 인자는 `/loegg doc <design|rule|guide|note|story|glossary>`로 바꿨다.
- `show-me`(`show`)와 `benchmark-checklist`(`benchmark`)는 명령어 줄임말이므로 그대로 둔다.

## 남은 작업

### 1. `architect` Phase B: 항상 arena 실행 (우선)

- **문제**: Phase B가 조건 없이 arena를 실행하고, 설계안을 무조건 2개 이상 만든다("Design it twice"). 그래서 루트 `SKILL.md`의 Heavy Multi-Agent Escalation 규칙(깊이 요청이나 큰 위험이 있을 때만 arena 사용)과 부딪힌다.
- **결정**:
  - 기본은 메인 에이전트가 설계안 **1개**만 만든다. `references/runner-prompt.md` 규칙과 `references/design-red-flags.md` 검사는 그대로 적용한다.
  - 사용자가 깊이를 요청했을 때("깊게", "다각도로", `arena` 등)나 위험이 큰 설계일 때만 arena를 실행한다. 이때는 별도 에이전트 여러 개가 각자 설계안을 만든다.
  - 메인 에이전트 혼자 설계안을 여러 개 만드는 방식은 쓰지 않는다. 의미가 없다.
  - "Design it twice" 문구는 지운다.
- **같이 고칠 곳**:
  - `action/architect/SKILL.md`의 frontmatter description
  - Phase E 4번: "re-run arena" → "Phase B로 돌아가기"
  - `references/rationale-template.md`의 "Synthesis decision" 섹션: arena를 쓴 경우에만 채운다.
  - `SKILL.md:19`의 dispatch 설명과 `action/help/SKILL.md`의 "comparing shapes via `arena`" 문구
- **참고**: `architect`를 부르는 playbook의 호출 조건 자체는 고치지 않는다.

### 2. `feature`에서 구현이 두 번 나옴

- `architect`에는 구현 단계(Phase D)가 있다. 그런데 `playbooks/feature.md`는 step 2에서 `architect`를 부른 뒤 step 4에서 또 구현한다.
- pstack(`poteto-mode/playbooks/feature.md`)도 구조가 같다. 원본에서 물려받은 모호함이다.
- `architect`와 playbook의 역할을 어떻게 나눌지 정해야 한다.

### 3. Agent Mode의 멈춤 조건 누락

- `mode/agent-mode/SKILL.md`는 데이터 삭제, 강제 푸시, 배포 전에만 멈춘다.
- 루트 `SKILL.md`의 `Always pause`에 있는 "저장소 밖 수정"과 "외부 메시지 전송"이 빠져 있다.

### 4. 경로 표기 불일치와 깨진 링크

- `action/help/SKILL.md`: `setup/SKILL.md`, `grill/SKILL.md` 같은 경로는 그 위치에서 파일을 찾을 수 없다. `../setup/SKILL.md` 형태로 고쳐야 한다.
- 스킬 최상위 폴더 기준 경로(`action/review/SKILL.md` 등)를 쓰는 파일: `mode/*`, `util/arena`, `action/setup`, `action/analyze`
- 그 외 action은 파일 기준 상대경로(`../../`)를 쓴다.
- playbook은 한 파일 안에서 `../SKILL.md`(파일 기준)와 `playbooks/feature.md`(최상위 기준)를 섞어 쓴다.

### 5. frontmatter 불일치

- frontmatter가 없는 파일: `action/{grill,setup,review,doc,analyze,show-me,help}`, `mode/*`, `util/arena`
- 나머지 action에는 `name: loegg-*`, `disable-model-invocation`이 있다.

### 6. 예전 구조의 흔적

- `action/reflect/SKILL.md`: "synthesizer's full output", "reason from the synthesizer". 지금은 메인 에이전트가 직접 종합한다.
- `action/how/references/explainer-prompt.md`: "You are writing… Multiple explorer agents…"처럼 별도 서브에이전트에게 말하는 투다. 그런데 simple 경로에는 explorer가 없다.

### 7. 다른 도구 전용 문구

- `action/reflect/SKILL.md`: Cursor 기준 `Task` / `subagent_type: generalPurpose` / `readonly: false`가 기본값처럼 쓰여 있다.
- `action/how`, `action/why`: "the spawns in this skill use Cursor's `Task` tool"이라고 하지만 본문에는 `Task` 호출이 없다.
- `mode/direct-mode/SKILL.md`: "e.g., chatting in OMP"
- `action/grill/SKILL.md` 규칙 3: 어디에도 정의되지 않은 `scout`를 쓴다.

### 8. 사소한 것

- `action/benchmark-checklist/SKILL.md`: `nproc`는 macOS에 없다. `sysctl -n hw.ncpu`를 함께 적는다.
- `action/why/SKILL.md`: "Common Failure Modes to Avoid" 항목이 1개뿐이다. 내용이 잘렸는지 확인한다.
- `playbooks/prototype.md`: `/tmp`에만 파일을 만들 때 review가 필요한지 불분명하다.
- `util/arena/SKILL.md`: 단계별 할 일 5개를 연다. 그런데 `interrogate`는 Phase 3, 4를 건너뛰므로 항목 2개가 계속 남는다.

## 제외한 것

- `reflect`가 스킬 사본을 `.claude/skills/` 등에 만들어 수정하는 것, `setup`/`arena`/`prototype`/`hillclimb`이 저장소 밖에 파일을 쓰는 것: 전역 설치가 전제이므로 문제가 아니다.
- `how`/`why`가 explorer와 조사 에이전트를 여러 개 띄우는 비용: 문제가 아니다.
- `architect` 호출 조건이 느슨한 playbook들: `architect` 자체(Phase B)를 고치는 것으로 대신한다.
