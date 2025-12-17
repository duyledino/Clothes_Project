import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Store {
  localStore: Record<string, string>;
}

const initialState: Store = { localStore: {} };

const StoreSlice = createSlice({
  name: "StoreSlice",
  initialState,
  reducers: {
    resetStore: (state) => {
      state.localStore = {};
      localStorage.clear();
    },
    popStore: (state, action: PayloadAction<string>) => {
      delete state.localStore[action.payload];
      localStorage.removeItem(action.payload);
    },
    setStore: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const strValue = JSON.stringify(action.payload.value);
      state.localStore[action.payload.key] = strValue;
      localStorage.setItem(action.payload.key, strValue);
    },
    getStore: (state, action: PayloadAction<string>) => {
      const item = localStorage.getItem(action.payload);
      if (item !== null) {
        state.localStore[action.payload] = item;
      }
    },
  },
});

export const { getStore, popStore, setStore,resetStore } = StoreSlice.actions;
export default StoreSlice.reducer;
