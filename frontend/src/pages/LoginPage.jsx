import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import this
import api from "../services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 2. Initialize it

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token); // 3. Save the token
      navigate("/"); // 4. Redirect to Dashboard
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default LoginPage;
