import { inventoryService } from "@/service/inventory.service";
import type {
  InventoryInAdmin,
  InventoryInSearchAdmin,
  StockReceipt,
} from "@/type/types.frontend";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: {
  Inventories: InventoryInAdmin[];
  total_page: number;
  loadingInventory: boolean;
  InventoriesSearch: InventoryInSearchAdmin[];
} = {
  InventoriesSearch: [],
  Inventories: [],
  total_page: 0,
  loadingInventory: false,
};

export const fetchGetAllInventory = createAsyncThunk(
  "fetchGetAllInventory/get",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await inventoryService.getAllInventory(page);
      return response; // backend returns 2 values {inventories, total_page};
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCreateStockReceipt = createAsyncThunk(
  "fetchCreateStockReceipt/post",
  async (stockReceipt: StockReceipt, { rejectWithValue }) => {
    try {
      const repsonse = await inventoryService.createStockReceipt(stockReceipt);
      return repsonse.Message;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetInventoryBySearchingNameOrId = createAsyncThunk(
  "fetchGetInventoryBySearchingNameOrId/get",
  async (query: string, { rejectWithValue }) => {
    try {
      const repsonse = await inventoryService.getInventoryBySearchingNameOrId(
        query
      );
      return repsonse.inventories;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
const InventorySlice = createSlice({
  initialState,
  name: "InventorySlice",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetAllInventory.pending, (state) => {
        state.loadingInventory = true;
      })
      .addCase(fetchGetAllInventory.fulfilled, (state, action) => {
        state.Inventories = action.payload.inventories as InventoryInAdmin[];
        state.total_page = action.payload.total_page;
        state.loadingInventory = false;
      })
      .addCase(fetchGetAllInventory.rejected, (state, action) => {
        state.loadingInventory = false;
      });
    builder
      .addCase(fetchCreateStockReceipt.pending, (state) => {
        state.loadingInventory = true;
      })
      .addCase(fetchCreateStockReceipt.fulfilled, (state, action) => {
        state.loadingInventory = false;
      })
      .addCase(fetchCreateStockReceipt.rejected, (state, action) => {
        state.loadingInventory = false;
      });
    builder
      .addCase(fetchGetInventoryBySearchingNameOrId.pending, (state) => {
        state.loadingInventory = true;
      })
      .addCase(
        fetchGetInventoryBySearchingNameOrId.fulfilled,
        (state, action) => {
          state.loadingInventory = false;
          state.InventoriesSearch = action.payload as InventoryInSearchAdmin[];
        }
      )
      .addCase(
        fetchGetInventoryBySearchingNameOrId.rejected,
        (state, action) => {
          state.loadingInventory = false;
        }
      );
  },
});

export const {} = InventorySlice.actions;
export default InventorySlice.reducer;
