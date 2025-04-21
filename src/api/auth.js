import axios from './axios'

export const registerParentRequest = async (Parent) => axios.post(`auth/register`, Parent)
export const loginParentRequest = async (Parent) => axios.post(`auth/login`, Parent)
export const verifyTokenRequest = async (Parent) => axios.get(`auth/verify`, Parent)
export const logoutParentRequest = async () => axios.post(`auth/logout`)
export const getParentRequest = async () => axios.get('auth/parent')

export const getChildrensRequest = () => axios.get("childrens");

export const registerChildrenRequest = async (Child) => axios.post(`register-child`, Child)
export const getChildRequest = (id) => axios.get(`child?id=${id}`);
export const updateChildRequest = async (id, Child) => axios.put(`child`, Child, { params: { id } });
export const deleteChildByID = (id) => axios.delete("child", { params: { id } });

export const getVideosRequest = async (Videos) => axios.get(`videos`, Videos);

export const registerVideoRequest = async (Video) => axios.post(`video`, Video)
export const getAllVideosRequest = () => axios.get(`allvideos`);
export const getOneVideoRequest = async (id) => axios.get("video", { params: { id } });
export const updateVideoRequest = async (id, Video) => axios.put(`video`, Video, { params: { id } });

export const disableVideoResquest = async (id) => axios.put(`disablevideo`, { videoId: id });


export const removeVideoFromPlaylist = async (id, Video) => axios.put(`removevideo/playlist?id=${id}`, { videoId: Video })

export const getOnePlayListRequest = async (id) => axios.get("playlist", { params: { id } })
export const getAllPlaylistsRequest = () => axios.get("allplaylist");
export const createPlaylistRequest = async (name) => axios.post("playlist", { name: name })
export const deletePlaylistRequest = async (id) => axios.delete("playlist", { data: { playlistID: id } });
export const updatePlaylistRequest = async (id, name) => axios.put(`playlist?id=${id}`, name)

export const assignPlaylistToChildRequest = async (childId, playlistId) => axios.put('assignPlaylist', { childId, playlistId })

export const addVideoToPlaylist = async (id, Video) => axios.put(`addvideo/playlist?id=${id}`, { videoId: Video })

