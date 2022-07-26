import axios from '@/share/axios';

export const getShippingPlanService = async (params: {}) => {
    try {
        const {data, meta}: any = await axios.get('/shipping-plans', {
            params: {
                ...params,
                populate: '*',
            },
        });

        return {data, meta};
    } catch (err) {
        throw err;
    }
};
