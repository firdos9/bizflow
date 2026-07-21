import { Link, useNavigate } from "react-router-dom";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // This deletes the "ID badge"
    navigate("/login"); // This kicks the user out
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <nav
        style={{
          width: "280px",
          borderRight: "1px solid #e5e7eb",
          padding: "20px",
        }}
      >
        <h3>BizFlow</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/sales">Sales</Link>
          </li>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
          <li style={{ marginTop: "50px" }}>
            <button
              onClick={handleLogout}
              style={{
                color: "red",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: "24px" }}>{children}</main>
    </div>
  );
};

export default AppLayout;
