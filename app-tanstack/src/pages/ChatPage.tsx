import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from '@app/lib/router';
import API from '@app/services/api';
import useUser from '@app/hooks/useUser';
import Loader from '@app/components/Loader';
import LoginContainer from '@app/components/LoginContainer';
import QuizzModal from '@app/components/QuizzModal';
import ModalDonation from '@app/components/modals/ModalDonation';
import { candidateSlugMap, type CandidateSlugEntry } from '@app/utils/seo-light';
import { getCandidacyStatus } from '@app/utils/candidacies';
import {
  AI_DISCLAIMER,
  CANDIDATE_DISCLAIMER,
  chatModes,
  getChatModeBySlug,
  type ChatModeEntry,
} from '@app/content/chat-modes';
import { sendChatMessage, type Chat } from '@app/services/chat';
import { ArrowLeft, ArrowUp, MoreHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@app/components/ui/sheet';

const isTouchDevice = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const CandidateAvatar = ({ candidate, size }: { candidate: CandidateSlugEntry; size: number }) =>
  candidate.picture ? (
    <img
      src={`/${candidate.picture}`}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full bg-gray-100 object-cover object-top"
    />
  ) : (
    <span
      className="flex shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ width: size, height: size, backgroundColor: candidate.color }}
    >
      {candidate.pseudo
        .split(/[\s-]+/)
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()}
    </span>
  );

const CandidateButton = ({ candidate, isOut, onPick }: { candidate: CandidateSlugEntry; isOut?: boolean; onPick: (candidateId: string) => void }) => (
  <li>
    <button
      onClick={() => onPick(candidate.id)}
      className={`group relative flex w-full cursor-pointer items-center gap-2 rounded-xl border-2 bg-white p-2 text-left text-sm hover:border-quizz-yellow ${
        isOut ? 'border-dashed border-gray-300 text-gray-500 hover:text-quizz-dark' : 'border-gray-200'
      }`}
    >
      <span className={isOut ? 'grayscale transition group-hover:grayscale-0' : undefined}>
        <CandidateAvatar candidate={candidate} size={36} />
      </span>
      <span>{candidate.pseudo}</span>
      {isOut && (
        <span className="absolute -top-2 -right-2 -rotate-12 rounded border-2 border-red-600 bg-white px-1.5 text-[10px] font-black tracking-widest text-red-600 shadow-sm transition group-hover:rotate-0">
          OUT
        </span>
      )}
    </button>
  </li>
);

const runningCandidates = candidateSlugMap.filter((c) => getCandidacyStatus(c.slug) !== 'withdrawn');
const withdrawnCandidates = candidateSlugMap.filter((c) => getCandidacyStatus(c.slug) === 'withdrawn');

const CandidatePicker = ({ onPick }: { onPick: (candidateId: string) => void }) => (
  <div>
    <h2 className="mb-4 text-center font-[Merriweather] text-xl font-bold text-quizz-dark">Quel candidat veux-tu convaincre ?</h2>
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {runningCandidates.map((candidate) => (
        <CandidateButton key={candidate.id} candidate={candidate} onPick={onPick} />
      ))}
    </ul>
    {withdrawnCandidates.length > 0 && (
      <>
        <h3 className="mt-10 text-center font-[Merriweather] text-lg font-bold text-quizz-dark">Ils ont jeté l'éponge 🧽</h3>
        <p className="mb-4 text-center text-sm text-gray-500">Sortis de la course, mais pas de tes griffes : convaincs-les de revenir.</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {withdrawnCandidates.map((candidate) => (
            <CandidateButton key={candidate.id} candidate={candidate} isOut onPick={onPick} />
          ))}
        </ul>
      </>
    )}
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showActions, setShowActions] = useState(false);

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

  // Same actions in the desktop footer row and in the mobile "⋯" sheet.
  const actions = [
    { label: 'Faire un don', onClick: () => setShowDonation(true) },
    ...(isConvaincre ? [{ label: 'Changer de candidat', onClick: () => restart(true) }] : []),
    { label: 'Nouvelle discussion', onClick: () => restart(false) },
    ...(userMessagesCount > 0 ? [{ label: 'Supprimer', onClick: remove }] : []),
  ];

  // The textarea grows with its content, up to ~6 lines, like ChatGPT's.
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [input]);

  return (
    // Mobile: a full-screen chat (the root layout hides the header and the tab bar on these routes),
    // top bar + scrolling messages + composer pinned at the bottom. Desktop keeps the regular page flow.
    <div className="flex flex-col items-center bg-white max-lg:h-dvh">
      <header className="flex h-14 w-full shrink-0 items-center gap-1 border-b border-gray-100 bg-white px-2 pt-[env(safe-area-inset-top)] lg:hidden">
        <Link
          to="/ia"
          aria-label="Retour aux autres façons de discuter"
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-quizz-dark active:bg-gray-100"
        >
          <ArrowLeft size={22} />
        </Link>
        {candidate && <CandidateAvatar candidate={candidate} size={28} />}
        <p className="min-w-0 flex-1 truncate px-1 font-[Merriweather] text-base font-bold text-quizz-dark">
          {candidate ? candidate.pseudo : chatMode.title}
        </p>
        {chat && (
          <button
            onClick={() => setShowActions(true)}
            aria-label="Plus d'options"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-quizz-dark active:bg-gray-100"
          >
            <MoreHorizontal size={22} />
          </button>
        )}
      </header>

      <div className="flex w-full flex-col items-center px-4 py-6 max-lg:min-h-0 max-lg:flex-1 max-lg:overflow-y-auto max-lg:py-4">
        <main className="flex w-full max-w-[65ch] flex-col">
          <Link to="/ia" className="mb-2 text-sm text-gray-500 underline max-lg:hidden">
            ← Les autres façons de discuter
          </Link>
          <h1 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark max-lg:sr-only">
            {chatMode.title}
            {candidate && ` : ${candidate.pseudo}`}
          </h1>
          <p className="mb-3 text-sm leading-relaxed text-gray-700">{chatMode.description}</p>
          <p className="mb-6 rounded-lg bg-yellow-50 p-3 text-sm leading-relaxed text-gray-800 max-lg:text-xs">
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
            </>
          )}
        </main>
      </div>

      {hasAccount && chat && (
        <div className="flex w-full shrink-0 flex-col items-center bg-white px-4 lg:sticky lg:bottom-0 max-lg:px-3 max-lg:pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <form
            className="flex w-full max-w-[65ch] items-end gap-2 rounded-3xl border border-gray-200 bg-white py-1.5 pr-1.5 pl-4 shadow-sm focus-within:border-gray-300"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                // On touch keyboards Enter inserts a new line; the arrow button sends.
                if (e.key === 'Enter' && !e.shiftKey && !isTouchDevice()) {
                  e.preventDefault();
                  send();
                }
              }}
              maxLength={2000}
              rows={1}
              placeholder="Écris ton message…"
              className="max-h-40 flex-1 resize-none self-center bg-transparent py-1.5 text-base leading-6 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Envoyer"
              disabled={isSending || !input.trim()}
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-quizz-dark text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </form>
          <p className="py-1.5 text-center text-[11px] text-gray-400 lg:hidden">L'IA peut se tromper. Vérifie les infos importantes.</p>
          <div className="flex w-full max-w-[65ch] justify-end gap-3 py-2 max-lg:hidden">
            {actions.map(({ label, onClick }) => (
              <button key={label} className="cursor-pointer text-xs text-gray-500 underline" onClick={onClick}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <Sheet open={showActions} onOpenChange={setShowActions}>
        <SheetContent
          side="bottom"
          overlayClassName="z-[100]"
          className="z-[100] rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)] [&>button:last-child]:p-2 [&>button:last-child>svg]:size-6"
        >
          <SheetTitle className="sr-only">Options de la discussion</SheetTitle>
          <nav className="flex flex-col gap-1 py-2">
            {actions.map(({ label, onClick }) => (
              <button
                key={label}
                onClick={() => {
                  setShowActions(false);
                  onClick();
                }}
                className={`cursor-pointer rounded-lg border-none bg-transparent px-4 py-3 text-left text-base active:bg-gray-100 ${
                  label === 'Supprimer' ? 'text-red-600' : 'text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
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
