import CartIem from "@/components/guest/CartIem";
import { cartService } from "@/service/cart.service";
import type { cartItem } from "@/type/types.frontend";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState: {
  loading: boolean;
  error: string | null;
  Message: string | null;
  carts: cartItem[];
} = {
  carts: [],
  loading: false,
  error: null,
  Message: null,
};

export const fetchApiCart = createAsyncThunk(
  "cart/getCart",
  async (user_id: string, { rejectWithValue }) => {
    try {
      const data = await cartService.getCart(user_id);
      console.log("data.carts: ",data.carts);
      return data.carts; 
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Failed to fetch cart";
      return rejectWithValue(message);
    }
  }
);

//     cartItem:  {
// productId String
// count     Int     @default(0)
// subtotal  BigInt  @default(0)
//     }
export const fetchApiAddToCart = createAsyncThunk(
  "cart/addToCart",
  //NOTE: get cartItem and user id
  async (
    { user_id, cartItem }: { user_id: string; cartItem: cartItem },
    { rejectWithValue }
  ) => {
    try {
      const data = await cartService.addToCart(user_id, cartItem);
      toast.success(data.Message || "Added to cart!");
      return data;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Failed to add item";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 3. DELETE CART ITEM
  // get product id
export const fetchApiDeleteACart = createAsyncThunk(
  "cart/deleteItem",
  async (
    {
      userId,
      productId,
      sizeId,
      colorId,
    }: { userId: string; productId: string; sizeId: string; colorId: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await cartService.removeOneItemCart(
        userId,
        productId,
        sizeId,
        colorId
      );
      toast.success(data.Message || "Item removed!");
      return data;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Failed to delete item";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const CartSlice = createSlice({
  name: "cart slice",
  initialState,
  reducers: {
    refeshAddToCart: (state) => {
      state.error = null;
      state.Message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchApiCart.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchApiAddToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiAddToCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload in cartSlice: ", action.payload);
      })
      .addCase(fetchApiAddToCart.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchApiDeleteACart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiDeleteACart.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload in cartSlice: ", action.payload);
      })
      .addCase(fetchApiDeleteACart.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { refeshAddToCart } = CartSlice.actions;
export default CartSlice.reducer;
