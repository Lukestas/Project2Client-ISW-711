import React, { useEffect, useState } from "react";
import './EditPlaylistPage.scss'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { removeVideoFromPlaylist, getOnePlayListRequest, getParentRequest, registerChildrenRequest, updatePlaylistRequest } from "../../api/auth";

function EditPlaylistPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [videos, setVideos] = useState([])

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const [playlist, setPlaylist] = useState(null)

    useEffect(() => {
        const getPlaylist = async () => {
            try {
                const Playlist = await getOnePlayListRequest(id);
                setPlaylist(Playlist.data)
            } catch (error) {
                setError(error)
            }
        }
        getPlaylist()
    }, [])

    const onSubmit = handleSubmit(async (values) => {
        try {
            await updatePlaylistRequest(id, values);
            navigate("/playlistgestor")
        } catch (error) {
            setError("Error al actualizar el playlist")
        }

    })

    const handleRemoveVideo = async (videoID) => {
        try {
            await removeVideoFromPlaylist(id, videoID);
            const Playlist = await getOnePlayListRequest(id);
            setPlaylist(Playlist.data)
        } catch (error) {
            console.error("Error al eliminar el video:", error);
        }
    };

    const extractYouTubeId = (url) => {
        if (!url) return null; // Asegurarse de que la URL esté definida antes de intentar hacer match
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/))([\w-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : null;
    };

    return (
        <div className="edit-playlist-container">
            <form className="form-edit" onSubmit={onSubmit}>
                <h1 className="title-edit">Editar Playlist</h1>
                {error && <p className="error-message">{error}</p>}

                <div className="input-container">
                    <label>Nombre del playlist</label>
                    <input type="text" className="inputs" {...register('name', { required: true })} defaultValue={playlist?.name || ''} />
                    {errors.name && <p className="required">Se requiere un nombre</p>}
                </div>
                {playlist && (
                    <div className="video-list">
                        <h2>Videos en la Playlist</h2>
                        {playlist.videos.length === 0 ? (
                            <p>No hay videos en esta playlist</p>
                        ) : (
                            playlist.videos.map((video) => (
                                <div key={video._id} className="video-item">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${extractYouTubeId(video.URL)}`}
                                        title={video.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                    <label className='video-name'>{video.name}</label>
                                    <div className='video-buttons'>
                                        <button type="button" className="delete" onClick={() => handleRemoveVideo(video._id)}>Remover</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
                <div className="button-container">
                    <button className="buttons" type="submit">Actualizar</button>
                </div>
                <div className="cancel-link">
                    <Link to="/playlistgestor">Cancelar</Link>
                </div>
            </form>

        </div>
    );
}

export default EditPlaylistPage;
