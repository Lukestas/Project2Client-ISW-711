import axios from "axios";

// Create an axios instance with a base URL and credentials
// This allows you to make requests to the backend server with the specified base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
})

export default axiosInstance 