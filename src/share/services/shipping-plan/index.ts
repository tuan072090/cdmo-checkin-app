import axios from '@/share/axios';

export const getShippingPlanService = async (params: {}) => {
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
        return data;
    } catch (err) {
        throw err;
    }
};

export const updateShippingPlan = async (id: string | number, payload: any) => {
    try {
        console.log("update shipping plan with payload......", payload)
        const data = await axios.put('/shipping-plans/' + id, {
            data: payload
        });
        return data;
    } catch (err) {
        throw err;
    }
};
