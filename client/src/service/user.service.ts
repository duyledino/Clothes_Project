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

  updateUserAdmin: async (data: {
    user_id: string;
    name: string;
    address: string;
    password: string;
    status: boolean;
    role_id: string;
  }) => {
    const response = await myAxios.put("/user/updateUser_admin", data);
    return response.data;
  },

  // GET /user/getAUser?id=...
  getUserById: async (user_id: string) => {
    const response = await myAxios.get(`/user/getAUser?user_id=${user_id}`);
    return response.data;
  },

  getAllUser: async(page: number,role_id:string)=>{
    const response = await myAxios.get(`/user/getAllUser?page=${page}&role_id=${role_id}`);
    return response.data;
  },

  getAUser_Admin:  async(user_id:string)=>{
    const response = await myAxios.get(`/user/getAUser_Admin?user_id=${user_id}`);
    return response.data;
  },

  getAllUserIsShipperByRoleName:async()=>{
    const response = await myAxios.get(`/user/getAllUserIsShipperByRoleName?role_name=${"shipper"}`);
    return response.data;
  },

  createAUserAdmin: async (data: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role_id: string;
    address: string;
    status: boolean;
  }) => {
    const response = await myAxios.post("/user/createAUserAdmin", data);
    return response.data;
  },
};