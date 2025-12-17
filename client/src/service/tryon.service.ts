import { myAxios } from "@/config/axios";

export const tryonService = {
  postTryon: async (formData: FormData) => {
    const response = await myAxios.post(`/tryon/uploadCLothes`,formData);
    return response.data;
  },
};
