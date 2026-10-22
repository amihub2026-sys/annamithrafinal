(() => {
  const root = document.querySelector(".frozen-home-slider");
  if (!root) return;
  const slides = [...root.querySelectorAll(".frozen-home-slide")],
    dots = [...root.querySelectorAll("[data-hero-dot]")],
    pause = root.querySelector("[data-hero-pause]");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0,
    paused = motion.matches,
    hover = false,
    focus = false,
    timer;
  function schedule() {
    clearInterval(timer);
    if (!paused && !hover && !focus && !document.hidden)
      timer = setInterval(() => show(index + 1), 5000);
  }
  function show(n) {
    index = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
      s.setAttribute("aria-hidden", String(i !== index));
    });
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
      d.setAttribute("aria-pressed", String(i === index));
    });
    schedule();
  }
  function updatePause() {
    pause.textContent = paused ? "▶" : "Ⅱ";
    pause.setAttribute(
      "aria-label",
      paused ? "Play slideshow" : "Pause slideshow",
    );
    schedule();
  }
  root
    .querySelector("[data-hero-prev]")
    .addEventListener("click", () => show(index - 1));
  root
    .querySelector("[data-hero-next]")
    .addEventListener("click", () => show(index + 1));
  dots.forEach((d, i) => d.addEventListener("click", () => show(i)));
  pause.addEventListener("click", () => {
    paused = !paused;
    updatePause();
  });
  root.addEventListener("mouseenter", () => {
    hover = true;
    schedule();
  });
  root.addEventListener("mouseleave", () => {
    hover = false;
    schedule();
  });
  root.addEventListener("focusin", () => {
    focus = true;
    schedule();
  });
  root.addEventListener("focusout", () =>
    setTimeout(() => {
      focus = root.contains(document.activeElement);
      schedule();
    }, 0),
  );
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      show(index + (e.key === "ArrowRight" ? 1 : -1));
    }
  });
  document.addEventListener("visibilitychange", schedule);
  motion.addEventListener("change", (e) => {
    paused = e.matches;
    updatePause();
  });
  let start = null;
  root.addEventListener(
    "touchstart",
    (e) => {
      start = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  root.addEventListener(
    "touchend",
    (e) => {
      if (start !== null) {
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 60) show(index + (dx < 0 ? 1 : -1));
      }
      start = null;
    },
    { passive: true },
  );
  updatePause();
})();
