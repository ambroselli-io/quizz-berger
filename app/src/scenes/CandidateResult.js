import React, { useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Loader from "../components/Loader";
import DataContext from "../contexts/data";
import UserContext from "../contexts/user";
import { media } from "../styles/mediaQueries";

const CandidateResult = () => {
  const { candidatePseudo } = useParams();
  const { user, userAnswers } = useContext(UserContext);
  const { candidates, quizz } = useContext(DataContext);

  const candidateAnswers = candidates.find((c) => c.pseudo === candidatePseudo);

  const isLoading = !candidateAnswers?.pseudo;

  return (
    <>
      <BackgroundContainer>
        <SubContainer>
          <Title>Voici les résultats de {candidateAnswers?.pseudo}</Title>
          <SubTitle>
            Vous pouvez voir en rouge tous les résultats de {candidateAnswers?.pseudo}
            {user?._id ? ", et en encadré vos résultats." : "."}
          </SubTitle>
          {quizz.map((theme, index) => {
            return (
              <details open key={theme._id}>
                <ThemeTitle>
                  {"ABCDEFGHIJKLMNOPQRST"[index]} - {theme.fr}
                </ThemeTitle>
                <div>
                  {theme.questions.map((question, questionIndex) => (
                    <details open key={question._id}>
                      <QuestionTitle>
                        {"ABCDEFGHIJKLMNOPQRST"[index]}
                        {questionIndex + 1} - {question.fr}
                      </QuestionTitle>
                      <ol>
                        {question.answers.map((answer, answerIndex) => {
                          const isSameAnswer = (a) =>
                            a.themeId === theme._id &&
                            a.questionId === question._id &&
                            a.answerIndex === answerIndex;
                          return (
                            <Answer
                              key={answer}
                              isUserAnswer={!!userAnswers.find(isSameAnswer)}
                              isCandidateAnswer={!!candidateAnswers?.answers?.find(isSameAnswer)}>
                              {answerIndex + 1}. {answer}{" "}
                            </Answer>
                          );
                        })}
                      </ol>
                    </details>
                  ))}
                </div>
              </details>
            );
          })}
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
  ${media.mobile`
  padding: 40px 10px 40px 10px;
  height: auto;
  min-height: 900px;
  `}

  details {
    margin-bottom: 20px;
    width: 1024px;
    width: 85vw;
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
  font-size: 20px;
  font-weight: bold;
`;

const QuestionTitle = styled.summary`
  margin-left: 20px;
  font-size: 16px;
`;

const SubContainer = styled.div`
  width: 1200px;
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const Answer = styled.li`
  border: 2px solid black;
  border-width: ${(props) => (props.isUserAnswer ? "2px" : "0px")};
  color: ${(props) => (props.isCandidateAnswer ? "red" : "black")};
`;

export default CandidateResult;
