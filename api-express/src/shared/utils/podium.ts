import type { MinimalUserAnswerWithScorePerThemeAndMax, PodiumData, PodiumDataWithPercentAndHeightAndHighest } from "~/types/answer";

export const getMaxPersons = (podiumised: Array<PodiumDataWithPercentAndHeightAndHighest>) =>
  podiumised.reduce((maxPersons, step) => Math.max(step.pseudos?.length, maxPersons), 0);

export const getPicName = (podiumised: Array<PodiumDataWithPercentAndHeightAndHighest>) =>
  podiumised
    .filter((_, i) => i < 6)
    .map((data) => `${data.percent}${data.pictures.map((pic: any) => pic.slice(0, 2)).join("")}`)
    .join("");

export const getPodium = (
  personsScore: Array<MinimalUserAnswerWithScorePerThemeAndMax>,
  fullHeight: boolean,
): Array<PodiumDataWithPercentAndHeightAndHighest> => {
  let highest = 0;
  let candidates: Array<PodiumData> = [];
  for (const candidate of personsScore) {
    const newHighest = Math.max(highest, candidate.total || 0);
    const sameTotal = candidates.find((c) => c.total === candidate.total);
    if (!!sameTotal) {
      candidates = candidates.map((c) =>
        c.id !== sameTotal.id
          ? c
          : {
              ...c,
              pseudos: [...c.pseudos, candidate.pseudo]
                .filter((p): p is string => p !== null)
                .sort((pseudo1, pseudo2) => pseudo1.localeCompare(pseudo2)),
              pictures: [...c.pictures, candidate.picture].filter((p): p is string => p !== null).sort((pic1, pic2) => pic1.localeCompare(pic2)),
              colors: [...c.colors, candidate.color].filter((c): c is string => c !== null).sort((color1, color2) => color1.localeCompare(color2)),
            },
      );
    } else {
      highest = newHighest;
      candidates = [
        ...candidates,
        {
          ...candidate,
          pseudos: candidate.pseudo !== null ? [candidate.pseudo] : [],
          pictures: candidate.picture !== null ? [candidate.picture] : [],
          colors: candidate.color !== null ? [candidate.color] : [],
        },
      ];
    }
  }

  return candidates
    .map((c) => {
      return {
        ...c,
        highest,
        percent: c.totalMax === 0 ? 0 : Math.round((c.total / c.totalMax) * 100),
        height: c.totalMax === 0 ? 0 : Math.round((c.total / (fullHeight ? highest : c.totalMax)) * 100),
      };
    })
    .sort((c1, c2) => (c1.percent > c2.percent ? -1 : 1));
};
