import { userService } from "@/service/user.service";
import type { user, userData } from "@/type/types.frontend";
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
} = {
  loadingUser: false,
  data: null,
  errorUser: null,
  Message: null,
  User: null,
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
      const message = error.response?.Message || "Something went wrong";
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
      const message = error.response?.Message || "Something went wrong";
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
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
