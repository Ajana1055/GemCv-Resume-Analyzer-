import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

function ProtectedRoute({ children }) {

  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to access this page",
        confirmButtonColor: "#2563EB",
      });
    }
  }, [token]);

  if (!token) {
    return (
      <Navigate
        to="/"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;