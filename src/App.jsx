import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss'
import { AuthProvider } from './context/AuthContext';
import { AuthChildProvider } from './context/AuthChildContext';

import ProtectedRoute from './ProtectedRoute';

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';

import HomePage from './pages/HomePage';
import RegisterChildPage from './components/registerChild/registerChildPage';
import EditChildPage from './components/editChild/EditChildPage';

import RegisterVideoPage from './components/registerVideo/registerVideoPage';
import VideoPage from './pages/VideoPage';
import EditVideoPage from './components/editVideo/editVideoPage'

import PlaylistPage from './pages/PlaylistPage';
import CreatePlaylist from './components/createPlaylist/CreatePlaylistPage';
import EditPlaylistPage from './components/EditPlaylist/EditPlaylistPage';

import ChildVideoPlay from './pages/ChildVideoPage'
import VerificationPage from './pages/VerificationPage';
import VerificationMail from './pages/VerificationMail';
import { ResultsVideoSearchPage } from './pages/ResultsVideoSearchPage';
import { VerificationSMSPage } from './pages/VerificationSMSPage';

function App() {
  return (
    <div className='app-container'>
      <AuthProvider>
        <AuthChildProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path="*" element={<h1>La pagina no existe</h1>} />
              <Route path='/verification' element={<VerificationPage />} />
              <Route path='/verify-email' element={<VerificationMail />} />
              <Route path='/verify-sms' element={<VerificationSMSPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/home' element={<HomePage />} />

                <Route path='/register-child' element={<RegisterChildPage />} />
                <Route path="/child-edit" element={<EditChildPage />} />

                <Route path='/videogestor' element={<VideoPage />} />
                <Route path='/register-new-video' element={<RegisterVideoPage />} />
                <Route path="/video-edit" element={<EditVideoPage />} />
                <Route path="/results" element={<ResultsVideoSearchPage />} />

                <Route path="/playlistgestor" element={<PlaylistPage />} />
                <Route path="/create-playlist" element={<CreatePlaylist />} />
                <Route path="/edit-playlist" element={<EditPlaylistPage />} />
                <Route path="/child-page" element={<ChildVideoPlay />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthChildProvider>
      </AuthProvider>
    </div>
  )
}

export default App