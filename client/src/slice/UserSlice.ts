import { userService } from "@/service/user.service";
import type {
  shipperInOrderProfile,
  user,
  userData,
  userDetailInAdminPanel,
  userInAdminPanel,
} from "@/type/types.frontend";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { tr } from "zod/v4/locales";

const initialState: {
  loadingUser: boolean;
  data: userData | null;
  errorUser: string | null;
  Message: string | null;
  User: user | null;
  AllUser: userInAdminPanel[];
  User_Admin: userDetailInAdminPanel | null;
  AllUserShipper: shipperInOrderProfile[];
} = {
  AllUserShipper: [],
  loadingUser: false,
  data: null,
  errorUser: null,
  Message: null,
  User: null,
  AllUser: [],
  User_Admin: null,
};

export const fetchUpdateUser = createAsyncThunk(
  "updateUser/put",
  async (
    {
      user_id,
      password,
      address,
      name,
    }: {
      user_id: string;
      password: string;
      address: string;
      name: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.updateUser({
        user_id,
        password,
        address,
        name,
      });
      toast.success(response.Message || "Cập nhật thành công");
      return response.Message;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchUpdateUserAdmin = createAsyncThunk(
  "updateUserAdmin/put",
  async (
    {
      user_id,
      password,
      address,
      name,
      status,
      role_id,
    }: {
      user_id: string;
      password: string;
      address: string;
      name: string;
      status: boolean;
      role_id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.updateUserAdmin({
        user_id,
        password,
        address,
        name,
        status,
        role_id,
      });
      toast.success(response.Message || "Cập nhật thành công");
      return response.Message;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "fetchUserById/get",
  async ({ user_id }: { user_id: string }, { rejectWithValue }) => {
    try {
      console.log(
        "import.meta.env.VITE_NODE_ENV: ",
        import.meta.env.VITE_NODE_ENV
      );
      const response = await userService.getUserById(user_id);
      console.log("response.data in userSlice: ", response.user);
      return response.user;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetAllUser = createAsyncThunk(
  "user/getAllUser",
  async (
    { page, role_id }: { page: number; role_id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.getAllUser(page, role_id);
      console.log("response.data in userSlice: ", response.users);
      return response.users;
    } catch (error: any) {
      console.error("error in fetchGetAllUser: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetAUser_Admin = createAsyncThunk(
  "user/GetAUser_Admin",
  async (user_id: string, { rejectWithValue }) => {
    try {
      console.log("user_id: ", user_id);
      const response = await userService.getAUser_Admin(user_id);
      console.log("response.data in userSlice: ", response.user);
      return response.user;
    } catch (error: any) {
      console.error("error in GetAUser_Admin: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchUserIsShipperByName = createAsyncThunk(
  "user/fetchUserIsShipperByName/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getAllUserIsShipperByRoleName(
      );
      console.log(
        "response.data in getAllUserIsShipperByRoleName: ",
        response.users
      );
      return response.users;
    } catch (error: any) {
      console.error("error in getAllUserIsShipperByRoleName: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
export const fetchCreateAUserAdmin = createAsyncThunk(
  "user/createAUserAdmin/post",
  async (
    data: {
      email: string;
      password: string;
      name: string;
      phone: string;
      role_id: string;
      address: string;
      status: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.createAUserAdmin(data);
      console.log("response.data in createAUserAdmin: ", response.Message);
      toast.success(response.Message);
      return response.Message;
    } catch (error: any) {
      console.error("error in createAUserAdmin: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user Slice",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.data = null;
      state.errorUser = null;
      state.Message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.Message = action.payload as string;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.errorUser = action.payload as string;
      });
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.User = action.payload as user;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loadingUser = false;
        state.errorUser = action.payload as string;
      });
    builder
      .addCase(fetchGetAllUser.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(fetchGetAllUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.AllUser = action.payload! as userInAdminPanel[];
      })
      .addCase(fetchGetAllUser.rejected, (state, action) => {
        state.loadingUser = false;
      });
    builder
      .addCase(fetchGetAUser_Admin.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(fetchGetAUser_Admin.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.User_Admin = action.payload! as userDetailInAdminPanel;
      })
      .addCase(fetchGetAUser_Admin.rejected, (state, action) => {
        state.loadingUser = false;
      });
    builder
      .addCase(fetchUserIsShipperByName.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(fetchUserIsShipperByName.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.AllUserShipper = action.payload! as shipperInOrderProfile[];
      })
      .addCase(fetchUserIsShipperByName.rejected, (state, action) => {
        state.loadingUser = false;
      });
    builder
      .addCase(fetchCreateAUserAdmin.pending, (state, action) => {
        state.loadingUser = true;
      })
      .addCase(fetchCreateAUserAdmin.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.Message = action.payload! as string;
      })
      .addCase(fetchCreateAUserAdmin.rejected, (state, action) => {
        state.loadingUser = false;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
