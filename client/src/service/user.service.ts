import { myAxios } from "@/config/axios";

export const userService = {
  // PUT /user/updateUser
  updateUser: async (data: {
    user_id: string;
    name: string;
    address: string;
    password: string;
  }) => {
    const response = await myAxios.put("/user/updateUser", data);
    return response.data;
  },

  // GET /user/getAUser?id=...
  getUserById: async (user_id: string) => {
    const response = await myAxios.get(`/user/getAUser?user_id=${user_id}`);
    return response.data;
  },
};