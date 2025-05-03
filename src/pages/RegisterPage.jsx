import { useEffect, useState } from 'react';
import { registerParentRequest } from '../api/auth';
import ReusableForm from '../components/ReusableForm/ReusableForm';

function RegisterPage() {
  const [errors, setErrors] = useState(null);

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
      console.log('ParentRegisterResquest', ParentRegisterResquest)
      if (!ParentRegisterResquest.data) {
        console.log('ParentRegisterResquest', ParentRegisterResquest)
        setErrors(ParentRegisterResquest.data)
      }
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