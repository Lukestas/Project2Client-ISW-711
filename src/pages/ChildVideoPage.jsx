import React, { useEffect, useState } from 'react';
import './scss/ChildVideoPage.scss';
import { getChildRequest, getOnePlayListRequest } from '../api/auth';
import { useLocation } from 'react-router-dom';

function ChildVideoPage() {
    const location=useLocation()
    const [videos, setVideos] = useState([]);
    const [child, setChild]=useState(null)
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        const getVideos = async () => {
            try {
                const Child= await getChildRequest(id)
                setChild(Child.data)
                const playlist = await getOnePlayListRequest(Child.data.playlist);
                setVideos(playlist.data.videos);
            } catch (error) {
                console.log("Error fetching videos: ", error);
            }
        };

        getVideos();
    }, []);

    const extractYouTubeId = (url) => {
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/))([\w-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : null;
    };

    return (
        <div className="child-video-page-container">
            <h1>Videos disponibles para ver</h1>
            <div className="video-list">
                {videos.map((video) => {
                    const videoId = extractYouTubeId(video.URL);
                    return videoId ? (
                        <div className="video-item" key={video._id}>
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={video.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="video-name">{video.name}</div>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
}

export default ChildVideoPage;