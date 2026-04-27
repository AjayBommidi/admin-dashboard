import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CARS_DATA = [
  {
    id: 1,
    name: "BMW",
    model: "X5",
    price: "80L",
    priceValue: 8000000,
    image: "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
  },
  {
    id: 2,
    name: "Audi",
    model: "A6",
    price: "70L",
    priceValue: 7000000,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"
  },
  {
    id: 3,
    name: "Benz",
    model: "C-Class",
    price: "65L",
    priceValue: 6500000,
    image: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1"
  },
  {
    id: 4,
    name: "Tesla",
    model: "Model S",
    price: "90L",
    priceValue: 9000000,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399"
  },
  {
    id: 5,
    name: "Rolls Royce",
    model: "Phantom",
    price: "5Cr",
    priceValue: 50000000,
    image: "https://cdn.pixabay.com/photo/2017/03/27/14/56/auto-2179220_1280.jpg"
  },
  {
    id: 6,
    name: "Lamborghini",
    model: "Huracan",
    price: "4Cr",
    priceValue: 40000000,
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a"
  },
  {
    id: 7,
    name: "Ferrari",
    model: "488 GTB",
    price: "3.5Cr",
    priceValue: 35000000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
  }
];

export default function Dashboard({ search }) {
  const navigate = useNavigate();
  const [cars] = useState(CARS_DATA);
  const [bookings, setBookings] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");

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
        {
          id: 1001,
          carId: 1, 
          customerName: "Rajesh Kumar",
          startDate: formatDate(yesterday),
          endDate: formatDate(tomorrow),
          bookingDate: formatDate(lastWeek),
          status: "active",
          totalAmount: 240000 
        },
        {
          id: 1002,
          carId: 3,
          customerName: "Priya Sharma",
          startDate: formatDate(today),
          endDate: formatDate(nextWeek),
          bookingDate: formatDate(yesterday),
          status: "active",
          totalAmount: 455000 
        },
        {
          id: 1003,
          carId: 5, 
          customerName: "Amit Patel",
          startDate: formatDate(today),
          endDate: formatDate(tomorrow),
          bookingDate: formatDate(today),
          status: "active",
          totalAmount: 1000000 
        },
        {
          id: 1004,
          carId: 7, 
          customerName: "Vikram Singh",
          startDate: formatDate(yesterday),
          endDate: formatDate(today),
          bookingDate: formatDate(lastWeek),
          status: "active",
          totalAmount: 700000 
        }
      ];
      
      localStorage.setItem("bookings", JSON.stringify(sampleBookings));
      savedBookings = sampleBookings;
    }
    
    setBookings(savedBookings);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const getBookedCarIds = () => {
    const today = new Date().toISOString().split("T")[0];
    return bookings
      .filter(b => b.status === "active" && b.endDate >= today)
      .map(b => b.carId);
  };

  const bookedCarIds = getBookedCarIds();
  const availableCars = cars.filter(car => !bookedCarIds.includes(car.id));
  const bookedCars = cars.filter(car => bookedCarIds.includes(car.id));

  const calculateRevenue = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayDate = new Date();
    const currentMonth = todayDate.getMonth();
    const currentYear = todayDate.getFullYear();

    let todayRevenue = 0;
    let monthlyRevenue = 0;

    bookings.forEach(booking => {
      const bookingDate = new Date(booking.bookingDate);
      const car = cars.find(c => c.id === booking.carId);
      
      if (car && booking.status === "active") {
        const dailyRate = car.priceValue * 0.01;
        
        if (booking.startDate <= today && booking.endDate >= today) {
          todayRevenue += dailyRate;
        }
        
        if (bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear) {
          const days = Math.max(1, Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)));
          monthlyRevenue += dailyRate * days;
        }
      }
    });

    return { todayRevenue, monthlyRevenue };
  };

  const { todayRevenue, monthlyRevenue } = calculateRevenue();

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.filter(b => b.status === "active").length,
      icon: "📦",
      color: "#3b82f6",
      subtext: "Active bookings"
    },
    {
      title: "Available Cars",
      value: availableCars.length,
      icon: "🚗",
      color: "#10b981",
      subtext: "Ready to book"
    },
    {
      title: "Booked Cars",
      value: bookedCars.length,
      icon: "🔒",
      color: "#f59e0b",
      subtext: "Currently rented"
    },
    {
      title: "Today's Revenue",
      value: formatCurrency(todayRevenue),
      icon: "💰",
      color: "#8b5cf6",
      subtext: "Daily earnings"
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(monthlyRevenue),
      icon: "📈",
      color: "#ec4899",
      subtext: "This month"
    },
    {
      title: "Total Cars",
      value: cars.length,
      icon: "🏢",
      color: "#06b6d4",
      subtext: "Fleet size"
    }
  ];

  const filteredCars = cars.filter((car) => {
    const text = debouncedSearch.toLowerCase();
    return (
      car.name.toLowerCase().includes(text) ||
      car.model.toLowerCase().includes(text) ||
      car.price.toLowerCase().includes(text)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      {}
      <h2 style={{ marginBottom: "20px", color: "#1e293b" }}>Admin Dashboard</h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              borderLeft: `4px solid ${stat.color}`,
              transition: "transform 0.2s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0", color: "#64748b", fontSize: "14px" }}>{stat.title}</p>
                <h3 style={{ margin: "8px 0", fontSize: "28px", color: stat.color, fontWeight: "bold" }}>
                  {stat.value}
                </h3>
                <p style={{ margin: "0", color: "#94a3b8", fontSize: "12px" }}>{stat.subtext}</p>
              </div>
              <span style={{ fontSize: "32px" }}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {}
      <h3 style={{ marginBottom: "20px", color: "#1e293b" }}>Available Cars</h3>
      
      {filteredCars.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px"
          }}
        >
          {filteredCars.map((car) => {
            const isBooked = bookedCarIds.includes(car.id);
            return (
              <div
                key={car.id}
                onClick={() => navigate(`/car/${car.id}`)}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  opacity: isBooked ? 0.7 : 1,
                  position: "relative"
                }}
                onMouseEnter={(e) => !isBooked && (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                {isBooked && (
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#ef4444",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    zIndex: 1
                  }}>
                    BOOKED
                  </div>
                )}
                
                <img
                  src={car.image}
                  alt={car.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x150?text=Car+Image";
                  }}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover"
                  }}
                />

                <div style={{ padding: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ margin: 0, color: "#1e293b" }}>{car.name}</h3>
                    <span style={{ 
                      color: isBooked ? "#ef4444" : "#10b981",
                      fontSize: "12px",
                      fontWeight: "bold",
                      background: isBooked ? "#fee2e2" : "#d1fae5",
                      padding: "4px 8px",
                      borderRadius: "4px"
                    }}>
                      {isBooked ? "🔒 Booked" : "✅ Available"}
                    </span>
                  </div>
                  <p style={{ margin: "4px 0", color: "#64748b", fontSize: "14px" }}>Model: {car.model}</p>
                  <p style={{ margin: "4px 0", color: "#3b82f6", fontSize: "18px", fontWeight: "bold" }}>{car.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No cars found</p>
      )}
    </div>
  );
}