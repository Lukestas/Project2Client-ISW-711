import { registerVideoRequest } from '../../api/auth'
import {useNavigate } from 'react-router-dom'
import ReusableForm from '../ReusableForm/ReusableForm'
import { useEffect, useState } from 'react'

// This component is used to register a video.
// It uses the ReusableForm component to render a form with the fields defined in the fields array.
function RegisterVideoPage() {
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()

    const fields = [
        { type: 'text', name: 'name', label: 'Nombre del video', required: true },
        { type: 'text', name: 'URL', label: 'Enlace del video', required: true },
        { type: 'text', name: 'description', label: 'Descripcion', required: true },
    ]
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setErrors(null)
        }, 3000)
        return () => clearTimeout(timer)
    }, [errors])

    const handleAdd=async (formData) => {
        try {
            const VideoAddResquest=await registerVideoRequest(formData);
            if (!VideoAddResquest.data) {
                console.log('VideoAddResquest', VideoAddResquest)
                setErrors(VideoAddResquest.data)
            }
            navigate("/videogestor")
        } catch (error) {
            setErrors(error.response?.data?.[0])
        }
    }

    return (
        <div className='form-container'>
            <ReusableForm
                error={errors}
                fields={fields}
                formName="register-video-form"
                formTitle="Registro de video"
                formAction="Agregar"
                formReturnText="¿Deseas Volver?"
                formReturnDirection="/videogestor"
                onSubmit={handleAdd}
            />
        </div>
    )
}


export default RegisterVideoPage

