import { createHash } from "node:crypto";

// Order matters: Gemini and the Gmail app must be tested before google.*.
const KNOWN_SOURCES: Array<[RegExp, string]> = [
  [/^com\.google\.android\.gm$/, "Gmail"],
  [/(^|\.)gemini\.google\.com$/, "Gemini"],
  [/(^|\.)google\.[a-z.]+$|^com\.google\.android\.googlequicksearchbox$/, "Google"],
  [/(^|\.)bing\.com$/, "Bing"],
  [/(^|\.)ecosia\.org$/, "Ecosia"],
  [/(^|\.)duckduckgo\.com$/, "DuckDuckGo"],
  [/(^|\.)qwant\.com$/, "Qwant"],
  [/(^|\.)yahoo\.[a-z.]+$/, "Yahoo"],
  [/(^|\.)(chatgpt\.com|openai\.com)$/, "ChatGPT"],
  [/(^|\.)perplexity\.ai$/, "Perplexity"],
  [/(^|\.)claude\.ai$/, "Claude"],
  [/(^|\.)mistral\.ai$/, "Mistral"],
  [/(^|\.)copilot\.microsoft\.com$/, "Copilot"],
  [/(^|\.)instagram\.com$|^ig$/, "Instagram"],
  [/(^|\.)facebook\.com$|^fb\.me$|^fb$/, "Facebook"],
  [/(^|\.)threads\.(net|com)$/, "Threads"],
  [/(^|\.)(twitter\.com|x\.com)$|^t\.co$/, "X"],
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, "LinkedIn"],
  [/(^|\.)reddit\.com$/, "Reddit"],
  [/(^|\.)youtube\.com$|^youtu\.be$/, "YouTube"],
  [/(^|\.)tiktok\.com$/, "TikTok"],
  [/(^|\.)bsky\.app$/, "Bluesky"],
  [/(^|\.)whatsapp\.com$/, "WhatsApp"],
  [/^org\.telegram\.messenger$|(^|\.)t\.me$/, "Telegram"],
];

const OWN_HOST = /(^|\.)quizz-du-berger\.com$|^localhost$/;

const nameOf = (hostOrTag: string) => {
  const value = hostOrTag.toLowerCase().replace(/^www\./, "");
  for (const [pattern, name] of KNOWN_SOURCES) if (pattern.test(value)) return name;
  return value;
};

const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
};

/** Referrer kept for the visit: null when absent, unparsable or from the site itself. */
export const externalReferrer = (referrer: unknown): string | null => {
  if (typeof referrer !== "string" || !referrer) return null;
  const host = hostOf(referrer);
  if (!host || OWN_HOST.test(host)) return null;
  return referrer.slice(0, 500);
};

/** "Google", "Instagram", "hardware.fr"… from the referrer, else from utm_source / ref; null = direct. */
export const sourceOf = (referrer: string | null, utmSource: string | null): string | null => {
  const host = referrer ? hostOf(referrer) : null;
  if (host) return nameOf(host);
  if (utmSource) return nameOf(utmSource).slice(0, 100);
  return null;
};

export const deviceOf = (userAgent: string) => {
  if (/iPad|Tablet/i.test(userAgent)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(userAgent)) return "mobile";
  return "desktop";
};

/** The Expo app sends X-Client-Platform; builds released before it fall back on the native HTTP stack's user agent. */
export const platformOf = (clientPlatform: string | undefined, userAgent: string) => {
  if (clientPlatform === "ios" || clientPlatform === "android") return clientPlatform;
  if (/^okhttp\//i.test(userAgent)) return "android";
  if (/CFNetwork|Darwin\//.test(userAgent) && !/Mozilla/.test(userAgent)) return "ios";
  return `web-${deviceOf(userAgent)}`;
};

export const looksLikeBot = (userAgent: string) =>
  !userAgent || /bot|crawl|spider|slurp|preview|headless|lighthouse|python|curl|wget|httpclient|fetch/i.test(userAgent);

/** Same visitor on the same day = same id. The day in the salt makes it impossible to link two days together. */
export const visitorIdOf = (secret: string, day: string, ip: string, userAgent: string) =>
  createHash("sha256").update(`${secret}|${day}|${ip}|${userAgent}`).digest("hex").slice(0, 16);
