/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Podium = ({ candidatesScore, noPadding, title, fullHeight = false }) => {
  const [podiumised, setPodiumised] = useState([]);

  useEffect(() => {
    setPodiumised(
      candidatesScore
        ?.sort((c1, c2) => (c1.total > c2.total ? -1 : 1))
        .reduce(
          ([candidates, highest], candidate) => {
            const newHighest = Math.max(highest, candidate.total);
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
                  },
                ],
                newHighest,
              ];
            }
          },
          [[], 0]
        )
        // .reduce((sorted, c, index) => {
        //   if (index === 1) return [c, ...sorted];
        //   return [...sorted, c];
        // }, [])
        .reduce((onlyCandidates, item, index) => {
          if (index === 0) return item;
          return onlyCandidates.map((c) => ({ ...c, highest: item }));
        }, [])
        .map((c) => ({
          ...c,
          percent: Math.round((c.total / c.totalMax) * 100),
          height: Math.round((c.total / (fullHeight ? c.highest : c.totalMax)) * 100),
        }))
        .sort((c1, c2) => (c1.percent > c2.percent ? -1 : 1))
    );
  }, [candidatesScore]);

  return (
    <Background noPadding={noPadding} withTitle={!!title}>
      {!!title && <Title>{title}</Title>}
      <PodiumStairs>
        {podiumised.reverse().map(({ pseudos, height, percent }) => (
          <Stair key={height} height={height} percent={percent}>
            <span>{percent}%</span>
            <span dangerouslySetInnerHTML={{ __html: pseudos.join(",<br/>") }} />
          </Stair>
        ))}
      </PodiumStairs>
    </Background>
  );
};

const Background = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  ${(props) => props.withTitle && "margin-top: 50px;"}
  ${(props) => props.withTitle && "border-bottom: 1px solid #ddd;"}
  ${(props) => props.withTitle && "padding-bottom: 10px;"}
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
    padding-left: max(10px, calc((100% - 1024px) / 2));
    ${(props) => props.noPadding && "padding-left: 0;"}
    padding-bottom: 16px; // scrollbar
    overflow-x: auto;
    overflow-y: hidden;
    > * {
      flex-shrink: 0;
      flex-grow: 0;
      width: calc(min(100%, 1024px) / 3.5);
    }
    > *:nth-of-type(1) {
      width: calc(min(100%, 1024px) / 3);
      background-color: gold;
    }
    > *:nth-of-type(2) {
      width: calc(min(100%, 1024px) / 3.4);
      background-color: silver;
    }
    > *:nth-of-type(3) {
      width: calc(min(100%, 1024px) / 3);
      background-color: #cd7f32;
    }
  }
`;

const PodiumStairs = styled.div`
  flex-direction: row;
  align-items: flex-end;
  height: 100%;
`;

const Stair = styled.div`
  height: ${(props) => props.height}%;
  background-color: rgba(205, 127, 50, ${(props) => props.height / 100});
  display: flex;
  flex-direction: column;
  margin-left: 3px;
  margin-right: 3px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  justify-content: space-around;
  align-items: flex-start;
  overflow: hidden;
  > span:first-of-type {
    font-size: min(1em, ${(props) => (props.percent / 100) * 3}em);
  }
  > span:first-of-type {
    font-size: min(10vw, ${(props) => (props.percent / 100) * 3}em);
    word-break: keep-all;
  }
  &:after {
    content: "";
    width: 100%;
    height: 60px;
    /* border-radius: 50%; */
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    position: absolute;
    transform: rotate(-18deg);
    left: -13px;
    top: -60px;
  }
`;

const Title = styled.h3`
  margin-bottom: 40px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 20px;
  color: #111827;
  text-align: center;
`;

export default Podium;
