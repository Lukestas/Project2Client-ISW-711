import { useLocation, useNavigate } from "react-router-dom"
import { getOneVideoRequest, updateVideoRequest } from "../../api/auth"
import { useEffect, useState } from "react"
import ReusableForm from "../ReusableForm/ReusableForm"
import { getVideoById } from "../../api/graphqlQuerys"


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
                const videoRequest = await getVideoById(id);
                if (!videoRequest) {
                    navigate("/videogestor")
                }
                setVideo(videoRequest)
                setFields([
                    {
                        name: "title",
                        type: "text",
                        label: "Titulo del video",
                        placeholder: "Titulo del video",
                        defaultValue: videoRequest.title,
                    },
                    {
                        name: "description",
                        type: "text",
                        label: "Descripción del video",
                        placeholder: "Descripción del video",
                        defaultValue: videoRequest.description,
                    },
                    {
                        name: "youtubeid",
                        type: "text",
                        label: "URL de YouTube",
                        placeholder: "URL del video de YouTube",
                        defaultValue: `https://www.youtube.com/watch?v=${videoRequest.youtubeid}`,
                        readOnly: true
                    },
                    {
                        image: videoRequest.thumbnail
                    }
                ]);
            } catch (error) {
                console.error("Error al cargar los datos del video:", error);
                setError("No se pudo cargar la información del video");
            }
        };

        getVideoData();
    }, [id]);


    const handleSubmit=async (data) => {
        try {
            console.log(data)
            const { title, description } = data;
            const videoSaveRequest= await updateVideoRequest(id, title, description );
            console.log(videoSaveRequest.data)
            navigate("/videogestor")
        } catch (error) {
            setError(error.response.data[0]);
            console.log("Error al editar el video: ", error.response.data[0]);
        }
    }



    return (
        <div className="form-container">
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
            {console.log(video)}
        </div>
    )
}

export default editVideoPage