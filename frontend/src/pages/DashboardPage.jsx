// frontend/src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

const DashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/products").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h1>Inventory Overview</h1>
      {data?.map((p) => (
        <div key={p.id}>
          {p.name} - Stock: {p.stock}
        </div>
      ))}
    </div>
  );
};
export default DashboardPage;
