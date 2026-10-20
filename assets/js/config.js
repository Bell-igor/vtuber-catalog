/* ============================================================================
   TIMORA — КОНТЕНТ САЙТА
   ============================================================================
   Это ЕДИНСТВЕННЫЙ файл, который нужно править, чтобы наполнить сайт.
   Ничего не удаляйте целиком: просто меняйте текст между кавычками.
   Правила простые:
     • текст в кавычках "..." — то, что увидит зритель;
     • { ru: "...", en: "..." } — версия по-русски и по-английски.
       Если английский не нужен, всё равно оставьте en — можно скопировать
       русский текст. Пустую строку "" тоже можно.
     • если внутри текста нужна кавычка, ставьте перед ней обратный слэш: \"
     • после последнего элемента списка запятая не нужна, между элементами — нужна;
     • чтобы добавить арт: положите файл в assets/img/gallery/ и добавьте
       новый блок { ... } в список gallery (см. ниже, там есть образец).
   ============================================================================ */

window.SITE = {

  /* Пока true — вверху висит напоминание, что данные демонстрационные.
     Когда всё заполните своими данными, поставьте false. */
  demo: true,

  /* ---------------- Кто вы ---------------- */
  owner: {
    name: "Timora",
    // подпись под именем
    role: { ru: "VTuber · TimoraVoo", en: "VTuber · TimoraVoo" },
    // короткий слоган
    tagline: {
      ru: "Стримы, ивенты и общение с чатом",
      en: "Streams, events and chatting with you"
    },
    // пара предложений о себе (можно оставить пустым)
    about: {
      ru: "Добро пожаловать! Здесь собраны арты, референсы моей модели и люди, благодаря которым всё это существует.",
      en: "Welcome! Here you'll find art, references of my model and the people who made all of it possible."
    },
    // аватар подтягивается из Twitch автоматически (файл обновляет GitHub)
    avatar: "assets/img/avatar-twitch.webp",
    // баннер: её хэллоуинский арт; поверх него летят листья (bannerLeaves)
    banner: "assets/img/banner-halloween.webp",
    bannerLeaves: true,
    // если захочется вернуть видео поверх баннера — раскомментируйте строку:
    // bannerVideo: "assets/img/banner-loop.mp4",
    // если у видео есть звук — поставьте true, появится кнопка «звук вкл/выкл»
    bannerSound: false
  },

  /* ---------------- Ссылки на вас ----------------
     accent — цвет значка: yt | twitch | tg | x | discord | vk | boosty | tiktok | inst | site | fetta | donate
     icon   — значок: twitch | telegram | discord | gift | coin | play | site
     pinned — true: ссылка дополнительно закрепляется в шапке сайта и в подвале
     url: "#название" = заглушка, кнопка будет помечена как «демо».      */
  links: [
    { label: "Twitch",   url: "https://www.twitch.tv/timoravoo",            accent: "twitch",  icon: "twitch" },
    { label: "Telegram", url: "https://t.me/timora_tv",                     accent: "tg",      icon: "telegram" },
    { label: "Discord",  url: "https://discord.gg/zgbhEWNeCZ",              accent: "discord", icon: "discord" },
    { label: "Фетта",    url: "https://fetta.app/u/timora",                 accent: "fetta",   icon: "gift", pinned: true },
    { label: "Донат",    url: "https://www.donationalerts.com/r/timoravoo", accent: "donate",  icon: "coin", pinned: true }
    // Если появятся другие соцсети — добавьте строки по образцу выше:
    // { label: "YouTube", url: "https://youtube.com/@канал", accent: "yt", icon: "play" },
    // { label: "Boosty",  url: "https://boosty.to/ник",      accent: "boosty" }
  ],

  /* ---------------- Разделы галереи (кнопки-фильтры) ---------------- */
  kinds: {
    all:   { ru: "Всё",     en: "All" },
    clip:  { ru: "Клипы",   en: "Clips" },
    vod:   { ru: "Записи",  en: "VODs" },
    art:   { ru: "Арт",     en: "Art" },
    model: { ru: "Модель",  en: "Model" },
    photo: { ru: "Фото",    en: "Photo" }
  },

  /* ---------------- Модель на первом экране ----------------
     Готовая анимация модели (моргает и шевелится). Если убрать строку
     animation — соберётся простой вариант из слоёв ниже (тело, голова, кисть). */
  model: {
    animation: "assets/img/model-blink.webp",
    poster: "assets/img/model-blink-poster.webp",
    body: "assets/img/model-body.webp",
    head: "assets/img/model-head.webp",
    hand: "assets/img/model-hand.webp",
    full: "assets/img/model-full.webp",
    headPivot: [50.3, 26.6],   // шея
    handPivot: [30.6, 38.4],   // плечо руки, которая машет
    headAngle: 7,              // градус поворота головы (для варианта из слоёв)
    handAngle: 12,             // градус взмаха руки (для варианта из слоёв)
    alt: { ru: "Модель Timora", en: "Timora's model" }
  },

  /* ---------------- Арт и модель ----------------
     Здесь размещается арт по её модели. Пока список пуст — её арты ещё не
     присылали. Когда файлы появятся, положите их в assets/img/gallery/
     и добавьте блок по образцу из комментария ниже.                          */
  gallery: [
    {
      kind: "model",
      title: { ru: "Модель в полный рост", en: "Full-body model" },
      alt: {
        ru: "Модель Timora в полный рост: лиловое платье, круглые очки, наушники",
        en: "Timora's full-body model: lilac dress, round glasses, headphones"
      },
      thumb: "assets/img/model-card.webp",
      src: "assets/img/model-full.webp",
      w: 640, h: 1280
      // автора модели впишите, когда будет известен:
      // artist: { name: "Ник художника", url: "https://x.com/ник" }
    },
    {
      kind: "art",
      title: { ru: "Чиби-анимация", en: "Chibi animation" },
      alt: { ru: "Анимированный чиби-портрет Timora", en: "Animated chibi portrait of Timora" },
      thumb: "assets/img/art-chibi-thumb.webp",
      src: "assets/img/art-chibi.webp",
      w: 294, h: 320,
      contain: true      // картинка с прозрачным фоном — показываем её целиком
      // автора арта впишите, когда будет известен:
      // artist: { name: "Ник художника", url: "https://x.com/ник" }
    }

    // Другие арты добавляйте по образцу выше:
    // {
    //   kind: "art",                                  // art | model | photo
    //   title: { ru: "Арт от Кая", en: "Art by Kai" },
    //   alt: { ru: "Описание картинки — для незрячих и для поиска", en: "..." },
    //   thumb: "assets/img/gallery/art-kai-thumb.webp",
    //   src: "assets/img/gallery/art-kai.webp",
    //   w: 896, h: 1195,
    //   artist: { name: "Кай", url: "https://x.com/ник" }
    // }
  ],

  /* ---------------- Клипы и записи эфиров ----------------
     Подтягиваются с Twitch автоматически: GitHub обновляет их каждые 5 минут.
     Если у канала появятся записи эфиров, они встанут первыми.               */
  clips: {
    count: 6,
    title: { ru: "Модель, арт и эфиры", en: "Model, art & streams" },
    allLabel: { ru: "Все видео на Twitch", en: "All videos on Twitch" },
    allUrl: "https://www.twitch.tv/timoravoo/videos"
  },

  /* ---------------- Кредитсы ----------------
     carousel — карусель: стрелки по бокам листают слайды. У каждого слайда
     картинка и свои авторы (роль, имя, ник, ссылка).
     sections — обычные разделы-списки.                                     */
  credits: {
    carousel: [
      {
        kind: "model",
        title: { ru: "Модель в полный рост", en: "Full-body model" },
        image: "assets/img/model-full.webp",
        w: 640, h: 1280,
        alt: {
          ru: "Модель Timora в полный рост: лиловое платье, круглые очки, наушники",
          en: "Timora's full-body model: lilac dress, round glasses, headphones"
        },
        authors: [
          { role: { ru: "Арт модели", en: "Model art" }, name: "Имя художника", handle: "@artist", url: "#artist", placeholder: true },
          { role: { ru: "Риггинг (Live2D / 3D)", en: "Rigging (Live2D / 3D)" }, name: "Имя риггера", handle: "@rigger", url: "#rigger", placeholder: true }
        ]
      },
      {
        kind: "model",
        title: { ru: "Хэллоуин-модель", en: "Halloween model" },
        image: "assets/img/model-sheet.webp",
        w: 1280, h: 720,
        alt: {
          ru: "Лист модели: чиби-Тимора в белом костюме призрака, варианты глаз и эмоций",
          en: "Model sheet: chibi Timora in a white ghost outfit, eye and emotion variants"
        },
        authors: [
          { role: { ru: "Арт модели", en: "Model art" }, name: "Weritasse", handle: "@Weritasse", url: "https://blipsu.com/@Weritasse" },
          { role: { ru: "Риггинг", en: "Rigging" }, name: "Orin", note: { ru: "rig: Orin", en: "rig: Orin" } }
        ]
      },
      {
        kind: "art",
        title: { ru: "Хэллоуин", en: "Halloween" },
        image: "assets/img/gallery/art-halloween.webp",
        w: 800, h: 533,
        alt: { ru: "Чиби-Тимора сидит на скамейке в осеннем лесу среди тыкв и призраков", en: "Chibi Timora on a bench in an autumn forest with pumpkins and ghosts" },
        authors: [{ role: { ru: "Арт", en: "Art" }, name: "Sher", handle: "@SherryDebeste", url: "https://blipsu.com/@SherryDebeste" }]
      },
      {
        kind: "art",
        title: { ru: "Лунный дух", en: "Moon spirit" },
        image: "assets/img/gallery/art-moon.webp",
        w: 680, h: 800,
        alt: { ru: "Тимора-призрак парит на фоне полной луны с морковкой в руке", en: "Ghost Timora floats in front of the full moon holding a carrot" },
        authors: [{ role: { ru: "Арт", en: "Art" }, name: "Manunya", note: { ru: "подпись автора на арте", en: "artist's signature" } }]
      },
      {
        kind: "art",
        title: { ru: "Звонок", en: "The call" },
        image: "assets/img/gallery/art-call.webp",
        w: 800, h: 800,
        alt: { ru: "Экран телефона: перевёрнутое лицо Тиморы и кнопки принять и отклонить", en: "Phone screen: upside-down Timora face with call and decline buttons" },
        authors: [{ role: { ru: "Арт", en: "Art" }, name: "Weritasse", handle: "@Weritasse", url: "https://blipsu.com/@Weritasse" }]
      },
      {
        kind: "art",
        title: { ru: "Ритуал", en: "Ritual" },
        image: "assets/img/gallery/art-ritual.webp",
        w: 566, h: 800,
        alt: { ru: "Тимора в чёрной шапке и рваном свитере сидит со свечами и книгой", en: "Timora in a black beanie and ripped sweater sits with candles and a book" },
        authors: [{ role: { ru: "Арт", en: "Art" }, name: "Alex Bermuda", handle: "@alex__bermuda", url: "https://www.artstation.com/alex__bermuda" }]
      },
      {
        kind: "art",
        title: { ru: "Осень", en: "Autumn" },
        image: "assets/img/gallery/art-autumn.webp",
        w: 800, h: 800,
        alt: { ru: "Чиби-Тимора в красном шарфе сидит у дерева в осеннем лесу", en: "Chibi Timora in a red scarf sits by a tree in an autumn forest" },
        authors: [{ role: { ru: "Арт", en: "Art" }, name: "crystalLu", handle: "@crystalLuArt", url: "https://t.me/crystalLuArt" }]
      },
      {
        kind: "art",
        title: { ru: "Осенняя прогулка", en: "Autumn walk" },
        image: "assets/img/gallery/art-autumn-walk.webp",
        w: 600, h: 800,
        alt: { ru: "Чиби-Тимора в чёрной шапке и жёлтых ботинках рядом с белой лисой", en: "Chibi Timora in a black beanie and yellow boots next to a white fox" },
        authors: [{ role: { ru: "Арт", en: "Art" }, name: "Автор не указан", note: { ru: "уточняется", en: "to be confirmed" } }]
      },
      {
        kind: "art",
        title: { ru: "Мир!", en: "Peace!" },
        image: "assets/img/gallery/art-peace.webp",
        w: 800, h: 800,
        alt: { ru: "Чиби-Тимора в лиловой шапке показывает два пальца", en: "Chibi Timora in a lilac beanie making a peace sign" },
        authors: [{ role: { ru: "Арт", en: "Art" }, name: "ssenya195", handle: "@ssenya195", url: "https://blipsu.com/@ssenya195" }]
      },
      {
        kind: "art",
        title: { ru: "Скетч", en: "Sketch" },
        image: "assets/img/gallery/art-sketch.webp",
        w: 600, h: 800,
        alt: { ru: "Карандашный скетч Тиморы в шапке с зайчиком", en: "Pencil sketch of Timora in a beanie with a bunny pin" },
        authors: [{ role: { ru: "Арт", en: "Art" }, name: "Автор не указан", note: { ru: "уточняется", en: "to be confirmed" } }]
      },
      {
        kind: "art",
        title: { ru: "В ладони", en: "In the palm" },
        image: "assets/img/gallery/art-inhand.webp",
        w: 600, h: 800,
        alt: { ru: "Чиби-Тимора свернулась в ладони, в очках", en: "Chibi Timora curled up in a hand, wearing glasses" },
        authors: [{ role: { ru: "Арт", en: "Art" }, name: "Автор не указан", note: { ru: "уточняется", en: "to be confirmed" } }]
      }
    ],
    sections: [
      {
        id: "visual",
        title: { ru: "Оформление", en: "Visual assets" },
        items: [
          { role: { ru: "Логотип и emotes", en: "Logo & emotes" }, name: "Имя художника", handle: "@emotes", url: "#emotes", placeholder: true },
          { role: { ru: "Оверлеи, панели, экраны", en: "Overlays, panels, screens" }, name: "Имя дизайнера", handle: "@overlays", url: "#overlays", placeholder: true }
        ]
      },
      {
        id: "media",
        title: { ru: "Звук и видео", en: "Audio & video" },
        items: [
          { role: { ru: "Музыка и интро", en: "Music & intro" }, name: "Имя композитора", handle: "@music", url: "#music", placeholder: true },
          { role: { ru: "Монтаж видео", en: "Video editing" }, name: "Имя монтажёра", handle: "@editing", url: "#editing", placeholder: true }
        ]
      }
    ],
    // Отдельное спасибо — просто список имён (или { name, url })
    thanks: [
      { name: "Всем, кто поддерживает на стримах", url: "" }
    ]
  },

  /* ---------------- Живой статус стрима ----------------
     Файл status.json обновляет GitHub каждые 5 минут: идёт ли стрим, что за
     игра, когда начался, свежие анонсы из Telegram, подписчики и Discord.
     Здесь ничего менять не нужно, пока не изменились ники.               */
  live: {
    twitchLogin: "timoravoo",
    twitchUrl: "https://www.twitch.tv/timoravoo",
    telegramUrl: "https://t.me/timora_tv",
    discordUrl: "https://discord.gg/zgbhEWNeCZ",
    statusFile: "status.json",
    // быстрая проверка эфира прямо из браузера: если она недоступна,
    // сайт просто покажет данные из status.json — ничего не сломается
    fastCheck: "https://api.ivr.fi/v2/twitch/user?login=timoravoo",
    refreshSeconds: 60
  },

  /* ---------------- Анонсы из Telegram ---------------- */
  news: {
    title: { ru: "Анонсы и события", en: "News & events" },
    sub: {
      ru: "Последние посты из Telegram-канала: расписание стримов, события и всякое интересное.",
      en: "Latest posts from the Telegram channel: stream schedule, events and more."
    },
    count: 3,
    moreLabel: { ru: "Все анонсы в Telegram", en: "All news in Telegram" }
  },

  /* ---------------- Подвал ---------------- */
  footer: {
    note: {
      ru: "Все работы принадлежат их авторам. Если вы автор и хотите что-то изменить или убрать — напишите мне.",
      en: "All works belong to their authors. If you are an author and want something changed or removed, contact me."
    },
    // ссылка на зеркало сайта (если сделаете второе зеркало — впишите адрес)
    mirror: { label: { ru: "Зеркало сайта", en: "Site mirror" }, url: "" },
    contact: { label: { ru: "Написать в Telegram", en: "Message me on Telegram" }, url: "https://t.me/timora_tv" }
  }
};
