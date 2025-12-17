import { myAxios } from "@/config/axios";

export const productService = {
  // GET /product/bestSellerProducts
  getBestSellers: async () => {
    const response = await myAxios.get("/product/bestSellerProducts");
    return response.data;
  },

  // GET /product/lastestProducts
  // Note: Keeping your API typo 'lastest' to ensure it connects to backend
  getLatestProducts: async () => {
    const response = await myAxios.get("/product/lastestProducts");
    return response.data;
  },

  // POST /product/allProducts (Public Filter)
  getAllProductsPublic: async (
    page: number,
    filters: { category: string[]; sort: string }
  ) => {
    const response = await myAxios.post(
      `/product/allProducts?page=${page}`,
      filters
    );
    return response.data;
  },

  // GET /product/allProductsAdmin (Admin View)
  getAllProductsAdmin: async (page: number) => {
    const response = await myAxios.get(
      `/product/allProductsAdmin?page=${page}`
    );
    return response.data;
  },

  // POST /product/createAProduct
  // Accepts FormData for image uploads
  createProduct: async (
    productData:
      | FormData
      | {
          images: [];
          title: string;
          description: string;
          price: number;
        }
  ) => {
    const response = await myAxios.post(
      "/product/createAProduct",
      productData,
      {
        headers: {
          // If sending FormData, Axios usually sets this automatically,
          // but explicit is okay too if needed.
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // GET /product/getProductById
  getProductById: async (product_id: string) => {
    console.log("product_id: >>>>>>>>>>>", product_id);
    const response = await myAxios.get(`/product/getProductById?product_id=${product_id}`);
    return response.data;
  },

  // POST /product/getTotalPage
  getTotalPage: async (filters: {
    category: string[];
  }) => {
    const response = await myAxios.post("/product/getTotalPage", filters);
    return response.data;
  },

  // GET /product/findProduct
  searchProduct: async (query: string) => {
    const response = await myAxios.get(`/product/findProduct?query=${query}`);
    return response.data;
  },

  // DELETE /product/deleteProduct
  deleteProducts: async (ids: string[]) => {
    // Remember: DELETE requires 'data' field for body content
    const response = await myAxios.delete("/product/deleteProduct", {
      data: { ids },
    });
    return response.data;
  },

  // PUT /product/reviseProduct
  reviseProducts: async (ids: string[]) => {
    const response = await myAxios.put("/product/reviseProduct", { ids });
    return response.data;
  },
};
