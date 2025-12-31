import { myAxios } from "@/config/axios";

export const roleService = {
  // Get all roles
  getAllRole: async () => {
    const response = await myAxios.get("/role/getAllRole");
    return response.data;
  },

  // Create a role
  createARole: async (role_name: string) => {
    const response = await myAxios.post("/role/createARole", {
      role_name,
    });
    return response.data;
  },

  // Get a role by id
  getARole: async (role_id: string) => {
    const response = await myAxios.get(`/role/getARole?role_id=${role_id}`);
    return response.data;
  },

  // Update a role
  updateARole: async (role_id: string, role_name: string) => {
    const response = await myAxios.put("/role/updateARole", {
      role_id,
      role_name,
    });
    return response.data;
  },
  deleteARole: async (role_id: string) => {
    const response = await myAxios.delete(
      `/role/deleteARole?role_id=${role_id}`
    );
    return response.data;
  },
};
