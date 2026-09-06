# AI-Native SDLC 아티팩트 관리 가이드: intent.md, spec.md, plan.md

AI-Native SDLC의 핵심은 **"모든 단계의 출력이 Git으로 버전 관리되는 마크다운 아티팩트"**라는 점입니다.
본 문서는 `intent.md`, `spec.md`, `plan.md` 3대 아티팩트의 **디렉토리 구성 규칙**, **Git 관리 방식**, **파일별 상세 작성법 및 템플릿**을 다룹니다.

---

## 1. 아티팩트 생명주기 및 흐름 (Lifecycle)

```
[제안자 / PO]
   │ 브레인스토밍 & 요구 캡처
   ▼
intent.md  ──(승인 / PR 머지)──▶ Stage 2 트리거
                                    │
                                [PO + 사내 정책 Skills]
                                    │ 요구사항 & 설계 압축
                                    ▼
                                 spec.md  ──(승인)──▶ Stage 3 트리거
                                                          │
                                                    [엔지니어 + Claude Code Plan Mode]
                                                          │ 변경 파일/순서/리스크 계획
                                                          ▼
                                                       plan.md ──▶ 코드 구현 & Diff 생성
                                                                      │
                                                                      ▼
                                                                 PR 검토 & 배포
```

- **intent.md**: "무엇을, 왜 원하는가? 제약은 무엇인가?" (비즈니스/사용자 관점)
- **spec.md**: "기존 시스템에 어떻게 부합시키는가? 정책/표준은 무엇인가?" (아키텍처/정책 관점)
- **plan.md**: "어떤 파일을 어떤 순서로 고치고, 어떻게 검증하는가?" (구현/엔지니어링 관점)

---

## 2. Git 디렉토리 구조 및 관리 전략

### (1) 폴더 위치: 어디에 두는가?

1. **단일 저장소 (Single Repo / 가장 권장)**:
   - 코드 저장소 루트에 `intent/` (또는 `docs/intent/`) 디렉토리 생성.
   - 코드와 아티팩트가 동일 Git 이력을 공유하므로 추적이 가장 단순하고 직관적임.
2. **모노레포 (Monorepo)**:
   - 서비스 범위가 명확한 경우: `services/billing/intent/`처럼 서비스별 디렉토리 하위에 배치.
   - 여러 서비스에 걸친 기획: 모노레포 루트의 `intent/`에 배치.
3. **다중 저장소 (Multi-Repo)**:
   - 하나의 기획이 여러 저장소에 걸치는 대규모 엔터프라이즈의 경우에만 전용 중앙 저장소(`intent-tracker` 등) 분리. 단, 일반적인 팀은 오버헤드 방지를 위해 개별 레포 배치를 권장.

---

### (2) 폴더 네이밍 컨벤션: 어떤 이름으로 묶는가?

하나의 변경 단위에 대해 `intent.md`, `spec.md`, `plan.md`를 **동일한 단일 작업 폴더** 안에 모아서 관리합니다.

#### 방식 A: [날짜-주제명] (가장 보편적이고 권장)

- **형식**: `intent/YYYY-MM-DD-<기능-슬러그>/`
- **장점**: 시간 순서대로 정렬되며, Git 로그와 직관적으로 매핑됨.
- **구조**:
  ```text
  my-repo/
  ├── intent/
  │   ├── 2026-06-02-claims-status/
  │   │   ├── intent.md          # 1단계 산출물 (기획)
  │   │   ├── spec.md            # 2단계 산출물 (설계)
  │   │   └── plan.md            # 3단계 산출물 (구현 계획)
  │   └── 2026-06-15-auth-session-refresh/
  │       ├── intent.md
  │       ├── spec.md
  │       └── plan.md
  ├── src/
  └── CLAUDE.md
  ```

#### 방식 B: [티켓번호-주제명] (Jira/이슈 트래커 중심 조직)

- **형식**: `intent/<티켓번호>-<기능-슬러그>/`
- **예시**: `intent/PAY-1042-refund-endpoint/`
- **장점**: 레거시 이슈 관리 시스템과 커밋 간 양방향 추적이 즉각적임.

---

### (3) 파일 상태 및 브랜치 관리 (Git Workflow)

1. **작성 브랜치**:
   - 기획 및 설계 단계에서는 `feature/` 또는 `intent/2026-06-02-claims-status` 브랜치를 생성.
   - 비개발자는 Claude Cowork/Web 커넥터를 통해 해당 브랜치에 마크다운을 커밋.
2. **PR 및 승인 관문**:
   - `intent.md` 검토 완료 시 PO가 PR 머지 (또는 승인 리뷰).
   - 머지 이벤트가 CI를 트리거하여 자동으로 Claude가 `spec.md` 초안을 작성하고 PR을 생성하게 만들 수 있음.
3. **코드와의 동기화**:
   - 코드를 구현하는 최종 PR에 `plan.md`가 함께 포함되어 머지됨.
   - 구현 중 계획이 바뀌면 코드와 함께 `plan.md`를 같은 커밋에서 수정.
4. **보존 정책 (삭제 금지)**:
   - 머지 후에도 해당 폴더를 삭제하지 않고 유지함.
   - Git 이력과 디렉토리 자체가 **"누가 요청했고, 어떻게 설계되었으며, 어떤 계획으로 작성되었는가"에 대한 영구적인 감사 추적(Audit Trail)** 역할을 수행.

---

## 3. 아티팩트별 상세 작성법 및 템플릿

---

### 1) intent.md (기획 및 의도 정의)

- **작성 주체**: 비즈니스 담당자, PO, 또는 운영자 (Claude와 대화로 작성)
- **작성 원칙**:
  - 전문 개발 용어 없이 제안자의 언어로 작성.
  - "어떻게(How)" 구현할지가 아니라 **"무엇이 문제이고(Why/What), 무엇을 바라는가"**에 집중.
  - 명확한 제약조건(보안, 예산, 성능 등)과 미해결 질문을 명시.

#### [템플릿]

```markdown
# 의도: [기능 또는 변경 명칭]

- 작성자: [이름 / 소속 부서]
- 작성일: YYYY-MM-DD
- 상태: [초안(draft) | 검토요청(in-review) | 승인됨(approved)]

## 1. 문제 정의 (Problem)

- 현재 어떤 문제가 발생하고 있는가?
- 누가 불편을 겪고 있으며, 정량적/정성적 영향은 어느 정도인가?

## 2. 제안 결과 (Proposed Outcome)

- 이 작업이 완료되면 사용자는 무엇을 할 수 있게 되는가?
- 성공 여부를 어떻게 측정할 것인가?

## 3. 영향 받는 대상 (Affected Users & Systems)

- 대상 사용자군 (예: 내부 보상 처리자, 외부 일반 고객 등)
- 관련 시스템 (예: 고객 포털 웹, 인증 API 등)

## 4. 제약조건 (Constraints)

- 반드시 지켜야 할 기술적/비즈니스적 한계
- 예: 기존 인증 체계 유지, 신규 개인정보(PII) 수집 금지, 응답 시간 200ms 이내

## 5. 미해결 질문 (Open Questions)

- 기획 시점에 아직 결정되지 않아 설계 단계에서 확인해야 할 사항
```

---

### 2) spec.md (요구사항 및 설계 명세)

- **작성 주체**: Claude (사내 보안, UX, 브랜드 Skills 자동 적용) + PO/테크 리드 검토
- **작성 원칙**:
  - `intent.md`의 비즈니스 언어를 기술적 요구사항과 인터페이스 명세로 변환.
  - 사내 정책(인증, 에러 처리, 로깅 표준)을 실시간으로 주입하여 작성.
  - 상충되는 정책이나 기술적 우려점은 `Areas of Concern` 섹션에 별도 표기하여 인간이 사전에 조율할 수 있도록 함.

#### [생성 프롬프트]

```markdown
첨부된 intent.md를 기반으로 시스템 연동 명세인 spec.md를 작성해줘.
우리 사내 표준 스킬(보안 정책, API 설계 가이드, UX 원칙)을 적용하고,
모호하거나 충돌하는 지점이 있다면 '우려 영역(Areas of Concern)' 섹션에 명확히 표기해줘.
```

#### [템플릿]

```markdown
# 명세서: [기능 명칭] (기반: intent.md YYYY-MM-DD)

- 작성/검토자: Claude (작성), [PO/테크리드 이름] (검토)
- 상태: [초안(draft) | 승인됨(approved)]

## 1. 아키텍처 개요 (Architecture Overview)

- 기존 시스템과 신규 기능의 연동 구조 (데이터 흐름, 컴포넌트 관계)

## 2. 기능 요구사항 (Functional Requirements)

- 세부 기능 1: 입력값, 유효성 검증 규칙, 기대 결과
- 세부 기능 2: 처리 조건 및 예외 케이스 정의

## 3. 인터페이스 & 데이터 계약 (API & Data Contracts)

- API 엔드포인트 명세 (HTTP 메서드, 경로, 요청/응답 JSON 스키마)
- DB 스키마 변경 사항 또는 이벤트 메시지 포맷

## 4. 준수 정책 및 표준 (Policies Applied)

- 보안: 게이트웨이 JWT 필수, 권한 스코프, 민감정보 마스킹
- 성능: 캐싱 전략, 외부 API 타임아웃 및 서킷 브레이커 설정
- UX: 오류 발생 시 사용자 피드백 가이드

## 5. 우려 영역 및 정책 충돌 (Areas of Concern)

- [정책 충돌 예시]: "기존 API 레이트 리밋(50 rps)으로 인해 동시 접속 폭증 시 장애 가능성 있음 -> 캐시 계층 필요"
- [미결 사항 해결]: "intent.md의 미결 질문: 외부 손해사정사 접근은 v2로 연기하기로 결정"
```

---

### 3) plan.md (구현 계획)

- **작성 주체**: 엔지니어 + Claude Code (Plan Mode)
- **작성 원칙**:
  - **코드 작성 전 단계에서 확정**: Plan Mode를 통해 코드 파일을 전혀 수정하지 않은 상태로 작성.
  - **구체성**: 수정할 구체적 파일 경로, 작업 단계 순서, 검증 증명(Proof)을 포함.
  - 제3자 개발자가 계획서만 보고도 동일하게 구현할 수 있는 수준이어야 함.
  - PR 검토 시 리뷰어가 diff를 대조하는 기준점이 됨.

#### [Plan Mode 인터뷰 질문 팁]

1. "이 변경으로 인해 기존에 깨질 수 있는 가장 위험한 기능은 무엇인가?"
2. "이 방식을 선택함으로써 배제한 다른 대안은 무엇이며, 왜 배제했는가?"
3. "이 작업의 성공을 증명할 수 있는 최소한의 자동화 테스트는 무엇인가?"

#### [템플릿]

```markdown
# 구현 계획: [기능 명칭] (기반: spec.md YYYY-MM-DD)

- 담당 엔지니어: [이름]
- 상태: [계획중(planning) | 승인됨(approved) | 구현완료(completed)]

## 1. 변경 대상 파일 (Files that change)

- [생성] `portal/src/claims/StatusPanel.tsx`: 상태 조회 UI 패널
- [수정] `claims-api/routes/status.py`: 상태 엔드포인트 라우팅 추가
- [수정] `claims-api/services/claims.py`: 도메인 로직 및 5분 캐시 적용
- [테스트] `claims-api/tests/test_status.py`: 4개 상태값 반환 단위/통합 테스트

## 2. 작업 순서 (Order of Work)

1. `claims-api/routes/status.py`에 GET 엔드포인트 정의 (인증 가드 적용).
2. `claims.py`에서 캐시 레이어 및 응답 포맷터 구현.
3. 단위 테스트 작성 및 통과 확인 (`pytest test_status.py`).
4. 프론트엔드 `StatusPanel.tsx` 컴포넌트 개발 및 목업 대조.
5. 포털 메인 화면 네비게이션 메뉴에 패널 마운트.

## 3. 잠재 위험 및 대응 방안 (Risks & Mitigations)

- 위험: upstream API 일시 다운 시 포털 전체 로딩 지연.
- 대응: 3초 타임아웃 및 폴백(Fallback) 메시지 노출 처리.

## 4. 검증 및 완료 증거 (Proof)

- 자동화 테스트: `pytest claims-api/tests/test_status.py` 전수 통과.
- 린트/빌드: `make lint`, `make build` 에러 0건.
- 시각적 확인: 승인된 디자인 목업과 실제 화면 캡처 대조 일치.
```

---

## 4. Git 자동화 및 실무 팁

### (1) `plan.md` 동기화 강제 훅 (Git Hook)

구현 도중 방향이 바뀌었음에도 `plan.md`가 수정되지 않는 상황을 방지하기 위해, Pre-commit 또는 CI 훅으로 체크할 수 있습니다.

```bash
#!/bin/bash
# .claude/hooks/sync-plan-check.sh
# 코드가 대폭 변경되었는데 plan.md가 커밋에 포함되지 않았을 경우 경고/차단
CHANGED_CODE=$(git diff --cached --name-only | grep -E '^src/|^api/')
CHANGED_PLAN=$(git diff --cached --name-only | grep 'plan.md')

if [ -n "$CHANGED_CODE" ] && [ -z "$CHANGED_PLAN" ]; then
  echo "⚠️ [주의] 코드 변경사항이 커밋되지만 plan.md 수정이 포함되지 않았습니다."
  echo "구현 내용이 계획과 일치하는지 확인하고 필요한 경우 plan.md도 함께 업데이트하세요."
fi
```

### (2) PR 템플릿과 연결

Pull Request 템플릿(`.github/pull_request_template.md`)에 아티팩트 링크를 강제하여 리뷰어가 맥락을 즉시 파악하도록 만듭니다.

```markdown
## 연관 아티팩트

- Intent: [intent.md 경로](intent/2026-06-02-claims-status/intent.md)
- Spec: [spec.md 경로](intent/2026-06-02-claims-status/spec.md)
- Plan: [plan.md 경로](intent/2026-06-02-claims-status/plan.md)

## 계획 대비 구현 검증

- [ ] diff가 plan.md에 명시된 변경 파일 및 작업 순서와 일치하는가?
- [ ] plan.md의 Proof(검증 증거)가 실행 결과 로그로 첨부되었는가?
```
