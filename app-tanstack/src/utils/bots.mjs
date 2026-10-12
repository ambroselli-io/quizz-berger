// Plain JS: imported by server.mjs, which runs without a build step.
// First match wins, so the specific user-agents come before the generic fallback.
// - ai-answer: an AI assistant fetching the page to answer a user right now
// - indexing: a search engine (classic or AI) building its index
// - training: a crawler collecting pages to train a model
// - preview: a social network or messaging app building a link preview
const BOTS = [
  ['ChatGPT-User', 'ai-answer'],
  ['Claude-User', 'ai-answer'],
  ['Perplexity-User', 'ai-answer'],
  ['MistralAI-User', 'ai-answer'],
  ['DuckAssistBot', 'ai-answer'],
  ['Meta-ExternalFetcher', 'ai-answer'],
  ['Google-NotebookLM', 'ai-answer'],
  ['Gemini-Deep-Research', 'ai-answer'],
  ['OAI-SearchBot', 'indexing'],
  ['Claude-SearchBot', 'indexing'],
  ['PerplexityBot', 'indexing'],
  ['Googlebot', 'indexing'],
  ['Google-InspectionTool', 'indexing'],
  ['bingbot', 'indexing'],
  ['Applebot', 'indexing'],
  ['DuckDuckBot', 'indexing'],
  ['YandexBot', 'indexing'],
  ['Baiduspider', 'indexing'],
  ['Qwantbot', 'indexing'],
  ['SeznamBot', 'indexing'],
  ['MojeekBot', 'indexing'],
  ['Bravebot', 'indexing'],
  ['YouBot', 'indexing'],
  ['PetalBot', 'indexing'],
  ['GPTBot', 'training'],
  ['ClaudeBot', 'training'],
  ['anthropic-ai', 'training'],
  ['CCBot', 'training'],
  ['Bytespider', 'training'],
  ['Meta-ExternalAgent', 'training'],
  ['Amazonbot', 'training'],
  ['cohere-ai', 'training'],
  ['Diffbot', 'training'],
  ['AI2Bot', 'training'],
  ['Timpibot', 'training'],
  ['facebookexternalhit', 'preview'],
  ['Twitterbot', 'preview'],
  ['LinkedInBot', 'preview'],
  ['Slackbot', 'preview'],
  ['WhatsApp', 'preview'],
  ['Discordbot', 'preview'],
  ['TelegramBot', 'preview'],
  ['Pinterestbot', 'preview'],
  ['redditbot', 'preview'],
  ['Bluesky', 'preview'],
  ['AhrefsBot', 'other'],
  ['SemrushBot', 'other'],
  ['MJ12bot', 'other'],
  ['DotBot', 'other'],
  ['DataForSeoBot', 'other'],
].map(([name, category]) => ({ name, category, lower: name.toLowerCase() }));

/**
 * @param {string | undefined} userAgent
 * @returns {{ name: string, category: string } | null}
 */
export function classifyBot(userAgent) {
  if (!userAgent) return null;
  const lower = userAgent.toLowerCase();
  const bot = BOTS.find((b) => lower.includes(b.lower));
  if (bot) return { name: bot.name, category: bot.category };
  if (/bot\b|crawler|spider/i.test(userAgent)) return { name: 'Autre robot', category: 'other' };
  return null;
}
