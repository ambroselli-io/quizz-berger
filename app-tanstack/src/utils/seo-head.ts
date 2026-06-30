/**
 * Builds the per-route head() payload (meta / links / scripts) for TanStack Start.
 * Centralizes the OG/Twitter/canonical boilerplate so route files only declare
 * title + description (+ optional image / JSON-LD). Deeper routes override the
 * defaults set in __root.tsx (TanStack dedupes meta by name/property/title).
 */

const BASE_URL = 'https://www.quizz-du-berger.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og_1200_630.png`;

type MetaTag = { title: string } | { name: string; content: string } | { property: string; content: string };

interface SeoInput {
  title: string;
  description?: string;
  /** Path (e.g. "/candidat/x") or absolute URL. Emits <link rel=canonical> + og:url. */
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  /** One or more JSON-LD objects rendered as <script type="application/ld+json">. */
  jsonLd?: object | object[];
}

export function canonicalUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path === '/' ? '' : path}`;
}

export function seoHead({ title, description, canonicalPath, ogImage, ogType = 'website', jsonLd }: SeoInput) {
  const canonical = canonicalPath ? canonicalUrl(canonicalPath) : undefined;
  const image = ogImage || DEFAULT_OG_IMAGE;

  const meta: MetaTag[] = [{ title }];
  if (description) meta.push({ name: 'description', content: description });
  meta.push({ property: 'og:type', content: ogType });
  meta.push({ property: 'og:title', content: title });
  if (description) meta.push({ property: 'og:description', content: description });
  meta.push({ property: 'og:image', content: image });
  if (canonical) meta.push({ property: 'og:url', content: canonical });
  meta.push({ name: 'twitter:card', content: 'summary_large_image' });
  meta.push({ name: 'twitter:title', content: title });
  if (description) meta.push({ name: 'twitter:description', content: description });
  meta.push({ name: 'twitter:image', content: image });

  const links = canonical ? [{ rel: 'canonical', href: canonical }] : [];
  const scripts = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((obj) => ({
        type: 'application/ld+json',
        children: JSON.stringify(obj),
      }))
    : [];

  return { meta, links, scripts };
}
