import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token, send them to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, show the children (the dashboard/layout)
  return children;
};

export default ProtectedRoute;
