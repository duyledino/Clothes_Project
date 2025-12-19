import { myAxios } from "@/config/axios";
import type { detail, paymentAndStatus } from "@/type/types.frontend";

export const orderService = {
  // GET /order/allOrders?page=...
  getAllOrders: async (page: number) => {
    const response = await myAxios.get(`/order/allOrders?page=${page}`);
    return response.data;
  },

  // GET /order/getTotalPage
  getTotalPage: async () => {
    const response = await myAxios.get("/order/getTotalPage");
    return response.data;
  },

  // PUT /order/updateOrder?id=... (Body: payment, status)
  updateOrder: async (order_id: string, data: { payment: string; status: string }) => {
    console.log("order_id",order_id);
    const response = await myAxios.put(`/order/updateOrder?order_id=${order_id}`, data);
    return response.data;
  },

  // POST /order/createAOrder (Body: userId, details)
  createOrder: async (user_id: string, details: detail[]) => {
    const response = await myAxios.post("/order/createAOrder", {
      user_id: user_id,
      details: details,
    });
    return response.data;
  },

  // GET /order/getOrderById?id=...
  getOrderById: async (user_id: string) => {
    const response = await myAxios.get(`/order/getOrderById?user_id=${user_id}`);
    return response.data;
  },
};