import { myAxios } from "@/config/axios";
import type { cartItem } from "@/type/types.frontend";

export const cartService = {
  getCart: async (user_id: string) => {
    const response = await myAxios.get(`/cart/getCart?user_id=${user_id}`);
    return response.data;
  },
  addToCart: async (user_id: string, cartItem: cartItem) => {
    console.log("cartItem in addToCart: ",cartItem);
    const response = await myAxios.post(`/cart/addToCart?user_id=${user_id}`, {
      cartItem: cartItem,
    });
    return response.data;
  },
  removeOneItemCart: async (
    user_id: string,
    product_id: string,
    size_id: string,
    color_id: string
  ) => {
    console.log("color_id in removeOneItemCart: ",user_id,product_id,size_id,color_id);
    const response = await myAxios.delete(
      `/cart/removeOneItemCart?user_id=${user_id}&product_id=${product_id}&size_id=${size_id}&color_id=${encodeURIComponent(color_id)}`
    );
    return response.data;
  },
};
