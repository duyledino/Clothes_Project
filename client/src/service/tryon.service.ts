import { myAxios } from "@/config/axios";

export const tryonService = {
  postTryon: async (formData: FormData|{
    imageProduct: string;
    photos: File;
  }) => {
    const response = await myAxios.post(`/tryon/uploadCLothes`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
