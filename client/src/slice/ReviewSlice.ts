import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resetState } from "./OrderSlice";
import type { Review, ReviewState } from "@/type/types.frontend";
import { toast } from "react-toastify";
import { reviewService } from "@/service/review.service";

// Define the Review type

const initialState: ReviewState = {
  Reviews: [],
  loadingReview: false,
  errorReview: null,
};

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_SERVER_API
    : "/api";

// Async thunk for fetching reviews by product ID
export const fetchReviewsByProductId = createAsyncThunk(
  "reviews/fetchByProductId",
  async (product_id: string, { rejectWithValue }) => {
    try {
      const response = await reviewService.getReviewsByProduct(product_id);
      return response as Review[];
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Failed to fetch reviews";
        toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Async thunk for creating a review
export const createReview = createAsyncThunk(
  "reviews/create",
  async (
    {
      product_id,
      user_id,
      score,
      content,
    }: {
      product_id: string;
      user_id: string;
      score: number;
      content: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response =await reviewService.createReview(user_id,{product_id,content,score});
      return response.data as Review;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Failed to create review";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for updating a review
export const updateReview = createAsyncThunk(
  "reviews/update",
  async (
    {
      product_id,
      user_id,
      score,
      content,
    }: {
      product_id: string;
      user_id: string;
      score: number;
      content: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await reviewService.updateReview(user_id,product_id,{score,content})
      return response as Review;
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Failed to update review";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for deleting a review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (
    {
      product_id,
      user_id,
    }: { product_id: string; user_id: string},
    { rejectWithValue }
  ) => {
    try {
      const response = await reviewService.deleteReview(user_id,product_id);
      return { product_id, user_id }; // Return the deleted review's ID for updating the state
    } catch (error: any) {
      const message =
        error.response?.data?.Message || "Failed to delete review";
        toast(message);
      return rejectWithValue(message);
    }
  }
);

// Create the review slice
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetStateReview: (state) => {
      state.errorReview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.loadingReview = true;
        state.errorReview = null;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.Reviews = action.payload;
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.payload as string;
      })
      .addCase(createReview.pending, (state) => {
        state.loadingReview = true;
        state.errorReview = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.Reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.payload as string;
      })
      .addCase(updateReview.pending, (state) => {
        state.loadingReview = true;
        state.errorReview = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.Reviews = state.Reviews.map((review) =>
          review.product_id === action.payload.product_id &&
          review.user_id === action.payload.user_id
            ? action.payload
            : review
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.payload as string;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loadingReview = true;
        state.errorReview = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loadingReview = false;
        state.Reviews = state.Reviews.filter(
          (review) =>
            review.product_id !== action.payload.product_id ||
            review.user_id !== action.payload.user_id
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loadingReview = false;
        state.errorReview = action.payload as string;
      });
  },
});

export const { resetStateReview } = reviewSlice.actions;
export default reviewSlice.reducer;
