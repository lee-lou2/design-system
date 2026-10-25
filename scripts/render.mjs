// 템플릿 HTML 의 [data-frame] 을 PNG(정지 화면)와 MP4(모션)로 내보낸다.
//
//   node scripts/render.mjs templates/thumbnail.html              # 모든 프레임 → PNG
//   node scripts/render.mjs templates/video.html --video          # PNG + MP4
//   node scripts/render.mjs my-post.html --only t1-bento --scale 2 # 한 프레임만 2배 크기로
//
// 옵션: --out <폴더>(기본 exports/<html 이름>) --only a,b --video --fps 30 --scale 1 --jpg
//       --width 1280 (정지 화면을 이 폭으로 줄인 사본을 하나 더. 유튜브 썸네일 1280×720 용)
//       --audit (배치 검사 결과를 함께 출력하고 <폴더>/audit.json 에 저장. 오류가 있으면 종료 코드 1)
//       --audit-only (이미지 없이 검사만)
//       --gif 640 (MP4와 함께 이 폭의 GIF도 만든다. README 미리보기용, 15fps)
// 브라우저: 설치된 Google Chrome 을 쓴다(없으면 Playwright 기본 Chromium). MP4 에는 ffmpeg 가 필요하다.
import { chromium } from "playwright-core";
import { auditFrame } from "./audit.mjs";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};
const input = args.find((a) => a.endsWith(".html"));
if (!input) {
  console.error("사용: node scripts/render.mjs <파일.html> [--video] [--only id1,id2] [--out 폴더] [--fps 30] [--scale 1] [--jpg]");
  process.exit(1);
}

const file = resolve(input);
const outDir = resolve(opt("out", join("exports", basename(file, extname(file)))));
const only = opt("only", "").split(",").filter(Boolean);
const fps = Number(opt("fps", 30));
const scale = Number(opt("scale", 1));
const video = flag("video");
const jpg = flag("jpg");
const width = Number(opt("width", 0));
const gif = Number(opt("gif", 0));
const auditOnly = flag("audit-only");
const audit = flag("audit") || auditOnly;
const reports = [];
mkdirSync(outDir, { recursive: true });

async function launch() {
  try {
    return await chromium.launch({ channel: "chrome" });
  } catch {
    try {
      return await chromium.launch();
    } catch (e) {
      console.error("Chrome 을 찾지 못했어요. Google Chrome 을 설치하거나 `npx playwright install chromium` 을 실행하세요.");
      throw e;
    }
  }
}

const settle = (page) =>
  page.evaluate(async () => {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await document.fonts.ready;
  });

function encoder(path, width, height) {
  const ff = spawn("ffmpeg", [
    "-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(fps), "-c:v", "png", "-i", "-",
    "-vf", `scale=${width}:${height}:flags=lanczos`,
    "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    path,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((ok, fail) => {
    ff.on("error", fail);
    ff.on("close", (code) => (code === 0 ? ok() : fail(new Error(`ffmpeg 종료 코드 ${code}`))));
  });
  const write = (buf) => new Promise((ok) => (ff.stdin.write(buf) ? ok() : ff.stdin.once("drain", ok)));
  const end = () => { ff.stdin.end(); return done; };
  return { write, end };
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1920 }, deviceScaleFactor: scale });
await page.goto(`${pathToFileURL(file).href}?render`, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.__ds && document.fonts.status === "loaded");

const ids = (await page.evaluate(() => window.__ds.ids())).filter((id) => !only.length || only.includes(id));
if (!ids.length) {
  console.error(only.length ? `프레임을 찾지 못했어요: ${only.join(", ")}` : "[data-frame] 이 없어요.");
  await browser.close();
if (audit) {
  // --only 로 일부만 검사해도 다른 프레임의 기존 결과는 남긴다
  const file = join(outDir, "audit.json");
  const prev = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
  const ids = new Set(reports.map((r) => r.id));
  writeFileSync(file, JSON.stringify([...prev.filter((r) => !ids.has(r.id)), ...reports], null, 2));
  const e = reports.reduce((n, r) => n + r.errors.length, 0);
  const w = reports.reduce((n, r) => n + r.warnings.length, 0);
  console.log(`\n검사 요약: 프레임 ${reports.length} · 오류 ${e} · 경고 ${w} → ${join(outDir, "audit.json")}`);
  if (e) process.exitCode = 1;
}
  process.exit(1);
}

for (const id of ids) {
  const info = await page.evaluate((id) => window.__ds.solo(id), id);
  await page.setViewportSize({ width: info.width, height: info.height });
  await settle(page);
  const clip = { x: 0, y: 0, width: info.width, height: info.height };

  await page.evaluate((id) => window.__ds.poster(id), id);
  await settle(page);
  if (audit) {
    const rep = await page.evaluate(auditFrame, id);
    reports.push(rep);
    const mark = rep.errors.length ? "✗" : rep.warnings.length ? "△" : "✓";
    console.log(`${mark} 검사 ${id}  오류 ${rep.errors.length} · 경고 ${rep.warnings.length} · 강조 ${rep.accentSpots}곳`);
    for (const f of [...rep.errors.map((f) => ["오류", f]), ...rep.warnings.map((f) => ["경고", f])]) {
      const [lv, x] = f;
      console.log(`   ${lv} ${x.kind}  ${x.msg}${x.el ? `  ${x.el}` : ""}${x.at ? `  @${x.at.x},${x.at.y} ${x.at.w}×${x.at.h}` : ""}`);
    }
    if (auditOnly) continue;
  }
  const still = join(outDir, `${id}.${jpg ? "jpg" : "png"}`);
  await page.screenshot({ path: still, clip, type: jpg ? "jpeg" : "png", quality: jpg ? 92 : undefined });
  let line = `✓ ${id}  ${info.width}×${info.height}  → ${still}`;
  if (width) {
    const small = join(outDir, `${id}-${width}w.jpg`);
    await new Promise((ok, fail) => {
      const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-i", still, "-vf", `scale=${width}:-2:flags=lanczos`, "-q:v", "2", small]);
      ff.on("error", fail);
      ff.on("close", (code) => (code === 0 ? ok() : fail(new Error(`ffmpeg 종료 코드 ${code}`))));
    });
    line += `\n  ↳ ${width}px → ${small}`;
  }

  if (video && info.animated) {
    const mp4 = join(outDir, `${id}.mp4`);
    const total = Math.round((info.duration / 1000) * fps);
    const enc = encoder(mp4, info.width * scale, info.height * scale);
    for (let i = 0; i < total; i++) {
      await page.evaluate(([id, t]) => window.__ds.seek(id, t), [id, (i * 1000) / fps]);
      await settle(page);
      await enc.write(await page.screenshot({ clip, type: "png" }));
    }
    await enc.end();
    line += `\n  ▶ ${(info.duration / 1000).toFixed(1)}s ${fps}fps → ${mp4}`;
    if (gif) {
      const out = join(outDir, `${id}.gif`);
      await new Promise((ok, fail) => {
        const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-i", mp4, "-vf",
          `fps=15,scale=${gif}:-2:flags=lanczos,split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`,
          "-loop", "0", out]);
        ff.on("error", fail);
        ff.on("close", (code) => (code === 0 ? ok() : fail(new Error(`ffmpeg 종료 코드 ${code}`))));
      });
      line += `\n  ◎ GIF ${gif}px → ${out}`;
    }
  }
  console.log(line);
}

await browser.close();
if (audit) {
  // --only 로 일부만 검사해도 다른 프레임의 기존 결과는 남긴다
  const file = join(outDir, "audit.json");
  const prev = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : [];
  const ids = new Set(reports.map((r) => r.id));
  writeFileSync(file, JSON.stringify([...prev.filter((r) => !ids.has(r.id)), ...reports], null, 2));
  const e = reports.reduce((n, r) => n + r.errors.length, 0);
  const w = reports.reduce((n, r) => n + r.warnings.length, 0);
  console.log(`\n검사 요약: 프레임 ${reports.length} · 오류 ${e} · 경고 ${w} → ${join(outDir, "audit.json")}`);
  if (e) process.exitCode = 1;
}
