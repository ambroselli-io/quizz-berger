import React from "react";
import Header from "./Header";

const Layout = ({ loading, children }) => {
  return (
    <>
      <Header loading={loading} />
      {children}
    </>
  );
};

export default Layout;
