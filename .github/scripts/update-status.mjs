#!/usr/bin/env node
/**
 * Собирает status.json для сайта Timora:
 *   • идёт ли стрим на Twitch (название, игра, когда начался);
 *   • последние анонсы из Telegram-канала и число подписчиков;
 *   • название и число участников Discord-сервера.
 * Дополнительно обновляет аватар с Twitch (assets/img/avatar-twitch.png).
 *
 * Запускается GitHub Actions каждые 5 минут, никаких ключей не требует.
 * Если добавить секреты TWITCH_CLIENT_ID и TWITCH_CLIENT_SECRET, данные
 * берутся из официального API Twitch (иначе — из открытых источников).
 *
 * Локальный запуск:  node .github/scripts/update-status.mjs
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const TWITCH_LOGIN = process.env.TWITCH_LOGIN || "timoravoo";
const TG_CHANNEL = process.env.TG_CHANNEL || "timora_tv";
const DISCORD_INVITE = process.env.DISCORD_INVITE || "zgbhEWNeCZ";
const NEWS_COUNT = Number(process.env.NEWS_COUNT || 3);
const NEWS_TEXT_LIMIT = 500;
const PUBLIC_TWITCH_CLIENT_ID = "kimne78kx3ncx6brgo4mv6wki5h1ko";

const ROOT = process.cwd();
const OUT_JSON = path.join(ROOT, "status.json");
const AVATAR_FILE = path.join(ROOT, "assets", "img", "avatar-twitch.png");
const VOD_COUNT = Number(process.env.VOD_COUNT || 6);

const UA = { "User-Agent": "timora-site-status/1.0 (+https://github.com/Bell-igor/vtuber-catalog)" };

async function getJSON(url, opts = {}) {
  const res = await fetch(url, { ...opts, headers: { ...UA, ...(opts.headers || {}) } });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json();
}
async function getText(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}
async function attempt(label, fn) {
  try {
    const value = await fn();
    if (value) console.log(`✓ ${label}`);
    else console.log(`… ${label}: источник не дал данных`);
    return value;
  } catch (err) {
    console.log(`✗ ${label}: ${err.message}`);
    return null;
  }
}

/* ------------------------------- Twitch ---------------------------------- */
async function twitchViaHelix() {
  const id = process.env.TWITCH_CLIENT_ID;
  const secret = process.env.TWITCH_CLIENT_SECRET;
  if (!id || !secret) return null;
  const token = await getJSON(
    `https://id.twitch.tv/oauth2/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
    { method: "POST" }
  );
  const headers = { "Client-Id": id, Authorization: `Bearer ${token.access_token}` };
  const stream = (await getJSON(`https://api.twitch.tv/helix/streams?user_login=${TWITCH_LOGIN}`, { headers })).data?.[0];
  const user = (await getJSON(`https://api.twitch.tv/helix/users?login=${TWITCH_LOGIN}`, { headers })).data?.[0];
  return {
    login: TWITCH_LOGIN,
    displayName: user?.display_name || TWITCH_LOGIN,
    live: Boolean(stream),
    title: stream?.title || "",
    game: stream?.game_name || "",
    startedAt: stream?.started_at || null,
    avatar: user?.profile_image_url || null,
    followers: null,
    lastBroadcast: null
  };
}

async function twitchViaIvr() {
  const data = await getJSON(`https://api.ivr.fi/v2/twitch/user?login=${TWITCH_LOGIN}`);
  const u = Array.isArray(data) ? data[0] : data;
  if (!u || typeof u.live === "undefined" && typeof u.stream === "undefined") {
    throw new Error("неожиданный ответ");
  }
  const s = u.stream;
  return {
    login: u.login || TWITCH_LOGIN,
    displayName: u.displayName || TWITCH_LOGIN,
    live: Boolean(s),
    title: s?.title || "",
    game: s?.game?.name || "",
    startedAt: s?.createdAt || null,
    avatar: u.logo || null,
    banner: u.banner || null,
    followers: typeof u.followers === "number" ? u.followers : null,
    lastBroadcast: u.lastBroadcast
      ? { title: u.lastBroadcast.title || "", startedAt: u.lastBroadcast.startedAt || null }
      : null
  };
}

async function twitchViaGql() {
  const body = {
    query:
      `query{user(login:"${TWITCH_LOGIN}"){displayName followers{totalCount}` +
      `profileImageURL(width:300) stream{id title createdAt viewersCount game{name}}` +
      `lastBroadcast{title startedAt}}}`
  };
  const data = await getJSON("https://gql.twitch.tv/gql", {
    method: "POST",
    headers: { "Client-Id": PUBLIC_TWITCH_CLIENT_ID, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const u = data?.data?.user;
  if (!u) throw new Error("нет данных о канале");
  const s = u.stream;
  return {
    login: TWITCH_LOGIN,
    displayName: u.displayName || TWITCH_LOGIN,
    live: Boolean(s),
    title: s?.title || "",
    game: s?.game?.name || "",
    startedAt: s?.createdAt || null,
    avatar: u.profileImageURL || null,
    followers: u.followers?.totalCount ?? null,
    lastBroadcast: u.lastBroadcast
      ? { title: u.lastBroadcast.title || "", startedAt: u.lastBroadcast.startedAt || null }
      : null
  };
}

async function twitchInfo() {
  for (const source of [twitchViaHelix, twitchViaIvr, twitchViaGql]) {
    const result = await attempt(`Twitch (${source.name})`, source);
    if (result) return result;
  }
  return null;
}

/* ---------------------- последние эфиры и клипы --------------------------- */
async function twitchVideos() {
  const body = {
    query:
      `query{user(login:"${TWITCH_LOGIN}"){videos(first:${VOD_COUNT},type:ARCHIVE){` +
      `edges{node{id title createdAt lengthSeconds viewCount previewThumbnailURL url}}}}}`
  };
  const data = await getJSON("https://gql.twitch.tv/gql", {
    method: "POST",
    headers: { "Client-Id": PUBLIC_TWITCH_CLIENT_ID, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const edges = data?.data?.user?.videos?.edges || [];
  return edges
    .map((e) => e.node)
    .filter(Boolean)
    .map((v) => ({
      id: v.id,
      kind: "vod",
      title: v.title || "",
      date: v.createdAt || null,
      seconds: typeof v.lengthSeconds === "number" ? v.lengthSeconds : null,
      views: typeof v.viewCount === "number" ? v.viewCount : null,
      thumb: v.previewThumbnailURL || null,
      url: v.url || `https://www.twitch.tv/videos/${v.id}`
    }));
}

async function twitchClips() {
  const body = {
    query:
      `query{user(login:"${TWITCH_LOGIN}"){clips(first:${VOD_COUNT}){` +
      `edges{node{id title durationSeconds createdAt thumbnailURL viewCount url}}}}}`
  };
  const data = await getJSON("https://gql.twitch.tv/gql", {
    method: "POST",
    headers: { "Client-Id": PUBLIC_TWITCH_CLIENT_ID, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const edges = data?.data?.user?.clips?.edges || [];
  return edges
    .map((e) => e.node)
    .filter(Boolean)
    .map((c) => ({
      id: c.id,
      kind: "clip",
      title: c.title || "",
      date: c.createdAt || null,
      seconds: typeof c.durationSeconds === "number" ? c.durationSeconds : null,
      views: typeof c.viewCount === "number" ? c.viewCount : null,
      thumb: c.thumbnailURL || null,
      url: c.url || null
    }));
}

/* ------------------------------ Telegram --------------------------------- */
function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»");
}
function htmlToText(html) {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|blockquote)>/gi, "\n")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/[ \t\u00a0]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// служебные сообщения канала («pinned a photo», «changed the channel photo» и т.п.)
const SERVICE_TEXT = /(pinned a|pinned the|joined telegram|left telegram|changed the (channel|group)|deleted (a|this)|invited|created the (channel|group)|channel photo|pinned message)/i;

function cutAtWord(text, limit) {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const space = cut.lastIndexOf(" ");
  return (space > limit * 0.6 ? cut.slice(0, space) : cut).trim() + "…";
}

async function telegramInfo() {
  const html = await getText(`https://t.me/s/${TG_CHANNEL}`);
  const subsMatch = html.match(/([\d\s\u00a0]+)\s*subscribers?/i);
  const subscribers = subsMatch ? Number(subsMatch[1].replace(/[^\d]/g, "")) : null;

  const chunks = html.split("tgme_widget_message_wrap").slice(1);
  const posts = [];
  for (const chunk of chunks) {
    const postRef = chunk.match(/data-post="([^"]+)"/);
    if (!postRef) continue;
    const [channel, id] = postRef[1].split("/");
    const when = chunk.match(/<time[^>]*datetime="([^"]+)"/);
    // только настоящие фото постов (telesco.pe), без эмодзи-картинок
    let photo = chunk.match(/background-image:url\('(https?:\/\/[^']*telesco\.pe[^']+)'\)/);
    if (!photo) photo = chunk.match(/<img[^>]+src="(https?:\/\/[^"]*telesco\.pe[^"]+)"/i);
    const textHtml = chunk.match(/class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    const text = textHtml ? htmlToText(textHtml[1]) : "";
    if (SERVICE_TEXT.test(text)) continue; // «pinned a photo» и прочая служебная строка
    if (!text && !photo) continue;
    posts.push({
      id: Number(id) || null,
      url: `https://t.me/${channel}/${id}`,
      date: when ? when[1] : null,
      text: cutAtWord(text, NEWS_TEXT_LIMIT),
      photo: photo ? photo[1] : null
    });
  }
  posts.sort((a, b) => (a.id || 0) - (b.id || 0));
  const latest = posts.slice(-NEWS_COUNT).reverse();
  if (!latest.length) throw new Error("посты не найдены (канал закрыт для предпросмотра?)");
  return { channel: TG_CHANNEL, subscribers, posts: latest };
}

/* ------------------------------- Discord --------------------------------- */
async function discordInfo() {
  const invite = await getJSON(
    `https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true&with_expiration=false`
  );
  const guild = invite.guild || {};
  return {
    name: guild.name || null,
    members: invite.approximate_member_count ?? null,
    icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128` : null,
    invite: `https://discord.gg/${DISCORD_INVITE}`
  };
}

/* --------------------------- аватар и баннер ------------------------------ */
async function downloadIfChanged(url, file, label, shrink) {
  const target = shrink ? url.replace(/-(\d+)x(\d+)\.(png|jpe?g)$/i, `-${shrink}.$3`) : url;
  const res = await fetch(target, { headers: UA });
  if (!res.ok) throw new Error(`${label} → HTTP ${res.status}`);
  const fresh = Buffer.from(await res.arrayBuffer());
  const current = existsSync(file) ? await readFile(file) : null;
  if (current && current.equals(fresh)) {
    console.log(`= ${label} без изменений`);
    return true;
  }
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, fresh);
  console.log(`✓ ${label} обновлён`);
  return true;
}

/* --------------------------------- сбор ---------------------------------- */
let previous = {};
try {
  previous = JSON.parse(await readFile(OUT_JSON, "utf8"));
} catch {
  previous = {};
}

const [twitch, telegram, discord, videos, clips] = await Promise.all([
  attempt("статус Twitch", twitchInfo),
  attempt("Telegram-анонсы", telegramInfo),
  attempt("Discord-сервер", discordInfo),
  attempt("записи эфиров (VOD)", twitchVideos),
  attempt("клипы", twitchClips)
]);

const status = {
  twitch: twitch || previous.twitch || null,
  telegram: telegram || previous.telegram || null,
  discord: discord || previous.discord || null
};

if (status.twitch) {
  status.twitch.videos = videos || status.twitch.videos || [];
  status.twitch.clips = clips || status.twitch.clips || [];
  if (twitch?.avatar) await attempt("аватар Twitch", () => downloadIfChanged(twitch.avatar, AVATAR_FILE, "аватар", "300x300"));
  if (twitch?.avatar) await attempt("аватар Twitch", () => downloadIfChanged(twitch.avatar, AVATAR_FILE, "аватар"));
  delete status.twitch.avatar; // адреса картинок в файле не нужны
  delete status.twitch.banner;
}

await writeFile(OUT_JSON, JSON.stringify(status, null, 2) + "\n", "utf8");

console.log("—".repeat(40));
console.log(`эфир: ${status.twitch?.live ? "ДА" : "нет"}${status.twitch?.live ? ` — ${status.twitch.title}` : ""}`);
console.log(`записей эфиров: ${status.twitch?.videos?.length ?? 0}, клипов: ${status.twitch?.clips?.length ?? 0}`);
console.log(`записей эфиров: ${status.twitch?.videos?.length ?? 0}`);
console.log(`анонсов: ${status.telegram?.posts?.length ?? 0}, подписчиков в Telegram: ${status.telegram?.subscribers ?? "?"}`);
console.log(`Discord: ${status.discord?.name ?? "?"} (${status.discord?.members ?? "?"} участников)`);
console.log("status.json записан");
