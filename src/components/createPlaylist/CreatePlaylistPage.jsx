import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { createPlaylistRequest } from '../../api/auth'

const CreatePlaylist = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (values) => {
        try {
            await createPlaylistRequest(values.name);
            navigate("/playlistgestor")
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <div className='form-container'>
            <form className="form-register" onSubmit={onSubmit}>
                <h1 className='title-register'>Registrar un Playlist</h1>
                <div className="input-container">
                    <label>Nombre del playlist</label>
                    <input type="text" className="inputs"{...register('name', { required: true })} />
                    {errors.name && <p className="required">Se requiere un nombre</p>}
                </div>
                <div className='button-container'>
                    <button className="buttons" type="submit">Registrar Niño</button>
                </div>
                <div className="cancel-link">
                    <Link to="/playlistgestor">Cancelar</Link>
                </div>
            </form>
        </div>
    )
}

export default CreatePlaylist