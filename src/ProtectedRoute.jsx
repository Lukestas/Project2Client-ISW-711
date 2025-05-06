import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext"
import { useEffect } from "react";
import { sendSMSVerificationRequest } from "./api/auth";

function ProtectedRoute() {
  const { loading, isAuthenticated, parent } = useAuth();

  useEffect(() => {
    const sendVerificationCode = async () => {
      if (isAuthenticated && !parent?.isSMSVerified && parent?.phone) {
        try {
          await sendSMSVerificationRequest(parent.phone);
        } catch (error) {
          console.error("Error al enviar el código de verificación:", error);
        }
      }
    };
    sendVerificationCode();
  }, [isAuthenticated, parent]);

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (!isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  } else if (!parent?.isSMSVerified) {
    return <Navigate to="/verify-sms" replace />;
  }

  return <Outlet />;
}
export default ProtectedRoute