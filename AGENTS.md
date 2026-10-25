# AGENTS.md — Inkstone 작업 안내 (AI 에이전트용)

이 저장소는 **콘텐츠 그래픽용 디자인 시스템**이다. AI·개발 강의, 신규 서비스 소개, AI 뉴스를 1:1 포스트 썸네일 · 16:9 영상(장면·유튜브 썸네일) · 9:16 숏폼으로 만든다. 결과물은 HTML 프레임이고, 스크립트가 PNG·MP4로 내보낸다.

> 규칙의 정본은 [`DESIGN.md`](DESIGN.md)다. 이 파일은 "어떻게 일하는가"만 다룬다. 둘이 어긋나면 DESIGN.md가 맞다.

## 1. 먼저 읽을 것

1. `DESIGN.md` — 토큰(YAML 앞머리) + 규칙. 특히 **Layout(계층과 넘침)**, **Infographic Patterns**, **Agent Prompt Guide**.
2. `templates/*.html` — 실제 조합 예시 42장과 모션 카탈로그 17종. 새로 짜지 말고 **가장 가까운 프레임을 복사**해서 시작한다.
3. `assets/ds.css` — 부품 클래스. 이름과 변형은 DESIGN.md **Components** 표에 있다.

## 2. 저장소 지도

| 경로 | 무엇 | 고칠 때 |
|---|---|---|
| `DESIGN.md` | 정본: 토큰(YAML) + 규칙 | 값을 바꾸면 `assets/ds.css` `:root`도 같이 → `npm run check` |
| `AGENTS.md` / `CLAUDE.md` | 에이전트 작업 안내 | — |
| `assets/ds.css` | 토큰 변수 + 부품 클래스(프레임·글자·카드·차트·다이어그램·화면·자막·모션) | 부품을 바꾸면 `npm run audit`로 전체 회귀 확인 |
| `assets/icons.js` | Lucide 아이콘 180개 + Simple Icons 로고 80개 | **직접 고치지 않는다.** `scripts/build-icons.mjs` 목록 → `npm run icons` |
| `assets/stage.css·stage.js` | 템플릿 보드(미리보기 배치·재생)와 렌더 API(`window.__ds`) | 거의 안 고친다 |
| `templates/thumbnail.html` | 1:1 썸네일 T1~T8 | |
| `templates/video.html` | 16:9 장면 V1~V11 + 유튜브 썸네일 Y1·Y2 | |
| `templates/shorts.html` | 9:16 숏폼 S1~S5 | |
| `templates/cases.html` | 실전 검증 16장(개발 강의·뉴스·가이드·서비스·극한 테스트) | |
| `templates/motion.html` | 모션 카탈로그 M01~M17(순차 등장·채우기·플로우차트 그리기·숫자 세기·차트·커서 클릭 타이핑·스트리밍·스포트라이트·확대·전/후 등) | 움직임을 만들 때 여기서 가져온다 |
| `assets/motion.js` | 타이핑 도우미(`data-type`: 글자마다 등장 + 따라오는 커서) | |
| `preview.html` | 색·글자·아이콘·팔레트와 부품 시트(C0~C6)·결과물 갤러리 | |
| `scripts/render.mjs` | HTML → PNG·MP4, `--audit` 배치 검사 | |
| `scripts/audit.mjs` | 배치 검사 규칙(브라우저 안에서 좌표로 잰다) | 규칙을 바꾸면 모든 템플릿을 다시 검사 |
| `scripts/check-tokens.mjs` | DESIGN.md ↔ ds.css 값 비교 | |
| `exports/` | 렌더 결과(PNG·MP4·audit.json) | **직접 고치지 않는다.** 다시 렌더한다 |
| `docs/` | README용 미리보기 이미지 | |

## 3. 일의 종류별 절차

### A. 새 그래픽 만들기

1. **표면**을 정한다: `frame--1x1`(1080²) · `frame--4x5`(1080×1350) · `frame--16x9`(1920×1080) · `frame--9x16`(1080×1920). 자막이 있는 장면은 `frame--sub`를 더한다.
2. 글을 **한 문장**으로 줄이고, 그 글이 답하는 질문으로 **패턴**을 고른다(아래 표 또는 DESIGN.md Infographic Patterns).
3. `work/<날짜-주제>.html`을 만든다. 머리(head)는 아래 시작 틀을 쓰고, 고른 템플릿의 `<figure class="cell">…</figure>`를 통째로 복사해 내용만 바꾼다. `data-frame`은 새 이름으로.
4. 렌더 + 검사: `node scripts/render.mjs work/<파일>.html --audit` (영상·숏폼은 `--video`도).
5. **오류 0·경고 0**까지 고친다. 그다음 PNG를 **직접 열어 보고** DESIGN.md의 완료 체크리스트로 확인한다. 검사기는 균형·의미·사실 정확성을 판단하지 못한다.

| 글이 답하는 질문 | 패턴 | 시작할 프레임 |
|---|---|---|
| X가 뭐야? | 벤토 요약 | `t1-bento` `n1-launch` `v1-title` |
| 어떻게 동작해? | 흐름도 | `t3-flow` `v4-flow` `d3-http` `s2-flow` |
| A랑 B 뭐가 달라? | 비교·결정표 | `t2-versus` `v6-table` `d2-react-state` `d4-container` `y2-youtube` |
| 전과 후가 어떻게 달라? | 전/후 | `v3-concept` `g2-meeting` |
| 뭐가 새로 생겼어? | 화면 소개 | `t4-screen` `v7-screen` `g1-api-key` `g4-phone` `p1-service` |
| 무엇이 얼마나? | 숫자 + 그래프 | `t5-chart` `v5-chart` `s3-stat` `n3-keynote` |
| 무엇과 연결돼? | 허브 | `t6-hub` `y1-youtube` |
| 어떻게 따라 해? | 단계 + 명령·화면 | `t7-terminal` `d5-git-cmds` `g3-shortcuts` `x2-dense` `s4-steps` |
| 어떻게 말하면 돼? | 대화 | `v8-chat` |
| 코드가 뭘 해? | 코드 + 주석 | `v9-code` |
| N가지는? | 목록 | `t8-list` `n2-weekly` `n4-three` `v10-summary` `s5-outro` |
| 브랜치·버전 흐름 | 그래프 | `d1-git-branch` |
| 영상 뼈대 | 챕터·촬영 오버레이·훅 | `v2-chapter` `v11-overlay` `s1-hook` |
| 움직임이 핵심 | 모션 카탈로그 | `m01`~`m17` (DESIGN.md Motion의 카탈로그 표) |

**시작 틀** (`work/` 안에 둘 때의 경로)

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>제목</title>
  <link rel="stylesheet" href="../assets/ds.css">
  <link rel="stylesheet" href="../assets/stage.css">
  <script src="../assets/icons.js" defer></script>
  <script src="../assets/motion.js" defer></script>
  <script src="../assets/stage.js" defer></script>
</head>
<body class="stage" style="--cols: 2">
  <main class="board">
    <figure class="cell">
      <figcaption class="cell__label">이름 <span>설명</span></figcaption>
      <div class="cell__box">
        <section class="frame frame--1x1" data-frame="my-post">
          <div class="meta"><span class="kicker">개발 강의</span><span class="t-mono">EP.13</span></div>
          <h2 class="t-h1" style="margin-top: 28px">제목 첫 줄<br><span class="hl">핵심어</span> 둘째 줄</h2>
          <div class="spacer"></div>
          <!-- 핵심 그림 + 보조 정보 2~4개 -->
        </section>
      </div>
    </figure>
  </main>
</body>
</html>
```

### B. 시스템(토큰·부품) 고치기

- 토큰 값은 **DESIGN.md YAML과 `assets/ds.css` `:root` 두 곳**을 같이 바꾼다 → `npm run check`(값 비교 + DESIGN.md 공식 린트).
- 색은 `:root` 토큰에만 적는다. 반투명이 필요하면 `color-mix(in srgb, var(--ink) 32%, transparent)`처럼 토큰을 섞어 쓴다(헥스·rgba를 직접 적으면 팔레트를 바꿀 때 따라오지 않는다). 바탕·선·글자는 무채색(R=G=B)으로만.
- 부품 CSS를 바꾸면 `npm run audit`로 템플릿·모션·부품 시트(66장)를 모두 다시 검사하고, 영향 받는 프레임의 PNG를 직접 본다.
- 새 부품은 기존 이름 규칙(`.블록`, `.블록__요소`, `.블록--변형`)과 토큰만 쓴다. 새 색·새 글꼴·새 그림자를 만들지 않는다.
- 부품을 더하면 DESIGN.md **Components**와 `preview.html` 부품 시트에도 올린다.

### C. 아이콘·로고 더하기

`scripts/build-icons.mjs`의 `ICONS`(Lucide 이름) 또는 `LOGOS`(Simple Icons 이름) 목록에 넣고 `npm run icons`. 없는 브랜드는 공식 프레스킷 SVG를 단색으로 쓴다. 이모지·3D 아이콘·다른 아이콘 세트는 쓰지 않는다.

## 4. 꼭 지킬 규칙 (요약 — 자세한 건 DESIGN.md)

- **색**: 무채색 회색 바탕(`canvas`)·면(`surface`)·잉크 3단 + 인디고(`accent`) 하나. 초점은 화면당 1~2곳(제목 핵심어는 세지 않음). 상태색(`success·warning·danger`)은 상태에만. 로고는 단색.
- **글꼴**: Pretendard Variable + Geist Mono(영문·숫자 전용). 제목 최대 2줄, 한글 24px 이상(9:16은 28px).
- **행간·여백은 깎지 않는다.** 넘치면 ① 글을 줄이고 ② `--sm` 변형 ③ 배치 변경 ④ 두 장으로 나눈다.
- **안쪽 요소는 바깥 상자 안.** 예외는 `data-bleed`(가장자리 밖으로 잘리는 화면)와 표식·주석뿐.
- 남는 높이는 `.spacer` 또는 `.grow` **하나만**. 문장 속 강조(`.hl`)는 `<span>` 하나로 감싸서 flex 줄에 넣는다.
- **모션**은 `data-m="rise|pop|draw|…"` + `style="--d: 300ms"`로만 만든다(CSS 애니메이션). JS 타이머로 만들면 렌더러가 프레임을 찍지 못한다. 한 요소에 하나, 퇴장·흐림·두 번째 이동은 감싼 요소에. 모션 변수는 상속되지 않으니 요소마다 적는다. 타이핑은 `data-type`(+ `assets/motion.js`).
- **사실**: 명령·코드는 그대로 실행되는 형태로, 수치는 출처를 적거나 `예시`로 표시한다. 같은 시리즈 안에서 내용이 서로 모순되지 않게 한다.

## 5. 배치 검사가 잡는 것 (`scripts/audit.mjs`)

| 종류 | 뜻 | 보통의 해결 |
|---|---|---|
| `clipped` `off-frame` | 글자가 잘리거나 프레임 밖 | 글 줄이기, 칸 넓히기 |
| `text-overflow` `box-overflow` | 안쪽 글·상자가 바깥 상자를 넘음 | `--sm`, 열 수·폭 조정 |
| `text-collide` `text-on-box` | 글끼리·글과 다른 상자가 겹침 | 위치·간격 조정 |
| `safe-area` `box-safe` | 안전 영역 밖 | 내용 줄이기, 높이 재배분 |
| `tight` | 글이 상자 테두리에 6px 미만으로 붙음 | 안쪽 여백 지키기 |
| `leading` | 행간이 기준보다 좁음 | 토큰 행간 쓰기 |
| `orphan` | 마지막 줄에 한글 1~2자 | 줄바꿈 위치·문구 조정 |
| `tiny` `small-ko` `small-916` | 글자가 너무 작음 | 크기 역할 올리기 |
| `title-gap` | 큰 제목 밑 내용이 32px 미만으로 붙음 | `.spacer` |
| `empty-band` | 내용 사이 96px 넘는 빈 띠(가장자리는 18%) | 그림 키우기·정보 더하기 |
| `split-text` | flex 줄에서 문장이 조각남 | 글을 `<span>` 하나로 |
| `accent` | 인디고 초점이 3곳 이상 | 나머지를 잉크·선으로 |

**의도 표시 속성** — `data-frame`(이름·필수) · `data-duration`(장면 길이 ms) · `data-poster`(정지 화면 시각 ms) · `data-bleed`(잘려도 되는 화면) · `data-overlay`(아래를 덮는 팝업·어둡게) · `data-annotation`(번호 범례 등 주석 역할) · `data-audit-skip="empty-band,accent"`(프레임 단위 예외 — 이유가 화면에서 보여야 한다).

## 6. 명령

```bash
npm install                                                 # 처음 한 번 (Chrome 필요, MP4는 ffmpeg)
node scripts/render.mjs work/my-post.html --audit           # PNG + 배치 검사
node scripts/render.mjs work/my-video.html --video --audit  # + MP4(30fps)
node scripts/render.mjs work/my-video.html --video --gif 560 # + GIF(README·미리보기용)
node scripts/render.mjs <파일> --only id1,id2 --scale 2      # 일부만, 2배 크기
node scripts/render.mjs <파일> --only y1-youtube --width 1280  # 유튜브 1280×720 사본
npm run audit        # 모든 템플릿 검사(이미지 없이)
npm run check        # 토큰 일치 + DESIGN.md 린트
npm run render:all   # 전체 다시 내보내기
npm run icons        # 아이콘 목록 반영
```

## 7. 하지 말 것

- `exports/`, `assets/icons.js`를 손으로 고치기(생성물이다).
- 템플릿의 예시 수치·가상 제품명을 실제 사실처럼 옮겨 쓰기.
- 새 색·새 글꼴·그라데이션·네온·3D·이모지 추가하기.
- 검사 경고를 `data-audit-skip`으로 덮어 두기만 하기(의도한 예외일 때만, 이유가 보여야 한다).
