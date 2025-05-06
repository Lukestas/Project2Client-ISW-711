import React, { useEffect, useState } from 'react';
import './scss/ChildVideoPage.scss';
import { useLocation } from 'react-router-dom';
import { getPlaylistsByChildId } from '../api/graphqlQuerys';
import { NavBar } from '../components/NavBar/NavBar';

function ChildVideoPage() {
    const [playlists, setPlaylists] = useState([])
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [videos, setVideos] = useState([])
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        const getVideos = async () => {
            try {
                const playlistRequest = await getPlaylistsByChildId(id);
                setPlaylists(playlistRequest);
            } catch (error) {
                console.log("Error fetching videos: ", error);
            }
        };

        getVideos();
    }, []);
    const handleSelectPlaylist = (playlist) => {
        setSelectedPlaylist(playlist);
        setVideos(playlist.videos || []);
    };

    return (
        <div className="child-video-page-container">
            <NavBar/>
            <div className="playlist-list">
                <h2>Selecciona una Playlist</h2>
                {playlists.length > 0 ? (
                    playlists.map((playlist, index) => (
                        <div key={index} className="playlist-item" onClick={() => handleSelectPlaylist(playlist)}>
                            <h3>{playlist.name}</h3>
                            <p>{playlist.videos?.length || 0} videos</p>
                            <button onClick={() => {handleAssignChild(playlist._id)}}>Ver</button>
                            <button onClick={() => handleEditPlaylist(playlist._id)}>Eliminar</button>
                        </div>
                    ))
                ) : (
                    <p>No hay playlists disponibles.</p>
                )}
            </div>
            {selectedPlaylist && (
                <div className="video-child-list">
                    <h2>Videos en la Playlist: {selectedPlaylist.name}</h2>
                    {videos.length > 0 ? (
                        videos.map((video) => {
                            const youtubeid=video.youtubeid;
                            console.log(`https://www.youtube.com/watch?v=${youtubeid}`);
                            return (
                                <div className="video-item" key={video._id}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${youtubeid}`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <h3>{video.title}</h3>
                                    <p>{video.description}</p>
                                </div>
                                );
                        })
                    ) : (
                        <p>No hay videos en esta playlist.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChildVideoPage;