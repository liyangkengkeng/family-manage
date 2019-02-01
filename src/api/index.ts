import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
const baseURL = process.env.BASE_URL;

export const apiCreator = () => {
  const instance = axios.create({
    baseURL: `${baseURL}api`,
    timeout: 60000,
    //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  });

  instance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      return config;
    },
    error => {}
  );

  instance.interceptors.response.use(
    (response: any): any => {
      return response;
    },
    error => {}
  );
  return instance;
};
