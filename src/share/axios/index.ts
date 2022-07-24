import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_URI} from '../config/commonConfigs';
import {store} from '@/redux/store';
import {Logout} from '@/redux/reducers/auth';

const ExcludedBearer = ['/auth/local'];

axios.defaults.baseURL = API_URI;

axios.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        // Edit response config
        return response.data;
    },
    error => {
        const status = error.response ? error.response.status : null

        if (status === 401) {
            store.dispatch(Logout())
        }
        return Promise.reject(error);
    },
);

axios.interceptors.request.use(
    (config: AxiosRequestConfig<any>) => {
        // console.log('config', config);
        if (config.url && ExcludedBearer.indexOf(config.url) === -1) {
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
