/* Inkstone 모션 도우미 — 타이핑 효과.
 * <span data-type data-type-delay="1200" data-type-step="60">입력할 글</span>
 * 글자마다 span 으로 쪼개고 CSS 애니메이션(ds-char·ds-caret)을 단다. 커서는 지금 찍히는 글자 뒤를 따라가고,
 * 다 치면 마지막 글자 뒤에서 깜빡인다. 모두 CSS 애니메이션이라 렌더러가 시각 t 로 멈춰 찍을 수 있다. */
(function () {
  function split(el) {
    if (el.dataset.typeReady) return;
    el.dataset.typeReady = "1";
    var delay = parseFloat(el.getAttribute("data-type-delay") || "0");
    var step = parseFloat(el.getAttribute("data-type-step") || "60");
    var text = el.textContent;
    el.textContent = "";
    el.setAttribute("aria-label", text);
    var chars = Array.from(text);
    chars.forEach(function (ch, i) {
      var s = document.createElement("span");
      s.className = "tch";
      s.setAttribute("aria-hidden", "true");
      s.textContent = ch;
      var at = delay + i * step;
      var anims = ["ds-char 1ms linear " + at + "ms both"];
      if (i < chars.length - 1) anims.push("ds-caret " + step + "ms steps(1, end) " + at + "ms forwards");
      else anims.push("ds-caret-blink 1000ms steps(1, end) " + at + "ms infinite");
      s.style.animation = anims.join(", ");
      el.appendChild(s);
    });
  }
  function run(root) {
    (root || document).querySelectorAll("[data-type]").forEach(split);
  }
  window.Inkstone = Object.assign(window.Inkstone || {}, { typeText: run });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { run(); });
  else run();
})();
