import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';



const API_KEY_PLANT = process.env.EXPO_PUBLIC_PLANT_API_KEY;

const axiosClientFile: AxiosInstance = axios.create({
  baseURL: 'https://plant.id/api/v3/identification',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Api-Key': API_KEY_PLANT
  },
});

axiosClientFile.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClientFile.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error('Errore Axios:', error.response || error.message);
    return Promise.reject(error.response || error.message);
  }
);

export default axiosClientFile;