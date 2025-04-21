import { useEffect } from "react";
import { useAuthChild } from "../context/AuthChildContext";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"


function LoginChildPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginChild, isChildAuthenticated, children, selectChild } = useAuthChild();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(() => {
        loginChild(data);
    })

    useEffect(() => {
        if (isChildAuthenticated) {
            navigate("/child-home")
        }
    }, [isChildAuthenticated, navigate])

    if (!isAuthenticated) {
        return <h1>El padre debe iniciar sesión primero.</h1>;
    }

    return (
        <div className="form-container">
            <h1>Selecciona un perfil</h1>
            <div className="child-selection">
                {children.length > 0 ? (
                    children.map((child) => (
                        <button key={child._id} onClick={() => selectChild(child._id)}>
                            {child.name}
                        </button>
                    ))
                ) : (
                    <p>No hay hijos registrados.</p>
                )}
            </div>

            <form className="form-login" onSubmit={onSubmit}>
                <h1 className='title-login'>Autenticación de hijo</h1>
                <div className='input-container'>
                    <label htmlFor="">Ingrese el pin: <span className="required">*</span></label>
                    <input autoComplete='off' className="inputs" type="password" {...register("pin", {
                        required: true, 
                        minLength: { value: 6, message: "El PIN debe tener 6 dígitos" },
                        maxLength: { value: 6, message: "El PIN debe tener 6 dígitos" }
                    })} placeholder='PIN de 6 dígitos' />
                    {
                        errors.pin && (
                            <p className='required'>{errors.pin.message}</p>
                        )
                    }
                </div>
                <div className='button-container'>
                    <button className="buttons" type='submit'>Ingresar</button>
                </div>
            </form>
        </div>
    );
}

export default LoginChildPage