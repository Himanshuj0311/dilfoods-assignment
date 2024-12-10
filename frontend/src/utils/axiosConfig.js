import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust based on your backend's URL
});

export default axiosInstance;
