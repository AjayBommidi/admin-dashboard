import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login Page</h2>

      <input placeholder="Email" />
      <br /><br />

      <input type="password" placeholder="Password" />
      <br /><br />

      <button onClick={() => navigate("/dashboard")}>
        Login
      </button>
    </div>
  );
}