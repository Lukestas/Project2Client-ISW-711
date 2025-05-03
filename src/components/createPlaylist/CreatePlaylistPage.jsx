import { useNavigate } from 'react-router-dom'
import { createPlaylistRequest } from '../../api/auth'
import ReusableForm from '../ReusableForm/ReusableForm'
import { useEffect, useState } from 'react'

const CreatePlaylist = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState(null)

    const fields = [
        { label: "Playlist Name", name: "name", type: "text", placeholder: "Nombre de la Playlist", required: true }
    ]

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const handleCreate = async (formData) => {
        try {
            const PlayListCreateResquest = await createPlaylistRequest(formData);
            if (!PlayListCreateResquest.data) {
                console.log('PlayListCreateResquest', PlayListCreateResquest)
                setErrors(PlayListCreateResquest.data)
            }
            navigate("/playlistgestor")
        } catch (error) {
            setErrors(error.response?.data?.[0])
        }
    }

    return (
        <div className='form-container'>
            <ReusableForm
                error={errors}
                fields={fields}
                formName="create-playlist-form"
                formTitle="Crear Playlist"
                formAction="Crear"
                formReturnText="¿Deseas Volver?"
                formReturnDirection="/playlistgestor"
                onSubmit={handleCreate}
            />
        </div>
    )
}

export default CreatePlaylist