import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children, search, setSearch, user }) {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header search={search} setSearch={setSearch} user={user} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: "220px", flexShrink: 0, height: "100%", overflowY: "auto" }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1, height: "100%", overflowY: "auto", overflowX: "hidden", background: "#f1f5f9" }}>
          {children}
        </div>
      </div>
    </div>
  );
}