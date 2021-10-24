import React, { useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Loader from "../components/Loader";
import DataContext from "../contexts/data";
import UserContext from "../contexts/user";
import API from "../services/api";
import { media } from "../styles/mediaQueries";

const getUserThemes = (userAnswers) => [
  ...userAnswers.reduce((themes, answer) => themes.add(answer.themeId), new Set()),
];

const AllQuestions = () => {
  const { candidatePseudo } = useParams();
  const forCandidate = !!candidatePseudo;
  const { user, userAnswers } = useContext(UserContext);
  const { candidates, quizz } = useContext(DataContext);

  const candidateAnswers = candidates.find((c) => c.pseudo === candidatePseudo);
  const userThemes = getUserThemes(userAnswers);
  const userAnswersId = userAnswers.map((a) => a.questionId);

  const isLoading = forCandidate && !candidateAnswers?.pseudo;

  return (
    <>
      <BackgroundContainer>
        <SubContainer>
          <Title>Toutes les questions</Title>
          <SubTitle>
            {!forCandidate ? (
              <>
                Vous pouvez voir ici toutes les questions, et les télécharger en{" "}
                <a href={API.getUrl("/quizz/download")} target="_blank" rel="noreferrer">
                  cliquant ici
                </a>
                . si vous avez une remarque à faire, ou une question à ajouter, contactez-nous !
              </>
            ) : (
              <>
                Vous pouvez voir en rouge tous les résultats de{" "}
                <strong>{candidateAnswers?.pseudo}</strong>
                {user?._id ? ", et en encadré vos résultats." : "."}
              </>
            )}
          </SubTitle>
          {quizz.map((theme, index) => (
            <details
              open={forCandidate && (!userThemes.length || userThemes.includes(theme._id))}
              key={theme._id}>
              <ThemeTitle backgroundColor={theme.backgroundColor}>
                <h3>
                  {"ABCDEFGHIJKLMNOPQRST"[index]} - {theme.fr}
                </h3>
              </ThemeTitle>
              <div>
                {theme.questions.map((question, questionIndex) => (
                  <details
                    open={
                      forCandidate &&
                      (!userAnswersId.length || userAnswersId.includes(question._id))
                    }
                    key={question._id}>
                    <QuestionTitle backgroundColor={theme.backgroundColor}>
                      <h4>
                        {"ABCDEFGHIJKLMNOPQRST"[index]}
                        {questionIndex + 1} - {question.fr}
                      </h4>
                    </QuestionTitle>
                    <ol>
                      {question.answers.map((answer, answerIndex) => {
                        const isSameAnswer = (a) =>
                          a.themeId === theme._id &&
                          a.questionId === question._id &&
                          a.answerIndex === answerIndex;
                        return (
                          <>
                            <Answer
                              key={answer}
                              isUserAnswer={forCandidate && !!userAnswers.find(isSameAnswer)}
                              isCandidateAnswer={
                                forCandidate && !!candidateAnswers?.answers?.find(isSameAnswer)
                              }>
                              {answerIndex + 1}. {answer}{" "}
                            </Answer>
                            <br />
                          </>
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
      <Loader isLoading={isLoading} withBackground />
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
  ${media.mobile`
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
  a {
    text-decoration: underline;
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
