import axios from '@/share/axios';
import {store} from '@/redux/store';

export const getShippingPlans = async (params: {}) => {
    try {
        const {data, meta}: any = await axios.get('/shipping-plans', {
            params: {
                ...params,
                populate: '*',
                'sort[0]': "id:DESC"
            },
        });

        return {data, meta};
    } catch (err) {
        throw err;
    }
};

export const getShippingPlanById = async (id: string | number) => {
    try {
        const data = await axios.get('/shipping-plans/' + id + '?populate=*');
        //  check shipper
        const {user} = store.getState().auth
        if(!user) throw {message: "Chưa đăng nhập", status: 403}
        if(!data.data.attributes.shipper || user.id !== data.data.attributes.shipper.data.id) {
            throw {message: "Không tìm thấy data", status: 404}
        }
        return data;
    } catch (err) {
        throw err;
    }
};

export const updateShippingPlan = async (id: string | number, payload: any) => {
    try {
        const data = await axios.put('/shipping-plans/' + id, {
            data: payload
        });
        return data;
    } catch (err) {
        throw err;
    }
};

export const createShippingPlan = async (payload: any) => {
    try {
        const {data} = await axios.post('/shipping-plans', {
            data: payload
        });
        return data;
    } catch (err) {
        throw err;
    }
};
