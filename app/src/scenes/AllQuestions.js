import React from "react";
import styled from "styled-components";
import { media } from "../styles/mediaQueries";

const AllQuestions = ({ quizz }) => (
  <>
    <BackgroundContainer>
      <SubContainer>
        <Title>Toutes les questions</Title>
        <SubTitle>
          Vous pouvez voir ici toutes les questions, si vous avez une remarque à faire, ou une
          question à ajouter, contactez-nous !
        </SubTitle>
        {quizz.map((theme) => (
          <details key={theme._id}>
            <summary>{theme.fr}</summary>
            <div>
              {theme.questions.map((question) => (
                <details key={question._id}>
                  <summary>{question.fr}</summary>
                  <ol>
                    {question.answers.map((answer) => (
                      <li key={answer}>{answer}</li>
                    ))}
                  </ol>
                </details>
              ))}
            </div>
          </details>
        ))}
      </SubContainer>
    </BackgroundContainer>
  </>
);

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
    margin-bottom: 50px;
    width: 100%;
  }

  details > summary {
    font-size: 1.5em;
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
    margin-bottom: 15px;
  }
  li {
    margin-bottom: 5px;
  }
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

export default AllQuestions;
