import { myAxios } from "@/config/axios";

export const providerService = {
  getAllProvider: async () => {
    const response = await myAxios.get("/provider/getAllProvider");
    return response.data; // Expected: { success: true, data: ProviderOrigin[] }
  },

  createAProvider: async (provider_id: string, provider_name: string) => {
    const response = await myAxios.post("/provider/createAProvider", {
      provider_id,
      provider_name,
    });
    return response.data; // Expected: { success: true, message: string, data: ProviderOrigin }
  },

  getAProvider: async (provider_id: string) => {
    const response = await myAxios.get(
      `/provider/getAProvider?provider_id=${provider_id}`
    );
    return response.data; // Expected: { success: true, data: ProviderOrigin }
  },

  updateAProvider: async (provider_id: string, provider_name: string) => {
    const response = await myAxios.put("/provider/updateAProvider", {
      provider_id,
      provider_name,
    });
    return response.data; // Expected: { success: true, message: string, data: ProviderOrigin }
  },
};
