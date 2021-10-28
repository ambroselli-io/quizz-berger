import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Podium = ({ candidatesScore }) => {
  const [podiumised, setPodiumised] = useState([]);

  useEffect(() => {
    setPodiumised(
      candidatesScore
        ?.reduce((candidates, candidate) => {
          const sameTotal = candidates.find((c) => c.total === candidate.total);
          if (!!sameTotal) {
            return candidates.map((c) =>
              c._id !== sameTotal._id
                ? c
                : {
                    ...c,
                    pseudos: [...c.pseudos, candidate.pseudo].sort((pseudo1, pseudo2) =>
                      pseudo1.localeCompare(pseudo2)
                    ),
                  }
            );
          } else {
            return [
              ...candidates,
              {
                ...candidate,
                pseudos: [candidate.pseudo],
              },
            ];
          }
        }, [])
        .reduce((sorted, c, index) => {
          if (index === 1) return [c, ...sorted];
          return [...sorted, c];
        }, [])
        .map((c) => ({ ...c, height: Math.round((c.total / c.totalMax) * 100) }))
    );
  }, [candidatesScore]);

  console.log({ podiumised });

  return (
    <Background>
      <PodiumStairs>
        {podiumised.map(({ pseudos, height }) => (
          <Stair key={height} height={height}>
            <span>{height}%</span>
            <span dangerouslySetInnerHTML={{ __html: pseudos.join(",<br/>") }} />
          </Stair>
        ))}
      </PodiumStairs>
    </Background>
  );
};

const PodiumStairs = styled.div`
  align-items: flex-end;
  height: 100%;
`;

const Stair = styled.div`
  height: ${(props) => props.height}%;
  background-color: rgba(205, 127, 50, ${(props) => props.height / 100});
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  > span:first-of-type {
    font-size: ${(props) => (props.height / 100) * 3}em;
  }
`;

const Background = styled.section`
  height: 60vh;
  display: flex;
  flex-direction: column;
  span {
    width: 100%;
    text-align: center;
    word-break: keep-all;
    margin-bottom: 15px;
  }
  > div {
    display: flex;
    flex-wrap: nowrap;
    flex-grow: 1;
    padding-left: max(10px, calc((100vw - 1024px) / 2));
    padding-bottom: 16px; // scrollbar
    overflow-x: auto;
    > * {
      flex-shrink: 0;
      flex-grow: 0;
      width: calc(min(100vw, 1024px) / 3.5);
    }
    > *:nth-of-type(1) {
      width: calc(min(100vw, 1024px) / 3.4);
      background-color: silver;
    }
    > *:nth-of-type(2) {
      width: calc(min(100vw, 1024px) / 3);
      background-color: gold;
    }
    > *:nth-of-type(3) {
      width: calc(min(100vw, 1024px) / 3);
      background-color: #cd7f32;
    }
  }
`;

export default Podium;
