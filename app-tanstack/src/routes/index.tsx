import { createFileRoute } from '@tanstack/react-router';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { candidatesCount } from '@app/utils/seo';
import { seoHead } from '@app/utils/seo-head';
import Home from '@app/pages/Home';

export const Route = createFileRoute('/')({
  head: () =>
    seoHead({
      title: 'Le Quizz du Berger | Quel est votre candidat idéal ?',
      description: `Présidentielle 2027 - Répondez aux questions que vous voulez pour connaître le candidat qui pense comme vous. ${quizzThemesCount} thèmes, ${quizzQuestionsCount} questions, ${candidatesCount} candidats.`,
      canonicalPath: '/',
    }),
  component: Home,
});
