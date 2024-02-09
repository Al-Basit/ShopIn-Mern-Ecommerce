import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/productsList/ProductList";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CartPage from "./pages/cart/CartPage";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import UserProtected from "./components/userProtected/UserProtected";
import { useEffect } from "react";
import { fetchCartItemsByUserIdAsync } from "./store/cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./store/auth/authSlice";
import OrderSuccess from "./pages/order/OrderSuccess";
import {
  fetchLoggedInUserAsync,
  fetchLoggedInUserOrdersAsync,
} from "./store/user/userSlice";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import AdminProductList from "./pages/adminProductList/AdminProductList";
import AdminProtected from "./components/adminProtected/AdminProtected";
import AdminAddProductForm from "./pages/addProductForm/AdminAddProductForm";
import AdminOrders from "./pages/adminorders/AdminOrders";
import Favorites from "./pages/favorites/Favorites";
import { fetchFavoriteItemsByUserIdAsync } from "./store/favorite/favoriteSlice";
import { fetchProductListByFiltersAsync } from "./store/productList/productListSlice";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import UserProfilePage from "./pages/userProfile/UserProfilePage";
import UserOrdersPage from "./pages/userOrder/UserOrdersPage";
import Logout from "./pages/logout/Logout";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchProductListByFiltersAsync());
      dispatch(fetchCartItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
      dispatch(fetchFavoriteItemsByUserIdAsync());
      dispatch(fetchLoggedInUserOrdersAsync());
    }
  }, [dispatch, user]);
  return (
    <BrowserRouter>
      {userChecked && (
        <Routes>
          <Route
            path="/"
            element={
              <UserProtected>
                <ProductList />
              </UserProtected>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProtected>
                <AdminProductList />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <AdminProtected>
                <AdminAddProductForm />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <AdminProtected>
                <AdminAddProductForm />
              </AdminProtected>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminProtected>
                <AdminOrders />
              </AdminProtected>
            }
          />
          <Route
            path="/productdetails/:id"
            element={
              <UserProtected>
                <ProductDetails />
              </UserProtected>
            }
          />
          <Route
            path="/cart"
            element={
              <UserProtected>
                <CartPage />
              </UserProtected>
            }
          />
          <Route
            path="/checkout"
            element={
              <UserProtected>
                <CheckoutPage />
              </UserProtected>
            }
          />
          <Route
            path="/my-favorites"
            element={
              <UserProtected>
                <Favorites />
              </UserProtected>
            }
          />
          <Route
            path="/order-success/:id"
            element={
              <UserProtected>
                <OrderSuccess />
              </UserProtected>
            }
          />
          <Route
            path="/my-orders"
            element={
              <UserProtected>
                <UserOrdersPage />
              </UserProtected>
            }
          />
          <Route
            path="/my-profile"
            element={
              <UserProtected>
                <UserProfilePage />
              </UserProtected>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/forgot-password"
            element={
              <UserProtected>
                <ForgotPassword />
              </UserProtected>
            }
          />
          <Route
            path="*"
            element={
              <UserProtected>
                <PageNotFound />
              </UserProtected>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
