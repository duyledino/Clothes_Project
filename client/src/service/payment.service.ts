import { myAxios } from "@/config/axios";

export const paymentService = {
  createPaymentURL: async (order_id: string, total: number) => {
    const response = await myAxios.post("/payment/createPayment", {
      order_id,
      total,
    });
    return response.data;
  },
};
