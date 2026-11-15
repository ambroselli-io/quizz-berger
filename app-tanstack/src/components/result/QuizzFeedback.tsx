import { useEffect, useRef, useState } from 'react';
import { Heart, Megaphone, Newspaper } from 'lucide-react';
import API from '@app/services/api';
import useUser from '@app/hooks/useUser';
import { DONATION_URL } from '@app/content/chat-modes';
import { setToLocalStorage } from '@app/utils/storage';

export const RATINGS = ['Pas du tout', 'Plutôt pas', 'Mitigé', 'Plutôt oui', "Carrément, j'ai adoré\u00a0!"];
const LIKED_FROM = 3;
const SITE_URL = 'https://www.quizz-du-berger.com';
const SHARE_TEXT = "J'ai fait le Quizz du Berger\u00a0: à quel candidat de 2027 ressemblent vraiment vos idées\u00a0?";

export interface QuizzFeedbackState {
  rating: number | null;
  sent: boolean;
  /** Row of the QuizzFeedback table, created on the first click. */
  id?: string | null;
}

export const QUIZZ_FEEDBACK_STORAGE_KEY = 'quizzFeedback';

interface QuizzFeedbackProps {
  state: QuizzFeedbackState;
  setState: (state: QuizzFeedbackState) => void;
  answersCount: number;
}

const SHARE_LINKS = [
  { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SITE_URL}`)}` },
  { label: 'X', href: `https://x.com/intent/post?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SITE_URL)}` },
  { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}` },
  { label: 'Bluesky', href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${SHARE_TEXT} ${SITE_URL}`)}` },
  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}` },
];

const QuizzFeedback = ({ state, setState, answersCount }: QuizzFeedbackProps) => {
  const { user } = useUser();
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showNetworks, setShowNetworks] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [media, setMedia] = useState({ text: '', email: '', sent: false });

  const update = (next: QuizzFeedbackState) => {
    setState(next);
    setToLocalStorage(QUIZZ_FEEDBACK_STORAGE_KEY, next);
  };

  // The click alone is saved: most visitors will never press "Envoyer mon avis".
  const creating = useRef<Promise<string | null> | null>(null);
  const onRate = async (rating: number) => {
    setState({ ...state, rating });
    const id = state.id ?? (await creating.current);
    if (id) {
      API.put({ path: `/quizz-feedback/${id}`, body: { rating } });
      return;
    }
    creating.current = API.post({ path: '/quizz-feedback', body: { rating, answersCount } }).then((res) =>
      res.ok ? (res.data.id as string) : null,
    );
    const newId = await creating.current;
    if (newId) update({ rating, sent: false, id: newId });
  };

  const sendRating = async (withComment: boolean) => {
    if (state.rating === null) return;
    setIsSending(true);
    const id = state.id ?? (await creating.current);
    if (id && withComment && comment.trim()) {
      await API.put({ path: `/quizz-feedback/${id}`, body: { rating: state.rating, comment: comment.trim() } });
    }
    await API.post({
      path: '/feedback',
      body: {
        subject: `Quizz du Berger : avis sur le quiz (${state.rating + 1}/5 - ${RATINGS[state.rating]})`,
        text: [
          `Note : ${state.rating + 1}/5 - ${RATINGS[state.rating]}`,
          `Utilisateur : ${user?.pseudo ?? user?._id ?? '(anonyme)'}`,
          `Questions répondues : ${answersCount}`,
          '',
          withComment && comment.trim() ? comment.trim() : '(pas de commentaire)',
        ].join('\n'),
      },
    });
    setIsSending(false);
    justSent.current = true;
    update({ ...state, sent: true });
  };

  // The thanks replace a taller form: on mobile the page jumps and the visitor lands lost below it.
  // Bring the title back into view only when it left the screen.
  const titleRef = useRef<HTMLHeadingElement>(null);
  const justSent = useRef(false);
  useEffect(() => {
    if (!state.sent || !justSent.current) return;
    justSent.current = false;
    const title = titleRef.current;
    if (!title) return;
    const { top } = title.getBoundingClientRect();
    if (top < 80 || top > window.innerHeight - 100) title.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [state.sent]);

  const sendMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!media.text.trim()) return;
    setIsSending(true);
    const response = await API.post({
      path: '/feedback',
      body: {
        subject: 'Quizz du Berger : des médias à contacter',
        text: [
          `Utilisateur : ${user?.pseudo ?? user?._id ?? '(anonyme)'}`,
          `Email : ${media.email.trim() || '(non renseigné)'}`,
          '',
          media.text.trim(),
        ].join('\n'),
        email: media.email.trim() || undefined,
      },
    });
    setIsSending(false);
    if (!response.ok) {
      alert(response.error || "Le message n'est pas parti, réessayez dans un instant.");
      return;
    }
    setMedia((m) => ({ ...m, sent: true }));
  };

  const onShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Le Quizz du Berger', text: SHARE_TEXT, url: SITE_URL });
        return;
      } catch {
        // Cancelled by the user, or refused by the browser: the links below remain.
      }
    }
    setShowNetworks(true);
  };

  const liked = state.rating !== null && state.rating >= LIKED_FROM;

  return (
    <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
      <h2 ref={titleRef} className="mb-1 scroll-mt-24 font-[Merriweather] text-2xl font-bold text-quizz-dark">
        {state.sent ? 'Merci\u00a0!' : 'Ce quiz vous a plu\u00a0?'}
      </h2>
      {!state.sent && (
        <>
          <p className="mb-4 text-balance text-sm text-gray-600">Votre avis nous aide à l'améliorer. Il reste anonyme.</p>
          <div className="flex w-full flex-col items-center gap-2">
            {RATINGS.map((label, index) => (
              <div key={label} className="flex w-full max-w-[500px] flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onRate(index)}
                  className={`w-full cursor-pointer rounded-lg border px-2.5 py-2.5 text-base text-balance ${
                    state.rating === index
                      ? 'border-quizz-dark bg-quizz-dark text-white'
                      : 'border-gray-200 bg-white text-black hover:border-gray-400'
                  }`}
                  style={{ minHeight: 52 }}
                >
                  {label}
                </button>
                {state.rating === index && (
                  <div className="mb-2 flex w-full flex-col gap-2">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      maxLength={2000}
                      placeholder="Dites-nous en plus\u00a0!"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-quizz-dark focus:outline-none"
                    />
                    <button
                      type="button"
                      disabled={isSending}
                      onClick={() => sendRating(true)}
                      className="cursor-pointer rounded-lg bg-quizz-dark px-5 py-3 font-semibold text-white disabled:opacity-50"
                    >
                      {isSending ? 'Envoi...' : 'Envoyer mon avis'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {state.sent && (
        <>
          <p className="mb-4 text-balance text-base text-gray-700">
            {liked
              ? 'Ça fait vraiment plaisir\u00a0! Vous pouvez nous aider à aller plus loin\u00a0:'
              : 'Votre avis est bien reçu, il nous aide à améliorer le quiz.'}
          </p>
          {liked && (
            <div className="flex w-full flex-col gap-3">
              <div className="mx-auto flex w-full max-w-[500px] flex-col gap-3">
                <a
                  href={DONATION_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-quizz-yellow px-4 py-3 font-semibold text-quizz-dark no-underline"
                >
                  <Heart size={18} />
                  Faire un don
                </a>
                <button
                  type="button"
                  onClick={onShare}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-quizz-dark px-4 py-3 font-semibold text-white"
                >
                  <Megaphone size={18} />
                  Partager sur les réseaux
                </button>
                <button
                  type="button"
                  onClick={() => setShowMedia((s) => !s)}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-quizz-dark bg-white px-4 py-3 font-semibold text-quizz-dark"
                >
                  <Newspaper size={18} />
                  Je connais des médias
                </button>
              </div>
              {showNetworks && (
                <div className="flex flex-wrap justify-center gap-2">
                  {SHARE_LINKS.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-800 no-underline hover:bg-gray-50"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}
              {showMedia &&
                (media.sent ? (
                  <p className="text-sm text-gray-700">Merci&nbsp;! On s'en occupe.</p>
                ) : (
                  <form onSubmit={sendMedia} className="mx-auto flex w-full max-w-[500px] flex-col gap-3 text-left">
                    <label className="text-sm text-gray-700" htmlFor="media-text">
                      Un journaliste, un média, un créateur de contenu qui pourrait parler du quiz&nbsp;?
                    </label>
                    <textarea
                      id="media-text"
                      value={media.text}
                      onChange={(e) => setMedia((m) => ({ ...m, text: e.target.value }))}
                      rows={3}
                      maxLength={2000}
                      required
                      placeholder="Un nom, un contact, un lien..."
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-quizz-dark focus:outline-none"
                    />
                    <input
                      type="email"
                      value={media.email}
                      onChange={(e) => setMedia((m) => ({ ...m, email: e.target.value }))}
                      placeholder="Votre email, si vous voulez qu'on vous réponde (facultatif)"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-quizz-dark focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isSending}
                      className="cursor-pointer rounded-lg bg-quizz-dark px-5 py-3 font-semibold text-white disabled:opacity-50"
                    >
                      {isSending ? 'Envoi...' : 'Envoyer'}
                    </button>
                  </form>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizzFeedback;
