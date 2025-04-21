import './RegisterVideoPage.scss'
import { useForm } from 'react-hook-form'
import { registerVideoRequest } from '../../api/auth'
import { Link, useNavigate } from 'react-router-dom'


function RegisterVideoPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (values) => {
        try {
            await registerVideoRequest(values);
            navigate("/videogestor")
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <div className='form-container'>
            <form className="form-register" onSubmit={onSubmit}>
                <h1 className='title-register'>Registrar un video</h1>
                <div className="input-container">
                    <label>Nombre del video</label>
                    <input type="text" className="inputs"{...register('name', { required: true })} />
                    {errors.name && <p className="required">Se requiere un nombre</p>}
                </div>
                <div className="input-container">
                    <label>Enlace del video</label>
                    <input type="text" className="inputs"{...register('URL', { required: true })} />
                    {errors.name && <p className="required">Se requiere un enlace</p>}
                </div>
                <div className="input-container">
                    <label>Descripcion</label>
                    <input type="text" className="inputs"{...register('description', { required: true })} />
                    {errors.name && <p className="required">Se requiere una descripcion</p>}
                </div>
                <div className='button-container'>
                    <button className="buttons" type="submit">Registrar video</button>
                </div>
                <div className="cancel-link">
                    <Link to="/videogestor">Cancelar</Link>
                </div>
            </form>
        </div>
    )
}


export default RegisterVideoPage

