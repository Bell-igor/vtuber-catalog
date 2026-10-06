/* ============================================================================
   BELLIGOR — логика сайта.
   Править этот файл не нужно: весь контент лежит в assets/js/config.js
   ============================================================================ */
(function () {
  "use strict";

  var CFG = window.SITE || {};
  var OWNER = CFG.owner || {};
  var GALLERY = Array.isArray(CFG.gallery) ? CFG.gallery : [];
  var KINDS = CFG.kinds || { all: { ru: "Всё", en: "All" } };
  var CREDITS = CFG.credits || { sections: [], thanks: [] };
  var FOOTER = CFG.footer || {};

  /* --------------------------- тексты интерфейса --------------------------- */
  var UI = {
    ru: {
      navGallery: "Арт и модель",
      navCredits: "Кредитсы",
      heroArt: "Арт модели",
      galleryTitle: "Арт, модель и референсы",
      gallerySub: "Нажмите на картинку, чтобы рассмотреть подробнее. Колесо мыши или кнопки «+» / «−» масштабируют, перетаскивание сдвигает, Esc закрывает.",
      creditsTitle: "Кредитсы",
      creditsSub: "Люди, благодаря которым всё это существует.",
      thanks: "Отдельное спасибо",
      empty: "В этом разделе пока ничего нет.",
      demoTitle: "Это демонстрационное наполнение.",
      demoText: "Тексты, ссылки и картинки — примеры. Свои данные впишите в файл assets/js/config.js, а потом поставьте demo: false — напоминание исчезнет.",
      demoHide: "Понятно",
      demoBadge: "демо",
      demoHint: "демо-ссылка: замените в config.js",
      open: "Открыть",
      original: "Открыть оригинал",
      zoomIn: "Увеличить",
      zoomOut: "Уменьшить",
      reset: "Сбросить масштаб",
      close: "Закрыть",
      prev: "Предыдущее",
      next: "Следующее",
      author: "Автор",
      langSwitch: "English version",
      langCode: "EN",
      watch: "Смотреть видео",
      madeNote: "Статичный сайт без внешних сервисов — открывается и в СНГ, и за рубежом."
    },
    en: {
      navGallery: "Art & model",
      navCredits: "Credits",
      heroArt: "Model art",
      galleryTitle: "Art, model & references",
      gallerySub: "Click an image to take a closer look. Mouse wheel or “+” / “−” to zoom, drag to pan, Esc to close.",
      creditsTitle: "Credits",
      creditsSub: "The people who make all of this possible.",
      thanks: "Special thanks",
      empty: "Nothing here yet.",
      demoTitle: "This is demo content.",
      demoText: "All texts, links and images are samples. Put your own data into assets/js/config.js and set demo: false to hide this note.",
      demoHide: "Got it",
      demoBadge: "demo",
      demoHint: "demo link: replace it in config.js",
      open: "Open",
      original: "Open original",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      reset: "Reset zoom",
      close: "Close",
      prev: "Previous",
      next: "Next",
      author: "By",
      langSwitch: "Русская версия",
      langCode: "RU",
      watch: "Watch video",
      madeNote: "A static site with no external services — reachable both in CIS and abroad."
    }
  };

  var state = { lang: "ru", filter: "all" };
  var LB_MAX = 6;

  /* ------------------------------- утилиты -------------------------------- */
  function tr(value, fallback) {
    if (value == null) return fallback == null ? "" : fallback;
    if (typeof value === "string") return value;
    return value[state.lang] || value.ru || value.en || (fallback == null ? "" : fallback);
  }
  function ui(key) {
    return (UI[state.lang] && UI[state.lang][key]) || UI.ru[key] || "";
  }
  function appendKids(node, kids) {
    if (kids == null || kids === false || kids === true) return;
    if (Array.isArray(kids)) {
      kids.forEach(function (kid) { appendKids(node, kid); });
      return;
    }
    node.appendChild(typeof kids === "object" ? kids : document.createTextNode(String(kids)));
  }
  function el(tag, attrs, kids) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k.indexOf("on") === 0 && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
        else if (v === true) node.setAttribute(k, "");
        else node.setAttribute(k, String(v));
      });
    }
    appendKids(node, kids);
    return node;
  }
  function clear(node) {
    if (node) while (node.firstChild) node.removeChild(node.firstChild);
    return node;
  }
  function isPlaceholder(url) {
    return !url || String(url).charAt(0) === "#";
  }
  function demoChip() {
    return el("span", { class: "chip chip--demo", text: ui("demoBadge"), title: ui("demoHint") });
  }

  /* --------------------------- каркас страницы ----------------------------- */
  function renderNav() {
    var nameNode = document.getElementById("navName");
    if (nameNode) nameNode.textContent = OWNER.name || "VTuber";
    var links = clear(document.getElementById("navLinks"));
    if (!links) return;
    [["gallery", ui("navGallery")], ["credits", ui("navCredits")]].forEach(function (pair) {
      links.appendChild(el("a", { class: "nav__link", href: "#" + pair[0], text: pair[1] }));
    });
    var langBtn = document.getElementById("langBtn");
    if (langBtn) {
      langBtn.setAttribute("title", ui("langSwitch"));
      langBtn.setAttribute("aria-label", ui("langSwitch"));
      var lab = document.getElementById("langLabel");
      if (lab) lab.textContent = ui("langCode");
    }
    document.documentElement.setAttribute("lang", state.lang);
  }

  function renderDemoBar() {
    var bar = document.getElementById("demoBar");
    if (!bar) return;
    if (!CFG.demo || bar.dataset.hidden === "1") {
      bar.hidden = true;
      return;
    }
    clear(bar);
    bar.hidden = false;
    bar.appendChild(el("div", { class: "wrap demobar__inner" }, [
      el("span", { class: "demobar__dot", "aria-hidden": "true" }),
      el("p", { class: "demobar__text" }, [
        el("strong", { text: ui("demoTitle") + " " }),
        ui("demoText")
      ]),
      el("button", {
        class: "demobar__btn", type: "button", text: ui("demoHide"),
        onclick: function () { bar.dataset.hidden = "1"; bar.hidden = true; }
      })
    ]));
  }

  function renderHero() {
    var sec = document.getElementById("hero");
    if (!sec) return;
    clear(sec);
    if (OWNER.hero) sec.style.setProperty("--hero-bg", "url('" + OWNER.hero + "')");

    var art = el("figure", { class: "hero__art" }, [
      OWNER.hero ? el("img", {
        class: "hero__img", src: OWNER.hero, alt: tr(OWNER.heroAlt, (OWNER.name || "") + " — " + ui("heroArt")),
        width: 896, height: 1195, decoding: "async", fetchpriority: "high"
      }) : null,
      OWNER.avatar ? el("img", {
        class: "hero__avatar", src: OWNER.avatar, alt: "", width: 96, height: 96, decoding: "async"
      }) : null
    ]);

    var list = el("ul", { class: "links" }, (CFG.links || []).map(function (l) {
      var accent = l.accent || "site";
      var inner = [el("span", { class: "links__dot", "aria-hidden": "true" }), el("span", { text: l.label || "" })];
      if (isPlaceholder(l.url)) {
        inner.push(demoChip());
        return el("li", {}, el("span", {
          class: "btn btn--link is-placeholder accent--" + accent, title: ui("demoHint")
        }, inner));
      }
      inner.push(el("span", { class: "btn__arrow", "aria-hidden": "true", text: "↗" }));
      return el("li", {}, el("a", {
        class: "btn btn--link accent--" + accent, href: l.url, target: "_blank", rel: "noopener noreferrer me"
      }, inner));
    }));

    var text = el("div", { class: "hero__text" }, [
      el("p", { class: "hero__role", text: tr(OWNER.role) }),
      el("h1", { class: "hero__name", text: OWNER.name || "VTuber" }),
      tr(OWNER.tagline) ? el("p", { class: "hero__tagline", text: tr(OWNER.tagline) }) : null,
      tr(OWNER.about) ? el("p", { class: "hero__about", text: tr(OWNER.about) }) : null,
      list.children.length ? list : null,
      el("div", { class: "hero__cta" }, [
        el("a", { class: "btn btn--primary", href: "#gallery", text: ui("navGallery") }),
        el("a", { class: "btn btn--ghost", href: "#credits", text: ui("creditsTitle") })
      ])
    ]);

    sec.appendChild(el("div", { class: "wrap hero__inner" }, [text, art]));
  }

  function imageItems() {
    return GALLERY.filter(function (it) { return it && it.src; });
  }

  function renderFilters() {
    var box = clear(document.getElementById("filters"));
    if (!box) return;
    var used = {};
    GALLERY.forEach(function (it) { if (it && it.kind) used[it.kind] = true; });
    var keys = Object.keys(KINDS).filter(function (k) {
      return k === "all" ? GALLERY.length > 0 : used[k];
    });
    if (keys.length < 2) { box.hidden = true; return; }
    box.hidden = false;
    keys.forEach(function (k) {
      var active = state.filter === k;
      box.appendChild(el("button", {
        class: "filter" + (active ? " is-active" : ""),
        type: "button", "aria-pressed": active ? "true" : "false",
        text: tr(KINDS[k], k),
        onclick: function () { state.filter = k; renderFilters(); renderGrid(); }
      }));
    });
  }

  function cardFor(item, index) {
    var kindLabel = item.kind && KINDS[item.kind] ? tr(KINDS[item.kind], item.kind) : "";
    var artist = item.artist || {};
    var meta = el("span", { class: "card__meta" }, [
      el("span", { class: "card__title", text: tr(item.title, "—") }),
      el("span", { class: "card__sub" }, [
        el("span", { text: kindLabel }),
        artist.name ? el("span", { class: "card__sep", "aria-hidden": "true", text: "·" }) : null,
        artist.name ? el("span", { text: artist.name }) : null
      ])
    ]);
    var thumb = el("img", {
      class: "card__img", src: item.thumb || item.src, alt: tr(item.alt, tr(item.title, "")),
      width: item.w || null, height: item.h || null, loading: "lazy", decoding: "async"
    });
    var label = ui("open") + ": " + tr(item.title, "");

    if (item.video) {
      return el("a", {
        class: "card card--video", href: item.video, target: "_blank", rel: "noopener noreferrer",
        "aria-label": label + " (" + ui("watch") + ")"
      }, [
        thumb, el("span", { class: "card__play", "aria-hidden": "true", text: "▶" }),
        el("span", { class: "card__badge", text: ui("watch") }), meta
      ]);
    }
    return el("button", {
      class: "card", type: "button", "aria-label": label,
      onclick: function () { openLightbox(item); }
    }, [thumb, el("span", { class: "card__zoom", "aria-hidden": "true", text: "⤢" }), meta]);
  }

  function renderGrid() {
    var grid = clear(document.getElementById("grid"));
    if (!grid) return;
    var items = GALLERY.filter(function (it) {
      return it && (state.filter === "all" || it.kind === state.filter);
    });
    var empty = document.getElementById("galleryEmpty");
    if (empty) empty.hidden = items.length > 0;
    items.forEach(function (item, i) {
      var card = cardFor(item, i);
      card.style.setProperty("--i", String(i));
      grid.appendChild(card);
    });
  }

  function renderGalleryHead() {
    var head = clear(document.getElementById("galleryHead"));
    if (!head) return;
    head.appendChild(el("h2", { class: "section__title", text: ui("galleryTitle") }));
    head.appendChild(el("p", { class: "section__sub", text: ui("gallerySub") }));
  }

  function creditItem(c) {
    var links = [];
    if (c.url && !isPlaceholder(c.url)) {
      links.push(el("a", {
        class: "credit__link", href: c.url, target: "_blank", rel: "noopener noreferrer",
        text: (c.handle || c.url.replace(/^https?:\/\/(www\.)?/, "")) + " ↗"
      }));
    } else {
      links.push(el("span", { class: "credit__link is-placeholder", title: ui("demoHint"),
        text: c.handle || ui("demoBadge") }));
      links.push(demoChip());
    }
    return el("li", { class: "credit" }, [
      el("p", { class: "credit__role", text: tr(c.role) }),
      el("p", { class: "credit__who" }, [
        el("span", { class: "credit__name", text: c.name || "—" }),
        links
      ]),
      tr(c.note) ? el("p", { class: "credit__note", text: tr(c.note) }) : null
    ]);
  }

  function renderCredits() {
    var box = clear(document.getElementById("creditsBody"));
    if (!box) return;
    (CREDITS.sections || []).forEach(function (sec) {
      var items = (sec.items || []);
      box.appendChild(el("article", { class: "group" }, [
        el("h3", { class: "group__title", text: tr(sec.title) }),
        items.length
          ? el("ul", { class: "credit-list" }, items.map(creditItem))
          : el("p", { class: "section__sub", text: ui("empty") })
      ]));
    });
    var thanks = (CREDITS.thanks || []).filter(Boolean);
    if (thanks.length) {
      box.appendChild(el("article", { class: "group group--thanks" }, [
        el("h3", { class: "group__title", text: ui("thanks") }),
        el("ul", { class: "chips" }, thanks.map(function (th) {
          var name = typeof th === "string" ? th : (th.name || "");
          var url = typeof th === "string" ? "" : th.url;
          if (url && !isPlaceholder(url)) {
            return el("li", {}, el("a", { class: "chip", href: url, target: "_blank", rel: "noopener noreferrer", text: name }));
          }
          return el("li", {}, el("span", { class: "chip", text: name }));
        }))
      ]));
    }
  }

  function renderCreditsHead() {
    var head = clear(document.getElementById("creditsHead"));
    if (!head) return;
    head.appendChild(el("h2", { class: "section__title", text: ui("creditsTitle") }));
    head.appendChild(el("p", { class: "section__sub", text: ui("creditsSub") }));
  }

  function renderFooter() {
    var f = clear(document.getElementById("footer"));
    if (!f) return;
    var parts = [];
    parts.push(el("p", { class: "footer__note", text: tr(FOOTER.note) }));
    var row = el("div", { class: "footer__row" }, [
      el("span", { class: "footer__copy", text: "© " + new Date().getFullYear() + " " + (OWNER.name || "") }),
      el("span", { class: "footer__made", text: ui("madeNote") })
    ]);
    var extra = [];
    if (FOOTER.contact && FOOTER.contact.url) {
      extra.push(isPlaceholder(FOOTER.contact.url)
        ? el("span", { class: "footer__link is-placeholder", text: tr(FOOTER.contact.label) + " " + ui("demoBadge") })
        : el("a", { class: "footer__link", href: FOOTER.contact.url, target: "_blank", rel: "noopener noreferrer", text: tr(FOOTER.contact.label) }));
    }
    if (FOOTER.mirror && FOOTER.mirror.url) {
      extra.push(el("a", { class: "footer__link", href: FOOTER.mirror.url, target: "_blank", rel: "noopener noreferrer", text: tr(FOOTER.mirror.label) }));
    }
    if (extra.length) row.appendChild(el("span", { class: "footer__links" }, extra));
    parts.push(row);
    f.appendChild(el("div", { class: "wrap footer__inner" }, parts));
  }

  /* ------------------------------ лайтбокс -------------------------------- */
  var lb = { root: null, stage: null, img: null, scale: 1, tx: 0, ty: 0, item: null, list: [], index: -1 };

  function lbEls() {
    lb.root = document.getElementById("lb");
    lb.stage = document.getElementById("lbStage");
    lb.img = document.getElementById("lbImg");
    lb.caption = document.getElementById("lbCaption");
  }

  function applyTransform(withTransition) {
    if (!lb.img) return;
    lb.img.style.transition = withTransition ? "" : "none";
    lb.img.style.transform = "translate(" + lb.tx + "px," + lb.ty + "px) scale(" + lb.scale + ")";
    if (!withTransition) void lb.img.offsetWidth;
    lb.img.style.transition = "";
    var reset = document.getElementById("lbReset");
    if (reset) reset.textContent = Math.round(lb.scale * 100) + "%";
    if (lb.root) lb.root.classList.toggle("is-zoomed", lb.scale > 1.001);
  }

  function panBounds() {
    var w = lb.img ? lb.img.offsetWidth : 0;
    var h = lb.img ? lb.img.offsetHeight : 0;
    return { x: Math.max(0, (lb.scale - 1) * w / 2), y: Math.max(0, (lb.scale - 1) * h / 2) };
  }
  function clampPan() {
    var b = panBounds();
    lb.tx = Math.max(-b.x, Math.min(b.x, lb.tx));
    lb.ty = Math.max(-b.y, Math.min(b.y, lb.ty));
  }
  function resetZoom(withTransition) {
    lb.scale = 1; lb.tx = 0; lb.ty = 0;
    applyTransform(withTransition);
  }
  function zoomAt(cx, cy, factor) {
    var next = Math.max(1, Math.min(LB_MAX, lb.scale * factor));
    if (Math.abs(next - lb.scale) < 0.0001) return;
    var r = lb.stage.getBoundingClientRect();
    var ox = cx - (r.left + r.width / 2);
    var oy = cy - (r.top + r.height / 2);
    var k = next / lb.scale;
    lb.tx = ox - (ox - lb.tx) * k;
    lb.ty = oy - (oy - lb.ty) * k;
    lb.scale = next;
    clampPan();
    applyTransform(true);
  }

  function lbCaption(item) {
    var cap = clear(lb.caption);
    if (!cap) return;
    var artist = item.artist || {};
    cap.appendChild(el("p", { class: "lb__title", text: tr(item.title, "") }));
    var sub = [];
    if (artist.name) {
      sub.push(el("span", { text: (state.lang === "ru" ? "Автор: " : "By ") }));
      sub.push(isPlaceholder(artist.url)
        ? el("span", { class: "is-placeholder", text: artist.name, title: ui("demoHint") })
        : el("a", { href: artist.url, target: "_blank", rel: "noopener noreferrer", text: artist.name }));
    }
    if (item.kind && KINDS[item.kind]) sub.push(el("span", { class: "lb__kind", text: "· " + tr(KINDS[item.kind]) }));
    if (sub.length) cap.appendChild(el("p", { class: "lb__sub" }, sub));
    if (tr(item.note)) cap.appendChild(el("p", { class: "lb__note", text: tr(item.note) }));
  }

  function lbShow(item) {
    lb.item = item;
    resetZoom(false);
    lb.img.src = item.src;
    lb.img.alt = tr(item.alt, tr(item.title, ""));
    lbCaption(item);
    var count = document.getElementById("lbCount");
    if (count) count.textContent = (lb.index + 1) + " / " + lb.list.length;
    var orig = document.getElementById("lbOriginal");
    if (orig) {
      orig.href = item.src;
      orig.textContent = ui("original");
    }
    var multi = lb.list.length > 1;
    ["lbPrev", "lbNext"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.hidden = !multi;
    });
  }

  function openLightbox(item) {
    lbEls();
    if (!lb.root) return;
    lb.list = imageItems();
    lb.index = lb.list.indexOf(item);
    if (lb.index < 0) { lb.list = [item]; lb.index = 0; }
    lb.lastFocus = document.activeElement;
    if (typeof lb.root.showModal === "function") lb.root.showModal();
    else lb.root.setAttribute("open", "");
    document.documentElement.classList.add("lb-open");
    lbShow(item);
    var close = document.getElementById("lbClose");
    if (close) close.focus();
  }

  function step(delta) {
    if (lb.list.length < 2) return;
    lb.index = (lb.index + delta + lb.list.length) % lb.list.length;
    lbShow(lb.list[lb.index]);
  }

  function closeLightbox() {
    if (!lb.root) return;
    if (typeof lb.root.close === "function" && lb.root.open) lb.root.close();
    else lb.root.removeAttribute("open");
  }

  function bindLightbox() {
    lbEls();
    if (!lb.root) return;

    document.getElementById("lbClose").addEventListener("click", closeLightbox);
    document.getElementById("lbPrev").addEventListener("click", function () { step(-1); });
    document.getElementById("lbNext").addEventListener("click", function () { step(1); });
    document.getElementById("lbIn").addEventListener("click", function () { centerZoom(1.4); });
    document.getElementById("lbOut").addEventListener("click", function () { centerZoom(1 / 1.4); });
    document.getElementById("lbReset").addEventListener("click", function () { resetZoom(true); });

    lb.root.addEventListener("close", function () {
      document.documentElement.classList.remove("lb-open");
      lb.img.removeAttribute("src");
      if (lb.lastFocus && lb.lastFocus.focus) lb.lastFocus.focus();
    });
    // клик по затемнению вокруг картинки — закрыть
    lb.root.addEventListener("click", function (e) {
      if (e.target === lb.root) closeLightbox();
    });
    lb.root.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.2 : 1 / 1.2);
    }, { passive: false });
    lb.stage.addEventListener("dblclick", function (e) {
      if (lb.scale > 1.001) resetZoom(true);
      else zoomAt(e.clientX, e.clientY, 2.6);
    });
    lb.root.addEventListener("keydown", onLbKey);

    var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0, moved = 0;
    lb.stage.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      dragging = true; moved = 0;
      sx = e.clientX; sy = e.clientY; ox = lb.tx; oy = lb.ty;
      lb.stage.setPointerCapture(e.pointerId);
      lb.stage.classList.add("is-dragging");
    });
    lb.stage.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
      if (lb.scale > 1.001) {
        lb.tx = ox + dx; lb.ty = oy + dy;
        clampPan();
        applyTransform(false);
      }
    });
    lb.stage.addEventListener("pointerup", function (e) {
      if (!dragging) return;
      dragging = false;
      lb.stage.classList.remove("is-dragging");
      if (lb.scale <= 1.001 && moved > 60) {
        step(e.clientX - sx < 0 ? 1 : -1);
      }
    });
    lb.stage.addEventListener("pointercancel", function () { dragging = false; lb.stage.classList.remove("is-dragging"); });
    lb.stage.addEventListener("dragstart", function (e) { e.preventDefault(); });
  }

  function centerZoom(factor) {
    var r = lb.stage.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, factor);
  }

  function onLbKey(e) {
    var k = e.key;
    if (k === "ArrowRight") { step(1); e.preventDefault(); }
    else if (k === "ArrowLeft") { step(-1); e.preventDefault(); }
    else if (k === "+" || k === "=") { centerZoom(1.3); e.preventDefault(); }
    else if (k === "-" || k === "_") { centerZoom(1 / 1.3); e.preventDefault(); }
    else if (k === "0") { resetZoom(true); e.preventDefault(); }
  }

  /* --------------------------- язык и запуск ------------------------------- */
  function storeLang(lang) {
    try { window.localStorage.setItem("belligor-lang", lang); } catch (err) { /* режим инкогнито / file:// */ }
  }
  function loadLang() {
    var saved = null;
    try { saved = window.localStorage.getItem("belligor-lang"); } catch (err) { saved = null; }
    if (saved === "ru" || saved === "en") return saved;
    // зрителям с нерусской локалью сразу показываем английскую версию
    var nav = (navigator.language || "ru").toLowerCase();
    var cis = ["ru", "uk", "be", "kk", "ky", "uz", "tg", "hy", "az", "mo"];
    for (var i = 0; i < cis.length; i++) if (nav.indexOf(cis[i]) === 0) return "ru";
    return "en";
  }

  function renderAll() {
    renderNav();
    renderDemoBar();
    renderHero();
    renderGalleryHead();
    renderFilters();
    renderGrid();
    renderCreditsHead();
    renderCredits();
    renderFooter();
    var close = document.getElementById("lbClose");
    if (close) {
      close.setAttribute("aria-label", ui("close"));
      document.getElementById("lbPrev").setAttribute("aria-label", ui("prev"));
      document.getElementById("lbNext").setAttribute("aria-label", ui("next"));
      document.getElementById("lbIn").setAttribute("aria-label", ui("zoomIn"));
      document.getElementById("lbOut").setAttribute("aria-label", ui("zoomOut"));
      document.getElementById("lbReset").setAttribute("aria-label", ui("reset"));
      document.getElementById("lbOriginal").textContent = ui("original");
    }
    if (lb.item) lbCaption(lb.item);
  }

  function init() {
    state.lang = loadLang();
    var langBtn = document.getElementById("langBtn");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        state.lang = state.lang === "ru" ? "en" : "ru";
        storeLang(state.lang);
        renderAll();
      });
    }
    renderAll();
    bindLightbox();
    if (CFG.demo) {
      // подсказка разработчику в консоли — не видна зрителям
      try { console.info("Belligor: демо-режим включён. Заполните assets/js/config.js и поставьте demo: false."); } catch (err) {}
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
