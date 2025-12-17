import { myAxios } from "@/config/axios";

export const reviewService = {
  // GET /review/getReviewByProduct?product_id=...
  getReviewsByProduct: async (product_id: string) => {
    const response = await myAxios.get(
      `/review/getReviewByProduct?product_id=${product_id}`
    );
    return response.data;
  },

  // POST /review/createAReviewByUser?user_id=...
  createReview: async (
    user_id: string,
    data: { product_id: string; score: number; content: string }
  ) => {
    const response = await myAxios.post(
      `/review/createAReviewByUser?user_id=${user_id}`,
      data
    );
    return response.data;
  },

  // PUT /review/updateAReviewByUser?product_id=...&user_id=...
  updateReview: async (
    user_id: string,
    product_id: string,
    data: { score: number; content: string }
  ) => {
    const response = await myAxios.put(
      `/review/updateAReviewByUser?product_id=${product_id}&user_id=${user_id}`,
      data
    );
    return response.data;
  },

  // DELETE /review/deleteAReviewByUser?product_id=...&user_id=...
  deleteReview: async (user_id: string, product_id: string) => {
    const response = await myAxios.delete(
      `/review/deleteAReviewByUser?product_id=${product_id}&user_id=${user_id}`
    );
    return response.data;
  },
};