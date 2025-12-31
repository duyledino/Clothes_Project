import { myAxios } from "@/config/axios";
import type { StockReceipt } from "@/type/types.frontend";

export const inventoryService = {
  getAllInventory: async (page: number) => {
    const response = await myAxios.get(
      `/inventory/getAllInventory?page=${page}`
    );
    return response.data;
  },
  getAllStockReceipt: async (page: number) => {
    const response = await myAxios.get(
      `/stockReceipt/getAllStockReceipt?page=${page}`
    );
    return response.data;
  },
  getStockReceiptByReceiptId: async (receipt_id: string) => {
    const response = await myAxios.get(
      `/stockReceipt/getStockReceiptByReceiptId?receipt_id=${receipt_id}`
    );
    return response.data;
  },
  createStockReceipt: async (stockReceipt: StockReceipt) => {
    console.log("stockReceipt in service:",stockReceipt);
    const response = await myAxios.post(`/stockReceipt/createStockReceipt`, {
      provider_id: stockReceipt.provider_id,
      user_id: stockReceipt.user_id,
      stock_receipt_detail: stockReceipt.stock_receipt_detail,
    });
    return response.data;
  },
  getInventoryBySearchingNameOrId: async (query: string) => {
    const response = await myAxios.get(
      `/inventory/getInventoryBySearchingNameOrId?query=${query}`
    );
    return response.data;
  },
  getInventoryFollowingCart: async (user_id: string) => {
    const response = await myAxios.get(
      `/inventory/getInventoryFollowingCart?user_id=${user_id}`,
    );
    return response.data;
  },
  updateNewMinQuantityInventory: async (inventory_id: string, new_min_quantity: number) => {
    const response = await myAxios.put(
      `/inventory/updateNewMinQuantityInventory`,
      {
        inventory_id: inventory_id,
        new_min_quantity: new_min_quantity,
      }
    );
    return response.data;
  },
};
