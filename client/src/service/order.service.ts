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
  updateOrder: async (
    order_id: string,
    data: { payment: string; status: string; shipper_id: string | null }
  ) => {
    console.log("order_id", order_id);
    const response = await myAxios.put(
      `/order/updateOrder?order_id=${order_id}`,
      data
    );
    return response.data;
  },

  // POST /order/createAOrder (Body: userId, details)
  createOrder: async (user_id: string, details: detail[], method: string) => {
    const response = await myAxios.post("/order/createAOrder", {
      user_id: user_id,
      details: details,
      method: method,
    });
    return response.data;
  },

  // GET /order/getOrderByUserId?user_id=...
  getOrderByUserId: async (user_id: string) => {
    const response = await myAxios.get(
      `/order/getOrderByUserId?user_id=${user_id}`
    );
    return response.data;
  },
  getOrderByOrderId: async (order_id: string) => {
    const response = await myAxios.get(
      `/order/getOrderByOrderId?order_id=${order_id}`
    );
    return response.data;
  },
  getDoneOrders: async (shipper_id: string, page: number) => {
    const response = await myAxios.get(`/order/getDoneOrders?shipper_id=${shipper_id}&page=${page}`);
    return response.data;
  },
  getPrepareOrders: async (page: number) => {
    const response = await myAxios.get(`/order/getPrepareOrders?page=${page}`);
    return response.data;
  },
  getShippingOrdersByShipperId: async (shipper_id: string, page: number) => {
    const response = await myAxios.get(
      `/order/getShippingOrdersByShipperId?shipper_id=${shipper_id}&page=${page}`
    );
    return response.data;
  },
  getShipperOrderDetail: async (order_id: string) => {
    const response = await myAxios.get(`/order/getShipperOrderDetail?order_id=${order_id}`);
    return response.data;
  },
  updateShipperDelivered: async (order_id: string) => {
    const response = await myAxios.put(`/order/updateShipperDelivered?order_id=${order_id}`);
    return response.data;
  },
  updateShipperRejected: async (order_id: string) => {
    const response = await myAxios.put(`/order/updateShipperRejected?order_id=${order_id}`);
    return response.data;
  },
  updateShipperTakeOrder: async(order_id:string,shipper_id:string)=>{
    const resposne = await myAxios.put(`/order/updateShipperTakeOrder?order_id=${order_id}&shipper_id=${shipper_id}`)
    return resposne.data;
  }
};
