import React, { useEffect, useState } from 'react'
import { addVideoToPlaylist, disableVideoResquest, getParentRequest } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { NavBar } from '../components/NavBar/NavBar'
import { VideosList } from '../components/videosList/VideosList'
import { getPlaylistByParentId, getVideosByParentId } from '../api/graphqlQuerys'
import "./scss/VideoPage.scss"

// This component is used to display the videos of the parent
// It fetches the videos of the parent and displays them
function VideoPage() {
    const [videos, setVideos] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null); // Video seleccionado para asignar
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getVideosandPlaylist = async () => {
            try {
                const parentRequest = await getParentRequest()
                const videosRequest = await getVideosByParentId(parentRequest.data._id)
                const playlistRequest = await getPlaylistByParentId(parentRequest.data._id)
                setVideos(videosRequest)
                setPlaylists(playlistRequest)
            } catch (error) {
                console.log("Error al obtener los videos: ", error);
            }
        }
        getVideosandPlaylist();
    }, [])

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const handleAssignPlaylist = (videoId) => {
        setSelectedVideo(videoId);
        setIsPlaylistModalOpen(true);
    };

    const handleAssignPlaylistToVideo = async (playlistId) => {
        try {
            const AssignVideo = await addVideoToPlaylist(playlistId, selectedVideo)
            console.log(playlistId,selectedVideo)
            setIsPlaylistModalOpen(false);
        } catch (error) {
            console.error("Error al asignar la playlist: ", error);
        }
    };

    const handleEditVideo = (videoId) => {
        navigate(`/video-edit?id=${videoId}`);
    };


    const handleDisableVideo = async (data) => {
        try {
            console.log("Video desactivado:", data);
            const videoDisableRequest = await disableVideoResquest(data)
            if (!videoDisableRequest) {
                setErrors("No se pudo desactivar el video")
            }
            const parentRequest = await getParentRequest()
            const videosRequest = await getVideosByParentId(parentRequest.data._id)
            setVideos(videosRequest)
        } catch (error) {
            setErrors(error.response?.data?.[0]);
        }
    }

    return (
        <div className='video-page-container'>
            <NavBar />
            <VideosList error={errors} videos={videos} onEditVideo={handleEditVideo} onAddToPlaylist={handleAssignPlaylist} onDisableVideo={handleDisableVideo} />
            {
                isPlaylistModalOpen && (
                    <div className="assign-modal">
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
        </div>
    );
}

export default VideoPage