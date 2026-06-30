import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Result from '@app/pages/Result';

const OG_CDN = 'https://quizz-du-berger-og.cellar-c2.services.clever-cloud.com';
const API_BASE = import.meta.env.DEV ? 'http://localhost:5179' : 'https://api.quizz-du-berger.com';

export const Route = createFileRoute('/result/$userPseudo')({
  loader: ({ params }) => {
    // Server-side: trigger OG image generation (replaces the old server-app.js bot hack).
    if (typeof window === 'undefined') {
      fetch(`${API_BASE}/og/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo: params.userPseudo }),
      }).catch(() => {});
    }
    return {};
  },
  head: ({ params }) => {
    const pseudo = decodeURIComponent(params.userPseudo);
    const capitalized = pseudo.charAt(0).toUpperCase() + pseudo.slice(1);
    return seoHead({
      title: `Résultats de ${capitalized} | Le Quizz du Berger`,
      description: `Découvrez les affinités politiques de ${capitalized} pour la présidentielle 2027.`,
      canonicalPath: `/result/${pseudo}`,
      ogImage: `${OG_CDN}/og/${encodeURIComponent(pseudo)}.png`,
    });
  },
  component: Result,
});
