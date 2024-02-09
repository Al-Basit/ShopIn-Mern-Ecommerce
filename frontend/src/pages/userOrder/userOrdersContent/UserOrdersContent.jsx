import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserOrders,
  selectUserStatus,
} from "../../../store/user/userSlice";
import Img from "../../../components/img/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Loader from "../../../components/loader/Loader";

const UserOrdersContent = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const loadingStatus = useSelector(selectUserStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <ContentWrapper>
      <Loader loading={loadingStatus} />
      <div className="px-2 py-4 mt-8 space-y-3 border rounded-lg sm:px-6">
        {orders &&
          orders?.map((order) => (
            <React.Fragment key={order.orderId}>
              <p className="text-lg md:text-2xl text-bold">
                Order # {order.id}
              </p>
              <p className="text-xl text-bold">
                status:{" "}
                <span className="text-red-600">{order.orderStatus}</span>
              </p>

              {order.items.map((item) => (
                <div
                  key={item.itemId}
                  className="flex flex-col rounded-lg sm:flex-row"
                >
                  <Img
                    className="h-24 m-2 border rounded-md w-28"
                    src={item.product.thumbnail}
                    alt=""
                  />
                  <div className="flex flex-col w-full px-4 py-4">
                    <span className="font-semibold">{item.product.title}</span>
                    <span className="float-right text-gray-400">
                      Quantity: {item.quantity}
                    </span>
                    <p className="text-lg font-semibold">
                      ${item.product.price}
                    </p>
                    <p className="text-lg font-semibold">
                      Total: ${item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="py-2 mt-6 border-t border-b">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Total items
                  </p>
                  <p className="font-semibold text-gray-900">
                    {order.totalItems}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">$8.00</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${order.totalPrice}
                  </p>
                </div>
              </div>

              <p className="text-bold font-xl">Shipping Address:</p>
              <div className="flex justify-between px-5 py-5 border-2 border-gray-200 border-solid gap-x-6">
                <div className="flex gap-x-4">
                  <div className="flex-auto min-w-0">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectedAddress?.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                      {order.selectedAddress?.address}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                      {order.selectedAddress?.additionalLocation}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                      {order.selectedAddress?.postalCode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {order.selectedAddress?.phoneNo}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {order.selectedAddress?.city}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
    </ContentWrapper>
  );
};

export default UserOrdersContent;
