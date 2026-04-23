// export default function Login() {
//   return (
//     <div>
//       <h2>Login Page</h2>

//       <input placeholder="Enter Email" />
//       <br /><br />

//       <input type="password" placeholder="Enter Password" />
//       <br /><br />

//       <button>Login</button>
//     </div>
//   );
// }




// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h2>Login Page</h2>

//       <input placeholder="Enter Email" />
//       <br /><br />

//       <input type="password" placeholder="Enter Password" />
//       <br /><br />

//       <button onClick={() => navigate("/dashboard")}>
//         Login
//       </button>
//     </div>
//   );
// }


















// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Login Page</h2>

//       <input placeholder="Email" />
//       <br /><br />

//       <input type="password" placeholder="Password" />
//       <br /><br />

//       <button onClick={() => navigate("/dashboard")}>
//         Login
//       </button>
//     </div>
//   );
// }








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