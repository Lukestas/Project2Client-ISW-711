import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthChild } from "../../context/AuthChildContext";
import './RegisterChildPage.scss'
import { getParentRequest, registerChildrenRequest } from "../../api/auth";

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

function RegisterChildPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [parentPin, setParentPin] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerChildrenRequest({ ...values, avatar: selectedAvatar });
      navigate("/home")
    } catch (error) {
      setError("Error al ingresar el niño")
    }

  })

  return (
    <div className="form-container">
      <form className="form-register" onSubmit={onSubmit}>
        <h1 className='title-register'>Registrar Niño</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="input-container">
          <label>Nombre del niño</label>
          <input type="text" className="inputs"{...register('name', { required: true })} />
          {errors.name && <p className="required">Se requiere un nombre</p>}
        </div>

        <div className="input-container">
          <label>PIN</label>
          <input type="number" className="inputs"{...register('pin', { required: true, minLength: 4, maxLength: 6 })} />
          {errors.pin && <p className="required">Se requiere un PIN de 6 dígitos</p>}
        </div>

        <div className='input-container'>
          <label>Avatar</label>
          <div className="avatar-selection">
            {avatars.map((avatar, i) => (
              <img
                key={i}
                src={avatar}
                alt={`Avatar ${i + 1}`}
                className={`avatar ${selectedAvatar === avatar ? "selected" : ""}`}
                onClick={() => setSelectedAvatar(avatar)}
              />
            ))}
          </div>
        </div>
        <div className='button-container'>
          <button className="buttons" type="submit">Actualizar</button>
        </div>
        <div className="cancel-link">
          <Link to="/">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterChildPage;
