// assets/icons.js 를 만든다. 아이콘을 더하려면 아래 목록에 이름을 넣고 `npm run icons`.
// - 선 아이콘: Lucide (ISC)        https://lucide.dev/icons
// - 브랜드 로고: Simple Icons (CC0) https://simpleicons.org  — 빠진 브랜드는 공식 프레스킷 SVG를 쓴다
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const lucideDir = join(root, "node_modules/lucide-static/icons");
const brandDir = join(root, "node_modules/simple-icons/icons");

const ICONS = `
  bot brain brain-circuit sparkles sparkle wand-sparkles cpu message-square message-circle messages-square
  bot-message-square audio-lines mic image video scan-eye eye eye-off
  code code-xml terminal square-terminal git-branch git-merge git-pull-request git-commit-horizontal bug braces
  file-code folder folder-open file file-text files package box boxes blocks puzzle plug plug-zap cable webhook
  server database cloud cloud-upload globe link key-round lock lock-open shield-check settings sliders-horizontal
  wrench hammer rocket zap container hard-drive memory-stick atom binary infinity sigma
  arrow-right arrow-left arrow-down arrow-up arrow-up-right arrow-right-left chevron-right check x plus minus
  circle-check circle-x circle-alert triangle-alert info circle-question-mark search filter list-checks
  list-ordered list layout-grid layout-dashboard layout-template table chart-column chart-bar chart-line
  chart-pie trending-up trending-down gauge timer clock calendar refresh-cw repeat workflow git-fork split merge
  route activity
  user users user-round user-check mail send bell megaphone newspaper book-open graduation-cap lightbulb target
  flag star heart thumbs-up thumbs-down
  monitor smartphone laptop mouse-pointer-click mouse-pointer-2 hand keyboard camera play pause circle-play
  store shopping-cart credit-card wallet dollar-sign coins receipt briefcase building-2 scale
  layers network share-2 download upload copy clipboard-list clipboard-check notebook-pen pencil scissors trash-2
  quote hash at-sign map compass gift award trophy crown flame sun moon languages scroll-text file-search
  text-search wifi radio satellite
`.trim().split(/\s+/);

const LOGOS = `
  anthropic claude googlegemini google deepseek mistralai meta qwen perplexity huggingface ollama openrouter
  replicate nvidia langchain n8n zapier make
  github git gitlab cursor githubcopilot windsurf v0 vercel cloudflare supabase firebase postgresql mongodb redis
  docker kubernetes googlecloud alibabacloud
  python typescript javascript react nextdotjs nodedotjs vite tailwindcss bun deno rust go swift kotlin flutter
  npm pnpm jupyter googlecolab jetbrains neovim warp raycast
  notion figma linear obsidian discord stripe shopify
  youtube instagram x threads tiktok medium substack velog tistory kakao kakaotalk naver line apple
`.trim().split(/\s+/);

const inner = (svg) =>
  svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/\s*\n\s*/g, "")
    .trim();

const missing = [];
const icons = {};
for (const name of ICONS) {
  const file = join(lucideDir, `${name}.svg`);
  if (!existsSync(file)) { missing.push(`icon:${name}`); continue; }
  icons[name] = inner(readFileSync(file, "utf8"));
}
const logos = {};
for (const name of LOGOS) {
  const file = join(brandDir, `${name}.svg`);
  if (!existsSync(file)) { missing.push(`logo:${name}`); continue; }
  const svg = readFileSync(file, "utf8");
  const title = (svg.match(/<title>([^<]*)<\/title>/) || [])[1] || name;
  const d = (svg.match(/<path d="([^"]+)"/) || [])[1];
  if (!d) { missing.push(`logo:${name}`); continue; }
  logos[name] = [title, d];
}

const out = `/* Inkstone icons — scripts/build-icons.mjs 가 만든 파일. 직접 고치지 말고 목록을 고쳐 다시 만든다.
 * 선 아이콘: Lucide v1.61.0 — ISC License © Lucide Icons and Contributors (일부 MIT © Cole Bemis, Feather)
 * 브랜드 로고: Simple Icons v16.35.0 — CC0 1.0. 상표권은 각 회사에 있다 — 뉴스·교육 맥락에서 원형 그대로, 단색으로만 쓴다.
 * 라이선스 전문: THIRD_PARTY_NOTICES.md
 * 쓰는 법: <i data-icon="bot"></i>, <i data-logo="github"></i>  →  페이지가 열리면 인라인 svg 로 바뀐다.
 */
(function () {
  var ICONS = ${JSON.stringify(icons)};
  var LOGOS = ${JSON.stringify(logos)};
  var NS = "http://www.w3.org/2000/svg";
  function iconSvg(name) {
    if (!ICONS[name]) return null;
    return '<svg class="ic" xmlns="' + NS + '" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>";
  }
  function logoSvg(name) {
    var l = LOGOS[name];
    if (!l) return null;
    return '<svg class="logo" xmlns="' + NS + '" viewBox="0 0 24 24" role="img" aria-label="' + l[0] + '"><path d="' + l[1] + '"/></svg>';
  }
  function render(root) {
    (root || document).querySelectorAll("i[data-icon], i[data-logo]").forEach(function (el) {
      var isLogo = el.hasAttribute("data-logo");
      var name = isLogo ? el.getAttribute("data-logo") : el.getAttribute("data-icon");
      var html = isLogo ? logoSvg(name) : iconSvg(name);
      if (!html) { console.warn("[inkstone] 없는 " + (isLogo ? "로고" : "아이콘") + ": " + name); return; }
      var tpl = document.createElement("template");
      tpl.innerHTML = html;
      var svg = tpl.content.firstChild;
      if (el.className) svg.setAttribute("class", svg.getAttribute("class") + " " + el.className);
      if (el.getAttribute("style")) svg.setAttribute("style", el.getAttribute("style"));
      el.replaceWith(svg);
    });
  }
  window.Inkstone = Object.assign(window.Inkstone || {}, {
    icons: Object.keys(ICONS),
    logos: Object.keys(LOGOS),
    iconSvg: iconSvg,
    logoSvg: logoSvg,
    renderIcons: render,
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { render(); });
  else render();
})();
`;

writeFileSync(join(root, "assets/icons.js"), out);
console.log(`icons ${Object.keys(icons).length}, logos ${Object.keys(logos).length}`);
if (missing.length) {
  console.error(`없는 이름: ${missing.join(", ")}`);
  process.exitCode = 1;
}
