import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Contact from '@app/pages/Contact';

export const Route = createFileRoute('/contact')({
  head: () =>
    seoHead({
      title: 'Nous contacter | Le Quizz du Berger',
      description:
        'Contactez le Quizz du Berger par e-mail pour signaler une erreur, suggérer une question ou exercer vos droits RGPD.',
      canonicalPath: '/contact',
    }),
  component: Contact,
});
