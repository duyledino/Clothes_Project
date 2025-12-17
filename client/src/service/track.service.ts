import { myAxios } from "@/config/axios";

export const trackService = {
  // GET /track/revenue
  getRevenue: async () => {
    const response = await myAxios.get("/track/revenue");
    return response.data;
  },

  // GET /track/bestSeller
  getBestSeller: async () => {
    const response = await myAxios.get("/track/bestSeller");
    return response.data;
  },

  // GET /track/bestCustomer
  getBestCustomer: async () => {
    const response = await myAxios.get("/track/bestCustomer");
    return response.data;
  },
};