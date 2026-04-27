import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CarDetails from "./pages/CarDetails";

function CarsPage() {
  const [cars] = useState([
    { id: 1, name: "BMW", model: "X5", price: "80L", priceValue: 8000000, status: "available" },
    { id: 2, name: "Audi", model: "A6", price: "70L", priceValue: 7000000, status: "available" },
    { id: 3, name: "Benz", model: "C-Class", price: "65L", priceValue: 6500000, status: "available" },
    { id: 4, name: "Tesla", model: "Model S", price: "90L", priceValue: 9000000, status: "available" },
    { id: 5, name: "Rolls Royce", model: "Phantom", price: "5Cr", priceValue: 50000000, status: "available" },
    { id: 6, name: "Lamborghini", model: "Huracan", price: "4Cr", priceValue: 40000000, status: "available" },
    { id: 7, name: "Ferrari", model: "488 GTB", price: "3.5Cr", priceValue: 35000000, status: "available" }
  ]);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(savedBookings);
  }, []);

  const getCarStatus = (carId) => {
    const today = new Date().toISOString().split("T")[0];
    const activeBooking = bookings.find(b => 
      b.carId === carId && b.status === "active" && b.endDate >= today
    );
    return activeBooking ? "booked" : "available";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Cars Management</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {cars.map((car) => {
          const status = getCarStatus(car.id);
          return (
            <div key={car.id} style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h3 style={{ margin: 0 }}>{car.name}</h3>
                <span style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  background: status === "available" ? "#d1fae5" : "#fee2e2",
                  color: status === "available" ? "#10b981" : "#ef4444"
                }}>
                  {status === "available" ? "✅ Available" : "🔒 Booked"}
                </span>
              </div>
              <p style={{ margin: "4px 0", color: "#64748b" }}>Model: {car.model}</p>
              <p style={{ margin: "4px 0", color: "#3b82f6", fontWeight: "bold" }}>{car.price}</p>
              <p style={{ margin: "4px 0", color: "#94a3b8", fontSize: "12px" }}>
                Daily Rate: ₹{(car.priceValue * 0.01).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    
    if (savedBookings.length === 0) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 5);
      const formatDate = (date) => date.toISOString().split("T")[0];
      
      const sampleBookings = [
        { id: 1001, carId: 1, customerName: "Rajesh Kumar", startDate: formatDate(yesterday), endDate: formatDate(tomorrow), bookingDate: formatDate(lastWeek), status: "active", totalAmount: 240000 },
        { id: 1002, carId: 3, customerName: "Priya Sharma", startDate: formatDate(today), endDate: formatDate(nextWeek), bookingDate: formatDate(yesterday), status: "active", totalAmount: 455000 },
        { id: 1003, carId: 5, customerName: "Amit Patel", startDate: formatDate(today), endDate: formatDate(tomorrow), bookingDate: formatDate(today), status: "active", totalAmount: 1000000 },
        { id: 1004, carId: 7, customerName: "Vikram Singh", startDate: formatDate(yesterday), endDate: formatDate(today), bookingDate: formatDate(lastWeek), status: "active", totalAmount: 700000 }
      ];
      localStorage.setItem("bookings", JSON.stringify(sampleBookings));
      savedBookings = sampleBookings;
    }
    
    setBookings(savedBookings);
  }, []);

  const cars = {
    1: { name: "BMW", model: "X5", priceValue: 8000000 },
    2: { name: "Audi", model: "A6", priceValue: 7000000 },
    3: { name: "Benz", model: "C-Class", priceValue: 6500000 },
    4: { name: "Tesla", model: "Model S", priceValue: 9000000 },
    5: { name: "Rolls Royce", model: "Phantom", priceValue: 50000000 },
    6: { name: "Lamborghini", model: "Huracan", priceValue: 40000000 },
    7: { name: "Ferrari", model: "488 GTB", priceValue: 35000000 }
  };

  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, status: "cancelled" } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const calculateTotal = (booking) => {
    const car = cars[booking.carId];
    if (!car) return 0;
    const days = Math.max(1, Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)));
    return car.priceValue * 0.01 * days;
  };

  const today = new Date().toISOString().split("T")[0];
  const activeBookings = bookings.filter(b => b.status === "active" && b.endDate >= today);
  const todayRevenue = activeBookings.reduce((sum, b) => sum + (calculateTotal(b) / Math.max(1, Math.ceil((new Date(b.endDate) - new Date(b.startDate)) / (1000 * 60 * 60 * 24)))), 0);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Bookings Management</h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ color: "#64748b" }}>Filter:</span>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd" }}
          >
            <option value="all">All Bookings</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "30px" }}>
        <div style={{ background: "#3b82f6", color: "white", padding: "20px", borderRadius: "10px" }}>
          <p style={{ margin: 0, fontSize: "14px" }}>Total Bookings</p>
          <h3 style={{ margin: "10px 0 0 0", fontSize: "28px" }}>{bookings.length}</h3>
        </div>
        <div style={{ background: "#10b981", color: "white", padding: "20px", borderRadius: "10px" }}>
          <p style={{ margin: 0, fontSize: "14px" }}>Active Bookings</p>
          <h3 style={{ margin: "10px 0 0 0", fontSize: "28px" }}>{activeBookings.length}</h3>
        </div>
        <div style={{ background: "#8b5cf6", color: "white", padding: "20px", borderRadius: "10px" }}>
          <p style={{ margin: 0, fontSize: "14px" }}>Today's Revenue</p>
          <h3 style={{ margin: "10px 0 0 0", fontSize: "28px" }}>₹{(todayRevenue).toLocaleString()}</h3>
        </div>
      </div>

      {}
      <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>ID</th>
              <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Customer</th>
              <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Car</th>
              <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Dates</th>
              <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Total</th>
              <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Status</th>
              <th style={{ padding: "15px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => {
                const car = cars[booking.carId];
                const total = calculateTotal(booking);
                return (
                  <tr key={booking.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "15px" }}>#{booking.id}</td>
                    <td style={{ padding: "15px" }}>
                      <strong>{booking.customerName}</strong>
                    </td>
                    <td style={{ padding: "15px" }}>
                      {car ? `${car.name} ${car.model}` : "Unknown Car"}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <span style={{ fontSize: "13px", color: "#64748b" }}>
                        {booking.startDate} to {booking.endDate}
                      </span>
                    </td>
                    <td style={{ padding: "15px", fontWeight: "bold", color: "#3b82f6" }}>
                      ₹{total.toLocaleString()}
                    </td>
                    <td style={{ padding: "15px" }}>
                      <span style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        background: booking.status === "active" ? "#d1fae5" : booking.status === "completed" ? "#dbeafe" : "#fee2e2",
                        color: booking.status === "active" ? "#10b981" : booking.status === "completed" ? "#3b82f6" : "#ef4444"
                      }}>
                        {booking.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: "15px" }}>
                      {booking.status === "active" && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          style={{
                            padding: "6px 12px",
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "12px"
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsPage({ user }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    company: "BJR Luxury Cars",
    role: "Administrator"
  });
  
  const [preferences, setPreferences] = useState({
    theme: "dark",
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    itemsPerPage: "10",
    autoRefresh: true,
    showRevenue: true,
    compactView: false
  });
  
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newBooking: true,
    bookingCancelled: true,
    paymentReceived: true,
    lowInventory: false,
    dailyReport: true,
    marketingEmails: false
  });
  
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginNotifications: true,
    sessionTimeout: "30",
    passwordLastChanged: "2024-03-15"
  });
  
  const [system, setSystem] = useState({
    timezone: "Asia/Kolkata",
    language: "English",
    backupEnabled: true,
    autoLogout: true
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "preferences", label: "Dashboard", icon: "⚙️" },
    { id: "notifications", label: " Notifications", icon: "🔔" },
    { id: "security", label: " Security", icon: "🔒" },
    { id: "system", label: " System", icon: "🖥️" }
  ];

  const cardStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "15px"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "500"
  };

  const toggleStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #f1f5f9"
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h2 style={{ margin: 0, color: "#1e293b" }}>Settings</h2>
        {saved && (
          <span style={{
            background: "#10b981",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            animation: "fadeIn 0.3s"
          }}>
            ✅ Settings Saved Successfully!
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Sidebar Tabs */}
        <div style={{ width: "250px", flexShrink: 0 }}>
          <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: "100%",
                  padding: "15px 20px",
                  border: "none",
                  background: activeTab === tab.id ? "#3b82f6" : "transparent",
                  color: activeTab === tab.id ? "white" : "#64748b",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: activeTab === tab.id ? "600" : "400",
                  borderLeft: activeTab === tab.id ? "4px solid #1d4ed8" : "4px solid transparent",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ marginRight: "10px" }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {}
          <div style={{ ...cardStyle, marginTop: "20px" }}>
            <h4 style={{ margin: "0 0 15px 0", color: "#1e293b" }}>📊 Quick Stats</h4>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              <p style={{ margin: "8px 0" }}>Last Login: <strong>Today</strong></p>
              <p style={{ margin: "8px 0" }}>Role: <strong>{profile.role}</strong></p>
              <p style={{ margin: "8px 0" }}>Member Since: <strong>Apr 2024</strong></p>
            </div>
          </div>
        </div>

        {}
        <div style={{ flex: 1, minWidth: "400px" }}>
          {}
          {activeTab === "profile" && (
            <div>
              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>Profile Information</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile({...profile, company: e.target.value})}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>Profile Picture</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    color: "white"
                  }}>
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "👤"}
                  </div>
                  <div>
                    <button style={{
                      padding: "10px 20px",
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}>
                      Upload New
                    </button>
                    <button style={{
                      padding: "10px 20px",
                      background: "#f1f5f9",
                      color: "#64748b",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {}
          {activeTab === "preferences" && (
            <div>
              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>Dashboard Preferences</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                  <div>
                    <label style={labelStyle}>Theme</label>
                    <select
                      value={preferences.theme}
                      onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="dark">Dark (Current)</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Currency</label>
                    <select
                      value={preferences.currency}
                      onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="INR">₹ INR (Indian Rupee)</option>
                      <option value="USD">$ USD (US Dollar)</option>
                      <option value="EUR">€ EUR (Euro)</option>
                      <option value="GBP">£ GBP (British Pound)</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Date Format</label>
                    <select
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Items Per Page</label>
                    <select
                      value={preferences.itemsPerPage}
                      onChange={(e) => setPreferences({...preferences, itemsPerPage: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="5">5 items</option>
                      <option value="10">10 items</option>
                      <option value="25">25 items</option>
                      <option value="50">50 items</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>Display Options</h3>
                
                {[
                  { key: "autoRefresh", label: "Auto-refresh dashboard data", desc: "Update stats every 5 minutes" },
                  { key: "showRevenue", label: "Show revenue in stats", desc: "Display financial information" },
                  { key: "compactView", label: "Compact view mode", desc: "Reduce spacing for more content" }
                ].map((item) => (
                  <div key={item.key} style={toggleStyle}>
                    <div>
                      <p style={{ margin: 0, fontWeight: "500", color: "#1e293b" }}>{item.label}</p>
                      <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setPreferences({...preferences, [item.key]: !preferences[item.key]})}
                      style={{
                        width: "50px",
                        height: "26px",
                        borderRadius: "13px",
                        border: "none",
                        background: preferences[item.key] ? "#10b981" : "#cbd5e1",
                        cursor: "pointer",
                        position: "relative",
                        transition: "background 0.3s"
                      }}
                    >
                      <span style={{
                        position: "absolute",
                        top: "3px",
                        left: preferences[item.key] ? "27px" : "3px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "white",
                        transition: "left 0.3s"
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {activeTab === "notifications" && (
            <div>
              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>Notification Preferences</h3>
                
                {[
                  { key: "emailAlerts", label: "Email Alerts", desc: "Receive important alerts via email" },
                  { key: "newBooking", label: "New Booking Notifications", desc: "Get notified when a new booking is made" },
                  { key: "bookingCancelled", label: "Booking Cancellation", desc: "Alert when bookings are cancelled" },
                  { key: "paymentReceived", label: "Payment Received", desc: "Notification for successful payments" },
                  { key: "lowInventory", label: "Low Inventory Alert", desc: "Warn when car availability is low" },
                  { key: "dailyReport", label: "Daily Summary Report", desc: "Daily email with dashboard summary" },
                  { key: "marketingEmails", label: "Marketing & Updates", desc: "News about features and promotions" }
                ].map((item) => (
                  <div key={item.key} style={toggleStyle}>
                    <div>
                      <p style={{ margin: 0, fontWeight: "500", color: "#1e293b" }}>{item.label}</p>
                      <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key]})}
                      style={{
                        width: "50px",
                        height: "26px",
                        borderRadius: "13px",
                        border: "none",
                        background: notifications[item.key] ? "#3b82f6" : "#cbd5e1",
                        cursor: "pointer",
                        position: "relative"
                      }}
                    >
                      <span style={{
                        position: "absolute",
                        top: "3px",
                        left: notifications[item.key] ? "27px" : "3px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "white"
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {activeTab === "security" && (
            <div>
              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>Security Settings</h3>
                
                {[
                  { key: "twoFactor", label: "Two-Factor Authentication (2FA)", desc: "Add extra security to your account" },
                  { key: "loginNotifications", label: "Login Notifications", desc: "Get notified of new device logins" },
                  { key: "autoLogout", label: "Auto Logout", desc: "Automatically log out when idle" }
                ].map((item) => (
                  <div key={item.key} style={toggleStyle}>
                    <div>
                      <p style={{ margin: 0, fontWeight: "500", color: "#1e293b" }}>{item.label}</p>
                      <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setSecurity({...security, [item.key]: !security[item.key]})}
                      style={{
                        width: "50px",
                        height: "26px",
                        borderRadius: "13px",
                        border: "none",
                        background: security[item.key] ? "#10b981" : "#cbd5e1",
                        cursor: "pointer",
                        position: "relative"
                      }}
                    >
                      <span style={{
                        position: "absolute",
                        top: "3px",
                        left: security[item.key] ? "27px" : "3px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "white"
                      }} />
                    </button>
                  </div>
                ))}
                
                <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #f1f5f9" }}>
                  <label style={labelStyle}>Session Timeout (minutes)</label>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                    style={{ ...inputStyle, width: "200px" }}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                  <p style={{ margin: "10px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>
                    Last password changed: <strong>{security.passwordLastChanged}</strong>
                  </p>
                  <button style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}>
                    🔑 Change Password
                  </button>
                </div>
              </div>

              <div style={{ ...cardStyle, border: "1px solid #fecaca", background: "#fef2f2" }}>
                <h3 style={{ margin: "0 0 15px 0", color: "#dc2626" }}>⚠️ Danger Zone</h3>
                <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "#7f1d1d" }}>
                  These actions are irreversible. Please proceed with caution.
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={{
                    padding: "10px 20px",
                    background: "white",
                    color: "#dc2626",
                    border: "1px solid #dc2626",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}>
                    Clear All Data
                  </button>
                  <button style={{
                    padding: "10px 20px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {}
          {activeTab === "system" && (
            <div>
              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>System Configuration</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
                  <div>
                    <label style={labelStyle}>Timezone</label>
                    <select
                      value={system.timezone}
                      onChange={(e) => setSystem({...system, timezone: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Language</label>
                    <select
                      value={system.language}
                      onChange={(e) => setSystem({...system, language: e.target.value})}
                      style={inputStyle}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
                  {[
                    { key: "backupEnabled", label: "Automatic Data Backup", desc: "Backup booking data daily" },
                    { key: "autoLogout", label: "System Maintenance Mode", desc: "Enable during updates" }
                  ].map((item) => (
                    <div key={item.key} style={toggleStyle}>
                      <div>
                        <p style={{ margin: 0, fontWeight: "500", color: "#1e293b" }}>{item.label}</p>
                        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#94a3b8" }}>{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setSystem({...system, [item.key]: !system[item.key]})}
                        style={{
                          width: "50px",
                          height: "26px",
                          borderRadius: "13px",
                          border: "none",
                          background: system[item.key] ? "#10b981" : "#cbd5e1",
                          cursor: "pointer",
                          position: "relative"
                        }}
                      >
                        <span style={{
                          position: "absolute",
                          top: "3px",
                          left: system[item.key] ? "27px" : "3px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: "white"
                        }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ margin: "0 0 15px 0", color: "#1e293b" }}>🔄 System Status</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                  <div style={{ background: "#f0fdf4", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #10b981" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>System Version</p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#15803d" }}>v2.1.0</p>
                  </div>
                  <div style={{ background: "#eff6ff", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #3b82f6" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Database Status</p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#1d4ed8" }}>Connected ✅</p>
                  </div>
                  <div style={{ background: "#fef3c7", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #f59e0b" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Last Backup</p>
                    <p style={{ margin: "5px 0 0 0", fontWeight: "bold", color: "#b45309" }}>Today, 02:00 AM</p>
                  </div>
                </div>
                <button style={{
                  marginTop: "20px",
                  padding: "12px 24px",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500"
                }}>
                  🔄 Sync Data Now
                </button>
              </div>
            </div>
          )}

          {}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "12px 30px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              💾 Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ user, onSignOut }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>
      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "10px", maxWidth: "400px" }}>
        <p><strong>Name:</strong> {user?.name || "Guest"}</p>
        <p><strong>Email:</strong> {user?.email || "Not logged in"}</p>
        <button
          onClick={handleSignOut}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      onLogin(user);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f172a" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "40px", borderRadius: "10px", width: "350px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Login</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "12px", background: "#3b82f6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}
        >
          Login
        </button>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account? <a href="/register" style={{ color: "#3b82f6" }}>Register</a>
        </p>
      </form>
    </div>
  );
}

function RegisterPage({ onLogin }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === email)) {
      setError("User already exists with this email");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    onLogin(newUser);
    navigate("/dashboard");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0f172a" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "40px", borderRadius: "10px", width: "350px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Register</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "12px", background: "#10b981", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}
        >
          Register
        </button>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account? <a href="/login" style={{ color: "#3b82f6" }}>Login</a>
        </p>
      </form>
    </div>
  );
}

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />

        {}
        <Route
          path="/*"
          element={
            <ProtectedRoute user={user}>
              <Layout search={search} setSearch={setSearch} user={user}>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard search={search} />} />
                  <Route path="/cars" element={<CarsPage />} />
                  <Route path="/bookings" element={<BookingsPage />} />
                  <Route path="/settings" element={<SettingsPage user={user} />} />
                  <Route path="/profile" element={<ProfilePage user={user} onSignOut={handleSignOut} />} />
                  <Route path="/car/:id" element={<CarDetails />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
