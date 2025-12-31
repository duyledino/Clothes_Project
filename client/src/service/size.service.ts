import { myAxios } from "@/config/axios";

export const sizeService = {
  getAllSize: async () => {
    const response = await myAxios.get("/size/getAllSize");
    return response.data;
  },
  createASize: async (size_name: string) => {
    const response = await myAxios.post("/size/createASize", { size_name });
    return response.data;
  },
  getASize: async (size_id: string) => {
    const response = await myAxios.get(`/size/getASize?size_id=${size_id}`);
    return response.data;
  },
  updateASize: async (size_id: string, size_name: string) => {
    const response = await myAxios.put("/size/updateASize", {
      size_id,
      size_name,
    });
    return response.data;
  },
  deleteASize: async (size_id: string) => {
    const response = await myAxios.delete(
      `/size/deleteASize?size_id=${size_id}`
    );
    return response.data;
  },
};
