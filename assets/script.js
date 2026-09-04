// ---------- alternância de tema (Original / Praia) ----------
(function () {
  const KEY = "monoquilha-theme";
  const root = document.documentElement;
  const toggles = document.querySelectorAll("[data-theme-toggle]");
  if (!toggles.length) return;

  function apply(theme, animate) {
    if (animate) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 500);
    }
    if (theme === "praia") {
      root.setAttribute("data-theme", "praia");
    } else {
      root.removeAttribute("data-theme");
    }
    toggles.forEach((btn) => btn.setAttribute("aria-pressed", String(theme === "praia")));
  }

  let saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch (e) {}
  apply(saved === "praia" ? "praia" : "original", false);

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "praia" ? "original" : "praia";
      apply(next, true);
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
    });
  });
})();

// ---------- header: sombra ao rolar ----------
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---------- menu mobile ----------
const toggle = document.getElementById("navToggle");
toggle.addEventListener("click", () => {
  const open = header.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});
header.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    if (header.classList.contains("nav-open")) {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }),
);

// ---------- abas do cardápio ----------
const tabs = document.querySelectorAll(".menu-tabs button");
const panels = document.querySelectorAll(".menu-panel");
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
    tab.setAttribute("aria-selected", "true");
    const target = tab.dataset.tab;
    panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === target));
  }),
);

// ---------- reveal ao rolar ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ---------- ano no rodapé ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- carrossel do hero (vídeos + frases) ----------
(function () {
  const hero = document.getElementById("heroCarousel");
  if (!hero) return;
  const slides = [...hero.querySelectorAll(".hero-slide")];
  const phrases = [...hero.querySelectorAll(".hero-phrase")];
  const dots = [...hero.querySelectorAll(".hero-dots button")];
  const videos = slides.map((s) => s.querySelector("video"));
  let idx = 0;
  let timer;

  function show(i, userAction) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("is-active", n === idx));
    phrases.forEach((p, n) => p.classList.toggle("is-active", n === idx));
    dots.forEach((d, n) => d.setAttribute("aria-selected", String(n === idx)));

    const v = videos[idx];
    if (v) {
      if (v.paused) v.play().catch(() => {});
      if (!v.hasAttribute("data-loaded")) {
        v.setAttribute("preload", "auto");
        v.setAttribute("data-loaded", "1");
      }
    }
    if (userAction) restart();
  }

  function restart() {
    clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => show(idx + 1), 8000);
  }

  dots.forEach((d, i) => d.addEventListener("click", () => show(i, true)));

  show(0, false);
  restart();
})();

// ---------- slider de depoimentos ----------
(function () {
  const slider = document.getElementById("testiSlider");
  if (!slider) return;
  const items = [...slider.querySelectorAll(".t-item")];
  const dotsWrap = slider.querySelector(".testi-dots");
  let idx = items.findIndex((it) => it.classList.contains("is-active"));
  if (idx < 0) idx = 0;
  let timer;

  const dotLabel = slider.dataset.dotLabel || "Depoimento";
  items.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", dotLabel + " " + (i + 1));
    dot.addEventListener("click", () => show(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function show(i, userAction) {
    idx = (i + items.length) % items.length;
    items.forEach((it, n) => it.classList.toggle("is-active", n === idx));
    dots.forEach((d, n) => d.classList.toggle("is-active", n === idx));
    if (userAction) restart();
  }

  function restart() {
    clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => show(idx + 1), 6000);
  }

  show(idx, false);
  restart();
})();
