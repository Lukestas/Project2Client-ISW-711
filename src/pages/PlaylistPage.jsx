import React, { useEffect, useState } from 'react'
import { assignPlaylistToChildRequest, deletePlaylistRequest, getAllPlaylistsRequest, getChildrensRequest, getParentRequest } from '../api/auth'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form';
import "./scss/PlaylistPage.scss"

function PlaylistPage() {
    const navigate = useNavigate()
    const { handleSubmit } = useForm()
    const [playlists, setPlaylists] = useState([])
    const [children, setChildren] = useState([])
    const [selectedPlaylist, setSelectedPlaylist] = useState(null)
    const { logout } = useAuth()
    const [routeP, setRouteP] = useState("")
    const [isPinModalOpen, setIsPinModalOpen] = useState(false)
    const [pin, setPin] = useState('')
    const [pinError, setPinError] = useState("")
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);

    useEffect(() => {
        const getDatas = async () => {
            try {
                const Playlist = await getAllPlaylistsRequest();
                setPlaylists(Playlist.data)

                const Children = await getChildrensRequest();
                setChildren(Children.data);

            } catch (error) {
                console.log("Error al obtener las playlist: ", error)
            }
        }
        getDatas()
    }, [])

    const handleAssignChild = (playlistID) => {
        setSelectedPlaylist(playlistID);
        setIsAssignModalOpen(true);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const handleEditVideo = (playlistID) => {
        navigate(`/edit-playlist?id=${playlistID}`);
    };
    const handleDeletPlaylist = (playlistID) => {
        setSelectedPlaylist(playlistID);
        setIsPinModalOpen(true);
        setRouteP(`toDelete`)
    };

    const ParentPinSubmit = handleSubmit(async () => {
        const Parent = await getParentRequest();
        if (pin !== Parent.data.pin) {
            return setPinError("el pin es incorrecto")
        }
        try {
            if (routeP === "toDelete") {
                await deletePlaylistRequest(selectedPlaylist);
                const updatedPlaylists = await getAllPlaylistsRequest();
                setPlaylists(updatedPlaylists.data);
            }
            setIsPinModalOpen(false);
        } catch (error) {
            console.log("Error eliminando el video:", error);
            setIsPinModalOpen(false);
            alert("Hubo un error al eliminar el video");
        }
    })

    const handleAssignPlaylistToChild = async (e) => {
        e.preventDefault();
        const Parent = await getParentRequest();
        if (pin !== Parent.data.pin) {
            return setPinError("El PIN es incorrecto");
        }

        if (!selectedChild) {
            return alert("Debes seleccionar un niño");
        }

        try {
            await assignPlaylistToChildRequest(selectedChild._id, selectedPlaylist);
            setIsAssignModalOpen(false);
            setPin('');
            setPinError('');
        } catch (error) {
            console.log("Error al asignar la playlist:", error);
        }
    };

    return (
        <div className='video-page-container'>
            <div className="Options">
                <div className='redirection-buttons'>
                    <button className="back-button" onClick={() => { navigate("/home") }}>Inicio</button>
                    <button className="add-video-button" onClick={() => { navigate("/videogestor") }}>videos</button>
                    <button className="playlist-button" onClick={() => { navigate("/create-playlist") }}>Crear playlist</button>
                </div>
                <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <div className='video-list'>
                {playlists.map((playlist) => (
                    <div className="video-front" key={playlist._id}>
                        <label className='video-name'>{playlist.name}</label>
                        <label className='count-videos'>{playlist.videos?.length || 0} videos</label>
                        <div className='video-buttons'>
                            <button type="button" className="playlist" onClick={() => handleAssignChild(playlist._id)}>Asignar</button>
                            <button type="button" className="edit" onClick={() => handleEditVideo(playlist._id)}>Editar</button>
                            <button type="button" className="delete" onClick={() => handleDeletPlaylist(playlist._id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
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
                                    <button className="enter" type="submit">Asignar</button>
                                    <button className="cancel" type="button" onClick={() => setIsPinModalOpen(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                isAssignModalOpen && (
                    <div className="assign-modal">
                        <div className="modal-content">
                            <h2>Selecciona un niño para asignar la playlist</h2>
                            <div className="children-list">
                                {children.map((child) => (
                                    <div
                                        key={child._id}
                                        className={`child-item ${selectedChild?._id === child._id ? 'selected' : ''}`}
                                        onClick={() => {
                                            console.log('Niño seleccionado:', child);
                                            setSelectedChild(child);
                                          }}
                                        >
                                        <img src={child.avatar} alt={child.name} className="child-avatar" />
                                        <span>{child.name}</span>
                                    </div>
                                ))}
                            </div>
                            <h3>Introduce el PIN del padre</h3>
                            <form onSubmit={handleAssignPlaylistToChild}>
                                <input
                                    type="password"
                                    placeholder="PIN"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                />
                                {pinError && <p className="error-message">{pinError}</p>}
                                <div className="modal-buttons">
                                    <button className="assign" type="submit">Asignar</button>
                                    <button className="cancel" type="button" onClick={() => setIsAssignModalOpen(false)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default PlaylistPage