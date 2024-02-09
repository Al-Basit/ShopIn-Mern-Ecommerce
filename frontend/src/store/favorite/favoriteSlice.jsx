import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  fetchFavoriteItemsByUserId,
  removeFromFavorites,
} from "./favoriteAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToFavoritesAsync = createAsyncThunk(
  "favorite/addToFavorites",
  async (item) => {
    const response = await addToFavorites(item);
    return response.data;
  }
);

export const fetchFavoriteItemsByUserIdAsync = createAsyncThunk(
  "favorite/fetchFavoriteItemsByUserId",
  async (userId) => {
    const response = await fetchFavoriteItemsByUserId(userId);
    return response.data;
  }
);
export const removeFromFavoritesAsync = createAsyncThunk(
  "favorite/removeFromFavorites",
  async (itemId) => {
    const response = await removeFromFavorites(itemId);
    return response.data;
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToFavoritesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToFavoritesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchFavoriteItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavoriteItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(removeFromFavoritesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromFavoritesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      });
  },
});

export const { increment } = favoriteSlice.actions;

export const selectFavoriteItems = (state) => state.favorite.items;
export const selectFavoriteStatus = (state) => state.favorite.status;

export default favoriteSlice.reducer;
