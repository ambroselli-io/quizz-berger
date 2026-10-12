import { createFileRoute, notFound } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import { getChatModeBySlug } from '@app/content/chat-modes';
import ChatPage from '@app/pages/ChatPage';

export const Route = createFileRoute('/ia/$modeSlug')({
  loader: ({ params }) => {
    const chatMode = getChatModeBySlug(params.modeSlug);
    if (!chatMode) throw notFound();
    return { chatMode };
  },
  head: ({ loaderData }) => {
    const chatMode = loaderData?.chatMode;
    if (!chatMode) return {};
    return seoHead({
      title: `${chatMode.title} : discuter avec une IA | Le Quizz du Berger`,
      description: chatMode.description,
      canonicalPath: `/ia/${chatMode.slug}`,
    });
  },
  component: ChatPage,
});
