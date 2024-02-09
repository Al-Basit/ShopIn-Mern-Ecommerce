import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UserOrdersContent from "./userOrdersContent/UserOrdersContent";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserOrders,
} from "../../store/user/userSlice";
import OrdersEmptyPage from "./ordersEmptyPage/OrdersEmptyPage";

const UserOrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    try {
      dispatch(fetchLoggedInUserOrdersAsync());
    } catch (error) {
      console.error("Error occurred while fetching user orders:", error);
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      {orders && orders?.length > 0 ? (
        <UserOrdersContent />
      ) : (
        <OrdersEmptyPage />
      )}
      <Footer />
    </div>
  );
};

export default UserOrdersPage;