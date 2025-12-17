import { tryonService } from "@/service/tryon.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState: {
  url: string | null;
  loading: boolean;
  error: string | null;
} = {
  url: null,
  loading: false,
  error: null,
};

export const fetchApiTryon = createAsyncThunk(
  "tryon/post",
  async ({formData}: { formData: FormData }, { rejectWithValue }) => {
    console.log("FormData", formData);
    try {
      const response = await tryonService.postTryon(formData)
      console.log("response: ",response);
      toast.success("Tạo hình thành công");
      return response.data.url;
    } catch (error: any) {
      console.log("error", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const tryonSlice = createSlice({
  name: "tryon slice",
  initialState,
  reducers: {
    resetTryonState: (state) => {
      state.error = null;
      state.url = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiTryon.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchApiTryon.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload as string;
      })
      .addCase(fetchApiTryon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTryonState } = tryonSlice.actions;
export default tryonSlice.reducer;
