/* 템플릿 보드: 프레임을 칸 너비에 맞춰 줄여 보여 주고, 누르면 모션을 다시 재생한다.
 * ?render 로 열면 렌더러(scripts/render.mjs)가 쓰는 window.__ds API만 남긴다. */
(function () {
  var render = /[?&]render\b/.test(location.search);
  if (render) document.documentElement.classList.add("is-render");

  var frames = function () { return Array.prototype.slice.call(document.querySelectorAll("[data-frame]")); };
  var byId = function (id) { return document.querySelector('[data-frame="' + id + '"]'); };
  var anims = function (el) { return el.getAnimations({ subtree: true }); };

  /* 장면 길이: data-duration(ms) 이 있으면 그 값, 없으면 마지막 유한 애니메이션 끝 + 1.5초 */
  function endOf(el) {
    var end = 0;
    anims(el).forEach(function (a) {
      var t = a.effect && a.effect.getComputedTiming();
      if (t && isFinite(t.endTime)) end = Math.max(end, t.endTime);
    });
    return end;
  }
  function duration(el) {
    var d = parseFloat(el.getAttribute("data-duration"));
    return isFinite(d) ? d : Math.ceil((endOf(el) + 1500) / 100) * 100;
  }
  /* 정지 화면 시각: data-poster(ms) 또는 모든 등장이 끝난 시점 */
  function poster(el) {
    var p = parseFloat(el.getAttribute("data-poster"));
    return isFinite(p) ? p : Math.min(duration(el), endOf(el) + 50);
  }
  function seek(el, t) {
    anims(el).forEach(function (a) { a.pause(); a.currentTime = t; });
  }
  function replay(el) {
    anims(el).forEach(function (a) { a.cancel(); a.play(); });
  }

  window.__ds = {
    ids: function () { return frames().map(function (f) { return f.getAttribute("data-frame"); }); },
    info: function (id) {
      var el = byId(id);
      return { id: id, width: el.offsetWidth, height: el.offsetHeight, duration: duration(el), poster: poster(el), animated: anims(el).length > 0 };
    },
    solo: function (id) {
      document.querySelectorAll(".cell.is-solo").forEach(function (c) { c.classList.remove("is-solo"); });
      var el = byId(id);
      (el.closest(".cell") || el).classList.add("is-solo");
      return window.__ds.info(id);
    },
    seek: function (id, t) { seek(byId(id), t); },
    poster: function (id) { var el = byId(id); seek(el, poster(el)); },
  };

  if (render) return;

  /* 보드: 칸 너비에 맞춰 zoom */
  function fit() {
    document.querySelectorAll(".cell__box").forEach(function (box) {
      var f = box.querySelector(".frame");
      if (!f) return;
      var z = box.clientWidth / f.offsetWidth;
      f.style.setProperty("--z", z);
      box.style.height = f.offsetHeight * z + "px";
    });
  }
  window.addEventListener("resize", fit);
  document.addEventListener("DOMContentLoaded", function () {
    fit();
    if (document.fonts) document.fonts.ready.then(fit);
    document.querySelectorAll(".cell__box").forEach(function (box) {
      var f = box.querySelector(".frame");
      box.addEventListener("click", function () { replay(f); });
    });
    /* 화면에 보이는 모션 프레임은 길이마다 반복 재생 */
    var timers = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var f = e.target;
        if (!anims(f).length) return;
        if (e.isIntersecting && !timers.has(f)) {
          replay(f);
          timers.set(f, setInterval(function () { replay(f); }, duration(f) + 800));
        } else if (!e.isIntersecting && timers.has(f)) {
          clearInterval(timers.get(f));
          timers.delete(f);
        }
      });
    }, { threshold: 0.4 });
    frames().forEach(function (f) { io.observe(f); });
  });
})();
