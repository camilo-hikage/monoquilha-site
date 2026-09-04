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

// ---------- slider de depoimentos ----------
(function () {
  const slider = document.getElementById("testiSlider");
  if (!slider) return;
  const items = [...slider.querySelectorAll(".t-item")];
  const dotsWrap = slider.querySelector(".testi-dots");
  let idx = items.findIndex((it) => it.classList.contains("is-active"));
  if (idx < 0) idx = 0;
  let timer;

  items.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Depoimento " + (i + 1));
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
