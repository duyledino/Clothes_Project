import { orderService } from "@/service/order.service";
import type { detail, OrderData, OrderUser, paymentAndStatus } from "@/type/types.frontend";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState: {
  order_id: string | null;
  errorOrder: string | null;
  loadingOrder: boolean;
  MessageOrder: string | null;
  Orders: OrderData[];
  totalPages: number | null;
  OrdersUser: OrderUser[];
} = {
  errorOrder: null,
  loadingOrder: false,
  MessageOrder: null,
  order_id: null,
  Orders: [],
  totalPages: null,
  OrdersUser: [],
};

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_SERVER_API
    : "/api";

export const fetchApiAllOrder = createAsyncThunk(
  "fetchAllOrder/get",
  async ({page}:{ page: number }, { rejectWithValue }) => {
    try {
      const response = orderService.getAllOrders(page);
      console.log("resposne: ", response);
      return response;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
    }
  }
);
export const fetchTotalOrderPage = createAsyncThunk(
  "fetchTotalPage/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getTotalPage();
      console.log("total page: ", response);
      return response;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
    }
  }
);

export const fetchUpdateOrder = createAsyncThunk(
  "update an order",
  async (
     order: paymentAndStatus,
    // get order id, payment state and order status
    { rejectWithValue }
  ) => {
    try {
      const response = await orderService.updateOrder(order.order_id,{payment: order.payment,status: order.status})
      toast.success(response.Message);
      return response;
    } catch (error: any) {
      console.log("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

//NOTE: remember to add reducer to store !!!
export const fetchCreateOrder = createAsyncThunk(
  "create an order",
  // get user id and detail: detail
  async (
     {user_id,detail}:{user_id: string; detail: detail[] },
    { rejectWithValue }
  ) => {
    console.log("detail: ", detail); // got this detail[]:
    try {
      const response = await orderService.createOrder(user_id,detail);
      toast.success(response.Message||"Tạo đơn thành công");
      return response;
    } catch (error: any) {
      console.log("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetOrdersById = createAsyncThunk(
  "getOrdersById/get",
  // get user id and detail: detail
  async ({user_id}: { user_id: string }, { rejectWithValue }) => {
    console.log("detail: ", user_id);
    try {
      const response = await orderService.getOrderById(user_id);
      console.log("get order by id: ", response.orders);
      return response.orders;
    } catch (error: any) {
      console.log("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetState: (state) => {
      console.log("refresh state. ✅");
      state.MessageOrder = null;
      state.errorOrder = null;
    },
  },
  extraReducers: (builder) => {
    //fetchCreateOrder
    builder.addCase(fetchCreateOrder.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      console.log("✅ Payload received:", action.payload); // doesn't log
      state.order_id = action.payload.order_id as string;
      state.MessageOrder = action.payload.Message as string;
    });
    builder.addCase(fetchCreateOrder.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
    //fetchUpdateOrder
    builder.addCase(fetchUpdateOrder.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchUpdateOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.MessageOrder = action.payload as string;
    });
    builder.addCase(fetchUpdateOrder.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
    //fetchAllOrder
    builder.addCase(fetchApiAllOrder.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchApiAllOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.Orders = action.payload;
    });
    builder.addCase(fetchApiAllOrder.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
    //fetch total page
    builder.addCase(fetchTotalOrderPage.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchTotalOrderPage.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.totalPages = action.payload as number;
    });
    builder.addCase(fetchTotalOrderPage.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
    builder.addCase(fetchGetOrdersById.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchGetOrdersById.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.OrdersUser = action.payload;
    });
    builder.addCase(fetchGetOrdersById.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
  },
});

export const { resetState } = orderSlice.actions;
export default orderSlice.reducer;
