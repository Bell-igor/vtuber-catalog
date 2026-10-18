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
      ru: "Стримы, чтение книг и общение с чатом",
      en: "Streams, book reading and chatting with you"
    },
    // пара предложений о себе (можно оставить пустым)
    about: {
      ru: "Добро пожаловать! Здесь собраны арт, референсы моей модели и люди, благодаря которым всё это существует.",
      en: "Welcome! Here you'll find art, references of my model and the people who made all of it possible."
    },
    // аватар подтягивается из Twitch автоматически (файл обновляет GitHub)
    avatar: "assets/img/avatar-twitch.webp",
    // баннер: кадр из её заставки, поверх него играет видео-петля (бесшовная)
    banner: "assets/img/banner-zastavka.webp",
    bannerVideo: "assets/img/banner-loop.mp4",
    // если у видео появится звук — поставьте true, и в углу баннера
    // появится кнопка «включить/выключить звук»
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
     Три слоя одной картинки: тело, голова и кисть. Голова поворачивается
     влево-вправо, кисть машет. Точки вращения — в процентах от картинки:
     шея и центр кисти. Если модель заменят, новые проценты смотрите
     в инструменте tools/build-model.py.                                     */
  model: {
    // готовая анимация: она поднимает руку и машет. Петля сходится сама,
    // поэтому «обрыва» нет. Если убрать эту строку — соберётся из слоёв ниже.
    animation: "assets/img/model-idle.webp",
    poster: "assets/img/model-idle-poster.webp",
    body: "assets/img/model-body.webp",
    head: "assets/img/model-head.webp",
    hand: "assets/img/model-hand.webp",
    full: "assets/img/model-full.webp",
    headPivot: [50.3, 26.6],   // шея
    handPivot: [30.6, 38.4],   // плечо руки, которая машет
    headAngle: 7,              // градус поворота головы (для варианта из слоёв)
    handAngle: 12,             // градус взмаха руки (для варианта из слоёв)
    alt: { ru: "Модель Timora в полный рост", en: "Timora's full-body model" }
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
    },

    /* --- арты по персонажу (авторы — в кредитсах ниже) --- */
    {
      kind: "art",
      title: { ru: "Хэллоуин", en: "Halloween" },
      alt: { ru: "Чиби-Тимора сидит на скамейке в осеннем лесу среди тыкв и призраков", en: "Chibi Timora on a bench in an autumn forest with pumpkins and ghosts" },
      thumb: "assets/img/gallery/art-halloween-thumb.webp",
      src: "assets/img/gallery/art-halloween.webp",
      w: 1200, h: 800,
      artist: { name: "Sher", url: "https://blipsu.com/@SherryDebeste" }
    },
    {
      kind: "art",
      title: { ru: "Лунный дух", en: "Moon spirit" },
      alt: { ru: "Тимора-призрак парит на фоне полной луны с морковкой в руке", en: "Ghost Timora floats in front of the full moon holding a carrot" },
      thumb: "assets/img/gallery/art-moon-thumb.webp",
      src: "assets/img/gallery/art-moon.webp",
      w: 1021, h: 1200,
      artist: { name: "Manunya" }
    },
    {
      kind: "art",
      title: { ru: "Звонок", en: "The call" },
      alt: { ru: "Экран телефона: перевёрнутое лицо Тиморы и кнопки принять и отклонить", en: "Phone screen: upside-down Timora face with call and decline buttons" },
      thumb: "assets/img/gallery/art-call-thumb.webp",
      src: "assets/img/gallery/art-call.webp",
      w: 1200, h: 1200,
      artist: { name: "Weritasse", url: "https://blipsu.com/@Weritasse" }
    },
    {
      kind: "art",
      title: { ru: "Ритуал", en: "Ritual" },
      alt: { ru: "Тимора в чёрной шапке и рваном свитере сидит со свечами и книгой", en: "Timora in a black beanie and ripped sweater sits with candles and a book" },
      thumb: "assets/img/gallery/art-ritual-thumb.webp",
      src: "assets/img/gallery/art-ritual.webp",
      w: 849, h: 1200,
      artist: { name: "Alex Bermuda", url: "https://www.artstation.com/alex__bermuda" }
    },
    {
      kind: "art",
      title: { ru: "Осень", en: "Autumn" },
      alt: { ru: "Чиби-Тимора в красном шарфе сидит у дерева в осеннем лесу", en: "Chibi Timora in a red scarf sits by a tree in an autumn forest" },
      thumb: "assets/img/gallery/art-autumn-thumb.webp",
      src: "assets/img/gallery/art-autumn.webp",
      w: 1200, h: 1200,
      artist: { name: "crystalLu", url: "https://t.me/crystalLuArt" }
    },
    {
      kind: "art",
      title: { ru: "Осенняя прогулка", en: "Autumn walk" },
      alt: { ru: "Чиби-Тимора в чёрной шапке и жёлтых ботинках рядом с белой лисой", en: "Chibi Timora in a black beanie and yellow boots next to a white fox" },
      thumb: "assets/img/gallery/art-autumn-walk-thumb.webp",
      src: "assets/img/gallery/art-autumn-walk.webp",
      w: 900, h: 1200,
      artist: { name: "Автор не указан", url: "#unknown" }
    },
    {
      kind: "art",
      title: { ru: "Мир!", en: "Peace!" },
      alt: { ru: "Чиби-Тимора в лиловой шапке показывает два пальца", en: "Chibi Timora in a lilac beanie making a peace sign" },
      thumb: "assets/img/gallery/art-peace-thumb.webp",
      src: "assets/img/gallery/art-peace.webp",
      w: 1200, h: 1200,
      artist: { name: "ssenya195", url: "https://blipsu.com/@ssenya195" }
    },
    {
      kind: "art",
      title: { ru: "Скетч", en: "Sketch" },
      alt: { ru: "Карандашный скетч Тиморы в шапке с зайчиком", en: "Pencil sketch of Timora in a beanie with a bunny pin" },
      thumb: "assets/img/gallery/art-sketch-thumb.webp",
      src: "assets/img/gallery/art-sketch.webp",
      w: 900, h: 1200,
      artist: { name: "Автор не указан", url: "#unknown" }
    },
    {
      kind: "art",
      title: { ru: "В ладони", en: "In the palm" },
      alt: { ru: "Чиби-Тимора свернулась в ладони, в очках", en: "Chibi Timora curled up in a hand, wearing glasses" },
      thumb: "assets/img/gallery/art-inhand-thumb.webp",
      src: "assets/img/gallery/art-inhand.webp",
      w: 900, h: 1200,
      artist: { name: "Автор не указан", url: "#unknown" }
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

  /* ---------------- Модели (карусель в кредитсах) ----------------
     Каждая модель — отдельный слайд: картинка + таблица авторов.
     Добавить вторую модель: скопируйте блок { ... } и поменяйте данные. */
  models: [
    {
      name: { ru: "Основная модель", en: "Main model" },
      image: "assets/img/model-full.webp",
      alt: {
        ru: "Модель Timora в полный рост: лиловое платье, круглые очки, наушники",
        en: "Timora's full-body model: lilac dress, round glasses, headphones"
      },
      w: 640, h: 1280,
      authors: [
        { role: { ru: "Дизайн и арт модели", en: "Model design & art" }, name: "Имя художника", handle: "@artist", url: "#artist" },
        { role: { ru: "Риггинг (Live2D / 3D)", en: "Rigging (Live2D / 3D)" }, name: "Имя риггера", handle: "@rigger", url: "#rigger" }
      ]
    }
    // {
    //   name: { ru: "Вторая модель", en: "Second model" },
    //   image: "assets/img/model-2.webp",
    //   alt: { ru: "Вторая модель Timora", en: "Timora's second model" },
    //   w: 640, h: 1280,
    //   authors: [
    //     { role: { ru: "Арт", en: "Art" }, name: "Ник", handle: "@nick", url: "https://x.com/ник" }
    //   ]
    // }
  ],

  /* ---------------- Кредитсы ----------------
     Добавляйте блоки { ... } внутрь items. Поля:
       role  — что человек сделал; name — имя/ник; url — ссылка на соцсеть;
       handle — подпись ссылки (необязательно);
       note  — примечание (необязательно).                              */
  credits: {
    sections: [
      {
        id: "model",
        model: true,        // сюда же подставляется фигурка модели со стрелками по бокам
        title: { ru: "Модель и дизайн персонажа", en: "Model & character design" },
        items: [
          {
            role: { ru: "Дизайн и арт модели", en: "Model design & art" },
            name: "Имя художника",
            handle: "@artist",
            url: "#artist",
            placeholder: true
          },
          {
            role: { ru: "Риггинг (Live2D / 3D)", en: "Rigging (Live2D / 3D)" },
            name: "Имя риггера",
            handle: "@rigger",
            url: "#rigger",
            placeholder: true
          }
        ]
      },
      {
        id: "visual",
        title: { ru: "Оформление", en: "Visual assets" },
        items: [
          {
            role: { ru: "Логотип и emotes", en: "Logo & emotes" },
            name: "Имя художника",
            handle: "@emotes",
            url: "#emotes",
            placeholder: true
          },
          {
            role: { ru: "Оверлеи, панели, экраны", en: "Overlays, panels, screens" },
            name: "Имя дизайнера",
            handle: "@overlays",
            url: "#overlays",
            placeholder: true
          }
        ]
      },
      {
        id: "media",
        title: { ru: "Звук и видео", en: "Audio & video" },
        items: [
          {
            role: { ru: "Музыка и интро", en: "Music & intro" },
            name: "Имя композитора",
            handle: "@music",
            url: "#music",
            placeholder: true
          },
          {
            role: { ru: "Монтаж видео", en: "Video editing" },
            name: "Имя монтажёра",
            handle: "@editing",
            url: "#editing",
            placeholder: true
          }
        ]
      },
      /* --- арты по персонажу: название работы и автор со ссылкой ---
         img — превью слева; note — название работы.                     */
      {
        id: "art",
        title: { ru: "Арты и иллюстрации", en: "Art & illustrations" },
        items: [
          {
            role: { ru: "Арт", en: "Art" },
            name: "Sher",
            handle: "@SherryDebeste",
            url: "https://blipsu.com/@SherryDebeste",
            note: { ru: "Хэллоуин", en: "Halloween" },
            img: "assets/img/gallery/art-halloween-thumb.webp"
          },
          {
            role: { ru: "Арт", en: "Art" },
            name: "Manunya",
            note: { ru: "Лунный дух (подпись автора на арте)", en: "Moon spirit (artist's signature)" },
            img: "assets/img/gallery/art-moon-thumb.webp"
          },
          {
            role: { ru: "Арт", en: "Art" },
            name: "Weritasse",
            handle: "@Weritasse",
            url: "https://blipsu.com/@Weritasse",
            note: { ru: "Звонок", en: "The call" },
            img: "assets/img/gallery/art-call-thumb.webp"
          },
          {
            role: { ru: "Арт", en: "Art" },
            name: "Alex Bermuda",
            handle: "@alex__bermuda",
            url: "https://www.artstation.com/alex__bermuda",
            note: { ru: "Ритуал", en: "Ritual" },
            img: "assets/img/gallery/art-ritual-thumb.webp"
          },
          {
            role: { ru: "Арт", en: "Art" },
            name: "crystalLu",
            handle: "@crystalLuArt",
            url: "https://t.me/crystalLuArt",
            note: { ru: "Осень", en: "Autumn" },
            img: "assets/img/gallery/art-autumn-thumb.webp"
          },
          {
            role: { ru: "Арт", en: "Art" },
            name: "ssenya195",
            handle: "@ssenya195",
            url: "https://blipsu.com/@ssenya195",
            note: { ru: "Мир!", en: "Peace!" },
            img: "assets/img/gallery/art-peace-thumb.webp"
          },
          {
            role: { ru: "Арт", en: "Art" },
            name: "Автор не указан",
            note: { ru: "Осенняя прогулка", en: "Autumn walk" },
            img: "assets/img/gallery/art-autumn-walk-thumb.webp"
          },
          {
            role: { ru: "Арт", en: "Art" },
            name: "Автор не указан",
            note: { ru: "Скетч", en: "Sketch" },
            img: "assets/img/gallery/art-sketch-thumb.webp"
          },
          {
            role: { ru: "Арт", en: "Art" },
            name: "Автор не указан",
            note: { ru: "В ладони", en: "In the palm" },
            img: "assets/img/gallery/art-inhand-thumb.webp"
          }
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
