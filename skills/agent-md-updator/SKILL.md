---
name: agent-md-updator
description: Use when modifying or appending rules, instructions, or configurations to multiple agent markdown files (~/.claude/CLAUDE.md, ~/.agents/AGENTS.md, ~/.gemini/GEMINI.md) directly and manually.
---

# Agent MD Updator

## Overview
이 스킬은 여러 AI 에이전트 도구의 고정 지시문 파일들(`~/.claude/CLAUDE.md`, `~/.agents/AGENTS.md`, `~/.gemini/GEMINI.md`)을 에이전트가 **직접 눈으로 확인하고 상황에 알맞게 수동으로 업데이트**하는 프로세스 지침을 규정합니다.

에이전트는 자동화 스크립트에 의존하지 않고, 직접 파일들을 열어 기존 규칙의 뉘앙스를 대조한 후 중복 없이 안전하게 룰을 추가해야 합니다.

## 대상 파일
- `~/.claude/CLAUDE.md`
- `~/.agents/AGENTS.md`
- `~/.gemini/GEMINI.md`

## 3단계 프로세스 지침

에이전트는 본 스킬을 사용할 때 반드시 다음 단계를 순서대로 수동 수행하십시오.

### 1단계: ~/tmp에 백업 파일 생성
수정 작업을 진행하기 전, 원본 파일들의 유실을 막기 위해 반드시 `~/tmp`에 본문 백업을 생성해야 합니다.
- 수정할 각 파일들의 본문 내용을 복사하여 `~/tmp/` 하위에 각각 독립된 백업본을 만드십시오.
- 백업 파일 이름 예시: `~/tmp/backup_YYYYMMDD_HHMMSS_CLAUDE.md`

### 2단계: 심볼릭 링크 관계 확인
타겟 파일들이 서로 연결되어 있는 심볼릭 링크(symlink)인지 먼저 검사하십시오.
- 예를 들어, `~/.claude/CLAUDE.md` 및 `~/.gemini/GEMINI.md`가 `~/.agents/AGENTS.md`를 가리키고 있을 수 있습니다.
- 심볼릭 링크 구조인 경우, 링크 대상인 원본 파일(실질 파일)을 한 번만 직접 수정하여 동일한 내용이 2~3회 연속으로 중복 덧붙여지는 일이 없도록 조심하십시오.

### 3단계: 내용 대조 및 안전한 병합
각 파일(또는 실질 파일)을 직접 열어보고 내용을 정밀히 분석하십시오.
- 추가하려는 규칙이 이미 존재하는지 검사하십시오. 중복된 내용이 있다면 수정을 생략합니다.
- 각 지시문 파일마다 포맷이나 기존 내용이 다를 수 있으므로, 기존 뉘앙스에 맞춰 자연스러운 위치에 조화롭게 병합하십시오.

## Common Mistakes
- **백업 누락**: "단순 수정"이라는 이유로 `~/tmp`에 백업을 생성하지 않고 바로 파일을 건드리는 실수.
- **심볼릭 링크 구조 무시**: 심볼릭 링크 관계인 파일들을 각각 독립 파일로 인지하고 루프를 돌며 수정을 시도하여, 원본 파일이 다중 업데이트되는 실수.
- **기존 규칙과 중복 추가**: 이미 적혀 있는 규칙을 보지 않고 파일 최하단에 동일한 규칙을 기계적으로 덧붙여 지시문 파일을 어지럽히는 행위.
