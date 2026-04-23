// export default function Sidebar() {
//   return (
//     <div style={{
//       width: "200px",
//       height: "100vh",
//       background: "#eee",
//       padding: "10px"
//     }}>
//       <p>🏠 Home</p>
//       <p>📊 Dashboard</p>
//       <p>⚙️ Settings</p>
//     </div>
//   );
// }





import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "200px",
      height: "100vh",
      background: "#333",
      color: "white",
      padding: "20px"
    }}>
      <h3>Admin</h3>

      <p>
        <Link to="/dashboard" style={{ color: "white" }}>
          Dashboard
        </Link>
      </p>
    </div>
  );
}

