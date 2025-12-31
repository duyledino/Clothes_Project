import { inventoryService } from "@/service/inventory.service";
import type {
  InventoryInAdmin,
  InventoryInCartUser,
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
  InventoriesCartUser: InventoryInCartUser[];
  stockReceipts: StockReceipt[];
  stockReceiptDetail: StockReceipt|null;
  total_stock_page:number
} = {
  InventoriesSearch: [],
  Inventories: [],
  total_page: 0,
  loadingInventory: false,
  InventoriesCartUser: [],
  stockReceipts: [],
  total_stock_page: 0,
  stockReceiptDetail: null,
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

export const fetchGetAllStockReceipt = createAsyncThunk(
  "fetchGetAllStockReceipt/get",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await inventoryService.getAllStockReceipt(page);
      return response; // backend returns 2 values {stockReceipts, total_page};
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

export const fetchGetInventoryFollowingCart = createAsyncThunk(
  "fetchGetInventoryFollowingCart/get",
  async (user_id: string, { rejectWithValue }) => {
    try {
      const repsonse = await inventoryService.getInventoryFollowingCart(
        user_id
      );
      return repsonse.inventories;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


export const fetchUpdateNewMinQuantityInventory = createAsyncThunk(
  "fetchUpdateNewMinQuantityInventory/put",
  async ({inventory_id, new_min_quantity}: {inventory_id: string, new_min_quantity: number}, { rejectWithValue }) => {
    try {
      const repsonse = await inventoryService.updateNewMinQuantityInventory(
        inventory_id, new_min_quantity
      );
      toast.success(repsonse.Message);
      return repsonse.Message;
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetStockReceiptByReceiptId = createAsyncThunk(
  "fetchGetStockReceiptByReceiptId/get",
  async (receipt_id: string, { rejectWithValue }) => {
    try {
      const repsonse = await inventoryService.getStockReceiptByReceiptId(
        receipt_id
      );
      return repsonse.stockReceipt;
    } catch (error: any) {
      console.log(error);
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
    builder
      .addCase(fetchGetInventoryFollowingCart.pending, (state) => {
        state.loadingInventory = true;
      })
      .addCase(
        fetchGetInventoryFollowingCart.fulfilled,
        (state, action) => {
          state.loadingInventory = false;
          state.InventoriesCartUser = action.payload as InventoryInCartUser[];
        }
      )
      .addCase(
        fetchGetInventoryFollowingCart.rejected,
        (state, action) => {
          state.loadingInventory = false;
        }
      );
    builder
      .addCase(fetchUpdateNewMinQuantityInventory.pending, (state) => {
        state.loadingInventory = true;
      })
      .addCase(fetchUpdateNewMinQuantityInventory.fulfilled, (state, action) => {
        state.loadingInventory = false;
      })
      .addCase(fetchUpdateNewMinQuantityInventory.rejected, (state, action) => {
        state.loadingInventory = false;
      });
    builder
      .addCase(fetchGetAllStockReceipt.pending, (state) => {
        state.loadingInventory = true;
      })
      .addCase(fetchGetAllStockReceipt.fulfilled, (state, action) => {
        state.loadingInventory = false;
        state.stockReceipts = action.payload.stockReceipts as StockReceipt[];
        state.total_stock_page = action.payload.total_page;
      })
      .addCase(fetchGetAllStockReceipt.rejected, (state, action) => {
        state.loadingInventory = false;
      });
    builder
      .addCase(fetchGetStockReceiptByReceiptId.pending, (state) => {
        state.loadingInventory = true;
      })
      .addCase(fetchGetStockReceiptByReceiptId.fulfilled, (state, action) => {
        state.loadingInventory = false;
        state.stockReceiptDetail = action.payload as StockReceipt;
      })
      .addCase(fetchGetStockReceiptByReceiptId.rejected, (state, action) => {
        state.loadingInventory = false;
      });
  },
});

export const {} = InventorySlice.actions;
export default InventorySlice.reducer;
