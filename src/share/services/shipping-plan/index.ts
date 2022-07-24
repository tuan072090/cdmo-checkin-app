import axios from '@/share/axios';

export const getShippingPlanService = async () => {
  try {
    const data = await axios.get('/shipping-plans');
    return data
  } catch (err) {
    console.log('err...', err)
    throw err
  }
};
