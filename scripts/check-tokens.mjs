// DESIGN.md(YAML 앞머리)와 assets/ds.css(:root 변수)의 값이 같은지 확인한다.
// 색 → --이름, 글자 크기 → --fs-이름, 둥글기 → --r-이름, 간격 → --sp-이름, gutter → --gap
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const md = readFileSync(join(root, "DESIGN.md"), "utf8");
const css = readFileSync(join(root, "assets/ds.css"), "utf8");

// YAML 앞머리: 이 파일이 쓰는 들여쓰기 2단·4단 구조만 읽는다
const front = md.split(/^---\s*$/m)[1] ?? "";
const tree = {};
let top = null;
let sub = null;
for (const raw of front.split("\n")) {
  if (!raw.trim() || raw.trim().startsWith("#")) continue;
  const indent = raw.match(/^ */)[0].length;
  const m = raw.trim().match(/^([\w-]+):\s*(.*)$/);
  if (!m) continue;
  const [, key, value] = m;
  const clean = value.replace(/^"(.*)"$/, "$1");
  if (indent === 0) { top = key; sub = null; tree[top] = value ? clean : {}; }
  else if (indent === 2 && top) { sub = key; tree[top][key] = value ? clean : {}; }
  else if (indent === 4 && top && sub) tree[top][sub][key] = clean;
}

const rootBlock = css.match(/:root\s*{([\s\S]*?)\n}/)?.[1] ?? "";
const vars = Object.fromEntries([...rootBlock.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

const norm = (v) => String(v).trim().toLowerCase();
const problems = [];
let checked = 0;
const check = (label, want, cssName) => {
  checked++;
  const got = vars[cssName];
  if (got === undefined) problems.push(`${label}: ds.css 에 --${cssName} 이 없어요`);
  else if (norm(got) !== norm(want)) problems.push(`${label}: DESIGN.md ${want} ≠ ds.css --${cssName} ${got}`);
};

for (const [name, value] of Object.entries(tree.colors ?? {})) {
  if (value.startsWith("{")) continue; // 별칭(primary 등)
  check(`colors.${name}`, value, name);
}
for (const [name, t] of Object.entries(tree.typography ?? {})) {
  check(`typography.${name}.fontSize`, t.fontSize, `fs-${name}`);
  check(`typography.${name}.lineHeight`, t.lineHeight, `lh-${name}`);
}
for (const [name, value] of Object.entries(tree.rounded ?? {})) check(`rounded.${name}`, value, `r-${name}`);
for (const [name, value] of Object.entries(tree.spacing ?? {})) {
  if (name.startsWith("safe-")) continue; // 안전 영역은 .frame--* 에 있다
  check(`spacing.${name}`, value, name === "gutter" ? "gap" : `sp-${name}`);
}

// ds.css 에만 있는 색 변수(문서에 없는 값)도 잡는다
const docColors = new Set(Object.keys(tree.colors ?? {}));
for (const [name, value] of Object.entries(vars)) {
  if (/^#[0-9a-f]{3,8}$/i.test(value) && !docColors.has(name)) problems.push(`ds.css --${name} ${value} 이 DESIGN.md colors 에 없어요`);
}

if (problems.length) {
  console.error(`✗ 토큰 불일치 ${problems.length}건\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`✓ DESIGN.md ↔ ds.css 토큰 ${checked}개 일치`);
