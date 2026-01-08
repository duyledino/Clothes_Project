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

export const sendVerifyMail = createAsyncThunk(
  "auth/sendVerifyMail",
  async (
    { user_id }: { user_id: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authService.sendVerifyMail(user_id);
      toast.success(data.Message);
      return data;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.Message);
      return rejectWithValue(error.response?.data?.Message);
    }
  }
);

export const sendVerifyForgetPasswordMail = createAsyncThunk(
  "auth/sendVerifyForgetPasswordMail",
  async (
    { email }: { email: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authService.sendVerifyForgetPasswordMail(email);
      toast.success(data.Message);
      return data;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.Message);
      return rejectWithValue(error.response?.data?.Message);
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (
    { token, user_id }: { token: string; user_id: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authService.verify(token, user_id);
      toast.success(data.Message);
      return data;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.Message);
      return rejectWithValue(error.response?.data?.Message);
    }
  }
);

export const verifyForgetPassword = createAsyncThunk(
  "auth/verifyForgetPassword",
  async (
    { token, user_id,password }: { token: string; user_id: string,password:string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authService.forgetPassword(token, user_id,password);
      toast.success(data.Message);
      return data;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.Message);
      return rejectWithValue(error.response?.data?.Message);
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
      })
      .addCase(sendVerifyMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendVerifyMail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendVerifyMail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendVerifyForgetPasswordMail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendVerifyForgetPasswordMail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendVerifyForgetPasswordMail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verify.pending, (state) => {
        state.loading = true;
      })
      .addCase(verify.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verify.rejected, (state) => {
        state.loading = false;
      })
      .addCase(verifyForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyForgetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyForgetPassword.rejected, (state) => {
        state.loading = false;
      })
      ;
  },
});

export default slice.reducer;
export const { auth,reset } = slice.actions;
