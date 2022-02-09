import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import Footer from "../components/Footer";
import ThemeButton, { ThemesButtonStyled } from "../components/ThemeButton";
import { quizz, quizzQuestions } from "../utils/quizz";
import { media } from "../styles/mediaQueries";
import useSWR from "swr";
import API from "../services/api";
import Podium from "../components/Podium";
import { colors, temoignages } from "../utils/temoignages";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath?.includes("result") && router.asPath?.split("/").length > 1) {
      router.push(router.asPath);
    }
    if (router.asPath?.includes("all-questions") && router.asPath?.split("/").length > 1) {
      router.push(router.asPath);
    }
  }, [router.asPath]);

  const themes = useMemo(() => [...quizz].sort(() => 0.5 - Math.random()));

  const themeForQuestion = themes[3];

  const [questionIndex, setQuestionIndex] = useState(() => Math.round(Math.random() * quizzQuestions.length));

  const question = quizzQuestions[questionIndex];

  const [random, setRandom] = useState(() => Math.round(Math.random() * 15));

  const { data: onboardingData } = useSWR(API.getUrl("/answer/random/for-onboarding", { random }));
  const randomUserData = useMemo(
    () => (onboardingData?.data ? onboardingData : { data: [], user: null }),
    [onboardingData]
  );
  const { data: countData } = useSWR(API.getUrl("/public/count"));
  const countUsers = useMemo(() => countData?.data?.countUsers || 0, [countData]);
  const countAnswers = useMemo(() => countData?.data?.countAnswers || 0, [countData]);

  return (
    <>
      <BackgroundContainer fixedHeight>
        <Container>
          <Title>QUI est mon candidat&nbsp;idéal&nbsp;?</Title>
          <QuizzButton onClick={() => router.push("/themes")}>Répondre au Quizz</QuizzButton>
          <SubTitle>
            Répondez de façon <strong>anonyme</strong> au Quizz&nbsp;du&nbsp;Berger pour connaître le ou les candidats
            qui se rapprochent le plus de vos idées, et
            <strong> faites&nbsp;votre&nbsp;choix&nbsp;!</strong>
            {/* Take our Political
              Compass test to find out which political group your best match is */}
          </SubTitle>
          <Link href="/login" passHref>
            <LoginLink>
              Vous avez enregistré vos résultats&nbsp;? <strong>Connectez&#8209;vous</strong>
            </LoginLink>
          </Link>
        </Container>
      </BackgroundContainer>
      <BackgroundContainer>
        <Title>Comment ça marche&nbsp;?</Title>
        <Demo>
          <div>
            <h3>
              <Number>1</Number>Commencez par un thème
            </h3>
            <Description>
              <b>{themes.length} thèmes </b>
              <br />
              <br />
              <small
                dangerouslySetInnerHTML={{
                  __html: `parmi lesquels :
                ${themes
                  .map((t, i) => t.fr)
                  .slice(0, 8)
                  .join(", ")}
                ...`,
                }}
              />
            </Description>
          </div>
          <DemoContent onClick={() => router.push("/themes")}>
            {themes.slice(0, 3).map((theme) => {
              return <ThemeButton key={theme._id} theme={theme} onClick={() => router.push("/themes")} />;
            })}
          </DemoContent>
        </Demo>
        <Demo>
          <div>
            <h3>
              <Number>2</Number>Répondez aux questions que vous voulez
            </h3>
            <Description>
              <b>{quizzQuestions.length} questions </b>
              <br />
              <br />
              <small>
                Mais seulement une suffit pour vous calculer vos résultats !<br />
                Utilisez les {quizzQuestions.length - 1} autres pour préciser votre pensée, si vous le voulez,
                thème&nbsp;après&nbsp;thème
              </small>
            </Description>
          </div>
          <DemoContent
            questions
            color={themeForQuestion.backgroundColor}
            onClick={() => setQuestionIndex(Math.round(Math.random() * quizzQuestions.length))}
          >
            <ThemeBackground backgroundColor={themeForQuestion.backgroundColor}>{themeForQuestion.fr}</ThemeBackground>
            <QuestionTitle>{question?.fr}</QuestionTitle>
            {!!question?.help && (
              <QuestionHelp href={question?.help} target="_blank">
                Cliquez <strong>ici</strong> pour en savoir plus
              </QuestionHelp>
            )}
            <AnswerContainer>
              {question?.answers.map((answer, index) => {
                return (
                  <AnswerButton isActive={false} key={index} data-index={index}>
                    {answer}
                  </AnswerButton>
                );
              })}
            </AnswerContainer>
          </DemoContent>
        </Demo>
        <Demo>
          <div>
            <h3>
              <Number>3</Number>
              Comparez votre pensée
              <br />à celle des candidats
            </h3>
            <Description>
              <b>Globalement et par thème</b>
              <br />
              <br />
              <small>
                Le classement général est une chose, celui thème par thème vous aidera à mieux choisir votre candidat,
                celui ou celle qui sera le plus proche de votre pensée complexe, en fonction de vos thèmes favoris.
              </small>
            </Description>
          </div>
          <DemoContent
            forResults
            color={randomUserData?.user?.color}
            onClick={() => setRandom(Math.round(Math.random() * 15))}
          >
            <PodiumContainer as="aside">
              <Podium
                podiumised={randomUserData.data}
                // noPadding
                fullHeight
                title={`Exemple: ${randomUserData?.user?.pseudo}`}
              />
            </PodiumContainer>
          </DemoContent>
        </Demo>
      </BackgroundContainer>
      <BackgroundContainer>
        <Title>
          <b>{countUsers}</b> quizz effectués
          <br />
          <br />
          <b>{countAnswers}</b> réponses données
          <br />
        </Title>
      </BackgroundContainer>
      <BackgroundContainer>
        <Title>Ils ont apprécié</Title>
        <Carousel>
          {temoignages.map(({ blockquote, figcaption }, index) => (
            <Figure key={index} color={colors[index]}>
              <blockquote dangerouslySetInnerHTML={{ __html: blockquote }} />
              <figcaption>{figcaption}</figcaption>
            </Figure>
          ))}
        </Carousel>
      </BackgroundContainer>
      <Footer />
    </>
  );
}

const Container = styled.div`
  max-width: 770px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    flex-shrink: 0;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: Merriweather;
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  line-height: 150%;
  text-align: center;
  ${media.mobile`
  font-size: 34px;
`}
`;

const SubTitle = styled.h3`
  margin-bottom: 40px;
  margin-top: 40px;
  font-family: Merriweather Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 1.25rem;
  line-height: 200%;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

const QuizzButton = styled.button`
  width: 240px;
  height: 65px;
  background: #facc15;
  border-radius: 55px;
  border: none;
  font-family: Merriweather Sans;
  font-weight: 600;
  font-size: 1rem;
  color: #111827;
  cursor: pointer;
`;

const LoginLink = styled.span`
  display: block;
  margin-top: 20px;
  font-family: Merriweather Sans;
  font-style: normal;
  font-weight: 300;
  line-height: 1.5em;
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
`;

const Demo = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* border: 1px solid black; */
  margin-top: 100px;
  &:nth-of-type(2n + 2) {
    flex-direction: row-reverse;
  }
  ${media.mobile`
    flex-direction: column !important;
    > * {
      margin-bottom: 15px;
    }
  `}
  width: 100%;
  > * {
    text-align: center;
    flex-basis: 40%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > *:first-of-type {
    flex-direction: column;
  }
`;

const Description = styled.p`
  margin-top: 15px;
  text-align: center;
  small {
    display: block;
    /* width: 50%; */
    max-width: 50ch;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Number = styled.span`
  height: 2rem;
  width: 2rem;
  border-radius: 2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  background: #facc15;
  color: #111827;
`;

const DemoContent = styled.div`
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  > ${ThemesButtonStyled}:not(:last-of-type) {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  ${(props) => props.questions && questionsCss}
  ${(props) => props.forResults && resultsCss}
`;

const questionsCss = css`
  /* transform: scale(0.6); */
  flex-direction: column;
  border-radius: 1em;
  overflow: hidden;
  border: 1px solid ${(props) => props.color};
  font-size: 10px;
  max-width: 350px;
`;

const resultsCss = css`
  /* transform: scale(0.6); */
  flex-direction: column;
  border-radius: 1em;
  overflow: hidden;
  border: 1px solid ${(props) => props.color};
  font-size: 10px;
  max-width: 100%;
`;

const ThemeBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 8em;
  min-height: 5.6em;
  height: 6.785em;
  font-size: 1.25em;
  text-align: center;
  font-family: Merriweather;
  font-weight: bold;
  width: 100%;
  text-align: center;
  background-color: ${(props) => props.backgroundColor}CC;
`;

const QuestionTitle = styled.h2`
  margin: 1.25em;
  font-weight: 700;
  font-size: 1.5em;
  text-align: center;
`;

const QuestionHelp = styled.a`
  margin-top: -0.75em;
  margin-bottom: 1.25em;
  font-weight: 400;
  font-size: 0.75em;
  text-align: center;
  strong {
    text-decoration: underline;
  }
`;

const AnswerContainer = styled.div`
  max-width: 100%;
  display: flex;
  grid-gap: 1em;
  padding: 0.5em;
  flex-direction: column;
  align-items: center;
`;

const AnswerButton = styled.button`
  padding: 0.625em;
  min-height: 3.75em;
  font-size: 1em;
  background: ${(props) => (props.isActive ? `#111827` : `#ffffff`)};
  color: ${(props) => (props.isActive ? `#ffffff` : `black`)};
  border: 1px solid #e5e7eb;
  border-radius: 0.5em;
  width: 100%;
  cursor: pointer;
  :active,
  :hover {
    background: #111827;
    color: white;
  }
`;

const PodiumContainer = styled.div`
  height: 50vh;
  overflow-y: visible;
`;

const BackgroundContainer = styled.section`
  padding: 40px 20px 40px 20px;
  ${(p) => (p.fixedHeight ? "height" : "min-height")}: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${media.mobile`
  padding: 40px 10px 40px 10px;
  min-height: 570px;
  ${(p) => (p.fixedHeight ? "height" : "min-height")}: calc(100vh - 60px);
  `}
  &:nth-of-type(2n+1) {
    background-color: #111827;
    ${Title} {
      color: #ffffff;
    }
  }
  &:nth-of-type(2n + 2) {
    background-color: #ffffff;
    ${Title} {
      color: #111827;
    }
  }
`;

const Carousel = styled.div`
  margin-top: 15px;
  scroll-snap-type: x mandatory;
  width: 100%;
  padding-left: 10vw;
  display: flex;
  align-items: center;
  overflow: scroll;
  figure {
    scroll-snap-align: start;
    margin-right: 80px;
    width: 250px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: 80vw;
  }
  figure:nth-of-type(2n + 2) {
    margin-top: 30px;
  }
  figure:nth-of-type(2n + 3) {
    width: 300px;
  }
  blockquote {
    border: 1px solid #ddd;
    padding: 25px 50px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  figcaption {
    font-style: italic;
  }
`;

const Figure = styled.figure`
  blockquote {
    border-color: ${(p) => p.color} !important;
  }
`;
