import { trackService } from "@/service/track.service";
import type { BestCustomer, BestSeller, Revenue } from "@/type/types.frontend";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initState = {
  loading: false,
  error: null as string | null,
  revenue: [] as Revenue[],
  bestSeller: [] as BestSeller[],
  bestCustomer: [] as BestCustomer[],
};

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_SERVER_API
    : "/api";

export const fetchRevenue = createAsyncThunk(
  "fetch revenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trackService.getRevenue();
      return response.revenue;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
export const fetchBestSeller = createAsyncThunk(
  "fetch bestSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trackService.getBestSeller();
      return response.bestSeller;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(error);
    }
  }
);

export const fetchBestCustomer = createAsyncThunk(
  "fetch bestCustomer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trackService.getBestCustomer();
      return response.bestCustomer;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);
const trackSlice = createSlice({
  name: "track",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRevenue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRevenue.fulfilled, (state, action) => {
      state.loading = false;
      state.revenue = action.payload;
    });
    builder.addCase(fetchRevenue.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : null;
    });
    builder.addCase(fetchBestSeller.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBestSeller.fulfilled, (state, action) => {
      state.loading = false;
      state.bestSeller = action.payload;
    });
    builder.addCase(fetchBestSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : null;
    });
    builder.addCase(fetchBestCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBestCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.bestCustomer = action.payload;
    });
    builder.addCase(fetchBestCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : null;
    });
  },
});

export const {} = trackSlice.actions;

export default trackSlice.reducer;
