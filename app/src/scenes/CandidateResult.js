import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import API from "../services/api";
import { media } from "../styles/mediaQueries";

const CandidateResult = ({ quizz }) => {
  const { candidateId } = useParams();
  const [candidateAnswers, setCandidateAnswers] = useState({});

  const getAnswers = async () => {
    const response = await API.getWithCreds({
      path: "/answer/candidates",
    });

    if (response.ok) {
      const getCandidateAnswers = response.data.find((c) => c._id === candidateId);
      setCandidateAnswers(getCandidateAnswers);
    }
  };

  useEffect(() => {
    getAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!candidateAnswers?.pseudo)
    return (
      <BackgroundContainer>
        <span>Chargement</span>
      </BackgroundContainer>
    );

  return (
    <>
      <BackgroundContainer>
        <SubContainer>
          <Title>Voici les résultats de {candidateAnswers?.pseudo}</Title>
          <SubTitle>
            Vous pouvez voir en rouge tous les résultats de {candidateAnswers?.pseudo}
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
                        {question.answers.map((answer, answerIndex) => (
                          <Answer
                            key={answer}
                            isActive={candidateAnswers?.answers?.find(
                              (a) =>
                                a.themeId === theme._id &&
                                a.questionId === question._id &&
                                a.answerIndex === answerIndex
                            )} // find matching candidate answer
                          >
                            {answerIndex + 1}. {answer}{" "}
                          </Answer>
                        ))}
                      </ol>
                    </details>
                  ))}
                </div>
              </details>
            );
          })}
        </SubContainer>
      </BackgroundContainer>{" "}
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
  max-width: 1200px;
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
  margin-bottom: 40px;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  color: #111827;
`;

const Answer = styled.li`
  color: ${(props) => (props.isActive ? "red" : "black")};
`;

export default CandidateResult;
