import { useForm } from "react-hook-form"
import "./scss/LoginPage.scss"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function LoginPage() {
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated,errors: signinErrors } = useAuth();
  const navigate=useNavigate()

  useEffect(() => {
      if (isAuthenticated) navigate('/home')
    }, [isAuthenticated])

  const onSubmit = handleSubmit( (data) => {
    signin(data);
  })

  return (
    <div className='form-container'>
      <form className="form-login" onSubmit={onSubmit}>
        {
          signinErrors.map((error, i) => (
            <div className='Error-message' key={i}>
              {error}
            </div>
          ))
        }
        <h1 className='title-login'>Autenticación de padre</h1>
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
        <div className='button-container'>
          <button className="buttons" type='submit'>Ingresar</button>
        </div>
        <div className="register-link">
          <p>
            ¿No estas registrado aun? <Link to="/register">Registrar</Link>
          </p>
        </div>
      </form>

    </div>
  )
}

export default LoginPage