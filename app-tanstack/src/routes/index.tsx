import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Home from '@app/pages/Home';

export const Route = createFileRoute('/')({
  head: () =>
    seoHead({
      title: 'Le Quizz du Berger | Quel est votre candidat idéal ?',
      description:
        'Présidentielle 2027 - Répondez aux questions que vous voulez pour connaître le candidat qui pense comme vous. 21 thèmes, 119 questions, 24 candidats.',
      canonicalPath: '/',
    }),
  component: Home,
});
