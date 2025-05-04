import './VideoList.scss'

export const VideosList = ({ error, videos, onSaveVideo, onAddToPlaylist, onDisableVideo, onEditVideo }) => {

    return (
        <div className='video-list'>
            {videos.map((video) => (
                <div key={video.id} className='video-item'>
                    {error && <div className="error">{error}</div>}
                    <img src={video.thumbnail} alt={video.title} />
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <div className='video-actions'>
                        {onSaveVideo && (
                            <button onClick={() => onSaveVideo({
                                youtubeid: video.id,
                                title: video.title,
                                description: video.description,
                                thumbnail: video.thumbnail,
                                status: "enable"
                            })}>Guardar Video</button>
                        )}
                        {onEditVideo && (
                            <button onClick={() => onEditVideo(video.youtubeid)}>Editar Video</button>
                        )}
                        {onDisableVideo && (
                            <button onClick={() => onDisableVideo(video.youtubeid)}>Eliminar Video</button>
                        )}
                        {onAddToPlaylist && (
                            <button onClick={() => onAddToPlaylist(video.youtubeid)}>Agregar a Playlist</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
