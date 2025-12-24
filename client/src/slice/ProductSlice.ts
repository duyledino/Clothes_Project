import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { StaticImageData } from "next/image";
import { toast } from "react-toastify";
import { resetState } from "./OrderSlice";
import { productService } from "@/service/product.service";
import type { ProductData, ProductDataAmin, ProductLanding } from "@/type/types.frontend";
import { orderService } from "@/service/order.service";

const initialState: {
  Products: ProductData[];
  loading: boolean;
  error: string | null;
  Message: string | null;
  Product: ProductData | null;
  totalPage: number;
  SearchProduct: ProductData[];
  ProductsAdmin: ProductDataAmin[];
  BestSellerProduct: ProductLanding[];
  LatestProduct: ProductLanding[];
} = {
  BestSellerProduct: [],
  LatestProduct: [],
  ProductsAdmin: [],
  SearchProduct: [],
  Products: [],
  loading: false,
  error: null,
  Message: null,
  Product: null,
  totalPage: 0,
};

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_SERVER_API
    : "/api";

export const fetchBestSellerProductFromApi = createAsyncThunk(
  "get/getBestSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getBestSellers();
      console.log("resposne.data in fetchBestSellerFromApi: ", response);
      return response.products;
    } catch (error: any) {
      console.error("error in bestSeller slice:");
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchLatestFromApi = createAsyncThunk(
  "get/getLatestProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getLatestProducts();
      console.log("resposne.data in lastestProducts: ", response);
      return response.products;
    } catch (error: any) {
      console.error("error in lastestProducts slice:");
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchProductFromApi = createAsyncThunk(
  "fetchProduct",
  async (
    {page,category,sort}: {
      page: number;
      category: string[];
      sort: string;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "data.page: ",
        page,
        category,
        sort
      );
      const response = await productService.getAllProductsPublic(page,{category:category,sort})
      return response.products;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchProductFromApiAdmin = createAsyncThunk(
  "fetchProduct/Admin",
  async (
    {page}: {
      page: number;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log("data.page: ", page);
      const response = await productService.getAllProductsAdmin(page);
      return response.products;
    } catch (error: any) {
      console.error("error: ", error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCreateAProduct = createAsyncThunk(
  "product/createAProduct",
  async (
    formData: {
      productCreate:
        | FormData
        | {
            images:[];
            title: string;
            description: string;
            price: number;
          };
    },
    { rejectWithValue }
  ) => {
    console.log("formData.productCreate: ", formData.productCreate);
    try {
      const response = await productService.createProduct(formData.productCreate);
      toast.success(response.Message || "Thêm sản phẩm thành công")
      return response.Message;
    } catch (error: any) {
      console.error("error: ",error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchGetProductById = createAsyncThunk(
  "product/getProductById",
  async (product_id: string, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(product_id);
      console.log(response.data);
      return response.product;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      rejectWithValue(message);
    }
  }
);

export const fetchTotalPage = createAsyncThunk(
  "product/getTotalPage",
  async (
    {categories}: { categories: string[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await productService.getTotalPage({category: categories})
      console.log("response.data total page: ", response);
      return response.total;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
    }
  }
);

export const fetchApiSearchProduct = createAsyncThunk(
  "product/findProduct",
  async ({query}: { query: string }, { rejectWithValue }) => {
    try {
      console.log("query: ", query);
      const response = await productService.searchProduct(query);
      console.log("response.data.result: ", response);
      return response.result;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
    }
  }
);
export const fetchDeleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ids}: { ids: string[] }, { rejectWithValue }) => {
    try {
      const response = await productService.deleteProducts(ids);
      console.log("delete product: ", response.data);
      toast.success(response.Message||"Xoa san pham thanh cong");
      return response.Message;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchReviseProduct = createAsyncThunk(
  "product/reviseProduct",
  async ({ids}: { ids: string[]}, { rejectWithValue }) => {
    try {
      const response = await productService.reviseProducts(ids);
      console.log("revise product: ", response.data);
      toast.success(response.Message||"Khôi phục sản phẩm thành công");
      return response.Message;
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.Message || "Something went wrong";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    resetStateProduct: (state) => {
      console.log("refresh state. ✅");
      state.Message = null;
      state.error = null;
    },
    resetSearchProduct: (state) => {
      console.log("refresh state. ✅");
      state.SearchProduct = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductFromApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductFromApi.fulfilled, (state, action) => {
        state.loading = false;
        state.Products = action.payload;
      })
      .addCase(fetchProductFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCreateAProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreateAProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.Message = action.payload as string;
      })
      .addCase(fetchCreateAProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchGetProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.Product = action.payload as ProductData;
      })
      .addCase(fetchGetProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTotalPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalPage.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPage = action.payload as number;
      })
      .addCase(fetchTotalPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchApiSearchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiSearchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.SearchProduct = action.payload;
      })
      .addCase(fetchApiSearchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductFromApiAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductFromApiAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.ProductsAdmin = action.payload;
      })
      .addCase(fetchProductFromApiAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchDeleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.Message = action.payload as string;
      })
      .addCase(fetchDeleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBestSellerProductFromApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellerProductFromApi.fulfilled, (state, action) => {
        state.loading = false;
        state.BestSellerProduct = action.payload as ProductLanding[];
      })
      .addCase(fetchBestSellerProductFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLatestFromApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestFromApi.fulfilled, (state, action) => {
        state.loading = false;
        state.LatestProduct = action.payload as ProductLanding[];
      })
      .addCase(fetchLatestFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchReviseProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviseProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.Message = action.payload as string;
      })
      .addCase(fetchReviseProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStateProduct, resetSearchProduct } = productSlice.actions;
export default productSlice.reducer;
