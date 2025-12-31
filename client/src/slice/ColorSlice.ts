import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { ColorOrigin } from "../type/types.frontend";
import { colorService } from "@/service/color.service";

const initialState: {
  loadingColor: boolean;
  colors: ColorOrigin[];
  color: ColorOrigin | null;
} = {
  loadingColor: false,
  colors: [],
  color: null,
};

export const fetchGetAllColor = createAsyncThunk(
  "color/getAllColor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await colorService.getAllColor();
      return response.colors;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetAColor = createAsyncThunk(
  "color/getAColor",
  async ({ color_id }: { color_id: string }, { rejectWithValue }) => {
    try {
      const response = await colorService.getAColor(color_id);
      return response.color;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCreateAColor = createAsyncThunk(
  "color/createAColor",
  async (
    { color_name, color_code }: { color_name: string; color_code: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await colorService.createAColor(color_name, color_code);
      toast.success(response.message || "Tạo màu thành công");
      return response.newColor;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchUpdateAColor = createAsyncThunk(
  "color/updateAColor",
  async (
    {
      color_id,
      color_name,
    }: {
      color_id: string;
      color_name: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await colorService.updateAColor(color_id, color_name);
      toast.success(response.message || "Cập nhật màu thành công");
      return response.updatedColor;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchDeleteAColor = createAsyncThunk(
  "color/deleteAColor",
  async (
    {
      color_id,
    }: {
      color_id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await colorService.deleteAColor(color_id);
      toast.success(response.message || "Xóa màu thành công");
      return response.updatedColor;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const colorSlice = createSlice({
  name: "color/colorSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetAllColor.pending, (state) => {
        state.loadingColor = true;
      })
      .addCase(fetchGetAllColor.fulfilled, (state, action) => {
        state.loadingColor = false;
        state.colors = action.payload as ColorOrigin[];
      })
      .addCase(fetchGetAllColor.rejected, (state) => {
        state.loadingColor = false;
      })

      .addCase(fetchGetAColor.pending, (state) => {
        state.loadingColor = true;
      })
      .addCase(fetchGetAColor.fulfilled, (state, action) => {
        state.loadingColor = false;
        state.color = action.payload as ColorOrigin;
      })
      .addCase(fetchGetAColor.rejected, (state) => {
        state.loadingColor = false;
      })

      .addCase(fetchCreateAColor.pending, (state) => {
        state.loadingColor = true;
      })
      .addCase(fetchCreateAColor.fulfilled, (state) => {
        state.loadingColor = false;
      })
      .addCase(fetchCreateAColor.rejected, (state) => {
        state.loadingColor = false;
      })

      .addCase(fetchUpdateAColor.pending, (state) => {
        state.loadingColor = true;
      })
      .addCase(fetchUpdateAColor.fulfilled, (state) => {
        state.loadingColor = false;
      })
      .addCase(fetchUpdateAColor.rejected, (state) => {
        state.loadingColor = false;
      })
      .addCase(fetchDeleteAColor.pending, (state) => {
        state.loadingColor = true;
      })
      .addCase(fetchDeleteAColor.fulfilled, (state) => {
        state.loadingColor = false;
      })
      .addCase(fetchDeleteAColor.rejected, (state) => {
        state.loadingColor = false;
      });
  },
});

export default colorSlice.reducer;
