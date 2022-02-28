import { css } from "styled-components";

const maxSizes = {
  mobile: 1000, // 1100 - 400 = tablet ?
};

// Iterate through the sizes and create a media template
export const media = Object.keys(maxSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${maxSizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const minSizes = {
  desktop: 1000, // 1100 - 400 = tablet ?
};

export const minMedia = Object.keys(minSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${minSizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
