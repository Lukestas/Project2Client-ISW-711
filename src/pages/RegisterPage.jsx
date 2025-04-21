import { useForm } from 'react-hook-form'
import './scss/RegisterPage.scss'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/home')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  })
  
  return (
    <div className='form-container'>
      
      <form className="form-register" onSubmit={onSubmit}>
      {
        registerErrors.map((error,i)=>(
          <div className='Error-Backend' key={i}>
            {error}
          </div>
        ))
      }
        <h1 className='title-register'>Registro de padre</h1>
        <div className='input-container'>
          <label htmlFor="">Nombre: <span className="required">*</span></label>
          <input autoComplete='off' className="inputs" type="text" {...register("firstName", { required: true })} placeholder='Nombre' />
          {
            errors.firstName && (
              <p className='required'>Se requiere un nombre</p>
            )
          }
        </div>
        <div className='input-container'>
          <label htmlFor="">Apellidos: <span className="required">*</span></label>
          <input autoComplete='off' className="inputs" type="text" {...register("lastName", { required: true })} placeholder='Apellido' />
          {
            errors.lastName && (
              <p className='required'>Se requiere un apellido</p>
            )
          }
        </div>
        <div className='input-container'>
          <label htmlFor="">Email: <span className="required">*</span></label>
          <input autoComplete='off' className="inputs" type="email" {...register("email", { required: true })} placeholder='Email' />
          {
            errors.email && (
              <p className='required'>Se requiere un correo</p>
            )
          }
        </div>
        <div className='input-container'>
          <label htmlFor="">Contraseña: <span className="required">*</span></label>
          <input autoComplete='off' className="inputs" type="password" {...register("password", { required: true })} placeholder='Contraseña' />
          {
            errors.password && (
              <p className='required'>Se requiere una contraseña</p>
            )
          }
        </div>
        <div className='input-container'>
          <label htmlFor="">Repetir Contraseña: <span className="required">*</span></label>
          <input autoComplete='off' className="inputs" type="password" {...register("repeatPassword", { required: true })} placeholder='Repetir Contraseña' />
          {
            errors.repeatPassword && (
              <p className='required'>Se requiere repetir la contraseña</p>
            )
          }
        </div>
        <div className='input-container'>
          <label htmlFor="">Telefono: <span className="required">*</span></label>
          <input autoComplete='off' className="inputs" type="number" {...register("phone", { required: true })} placeholder='Telefono' />
          {
            errors.phone && (
              <p className='required'>Se requiere un numero telefonico</p>
            )
          }
        </div>
        <div className='input-container'>
          <label htmlFor="">Pin: <span className="required">*</span></label>
          <input autoComplete='off' className="inputs" type="number" {...register("pin", { required: true, minLength: 6, maxLength: 6 })} placeholder='Pin' />
          {
            errors.pin && (
              <p className='required'>El pin debe tener 6 dígitos</p>
            )
          }
        </div>
        <div className='input-container'>
          <label htmlFor="">Pais: <span className="required">*</span></label>
          <input autoComplete='off' className="inputs" type="text" {...register("country")} placeholder='Pais' />
        </div>
        <div className='input-container'>
          <label htmlFor="">Fecha de nacimiento: <span className="required">*</span></label>
          <input autoComplete='off' className="inputs" type="date" {...register("birthDate", { required: true })} placeholder='Fecha de nacimiento' />
          {
            errors.birthDate && (
              <p className='required'>Se requiere la fecha de nacimiento</p>
            )
          }
        </div>
        <div className='button-container'>
          <button className="buttons" type='submit'>Registrar</button>
        </div>
        <div className="login-link">
          <p>
            ¿Ya tienes cuenta? <Link to="/">Autenticar</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage