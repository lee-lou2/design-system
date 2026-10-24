---
version: alpha
name: Inkstone
description: >-
  AI·개발 강의, 신규 서비스 소개, AI 뉴스를 1:1 포스트 썸네일·16:9 영상·9:16 숏폼으로 만드는
  차분한 인포그래픽 디자인 시스템. 따뜻한 돌색 바탕, 잉크 3단, 인디고 한 가지 강조.
colors:
  canvas: "#F3F2EE"
  surface: "#FFFFFF"
  surface-muted: "#ECEBE6"
  line: "#E2E0D9"
  line-strong: "#CBC8BF"
  ink: "#1A1A18"
  ink-2: "#52514C"
  ink-3: "#6F6D66"
  primary: "{colors.accent}"
  accent: "#4353D1"
  accent-strong: "#2F3BA6"
  accent-soft: "#ECEEFB"
  accent-300: "#A9B1EE"
  inverse: "#1A1A18"
  on-inverse: "#F3F2EE"
  on-inverse-2: "#A8A69F"
  on-accent: "#FFFFFF"
  success: "#237A52"
  success-soft: "#E3F1E9"
  warning: "#966012"
  warning-soft: "#F6EDDA"
  danger: "#B83C33"
  danger-soft: "#F8E4E1"
  code-text: "#E8E6E1"
  code-comment: "#8C8A82"
  code-keyword: "#A9B1EE"
  code-string: "#A6D3B8"
  code-function: "#FFFFFF"
typography:
  display:
    fontFamily: Pretendard Variable
    fontSize: 112px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.04em
  h1:
    fontFamily: Pretendard Variable
    fontSize: 88px
    fontWeight: 700
    lineHeight: 1.24
    letterSpacing: -0.035em
  h2:
    fontFamily: Pretendard Variable
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.03em
  h3:
    fontFamily: Pretendard Variable
    fontSize: 44px
    fontWeight: 650
    lineHeight: 1.38
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Pretendard Variable
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: -0.01em
  body:
    fontFamily: Pretendard Variable
    fontSize: 34px
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: -0.01em
  label:
    fontFamily: Pretendard Variable
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: -0.005em
  caption:
    fontFamily: Pretendard Variable
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0em
  mono:
    fontFamily: Geist Mono
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.08em
  stat:
    fontFamily: Pretendard Variable
    fontSize: 160px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.045em
  subtitle:
    fontFamily: Pretendard Variable
    fontSize: 52px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: -0.015em
  code:
    fontFamily: Geist Mono
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0em
rounded:
  xs: 6px
  sm: 12px
  md: 20px
  lg: 32px
  full: 999px
spacing:
  2xs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  5xl: 128px
  gutter: 24px
  safe-1x1: 72px
  safe-16x9-x: 112px
  safe-16x9-y: 88px
  safe-9x16-top: 220px
  safe-9x16-bottom: 420px
  safe-9x16-left: 72px
  safe-9x16-right: 140px
components:
  frame-1x1:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    width: 1080px
    height: 1080px
    padding: 72px
  frame-4x5:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    width: 1080px
    height: 1350px
    padding: 72px
  frame-16x9:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    width: 1920px
    height: 1080px
    padding: 112px
  frame-9x16:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    width: 1080px
    height: 1920px
    padding: 72px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-muted:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-focus:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-strong}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-inverse:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
    rounded: "{rounded.lg}"
    padding: 32px
  chip:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 52px
    padding: 22px
  chip-soft:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 52px
    padding: 22px
  chip-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 52px
    padding: 22px
  chip-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 52px
    padding: 22px
  chip-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.warning}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 52px
    padding: 22px
  chip-danger:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.danger}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 52px
    padding: 22px
  icon-tile:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    size: 72px
  icon-tile-soft:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent}"
    rounded: "{rounded.md}"
    size: 72px
  icon-tile-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    size: 72px
  num:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    size: 56px
  num-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    size: 56px
  node:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 24px
  node-focus:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-strong}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 24px
  node-inverse:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 24px
  bar:
    backgroundColor: "{colors.line-strong}"
    rounded: "{rounded.xs}"
    height: 36px
  bar-focus:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.xs}"
    height: 36px
  window:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  code-window:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.code-text}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 32px
  callout:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
    typography: "{typography.label}"
    rounded: 18px
    padding: 20px
  bubble-user:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
    typography: "{typography.body}"
    rounded: 30px
    padding: 26px
  bubble-ai:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: 30px
    padding: 26px
  subtitle:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
    typography: "{typography.subtitle}"
    rounded: 20px
    padding: 32px
  lower-third:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: 24px
    padding: 24px
  subtitle-highlight:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.accent-300}"
    typography: "{typography.subtitle}"
  inverse-caption:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse-2}"
    typography: "{typography.caption}"
  source:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-3}"
    typography: "{typography.caption}"
  divider:
    backgroundColor: "{colors.line}"
    height: 2px
  series-focus:
    backgroundColor: "{colors.primary}"
  series-2:
    backgroundColor: "{colors.ink}"
  series-3:
    backgroundColor: "{colors.accent-300}"
  series-rest:
    backgroundColor: "{colors.line-strong}"
  code-keyword:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.code-keyword}"
    typography: "{typography.code}"
  code-string:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.code-string}"
    typography: "{typography.code}"
  code-comment:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.code-comment}"
    typography: "{typography.code}"
  code-function:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.code-function}"
    typography: "{typography.code}"
---

# Inkstone — 차분한 인포그래픽 디자인 시스템

> 벼루(inkstone)처럼: 돌색 바탕 위에 먹(잉크)으로 쓰고, 꼭 필요한 한 곳에만 색을 찍는다.

이 파일이 정본이다. 위 YAML 토큰이 값을 정하고, 아래 글이 쓰는 법을 정한다. 구현은 `assets/ds.css`(클래스·토큰)와 `assets/icons.js`(아이콘), 예시는 `templates/`에 있다. 값을 바꾸면 `ds.css`도 같이 바꾸고 `npm run check`로 확인한다.

## Overview

**무엇을 만드나** — AI 강의·개발 강의·신규 서비스 소개·AI 기술 뉴스를 그림으로 설명하는 그래픽.

| 표면 | 크기 | 쓰임 |
|---|---|---|
| 1:1 포스트 썸네일 | 1080×1080 | 블로그·인스타 글 대표 이미지. 글 한 편을 한 장으로 설명 |
| 4:5 포스트 | 1080×1350 | 인스타 피드 세로형(1:1 레이아웃에 한 줄 더) |
| 16:9 영상 장면 | 1920×1080 | 유튜브 강의·뉴스 영상의 모션 장면 |
| 16:9 유튜브 썸네일 | 1920×1080 → 1280×720 | 영상 목록 썸네일(글자 더 크게, 요소 더 적게) |
| 9:16 숏폼 | 1080×1920 | 릴스·쇼츠. 플랫폼 UI 자리를 비운다 |

**성격** — 차분하다 · 균형 잡혔다 · 설명을 잘한다 · 정확하다. 귀엽거나(아기자기) 화려하거나(네온·그라데이션) 비어 보이지(여백 과다) 않는다.

**다섯 원칙**

1. **한 장, 한 메시지.** 제목 1개 + 핵심 그림 1개 + 보조 정보 2~4개.
2. **색은 의미에만.** 화면의 90%는 무채색. 인디고는 초점 1~2곳, 상태색은 상태에만.
3. **글보다 구조.** 흐름·비교·숫자·화면으로 보여 주고, 글은 이름표로 쓴다.
4. **선과 면으로 위계.** 그림자 대신 2px 선과 면 색. 떠 있는 것(창·코드·주석)만 그림자.
5. **꽉 차되 숨 쉬게.** 정보 단위 4~7개, 빈 곳은 화면의 30~40%.

**레퍼런스에서 가져온 것** (2026-10 조사)

| 레퍼런스 | 가져온 것 | 버린 것 |
|---|---|---|
| 제품 소개 랜딩 페이지(흰 면·1px 선 계열) | 흰 면·검정 글씨·1px 선, 상태에만 색, 제품을 닮은 가짜 화면, 시간축 모션 | 웹 페이지 여백(썸네일엔 너무 비어 보임) |
| Bento Grids(라이트), Vercel Geist, Linear | 가는 선으로 나눈 벤토 타일, 영문 모노 꼬리표, 숫자 앵커 | 어두운 배경, 네온 |
| FT·Economist식 에디토리얼 차트 | 초점 계열 하나만 색, 나머지 회색, 범례 대신 직접 이름표 | — |
| ByteByteGo식 시스템 다이어그램 | 노드·화살표·로고로 구조 설명, 단계 번호 | 계열마다 다른 파스텔(색이 많다) |
| Untitled UI(유료 Figma 시스템) | 무채색 램프 + 역할 이름(text-primary 등) 구조, 대비 표기 | 27계열 × 11~12단계 색 램프(이 용도엔 과함) |
| Envato·Creative Market 인기 인포그래픽·캐러셀 | 시리즈 일관성(같은 머리줄·같은 자리), 아이콘+숫자 조합 | 원색 다색 팔레트, 3D 장식 |
| 토스 테크 블로그 썸네일 | 대상 하나에 집중하는 차분함 | 3D 일러스트, 낮은 정보 밀도 |
| 에디토리얼 다이어그램 가이드라인 | 초점 1~2개 규칙, 직각 화살표, 그림자 대신 선, 포스터 프레임 | 수십 종 타입 체계(이 용도엔 복잡) |

## Colors

**구성** — 돌색 무채색 5단(바탕·면·선) + 잉크 3단(글자) + 인디고 1색(강조) + 상태 3색(의미 있을 때만).

| 역할 | 토큰 | 쓰는 곳 |
|---|---|---|
| 바탕 | `canvas` | 모든 프레임 바탕. 순백보다 눈이 편하고, 흰 피드 위에서 구분된다 |
| 면 | `surface` | 카드·창·노드. 바탕 위에 한 단 올라온 면 |
| 낮은 면 | `surface-muted` | 칩·아이콘 타일·비교의 "이전" 쪽 |
| 선 | `line` / `line-strong` | 카드 테두리 / 화살표·회색 막대·구분선 |
| 글자 | `ink` / `ink-2` / `ink-3` | 제목·본문 / 보조 / 캡션·꼬리표(바탕 대비 4.6:1) |
| 강조 | `accent` | 제목 핵심어, 초점 노드·막대·번호 — 화면당 1~2곳 |
| 강조 면 | `accent-soft` + `accent-strong` 글자 | 초점 카드·결론 줄 |
| 반전 | `inverse` + `on-inverse` | 코드 창·자막·사용자 말풍선·강조 덩어리(화면당 1개) |
| 상태 | `success` / `warning` / `danger` (+ `-soft`) | 완료·대기·오류처럼 **뜻이 있는** 상태만 |

**배분** — 바탕·면 약 85%, 잉크 약 10%, 인디고 5% 이하. 인디고 면적이 넓어지면 차분함이 깨진다.

**규칙**

- 초점은 **화면당 1~2곳**. 세 곳 이상이 강조돼야 한다면 아직 무엇이 핵심인지 고르지 않은 것이다. 제목 속 핵심어는 세지 않고, 번호 표식·강조 테두리 같은 주석은 한 묶음으로 센다.
- **회색 = 맥락·이전·나머지, 인디고 = 초점·이후·답.** 비교·차트·흐름 모두 같은 뜻으로 쓴다.
- 제목에서는 핵심어 **한 덩어리**만 `accent`로 칠한다(밑줄·형광펜 없음).
- 반전 면(`inverse`)은 **화면당 1개**. 벤토의 무게중심 역할.
- 상태색으로 장식하지 않는다. ✓는 `ink`, ✗는 `ink-3`(초점 카드 안에서만 `.checks--accent`), 정말 좋고 나쁨일 때만 `success`/`danger`.
- 예시 화면 속 아바타·스위치·폴더 아이콘·보조 버튼은 잉크로 둔다. 인디고는 그 화면이 말하려는 **답 한 곳**에만.
- 브랜드 로고는 **단색**(`ink`)으로. 원래 브랜드 색을 쓰면 화면이 알록달록해진다.
- 차트 계열은 최대 4개: `series-focus`(accent) → `series-2`(ink) → `series-3`(accent-300) → `series-rest`(line-strong). 보통은 초점 1개 + 회색이면 충분하다.
- `primary`는 `accent`의 별칭이다(DESIGN.md 도구 호환용). 이름이 "주색"이어도 면적은 강조색 규칙(5% 이하)을 따른다.
- 순수 검정(#000)·순수 흰 바탕(#FFF 프레임)·그라데이션·네온 글로우 금지. (예외: `.frame--white`는 캡처 화면이 주인공일 때만)

**대비(WCAG)** — `ink` 15.6:1, `ink-2` 7.1:1, `ink-3` 4.6:1, `accent` 5.5:1(모두 `canvas` 기준), 흰 글자 on `accent` 6.2:1, 상태 글자 on 각 `-soft` 4.5:1 이상.

## Typography

**글꼴 두 개만** — `Pretendard Variable`(한글·영문 전부), `Geist Mono`(영문·숫자 꼬리표와 코드). 세리프·장식 글꼴·세 번째 글꼴은 쓰지 않는다.

| 토큰 | 크기 / 굵기 / 행간 | 쓰는 곳 |
|---|---|---|
| `display` | 112 / 700 / 1.2 | 영상 타이틀·챕터, 숏폼 훅 |
| `h1` | 88 / 700 / 1.24 | 1:1 썸네일 제목, 장면 제목 |
| `h2` | 64 / 700 / 1.3 | 장면 소제목, 카드 큰 제목 |
| `h3` | 44 / 650 / 1.38 | 카드 제목, 비교 항목 이름 |
| `body-lg` | 40 / 500 / 1.6 | 영상·숏폼 설명 한 줄 |
| `body` | 34 / 500 / 1.6 | 썸네일 설명, 노드 이름, 체크 목록 |
| `label` | 28 / 600 / 1.45 | 칩·막대 이름·단계 설명 |
| `caption` | 24 / 500 / 1.5 | 출처·부가 설명(가장 작은 한글) |
| `mono` | 22 / 500 / 1.4 · +0.08em 대문자 | 영문 꼬리표(`HOW IT WORKS`, `EP.12`) |
| `stat` | 160 / 700 / 1 | 큰 숫자(112·80 변형 있음) |
| `subtitle` | 52 / 600 / 1.45 | 영상 자막(9:16은 56) |
| `code` | 28 / 400 / 1.65 | 코드 창 |

크기는 모두 **짧은 변 1080px 캔버스 기준**이라 세 비율에 같은 값을 쓴다. 유튜브 썸네일만 제목을 148~176px로 키운다. 9:16은 휴대폰 전체 화면으로 보므로 작은 역할을 한 단계씩 키운다(`caption` 28 · `label` 32 · `body` 38 · `mono` 24 — `ds.css`가 `.frame--9x16`에서 자동 적용).

**규칙**

- 한글 최소 크기 24px(`caption`), 9:16은 28px. 썸네일에서 읽혀야 하는 글은 34px 이상.
- **행간은 넉넉하게**: 제목 1.2~1.3, 라벨 1.45, 본문 1.6. 공간이 모자라도 행간·안쪽 여백을 깎지 않는다 — 글을 줄이거나 배치를 바꾼다.
- 굵기는 500·600·650·700만(유튜브 썸네일 제목만 750). 300·400 본문은 영상에서 흐려진다.
- 큰 글자일수록 자간을 좁힌다(-0.04em ~ -0.01em). 줄바꿈은 `word-break: keep-all`로 단어 단위.
- 제목은 **최대 2줄**, 한 줄 9~12자. 줄을 직접 끊어 의미 단위로 나눈다. 마지막 줄에 한두 글자만 남지 않게 한다.
- 긴 영어 용어(예: Retrieval-Augmented Generation)는 제목에 그대로 넣지 않는다. 제목에는 약어(RAG)를 쓰고 원어는 제목 아래 모노 한 줄로.
- `mono`는 **영문·숫자 전용**(Geist Mono에 한글이 없다). 한글 꼬리표는 `label`로.
- 숫자는 `tabular-nums`. 단위는 숫자의 40% 크기로 붙인다(`5분`, `84%`).

## Layout

**캔버스와 안전 영역**

| 비율 | 크기 | 안전 여백(위·오른쪽·아래·왼쪽) | 메모 |
|---|---|---|---|
| 1:1 | 1080×1080 | 72 · 72 · 72 · 72 | 시각 요소는 가장자리 밖으로 잘려 나가도 된다(글자는 안 됨) |
| 4:5 | 1080×1350 | 80 · 72 · 80 · 72 | 1:1 구성 + 타일 한 줄 |
| 16:9 | 1920×1080 | 88 · 112 · 88 · 112 | 자막 장면은 아래 216 |
| 9:16 | 1080×1920 | 220 · 140 · 420 · 72 | 위=프로필, 아래=캡션, 오른쪽=좋아요 버튼. 자막 장면은 아래 680 |
| 유튜브 썸네일 | 1920×1080 | 96 · 112 · 88 · 96 | 오른쪽 아래(재생 시간 자리)에 글자 금지 |

**간격** — 4·8 단위: `2xs 4 · xs 8 · sm 12 · md 16 · lg 24 · xl 32 · 2xl 48 · 3xl 64 · 4xl 96 · 5xl 128`. 타일 사이 20~24, 카드 안 여백 32(작은 카드 24, 큰 카드 48).

**한 장의 짜임(1:1 기본형)**

```
┌─────────────────────────────┐
│ ● 분류            EP·날짜   │  머리줄 (28px)
│                             │  28
│ 제목 첫 줄                   │  h1 88px × 2줄  ── 화면 위 30~35%
│ 핵심어가 든 둘째 줄           │
│                             │  40~64 (.spacer, 최소 32)
│ ┌───────────────┬────────┐ │
│ │  핵심 그림      │ 보조 1 │ │  그림 영역 ── 화면 아래 55~60%
│ │               ├────────┤ │  (흐름·비교·차트·화면·코드)
│ │               │ 보조 2 │ │
│ └───────────────┴────────┘ │
└─────────────────────────────┘
```

**규칙**

- **왼쪽 정렬이 기본.** 가운데 정렬은 훅(질문)·인용·챕터 번호에만.
- 제목과 그림 사이는 **40~64px**(`.spacer`로 최소 간격 보장). 96px을 넘으면 여백을 두지 말고 그림을 키우거나 정보(팁·범례·출처)를 더한다.
- 그림 영역 안 정보 단위는 **4~7개**(노드·숫자·칩·로고 묶음 각각 1개). 8개가 넘으면 두 장으로 나눈다.
- 같은 크기 카드를 4개 이상 한 줄로 늘어놓지 않는다(자판기처럼 보인다). 폭을 다르게(1.25fr / 1fr) 나눈다.
- 벤토 타일은 **라벨은 위, 내용은 아래 기준선**에 맞춘다(여러 타일의 숫자·목록이 같은 높이에 앉는다).
- 중첩 둥글기: 안쪽 반경 = 바깥 반경 − 안쪽 여백(카드 32 − 여백 12 = 20).
- 16:9은 **좌우 2단**(설명 600~700 / 그림 나머지) 또는 **위아래**(제목 / 전체 폭 그림)를 쓴다. 설명 장면은 분류·제목을 **왼쪽 위**(안전 여백 바로 아래)에 고정한다 — 타이틀·챕터·촬영 오버레이만 예외.
- 9:16은 **세로 한 줄 흐름**. 좌우 2단은 휴대폰 화면 + 단계처럼 짝이 분명할 때만, 오른쪽 140px 비움.

**계층과 넘침 — 안쪽은 언제나 바깥 안에**

프레임 → 영역(제목·그림) → 블록(카드·창) → 요소(노드·칩·행) → 내용(글·아이콘)의 5단계로 쌓는다.

| 단계 | 사이 간격 | 안쪽 여백 | 둥글기 |
|---|---|---|---|
| 프레임 | — | 안전 여백(위 표) | — |
| 영역 | 제목↔그림 40~64 | — | — |
| 블록 | 20~24 | 32 (작은 카드 24, 큰 카드 48) | 32 |
| 요소 | 12~16 | 노드 22·28, 칩 0·22, 목록 행 위아래 20~30 | 16~20 |
| 내용 | 아이콘↔글 10~20, 줄 사이는 행간 | — | — |

- **바깥 간격 ≥ 안쪽 간격.** 블록 사이(24) > 요소 사이(16) > 내용 사이(10). 거꾸로 되면 묶음이 흐트러져 보인다.
- **안쪽 요소는 바깥 상자의 안쪽 여백 안에만.** 의도한 예외는 둘뿐: 가장자리 밖으로 잘리는 화면(`data-bleed`)과 표식·주석(`.marker` `.callout` `.hl-ring`).
- 줄·격자의 자식은 줄어들 수 있고(`min-width: 0`, ds.css 기본) 글은 그 안에서 줄바꿈된다. 크기가 정해진 부품(아이콘 타일·번호·칩·키·버튼·스위치)은 줄지 않는다.
- 넘칠 것 같으면 순서대로: ① 글을 줄인다 ② 한 단계 작은 변형(`--sm`) ③ 열·배치를 바꾼다 ④ 두 장으로 나눈다.
- 문장 속 강조(`.hl`)가 있는 글은 `<span>` 하나로 감싸서 flex 줄에 넣는다(조각나면 사이에 간격이 끼어 문장이 벌어진다).
- 남는 높이는 `.spacer`(제목↔그림, 최소 간격 보장) 또는 `.grow`(그림 블록이 채움) 중 **하나만**. 같은 줄에 둘을 쓰면 공간을 나눠 가져 블록이 넘친다.
- 카드 안 빈 곳이 크면(타일 높이의 40% 이상) 내용을 위·아래로 나눠 앉히거나(라벨 위·내용 아래), 요소를 키우거나, 한 줄 정보를 더한다.

## Elevation & Depth

평평하게 쌓는다. 층은 **면 색 + 2px 선**으로 나누고, 그림자는 "화면 위에 떠 있는 것"에만 준다.

| 층 | 처리 | 예 |
|---|---|---|
| 0 바탕 | `canvas` | 프레임 |
| 1 면 | `surface` + `line` 2px | 카드·노드·표 |
| 1′ 낮은 면 | `surface-muted`, 선 없음 | 칩·"이전" 카드 |
| 2 떠 있는 것 | `shadow-float` (0 28px 56px -24px, 22%) | 창·캡처·코드 창·폰 |
| 3 주석 | `shadow-pop` (0 12px 32px -12px, 28%) | 말풍선 주석·로어서드·팝업 |

- 강조는 그림자가 아니라 **반전 면**(`inverse`)이나 **초점 면**(`accent-soft` + `accent` 선)으로.
- 글로우·네온·두꺼운 그림자·유리 효과(블러) 금지.
- 점 격자 배경(`.frame--grid`)은 다이어그램 장면에만, 아주 옅게(잉크 9%).

## Shapes

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| `xs` | 6 | 막대 끝 |
| `sm` | 12 | 작은 표식·키보드 키·표 초점 열 |
| `md` | 20 | 노드·아이콘 타일(크기의 28%)·안쪽 패널 |
| `lg` | 32 | 카드·창·코드 창 |
| `full` | 999 | 칩·번호·아바타·스위치 |

- **선 두께**: 테두리 2px, 화살표·연결선 3px, 강조 테두리(`hl-ring`) 4px. 아이콘 선 1.75(24 기준).
- **화살표**: 직각으로 꺾고 모서리는 반경 14~16으로 둥글게. 머리는 열린 꺾쇠(▷ 아님). 대각선은 "엉킨 이전 상태"를 보여 줄 때만.
- **점선**: 되돌아가는 길·선택·예정. 실선은 실제 흐름.
- 둥근 사진, 좌측 강조선 카드(왼쪽만 굵은 선), 알약 안의 알약은 쓰지 않는다.

## Components

클래스는 `assets/ds.css`에 있다. 부품 시트는 `preview.html`(C1~C6), 실제 조합은 `templates/`.

**기본**

| 부품 | 클래스 | 메모 |
|---|---|---|
| 프레임 | `.frame .frame--1x1 / --4x5 / --16x9 / --9x16` | `--sub`(자막 자리), `--grid`(점 격자), `--white` |
| 머리줄 | `.meta` + `.kicker` + `.t-mono` | 왼쪽 분류(점 + 인디고), 오른쪽 회차·날짜(모노) |
| 브랜드 | `.brand` + `.brand__mark` | 잉크 사각 + 인디고 점. 채널 로고로 바꿔 쓴다 |
| 카드 | `.card` `--muted --focus --inverse --ghost --sm --lg` | `card__head`에 모노 라벨 + 보조 글 |
| 칩 | `.chip` `--outline --soft --accent --inverse --success --warning --danger --sm --lg` | 아이콘 + 2~6자 |
| 빈칸 | `.spacer` (`--min`) | 남는 높이를 채우되 최소 간격(기본 40) 보장. 제목↔그림 사이에 |
| 아이콘 타일 | `.icon-tile` `--soft --accent --line --inverse --logo --sm --lg --xl` | 72px 기본, 아이콘은 타일의 50% |
| 번호 | `.num` `--accent --line --sm --lg` | 기본은 잉크. "지금 단계"를 보여 주는 영상·가이드에서만 지금=인디고, 다음=선. 정지 썸네일의 순서 번호는 모두 잉크 |
| 숫자 | `.stat` + `__value __unit __label` `--md --sm --accent` | 화면당 큰 숫자 1개 |
| 체크 목록 | `.checks li` (`.is-no`), `.checks--accent` | ✓ 잉크, ✗ 회색. 초점 카드 안에서만 인디고 |
| 인용·키 | `.quote`, `.kbd` | 인용은 화면당 1개, 키는 단축키 설명에 |

**차트** — `.bars`(가로 막대·순위), `.columns`(세로 막대·시간), `.segbar` + `.seg`(전체를 나눈 구간·시간 분해), `.ring`(비율 하나), `.lc-*`(SVG 선 그래프·추세), `.table`(기준별 비교: 초점 열 `td.is-focus`, 초점 행 `tr.is-focus` + 정렬 맞춤 `.table--inset`). 초점 1개만 `.is-focus`.

**다이어그램** — `.node`(`--focus --inverse --ghost --pill --sm --col`), `.flow` + `.link`(`--v --accent --dashed`, `.link__label`·`--mono`), `.wire`(자유 배치 SVG 선), `.steps`·`.steps-h`(단계), `.compare` + `.compare__vs`(A vs B), `.timeline` + `.tl-item`(시간 순서), `.layers` + `.layers__row` + `.layer`(`--muted --focus --inverse --ghost`, 아키텍처 계층·스택).

**화면·대화·코드** — `.window`(+ `__bar __dots __url __body`), `.phone`, `.hl-ring`(`--spot` 바깥 어둡게), `.marker`(번호 표식), `.callout`(`--down --up --left --right --accent --light`), `.zoom`(확대경), `.cursor`(+ `__ripple`), `.chat .msg .bubble .avatar(--muted --accent) .typing`, `.speech`(꼬리 있는 말풍선), `.code`(`--light`, `.line.is-focus`, 구문 `.k .s .c .f .p .o`), 예시 화면용 `.btn .input .toggle(--accent) .skeleton` — 예시 화면 속 부품은 기본이 잉크다.

**영상 오버레이** — `.subtitle`(자막, 핵심어 `<em>`), `.lower-third`(이름 자막), `.chapters`(작은 진행 막대), `.chapter-steps`(이름 있는 진행 막대).

## Iconography

- **선 아이콘 한 벌만**: Lucide(ISC). 선 1.75, 둥근 끝, 24 격자. `<i data-icon="bot"></i>` — 180개를 `assets/icons.js`에 담았다(목록은 `preview.html`).
- **브랜드 로고**: Simple Icons(CC0)의 단색 로고 80개. `<i data-logo="github"></i>`. 원래 색이 아니라 `ink`로 칠한다. 없는 브랜드(OpenAI, Slack 등)는 공식 프레스킷 SVG를 단색으로 바꿔 쓴다.
- **크기**: 글자 옆 1em, 아이콘 타일 안 50%(36px), 큰 타일 64px까지.
- 아이콘은 혼자 두지 않는다. **타일 + 이름표** 또는 **칩 안**에 둔다.
- 이모지·3D 아이콘·채운 아이콘과 선 아이콘 섞기·다른 아이콘 세트 섞기 금지.
- 아이콘을 더하려면 `scripts/build-icons.mjs` 목록에 이름을 넣고 `npm run icons`.

## Infographic Patterns

**내용 → 그림 고르기.** 글이 답하는 질문으로 고른다.

| 글이 답하는 질문 | 패턴 | 핵심 그림 | 템플릿 |
|---|---|---|---|
| X가 뭐야? (개념) | 벤토 요약 | 구조 흐름 + 숫자 + 단계 + 코드 | T1, V1 |
| 어떻게 동작해? (원리·과정) | 흐름도 | 단계 노드 + 화살표 + 되돌아가는 길 | T3, V4, S2 |
| A랑 B 뭐가 달라? (비교·선택) | 비교 | 두 카드 + 체크 + 결론 줄 / 비교표 | T2, V6, Y2 |
| 전과 후가 어떻게 달라? (효과) | 전/후 구조 | 엉킨 선 vs 정리된 선 + 숫자 | V3 |
| 뭐가 새로 생겼어? (서비스·기능) | 화면 소개 | 창 + 강조 테두리 + 번호 주석 | T4, V7 |
| 무엇이 얼마나? (뉴스·데이터) | 숫자 + 그래프 | 큰 숫자 1개 + 추세선/막대 + 출처 | T5, V5, S3 |
| 무엇과 연결돼? (생태계) | 허브 | 가운데 개념 + 위 사용자 + 양옆 대상 | T6, Y1 |
| 어떻게 따라 해? (튜토리얼) | 단계 + 화면/명령 | 번호 단계 + 터미널·입력창 | T7, V7, S4 |
| 어떻게 말하면 돼? (AI 사용법) | 대화 | 말풍선 + 도구 호출 칩 + 결과 목록 | V8 |
| 코드가 뭘 해? (코드 설명) | 코드 + 주석 | 줄 강조 ↔ 오른쪽 주석 번호 | V9 |
| N가지는? (정리·목록) | 목록 | 번호 + 아이콘 + 한 줄 + 분류 칩 | T8, V10, S5 |

**차트 규칙**

- 초점 계열 하나만 `accent`, 나머지는 `line-strong` 회색. 범례 대신 **선·막대 옆에 직접 이름표**.
- 막대는 0에서 시작. 3D·그림자·눈금 과다 금지(눈금선은 2~3개, `line`).
- 원(도넛)은 **비율 하나**(링)일 때만. 조각이 3개 이상이면 막대로 바꾼다.
- 변화가 메시지면 **두 시점의 차이**를 표시한다(괄호 + 값, 점선 + 값).
- 예시·가상 데이터는 `예시 데이터`, 실제 데이터는 출처를 `.source`로 반드시 적는다.

**다이어그램 규칙**

- 노드 9개를 넘기면 두 장으로 나눈다. 한 화면에 흐름 방향은 하나(가로 또는 세로).
- 화살표 이름표는 선 위 12px에 띄워 선을 가리지 않는다. 프로토콜·데이터 이름은 모노.
- 초점 노드 1개(`node--focus`), 강조 덩어리 1개(`node--inverse`)까지.

## Formats & Templates

| 파일 | 내용 |
|---|---|
| `templates/thumbnail.html` | 1:1 썸네일 T1 벤토 · T2 비교 · T3 흐름 · T4 화면 소개 · T5 숫자+그래프 · T6 허브 · T7 터미널 · T8 목록 |
| `templates/video.html` | 16:9 장면 V1 타이틀 · V2 챕터 · V3 개념(전/후) · V4 흐름도 · V5 차트 · V6 비교표 · V7 화면 따라 하기 · V8 대화 데모 · V9 코드 설명 · V10 정리 · V11 촬영 화면 오버레이 + 유튜브 썸네일 Y1·Y2 |
| `templates/shorts.html` | 9:16 S1 훅 · S2 세로 흐름 · S3 숫자 · S4 따라 하기 · S5 마무리 |
| `templates/cases.html` | 실전 검증 16장 — 개발 강의(브랜치 그래프·결정표·요청 흐름+구간 막대·층 쌓기 비교·명령 목록), 최신 뉴스(출시 벤토·4:5 주간 목록·발표 인용+숫자·3줄 요약), 사용 가이드(가로 단계+화면·전/후 변환·단축키 격자·휴대폰 화면), 서비스 소개, 극한 테스트(긴 용어·최대 밀도) |

**글 썸네일 만드는 순서** — "이 글을 잘 설명하는 한 장"

1. 글을 **한 문장**으로 줄인다. (예: "Claude Code에 MCP 서버를 등록하면 AI가 GitHub·Notion을 직접 다룬다")
2. 글이 답하는 질문으로 **패턴**을 고른다(위 표).
3. **제목** 2줄을 쓴다. 핵심어 하나를 `.hl`로. 글 제목을 그대로 옮기지 말고 결과·숫자를 앞에 둔다.
4. **핵심 그림** 하나를 글의 구조 그대로 그린다(과정이면 흐름, 비교면 두 칸).
5. **보조 정보 2~4개**를 붙인다: 숫자(시간·비율), 단계 수, 관련 도구 로고, 결과 칩.
6. **밀도 점검**: 정보 단위 4~7개, 빈 곳 30~40%, 초점 1~2곳.
7. **축소 점검**: 300px로 줄여도 제목과 그림의 구조가 읽히는지 본다.

**시리즈 일관성** — 머리줄 위치·제목 크기·바탕·브랜드 표시는 모든 장에서 같게. 분류(kicker) 글자로 시리즈를 구분하고, 분류마다 색을 바꾸지 않는다.

**유튜브 썸네일** — 글자 3~5단어(제목 148~176px), 요소는 큰 것 1개 + 보조 1개, 오른쪽 아래 비우기. 1280×720 JPG로 내보낸다.

**숏폼** — 첫 장면(훅)에 질문형 제목 + 한눈 구조. 장면마다 자막 1줄(최대 2줄), 3~5초.

## Motion

**성격** — 조용하고 또렷하게. 등장은 빠르게(0.3~0.7초), 읽는 시간은 넉넉히. 튕김·흔들림·회전·확대 효과 금지.

| 토큰 | 값 | 쓰임 |
|---|---|---|
| `ease-out` | cubic-bezier(.22, 1, .36, 1) | 등장 기본 |
| `ease-in` | cubic-bezier(.55, 0, 1, .45) | 퇴장 |
| `ease-inout` | cubic-bezier(.65, 0, .35, 1) | 이동·선 그리기·커서 |
| `ease-pop` | cubic-bezier(.34, 1.4, .64, 1) | 노드·칩이 톡 나타날 때만(살짝 넘침) |
| 길이 | 160 · 280 · 480 · 720 · 1000ms | 표시 · 퇴장 · 등장 · 막대·선 · 숫자 세기 |
| 간격(stagger) | 80ms(목록), 350~400ms(흐름 단계) | 같은 종류가 차례로 |

**등장 순서**(장면 하나) — ① 머리줄·분류 → ② 제목(줄마다 120ms) → ③ 핵심 그림 → ④ 선·화살표 그리기 → ⑤ 숫자·세부·칩 → ⑥ 자막·결론 → ⑦ **멈춰서 읽기 1.5초 이상**. 동시에 움직이는 덩어리는 2개까지.

**레시피**(`data-m` 속성, `--d`로 시작 시각)

| 순간 | `data-m` | 메모 |
|---|---|---|
| 글·카드 등장 | `rise` / `fade` | 28px 아래에서. 제목은 줄마다 |
| 노드·칩·아이콘 | `pop` | 0.86 → 1 크기 |
| 화살표 | `grow-x` / `grow-y` (`.link`) · `draw` (SVG, `pathLength="1"`) | 노드보다 250ms 늦게 |
| 막대 | `grow-x` / `grow-y` | 120ms 간격 |
| 숫자 | `count` (`.count`, `--n`) | 1초 이내 |
| 링 | `fill` (`--p`) | |
| 타이핑 | `type` (`--steps` = 글자 수) | 입력창·코드 한 줄 |
| 클릭 | 커서 `move` → `click`(물결) + 버튼 `press` | 커서는 클릭 뒤 `out` |
| 강조 | `ring`(강조 테두리), 다른 요소는 감싸서 `dim` | |
| 사라짐 | `out` | 등장보다 짧게(280ms) |
| 살아 있는 느낌 | `push` (6초에 3% 확대) | 정지 화면이 길 때만 |

**장면 길이** — 3~7초, 한 장면 한 생각. 장면 사이 전환은 컷 또는 240ms 크로스페이드. 슬라이드·3D 전환 금지. 자막은 말과 함께 바뀌고 한 번에 2줄까지.

**렌더** — 모든 모션은 CSS 애니메이션이라 시각 t로 멈춰 찍을 수 있다. `node scripts/render.mjs <html> --video`가 프레임을 찍어 MP4(30fps, H.264)를 만들고, 정지 화면(PNG)은 모든 등장이 끝난 시점으로 찍는다.

## Writing

- 해요체, 짧게, 능동형. "~할 수 있습니다" 대신 "~해요".
- 제목 공식: **결과 + 대상** ("MCP 서버 5분 연결"), **질문** ("RAG냐 파인튜닝이냐"), **숫자 + 변화** ("격차 18→3%p").
- 이름표(노드·칩)는 2~6자, 명사형. 설명 한 줄은 20자 안팎.
- 자막은 한 줄 18자 안팎, 핵심어 하나만 `<em>`.
- 숫자는 아라비아 숫자, 단위 붙여 쓰기(5분, 84%, 3건). 큰 수는 쉼표(1,200명).
- 예시 화면·가상 수치에는 `예시`를 붙인다. 실제 제품 화면을 흉내 낼 땐 실제 계정·키·개인정보를 넣지 않는다.

## Do's and Don'ts

**Do**

- 화면마다 초점을 먼저 정하고, 그 한 곳에만 인디고를 쓴다.
- 비교·변화는 "회색(이전) → 인디고(이후)"로 일관되게 보여 준다.
- 구조를 그림으로: 흐름은 화살표, 비교는 두 칸, 수치는 막대, 화면은 창.
- 벤토 타일 폭을 다르게 나누고, 라벨은 위·내용은 아래 기준선에 맞춘다.
- 로고는 단색, 아이콘은 Lucide 한 벌, 선 두께 1.75.
- 제목과 그림 사이 빈 띠가 커지면 그림을 키운다(정보 단위 4~7개).
- 숏폼·유튜브는 플랫폼 UI 자리(안전 영역)를 비운다.
- 출처와 "예시 데이터" 표시를 빠뜨리지 않는다.
- 넘치면 글을 줄이거나 배치를 바꾼다. 빈 곳이 생기면 여백 대신 정보를 더한다.

**Don't**

- 색을 여러 개 쓰지 않는다(계열마다 다른 파스텔, 분류마다 다른 색 금지).
- 그라데이션·네온·글로우·유리 효과·3D 아이콘·이모지를 쓰지 않는다.
- 모든 카드에 그림자를 주지 않는다. 떠 있는 것만.
- 같은 크기 카드 4개 이상을 한 줄로 늘어놓지 않는다.
- 제목을 3줄 이상 쓰거나, 24px보다 작은 한글을 쓰지 않는다.
- 범례 상자, 3D 차트, 조각 3개 이상의 원그래프를 쓰지 않는다.
- 한글을 모노 글꼴로 쓰지 않는다.
- 튕기고 흔들리는 모션, 끝없이 반복되는 의미 있는 모션을 쓰지 않는다.
- 좌측 굵은 강조선 카드, 둥근 사진, 가운데 정렬 본문을 쓰지 않는다.
- 행간·안쪽 여백을 깎아 내용을 욱여넣지 않는다.
- flex 줄 안에 문장 조각과 강조 span을 따로 넣지 않는다(문장이 벌어진다).
- `.spacer`와 `.grow`를 같은 줄에 함께 쓰지 않는다.

## Agent Prompt Guide

AI 에이전트가 새 그래픽을 만들 때 따르는 절차.

1. **입력 정리** — 표면(1:1·16:9·9:16·유튜브 썸네일), 글/대본, 핵심 메시지 한 문장, 실제 데이터와 출처.
2. **패턴 선택** — `Infographic Patterns` 표에서 하나. 가장 가까운 `templates/` 프레임을 복사해 시작한다(새로 짜지 않는다).
3. **내용 채우기** — 제목 2줄(핵심어 `.hl` 1개), 핵심 그림 1개, 보조 2~4개. 수치는 입력에 있는 것만 쓰고 없으면 `예시`로 표시한다.
4. **토큰만 사용** — 색은 `var(--*)`, 글자는 `.t-*`, 간격은 4·8 단위. 새 색·새 글꼴을 만들지 않는다.
5. **모션(영상만)** — 등장 순서 ①~⑦, `data-m` + `--d`. 장면 끝 1.5초는 정지.
6. **렌더·검사** — `node scripts/render.mjs <파일> --audit [--video]`. 배치 검사(글자 잘림·상자 넘침·겹침·안전 영역·행간·외톨이 글자·작은 글자·제목 아래 간격·빈 띠·강조색 초점 수)가 **오류 0·경고 0**이 될 때까지 고친다. 의도한 예외는 프레임에 `data-audit-skip="empty-band"`처럼 적고, 요소에는 의도를 표시한다: 가장자리 밖으로 잘리는 화면 `data-bleed`, 아래를 덮는 팝업·어둡게 `data-overlay`, 번호 범례처럼 주석 역할의 인디고 `data-annotation`.
7. **눈으로 확인** — PNG를 실제로 열어 보고 아래 체크리스트로 확인한다. 검사기는 균형·의미·사실 정확성을 판단하지 못한다.

**요청 예시**

```
DESIGN.md(Inkstone)를 따라 1:1 썸네일을 만들어 줘.
- 글: "Cursor에서 MCP로 Supabase 연결하기" (튜토리얼)
- 한 문장: 설정 파일에 서버 한 줄을 넣으면 Cursor가 DB를 직접 조회한다
- 패턴: T7 터미널(명령 + 결과) — 보조: 설정 시간, 단계 3개, 로고(cursor, supabase)
- 출력: templates/thumbnail.html 의 T7 프레임을 복사해 수정, exports/ 로 렌더
```

**완료 체크리스트**

- [ ] 인디고 초점이 1~2곳이다 / 상태색은 상태에만 썼다
- [ ] 제목 2줄 이하, 한글 24px 이상, 모노에 한글 없음
- [ ] 정보 단위 4~7개, 제목–그림 사이 빈 띠 60px 이하
- [ ] 안전 영역 안에 글자가 있다(9:16 오른쪽 140·아래 420, 유튜브 오른쪽 아래)
- [ ] 아이콘은 Lucide·로고는 단색, 그림자는 떠 있는 것만
- [ ] 수치에 출처 또는 `예시 데이터` 표시
- [ ] 300px로 줄여도 제목과 구조가 읽힌다
- [ ] (영상) 등장 순서 지킴, 마지막 1.5초 정지, 튕김·회전 없음
- [ ] `--audit` 오류 0·경고 0 (예외는 `data-audit-skip`로 이유가 보이게)
- [ ] 안쪽 요소가 바깥 상자 밖으로 나가지 않고, 행간·안쪽 여백을 깎지 않았다
- [ ] 코드·명령·수치가 실제로 맞다(명령은 그대로 실행되는 형태, 결론이 다른 장과 모순되지 않음)

**참고** — DESIGN.md 형식: [google-labs-code/design.md](https://github.com/google-labs-code/design.md) · 레퍼런스: [Bento Grids](https://bentogrids.com/), [Vercel Geist](https://vercel.com/geist/introduction), [Untitled UI](https://www.untitledui.com/), [Envato 미니멀 인포그래픽](https://elements.envato.com/graphic-templates/infographics/minimal), [토스 테크](https://toss.tech/), [awesome-design-md](https://github.com/voltagent/awesome-design-md) · 안전 영역: [Social media safe zones 2026](https://postplanify.com/blog/social-media-safe-zones-2026-complete-guide)
