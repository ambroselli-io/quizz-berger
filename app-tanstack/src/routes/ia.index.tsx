import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import ChatIndex from '@app/pages/ChatIndex';

export const Route = createFileRoute('/ia/')({
  head: () =>
    seoHead({
      title: "Discuter de politique avec une IA | Le Quizz du Berger",
      description:
        "Trois façons de discuter de politique avec une IA qui n'a pas le droit de te dire pour qui voter : jouer au président, convaincre un candidat, penser contre toi-même.",
      canonicalPath: '/ia',
    }),
  component: ChatIndex,
});
