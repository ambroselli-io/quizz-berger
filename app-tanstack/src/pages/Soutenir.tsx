import { useCallback, useEffect, useState } from 'react';
import { Link } from '@app/lib/router';
import API from '@app/services/api';
import useUser from '@app/hooks/useUser';
import ModalDonation from '@app/components/modals/ModalDonation';
import { DONATION_URL } from '@app/content/chat-modes';

interface Summary {
  donationsEur: number;
  donationsCount: number;
  aiEur: number;
  expenses: Array<{ id: string; date: string; label: string; amountEur: number }>;
  spentEur: number;
  remainingEur: number;
}

interface Idea {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  authorPseudo: string | null;
  votesCount: number;
  hasVoted: boolean;
  isMine: boolean;
}

interface LedgerEntry {
  id: string;
  date: string;
  kind: 'donation' | 'expense';
  amountEur: number;
  label: string;
}

type IdeaStatus = 'pending' | 'open' | 'planned' | 'in-progress' | 'done' | 'rejected';

const statusLabels: Record<IdeaStatus, string> = {
  pending: 'En attente de validation',
  open: 'Ouverte aux votes',
  planned: 'Prévue',
  'in-progress': 'En cours',
  done: 'Faite',
  rejected: 'Refusée',
};

const statusColors: Record<IdeaStatus, string> = {
  pending: 'bg-gray-100 text-gray-600',
  open: 'bg-blue-50 text-blue-700',
  planned: 'bg-yellow-50 text-yellow-800',
  'in-progress': 'bg-orange-50 text-orange-700',
  done: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
};

const votable: IdeaStatus[] = ['open', 'planned', 'in-progress'];

const euros = (amount: number) =>
  amount.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const inputClass =
  'rounded-xl border-2 border-gray-200 px-3 py-2 focus:border-quizz-yellow focus:outline-none';

const Money = ({ summary }: { summary: Summary }) => (
  <section className="mb-12">
    <h2 className="mb-4 font-[Merriweather] text-2xl font-bold text-quizz-dark">Où va l'argent</h2>
    <div className="mb-4 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
      <div className="rounded-2xl bg-gray-50 p-4">
        <p className="text-sm text-gray-600">Dons reçus</p>
        <p className="text-2xl font-bold text-quizz-dark">{euros(summary.donationsEur)}</p>
        <p className="text-xs text-gray-500">
          {summary.donationsCount} don{summary.donationsCount > 1 ? 's' : ''}
        </p>
      </div>
      <div className="rounded-2xl bg-gray-50 p-4">
        <p className="text-sm text-gray-600">Dépensé</p>
        <p className="text-2xl font-bold text-quizz-dark">{euros(summary.spentEur)}</p>
      </div>
      <div className="rounded-2xl bg-quizz-yellow/20 p-4">
        <p className="text-sm text-gray-600">{summary.remainingEur >= 0 ? 'Reste à investir' : 'Manque'}</p>
        <p className="text-2xl font-bold text-quizz-dark">{euros(Math.abs(summary.remainingEur))}</p>
        {summary.remainingEur < 0 && (
          <p className="text-xs text-gray-500">payés de ma poche pour l'instant</p>
        )}
      </div>
    </div>
    <h3 className="mb-2 font-bold text-quizz-dark">Le détail des dépenses</h3>
    <ul className="divide-y divide-gray-100 text-sm">
      <li className="flex justify-between gap-4 py-2">
        <span>
          L'IA du site (Mistral AI)
          <span className="block text-xs text-gray-500">
            Calculé d'après chaque discussion, mis à jour en direct
          </span>
        </span>
        <span className="whitespace-nowrap font-bold">{euros(summary.aiEur)}</span>
      </li>
      {summary.expenses.map((expense) => (
        <li key={expense.id} className="flex justify-between gap-4 py-2">
          <span>
            {expense.label}
            <span className="block text-xs text-gray-500">
              {new Date(expense.date).toLocaleDateString('fr-FR')}
            </span>
          </span>
          <span className="whitespace-nowrap font-bold">{euros(expense.amountEur)}</span>
        </li>
      ))}
    </ul>
  </section>
);

const ProposeIdea = ({ onProposed }: { onProposed: () => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    const res = await API.post({ path: '/ideas', body: { title, description } });
    setIsSending(false);
    if (!res?.ok) {
      setMessage(res?.error ?? "Ton idée n'a pas pu être envoyée.");
      return;
    }
    setTitle('');
    setDescription('');
    setMessage('Merci ! Ton idée sera visible par tout le monde dès que je l’aurai relue.');
    onProposed();
  };

  return (
    <form onSubmit={submit} className="mb-6 flex flex-col gap-3 rounded-2xl border-2 border-gray-200 p-4">
      <h3 className="font-bold text-quizz-dark">Proposer une idée</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="En une phrase : qu'est-ce que le site devrait faire ?"
        maxLength={120}
        required
        className={inputClass}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Plus de détails, si tu veux"
        maxLength={1000}
        rows={3}
        className={`${inputClass} resize-none`}
      />
      {message && <p className="text-sm text-gray-700">{message}</p>}
      <button
        type="submit"
        disabled={isSending}
        className="cursor-pointer self-start rounded-xl bg-quizz-yellow px-5 py-2.5 font-bold text-quizz-dark disabled:opacity-50"
      >
        Proposer
      </button>
    </form>
  );
};

const LedgerAdmin = ({ entries, onChange }: { entries: LedgerEntry[]; onChange: () => void }) => {
  const [kind, setKind] = useState<'donation' | 'expense'>('expense');
  const [amountEur, setAmountEur] = useState('');
  const [label, setLabel] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API.post({
      path: '/funding/ledger',
      body: { kind, amountEur: Number(amountEur), label, date },
    });
    if (res?.ok) {
      setAmountEur('');
      setLabel('');
      onChange();
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm('Supprimer cette ligne ?')) return;
    await API.delete({ path: `/funding/ledger/${id}` });
    onChange();
  };

  return (
    <section className="mt-12 rounded-2xl border-2 border-dashed border-gray-300 p-4">
      <h2 className="mb-1 font-bold text-quizz-dark">Admin : dons et dépenses</h2>
      <p className="mb-3 text-xs text-gray-500">
        Les dons validés depuis l'e-mail Tipeee arrivent ici tout seuls. Ajoute les autres (tips sans
        déclaration, hébergement…). Les libellés des dons ne sont jamais publiés.
      </p>
      <form onSubmit={add} className="mb-4 flex flex-wrap gap-2">
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as 'donation' | 'expense')}
          className={inputClass}
        >
          <option value="expense">Dépense</option>
          <option value="donation">Don</option>
        </select>
        <input
          value={amountEur}
          onChange={(e) => setAmountEur(e.target.value)}
          type="number"
          step="0.01"
          min="0"
          placeholder="Montant €"
          required
          className={`${inputClass} w-28`}
        />
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Libellé"
          required
          className={`${inputClass} flex-1`}
        />
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className={inputClass} />
        <button type="submit" className="cursor-pointer rounded-xl bg-quizz-dark px-4 py-2 text-white">
          Ajouter
        </button>
      </form>
      <ul className="divide-y divide-gray-100 text-sm">
        {entries.map((entry) => (
          <li key={entry.id} className="flex items-center justify-between gap-3 py-1.5">
            <span>
              {new Date(entry.date).toLocaleDateString('fr-FR')} ·{' '}
              {entry.kind === 'donation' ? 'Don' : 'Dépense'} · {entry.label}
            </span>
            <span className="flex items-center gap-3 whitespace-nowrap">
              <b>{euros(entry.amountEur)}</b>
              <button
                onClick={() => remove(entry.id)}
                className="cursor-pointer text-xs text-gray-500 underline"
              >
                Supprimer
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default function Soutenir() {
  const { user } = useUser();
  const hasAccount = !!user.isLoggedIn && !!user.pseudo;
  const [summary, setSummary] = useState<Summary | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [ledger, setLedger] = useState<LedgerEntry[] | null>(null);
  const [showDonation, setShowDonation] = useState(false);

  const loadIdeas = useCallback(() => {
    API.get({ path: '/ideas' }).then((res) => res?.ok && setIdeas(res.data));
  }, []);

  const loadMoney = useCallback(() => {
    API.get({ path: '/funding/summary' }).then((res) => res?.ok && setSummary(res.data));
    // Only the admin gets an answer: everyone else is refused and never sees the admin block.
    API.get({ path: '/funding/ledger' }).then((res) => setLedger(res?.ok ? res.data : null));
  }, []);

  useEffect(() => {
    loadMoney();
  }, [loadMoney, user.isLoggedIn]);

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas, user.isLoggedIn]);

  const isAdmin = ledger !== null;

  const vote = async (idea: Idea) => {
    const res = await API.post({ path: `/ideas/${idea.id}/vote` });
    if (res?.ok) loadIdeas();
  };

  const setStatus = async (idea: Idea, status: IdeaStatus) => {
    await API.put({ path: `/ideas/${idea.id}`, body: { status } });
    loadIdeas();
  };

  const remove = async (idea: Idea) => {
    if (!window.confirm(`Supprimer « ${idea.title} » ?`)) return;
    await API.delete({ path: `/ideas/${idea.id}` });
    loadIdeas();
  };

  return (
    <div className="flex flex-col items-center bg-white px-4 py-10">
      <main className="w-full max-w-[65ch]">
        <h1 className="mb-4 text-center font-[Merriweather] text-3xl font-bold text-quizz-dark">
          Soutenir le Quizz du Berger
        </h1>
        <p className="mb-3 leading-relaxed">
          Le Quizz du Berger est gratuit, sans publicité, et il le restera. Le chat avec l'IA Mistral n'est
          pas gratuit, et nous acceptons volontiers les dons pour financer ce service ainsi que les
          développements du site.
        </p>
        <p className="mb-6 leading-relaxed">
          En échange d'un don, tu peux proposer tes idées de développement du Quizz, et voter pour celles des
          autres. Tout don est réinvesti dans le site.
        </p>
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {DONATION_URL && (
            <a
              href={DONATION_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-quizz-yellow px-5 py-3 font-bold text-quizz-dark"
            >
              Faire un don sur Tipeee
            </a>
          )}
          <button
            onClick={() => setShowDonation(true)}
            className="cursor-pointer rounded-xl border-2 border-quizz-yellow bg-white px-5 py-3"
          >
            J'ai déjà donné
          </button>
        </div>

        {summary && <Money summary={summary} />}

        <section>
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Que faire avec les dons ?
          </h2>
          {hasAccount ? (
            <ProposeIdea onProposed={loadIdeas} />
          ) : (
            <p className="mb-6 text-sm text-gray-700">
              <Link to="/login" className="underline">
                Connecte-toi
              </Link>{' '}
              pour proposer une idée ou voter.
            </p>
          )}
          {ideas.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune idée pour l'instant. Sois le premier !</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {ideas.map((idea) => (
                <li key={idea.id} className="flex gap-3 rounded-2xl border border-gray-200 p-3">
                  <button
                    onClick={() => vote(idea)}
                    disabled={!hasAccount || !votable.includes(idea.status)}
                    title={hasAccount ? 'Voter' : 'Connecte-toi pour voter'}
                    className={`flex h-14 w-12 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border-2 text-sm disabled:cursor-default ${
                      idea.hasVoted ? 'border-quizz-yellow bg-quizz-yellow/20 font-bold' : 'border-gray-200'
                    }`}
                  >
                    <span aria-hidden>▲</span>
                    <span>{idea.votesCount}</span>
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-quizz-dark">{idea.title}</p>
                    {idea.description && (
                      <p className="whitespace-pre-wrap text-sm text-gray-700">{idea.description}</p>
                    )}
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className={`rounded-full px-2 py-0.5 ${statusColors[idea.status]}`}>
                        {statusLabels[idea.status]}
                      </span>
                      {idea.authorPseudo && <span>proposée par {idea.authorPseudo}</span>}
                    </p>
                    {isAdmin && (
                      <p className="mt-2 flex items-center gap-3 text-xs">
                        <select
                          value={idea.status}
                          onChange={(e) => setStatus(idea, e.target.value as IdeaStatus)}
                          className="rounded border border-gray-300 px-1 py-0.5"
                        >
                          {(Object.keys(statusLabels) as IdeaStatus[]).map((status) => (
                            <option key={status} value={status}>
                              {statusLabels[status]}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => remove(idea)}
                          className="cursor-pointer text-gray-500 underline"
                        >
                          Supprimer
                        </button>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {isAdmin && ledger && <LedgerAdmin entries={ledger} onChange={loadMoney} />}
      </main>
      <ModalDonation isActive={showDonation} onClose={() => setShowDonation(false)} />
    </div>
  );
}
