import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import type { PodiumDataWithPercentAndHeightAndHighest } from '@api/src/types/answer';

import { getMaxPersons } from '~/shared/utils/podium';

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const onChange = () => setIsSmall(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isSmall;
}

const IMAGE_BASE_URL = '/';

interface PodiumProps {
  podiumised: PodiumDataWithPercentAndHeightAndHighest[];
  title?: string;
}

const Podium = ({ podiumised, title }: PodiumProps) => {
  const maxPersons = useMemo(() => getMaxPersons(podiumised), [podiumised]);
  const isSmall = useIsSmallScreen();
  const heightMultiplier = isSmall ? 1.2 : 2;

  return (
    <div
      className={`flex h-full shrink-0 flex-col overflow-y-visible ${title ? 'mt-12 border-b border-gray-200 pb-2.5 max-lg:mt-6' : ''}`}
    >
      {title && (
        <h3 className="mb-5 pl-[max(10px,calc((100%-1024px)/2))] text-left font-[Merriweather] text-xl font-bold text-quizz-dark">
          {title}
        </h3>
      )}
      <div className="flex h-full grow flex-nowrap items-end overflow-x-auto pb-4 pl-[max(10px,calc((100%-1024px)/2))]">
        {podiumised.map(({ pseudos, pictures, height, percent, colors }, index) => (
          <div
            key={height + pseudos.join(',')}
            className="mx-[3px] flex h-full shrink-0 grow-0 flex-col items-stretch justify-end overflow-y-visible"
            style={{ width: `calc(min(100%, 350px) / ${index < 3 ? (index === 1 ? 3.4 : 3) : 3.5})` }}
          >
            <div className="flex h-full flex-col justify-end">
              <div className="relative mb-1 flex items-center justify-center">
                {pictures.filter(Boolean).map((pic, i) => (
                  <img
                    key={pic}
                    src={`${IMAGE_BASE_URL}${pic}`}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 object-cover max-lg:h-7 max-lg:w-7 [&:not(:last-of-type)]:-mr-4"
                    style={{ borderColor: colors[i] ?? undefined, backgroundColor: colors[i] ?? undefined }}
                  />
                ))}
              </div>
              <div
                className="relative flex flex-col items-start justify-around overflow-hidden rounded-t-lg"
                style={{
                  height: `${Math.max(height * heightMultiplier, 20)}px`,
                  backgroundColor:
                    index === 0
                      ? 'gold'
                      : index === 1
                        ? 'silver'
                        : index === 2
                          ? '#cd7f32'
                          : `rgba(205, 127, 50, ${height / 100})`,
                }}
              >
                <span
                  className="w-full text-center"
                  style={{ fontSize: `${Math.max((percent / 100) * 2.5, 0.75)}em` }}
                >
                  {percent}%
                </span>
              </div>
            </div>
            <span
              className="mt-1 shrink-0 overflow-auto text-center leading-3"
              style={{ height: `${Math.min(Math.max(maxPersons, 2), 3.2)}em` }}
            >
              {pseudos.map((pseudo) => (
                <span key={pseudo}>
                  <Link
                    to={`/all-questions/${pseudo}`}
                    className="cursor-pointer text-[0.65rem] hover:font-bold hover:underline max-lg:text-[0.55rem]"
                  >
                    {pseudo}
                  </Link>
                  <br />
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podium;
