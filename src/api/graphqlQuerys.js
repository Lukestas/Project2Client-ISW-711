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

export const getPlaylistsByChildId= async (id) => {
    const query = `
        query{
            getChildById(id:"${id}"){
                playlists{
                    _id,
                    name,
                    videos{
                        _id,
                        name,
                        description,
                        url
                    }
                }
            }         
        }`;
    const data = await graphqlRequest(query)
    console.log(data.getChildById?.playlists)
    return data.getChildById?.playlists || [];
}
