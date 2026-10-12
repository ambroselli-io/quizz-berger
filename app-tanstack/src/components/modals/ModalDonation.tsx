import { useState } from 'react';
import QuizzModal from '../QuizzModal';
import API from '@app/services/api';
import { DONATION_URL, SUPPORTER_PERKS } from '@app/content/chat-modes';
import { formatCost, type DonationInfo } from '@app/services/chat';

interface ModalDonationProps {
  isActive: boolean;
  // Absent when the user opens the modal themselves, without a conversation to bill.
  donation?: DonationInfo | null;
  onClose: () => void;
}

const ClaimForm = ({ onDone }: { onDone: () => void }) => {
  const [tipeeePseudo, setTipeeePseudo] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError('');
    const res = await API.post({ path: '/supporter/claim', body: { tipeeePseudo, amount } });
    setIsSending(false);
    if (!res?.ok) {
      setError(res?.error ?? "Ta déclaration n'a pas pu être envoyée, réessaie dans quelques instants.");
      return;
    }
    onDone();
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <p>Dis-moi sous quel pseudo tu as donné sur Tipeee : je vérifie, puis j'active ton accès.</p>
      <input
        value={tipeeePseudo}
        onChange={(e) => setTipeeePseudo(e.target.value)}
        placeholder="Ton pseudo sur Tipeee"
        required
        maxLength={100}
        className="rounded-xl border-2 border-gray-200 px-3 py-2 focus:border-quizz-yellow focus:outline-none"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Le montant (ex. : 5 €, ou 2 € par mois)"
        required
        maxLength={20}
        className="rounded-xl border-2 border-gray-200 px-3 py-2 focus:border-quizz-yellow focus:outline-none"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isSending}
        className="cursor-pointer rounded-xl bg-quizz-yellow px-5 py-3 font-bold text-quizz-dark disabled:opacity-50"
      >
        Envoyer
      </button>
    </form>
  );
};

const ModalDonation = ({ isActive, donation, onClose }: ModalDonationProps) => {
  const [step, setStep] = useState<'ask' | 'claim' | 'sent'>('ask');
  const close = () => {
    setStep('ask');
    onClose();
  };

  return (
    <QuizzModal title="Un petit coup de main ?" isActive={isActive} onClose={close}>
      <div className="flex flex-col gap-4 leading-relaxed">
        {step === 'ask' && (
          <>
            {donation && (
              <p>
                {donation.previousChatsCount === 1
                  ? `Ta première discussion avec l'IA m'a coûté ${formatCost(donation.previousCostEur)}.`
                  : `Tes ${donation.previousChatsCount} discussions avec l'IA m'ont coûté ${formatCost(donation.previousCostEur)} en tout.`}
              </p>
            )}
            <p>
              Je fais le Quizz du Berger tout seul. Il est gratuit et sans publicité, mais chaque message envoyé à l'IA
              m'est facturé.
            </p>
            <p>
              Certains donnent, d'autres non, et c'est très bien comme ça. Mais si tu en as les moyens, un don sur Tipeee
              m'aiderait à rentrer dans mes frais. En échange : {SUPPORTER_PERKS}
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              {DONATION_URL && (
                <a
                  href={DONATION_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-quizz-yellow px-5 py-3 text-center font-bold text-quizz-dark"
                >
                  Faire un don sur Tipeee
                </a>
              )}
              <button
                onClick={() => setStep('claim')}
                className="cursor-pointer rounded-xl border-2 border-quizz-yellow bg-white px-5 py-3"
              >
                J'ai fait un don
              </button>
              <button onClick={close} className="cursor-pointer rounded-xl border-2 border-gray-200 bg-white px-5 py-3">
                Continuer sans donner
              </button>
            </div>
          </>
        )}
        {step === 'claim' && <ClaimForm onDone={() => setStep('sent')} />}
        {step === 'sent' && (
          <>
            <p>
              Merci beaucoup ! Je vérifie ton don sur Tipeee et j'active ton accès dans les prochains jours. Tu n'as rien
              d'autre à faire.
            </p>
            <button onClick={close} className="cursor-pointer rounded-xl bg-quizz-yellow px-5 py-3 font-bold text-quizz-dark">
              Continuer la discussion
            </button>
          </>
        )}
      </div>
    </QuizzModal>
  );
};

export default ModalDonation;
