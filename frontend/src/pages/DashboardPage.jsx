// frontend/src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const res = await api.get("/products");
        setData(res.data);
      } catch (err) {
        navigate("/login"); // If no token or request fails, go to login
      }
    };
    fetchProducts();
  }, [navigate]);

  return (
    <div>
      <h1>Inventory Overview</h1>
      {data.map((p) => (
        <div key={p.id}>
          {p.name} - Stock: {p.stock}
        </div>
      ))}
    </div>
  );
};
export default DashboardPage;
