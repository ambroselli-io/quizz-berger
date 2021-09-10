import React from "react";
import styled from "styled-components";
import { getPartysScores } from "../utils/score";

import Header from "../components/header";
import RadarChart from "../components/radarChart";

class Result extends React.Component {
  state = {
    userResults: [],
    politicalPartys: [],
    orderedPoliticalPartysResults: [],
  };

  componentDidMount() {
    this.getResult();
  }

  getResult = async () => {
    const response = await fetch("http://127.0.0.1:8080/user/result", {
      method: "GET",
      credentials: "include",
    }).then((res) => res.json());

    if (response.ok) {
      this.setState({
        userResults: response.data.userResults,
        politicalPartys: response.data.politicalPartys,
        orderedPoliticalPartysResults:
          response.data.orderedPoliticalPartyResults,
      });
    }
  };

  render() {
    const { userResults, politicalPartys, orderedPoliticalPartysResults } =
      this.state;

    console.log(
      getPartysScores(
        userResults,
        politicalPartys,
        orderedPoliticalPartysResults
      )
    );

    return (
      <>
        <Header />
        <BackgroundContainer>
          <Container>
            {/* Tab: un chart avec tous les partis */}
            <RadarChart
              data={getPartysScores(
                userResults,
                politicalPartys,
                orderedPoliticalPartysResults
              )}
            />
            {/* Tab: un chart par parti */}
          </Container>
        </BackgroundContainer>
      </>
    );
  }
}

const BackgroundContainer = styled.div`
  padding: 40px;
  min-height: 100vh;
  width: 100vw;
  background-color: #f7df1e;
`;

const Container = styled.div`
  margin: 0 auto;
  min-height: 500px;
  width: 500px;
  display: grid;
  grid-template-columns: auto;
`;

export default Result;
