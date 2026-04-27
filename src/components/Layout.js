import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children, search, setSearch, user }) {
  return (
    <>
      <Header search={search} setSearch={setSearch} user={user} />

      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </>
  );
}