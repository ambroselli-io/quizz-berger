import React, { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import styled from "styled-components";
import useSWR from "swr";
import API from "../services/api";

export default function Chart() {
  const { data: chartsData } = useSWR(API.getUrl("/result/charts"));
  const cumulativeUsers = useMemo(() => chartsData?.data || [], [chartsData]);

  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={cumulativeUsers}
          margin={{
            top: 10,
            right: 30,
            left: 0,
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
}

const Container = styled.div`
  width: 100%;
  height: 80vh;
  padding: 3rem;
`;

const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y}) scale(0.7)`}>
    <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
      {payload.value}
    </text>
  </g>
);
