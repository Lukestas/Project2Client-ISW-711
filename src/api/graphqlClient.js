import axios from "./axios";

//Communication with the server using GraphQL
//This function sends a GraphQL request to the server and returns the response data

export async function graphqlRequest(query, variables = {}) {
    try {

        const config={
            headers:{}
        }

        const response= await axios.post('/graphql', {
            query,
            variables,
        }, config);

        if (response.data.errors) {
            console.error('GraphQL Errors:', response.data.errors);
            throw new Error(response.data.errors[0]?.message || 'Error en la consulta GraphQL');
          }

          return response.data.data;
    } catch (error) {
        console.error('Error en la solicitud GraphQL:', error);
        throw error;
    }
}