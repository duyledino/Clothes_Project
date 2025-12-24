import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { roleService } from "@/service/role.service";
import type { RoleOrigin } from "../type/types.frontend";

const initialState: {
  loadingRole: boolean;
  roles: RoleOrigin[];
  role: RoleOrigin | null;
} = {
  loadingRole: false,
  roles: [],
  role: null,
};


export const fetchGetAllRole = createAsyncThunk(
  "role/getAllRole",
  async (_, { rejectWithValue }) => {
    try {
      const response = await roleService.getAllRole();
      return response.roles;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetARole = createAsyncThunk(
  "role/getARole",
  async ({ role_id }: { role_id: string }, { rejectWithValue }) => {
    try {
      const response = await roleService.getARole(role_id);
      return response.role;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCreateARole = createAsyncThunk(
  "role/createARole",
  async ({ role_name }: { role_name: string }, { rejectWithValue }) => {
    try {
      const response = await roleService.createARole(role_name);
      toast.success(response.Message || "Tạo role thành công");
      return response.newRole;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchUpdateARole = createAsyncThunk(
  "role/updateARole",
  async (
    { role_id, role_name }: { role_id: string; role_name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await roleService.updateARole(
        role_id,
        role_name
      );
      toast.success(response.Message || "Cập nhật role thành công");
      return response.updatedRole;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


const roleSlice = createSlice({
  name: "role/roleSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetAllRole.pending, (state) => {
        state.loadingRole = true;
      })
      .addCase(fetchGetAllRole.fulfilled, (state, action) => {
        state.loadingRole = false;
        state.roles = action.payload as RoleOrigin[];
      })
      .addCase(fetchGetAllRole.rejected, (state) => {
        state.loadingRole = false;
      })

      .addCase(fetchGetARole.pending, (state) => {
        state.loadingRole = true;
      })
      .addCase(fetchGetARole.fulfilled, (state, action) => {
        state.loadingRole = false;
        state.role = action.payload as RoleOrigin;
      })
      .addCase(fetchGetARole.rejected, (state) => {
        state.loadingRole = false;
      })

      .addCase(fetchCreateARole.pending, (state) => {
        state.loadingRole = true;
      })
      .addCase(fetchCreateARole.fulfilled, (state) => {
        state.loadingRole = false;
      })
      .addCase(fetchCreateARole.rejected, (state) => {
        state.loadingRole = false;
      })

      .addCase(fetchUpdateARole.pending, (state) => {
        state.loadingRole = true;
      })
      .addCase(fetchUpdateARole.fulfilled, (state) => {
        state.loadingRole = false;
      })
      .addCase(fetchUpdateARole.rejected, (state) => {
        state.loadingRole = false;
      });
  },
});

export default roleSlice.reducer;
