import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_URI} from '../config/commonConfigs';
import {store} from '../../redux/store';

const ExcludedBearer = ['/auth/local'];

axios.defaults.baseURL = API_URI;

axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Edit response config
    return response.data;
  },
  error => {
    console.log('error', error);
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    // console.log('config', config);
    //@ts-ignore
    if (ExcludedBearer.indexOf(config.url) === -1) {
      const accessToken = store.getState().auth.accessToken;
      //@ts-ignore
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  error => {
    return Promise.reject(error.response.data);
  },
);
export default axios;
