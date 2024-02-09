import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductListByFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  addNewProduct,
  updateProduct,
  fetchPriceRanges,
  fetchRatingRanges,
  fetchProductBySearchQuery,
} from "./productListAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  priceRanges: [],
  ratingRanges: [],
  totalItems: 0,
  selectedProduct: null,
  status: "idle",
};

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductBySearchQueryAsync = createAsyncThunk(
  "product/fetchProductBySearchQuery",
  async (query) => {
    const response = await fetchProductBySearchQuery(query);
    return response.data;
  }
);
export const fetchProductListByFiltersAsync = createAsyncThunk(
  "product/fetchProductListByFilters",
  async ({ filter, sort, pagination, admin, searchQuery }) => {
    const response = await fetchProductListByFilters(
      filter,
      sort,
      pagination,
      admin,
      searchQuery
    );
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);
export const fetchPriceRangesAsync = createAsyncThunk(
  "product/fetchPriceRanges",
  async () => {
    const response = await fetchPriceRanges();
    return response.data;
  }
);
export const fetchRatingRangesAsync = createAsyncThunk(
  "product/fetchRatingRanges",
  async () => {
    const response = await fetchRatingRanges();
    return response.data;
  }
);
export const addNewProductAsync = createAsyncThunk(
  "product/addNewProduct",
  async (product) => {
    const response = await addNewProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductBySearchQueryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductBySearchQueryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductListByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductListByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchPriceRangesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPriceRangesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.priceRanges = action.payload;
      })
      .addCase(fetchRatingRangesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRatingRangesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.ratingRanges = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(addNewProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productListSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectAllPriceRanges = (state) => state.product.priceRanges;
export const selectAllRatingRanges = (state) => state.product.ratingRanges;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;

export default productListSlice.reducer;
