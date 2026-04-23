import { useState } from "react";

export default function FormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !password) {
      alert("All fields required");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter valid email");
      return;
    }

    alert("Form Submitted ✅");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register Form</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}