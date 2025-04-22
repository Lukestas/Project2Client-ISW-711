const GRAPHQL_ENDPOINT = 'http://localhost:3001/graphql';

export async function graphqlRequest(query, variables = {}) {
    try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const result = await response.json();

        if (result.errors) {
            console.error('GraphQL Errors:', result.errors);
            throw new Error('Error en la consulta GraphQL');
        }

        return result.data;
    } catch (error) {
        console.error('Error en la solicitud GraphQL:', error);
        throw error;
    }
}