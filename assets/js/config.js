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
    avatar: "assets/img/avatar-twitch.png",
    // большая картинка справа на первом экране (обычно — арт модели в полный рост)
    hero: "assets/img/gallery/model-wings.webp"
  },

  /* ---------------- Ссылки на вас ----------------
     accent — цвет кнопки: yt | twitch | tg | x | discord | vk | boosty | tiktok | inst | site
     url: "#название" = заглушка, кнопка будет помечена как «демо».      */
  links: [
    { label: "Twitch",   url: "https://www.twitch.tv/timoravoo", accent: "twitch" },
    { label: "Telegram", url: "https://t.me/timora_tv",          accent: "tg" },
    { label: "Discord",  url: "https://discord.gg/zgbhEWNeCZ",   accent: "discord" }
    // Если появятся другие соцсети — добавьте строки по образцу выше:
    // { label: "YouTube", url: "https://youtube.com/@канал", accent: "yt" },
    // { label: "Boosty",  url: "https://boosty.to/ник",      accent: "boosty" },
    // { label: "X",       url: "https://x.com/ник",          accent: "x" }
  ],

  /* ---------------- Разделы галереи (кнопки-фильтры) ---------------- */
  kinds: {
    all:   { ru: "Всё",     en: "All" },
    model: { ru: "Модель",  en: "Model" },
    art:   { ru: "Арт",     en: "Art" },
    video: { ru: "Видео",   en: "Video" },
    photo: { ru: "Фото",    en: "Photo" }
  },

  /* ---------------- Галерея ----------------
     kind   — раздел из списка kinds (model / art / video / photo);
     thumb  — превью для сетки, src — большая картинка для просмотра;
     artist — имя автора и ссылка на его соцсеть;
     video  — если у элемента есть эта строка, карточка не открывает
              картинку, а ведёт на видео (YouTube и т.п.).                 */
  gallery: [
    {
      kind: "model",
      title: { ru: "Модель в полный рост", en: "Full-body model" },
      alt: { ru: "Крылатая модель в библиотеке с книгой и пером", en: "Winged model in a library with a book and a quill" },
      thumb: "assets/img/gallery/model-wings-thumb.webp",
      src: "assets/img/gallery/model-wings.webp",
      w: 896, h: 1195,
      artist: { name: "Имя художника", url: "#artist" },
      note: { ru: "Пример карточки: замените автора и файл", en: "Sample card: replace artist and file" }
    },
    {
      kind: "model",
      title: { ru: "Референс: крылья", en: "Reference: wings" },
      alt: { ru: "Модель в кресле, крылья раскрыты", en: "Model in an armchair with spread wings" },
      thumb: "assets/img/gallery/model-seated-thumb.webp",
      src: "assets/img/gallery/model-seated.webp",
      w: 896, h: 1195,
      artist: { name: "Имя художника", url: "#artist" }
    },
    {
      kind: "model",
      title: { ru: "Референс: основной костюм", en: "Reference: main outfit" },
      alt: { ru: "Модель в жилете с пером и книгой", en: "Model in a vest holding a quill and a book" },
      thumb: "assets/img/gallery/model-vest-thumb.webp",
      src: "assets/img/gallery/model-vest.webp",
      w: 896, h: 1195,
      artist: { name: "Имя художника", url: "#artist" }
    },
    {
      kind: "art",
      title: { ru: "Иллюстрация: рабочий кабинет", en: "Illustration: the study" },
      alt: { ru: "Иллюстрация с моделью в кабинете", en: "Illustration of the model in a study" },
      thumb: "assets/img/gallery/model-study-thumb.webp",
      src: "assets/img/gallery/model-study.webp",
      w: 896, h: 1195,
      artist: { name: "Имя художника", url: "#artist" }
    },
    {
      kind: "art",
      title: { ru: "Иллюстрация: светящийся глаз", en: "Illustration: glowing eye" },
      alt: { ru: "Портрет модели со светящимся глазом", en: "Portrait of the model with a glowing eye" },
      thumb: "assets/img/gallery/model-glow-thumb.webp",
      src: "assets/img/gallery/model-glow.webp",
      w: 896, h: 1195,
      artist: { name: "Имя художника", url: "#artist" }
    },
    {
      kind: "video",
      title: { ru: "Дебютный стрим", en: "Debut stream" },
      alt: { ru: "Превью видео", en: "Video thumbnail" },
      thumb: "assets/img/gallery/model-wings-thumb.webp",
      video: "#video",
      artist: { name: "Монтаж: имя", url: "#editor" }
    }
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
