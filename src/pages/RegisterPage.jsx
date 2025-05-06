import { useEffect, useState } from 'react';
import { registerParentRequest } from '../api/auth';
import { useNavigate } from "react-router-dom";
import ReusableForm from '../components/ReusableForm/ReusableForm';


//This component is used to display the register page for the parent
//It uses the ReusableForm component to display the form
function RegisterPage() {
  const [errors, setErrors] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    if (errors) {
      const timer = setTimeout(() => {
        setErrors(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const fields = [
    { label: 'Nombre', name: 'firstName', type: 'text', required: true },
    { label: 'Apellidos', name: 'lastName', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Contraseña', name: 'password', type: 'password', required: true },
    { label: 'Repetir Contraseña', name: 'repeatPassword', type: 'password', required: true },
    { label: 'Telefono', name: 'phone', type: 'number', required: true },
    { label: 'Pin', name: 'pin', type: 'number', required: true },
    { label: 'Pais', name: 'country' },
    { label: 'Fecha de nacimiento', name: 'birthDate', type: 'date' }
  ];

  const handleRegisterParent = async (formData) => {
    try {
      const ParentRegisterResquest = await registerParentRequest(formData)
      if (!ParentRegisterResquest.data) {
        setErrors(ParentRegisterResquest.data)
      }
      navigate("/verification")
    } catch (error) {
      setErrors(error.response?.data?.[0]);
    }
  }


  return (
    <div className='form-container'>
      <ReusableForm
        error={errors}
        fields={fields}
        formName="register-parent-form"
        formTitle="Registro de padre"
        formAction="Registrar"
        formReturnText="¿Ya tienes cuenta?"
        formReturnDirection="/"
        onSubmit={handleRegisterParent}
      />
    </div>
  )
}

export default RegisterPage