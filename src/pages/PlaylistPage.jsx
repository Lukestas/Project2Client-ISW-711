import React, { useEffect, useState } from 'react'
import { assignPlaylistToChildRequest, deletePlaylistRequest, getParentRequest } from '../api/auth'
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar/NavBar';
import "./scss/PlaylistPage.scss"
import { getChildrensByParentId, getPlaylistByParentId } from '../api/graphqlQuerys';


// This component is used to display the playlists of the parent
// It fetches the playlists of the parent and displays them
// It also allows the parent to create, edit and delete playlists
// It also allows the parent to assign playlists to children
function PlaylistPage() {
    const navigate = useNavigate()
    const [playlists, setPlaylists] = useState([])
    const [error, setError] = useState(null);
    const [children, setChildren] = useState([])
    const [selectedPlaylist, setSelectedPlaylist] = useState([])
    const [isAssignModalOpen, setIsAssignModalOpen] = useState("")

    useEffect(() => {
        const getPlaylists = async () => {
            try {
                const parentRequest = await getParentRequest();
                const playlistsRequest = await getPlaylistByParentId(parentRequest.data._id);
                const childrenRequest = await getChildrensByParentId(parentRequest.data._id)
                setChildren(childrenRequest)
                setPlaylists(playlistsRequest);
            } catch (error) {
                console.error("Error al obtener las playlists:", error);
                setError("No se pudieron cargar las playlists.");
            }
        }
        getPlaylists()
    }, [])

    const handleAssignChild = (playlistID) => {
        setSelectedPlaylist(playlistID);
        setIsAssignModalOpen(true);
    };

    const handleCreatePlaylist = () => {
        navigate("/create-playlist")
    }

    const handleEditPlaylist = (playlistId) => {
        navigate(`/edit-playlist?id=${playlistId}`);
    };


    const handleAssignPlaylistToChild = async (selectedChild) => {
        try {
            await assignPlaylistToChildRequest(selectedChild._id, selectedPlaylist);
            setIsAssignModalOpen(false);
        } catch (error) {
            console.log("Error al asignar la playlist:", error);
        }
    };

    return (
        <div className='playlist-page-container'>
            <NavBar />
            <div className='playlist-option'>
                <h1>Playlists</h1>
                <button className="add-playlist-button" onClick={handleCreatePlaylist}>
                    Crear playlist
                </button>
            </div>
            <div className='playlist-list'>
                {playlists.length > 0 ? (
                    playlists.map((playlist, index) => (
                        <div key={index} className="playlist-item">
                            <h3>{playlist.name}</h3>
                            <p>{playlist.videos?.length || 0} videos</p>
                            <button onClick={() => handleAssignChild(playlist._id)}>Asignar</button>
                            <button onClick={() => handleEditPlaylist(playlist._id)}>Editar</button>
                        </div>
                    ))
                ) : (
                    <p>No hay playlists disponibles.</p>
                )}
            </div>
            {
                isAssignModalOpen && (
                    <div className="assign-modal">
                        <div className="modal-content">
                            
                            <h2>Selecciona un niño para asignar la playlist</h2>
                            <div className="children-list">
                                {children.map((child) => (
                                    <div
                                        key={child._id}
                                        className="child-item"
                                        onClick={() => {
                                            handleAssignPlaylistToChild(child);
                                        }}
                                    >
                                        <img src={child.avatar} alt={child.name} className="child-avatar" />
                                        <span>{child.name}</span>
                                    </div>
                                ))}
                                <div className="modal-cancel-button">
                                <button className="cancel" type="button" onClick={() => setIsAssignModalOpen(false)}>Cancelar</button>
                            </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default PlaylistPage