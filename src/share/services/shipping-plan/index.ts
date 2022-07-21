import axios from '../../axios';

export const getShippingPlanService = async () => {
  try {
    const data = await axios.get('/shipping-plans');
    return data
  } catch (err) {
    return err;
  }
};
