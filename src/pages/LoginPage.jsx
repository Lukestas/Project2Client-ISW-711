import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReusableForm from "../components/ReusableForm/ReusableForm";


function LoginPage() {

  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate()

  const fields = [
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Contraseña', name: 'password', type: 'password', required: true },
  ];

  useEffect(() => {
    if (isAuthenticated) navigate('/home')
  }, [isAuthenticated])

  const handleLogin = (data) => {
    signin(data);
  }

  return (
    <div className='form-container'>
      <ReusableForm
        error={signinErrors}
        fields={fields}
        formName="login-parent-form"
        formTitle="Iniciar sesión"
        formAction="Iniciar sesión"
        formReturnText="¿No tienes cuenta?"
        formReturnDirection="/register"
        onSubmit={handleLogin}
      />
    </div>
  )
}

export default LoginPage