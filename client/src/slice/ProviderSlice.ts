import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProviderOrigin } from "../type/types.frontend"; // Ensure this type exists based on your Prisma model
import { providerService } from "@/service/provider.service";
import { toast } from "react-toastify";

interface ProviderState {
  loadingProvider: boolean;
  providers: ProviderOrigin[];
  provider: ProviderOrigin | null;
  total_provider: number;
}

const initialState: ProviderState = {
  loadingProvider: false,
  providers: [],
  provider: null,
  total_provider: 0,
};

export const fetchGetAllProvider = createAsyncThunk(
  "provider/getAllProvider",
  async (_, { rejectWithValue }) => {
    try {
      const response = await providerService.getAllProvider();
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Không thể lấy danh sách nhà cung cấp";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetAProvider = createAsyncThunk(
  "provider/getAProvider",
  async ({ provider_id }: { provider_id: string }, { rejectWithValue }) => {
    try {
      const response = await providerService.getAProvider(provider_id);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Không tìm thấy nhà cung cấp";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCreateAProvider = createAsyncThunk(
  "provider/createAProvider",
  async (
    {
      provider_name,
      provider_id,
    }: { provider_id: string; provider_name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await providerService.createAProvider(
        provider_id,
        provider_name
      );
      toast.success(response.message || "Tạo nhà cung cấp thành công");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Lỗi khi tạo nhà cung cấp";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchUpdateAProvider = createAsyncThunk(
  "provider/updateAProvider",
  async (
    {
      provider_id,
      provider_name,
    }: { provider_id: string; provider_name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await providerService.updateAProvider(
        provider_id,
        provider_name
      );
      toast.success(response.message || "Cập nhật nhà cung cấp thành công");
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Lỗi khi cập nhật nhà cung cấp";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchDeleteAProvider = createAsyncThunk(
  "provider/fetchDeleteAProvider",
  async ({ provider_id }: { provider_id: string }, { rejectWithValue }) => {
    try {
      const response = await providerService.deleteAProvider(provider_id);
      toast.success(response.Message || "Xóa nhà cung cấp thành công");
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    clearProviderDetail: (state) => {
      state.provider = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(fetchGetAllProvider.pending, (state) => {
        state.loadingProvider = true;
      })
      .addCase(fetchGetAllProvider.fulfilled, (state, action) => {
        state.loadingProvider = false;
        state.providers = action.payload.providers as ProviderOrigin[];
        state.total_provider = action.payload.total_provider as number;
      })
      .addCase(fetchGetAllProvider.rejected, (state) => {
        state.loadingProvider = false;
      })
      // Get Single
      .addCase(fetchGetAProvider.pending, (state) => {
        state.loadingProvider = true;
      })
      .addCase(fetchGetAProvider.fulfilled, (state, action) => {
        state.loadingProvider = false;
        state.provider = action.payload;
      })
      .addCase(fetchGetAProvider.rejected, (state) => {
        state.loadingProvider = false;
      })

      .addCase(fetchDeleteAProvider.pending, (state) => {
        state.loadingProvider = true;
      })
      .addCase(fetchDeleteAProvider.fulfilled, (state) => {
        state.loadingProvider = false;
      })
      .addCase(fetchDeleteAProvider.rejected, (state) => {
        state.loadingProvider = false;
      })

      // Create & Update
      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") && action.type.includes("Provider"),
        (state) => {
          state.loadingProvider = true;
        }
      )
      .addMatcher(
        (action) =>
          (action.type.endsWith("/fulfilled") ||
            action.type.endsWith("/rejected")) &&
          action.type.includes("Provider"),
        (state) => {
          state.loadingProvider = false;
        }
      );
  },
});

export const { clearProviderDetail } = providerSlice.actions;
export default providerSlice.reducer;
