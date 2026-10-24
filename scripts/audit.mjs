// 프레임 배치 검사. render.mjs --audit 가 프레임마다 정지 화면 시각에서 브라우저 안에서 실행한다.
// 실제 좌표로 잰다: 글자 잘림·상자 넘침·겹침·안전 영역·행간·외톨이 글자·최소 크기·빈 띠·강조색 개수.
// 의도한 겹침·넘침은 클래스(.marker .hl-ring .callout .cursor .zoom .subtitle .lower-third)나
// 속성(data-bleed: 가장자리 밖으로 잘리는 화면, data-overlay: 덮는 요소)으로 표시한다.

export function auditFrame(id) {
  const frame = document.querySelector(`[data-frame="${id}"]`);
  const F = frame.getBoundingClientRect();
  const fcs = getComputedStyle(frame);
  const SAFE = {
    left: F.left + parseFloat(fcs.paddingLeft),
    top: F.top + parseFloat(fcs.paddingTop),
    right: F.right - parseFloat(fcs.paddingRight),
    bottom: F.bottom - parseFloat(fcs.paddingBottom),
  };
  const TOL = 1.5;
  const ACCENT = "rgb(67, 83, 209)";
  const OVERLAY = ".marker, .hl-ring, .callout, .cursor, .zoom, .subtitle, .lower-third, [data-overlay]";
  const errors = [];
  const warnings = [];

  const rel = (r) => ({ x: Math.round(r.left - F.left), y: Math.round(r.top - F.top), w: Math.round(r.width), h: Math.round(r.height) });
  const label = (el) => {
    if (!el) return "";
    const cls = (el.getAttribute("class") || "").trim().split(/\s+/).filter(Boolean).slice(0, 2).join(".");
    const txt = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 28);
    return `${el.tagName.toLowerCase()}${cls ? "." + cls : ""}${txt ? ` “${txt}”` : ""}`;
  };
  const push = (list, kind, msg, el, r) => list.push({ kind, msg, el: label(el), at: r ? rel(r) : undefined });
  const opacityOf = (el) => {
    let o = 1;
    for (let e = el; e && e !== frame.parentElement; e = e.parentElement) {
      const st = getComputedStyle(e);
      if (st.display === "none" || st.visibility === "hidden") return 0;
      o *= parseFloat(st.opacity);
    }
    return o;
  };
  const visible = (el) => opacityOf(el) > 0.05;
  const isOverlay = (el) => !!el.closest(OVERLAY);
  const inBleed = (el) => !!el.closest("[data-bleed]");
  const painted = (el) => {
    if (!(el instanceof HTMLElement) || el === frame) return false;
    if (el.matches(".link, .skeleton, .bar__fill, .column__bar, .toggle, .brand__mark")) return false;
    const st = getComputedStyle(el);
    const bg = st.backgroundColor;
    const hasBg = bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";
    // 한쪽 구분선(위·아래 선만)은 상자가 아니다. 네 변 모두 선이 있어야 상자로 본다
    const hasBorder = ["Top", "Right", "Bottom", "Left"].every((s) => parseFloat(st[`border${s}Width`]) > 0 && st[`border${s}Style`] !== "none");
    const hasInset = (st.boxShadow || "").includes("inset");
    return hasBg || hasBorder || hasInset || st.backgroundImage !== "none";
  };
  const boxOf = (el) => {
    for (let e = el.parentElement; e && e !== frame; e = e.parentElement) if (painted(e)) return e;
    return frame;
  };
  const inner = (el) => {
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return { left: r.left + parseFloat(st.borderLeftWidth), top: r.top + parseFloat(st.borderTopWidth), right: r.right - parseFloat(st.borderRightWidth), bottom: r.bottom - parseFloat(st.borderBottomWidth) };
  };
  const outside = (r, b, tol = TOL) => r.left < b.left - tol || r.top < b.top - tol || r.right > b.right + tol || r.bottom > b.bottom + tol;
  const intersect = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  const clipper = (el) => {
    for (let e = el.parentElement; e; e = e.parentElement) {
      const st = getComputedStyle(e);
      if (st.overflow !== "visible" || st.overflowX !== "visible" || st.overflowY !== "visible") return e;
      if (e === frame) return e;
    }
    return frame;
  };

  /* 글자 덩어리 수집: 텍스트 노드마다 줄 단위 사각형 */
  const runs = [];
  const walker = document.createTreeWalker(frame, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.textContent;
    if (!text.trim()) continue;
    const el = node.parentElement;
    if (!el || !visible(el) || el.closest("[aria-hidden='true'] svg defs")) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const rects = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
    if (!rects.length) continue;
    // 겹침 판정용 "잉크" 사각형: 글자 상자(어센트~디센트)에서 위 12%·아래 18%를 덜어 낸다
    const fs = parseFloat(getComputedStyle(el).fontSize);
    const core = rects.map((r) => ({ left: r.left, right: r.right, top: r.top + fs * 0.12, bottom: r.bottom - fs * 0.18, width: r.width, height: Math.max(0, r.height - fs * 0.3) }));
    runs.push({ node, el, text, rects, core });
  }

  for (const run of runs) {
    const { el, rects, text } = run;
    const st = getComputedStyle(el);
    const fs = parseFloat(st.fontSize);
    const overlay = isOverlay(el);
    const bleed = inBleed(el);

    /* 1 잘림: 넘침을 자르는 조상 밖으로 나간 글자 */
    const clip = clipper(el);
    const cb = clip.getBoundingClientRect();
    for (const r of rects) if (outside(r, cb)) { push(errors, "clipped", "글자가 잘려요(자르는 상자 밖)", el, r); break; }

    /* 2 상자 넘침: 가장 가까운 칠해진 상자 안쪽에 있어야 한다 */
    if (!overlay) {
      const box = boxOf(el);
      if (box !== frame) {
        const b = inner(box);
        for (const r of rects) if (outside(r, b)) { push(errors, "text-overflow", `글자가 상자 밖으로 나가요(${label(box).split(" ")[0]})`, el, r); break; }
        const br = box.getBoundingClientRect();
        if (Math.min(br.width, br.height) > 88) {
          for (const r of rects) {
            const gap = Math.min(r.left - b.left, b.right - r.right, r.top - b.top, b.bottom - r.bottom);
            if (gap >= -TOL && gap < 6) { push(warnings, "tight", `상자 테두리에 너무 붙어요(${Math.round(gap)}px)`, el, r); break; }
          }
        }
      }
    }

    /* 3 안전 영역 */
    if (!overlay && !bleed) {
      for (const r of rects) if (outside(r, SAFE, 2)) { push(warnings, "safe-area", "글자가 안전 영역 밖에 있어요", el, r); break; }
    }
    for (const r of rects) if (outside(r, F, 0.5)) { push(errors, "off-frame", "글자가 프레임 밖이에요", el, r); break; }

    /* 4 최소 크기 */
    if (fs < 21.5) push(errors, "tiny", `글자가 너무 작아요(${fs}px)`, el, rects[0]);
    else if (/[가-힣]/.test(text) && fs < 23.5) push(warnings, "small-ko", `한글이 24px보다 작아요(${fs}px)`, el, rects[0]);

    /* 5 행간: 두 줄 이상일 때만 */
    const lineTops = [...new Set(rects.map((r) => Math.round(r.top / 4)))];
    if (lineTops.length > 1 && !(el instanceof SVGElement)) {
      const lh = st.lineHeight === "normal" ? 1.2 * fs : parseFloat(st.lineHeight);
      const ratio = lh / fs;
      const min = fs >= 80 ? 1.12 : fs >= 44 ? 1.2 : fs >= 30 ? 1.35 : 1.4;
      if (ratio < min - 0.005) push(warnings, "leading", `행간이 좁아요(${ratio.toFixed(2)} < ${min})`, el, rects[0]);

      /* 6 외톨이 글자: 마지막 줄이 한글 1~2자 */
      if (/[가-힣]/.test(text) && run.node.length < 400) {
        const lastTop = rects[rects.length - 1].top;
        const rg = document.createRange();
        let start = run.node.length;
        for (let i = run.node.length - 1; i >= 0; i--) {
          rg.setStart(run.node, i); rg.setEnd(run.node, i + 1);
          const cr = rg.getClientRects()[0];
          if (cr && Math.abs(cr.top - lastTop) < 2) start = i; else if (cr) break;
        }
        const last = text.slice(start).trim();
        if (last && last.length <= 2 && /[가-힣]/.test(last)) push(warnings, "orphan", `마지막 줄이 “${last}” 한두 글자예요`, el, rects[rects.length - 1]);
      }
    }
  }

  /* 7 글자끼리 겹침 */
  for (let i = 0; i < runs.length; i++) {
    for (let j = i + 1; j < runs.length; j++) {
      const a = runs[i], b = runs[j];
      if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
      if (isOverlay(a.el) !== isOverlay(b.el)) continue; // 덮는 요소가 아래 글자를 가리는 건 의도
      let hit = null;
      for (const ra of a.core) for (const rb of b.core) if (intersect(ra, rb) > 6) hit = ra;
      if (hit) push(errors, "text-collide", `다른 글자와 겹쳐요: ${label(b.el)}`, a.el, hit);
    }
  }

  /* 8 글자가 남의 상자에 걸침(조상이 아닌 칠해진 상자).
       글자보다 먼저 그려지는 절대 배치 장식(강조 띠 등, 글자 없음)은 배경이라 뺀다 */
  const boxes = [...frame.querySelectorAll("*")].filter((e) => painted(e) && visible(e) && !isOverlay(e));
  for (const run of runs) {
    if (isOverlay(run.el)) continue;
    scan: for (const box of boxes) {
      if (box.contains(run.el) || run.el.contains(box)) continue;
      const pos = getComputedStyle(box).position;
      const before = box.compareDocumentPosition(run.el) & Node.DOCUMENT_POSITION_FOLLOWING;
      if ((pos === "absolute" || pos === "fixed") && before && !box.textContent.trim()) continue;
      const br = box.getBoundingClientRect();
      for (const r of run.core) {
        const area = intersect(r, br);
        if (area > Math.min(40, r.width * r.height * 0.15)) { push(warnings, "text-on-box", `글자가 다른 상자에 걸쳐요: ${label(box).split(" ")[0]}`, run.el, r); break scan; }
      }
    }
  }

  /* 9 상자가 바깥 상자를 넘침 */
  for (const box of boxes) {
    if (box.closest("[data-bleed]") || box.matches(OVERLAY)) continue;
    const st = getComputedStyle(box);
    if (st.position === "absolute" || st.position === "fixed") {
      // 절대 배치는 프레임만 넘지 않으면 된다
      if (outside(box.getBoundingClientRect(), F, 0.5)) push(errors, "box-off-frame", "상자가 프레임 밖으로 나가요", box, box.getBoundingClientRect());
      continue;
    }
    const parent = boxOf(box);
    const r = box.getBoundingClientRect();
    const b = parent === frame ? SAFE : inner(parent);
    if (outside(r, b, 2)) push(parent === frame ? warnings : errors, parent === frame ? "box-safe" : "box-overflow", parent === frame ? "상자가 안전 영역 밖이에요" : `상자가 바깥 상자를 넘쳐요(${label(parent).split(" ")[0]})`, box, r);
  }

  /* 10 빈 띠: 안전 영역 안에서 내용이 없는 가로 띠 */
  const spans = [];
  const content = [...runs.flatMap((r) => r.rects), ...boxes.map((b) => b.getBoundingClientRect()), ...[...frame.querySelectorAll("svg, img")].filter(visible).map((e) => e.getBoundingClientRect())];
  for (const r of content) {
    const top = Math.max(r.top, SAFE.top), bottom = Math.min(r.bottom, SAFE.bottom);
    if (bottom > top && r.right > SAFE.left && r.left < SAFE.right) spans.push([top, bottom]);
  }
  spans.sort((a, b) => a[0] - b[0]);
  // 안쪽 빈 띠(내용과 내용 사이)는 10%·96px, 위·아래 가장자리 빈 띠(가운데 정렬 여백)는 18%를 넘으면 경고
  const safeH = SAFE.bottom - SAFE.top;
  if (spans.length) {
    let cursor = spans[0][1], maxGap = 0, gapAt = cursor;
    for (const [t, b] of spans) {
      if (t - cursor > maxGap) { maxGap = t - cursor; gapAt = cursor; }
      cursor = Math.max(cursor, b);
    }
    if (maxGap > Math.max(96, safeH * 0.1)) warnings.push({ kind: "empty-band", msg: `내용 사이 빈 띠 ${Math.round(maxGap)}px`, el: "", at: { x: 0, y: Math.round(gapAt - F.top), w: Math.round(F.width), h: Math.round(maxGap) } });
    const edge = Math.max(spans[0][0] - SAFE.top, SAFE.bottom - cursor);
    if (edge > safeH * 0.18) warnings.push({ kind: "empty-band", msg: `위·아래 가장자리 빈 띠 ${Math.round(edge)}px`, el: "" });
  }

  /* 11 강조색 초점 수: 제목 속 핵심어(.hl)는 글자 체계라 빼고, 주석(표식·강조 테두리·말풍선 주석)은 한 묶음으로 센다.
        눈에 띄는 크기(면 40×40 이상, 글자 40px 이상, 선 그림)만, 가까운 것은 한 덩어리 */
  const spots = [];
  let annotation = false;
  for (const e of frame.querySelectorAll("*")) {
    if (!visible(e)) continue;
    if (e.closest(".hl") || e.closest(".t-display, .t-h1, .t-h2, h1, h2")) continue;
    const st = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    const area = r.width * r.height;
    const big = (st.backgroundColor === ACCENT || st.borderTopColor === ACCENT && parseFloat(st.borderTopWidth) > 0) && area >= 1600;
    const bigText = st.color === ACCENT && parseFloat(st.fontSize) >= 40 && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const line = e instanceof SVGGeometryElement && (st.stroke === ACCENT || st.fill === ACCENT) && area >= 4000;
    if (!(big || bigText || line)) continue;
    if (isOverlay(e) || e.closest("[data-annotation]")) { annotation = true; continue; }
    spots.push(r);
  }
  const groups = [];
  const near = (a, b) => a.left - 48 < b.right && b.left - 48 < a.right && a.top - 48 < b.bottom && b.top - 48 < a.bottom;
  for (const r of spots) {
    const g = groups.find((g) => g.some((x) => near(x, r)));
    if (g) g.push(r); else groups.push([r]);
  }
  const focal = groups.length + (annotation ? 1 : 0);
  if (focal > 2) warnings.push({ kind: "accent", msg: `강조색 초점이 ${focal}곳이에요(제목 핵심어 빼고 1~2곳)`, el: "" });

  /* 13 flex 안에서 글이 쪼개짐: 글 조각과 글 있는 요소가 같은 flex 줄에 섞이면 사이에 gap 이 끼어 문장이 벌어진다 */
  for (const el of frame.querySelectorAll("*")) {
    if (!(el instanceof HTMLElement) || !visible(el)) continue;
    const d = getComputedStyle(el).display;
    if (!/flex|grid/.test(d)) continue;
    const textNodes = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
    const textEls = [...el.children].filter((c) => c.textContent.trim() && !c.matches("svg, .ic, .logo, .num, .icon-tile, .avatar, .chip, .kbd, .marker"));
    if (textNodes.length && textEls.length && !el.matches(".stat__value")) push(warnings, "split-text", "문장 속 강조가 flex 간격으로 떨어져요(글을 span 하나로 감싸기)", el, el.getBoundingClientRect());
  }

  /* 14 9:16 은 휴대폰 전체 화면: 본문 28px 미만이면 작다 */
  if (frame.classList.contains("frame--9x16")) {
    for (const run of runs) {
      const fs = parseFloat(getComputedStyle(run.el).fontSize);
      const mono = getComputedStyle(run.el).fontFamily.startsWith('"Geist Mono"');
      if (!isOverlay(run.el) && !mono && fs < 27.5 && !run.el.closest(".code, .window, .phone")) { push(warnings, "small-916", `숏폼 글자가 작아요(${fs}px, 28px 이상)`, run.el, run.rects[0]); }
    }
  }

  /* 12 제목 아래 숨 쉴 틈: 큰 제목 바로 밑 내용과 32px 이상 떨어져야 한다 */
  // 제목 바로 밑 부제(글)는 한 묶음이라 빼고, 상자·그림과의 거리만 잰다. 카드 안 제목은 대상이 아니다
  for (const h of frame.querySelectorAll(".t-display, .t-h1, .t-h2, h1, h2")) {
    if (!visible(h) || isOverlay(h) || boxOf(h) !== frame) continue;
    const hr = h.getBoundingClientRect();
    let gap = Infinity;
    const visuals = [...frame.querySelectorAll("svg, img")].filter((e) => visible(e) && !h.contains(e) && !e.closest(".ic, .logo") && !e.matches(".ic, .logo"));
    const below = [...boxes.filter((b) => !b.contains(h) && !h.contains(b)).map((b) => b.getBoundingClientRect()), ...visuals.map((e) => e.getBoundingClientRect())];
    for (const r of below) {
      if (r.top >= hr.bottom - 2 && r.left < hr.right && r.right > hr.left) gap = Math.min(gap, r.top - hr.bottom);
    }
    if (gap < 32) push(warnings, "title-gap", `제목과 아래 내용이 ${Math.round(gap)}px로 붙어 있어요(32px 이상)`, h, hr);
  }

  /* 프레임에 data-audit-skip="empty-band,accent" 처럼 의도한 예외를 적을 수 있다 */
  const skip = (frame.getAttribute("data-audit-skip") || "").split(",").map((x) => x.trim()).filter(Boolean);
  const keep = (f) => !skip.includes(f.kind);
  return { id, errors: errors.filter(keep), warnings: warnings.filter(keep), accentSpots: focal, skipped: skip };
}
