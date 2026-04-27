import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: "🏠", label: "Dashboard" },
    { path: "/cars", icon: "🚗", label: "Cars" },
    { path: "/bookings", icon: "📦", label: "Bookings" },
    { path: "/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`menu-link ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
