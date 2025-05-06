import axios from './axios'


//All the requests to the backend are here
//Parent requests, Child requests, Video requests, Playlist requests, etc.

export const registerParentRequest = async (Parent) => axios.post(`api/auth/register`, Parent)
export const loginParentRequest = async (Parent) => axios.post(`api/auth/login`, Parent)
export const verifyTokenRequest = async (Parent) => axios.get(`api/auth/verify`, Parent)
export const logoutParentRequest = async (id) => axios.post(`api/auth/logout`, {id})
export const getParentRequest = async () => axios.get('api/auth/parent')

export const getChildrensRequest = () => axios.get("api/childrens");

export const registerChildrenRequest = async (Child) => axios.post(`api/register-child`, Child)
export const getChildRequest = (id) => axios.get(`api/child?id=${id}`);
export const updateChildRequest = async (id, Child) => axios.put(`api/child`, Child, { params: { id } });
export const deleteChildByID = (id) => axios.delete("api/child", { params: { id } });

export const getVideosRequest = async (Videos) => axios.get(`api/videos`, Videos);

export const registerVideoRequest = async (Video) => axios.post(`api/video`, Video)
export const getAllVideosRequest = () => axios.get(`api/allvideos`);


export const getOneVideoRequest = async (id) => axios.get(`api/video?youtubeid=${id}`);


export const updateVideoRequest = async (id, title, description) => axios.put(`api/video?youtubeid=${id}`,{title,description});

export const disableVideoResquest = async (id) => axios.put(`api/disablevideo`, { youtubeid: id });


export const removeVideoFromPlaylist = async (id, Video) => axios.put(`api/removevideo/playlist?id=${id}`, { videoId: Video })

export const getOnePlayListRequest = async (id) => axios.get("api/playlist", { params: { id } })
export const getAllPlaylistsRequest = () => axios.get("api/allplaylist");

export const createPlaylistRequest = async (name) => axios.post("api/playlist", name)

export const deletePlaylistRequest = async (id) => axios.delete("api/playlist", { data: { playlistID: id } });
export const updatePlaylistRequest = async (id, name) => axios.put(`api/playlist?id=${id}`, name)

export const assignPlaylistToChildRequest = async (childId, playlistId) => axios.put('api/assignPlaylist', { childId, playlistId })

export const addVideoToPlaylist = async (id, Video) => axios.put(`api/addvideo/playlist?id=${id}`, { youtubeid: Video })
export const vertifyEmailRequest = async (token) => axios.get(`api/auth/verify-email?token=${token}`)

export const verifyPinParentRequest = async (pin) => axios.get(`api/auth/verifyPinParent`, pin)
export const verifyPinChildRequest = async (pin, id) => axios.get(`api/child/verifyPinChild`, pin, id)

export const getYoutubeSearchRequest = async (query) => axios.get(`api/youtubesearch?search=${query}`)

export const verificationSMSRequest=async(phone,code)=> axios.post("/api/auth/verify-code", {phone, code});
export const sendSMSVerificationRequest=async(phone)=>axios.post("/api/auth/send-code", {phone} );