import type { CandidacyStatus } from '@app/utils/candidacies';

const STYLES: Record<string, string> = {
  CANDIDAT: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  OUT: 'bg-red-100 text-red-800 ring-red-200',
  'ÉTAPE': 'bg-gray-100 text-gray-700 ring-gray-200',
  'PAS ENCORE': 'bg-amber-100 text-amber-900 ring-amber-200',
};

export const STATUS_TAG: Record<CandidacyStatus, keyof typeof STYLES> = {
  declared: 'CANDIDAT',
  withdrawn: 'OUT',
  potential: 'PAS ENCORE',
};

export default function CandidacyTag({ tag, className = '' }: { tag: string; className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ring-1 ring-inset ${STYLES[tag] || STYLES['ÉTAPE']} ${className}`}
    >
      {tag}
    </span>
  );
}
