/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { getMaxPersons } from "quizz-du-berger-shared";

const Podium = ({ podiumised, noPadding, title, fullHeight = true }) => {
  const [withTitle, setWithTitle] = useState(!!title);
  useEffect(() => {
    setWithTitle(!!title);
  }, [title]);

  const maxPersons = useMemo(() => getMaxPersons(podiumised), [podiumised]);

  return (
    <>
      <Background noPadding={noPadding} withTitle={withTitle}>
        {!!withTitle && <Title>{title}</Title>}
        <PodiumStairs>
          {podiumised.map(({ pseudos, pictures, height, percent, colors }) => (
            <React.Fragment key={height + pseudos.join(",")}>
              <Step>
                <StairContainer>
                  <Stair stairHeight={height} percent={percent}>
                    <span>{percent}%</span>
                  </Stair>
                  <Avatars stairHeight={height}>
                    {pictures.filter(Boolean).map((pic, index) => (
                      <Avatar
                        key={pic}
                        candidateColor={colors[index]}
                        src={`https://quizz-du-berger-pictures.cellar-c2.services.clever-cloud.com/${pic}`}
                      />
                    ))}
                  </Avatars>
                </StairContainer>
                <Pseudos maxPersons={maxPersons}>
                  {pseudos.map((pseudo) => (
                    <React.Fragment key={pseudo}>
                      <Link href={`/all-questions/${pseudo}`} passHref>
                        <Candidate>{pseudo}</Candidate>
                      </Link>
                      <br />
                    </React.Fragment>
                  ))}
                </Pseudos>
              </Step>
            </React.Fragment>
          ))}
        </PodiumStairs>
      </Background>
    </>
  );
};

const Background = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: visible;

  ${(props) => props.withTitle && "margin-top: 50px;"}
  ${(props) => props.withTitle && "border-bottom: 1px solid #ddd;"}
  ${(props) => props.withTitle && "padding-bottom: 10px;"}
  span {
    width: 100%;
    text-align: center;
    word-break: keep-all;
    margin-bottom: 15px;
  }
`;

const StairContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Stair = styled.div`
  height: calc(${(props) => props.stairHeight}% - 20px);
  background-color: rgba(205, 127, 50, ${(props) => props.stairHeight / 100});
  display: flex;
  flex-direction: column;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  justify-content: space-around;
  align-items: flex-start;
  overflow: hidden;
  /* > span:first-of-type {
    font-size: min(1em, ${(props) => Math.max((props.percent / 100) * 2.5, 0.75)}em);
  } */
  > span:first-of-type {
    font-size: min(10vw, ${(props) => Math.max((props.percent / 100) * 2.5, 0.75)}em);
    word-break: keep-all;
  }
  &:after {
    content: "";
    width: 100%;
    height: 100px;
    /* border-radius: 50%; */
    background: linear-gradient(to bottom, #fff 0%, rgba(255, 255, 255, 0) 100%);
    position: absolute;
    transform: rotate(-18deg);
    left: -25px;
    top: -80px;
  }
`;

const stairWidth = 350;

const PodiumStairs = styled.div`
  flex-direction: row;
  align-items: flex-end;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
  padding-left: max(10px, calc((100% - 1024px) / 2));
  ${(props) => props.noPadding && "padding-left: 0;"}
  padding-bottom: 16px; // scrollbar
  overflow-x: auto;
  > * {
    flex-shrink: 0;
    flex-grow: 0;
    width: calc(min(100%, ${stairWidth}px) / 3.5);
  }
  > *:nth-of-type(1) {
    width: calc(min(100%, ${stairWidth}px) / 3);
    ${Stair} {
      background-color: gold;
    }
  }
  > *:nth-of-type(2) {
    width: calc(min(100%, ${stairWidth}px) / 3.4);
    ${Stair} {
      background-color: silver;
    }
  }
  > *:nth-of-type(3) {
    width: calc(min(100%, ${stairWidth}px) / 3);
    ${Stair} {
      background-color: #cd7f32;
    }
  }
`;

const Pseudos = styled.span`
  height: ${(props) => Math.min(Math.max(props.maxPersons, 2), 3.2)}em;
  line-height: 0.75em;
  flex-shrink: 0;
  margin-top: 5px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Chrome, Safari and Opera */
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Step = styled.div`
  margin-left: 3px;
  margin-right: 3px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  height: 100%;
  overflow-y: visible;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 20px;
  color: #111827;
  text-align: left;
  padding-left: max(10px, calc((100% - 1024px) / 2));
`;

const Candidate = styled.span`
  cursor: pointer;
  font-size: 0.65rem;
  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }
`;

const Avatars = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: calc(${(props) => props.stairHeight}% - 40px);
  left: 0;
  right: 0;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  border: 2px solid ${(props) => props.candidateColor};
  background-color: ${(props) => props.candidateColor};
  :not(:last-of-type) {
    margin-right: -15px;
  }
`;

export default Podium;
