import { graphqlRequest } from './graphqlClient.js';

//Call to get all children of a parent
export const getChildrensByParentId = async (id) => {
    const query = `
        query{
		    getParentById(id:"${id}"){
                children{
                    _id,
                    name,
                    avatar,
                    pin
		        }
            }         
        }`;
    const data = await graphqlRequest(query)
    return data.getParentById?.children || [];
}

export const getPlaylistsByChildId = async (id) => {
    
    const query = `
        query{
            getChildById(id:"${id}"){
                playlists{
                    _id,
                    name,
                    videos{_id
                        title,
                        youtubeid,
                        description,
                        thumbnail
                    }
                }
	        }
        }`
    const data = await graphqlRequest(query)
    return data.getChildById?.playlists || [];
}

export const getChildById=async(id)=>{
    const query=`
    query{
        getChildById(id:"${id}"){
            _id,
            name,
            pin,
            avatar
        }
    }`
    const data=await graphqlRequest(query)
    console.log(data)
    return data.getChildById || [];
}

export const getVideosByParentId = async (id) => {
    const query = `
        query{
            getParentById(id:"${id}"){
                videos{
                    _id,
                    title,
                    youtubeid,
                    description,
                    status,
                    thumbnail
                }
            }         
        }`;
    const data = await graphqlRequest(query)
    return data.getParentById?.videos || [];
}

export const getVideoById = async (id) => {
    const query = `
    query{
        getVideoById(youtubeid:"${id}"){
            _id
            youtubeid
            title
            description
            thumbnail
            status    
            }         
        }`;
    const data = await graphqlRequest(query)
    return data.getVideoById || null;
}

export const getPlaylistByParentId = async (id) => {
    const query = `
    query{
        getParentById(id:"${id}"){
            playlists{
                _id,
                name,
                videos{_id}
            }
        }
    }`;
    const data = await graphqlRequest(query)
    return data.getParentById?.playlists || [];
}