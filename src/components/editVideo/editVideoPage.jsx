import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getOneVideoRequest, updateVideoRequest } from "../../api/auth"
import { useEffect, useState } from "react"
import './editVideoPage.scss'


function editVideoPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getOneVideoRequest(id);
                const video = response.data;
                setValue("name", video.name);
                setValue("URL", video.URL);
                setValue("description", video.description);
            } catch (error) {
                setError('No se pudo cargar la información del video');
            }
        };

        fetchVideoData();
    }, [id]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateVideoRequest(id, { name: data.name, URL: data.URL, description: data.description });
            navigate("/videogestor")
        } catch (error) {
            setError("Erro al enviar la solicitud de actualizar")
        }
    })
    return (
        <div className="edit-video-container">
            <form className='form-edit' onSubmit={onSubmit}>
                <h1 className='title-edit'>Editar Perfil del Niño</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="input-container">
                    <label>Nombre:</label>
                    <input
                        className="inputs"
                        type="text"
                        {...register('name', { required: 'Este campo es obligatorio' })}
                    />
                    {errors.name && <p className="error-message">{errors.name.message}</p>}
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
                    <button className="buttons" type="submit">Actualizar</button>
                </div>

                <div className="cancel-link">
                    <Link to="/videogestor">Cancelar</Link>
                </div>
            </form>
        </div>
    )
}

export default editVideoPage