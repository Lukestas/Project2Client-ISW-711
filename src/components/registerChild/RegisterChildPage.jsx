import React, { useEffect, useState } from "react";
import ReusableForm from "../ReusableForm/ReusableForm";
import { registerChildrenRequest } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const avatars = [
  "/avatars/avatar0.png",
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png"
];


// This component is used to register a child.
// It uses the ReusableForm component to render a form with the fields defined in the fields array.
function RegisterChildPage() {
  const [errors, setErrors] = useState(null);
  const navigate= useNavigate()
  
  const fields=[
    { type: 'text', name: 'name', label: 'Nombre del niño', required: true },
    { type: 'number', name: 'pin', label: 'PIN', required: true, minLength: 4, maxLength: 6 },
    { type: 'avatar', name: 'avatar', label: 'Avatar', options: avatars }
  ]
  
  useEffect(() => {
    if (errors) {
      const timer = setTimeout(() => {
        setErrors(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleRegisterChild = async (formData) => {
    try {
      const ChildRegisterResquest= await registerChildrenRequest(formData)
      if (!ChildRegisterResquest.data) {
        console.log('ChildRegisterResquest', ChildRegisterResquest)
        setErrors(ChildRegisterResquest.data)
      }
      navigate("/home")
    } catch (error) {
      console.log('Error al registrar el niño:', error.response?.data?.[0], error)
      setErrors(error.response?.data?.[0])
    }
  }

  return (
    <div className="form-container">
      <ReusableForm
        error={errors}
        fields={fields}
        formName="register-child-form"
        formTitle="Registro de niño"
        formAction="Registrar"
        formReturnText="¿Deseas Volver?"
        formReturnDirection="/Home"
        onSubmit={handleRegisterChild}
      />
    </div>
  );
}

export default RegisterChildPage;
