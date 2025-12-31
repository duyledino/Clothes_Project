import { myAxios } from "@/config/axios";

export const categoryService = {
  getAllCategory: async () => {
    const response = await myAxios.get("/category/getAllCategory");
    return response.data;
  },
  getAllCategoryAdmin: async () => {
    const response = await myAxios.get("/category/getAllCategoryAdmin");
    return response.data;
  },
  createACategory: async (category_name: string) => {
    const response = await myAxios.post("/category/createACategory", {
      category_name,
    });
    return response.data;
  },

  getACategory: async (category_id: string) => {
    const response = await myAxios.get(
      `/category/getACategory?category_id=${category_id}`
    );
    return response.data;
  },

  updateACategory: async (category_id: string, category_name: string) => {
    const response = await myAxios.put("/category/updateACategory", {
      category_id,
      category_name,
    });
    return response.data;
  },
  deleteACategory: async (category_id: string) => {
    const response = await myAxios.delete(
      `/category/deleteACategory?category_id=${category_id}`
    );
    return response.data;
  },
};
