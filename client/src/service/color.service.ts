import { myAxios } from "@/config/axios";

export const colorService = {
  getAllColor: async () => {
    const response = await myAxios.get("/color/getAllColor");
    return response.data;
  },

  createAColor: async (color_name: string, color_code: string) => {
    const response = await myAxios.post("/color/createAColor", {
      color_name,
      color_code,
    });
    return response.data;
  },

  getAColor: async (color_id: string) => {
    const response = await myAxios.get(`/color/getAColor?color_id=${color_id}`);
    return response.data;
  },

  updateAColor: async (
    color_id: string,
    color_name: string,
  ) => {
    const response = await myAxios.put("/color/updateAColor", {
      color_id,
      color_name,
    });
    return response.data;
  },
};
