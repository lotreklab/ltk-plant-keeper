import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
/* import {API_KEY} from "@env" */

console.log('Config:', Config);

const API_KEY = Config.API_KEY;
interface AxiosClientConfig extends AxiosRequestConfig {
  baseURL: string;
  timeout: number;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://open.plantbook.io/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + API_KEY,
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error('Errore Axios:', error.response || error.message);
    return Promise.reject(error.response || error.message);
  }
);

export default axiosClient;