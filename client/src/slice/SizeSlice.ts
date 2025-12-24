import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SizeOrigin } from "../type/types.frontend";
import { sizeService } from "@/service/size.service";
import { toast } from "react-toastify";
const initialState: {
  loadingSize: boolean;
  sizes: SizeOrigin[];
  size: SizeOrigin | null;
} = {
  loadingSize: false,
  sizes: [],
  size: null,
};

export const fetchGetASize = createAsyncThunk(
  "size/getASize",
  async ({ size_id }: { size_id: string }, { rejectWithValue }) => {
    try {
      const response = await sizeService.getASize(size_id);
      return response.size;
    } catch (error: any) {
      console.error("error fetchGetASize:", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
    }
  }
);

export const fetchGetAllSize = createAsyncThunk(
  "size/getAllSize",
  async (_, { rejectWithValue }) => {
    try {
      const response = await sizeService.getAllSize();
      return response.sizes;
    } catch (error: any) {
      console.log("error in fetchGetAllSize: ", error);
      const message = error.response?.data.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchCreateASize = createAsyncThunk(
  "size/createASize",
  async ({ size_name }: { size_name: string }, { rejectWithValue }) => {
    try {
      const response = await sizeService.createASize(size_name);
      toast.success(response.Message || "Tạo màu thành công");
      return response.newSize;
    } catch (error: any) {
      console.log("error in fetchCreateASize: ", error);
      const message = error.response?.data.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

export const fetchUpdatedSize = createAsyncThunk(
  "size/updatedSize",
  async (
    { size_name, size_id }: { size_name: string; size_id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await sizeService.updateASize(size_id, size_name);
      toast.success(response.Message || "Tạo màu thành công");
      return response.updatedSize;
    } catch (error: any) {
      console.log("error in fetchCreateASize: ", error);
      const message = error.response?.data.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const sizeSlice = createSlice({
  name: "size/sizeSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetASize.pending, (state) => {
        state.loadingSize = true;
      })
      .addCase(fetchGetASize.fulfilled, (state, action) => {
        state.loadingSize = false;
        state.size = action.payload as SizeOrigin;
      })
      .addCase(fetchGetASize.rejected, (state) => {
        state.loadingSize = false;
      })
      .addCase(fetchGetAllSize.pending, (state) => {
        state.loadingSize = true;
      })
      .addCase(fetchGetAllSize.fulfilled, (state, action) => {
        state.loadingSize = false;
        state.sizes = action.payload as SizeOrigin[];
      })
      .addCase(fetchGetAllSize.rejected, (state) => {
        state.loadingSize = false;
      })
      .addCase(fetchCreateASize.pending, (state) => {
        state.loadingSize = true;
      })
      .addCase(fetchCreateASize.fulfilled, (state, action) => {
        state.loadingSize = false;
      })
      .addCase(fetchCreateASize.rejected, (state) => {
        state.loadingSize = false;
      })
      .addCase(fetchUpdatedSize.pending, (state) => {
        state.loadingSize = true;
      })
      .addCase(fetchUpdatedSize.fulfilled, (state) => {
        state.loadingSize = false;
      })
      .addCase(fetchUpdatedSize.rejected, (state) => {
        state.loadingSize = false;
      });
  },
});
 export default sizeSlice.reducer;
