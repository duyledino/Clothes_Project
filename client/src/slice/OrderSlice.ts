import { orderService } from "@/service/order.service";
import type {
  detail,
  OrderData,
  OrderUser,
  OrderUserInAdmin,
  paymentAndStatus,
  paymentAndStatusAdmin,
} from "@/type/types.frontend";
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
  OrderUserAdmin: OrderUserInAdmin | null;
} = {
  errorOrder: null,
  loadingOrder: false,
  MessageOrder: null,
  order_id: null,
  Orders: [],
  totalPages: null,
  OrdersUser: [],
  OrderUserAdmin: null,
};

export const fetchApiAllOrder = createAsyncThunk(
  "fetchAllOrder/get",
  async ({ page }: { page: number }, { rejectWithValue }) => {
    try {
      const response = await orderService.getAllOrders(page);
      console.log("resposne: ", response);
      return response.orders;
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
  "update an order/fetchUpdateOrder/get",
  async (
    order: paymentAndStatus,
    // get order id, payment state and order status
    { rejectWithValue }
  ) => {
    try {
      const response = await orderService.updateOrder(order.order_id, {
        payment: order.payment,
        status: order.status,
        shipper_id: null,
      });
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

export const fetchUpdateOrderAdmin = createAsyncThunk(
  "update an order/fetchUpdateOrderAdmin/get",
  async (
    order: paymentAndStatusAdmin,
    // get order id, payment state and order status
    { rejectWithValue }
  ) => {
    try {
      const response = await orderService.updateOrder(order.order_id, {
        payment: order.payment,
        status: order.status,
        shipper_id: order.shipper_id,
      });
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
    { user_id, detail }: { user_id: string; detail: detail[] },
    { rejectWithValue }
  ) => {
    console.log("detail: ", detail); // got this detail[]:
    try {
      const response = await orderService.createOrder(user_id, detail);
      toast.success(response.Message || "Tạo đơn thành công");
      return response;
    } catch (error: any) {
      console.log("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetOrdersByUserId = createAsyncThunk(
  "getOrdersById/get",
  // get user id and detail: detail
  async ({ user_id }: { user_id: string }, { rejectWithValue }) => {
    console.log("detail: ", user_id);
    try {
      const response = await orderService.getOrderByUserId(user_id);
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

export const fetchOrderByOrderId = createAsyncThunk(
  "getOrderByOrderId/get",
  async (order_id: string, { rejectWithValue }) => {
    try {
      console.log("order_id: ", order_id);
      const response = await orderService.getOrderByOrderId(order_id);
      // console.log("repsonse in fetchOrderByOrderId: ", response.order);
      return response.order;
    } catch (error: any) {
      console.error(error);
      const message = error.repsonse?.data?.Message || "Something went wrong";
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
    builder.addCase(fetchGetOrdersByUserId.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchGetOrdersByUserId.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.OrdersUser = action.payload;
    });
    builder.addCase(fetchGetOrdersByUserId.rejected, (state, action) => {
      state.loadingOrder = false;
      state.errorOrder = action.payload as string;
    });
    builder.addCase(fetchOrderByOrderId.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchOrderByOrderId.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.OrderUserAdmin = action.payload! as OrderUserInAdmin;
    });
    builder.addCase(fetchOrderByOrderId.rejected, (state, action) => {
      state.loadingOrder = false;
      // state.errorOrder = action.payload as string;
    });
    builder.addCase(fetchUpdateOrderAdmin.pending, (state) => {
      state.loadingOrder = true;
      state.errorOrder = null;
    });
    builder.addCase(fetchUpdateOrderAdmin.fulfilled, (state, action) => {
      state.loadingOrder = false;
    });
    builder.addCase(fetchUpdateOrderAdmin.rejected, (state, action) => {
      state.loadingOrder = false;
      // state.errorOrder = action.payload as string;
    });
  },
});

export const { resetState } = orderSlice.actions;
export default orderSlice.reducer;
