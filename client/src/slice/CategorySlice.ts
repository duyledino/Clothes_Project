import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { categoryService } from "@/service/category.service";
import type { CategoryOrigin } from "../type/types.frontend";

const initialState: {
  loadingCategory: boolean;
  categories: CategoryOrigin[];
  category: CategoryOrigin | null;
} = {
  loadingCategory: false,
  categories: [],
  category: null,
};

export const fetchGetAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getAllCategory();
      return response.categories;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetAllCategoryAdmin = createAsyncThunk(
  "category/getAllCategoryAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getAllCategoryAdmin();
      return response.categories;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetACategory = createAsyncThunk(
  "category/getACategory",
  async ({ category_id }: { category_id: string }, { rejectWithValue }) => {
    try {
      const response = await categoryService.getACategory(category_id);
      return response.category;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCreateACategory = createAsyncThunk(
  "category/createACategory",
  async ({ category_name }: { category_name: string }, { rejectWithValue }) => {
    try {
      const response = await categoryService.createACategory(category_name);
      toast.success(response.Message || "Tạo category thành công");
      return response.newCategory;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchUpdateACategory = createAsyncThunk(
  "category/updateACategory",
  async (
    {
      category_id,
      category_name,
    }: { category_id: string; category_name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await categoryService.updateACategory(
        category_id,
        category_name
      );
      toast.success(response.Message || "Cập nhật category thành công");
      return response.updatedCategory;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchDeleteACategory = createAsyncThunk(
  "category/fetchDeleteACategory",
  async ({ category_id }: { category_id: string }, { rejectWithValue }) => {
    try {
      const response = await categoryService.deleteACategory(category_id);
      toast.success(response.Message || "Xóa phân loại thành công");
      return response.Message;
    } catch (error: any) {
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const categorySlice = createSlice({
  name: "category/categorySlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetAllCategory.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchGetAllCategory.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.categories = action.payload as CategoryOrigin[];
      })
      .addCase(fetchGetAllCategory.rejected, (state) => {
        state.loadingCategory = false;
      })

      .addCase(fetchGetACategory.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchGetACategory.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.category = action.payload as CategoryOrigin;
      })
      .addCase(fetchGetACategory.rejected, (state) => {
        state.loadingCategory = false;
      })

      .addCase(fetchCreateACategory.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchCreateACategory.fulfilled, (state) => {
        state.loadingCategory = false;
      })
      .addCase(fetchCreateACategory.rejected, (state) => {
        state.loadingCategory = false;
      })

      .addCase(fetchUpdateACategory.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchUpdateACategory.fulfilled, (state) => {
        state.loadingCategory = false;
      })
      .addCase(fetchUpdateACategory.rejected, (state) => {
        state.loadingCategory = false;
      })

      .addCase(fetchDeleteACategory.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchDeleteACategory.fulfilled, (state) => {
        state.loadingCategory = false;
      })
      .addCase(fetchDeleteACategory.rejected, (state) => {
        state.loadingCategory = false;
      })
      .addCase(fetchGetAllCategoryAdmin.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchGetAllCategoryAdmin.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.categories = action.payload as CategoryOrigin[];
      })
      .addCase(fetchGetAllCategoryAdmin.rejected, (state) => {
        state.loadingCategory = false;
      });
  },
});

export default categorySlice.reducer;
