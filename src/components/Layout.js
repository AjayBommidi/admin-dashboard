import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}