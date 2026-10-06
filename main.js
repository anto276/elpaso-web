(function () {
  "use strict";

  var data = window.__ELPASO__ || { brand: {}, dishes: [], services: [], gallery: [] };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function escHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------------- Splash ---------------- */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    function hide() { splash.classList.add("is-out"); }
    if (document.readyState === "complete") {
      setTimeout(hide, 900);
    } else {
      window.addEventListener("load", function () { setTimeout(hide, 700); });
    }
    setTimeout(hide, 4200);
  }

  /* ---------------- Custom cursor ---------------- */
  function initCursor() {
    if (!fineHover) return;
    var cursor = $("[data-cursor]");
    var ring = $("[data-cursor-ring]");
    var label = $("[data-cursor-label]");
    if (!cursor || !ring) return;
    var firstMove = false;
    var mx = 0, my = 0;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      ring.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      if (!firstMove) {
        firstMove = true;
        cursor.classList.add("is-ready");
      }
    });

    var targets = $$("[data-cursor-target], a, button");
    targets.forEach(function (el) {
      el.addEventListener("mouseover", function (e) {
        if (el.contains(e.relatedTarget)) return;
        var word = el.getAttribute("data-cursor-target") || (el.tagName === "A" || el.tagName === "BUTTON" ? "" : "");
        if (!word) return;
        ring.classList.add("is-active");
        if (label) label.textContent = word;
      });
      el.addEventListener("mouseout", function (e) {
        if (el.contains(e.relatedTarget)) return;
        ring.classList.remove("is-active");
        if (label) label.textContent = "";
      });
    });
  }

  /* ---------------- Nav ---------------- */
  function initNav() {
    var nav = $("[data-nav]");
    var burger = $("[data-burger]");
    var mobileMenu = $("[data-mobile-menu]");
    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 40) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    if (burger && mobileMenu) {
      burger.addEventListener("click", function () {
        var open = mobileMenu.classList.toggle("is-open");
        burger.classList.toggle("is-open", open);
        burger.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
      });
      $$("[data-mobile-link]", mobileMenu).forEach(function (a) {
        a.addEventListener("click", function () {
          mobileMenu.classList.remove("is-open");
          burger.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* ---------------- Smooth anchor scroll ---------------- */
  function initSmoothAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = id === "#main" ? 0 : 84;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - navOffset,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ---------------- Mounts ---------------- */
  var ICONS = {
    plato: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/></svg>',
    bolsa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    copa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h12l-1.2 8.4a4.8 4.8 0 0 1-9.6 0L6 3Z"/><path d="M12 15.5V21M8 21h8"/></svg>',
    mesa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9h18M5 9v11M19 9v11"/><path d="M2 9 12 4l10 5"/></svg>'
  };

  function mountDishes() {
    var target = $("[data-dishes]");
    if (!target || target.children.length > 0 || !data.dishes || !data.dishes.length) return;
    target.innerHTML = data.dishes.map(function (d) {
      return (
        '<article class="dish-card">' +
          '<div class="dish-photo">' +
            '<img src="' + escHTML(d.photo) + '" alt="' + escHTML(d.name) + '" loading="lazy" decoding="async">' +
            '<span class="dish-tag acc-' + escHTML(d.accent) + '">' + escHTML(d.type) + '</span>' +
          '</div>' +
          '<div class="dish-body">' +
            '<p class="dish-subtitle">' + escHTML(d.subtitle) + '</p>' +
            '<h3 class="dish-name">' + escHTML(d.name) + '</h3>' +
            '<p class="dish-ingredients">' + escHTML(d.ingredients) + '</p>' +
            '<p class="dish-desc">' + escHTML(d.description) + '</p>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  function mountServicios() {
    var target = $("[data-servicios]");
    if (!target || target.children.length > 0 || !data.services || !data.services.length) return;
    target.innerHTML = data.services.map(function (s, i) {
      return (
        '<div class="servicio-row reveal">' +
          '<div class="servicio-icon acc-' + escHTML(s.accent) + '">' + (ICONS[s.icon] || "") + '</div>' +
          '<div class="servicio-text">' +
            '<span class="servicio-meta">' + escHTML(s.meta) + '</span>' +
            '<h3>' + escHTML(s.title) + '</h3>' +
            '<p class="servicio-desc">' + escHTML(s.description) + '</p>' +
          '</div>' +
          '<span class="servicio-num">' + String(i + 1).padStart(2, "0") + '</span>' +
        '</div>'
      );
    }).join("");
  }

  function mountGaleria() {
    var wrap = $("[data-galeria-lanes]");
    if (!wrap || wrap.children.length > 0 || !data.gallery || !data.gallery.length) return;
    var imgs = data.gallery.slice();
    var third = Math.ceil(imgs.length / 3);
    var lanes = [imgs.slice(0, third), imgs.slice(third, third * 2), imgs.slice(third * 2)];
    var speeds = ["is-fast", "is-slow", ""];
    var dirs = ["", "", "is-reverse"];
    wrap.innerHTML = lanes.map(function (lane, i) {
      if (!lane.length) return "";
      var doubled = lane.concat(lane);
      var items = doubled.map(function (src) {
        return '<div class="gallery-item"><img src="' + escHTML(src) + '" alt="Plato casero de El Paso" loading="lazy" decoding="async"></div>';
      }).join("");
      return '<div class="gallery-lane"><div class="gallery-track ' + speeds[i] + " " + dirs[i] + '">' + items + '</div></div>';
    }).join("");
  }

  // Reseñas: solo nombre, estrellas y texto (sin foto de perfil)
  function mountResenas() {
    var target = $("[data-resenas]");
    var list = (data.reviews || []).filter(function (r) { return r && r.text; });
    if (!target || !list.length) return;
    target.innerHTML = list.map(function (r) {
      var n = Math.round(Number(r.stars));
      var stars = n >= 1 && n <= 5
        ? '<span class="resena-stars" aria-label="' + n + ' de 5 estrellas">' + "★".repeat(n) + "☆".repeat(5 - n) + '</span>'
        : "";
      return (
        '<figure class="resena-card reveal">' +
          stars +
          '<blockquote class="resena-text">“' + escHTML(r.text) + '”</blockquote>' +
          '<figcaption class="resena-author">' + escHTML(r.name) +
            (r.when ? ' <span>· ' + escHTML(r.when) + '</span>' : '') +
          '</figcaption>' +
        '</figure>'
      );
    }).join("");
  }

  /* ---------------- Reveals (IntersectionObserver + safety net) ---------------- */
  function initReveals() {
    var els = $$(".reveal");
    if (!els.length) return;
    if (typeof IntersectionObserver === "undefined") {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---------------- Tilt (collage + grupos card) ---------------- */
  function initTilt() {
    if (!fineHover) return;
    $$("[data-tilt]").forEach(function (el) {
      var rect;
      el.addEventListener("mouseover", function (e) {
        if (el.contains(e.relatedTarget)) return;
        rect = el.getBoundingClientRect();
      });
      el.addEventListener("mousemove", function (e) {
        if (!rect) rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        var rx = (py * -6).toFixed(2);
        var ry = (px * 7).toFixed(2);
        // Fotos del collage: se agrandan y siguen al ratón
        var zoom = el.classList.contains("collage-photo")
          ? "translate(" + (px * 14).toFixed(1) + "px," + (py * 14).toFixed(1) + "px) scale(1.4) "
          : "";
        el.style.transform = zoom + "rotate(0deg) perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
      });
      el.addEventListener("mouseout", function (e) {
        if (el.contains(e.relatedTarget)) return;
        el.style.transform = "";
      });
    });
  }

  /* ---------------- La Carta: progress + pinned horizontal scroll ---------------- */
  function updateCartaProgress(progress) {
    var fill = $("[data-carta-progress-fill]");
    var label = $("[data-carta-progress-label]");
    var total = (data.dishes && data.dishes.length) || 10;
    if (fill) fill.style.width = (progress * 100).toFixed(1) + "%";
    if (label) {
      var current = Math.min(total, Math.max(1, Math.round(progress * (total - 1)) + 1));
      label.textContent = String(current).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    }
  }

  function initCartaScroll() {
    var section = $("[data-carta-pin]");
    var trackWrap = $(".carta-track-wrap");
    var track = $("[data-dishes]");
    if (!section || !trackWrap || !track) return;

    var mq = matchMedia("(min-width: 960px)");
    var st = null;

    function teardown() {
      if (st) { st.kill(); st = null; }
      if (window.gsap) gsap.set(track, { clearProps: "x" });
    }

    function buildDesktop() {
      teardown();
      if (!window.gsap || !window.ScrollTrigger) return;
      var distance = track.scrollWidth - trackWrap.clientWidth;
      if (distance <= 40) return;
      st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: function () { return "+=" + (distance + window.innerHeight * 0.5); },
        pin: true,
        scrub: 0.6,
        onUpdate: function (self) {
          gsap.set(track, { x: -distance * self.progress });
          updateCartaProgress(self.progress);
        }
      });
    }

    function setup() {
      if (mq.matches) {
        buildDesktop();
      } else {
        teardown();
        trackWrap.addEventListener("scroll", onMobileScroll, { passive: true });
      }
    }

    function onMobileScroll() {
      var max = track.scrollWidth - trackWrap.clientWidth;
      if (max <= 0) return;
      updateCartaProgress(trackWrap.scrollLeft / max);
    }

    setup();
    updateCartaProgress(0);
    window.addEventListener("resize", function () {
      safe(setup, "cartaScrollResize");
    });
  }

  /* ---------------- Reserva form -> WhatsApp ---------------- */
  function initReservaForm() {
    var form = $("[data-reserva-form]");
    if (!form) return;
    var whatsapp = (data.brand && data.brand.whatsapp) || "34678542278";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var nombre = form.nombre.value.trim();
      var telefono = form.telefono.value.trim();
      var dia = form.dia.value;
      var hora = form.hora.value;
      var personas = form.personas.value;
      var nota = form.nota.value.trim();
      var msg = "Hola, quiero reservar mesa en El Paso.\n" +
        "Nombre: " + nombre + "\n" +
        "Teléfono: " + telefono + "\n" +
        "Día: " + dia + "\n" +
        "Hora: " + hora + "\n" +
        "Personas: " + personas +
        (nota ? "\nNota: " + nota : "");
      var url = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    safe(mountDishes, "mountDishes");
    safe(mountServicios, "mountServicios");
    safe(mountGaleria, "mountGaleria");
    safe(mountResenas, "mountResenas");

    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initSmoothAnchors, "initSmoothAnchors");
    safe(initCursor, "initCursor");
    safe(initReveals, "initReveals");
    safe(initTilt, "initTilt");
    safe(initReservaForm, "initReservaForm");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
      safe(initCartaScroll, "initCartaScroll");
    } else {
      updateCartaProgress(0);
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
