import React from "react";
import Header from "./Header";

const Layout = ({ loading, setUser, user, children }) => {
  return (
    <>
      <Header loading={loading} setUser={setUser} user={user} />
      {children}
    </>
  );
};

export default Layout;
