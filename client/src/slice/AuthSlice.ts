import { authService } from "@/service/auth.service";
import type { AuthUser } from "@/type/types.frontend";
import {
  createAsyncThunk,
  createSlice,
  type Action,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

const initialState: { user: AuthUser | null; loading: boolean } = {
  user: null,
  loading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authService.login(email, password);
      //@ts-ignore
      toast.success(data.Message);
      return data;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.Message);
      return rejectWithValue(error.response?.data?.Message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      email,
      password,
      name,
      phone,
    }: { email: string; password: string; name: string; phone: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authService.signup(email, name, password, phone);
      toast.success(data.Message);
      return data;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.Message);
      return rejectWithValue(error.response?.data?.Message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("logout in auth/logout");
      const data = await authService.logout();
      console.log("data in logout: ", data.Message);
      toast.success(data.Message);
      return data;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const slice = createSlice({
  initialState: initialState,
  name: "authSlice",
  reducers: {
    auth: (state, action) => {
      state.user = action.payload;
    },
    reset: (state) => {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // @ts-ignore
        state.user = action.payload;
        console.log(action.payload);
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default slice.reducer;
export const { auth,reset } = slice.actions;
