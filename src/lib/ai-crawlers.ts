/**
 * Search / answer crawlers that must see the same HTML as Googlebot.
 * Training tokens (GPTBot, Google-Extended, ClaudeBot) are listed too so
 * robots.txt can allow them independently of live retrieval.
 */
export const AI_SEARCH_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "meta-externalagent",
  "Bytespider",
] as const;

/** Matches Google/Bing plus live AI fetchers such as ChatGPT-User (no "bot" token). */
export const AI_OR_SEARCH_CRAWLER_PATTERN =
  /bot|crawler|spider|crawling|google|bing|yahoo|chatgpt|claude|perplexity|anthropic|openai|gptbot|oai-search|bytespider|amazonbot|ccbot|applebot|facebookexternalhit|meta-externalagent/i;

export function isAiOrSearchCrawler(userAgent = ""): boolean {
  return AI_OR_SEARCH_CRAWLER_PATTERN.test(userAgent);
}

export const MARKDOWN_ALTERNATES: Record<string, string> = {
  "/": "/index.md",
  "/about": "/about.md",
  "/contact": "/contact.md",
  "/faq": "/faq.md",
  "/services": "/services.md",
  "/testing": "/testing.md",
};
