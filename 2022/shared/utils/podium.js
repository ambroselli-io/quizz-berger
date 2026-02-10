exports.getMaxPersons = (podiumised) =>
  podiumised.reduce((maxPersons, step) => Math.max(step.pseudos?.length, maxPersons), 0);

exports.getPicName = (podiumised) =>
  podiumised
    .filter((_, i) => i < 6)
    .map((data) => `${data.percent}${data.pictures.map((pic) => pic.slice(0, 2)).join("")}`)
    .join("");

exports.getPodium = (personsScore, fullHeight) =>
  personsScore
    .reduce(
      ([candidates, highest], candidate) => {
        const newHighest = Math.max(highest, candidate.total || 0);
        const sameTotal = candidates.find((c) => c.total === candidate.total);
        if (!!sameTotal) {
          return [
            candidates.map((c) =>
              c._id !== sameTotal._id
                ? c
                : {
                    ...c,
                    pseudos: [...c.pseudos, candidate.pseudo].sort((pseudo1, pseudo2) =>
                      pseudo1.localeCompare(pseudo2)
                    ),
                    pictures: [...c.pictures, candidate.picture].sort((pseudo1, pseudo2) =>
                      pseudo1.localeCompare(pseudo2)
                    ),
                    colors: [...c.colors, candidate.color].sort((pseudo1, pseudo2) =>
                      pseudo1.localeCompare(pseudo2)
                    ),
                  }
            ),
            newHighest,
          ];
        } else {
          return [
            [
              ...candidates,
              {
                ...candidate,
                pseudos: [candidate.pseudo],
                pictures: [candidate.picture],
                colors: [candidate.color],
              },
            ],
            newHighest,
          ];
        }
      },
      [[], 0]
    )
    .reduce((onlyCandidates, item, index) => {
      if (index === 0) return item;
      return onlyCandidates.map((c) => ({ ...c, highest: item }));
    }, [])
    .map((c) => {
      return {
        ...c,
        percent: c.totalMax === 0 ? 0 : Math.round((c.total / c.totalMax) * 100),
        height:
          c.totalMax === 0
            ? 0
            : Math.round((c.total / (fullHeight ? c.highest : c.totalMax)) * 100),
      };
    })
    .sort((c1, c2) => (c1.percent > c2.percent ? -1 : 1));
