import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import QuiSommesNous from '@app/pages/QuiSommesNous';

export const Route = createFileRoute('/qui-sommes-nous')({
  head: () =>
    seoHead({
      title: 'Qui sommes-nous ? | Le Quizz du Berger',
      description:
        "Découvrez l'équipe derrière le Quizz du Berger : un projet open-source pour encourager la réflexion politique.",
      canonicalPath: '/qui-sommes-nous',
    }),
  component: QuiSommesNous,
});
