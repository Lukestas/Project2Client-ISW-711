import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { disableVideoResquest, getYoutubeSearchRequest, registerVideoRequest } from "../api/auth";
import "./scss/ResultsVideoSearch.scss"
import { NavBar } from "../components/NavBar/NavBar";
import { VideosList } from "../components/videosList/VideosList";

export const ResultsVideoSearchPage = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const videosResquest = async () => {
      try {
        const videoSearchRequest = await getYoutubeSearchRequest(searchQuery);
        if (!videoSearchRequest) {
          setError("No se encontraron resultados para la búsqueda");
        }
        setVideos(videoSearchRequest.data);
        console.log(videoSearchRequest.data);
      } catch (error) {
        setErrors(error.response?.data?.[0]);
      }
    }
    if (searchQuery) {
      videosResquest();
    }
    else {
      setError("No se encontraron terminos para realizar la búsqueda")
    }
  }, [searchQuery]);

  const handleSaveVideo = async (data) => {
    try {
      console.log("Video guardado:", data);
      const videoSaveRequest = await registerVideoRequest(data);
      if (!videoSaveRequest) {
        setErrors("No se pudo guardar el video");
      }
      navigate("/videogestor")
    } catch (error) {
      console.error("Error al guardar el video:", error);
      setErrors(error.response?.data?.[0]);

    }
  }

  return (
    <div className="results-video-search-page">
      <NavBar />
      <h1>Resultados de Búsqueda</h1>
        <VideosList error={errors} videos={videos} onSaveVideo={handleSaveVideo} />
    </div>
  )
}
