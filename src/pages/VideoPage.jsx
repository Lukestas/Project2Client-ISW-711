import React, { useEffect, useState } from 'react'
import './scss/VideoPage.scss'
import { addVideoToPlaylist, disableVideoResquest, getAllVideosRequest } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { NavBar } from '../components/searchBar/NavBar'
import { VideosList } from '../components/videosList/VideosList'

function VideoPage() {
    const { handleSubmit } = useForm();
    const [videos, setVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getVideos = async () => {
            try {
                const allVideoResquest = await getAllVideosRequest()
                setVideos(allVideoResquest.data)
                console.log(allVideoResquest.data)
            } catch (error) {
                console.log("Error al obtener los videos: ", error);
            }
        }
        getVideos();
    }, [])

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    /*const handleAssignPlaylist = (videoId) => {
        setSelectedVideo(videoId);
        setIsPlaylistModalOpen(true);
    };

    const handleEditVideo = (videoId) => {
        navigate(`/video-edit?id=${videoId}`);
    };

    const handleAssignPlaylistToVideo = async (playlistId) => {
        try {
            console.log("hola")
            const AssignVideo = await addVideoToPlaylist(playlistId, selectedVideo)
            console.log(`Asignando playlist ${playlistId} al video ${selectedVideo}`);
            setIsPlaylistModalOpen(false);
        } catch (error) {
            console.error("Error al asignar la playlist: ", error);
        }
    };

    const ParentPinSubmit = handleSubmit(async () => {
        const Parent = await getParentRequest();
        if (pin !== Parent.data.pin) return setPinError("el pin es incorrecto")
        try {
            if (routeP === "toDelete") {
                await disableVideoResquest(selectedVideo);
                const updatedVideos = await getAllVideosRequest();
                setVideos(updatedVideos.data);
            }
            setIsPinModalOpen(false);
        } catch (error) {
            console.log("Error eliminando el video:", error);
            setIsPinModalOpen(false);
            alert("Hubo un error al eliminar el video");
        }
    })

    */

    const handleEditVideo = (videoId) => {
        navigate(`/video-edit?id=${videoId}`);
    };

    const handleAddToPlaylist = async (videoId) => {
        console.log("Video agregado a la lista de reproducción:", videoId);
    }

    const handleDisableVideo = async (data) => {
        try {
            console.log("Video desactivado:", data);
            const videoDisableRequest = await disableVideoResquest(data)
            if (!videoDisableRequest) {
                setErrors("No se pudo desactivar el video")
            }
            const allVideoResquest = await getAllVideosRequest()
            setVideos(allVideoResquest.data)
        } catch (error) {
            setErrors(error.response?.data?.[0]);
        }
    }

    return (
        <div className='video-page-container'>
            <NavBar />
            <VideosList error={errors} videos={videos} onEditVideo={handleEditVideo} onAddToPlaylist={handleAddToPlaylist} onDisableVideo={handleDisableVideo} />
        </div>
    );
}

export default VideoPage