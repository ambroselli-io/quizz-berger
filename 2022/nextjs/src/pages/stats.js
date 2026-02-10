import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Line,
} from "recharts";
import styled from "styled-components";
import API from "../services/api";
import { media } from "../styles/mediaQueries";

export default function Stats({
  cumulativeUsers,
  cumulativeAnswers,
  countUsers,
  countAnswers,
  maxUsersOnADay,
  answersPerUser,
  answersPerUserAverage,
  answersPerUserPerDay,
  answersPerTheme,
  usersPerHour,
  today,
  projection,
}) {
  return (
    <>
      <Subtitle>Nombre cumulé d'utilisateurs: {countUsers}</Subtitle>
      <MiniSubtitle>Aujourd'hui: {today}</MiniSubtitle>
      <MiniSubtitle>Projection: {projection}</MiniSubtitle>
      <MiniSubtitle>Max: {maxUsersOnADay}</MiniSubtitle>
      <LineAreaChart
        data={cumulativeUsers.filter((c) => c._id > "2022-03-07")}
        dataKey="cumulative"
        secondaryDataKey="count"
      />
      <Subtitle>Utilisateurs par heure</Subtitle>
      <AllCharts data={usersPerHour} barKey="count" areaKey="cumulative" lineKey="today" />
      {/* <Subtitle>Nombre de réponses par utilisateur par jour</Subtitle>
      <AllCharts data={answersPerUserPerDay} barKey="percentageQuizz" lineKey="users" areaKey="percentageQuizz" /> */}
      <Subtitle>Nombre cumulé de réponses: {countAnswers}</Subtitle>
      <Chart data={cumulativeAnswers} dataKey="cumulative" />
      <Subtitle>Popularité des thèmes</Subtitle>
      <BarChartWithData data={answersPerTheme} dataKey="value" />
      <Subtitle>Nombre moyen de réponses par utilisateur {answersPerUserAverage}</Subtitle>
      <BarChartWithData data={answersPerUser} dataKey="totalUsers" />
    </>
  );
}

const Chart = ({ data, dataKey }) => (
  <Container>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 30,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey} stroke="#111827" fill="#facc15" />
      </AreaChart>
    </ResponsiveContainer>
  </Container>
);

const LineAreaChart = ({ data, dataKey, secondaryDataKey }) => (
  <Container>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 30,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" tick={<CustomizedAxisTick />} />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Area type="monotone" yAxisId="left" dataKey={dataKey} stroke="#111827" fill="#facc15" />
        <Line type="monotone" yAxisId="right" dataKey={secondaryDataKey} stroke="#111827" />
      </ComposedChart>
    </ResponsiveContainer>
  </Container>
);

const BarChartWithData = ({ data, dataKey }) => (
  <Container>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} stroke="#111827" fill="#facc15" />
      </BarChart>
    </ResponsiveContainer>
  </Container>
);

const AllCharts = ({ data, barKey, lineKey, areaKey }) => (
  <Container>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 30,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="_id" tick={<CustomizedAxisTick />} />
        <YAxis visibility="hidden" display="none" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Area type="monotone" yAxisId="left" dataKey={areaKey} fill="#facc15" stroke="#facc15" />
        <Bar dataKey={barKey} yAxisId="right" barSize={20} fill="#6faea6" stroke="#111827" />
        {!!lineKey && <Line type="monotone" dataKey={lineKey} stroke="#111827" yAxisId="left" />}
      </ComposedChart>
    </ResponsiveContainer>
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: 80vh;
  padding: 3rem;
  ${media.mobile`padding: 0rem;`}
  ${media.mobile`height: 50vh;`}
  ${media.mobile`margin-top: 1rem;`}
`;

const Subtitle = styled.h2`
  margin: 3rem 3rem 0;
  ${media.mobile`margin: 2rem 1rem 0.25rem;`}
`;

const MiniSubtitle = styled.span`
  margin: 3rem 3rem 0;
  ${media.mobile`display: block;`}
  ${media.mobile`margin: 0 1rem;`}
`;

const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y}) scale(0.7)`}>
    <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
      {payload.value}
    </text>
  </g>
);

export const getServerSideProps = async (context) => {
  const chartData = await API.get({ path: "/public/charts" });

  return {
    props: {
      cumulativeUsers: chartData.data.cumulativeUsers,
      cumulativeAnswers: chartData.data.answers,
      countUsers: chartData.data.countUsers,
      countAnswers: chartData.data.countAnswers,
      answersPerUser: chartData.data.answersPerUser,
      answersPerUserAverage: chartData.data.answersPerUserAverage,
      answersPerUserPerDay: chartData.data.answersPerUserPerDay,
      answersPerTheme: chartData.data.answersPerTheme,
      usersPerHour: chartData.data.usersPerHour,
      today: chartData.data.today,
      projection: chartData.data.projection,
      maxUsersOnADay: chartData.data.maxUsersOnADay,
    },
  };
};
