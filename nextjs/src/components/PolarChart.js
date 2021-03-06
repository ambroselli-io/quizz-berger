/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Chart,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { media } from "../styles/mediaQueries";
import Link from "next/link";

Chart.register(PolarAreaController, RadialLinearScale, PointElement, LineElement, ArcElement);

const PolarChart = ({ candidate, selectedThemes, quizz }) => {
  const [isMounted, setIsMounted] = useState(false);

  const scores = candidate.scorePerThemes
    .filter((score) => selectedThemes.includes(score.themeId))
    .map((score) => score.percent);

  const themes = selectedThemes.map((themeId) => {
    return quizz.find((quizztheme) => quizztheme._id === themeId).fr;
  });

  const polarChartCanvasRef = useRef(null);
  const polarChartRef = useRef(null);

  useEffect(() => {
    if (isMounted) {
      const ctx = polarChartCanvasRef.current.getContext("2d");
      polarChartRef.current = new Chart(ctx, {
        type: "polarArea",
        data: {
          labels: themes,
          datasets: [
            {
              data: scores,
              backgroundColor: quizz
                .filter((theme) => selectedThemes.includes(theme._id))
                .map((t) => t.backgroundColor),
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: true,

          plugins: {
            legend: {
              display: true,
              position: "bottom",
              // onClick: true,
              labels: {
                usePointStyle: true,
                boxHeight: 5,
                pointStyle: "circle",
                font: {
                  size: 10,
                },
              },
            },
          },

          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100,
              grid: {
                lineWidth: 1,
              },
              ticks: {
                display: false,
              },
            },
          },
        },
      });
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, []);

  return (
    <>
      <ChartContainer>
        <Link href={`/quizz/${candidate?.pseudo}`} passHref>
          <CandidateTitle>{candidate?.pseudo}</CandidateTitle>
        </Link>
        <canvas ref={polarChartCanvasRef} width="400" height="400" />
      </ChartContainer>
    </>
  );
};

const ChartContainer = styled.div`
  * {
    user-select: text;
  }

  display: block;
  margin: 0 auto;
  padding: 40px;
  margin-bottom: 20px;
  width: 30vw;
  max-width: 400px;
  height: auto;
  /* border: 1px solid #e5e7eb; */
  ${media.mobile`
    width: 90vw;
    max-width: 400px;
    padding: 20px;
  `}
`;

const CandidateTitle = styled.h3`
  margin-bottom: 40px;
  font-family: Merriweather;
  font-weight: bold;
  font-size: 20px;
  color: #111827;
  text-align: center;
`;

export default PolarChart;
