import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
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
        const customError = handleError(error)
        return Promise.reject(customError);
    },
);

axios.interceptors.request.use(
    (config: AxiosRequestConfig<any>) => {
        if (config.url && ExcludedBearer.indexOf(config.url) === -1) {
            const accessToken = store.getState().auth.accessToken;
            //@ts-ignore
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error.response.error);
    },
);

function handleError (error: AxiosError | any) {
    let message = error.message || "Something error"
    let status = 500
    if(error.response){
        if(error.response.data){
            const errorResponse = error.response.data

            console.log("errorResponse....", errorResponse)

            //  Need optimize
            message = errorResponse.error.message
            status = errorResponse.error.status
        }
        console.log("error.response....", {...error})
    } else if (error.request) {
        message = error.message
    }

    return {
        message, status
    }
}
export default axios;
