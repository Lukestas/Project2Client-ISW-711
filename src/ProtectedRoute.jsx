import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {
  const {  loading, isAuthenticated } = useAuth();

  if(loading){
    return <h1>Loading...</h1>
  }
  if (!isAuthenticated && !loading) {
    return <Navigate to="/" replace />
  }
  return <Outlet />;
}

export default ProtectedRoute