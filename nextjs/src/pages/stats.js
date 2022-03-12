import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import API from "../services/api";

export default function Stats({ cumulativeUsers, cumulativeAnswers, countUsers, countAnswers }) {
  return (
    <>
      <Subtitle>Nombre cumulé d'utilisateurs: {countUsers}</Subtitle>
      <Chart data={cumulativeUsers} />
      <Subtitle>Nombre cumulé de réponses: {countAnswers}</Subtitle>
      <Chart data={cumulativeAnswers} />
    </>
  );
}

const Chart = ({ data }) => (
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
        <Area type="monotone" dataKey="cumulative" stroke="#111827" fill="#facc15" />
      </AreaChart>
    </ResponsiveContainer>
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: 80vh;
  padding: 3rem;
`;

const Subtitle = styled.h2`
  margin: 3rem 3rem 0;
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
  const countData = await API.get({ path: "/public/count" });

  return {
    props: {
      cumulativeUsers: chartData.data.users,
      cumulativeAnswers: chartData.data.answers,
      countUsers: countData.data.countUsers,
      countAnswers: countData.data.countAnswers,
    },
  };
};
