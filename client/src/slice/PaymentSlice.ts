import { paymentService } from "@/service/payment.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState: {
  paymentLoading: boolean;
  PaymentURL: string|null;
  paymentError: string | null;
} = {
  PaymentURL: null,
  paymentError: null,
  paymentLoading: false,
};

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_SERVER_API
    : "/api";

export const fetchApiPaymentURL = createAsyncThunk(
  "payment URL",
  async (
    {order_id,total}: { order_id: string; total: number },
    { rejectWithValue }
  ) => {
    {
      console.log("id, total in slice: ", order_id);
      //get userid, token, totalCart (number)
      try {
        const response = await paymentService.createPaymentURL(order_id,total);
        return response.PaymentURL;
      } catch (error: any) {
        console.error(error);
        const message = error.response?.data?.Message || "Something went wrong";
        toast.error(message);
      }
    }
  }
);

const PaymentSice = createSlice({
  name: "payment slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiPaymentURL.pending, (state) => {
        state.paymentLoading = true;
      })
      .addCase(fetchApiPaymentURL.fulfilled, (state, action) => {
        state.PaymentURL = action.payload as string;
        state.paymentLoading = false;
      })
      .addCase(fetchApiPaymentURL.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload as string;
      });
  }
});

export const {} = PaymentSice.actions;
export default PaymentSice.reducer;
