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
      navCredits: "Кредитсы",
      heroArt: "Арт модели",
      galleryTitle: "Модель, арт и эфиры",
      gallerySub: "Модель открывается на весь экран — нажмите на карточку. Клипы подтягиваются с Twitch автоматически и открываются там же.",
      creditsTitle: "Кредитсы",
      creditsSub: "Люди, благодаря которым всё это существует.",
      thanks: "Отдельное спасибо",
      empty: "В этом разделе пока ничего нет.",
      demoTitle: "Это демонстрационное наполнение.",
      demoText: "Кредитсы пока заполнены примерами. Впишите реальные имена и ссылки в файл assets/js/config.js, а потом поставьте demo: false — напоминание исчезнет.",
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
      watchClip: "Смотреть клип",
      watchVod: "Смотреть запись",
      clipBadge: "Клип",
      vodBadge: "Запись",
      navGallery: "Арт и эфиры",
      clipFallback: "Клип с эфира",
      vodFallback: "Запись эфира",
      view1: "просмотр",
      view2: "просмотра",
      view5: "просмотров",
      bannerAlt: "баннер канала",
      madeNote: "Статичный сайт без внешних сервисов — открывается и в СНГ, и за рубежом.",
      liveNow: "Сейчас в эфире",
      offline: "Не в эфире",
      watchStream: "Смотреть стрим",
      viewers: "смотрят",
      lastStream: "Последний стрим",
      offlineHint: "Как только стрим начнётся, здесь загорится значок «В эфире». Расписание — в анонсах ниже.",
      followers: "фолловеров на Twitch",
      tgSubs: "подписчиков в Telegram",
      dcMembers: "участников в Discord",
      newsTitle: "Анонсы и события",
      newsMore: "Читать в Telegram",
      openAll: "Все анонсы"
    },
    en: {
      navCredits: "Credits",
      heroArt: "Model art",
      galleryTitle: "Model, art & streams",
      gallerySub: "The model opens full screen — click its card. Clips are pulled from Twitch automatically and open there.",
      creditsTitle: "Credits",
      creditsSub: "The people who make all of this possible.",
      thanks: "Special thanks",
      empty: "Nothing here yet.",
      demoTitle: "This is demo content.",
      demoText: "The credits are still placeholders. Put the real names and links into assets/js/config.js and set demo: false to hide this note.",
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
      watchClip: "Watch clip",
      watchVod: "Watch VOD",
      clipBadge: "Clip",
      vodBadge: "VOD",
      navGallery: "Art & streams",
      clipFallback: "Stream clip",
      vodFallback: "Stream recording",
      view1: "view",
      view2: "views",
      view5: "views",
      bannerAlt: "channel banner",
      madeNote: "A static site with no external services — reachable both in CIS and abroad.",
      liveNow: "Live now",
      offline: "Offline",
      watchStream: "Watch stream",
      viewers: "watching",
      lastStream: "Last stream",
      offlineHint: "The “Live” badge lights up here as soon as the stream starts. Schedule is in the news below.",
      followers: "Twitch followers",
      tgSubs: "Telegram subscribers",
      dcMembers: "Discord members",
      newsTitle: "News & events",
      newsMore: "Read in Telegram",
      openAll: "All news"
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

  /* ------------------------------- значки --------------------------------- */
  var ICONS = {
    twitch: "M4 4h16v9.4l-3.2 3.2h-3.3L11 19.4v-2.8H6.2L4 14.4z M10 7.2v4.4 M14 7.2v4.4",
    telegram: "M21.4 3.2L2.6 10.7l5 1.9 1.7 5.6 3.2-3.6 4.7 3.5z M7.6 12.6l13.8-9.4-9.4 12.6",
    discord: "M4 5.6h16v10.2h-8.4L7 20v-4.2H4z M9 9.6v2.6 M15 9.6v2.6",
    gift: "M4 9h16v10.6H4z M4 5.6h16V9H4z M12 5.6v14 M8.8 5.6c-2.3 0-2.6-2.6-.6-2.1 1.7.5 3.8 2.1 3.8 2.1s2.1-1.6 3.8-2.1c2-.5 1.7 2.1-.6 2.1",
    coin: "M12 3.4a8.6 8.6 0 110 17.2 8.6 8.6 0 010-17.2z M12 16.2s-3-1.9-3-3.9a1.7 1.7 0 013-1 1.7 1.7 0 013 1c0 2-3 3.9-3 3.9z",
    play: "M8.4 5.6l9.6 6.4-9.6 6.4z",
    site: "M12 3.5a8.5 8.5 0 110 17 8.5 8.5 0 010-17z M3.5 12h17 M12 3.5c2.6 2.6 2.6 14.4 0 17-2.6-2.6-2.6-14.4 0-17z"
  };
  function iconSvg(name) {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var path = document.createElementNS(NS, "path");
    path.setAttribute("d", ICONS[name] || ICONS.site);
    svg.appendChild(path);
    return svg;
  }

  /* --------------------------- каркас страницы ----------------------------- */
  function renderNav() {
    var nameNode = document.getElementById("navName");
    if (nameNode) nameNode.textContent = OWNER.name || "VTuber";
    var logo = document.getElementById("navLogo");
    if (logo && OWNER.avatar) {
      logo.src = OWNER.avatar;
      logo.hidden = false;
      logo.onerror = function () { this.hidden = true; };
    }
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
    if (OWNER.banner) sec.style.setProperty("--hero-bg", "url('" + OWNER.banner + "')");

    var banner = null;
    if (OWNER.banner) {
      banner = el("figure", { class: "hero__banner" }, [
        el("img", {
          class: "hero__banner-img", src: OWNER.banner,
          alt: (OWNER.name || "") + " — " + ui("bannerAlt"),
          width: 1600, height: 900, decoding: "async", fetchpriority: "high"
        })
      ]);
      // поверх кадра — короткая видео-петля (загружается после отрисовки страницы)
      if (OWNER.bannerVideo) {
        var vid = el("video", {
          class: "hero__banner-video", muted: true, loop: true, playsinline: true,
          preload: "none", "aria-hidden": "true", tabindex: "-1"
        });
        vid.muted = true;
        banner.appendChild(vid);
        var startBanner = function () {
          vid.src = OWNER.bannerVideo;
          var pr = vid.play();
          if (pr && pr.catch) pr.catch(function () { });
        };
        if (document.readyState === "complete") setTimeout(startBanner, 250);
        else window.addEventListener("load", function () { setTimeout(startBanner, 250); });
        vid.addEventListener("playing", function () { banner.classList.add("is-ready"); });
      }
    }

    // модель: готовая анимация (машет рукой) или сборка из слоёв
    var MODEL = CFG.model || {};
    var model = null;
    if (MODEL.animation) {
      var animBox = el("div", { class: "model model--anim" }, [
        el("span", { class: "model__glow", "aria-hidden": "true" }),
        el("img", {
          class: "model__poster", src: MODEL.poster || MODEL.full, alt: tr(MODEL.alt, OWNER.name || ""),
          width: 320, height: 638, decoding: "async"
        }),
        el("span", { class: "model__shadow", "aria-hidden": "true" })
      ]);
      var animImg = el("img", {
        class: "model__anim", alt: "", "aria-hidden": "true",
        width: 320, height: 638, decoding: "async",
        onload: function () { animBox.classList.add("is-ready"); }
      });
      animBox.appendChild(animImg);
      // анимация весит больше статичного кадра, поэтому грузим её после отрисовки страницы
      var startAnim = function () { animImg.src = MODEL.animation; };
      if (document.readyState === "complete") setTimeout(startAnim, 120);
      else window.addEventListener("load", function () { setTimeout(startAnim, 120); });
      model = animBox;
    } else if (MODEL.body) {
      var vars = "--head-pivot:" + (MODEL.headPivot ? MODEL.headPivot[0] + "% " + MODEL.headPivot[1] + "%" : "50% 26%") + ";" +
                 "--hand-pivot:" + (MODEL.handPivot ? MODEL.handPivot[0] + "% " + MODEL.handPivot[1] + "%" : "29% 50%") + ";" +
                 "--head-angle:" + (MODEL.headAngle || 6) + "deg;" +
                 "--hand-angle:" + (MODEL.handAngle || 18) + "deg;";
      model = el("div", { class: "model", style: vars }, [
        el("span", { class: "model__glow", "aria-hidden": "true" }),
        el("img", {
          class: "model__layer", src: MODEL.body, alt: tr(MODEL.alt, OWNER.name || ""),
          width: 640, height: 1280, decoding: "async"
        }),
        MODEL.head ? el("img", {
          class: "model__layer model__layer--head", src: MODEL.head, alt: "", "aria-hidden": "true",
          width: 640, height: 1280, decoding: "async"
        }) : null,
        MODEL.hand ? el("img", {
          class: "model__layer model__layer--hand", src: MODEL.hand, alt: "", "aria-hidden": "true",
          width: 640, height: 1280, decoding: "async"
        }) : null,
        el("span", { class: "model__shadow", "aria-hidden": "true" })
      ]);
    }

    var list = el("ul", { class: "links" }, (CFG.links || []).map(function (l) {
      var accent = l.accent || "site";
      var inner = [l.icon ? iconSvg(l.icon) : el("span", { class: "links__dot", "aria-hidden": "true" }), el("span", { text: l.label || "" })];
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
      ]),
      el("div", { class: "status", id: "heroStatus" })
    ]);

    sec.appendChild(el("div", { class: "wrap" }, [
      banner,
      el("div", { class: "hero__inner" }, [model, text])
    ]));
  }

  // карточки видео, которые приходят из status.json (клипы и записи эфиров)
  function clipItems() {
    var tw = live.twitch || {};
    var list = []
      .concat((tw.videos || []).filter(function (v) { return v && v.thumb; }))
      .concat((tw.clips || []).filter(function (v) { return v && v.thumb; }));
    var limit = Number((CFG.clips && CFG.clips.count) || 6);
    return list.slice(0, limit).map(function (v) {
      var isVod = v.kind === "vod";
      return {
        kind: isVod ? "vod" : "clip",
        auto: true,
        title: v.title || (isVod ? ui("vodFallback") : ui("clipFallback")),
        alt: v.title || "",
        thumb: v.thumb,
        video: v.url,
        date: v.date,
        seconds: v.seconds,
        views: v.views,
        w: 640, h: 360
      };
    });
  }

  function galleryItems() {
    return GALLERY.concat(clipItems());
  }

  function imageItems() {
    return GALLERY.filter(function (it) { return it && it.src; });
  }

  function renderFilters() {
    var box = clear(document.getElementById("filters"));
    if (!box) return;
    var items = galleryItems();
    var used = {};
    items.forEach(function (it) { if (it && it.kind) used[it.kind] = true; });
    var keys = Object.keys(KINDS).filter(function (k) {
      return k === "all" ? items.length > 0 : used[k];
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
    var sub = [];
    if (kindLabel) sub.push(el("span", { text: kindLabel }));
    if (item.auto) {
      if (item.date) sub.push(el("span", { text: formatShortDate(item.date) }));
      if (item.seconds) sub.push(el("span", { text: formatDuration(item.seconds) }));
      if (typeof item.views === "number") {
        sub.push(el("span", { text: formatNum(item.views) + " " + plural(item.views, ui("view1"), ui("view2"), ui("view5")) }));
      }
    } else if (artist.name) {
      sub.push(el("span", { text: artist.name }));
    }
    var meta = el("span", { class: "card__meta" }, [
      el("span", { class: "card__title", text: tr(item.title, "—") }),
      el("span", { class: "card__sub" }, sub)
    ]);
    var thumb = el("img", {
      class: "card__img", src: item.thumb || item.src, alt: tr(item.alt, tr(item.title, "")),
      width: item.w || null, height: item.h || null, loading: "lazy", decoding: "async",
      onerror: function () { this.style.visibility = "hidden"; }
    });
    var label = ui("open") + ": " + tr(item.title, "");

    if (item.video) {
      return el("a", {
        class: "card card--video" + (item.auto ? " card--wide" : ""),
        href: item.video, target: "_blank", rel: "noopener noreferrer",
        "aria-label": label + " (" + ui("watch") + ")"
      }, [
        thumb, el("span", { class: "card__play", "aria-hidden": "true", text: "▶" }),
        el("span", { class: "card__badge", text: item.kind === "vod" ? ui("vodBadge") : ui("clipBadge") }), meta
      ]);
    }
    return el("button", {
      class: "card" + (item.contain ? " card--contain" : ""), type: "button", "aria-label": label,
      onclick: function () { openLightbox(item); }
    }, [thumb, el("span", { class: "card__zoom", "aria-hidden": "true", text: "⤢" }), meta]);
  }

  function renderGrid() {
    var grid = clear(document.getElementById("grid"));
    if (!grid) return;
    var all = galleryItems();
    var items = all.filter(function (it) { return state.filter === "all" || it.kind === state.filter; });
    var sec = document.getElementById("gallery");
    if (sec) sec.hidden = all.length === 0;
    var empty = document.getElementById("galleryEmpty");
    if (empty) empty.hidden = items.length > 0 || all.length === 0;
    items.forEach(function (item, i) {
      var card = cardFor(item, i);
      card.style.setProperty("--i", String(i));
      grid.appendChild(card);
    });
  }

  function renderGalleryHead() {
    var head = clear(document.getElementById("galleryHead"));
    if (!head) return;
    var clips = CFG.clips || {};
    head.appendChild(el("h2", { class: "section__title", text: tr(clips.title, ui("galleryTitle")) }));
    head.appendChild(el("p", { class: "section__sub", text: ui("gallerySub") }));
    if (clips.allUrl) {
      head.appendChild(el("a", {
        class: "section__link", href: clips.allUrl, target: "_blank", rel: "noopener noreferrer",
        text: tr(clips.allLabel, ui("galleryTitle")) + " ↗"
      }));
    }
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

  /* -------------------- живой статус стрима и анонсы ----------------------- */
  var LIVE = CFG.live || {};
  var NEWS = CFG.news || {};
  var baseTitle = document.title;
  var live = {
    on: false, title: "", game: "", startedAt: null, viewers: null,
    followers: null, last: null, tg: null, dc: null, twitch: null, ready: false
  };
  var newsScrolled = false;

  function fetchJSON(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) {
      return r.ok ? r.json() : null;
    }).catch(function () { return null; });
  }
  function plural(n, one, few, many) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
    return many;
  }
  function formatNum(n) {
    try { return new Intl.NumberFormat(state.lang === "ru" ? "ru-RU" : "en-US").format(n); }
    catch (e) { return String(n); }
  }
  function durationText(iso) {
    var ms = Date.now() - new Date(iso).getTime();
    if (!isFinite(ms) || ms < 0) ms = 0;
    var min = Math.floor(ms / 60000), h = Math.floor(min / 60);
    min = min % 60;
    if (state.lang !== "ru") return h > 0 ? h + "h " + min + "m" : min + "m";
    return h > 0 ? h + " " + plural(h, "час", "часа", "часов") + " " + min + " мин" : min + " мин";
  }
  function timeAgo(iso) {
    var min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (min < 1) return state.lang === "ru" ? "только что" : "just now";
    if (min < 60) return state.lang === "ru" ? min + " мин назад" : min + " min ago";
    var h = Math.round(min / 60);
    if (h < 24) return state.lang === "ru" ? h + " " + plural(h, "час", "часа", "часов") + " назад" : h + "h ago";
    var d = Math.round(h / 24);
    return state.lang === "ru" ? d + " " + plural(d, "день", "дня", "дней") + " назад" : d + "d ago";
  }
  function shorten(text, n) {
    var t = String(text || "").replace(/\s+/g, " ").trim();
    return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + "…" : t;
  }
  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString(state.lang === "ru" ? "ru-RU" : "en-GB",
        { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
    } catch (e) { return ""; }
  }
  function formatShortDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(state.lang === "ru" ? "ru-RU" : "en-GB");
    } catch (e) { return ""; }
  }
  function formatDuration(seconds) {
    var s = Math.max(0, Math.round(seconds || 0));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    return h > 0 ? h + ":" + pad(m) + ":" + pad(sec) : m + ":" + pad(sec);
  }

  function applyStatus(data) {
    if (!data) return;
    var tw = data.twitch || {};
    live.twitch = tw;
    if (typeof tw.live === "boolean") live.on = tw.live;
    if (tw.live) {
      live.title = tw.title || live.title;
      live.game = tw.game || live.game;
      live.startedAt = tw.startedAt || live.startedAt;
      if (typeof tw.viewers === "number") live.viewers = tw.viewers;
    }
    if (typeof tw.followers === "number") live.followers = tw.followers;
    if (tw.lastBroadcast) live.last = tw.lastBroadcast;
    if (data.telegram) live.tg = data.telegram;
    if (data.discord) live.dc = data.discord;
    live.ready = true;
    paintLive();
    renderNews();
    renderFilters();
    renderGrid();
  }

  // быстрая проверка (несколько секунд вместо пяти минут), необязательная
  function applyFast(data) {
    if (!data) return;
    var u = Array.isArray(data) ? data[0] : data;
    if (!u || !("stream" in u)) return;
    var s = u.stream;
    if (s) {
      live.on = true;
      live.title = s.title || live.title;
      live.game = (s.game && s.game.name) || live.game;
      live.startedAt = s.createdAt || live.startedAt;
      if (typeof s.viewersCount === "number") live.viewers = s.viewersCount;
    } else {
      live.on = false;
      live.startedAt = null;
      live.viewers = null;
    }
    if (typeof u.followers === "number") live.followers = u.followers;
    if (u.lastBroadcast && !live.last) live.last = u.lastBroadcast;
    paintLive();
  }

  function refreshLive() {
    if (document.visibilityState === "hidden") return;
    var file = LIVE.statusFile || "status.json";
    fetchJSON(file + "?t=" + Date.now()).then(applyStatus);
    if (LIVE.fastCheck) {
      fetchJSON(LIVE.fastCheck + (LIVE.fastCheck.indexOf("?") >= 0 ? "&" : "?") + "t=" + Date.now()).then(applyFast);
    }
  }

  function paintLive() {
    renderLiveBadge();
    renderStatusCard();
    document.documentElement.classList.toggle("is-live", live.on);
  }

  function renderLiveBadge() {
    var box = document.getElementById("navLive");
    if (!box) return;
    clear(box);
    if (!live.on) {
      box.hidden = true;
      document.title = baseTitle;
      return;
    }
    box.hidden = false;
    box.appendChild(el("a", {
      class: "livepill", href: LIVE.twitchUrl || "#", target: "_blank", rel: "noopener noreferrer",
      title: ui("watchStream"), "aria-label": ui("liveNow")
    }, [
      el("span", { class: "livepill__dot", "aria-hidden": "true" }),
      el("span", { class: "livepill__text", text: ui("liveNow") })
    ]));
    document.title = "🔴 " + ui("liveNow") + " — " + (OWNER.name || "");
  }

  function statItem(value, label) {
    return el("li", { class: "stats__item" }, [
      el("b", { class: "stats__num", text: value }),
      el("span", { class: "stats__label", text: label })
    ]);
  }

  function renderStatusCard() {
    var box = document.getElementById("heroStatus");
    if (!box) return;
    clear(box);
    box.className = "status" + (live.on ? " is-live" : "");
    box.appendChild(el("div", { class: "status__head" }, [
      el("span", { class: "status__dot", "aria-hidden": "true" }),
      el("span", { class: "status__label", text: live.on ? ui("liveNow") : ui("offline") }),
      live.on && live.startedAt ? el("span", { class: "status__timer", id: "liveTimer", text: durationText(live.startedAt) }) : null
    ]));
    if (live.on) {
      if (live.title) box.appendChild(el("p", { class: "status__title", text: live.title }));
      var meta = [];
      if (live.game) meta.push(live.game);
      if (typeof live.viewers === "number") meta.push(formatNum(live.viewers) + " " + ui("viewers"));
      if (meta.length) box.appendChild(el("p", { class: "status__meta", text: meta.join(" · ") }));
      box.appendChild(el("a", {
        class: "btn btn--primary status__btn", href: LIVE.twitchUrl, target: "_blank", rel: "noopener noreferrer", text: ui("watchStream")
      }));
    } else {
      if (live.last && live.last.title) {
        box.appendChild(el("p", { class: "status__meta", text: ui("lastStream") + ": " + live.last.title + (live.last.startedAt ? " · " + timeAgo(live.last.startedAt) : "") }));
      }
      box.appendChild(el("p", { class: "status__hint", text: ui("offlineHint") }));
      if (LIVE.telegramUrl) {
        box.appendChild(el("a", {
          class: "btn btn--ghost status__btn", href: LIVE.telegramUrl, target: "_blank", rel: "noopener noreferrer", text: ui("openAll")
        }));
      }
    }
    var stats = [];
    if (typeof live.followers === "number") stats.push(statItem(formatNum(live.followers), ui("followers")));
    if (live.tg && typeof live.tg.subscribers === "number") stats.push(statItem(formatNum(live.tg.subscribers), ui("tgSubs")));
    if (live.dc && typeof live.dc.members === "number") stats.push(statItem(formatNum(live.dc.members), ui("dcMembers")));
    if (stats.length) box.appendChild(el("ul", { class: "stats" }, stats));
  }

  function renderNews() {
    var sec = document.getElementById("news");
    var head = clear(document.getElementById("newsHead"));
    var list = clear(document.getElementById("newsList"));
    if (!sec || !head || !list) return;
    var posts = (live.tg && live.tg.posts) || [];
    if (!posts.length) { sec.hidden = true; return; }
    sec.hidden = false;
    // если на страницу пришли по ссылке …#news — доскроллить (раздел появляется асинхронно)
    if (!newsScrolled && window.location.hash === "#news") {
      newsScrolled = true;
      try { sec.scrollIntoView({ block: "start" }); } catch (e) { sec.scrollIntoView(); }
    }
    head.appendChild(el("h2", { class: "section__title", text: tr(NEWS.title, ui("newsTitle")) }));
    head.appendChild(el("p", { class: "section__sub", text: tr(NEWS.sub, "") }));
    if (LIVE.telegramUrl) {
      head.appendChild(el("a", {
        class: "section__link", href: LIVE.telegramUrl, target: "_blank", rel: "noopener noreferrer",
        text: tr(NEWS.moreLabel, ui("openAll")) + " ↗"
      }));
    }
    posts.slice(0, NEWS.count || 3).forEach(function (post) {
      var media = post.photo
        ? el("img", {
            class: "news__img", src: post.photo, alt: "", loading: "lazy", decoding: "async",
            onerror: function () { this.remove(); }
          })
        : null;
      list.appendChild(el("a", { class: "news", href: post.url, target: "_blank", rel: "noopener noreferrer" }, [
        media,
        el("div", { class: "news__body" }, [
          el("time", { class: "news__date", text: post.date ? formatDate(post.date) : "" }),
          el("p", { class: "news__text", text: shorten(post.text, 280) }),
          el("span", { class: "news__more", text: ui("newsMore") + " ↗" })
        ])
      ]));
    });
  }

  function tickTimer() {
    var t = document.getElementById("liveTimer");
    if (t && live.on && live.startedAt) t.textContent = durationText(live.startedAt);
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
    paintLive();
    renderNews();
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

    // живой статус: сразу при открытии, дальше раз в минуту
    refreshLive();
    var every = Math.max(30, Number(LIVE.refreshSeconds) || 60) * 1000;
    setInterval(refreshLive, every);
    setInterval(tickTimer, 20000);
    document.addEventListener("visibilitychange", refreshLive);

    if (CFG.demo) {
      // подсказка разработчику в консоли — не видна зрителям
      try { console.info("Timora: демо-режим включён. Заполните assets/js/config.js и поставьте demo: false."); } catch (err) {}
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
