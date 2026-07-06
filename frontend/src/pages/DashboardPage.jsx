// frontend/src/pages/DashboardPage.jsx
import Button from "../components/Button";
import api from "../services/api";

const DashboardPage = () => {
  const checkConnection = async () => {
    try {
      const response = await api.get("/auth/profile"); // Just a test
      alert(response.data.message);
    } catch (err) {
      alert("Backend connection failing - check CORS!");
    }
  };

  return (
    <div>
      <h1>BizFlow Dashboard</h1>
      <Button onClick={checkConnection}>Test Connection</Button>
    </div>
  );
};
export default DashboardPage;
