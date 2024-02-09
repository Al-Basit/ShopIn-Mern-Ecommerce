import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productList/productListSlice";
import cartReducer from "./cart/CartSlice";
import authReducer from "./auth/authSlice";
import orderReducer from "./order/orderSlice";
import userReducer from "./user/userSlice";
import favoriteReducer from "./favorite/favoriteSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
    favorite: favoriteReducer,
  },
});
