import axios from "@/share/axios";

export const getShippingPlanService = async () => {
  try {
    const { data, meta }: any = await axios.get("/shipping-plans");

    return { data, meta };
  } catch (err) {
    throw err;
  }
};
export const getShippingPlanById = async (id: string | number) => {
  try {
    const data = await axios.get("/shipping-plans/" + id + "?populate=*");
    return data;
  } catch (err) {
    throw err;
  }
};
