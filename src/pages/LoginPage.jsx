import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReusableForm from "../components/ReusableForm/ReusableForm";


//This component is used to display the login page for the parent
//It uses the ReusableForm component to display the form
//It uses the useAuth hook to get the signin function and the isAuthenticated state
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