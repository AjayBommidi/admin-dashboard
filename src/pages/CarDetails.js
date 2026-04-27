import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CARS_DATA = [
  { id: 1, name: "BMW", model: "X5", price: "80L", priceValue: 8000000, image: "https://cdn.pixabay.com/photo/2016/11/29/09/32/bmw-1868726_1280.jpg" },
  { id: 2, name: "Audi", model: "A6", price: "70L", priceValue: 7000000, image: "https://cdn.pixabay.com/photo/2016/11/29/09/32/audi-1868726_1280.jpg" },
  { id: 3, name: "Benz", model: "C-Class", price: "65L", priceValue: 6500000, image: "https://cdn.pixabay.com/photo/2016/11/18/12/52/auto-1834275_1280.jpg" },
  { id: 4, name: "Tesla", model: "Model S", price: "90L", priceValue: 9000000, image: "https://cdn.pixabay.com/photo/2017/01/06/19/15/tesla-1957037_1280.jpg" },
  { id: 5, name: "Rolls Royce", model: "Phantom", price: "5Cr", priceValue: 50000000, image: "https://cdn.pixabay.com/photo/2016/11/29/03/53/auto-1866532_1280.jpg" },
  { id: 6, name: "Lamborghini", model: "Huracan", price: "4Cr", priceValue: 40000000, image: "https://images.unsplash.com/photo-1502877338535-766e1452684a" },
  { id: 7, name: "Ferrari", model: "488 GTB", price: "3.5Cr", priceValue: 35000000, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" }
];

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = CARS_DATA.find((c) => c.id === parseInt(id));

  const [customerName, setCustomerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const today = new Date().toISOString().split("T")[0];
    const activeBooking = bookings.find(b => 
      b.carId === parseInt(id) && b.status === "active" && b.endDate >= today
    );
    setIsBooked(!!activeBooking);
  }, [id]);

  if (!car) return <h2>Car not found</h2>;

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)));
    return car.priceValue * 0.01 * days;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName || !startDate || !endDate) {
      setMessage("Please fill all fields");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setMessage("End date must be after start date");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const existingBooking = bookings.find(b => 
      b.carId === parseInt(id) && 
      b.status === "active" &&
      ((startDate >= b.startDate && startDate <= b.endDate) ||
       (endDate >= b.startDate && endDate <= b.endDate))
    );

    if (existingBooking) {
      setMessage("Car is already booked for these dates");
      return;
    }

    const newBooking = {
      id: Date.now(),
      carId: parseInt(id),
      customerName,
      startDate,
      endDate,
      bookingDate: new Date().toISOString().split("T")[0],
      status: "active",
      totalAmount: calculateTotal()
    };

    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    setMessage(`✅ Booking Confirmed! Total: ₹${calculateTotal().toLocaleString()}`);
    setIsBooked(true);
    
    setTimeout(() => {
      setCustomerName("");
      setStartDate("");
      setEndDate("");
      setShowForm(false);
      setMessage("");
    }, 2000);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={{ padding: "20px" }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 20px",
          background: "#e2e8f0",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        ⬅ Back
      </button>

      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {}
        <div>
          <img
            src={car.image}
            alt={car.name}
            style={{ width: "500px", borderRadius: "12px", objectFit: "cover" }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500x300?text=Car+Image";
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: "300px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h2 style={{ margin: 0 }}>{car.name} {car.model}</h2>
            {isBooked && (
              <span style={{
                background: "#ef4444",
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "bold"
              }}>
                🔒 BOOKED
              </span>
            )}
          </div>

          <p style={{ fontSize: "18px", color: "#64748b", margin: "10px 0" }}>
            <strong>Price:</strong> <span style={{ color: "#3b82f6", fontWeight: "bold" }}>{car.price}</span>
          </p>
          
          <p style={{ fontSize: "16px", color: "#64748b", margin: "10px 0" }}>
            <strong>Daily Rate:</strong> ₹{(car.priceValue * 0.01).toLocaleString()}/day
          </p>

          {!isBooked && (
            <button
              onClick={() => setShowForm(true)}
              style={{
                marginTop: "20px",
                padding: "12px 30px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              🚗 Book Now
            </button>
          )}

          {}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "20px",
                background: "#f8fafc",
                padding: "25px",
                borderRadius: "12px",
                maxWidth: "400px"
              }}
            >
              <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>Booking Form</h3>

              {message && (
                <div style={{
                  padding: "12px",
                  background: message.includes("✅") ? "#d1fae5" : "#fee2e2",
                  color: message.includes("✅") ? "#10b981" : "#ef4444",
                  borderRadius: "6px",
                  marginBottom: "15px",
                  fontSize: "14px"
                }}>
                  {message}
                </div>
              )}

              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{ 
                  width: "100%", 
                  marginBottom: "12px", 
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px"
                }}
              />

              <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "13px", color: "#64748b" }}>Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    min={today}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ 
                      width: "100%", 
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px"
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "5px", fontSize: "13px", color: "#64748b" }}>End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate || today}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ 
                      width: "100%", 
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px"
                    }}
                  />
                </div>
              </div>

              {startDate && endDate && (
                <div style={{
                  background: "#e0e7ff",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "15px"
                }}>
                  <p style={{ margin: 0, fontSize: "14px", color: "#4338ca" }}>
                    <strong>Total Amount:</strong>
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontSize: "24px", fontWeight: "bold", color: "#3730a3" }}>
                    ₹{calculateTotal().toLocaleString()}
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#6366f1" }}>
                    for {Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)))} days
                  </p>
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
              >
                ✅ Confirm Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}