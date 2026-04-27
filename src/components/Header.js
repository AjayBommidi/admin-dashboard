import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ search, setSearch, user }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="header">

      {/* LEFT - LOGO */}
      <div className="logo" style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        🚗
        <div>
          <h2>BJR</h2>
          <p>Luxury Cars</p>
        </div>
      </div>

      {}
      <div className="search">
        <input
          type="text"
          placeholder="Search car name, model, price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {}
      <div
        className="right"
        onClick={handleProfileClick}
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        title="Click to view profile"
      >
        <span style={{ fontSize: "14px", color: "#e2e8f0" }}>
          {user?.name || "Guest"}
        </span>
        <span style={{ fontSize: "24px" }}>👤</span>
      </div>

    </div>
  );
}
