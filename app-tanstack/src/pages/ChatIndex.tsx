import { useEffect, useState } from 'react';
import { Link } from '@app/lib/router';
import API from '@app/services/api';
import useUser from '@app/hooks/useUser';
import { AI_DISCLAIMER, chatModes } from '@app/content/chat-modes';
import { candidateSlugMap } from '@app/utils/seo-light';
import type { ChatSummary } from '@app/services/chat';

const MyChats = () => {
  const { user } = useUser();
  const hasAccount = !!user.isLoggedIn && !!user.pseudo;
  const [chats, setChats] = useState<ChatSummary[]>([]);

  useEffect(() => {
    if (!hasAccount) return;
    API.get({ path: '/chat' }).then((res) => {
      if (res?.ok) setChats(res.data);
    });
  }, [hasAccount]);

  const remove = async (chatId: string) => {
    if (!window.confirm('Supprimer définitivement cette discussion ?')) return;
    const res = await API.delete({ path: `/chat/${chatId}` });
    if (res?.ok) setChats((list) => list.filter((c) => c.id !== chatId));
  };

  if (!chats.length) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-[Merriweather] text-xl font-bold text-quizz-dark">Tes discussions</h2>
      <ul className="flex flex-col gap-2">
        {chats.map((chat) => {
          const title = chatModes.find((m) => m.mode === chat.mode)?.title;
          const candidate = candidateSlugMap.find((c) => c.id === chat.candidateId);
          return (
            <li key={chat.id} className="flex items-start gap-3 rounded-xl border border-gray-200 p-3">
              <Link to={`/ia/discussion/${chat.id}`} className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-quizz-dark">
                  {title}
                  {candidate && ` : ${candidate.pseudo}`}
                </span>
                <span className="block truncate text-sm text-gray-600">{chat.preview}</span>
                <span className="block text-xs text-gray-400">
                  {new Date(chat.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                </span>
              </Link>
              <button onClick={() => remove(chat.id)} className="cursor-pointer text-xs text-gray-500 underline">
                Supprimer
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default function ChatIndex() {
  return (
    <div className="flex flex-col items-center bg-white px-4 py-10">
      <main className="w-full max-w-[65ch]">
        <h1 className="mb-4 text-center font-[Merriweather] text-3xl font-bold text-quizz-dark">Discuter avec l'IA</h1>
        <p className="mb-8 text-center leading-relaxed">
          Une IA qui n'a pas le droit de te dire pour qui voter, ni si tes idées sont bonnes ou mauvaises. Tu n'es pas un
          mouton : elle est là pour t'aider à réfléchir, pas pour penser à ta place.
        </p>
        <ul className="flex flex-col gap-4">
          {chatModes.map((chatMode) => (
            <li key={chatMode.slug}>
              <Link
                to={`/ia/${chatMode.slug}`}
                className="block rounded-2xl border-2 border-gray-200 p-5 transition-colors hover:border-quizz-yellow"
              >
                <h2 className="mb-2 font-[Merriweather] text-xl font-bold text-quizz-dark">{chatMode.title}</h2>
                <p className="leading-relaxed text-gray-700">{chatMode.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        <MyChats />
        <p className="mt-8 text-center text-sm text-gray-500">{AI_DISCLAIMER}</p>
      </main>
    </div>
  );
}
