import { useLocation, useNavigate } from "react-router-dom"
import { getOneVideoRequest, updateVideoRequest } from "../../api/auth"
import { useEffect, useState } from "react"
import ReusableForm from "../ReusableForm/ReusableForm";


function editVideoPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [error, setError] = useState('');
    const [video, setVideo] = useState(null);
    const [fields, setFields] = useState([]);

    useEffect(() => {
        const getVideoData = async () => {
            try {
                const videoRequest = await getOneVideoRequest(id);
                const videoFound= videoRequest.data;
                setVideo(videoFound);
                setFields([
                    {
                        name: "title",
                        type: "text",
                        label: "Titulo del video",
                        placeholder: "Titulo del video",
                        defaultValue: videoFound.title,
                    },
                    {
                        name: "description",
                        type: "text",
                        label: "Descripción del video",
                        placeholder: "Descripción del video",
                        defaultValue: videoFound.description,
                    },
                    {
                        name: "youtubeid",
                        type: "text",
                        label: "URL de YouTube",
                        placeholder: "URL del video de YouTube",
                        defaultValue: `www.youtube.com/watch?v="${videoFound.youtubeid}`,
                    },
                ]);
            } catch (error) {
                setError('No se pudo cargar la información del video');
            }
        };

        getVideoData();
    }, [id]);


    const handleSubmit=async (data) => {
        try {
            const videoSaveRequest= await updateVideoRequest(
                id, {
                title: data.title,
                description: data.description,
                youtubeid: data.youtubeid,
            });
            console.log(videoSaveRequest.data)
            navigate("/videogestor")
        } catch (error) {
            setError(error.response.data[0]);
            console.log("Error al editar el video: ", error.response.data[0]);
        }
    }



    return (
        <div className="edit-video-container">
            {fields.length > 0 ? (
                <ReusableForm
                    error={error}
                    fields={fields}
                    formName="edit-video-form"
                    formTitle="Editar video"
                    formAction="Guardar"
                    formReturnText="¿Desea volver?"
                    formReturnDirection="/videogestor"
                    onSubmit={handleSubmit}
                />
            ) : (
                <p>Cargando datos del video...</p>
            )}
        </div>
    )
}

export default editVideoPage