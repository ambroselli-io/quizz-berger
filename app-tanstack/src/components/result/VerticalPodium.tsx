import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from '@app/lib/router';
import { candidateThumb } from '@app/utils/seo-light';
import type { PodiumDataWithPercentAndHeightAndHighest } from '@api/src/types/answer';

const MEDAL_COLORS = ['#facc15', '#cbd5e1', '#d6a067'];

interface VerticalPodiumProps {
  podiumised: Array<
    Pick<PodiumDataWithPercentAndHeightAndHighest, 'pseudos' | 'pictures' | 'colors' | 'percent'>
  >;
  title?: string;
  subtitle?: React.ReactNode;
  /** Query string of the candidate links, so /all-questions shows the questions this podium was computed on. */
  linkSearch?: Record<string, string | number>;
  visibleCount?: number;
}

export function Avatar({
  picture,
  color,
  size = 40,
}: {
  picture?: string | null;
  color?: string | null;
  size?: number;
}) {
  if (!picture) {
    return (
      <span
        className="inline-block shrink-0 rounded-full border-2 border-white"
        style={{ width: size, height: size, backgroundColor: color ?? '#9ca3af' }}
      />
    );
  }
  return (
    <img
      src={candidateThumb(picture)}
      width={size}
      height={size}
      alt=""
      loading="lazy"
      className="aspect-square shrink-0 rounded-full border-2 object-cover object-top"
      style={{
        width: size,
        height: size,
        borderColor: color ?? undefined,
        backgroundColor: color ?? undefined,
      }}
    />
  );
}

// Rows past `visibleCount` stay in the DOM (hidden), so the full ranking is there for the tests and the page search.
const VerticalPodium = ({
  podiumised,
  title,
  subtitle,
  linkSearch,
  visibleCount = 4,
}: VerticalPodiumProps) => {
  const [expanded, setExpanded] = useState(false);
  let rank = 1;
  const rows = podiumised.map((step) => {
    const row = { ...step, rank };
    rank += Math.max(step.pseudos.length, 1);
    return row;
  });

  return (
    <div>
      {title && <h3 className="mb-1 font-[Merriweather] text-xl font-bold text-quizz-dark">{title}</h3>}
      {subtitle && <p className="mb-3 text-sm text-gray-600">{subtitle}</p>}
      <ol className="flex flex-col gap-2">
        {rows.map(({ pseudos, pictures, colors, percent, rank }, index) => (
          <li
            key={pseudos.join(',') + percent}
            className={`items-center gap-3 rounded-xl border bg-white px-3 py-2 max-lg:gap-2 ${index >= visibleCount && !expanded ? 'hidden' : 'flex'}`}
            style={{ borderColor: colors[0] ? `${colors[0]}55` : '#e5e7eb' }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-quizz-dark"
              style={{ backgroundColor: MEDAL_COLORS[index] ?? '#f3f4f6' }}
            >
              {rank}
            </span>
            {/* Fixed width (two overlapping faces) so every bar starts at the same x; empty past two ex-aequo. */}
            <span className={`w-16 shrink-0 items-center ${pseudos.length > 2 ? 'hidden lg:flex' : 'flex'}`}>
              {pseudos.length <= 2 &&
                pseudos.map((pseudo, i) => (
                  <span key={pseudo} className={i > 0 ? '-ml-4' : ''}>
                    <Avatar picture={pictures[i]} color={colors[i]} size={40} />
                  </span>
                ))}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1 lg:flex-row lg:items-center lg:gap-4">
              <span className="min-w-0 text-sm font-semibold leading-tight lg:w-[260px] lg:shrink-0">
                {pseudos.map((pseudo, i) => (
                  <span key={pseudo}>
                    {i > 0 && ', '}
                    <Link
                      to={`/all-questions/${pseudo}`}
                      search={linkSearch}
                      className="text-quizz-dark underline decoration-gray-300 underline-offset-2 hover:decoration-quizz-dark"
                    >
                      {pseudo}
                    </Link>
                  </span>
                ))}
              </span>
              <span className="h-2.5 w-full flex-1 overflow-hidden rounded-full bg-gray-100">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${percent}%`, backgroundColor: colors[0] ?? '#111827' }}
                />
              </span>
            </span>
            <span className="w-12 shrink-0 text-right text-base font-bold text-quizz-dark">{percent}%</span>
          </li>
        ))}
      </ol>
      {rows.length > visibleCount && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mx-auto mt-3 flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {expanded ? (
            <>
              Voir moins <ChevronUp size={16} />
            </>
          ) : (
            <>
              Voir plus <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default VerticalPodium;
