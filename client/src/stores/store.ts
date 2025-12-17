import { configureStore } from "@reduxjs/toolkit";
import SearchBarReducer from "@/slice/SearchBarSlice";
import ProductReducer from "@/slice/ProductSlice";
import UserReducer from "@/slice/UserSlice";
import TrackReducer from "@/slice/TrackSlice";
import CartReducer from "@/slice/CartSlice";
import OrderReducer from "@/slice/OrderSlice";
import PaymentReducer from "@/slice/PaymentSlice";
import TryonReducer from "@/slice/TryonSlice";
import ReviewReducer from "@/slice/ReviewSlice";
import ChatReducer from "@/slice/ChatSlice";
import StoreReducer from "@/slice/StoreSlice";
import AuthReducer from "@/slice/AuthSlice";

export const store = configureStore({
  reducer: {
    AuthSlice:AuthReducer,
    StoreSlice: StoreReducer,
    SearchBar: SearchBarReducer,
    ProductSlice: ProductReducer,
    UserSlice: UserReducer,
    TrackSlice: TrackReducer,
    CartSlice: CartReducer,
    OrderSlice: OrderReducer,
    PaymentSlice: PaymentReducer,
    TryonSlice: TryonReducer,
    ReviewSlice: ReviewReducer,
    ChatSlice: ChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
