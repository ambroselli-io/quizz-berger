const HOST =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_HOST
    : `${process.env.REACT_APP_HOST}.${
        window.location.host.split(".")[window.location.host.split(".").length - 1]
      }`;
const SCHEME = process.env.REACT_APP_SCHEME;

// eslint-disable-next-line import/no-anonymous-default-export
export { HOST, SCHEME };
