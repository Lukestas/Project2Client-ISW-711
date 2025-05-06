import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import "./NavBar.scss"

export const NavBar = () => {
    const [searchString, setSearchString] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const { logout } = useAuth();

    const handleSearch = async (e) => {
        try {
            if (!searchString.trim()) {
                setError("Debe ingresar un término de búsqueda");
            }
            setError(null);
            navigate(`/results?search=${searchString}`);
        } catch (error) {
            console.error(error);
            setError("Error al buscar videos en YouTube");
        }
    }

    const handleLogout = () => {
        logout();
        navigate("/")
    }

    return (
        <div className='NavBar'>

            <div className='Redirection-buttons'>
                <button className="go-home" onClick={() => { navigate("/home") }}>Inicio</button>
                <button className="go-video-gestor" onClick={() => { navigate("/videogestor") }}>Videos</button>
                <button className="go-playlist-gestor" onClick={() => { navigate("/playlistgestor") }}>Playlists</button>
            </div>
            <div className='SearchBar'>
                <h1>Buscar Videos</h1>
                <input type="text" placeholder='Buscar...' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                <button onClick={handleSearch}>Buscar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <div className='Logout'>
                <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    )
}

