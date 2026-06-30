import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import LoginPage from '@app/pages/Login';

export const Route = createFileRoute('/login')({
  head: () =>
    seoHead({
      title: 'Connectez-vous | Le Quizz du Berger',
      canonicalPath: '/login',
    }),
  component: LoginPage,
});
