import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Head from "next/head";
import Loader from "../../components/Loader";
import { media } from "../../styles/mediaQueries";
import getUserThemes from "../../utils/getUserThemes";
import useUser from "../../hooks/useUser";
import { quizz, quizzDownload } from "../../utils/quizz";
import useUserAnswers from "../../hooks/useUserAnswers";
import useCandidates from "../../hooks/useCandidates";
import useFriends from "../../hooks/useFriends";

const AllQuestions = () => {
  const router = useRouter();
  const { candidatePseudo } = router.query;
  const forCandidate = !!candidatePseudo;
  const { user } = useUser();
  const { userAnswers } = useUserAnswers();
  const { candidates } = useCandidates();
  const { friends } = useFriends();

  const [candidateAnswers, setCandidatesAnswers] = useState([]);
  const [userThemes, setUserThemes] = useState([]);

  const userAnswersId = userAnswers.map((a) => a.questionId);

  const [isLoading, setIsLoading] = useState(router.asPath !== "/all-questions");

  const downloadQuizz = () => {
    var dataStr = "data:text/text;charset=utf-8," + encodeURIComponent(quizzDownload);
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "quizz-du-berger_elections_presidentielles_2022_questions.txt");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  useEffect(() => {
    setUserThemes(getUserThemes(userAnswers));
  }, [userAnswers.length]);

  useEffect(() => {
    if (!!candidatePseudo) setCandidatesAnswers([...candidates, ...friends].find((c) => c.pseudo === candidatePseudo));
  }, [candidates.length, friends.length, candidatePseudo]);

  useEffect(() => {
    setIsLoading(forCandidate && !candidateAnswers?.pseudo);
  }, [forCandidate, candidateAnswers?.pseudo]);

  return (
    <>
      <Head>
        <title>Toutes les questions | Le Quizz du Berger</title>
      </Head>
      <BackgroundContainer mobile>
        <SubContainer>
          <Title>Cet écran n'est disponible que sur ordinateur, désolé !</Title>
        </SubContainer>
      </BackgroundContainer>
      <BackgroundContainer>
        <SubContainer>
          <Title>Toutes les questions</Title>
          <SubTitle>
            {!forCandidate ? (
              <>
                Vous pouvez voir ici toutes les questions, et les télécharger en{" "}
                <span onClick={downloadQuizz}>cliquant ici</span>. Si vous avez une remarque à faire, ou une question à
                ajouter, contactez-nous !
              </>
            ) : (
              <>
                Vous pouvez voir en rouge tous les résultats de <strong>{candidateAnswers?.pseudo}</strong>
                {user?._id ? ", et en encadré vos résultats." : "."}
              </>
            )}
          </SubTitle>
          {quizz.map((theme, index) => (
            <details open={forCandidate && (!userThemes.length || userThemes.includes(theme._id))} key={theme._id}>
              <ThemeTitle backgroundColor={theme.backgroundColor}>
                <h3>
                  {"ABCDEFGHIJKLMNOPQRST"[index]} - {theme.fr}
                </h3>
              </ThemeTitle>
              <div>
                {theme.questions.map((question, questionIndex) => (
                  <details
                    open={forCandidate && (!userAnswersId.length || userAnswersId.includes(question._id))}
                    key={question._id}
                  >
                    <QuestionTitle backgroundColor={theme.backgroundColor}>
                      <h4>
                        {"ABCDEFGHIJKLMNOPQRST"[index]}
                        {questionIndex + 1} - {question.fr}
                      </h4>
                    </QuestionTitle>
                    <ol>
                      {question.answers.map((answer, answerIndex) => {
                        const isSameAnswer = (a) =>
                          a.themeId === theme._id && a.questionId === question._id && a.answerIndex === answerIndex;
                        return (
                          <React.Fragment key={answer}>
                            <Answer
                              isUserAnswer={forCandidate && !!userAnswers.find(isSameAnswer)}
                              isCandidateAnswer={forCandidate && !!candidateAnswers?.answers?.find(isSameAnswer)}
                            >
                              {answerIndex + 1}. {answer}{" "}
                            </Answer>
                            <br />
                          </React.Fragment>
                        );
                      })}
                    </ol>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </SubContainer>
      </BackgroundContainer>
      <Loader isLoading={isLoading} withBackground size="15vh" />
    </>
  );
};

const BackgroundContainer = styled.div`
  padding: 40px 10px 40px 10px;
  height: calc(100vh - 80px);
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
  overflow-y: scroll;
  ${(props) => props.mobile && "display: none;"}
  ${media.mobile`
  ${(props) => props.mobile && "display: flex;"}
  padding: 40px 10px 40px 10px;
  height: auto;
  min-height: 900px;
  `}

  details {
    margin-bottom: 20px;
    width: 1024px;
  }

  summary {
    margin-bottom: 20px;
  }

  h2 {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  ol {
    margin-left: 30px;
    margin-bottom: 5px;
    font-size: 15px;
    list-style-type: none;
  }
  li {
    margin-left: 30px;
    margin-bottom: 5px;
  }
`;

const ThemeTitle = styled.summary`
  h3 {
    font-size: 20px;
    font-weight: bold;
    display: inline;
    cursor: pointer;
    &::after {
      position: absolute;
      left: 0;
      right: 0;
      content: "";
      height: 10px;
      background-color: ${(props) => props.backgroundColor}aa;
      bottom: -7px;
      transform: skew(-18deg) rotate3d(1, 1, 1, -1deg);
    }
  }
`;

const QuestionTitle = styled.summary`
  margin-left: 20px;
  h4 {
    font-size: 16px;
    display: inline;
    cursor: pointer;
    &::after {
      position: absolute;
      left: 0;
      right: 0;
      content: "";
      height: 5px;
      background-color: ${(props) => props.backgroundColor}aa;
      bottom: -3px;
      transform: skew(18deg) rotate3d(1, 0.2, 0.2, 1deg);
    }
  }
`;

const SubContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #111827;
`;

const SubTitle = styled.h3`
  margin-bottom: 40px !important;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  color: #111827;
  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Answer = styled.li`
  display: inline-block;
  border: 2px solid black;
  padding-left: 10px;
  padding-right: 10px;
  border-width: ${(props) => (props.isUserAnswer ? "2px" : "0px")};
  color: ${(props) => (props.isCandidateAnswer ? "red" : "black")};
`;

export default AllQuestions;
