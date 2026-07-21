import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { email, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "24px",
        background: "white",
        borderRadius: "10px",
      }}
    >
      <h2>Create Account</h2>
      <input
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        style={{
          width: "100%",
          padding: "10px",
          background: "#2563eb",
          color: "white",
        }}
        onClick={handleRegister}
      >
        Register
      </button>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};
export default RegisterPage;
