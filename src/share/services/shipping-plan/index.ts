import axios from '@/share/axios';

export const getShippingPlanService = async () => {
  try {
    const {data, meta}:any = await axios.get('/shipping-plans');

    return {data, meta}
  } catch (err) {
    throw err
  }
};
