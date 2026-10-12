import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import { ResumeChatPage } from '@app/pages/ChatPage';

export const Route = createFileRoute('/ia/discussion/$chatId')({
  // Private conversation: nothing to index.
  head: () =>
    seoHead({
      title: "Ma discussion avec l'IA | Le Quizz du Berger",
      robots: 'noindex, nofollow',
    }),
  component: ResumeChatPage,
});
