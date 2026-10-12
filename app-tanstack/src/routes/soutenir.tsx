import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Soutenir from '@app/pages/Soutenir';

export const Route = createFileRoute('/soutenir')({
  head: () =>
    seoHead({
      title: 'Soutenir le Quizz du Berger : dons, dépenses et idées | Le Quizz du Berger',
      description:
        "Combien de dons, combien de dépenses, et quoi construire avec le reste : propose tes idées pour le Quizz du Berger et vote pour celles des autres.",
      canonicalPath: '/soutenir',
    }),
  component: Soutenir,
});
