/* ==========================================================
   Eduarda Freitas | Fisioterapia — Interações
   ========================================================== */

(() => {
  "use strict";

  /** Menu mobile (abre/fecha, fecha ao clicar em link, ESC e ao ampliar a tela) */
  const initMenu = () => {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("menu");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menu.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () =>
      setOpen(toggle.getAttribute("aria-expanded") !== "true")
    );
    menu.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => setOpen(false))
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  };

  /** Sombra suave no header ao rolar */
  const initHeaderScroll = () => {
    const header = document.querySelector(".header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
  };

  /** Entrada suave dos elementos (.reveal) */
  const initReveal = () => {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => {
      // escalonamento leve entre cards irmãos
      const siblings = el.parentElement ? [...el.parentElement.children] : [];
      const idx = siblings.indexOf(el);
      if (idx > 0 && el.matches(".card, .mode")) el.style.transitionDelay = `${idx * 90}ms`;
      observer.observe(el);
    });
  };

  /** Ano dinâmico no rodapé */
  const initYear = () => {
    const el = document.getElementById("ano");
    if (el) el.textContent = new Date().getFullYear();
  };

  document.addEventListener("DOMContentLoaded", () => {
    initMenu();
    initHeaderScroll();
    initReveal();
    initYear();
  });
})();
