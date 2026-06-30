import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Confidentialite from '@app/pages/Confidentialite';

export const Route = createFileRoute('/confidentialite')({
  head: () =>
    seoHead({
      title: 'Politique de confidentialité | Le Quizz du Berger',
      description:
        "Comment le Quizz du Berger protège vos données : aucune adresse e-mail, aucun traceur publicitaire, le strict minimum pour jouer et comparer vos résultats.",
      canonicalPath: '/confidentialite',
    }),
  component: Confidentialite,
});
