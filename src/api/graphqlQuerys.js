import { graphqlRequest } from './graphqlClient.js';

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
