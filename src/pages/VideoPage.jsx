import React, { useEffect, useState } from 'react'
import './scss/VideoPage.scss'
import { addVideoToPlaylist, disableVideoResquest, getAllPlaylistsRequest, getAllVideosRequest, getParentRequest } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'

function VideoPage() {
    const { handleSubmit } = useForm();
    const [videos, setVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [pinError, setPinError] = useState("")
    const [pin, setPin] = useState('')
    const [isPinModalOpen, setIsPinModalOpen] = useState(false)
    const { logout } = useAuth();
    const [routeP, setRouteP] = useState('')
    const navigate = useNavigate()

    const [playlists, setPlaylists] = useState([]);
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

    useEffect(() => {
        const getDatas = async () => {
            try {
                const Videos = await getAllVideosRequest()
                setVideos(Videos.data)
                const Playlists = await getAllPlaylistsRequest();
                setPlaylists(Playlists.data);
            } catch (error) {
                console.log("Error al obtener los videos: ", error);
            }
        }
        getDatas();
    }, [])

    const handleAssignPlaylist = (videoId) => {
        setSelectedVideo(videoId);
        setIsPlaylistModalOpen(true);
    };

    const extractYouTubeId = (url) => {
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/))([\w-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : null;
    };

    const handleEditVideo = (videoId) => {
        navigate(`/video-edit?id=${videoId}`);
    };
    const handleDeleteVideo = (videoId) => {
        setSelectedVideo(videoId);
        setIsPinModalOpen(true);
        setRouteP(`toDelete`)
    };

    const handleAssignPlaylistToVideo = async (playlistId) => {
        try {
            console.log("hola")
            const AssignVideo=await addVideoToPlaylist(playlistId, selectedVideo)
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
    const handleLogout = () => {
        logout();
        navigate("");
    }

    return (
        <div className='video-page-container'>
            <div className="Options">
                <div className='redirection-buttons'>
                    <button className="back-button" onClick={() => { navigate("/home") }}>Inicio</button>
                    <button className="add-video-button" onClick={() => { navigate("/register-new-video") }}>Agregar nuevo video</button>
                    <button className="playlist-button" onClick={() => { navigate("/playlistgestor") }}>Playlist</button>
                </div>
                <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <div className='video-list'>

                {videos.map((video) => {
                    const videoId = extractYouTubeId(video.URL);
                    return videoId ? (
                        <div className="video-front" key={video._id}>
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={video.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                            <label className='video-name'>{video.name}</label>
                            <div className='video-buttons'>
                                <button type="button" className="playlist" onClick={() => handleAssignPlaylist(video._id)}>Asignar</button>
                                <button type="button" className="edit" onClick={() => handleEditVideo(video._id)}>Editar</button>
                                <button type="button" className="delete" onClick={() => handleDeleteVideo(video._id)}>Eliminar</button>
                            </div>
                        </div>
                    ) : null;
                })}
            </div>
            {
                isPinModalOpen && (
                    <div className="pin-modal">
                        <div className="modal-content">
                            <h2>Introduce el PIN del padre</h2>
                            <form onSubmit={ParentPinSubmit}>
                                <input
                                    type="password"
                                    placeholder="PIN"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                />
                                {pinError && <p className="error-message">{pinError}</p>}
                                <div className="modal-buttons">
                                    <button className="enter" type="submit">Ingresar</button>
                                    <button className="cancel" type="button" onClick={() => setIsPinModalOpen(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                isPlaylistModalOpen && (
                    <div className="playlist-modal">
                        <div className="modal-content">
                            <h2>Selecciona una playlist</h2>
                            <div className="playlist-list">
                                {playlists.map((playlist) => (
                                    <div
                                        key={playlist._id}
                                        className="playlist-item"
                                        onClick={() => handleAssignPlaylistToVideo(playlist._id)}
                                    >
                                        <span>{playlist.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-buttons">
                                <button className="cancel" type="button" onClick={() => setIsPlaylistModalOpen(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default VideoPage