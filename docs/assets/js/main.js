// Times Table Dojo - small progressive enhancements. No trackers, no cookies,
// nothing loaded from other sites. Everything works without this file.
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year.
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  if (reduce || !("IntersectionObserver" in window)) {
    // Show everything straight away; boards shown already broken.
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll(".board-break").forEach(function (el) { el.classList.add("snapped"); });
    return;
  }

  // Fade sections in as they scroll into view.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // The board snaps when it scrolls into view (and on hover / tap).
  var boards = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        setTimeout(function () { e.target.classList.add("snapped"); }, 300);
        boards.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".board-break").forEach(function (el) {
    boards.observe(el);
    el.addEventListener("click", function () {
      el.classList.remove("snapped");
      void el.offsetWidth; // restart
      setTimeout(function () { el.classList.add("snapped"); }, 120);
    });
  });
})();
