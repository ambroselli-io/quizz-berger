import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from '@app/lib/router';
import API from '@app/services/api';
import useUser from '@app/hooks/useUser';
import Loader from '@app/components/Loader';
import LoginContainer from '@app/components/LoginContainer';
import QuizzModal from '@app/components/QuizzModal';
import ModalDonation from '@app/components/modals/ModalDonation';
import { candidateSlugMap, type CandidateSlugEntry } from '@app/utils/seo-light';
import {
  AI_DISCLAIMER,
  CANDIDATE_DISCLAIMER,
  chatModes,
  getChatModeBySlug,
  type ChatModeEntry,
} from '@app/content/chat-modes';
import { sendChatMessage, type Chat } from '@app/services/chat';

const CandidateAvatar = ({ candidate, size }: { candidate: CandidateSlugEntry; size: number }) =>
  candidate.picture ? (
    <img src={`/${candidate.picture}`} alt="" width={size} height={size} className="shrink-0 rounded-full bg-gray-100 object-cover" />
  ) : (
    <span className="shrink-0 rounded-full" style={{ width: size, height: size, backgroundColor: candidate.color }} />
  );

const CandidatePicker = ({ onPick }: { onPick: (candidateId: string) => void }) => (
  <div>
    <h2 className="mb-4 text-center font-[Merriweather] text-xl font-bold text-quizz-dark">Quel candidat veux-tu convaincre ?</h2>
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {candidateSlugMap.map((candidate) => (
        <li key={candidate.id}>
          <button
            onClick={() => onPick(candidate.id)}
            className="flex w-full cursor-pointer items-center gap-2 rounded-xl border-2 border-gray-200 bg-white p-2 text-left text-sm hover:border-quizz-yellow"
          >
            <CandidateAvatar candidate={candidate} size={36} />
            <span>{candidate.pseudo}</span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

// initialChat: an existing conversation picked up again from /ia/discussion/{id}.
const Conversation = ({ chatMode, initialChat }: { chatMode: ChatModeEntry; initialChat?: Chat }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const hasAccount = !!user.isLoggedIn && !!user.pseudo;
  const [candidateId, setCandidateId] = useState<string | null>(initialChat?.candidateId ?? null);
  const [chat, setChat] = useState<Chat | null>(initialChat ?? null);
  const [showDonation, setShowDonation] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const startedRef = useRef(!!initialChat);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isConvaincre = chatMode.mode === 'convaincre';
  const candidate = candidateSlugMap.find((c) => c.id === candidateId);

  const startChat = async () => {
    setError('');
    setChat(null);
    const res = await API.post({ path: '/chat', body: { mode: chatMode.mode, candidateId } });
    if (!res?.ok) {
      setError(res?.error ?? "Impossible de lancer la discussion, réessaie dans quelques instants.");
      return;
    }
    setChat(res.data);
    if (res.donation?.previousChatsCount > 0) setShowDonation(true);
  };

  useEffect(() => {
    if (!hasAccount || (isConvaincre && !candidateId) || startedRef.current) return;
    startedRef.current = true;
    startChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAccount, candidateId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chat?.messages]);

  const restart = (resetCandidate: boolean) => {
    setChat(null);
    setError('');
    if (resetCandidate) {
      // The effect starts the next chat once a candidate is picked.
      startedRef.current = false;
      setCandidateId(null);
    } else {
      startChat();
    }
  };

  const remove = async () => {
    if (!chat || !window.confirm('Supprimer définitivement cette discussion ?')) return;
    const res = await API.delete({ path: `/chat/${chat.id}` });
    if (!res?.ok) {
      setError(res?.error ?? "La discussion n'a pas pu être supprimée.");
      return;
    }
    navigate('/ia');
  };

  const send = async () => {
    const text = input.trim();
    if (!text || isSending || !chat) return;
    const before = chat.messages;
    const withUser = [...before, { role: 'user' as const, content: text }];
    setInput('');
    setError('');
    setIsSending(true);
    setChat((c) => c && { ...c, messages: [...withUser, { role: 'assistant', content: '' }] });
    const res = await sendChatMessage(chat.id, text, (reply) =>
      setChat((c) => c && { ...c, messages: [...withUser, { role: 'assistant', content: reply }] }),
    );
    if (!res.ok) {
      setChat((c) => c && { ...c, messages: before });
      setInput(text);
      setError(res.error);
    }
    setIsSending(false);
  };

  const userMessagesCount = chat?.messages.filter((m) => m.role === 'user').length ?? 0;

  return (
    <div className="flex flex-col items-center bg-white px-4 py-6">
      <main className="flex w-full max-w-[65ch] flex-col">
        <Link to="/ia" className="mb-2 text-sm text-gray-500 underline">
          ← Les autres façons de discuter
        </Link>
        <h1 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
          {chatMode.title}
          {candidate && ` : ${candidate.pseudo}`}
        </h1>
        <p className="mb-3 text-sm leading-relaxed text-gray-700">{chatMode.description}</p>
        <p className="mb-6 rounded-lg bg-yellow-50 p-3 text-sm leading-relaxed text-gray-800">
          ⚠️ {AI_DISCLAIMER}
          {isConvaincre && <> {CANDIDATE_DISCLAIMER}</>}
        </p>

        {isLoading ? (
          <Loader isLoading />
        ) : !hasAccount ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-center leading-relaxed">
              Pour discuter avec l'IA, il te faut un compte. Un pseudo et un mot de passe suffisent.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="cursor-pointer rounded-xl bg-quizz-yellow px-5 py-3 font-bold text-quizz-dark"
            >
              Se connecter ou s'inscrire
            </button>
            <QuizzModal title="Connexion" isActive={showLogin} onClose={() => setShowLogin(false)}>
              <p className="mb-6 text-center leading-relaxed">
                Pour discuter avec l'IA, il te faut un compte. Un pseudo et un mot de passe suffisent.
              </p>
              <LoginContainer showSignup onSuccess={() => setShowLogin(false)} />
            </QuizzModal>
          </div>
        ) : isConvaincre && !candidateId ? (
          <CandidatePicker onPick={setCandidateId} />
        ) : (
          <>
            <ol className="flex flex-col gap-3">
              {chat?.messages.map((message, index) => (
                <li
                  key={index}
                  className={`flex items-end gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {message.role === 'assistant' && candidate && <CandidateAvatar candidate={candidate} size={28} />}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed whitespace-pre-wrap ${
                      message.role === 'user' ? 'bg-quizz-dark text-white' : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content || <span className="animate-pulse text-gray-400">L'IA réfléchit, ça peut prendre une vingtaine de secondes…</span>}
                  </div>
                </li>
              ))}
            </ol>
            {!chat && !error && <Loader isLoading />}
            {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
            <div ref={bottomRef} />

            {chat && (
              <form
                className="sticky bottom-0 mt-4 flex items-end gap-2 bg-white py-3 max-lg:bottom-16"
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  maxLength={2000}
                  rows={2}
                  placeholder="Écris ton message…"
                  className="flex-1 resize-none rounded-xl border-2 border-gray-200 px-3 py-2 focus:border-quizz-yellow focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSending || !input.trim()}
                  className="cursor-pointer rounded-xl bg-quizz-yellow px-4 py-3 font-bold text-quizz-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Envoyer
                </button>
              </form>
            )}

            {chat && (
              <div className="flex flex-wrap items-center justify-end gap-2 text-xs text-gray-500">
                <span className="flex gap-3">
                  <button className="cursor-pointer underline" onClick={() => setShowDonation(true)}>
                    Faire un don
                  </button>
                  {isConvaincre && (
                    <button className="cursor-pointer underline" onClick={() => restart(true)}>
                      Changer de candidat
                    </button>
                  )}
                  <button className="cursor-pointer underline" onClick={() => restart(false)}>
                    Nouvelle discussion
                  </button>
                  {userMessagesCount > 0 && (
                    <button className="cursor-pointer underline" onClick={remove}>
                      Supprimer
                    </button>
                  )}
                </span>
              </div>
            )}
          </>
        )}
      </main>
      <ModalDonation isActive={showDonation} onClose={() => setShowDonation(false)} />
    </div>
  );
};

export function ResumeChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const { user, isLoading } = useUser();
  const [chat, setChat] = useState<Chat | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoading || !user.isLoggedIn) return;
    API.get({ path: `/chat/${chatId}` }).then((res) => {
      if (res?.ok) setChat(res.data);
      else setError(res?.error ?? 'Discussion introuvable');
    });
  }, [chatId, isLoading, user.isLoggedIn]);

  const chatMode = chat && chatModes.find((m) => m.mode === chat.mode);
  if (chatMode && chat) return <Conversation key={chat.id} chatMode={chatMode} initialChat={chat} />;
  return (
    <div className="flex flex-col items-center px-4 py-10">
      {error || (!isLoading && !user.isLoggedIn) ? (
        <p className="text-center">
          {error || 'Connecte-toi pour retrouver tes discussions.'}{' '}
          <Link to="/ia" className="underline">
            Retour
          </Link>
        </p>
      ) : (
        <Loader isLoading />
      )}
    </div>
  );
}

export default function ChatPage() {
  const { modeSlug } = useParams<{ modeSlug: string }>();
  const chatMode = getChatModeBySlug(modeSlug ?? '');
  if (!chatMode) return null;
  // A new mode is a new conversation: remount instead of resetting every piece of state.
  return <Conversation key={chatMode.slug} chatMode={chatMode} />;
}
