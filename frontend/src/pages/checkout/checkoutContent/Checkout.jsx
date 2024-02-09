import React, { useState } from "react";
// import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/img/Img";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../../store/cart/CartSlice";
import {
  loginUserAsync,
  selectLoggedInUser,
} from "../../../store/auth/authSlice";
import { selectUserInfo, updateUserAsync } from "../../../store/user/userSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../../../store/order/orderSlice";
import { Navigate } from "react-router-dom";
import { useAlert, types } from "react-alert";
import Modal from "../../../components/modal/Modal";

const Checkout = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const userInfo = useSelector(selectUserInfo);
  const items = useSelector(selectCartItems);
  const currentOrder = useSelector(selectCurrentOrder);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const totalPrice = items.reduce(
    (amount, item) => parseInt(item.quantity * item.product.price) + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleAddress = (e) => {
    setSelectedAddress(userInfo.addresses[e.target.value]);
  };

  const handleDelivery = (e) => {
    setShippingMethod(e.target.value);
  };
  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOrder = (e) => {
    // if(selectedAddress) {
    const order = {
      items,
      totalPrice,
      totalItems,
      user: userInfo.id,
      selectedAddress,
      paymentMethod,
      shippingMethod,
      paymentStatus: "pending",
      orderStatus: "pending",
    };

    dispatch(createOrderAsync(order));
    // }
  };
  return (
    <>
      <Modal
        title={`Confirm Order`}
        description="Are you sure want to place order ?"
        mainOption="Confirm"
        cancelOption="Cancel"
        mainAction={() => handleOrder()}
        cancelAction={() => setOpenModal(false)}
        showModal={openModal}
        type="success"
      />
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <ContentWrapper>
        <div className="container mt-9">
          <h2 className="text-2xl font-bold text-center md:text-5xl">
            Checkout
          </h2>
          <div className="flex flex-col justify-between md:flex-row mt-9">
            <div className="min-w-[60%] p-4 border-2 mb-8 cart-items">
              <div className="px-4 pt-8">
                <p className="text-2xl font-medium">Order Summary</p>
                <p className="text-gray-500">
                  Check your items. And select a suitable shipping method.
                </p>
                <div className="px-2 py-4 mt-8 space-y-3 border rounded-lg sm:px-6">
                  {items.map((item) => {
                    return (
                      <div className="flex flex-col rounded-lg sm:flex-row">
                        <Img
                          className="h-24 m-2 border rounded-md w-28"
                          src={item.product.thumbnail}
                          alt=""
                        />
                        <div className="flex flex-col w-full px-4 py-4">
                          <span className="font-semibold">
                            {item.product.title}
                          </span>
                          <span className="float-right text-gray-400">
                            Quantity: {item.quantity}
                          </span>
                          <p className="text-lg font-semibold">
                            ${item.product.price}
                          </p>
                          <p className="text-lg font-semibold">
                            Total: $
                            {parseFloat(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                <form className="grid gap-6 mt-5" onChange={handleDelivery}>
                  <div className="relative">
                    <input
                      id="fast"
                      value={"fast"}
                      name="delivery"
                      checked={shippingMethod === "fast"}
                      type="radio"
                      className="hidden peer"
                    />
                    <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
                    <label
                      className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                      for="fast"
                    >
                      <div className="ml-5">
                        <span className="mt-2 font-semibold">
                          Fast Delivery
                        </span>
                        <p className="text-sm leading-6 text-gray-500">
                          Delivery: 1-2 Days
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="hidden peer"
                      id="standard"
                      type="radio"
                      name="delivery"
                      value={"standard"}
                      checked={shippingMethod === "standard"}
                    />
                    <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
                    <label
                      className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                      for="standard"
                    >
                      <div className="ml-5">
                        <span className="mt-2 font-semibold">
                          Standard Delivery
                        </span>
                        <p className="text-sm leading-6 text-gray-500">
                          Delivery: 2-4 Days
                        </p>
                      </div>
                    </label>
                  </div>
                </form>

                <p className="mt-8 text-lg font-medium">Payment Methods</p>
                <form className="grid gap-6 mt-5" onChange={handlePayment}>
                  <div className="relative">
                    <input
                      id="cash"
                      value={"cash"}
                      name="payment"
                      // onChange={handleDelivery}
                      type="radio"
                      className="hidden peer"
                      checked={paymentMethod === "cash"}
                    />
                    <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
                    <label
                      className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                      for="cash"
                    >
                      <div className="ml-5">
                        <span className="mt-2 font-semibold">
                          Cash on Delivery
                        </span>
                        <p className="text-sm leading-6 text-gray-500">
                          Extra $1 will be charged
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="hidden peer"
                      id="card"
                      type="radio"
                      name="payment"
                      value={"card"}
                      checked={paymentMethod === "card"}
                      // onChange={handleDelivery}
                    />
                    <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-gray-700 right-4 top-1/2"></span>
                    <label
                      className="flex p-4 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50"
                      for="card"
                    >
                      <div className="ml-5">
                        <span className="mt-2 font-semibold">Card Payment</span>
                        <p className="text-sm leading-6 text-gray-500">
                          20% off on cards
                        </p>
                      </div>
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <div className="min-w-[40%] p-4 h-fit border-2">
              <p className="text-2xl font-medium">Payment Details</p>
              <p className="text-gray-400">
                Complete your order by providing your payment details.
              </p>
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    updateUserAsync({
                      ...userInfo,
                      addresses: [...userInfo.addresses, data],
                    })
                  );
                  reset();
                  alert.show("Address added successfully!", {
                    type: types.SUCCESS,
                  });
                  console.log(data);
                })}
              >
                <div className="block mt-4 mb-2">
                  <input
                    type="text"
                    id="email"
                    {...register("email", { required: "email is required" })}
                    required
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none"
                    placeholder="Email"
                  />
                </div>
                <div className="block mt-4 mb-2">
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "name is required" })}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none"
                    placeholder="Full name"
                  />
                </div>
                <div className="block mt-4 mb-2">
                  <input
                    type="text"
                    id="comapany"
                    {...register("company")}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none"
                    placeholder="Company (optional)"
                  />
                </div>
                <div className="block mt-4 mb-2">
                  <input
                    type="text"
                    id="address"
                    {...register("address", {
                      required: "address is required",
                    })}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none"
                    placeholder="Address"
                  />
                </div>
                <div className="block mt-4 mb-2">
                  <input
                    type="text"
                    id="additionalLocation"
                    {...register("additionalLocation")}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none"
                    placeholder="Apartment, floor, etc (optional)"
                  />
                </div>
                <div className="block mt-4 mb-2">
                  <input
                    type="text"
                    id="city"
                    {...register("city", { required: "city is required" })}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none"
                    placeholder="Town/City"
                  />
                </div>
                <div className="block mt-4 mb-2">
                  <input
                    type="text"
                    id="phoneNo"
                    {...register("phoneNo", {
                      required: "phone number is required",
                    })}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="block mt-4 mb-2">
                  <input
                    type="text"
                    id="postalCode"
                    {...register("postalCode", {
                      required: "postal code is required",
                    })}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-md shadow-sm outline-none"
                    placeholder="Postal code"
                  />
                </div>

                <div className="py-2 mt-6 border-t border-b">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Total items
                    </p>
                    <p className="font-semibold text-gray-900">{totalItems}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      Shipping fee
                    </p>
                    <p className="font-semibold text-gray-900">$10.00</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${totalPrice + 10}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 mt-4 mb-8 btn "
                >
                  Add Address
                </button>
              </form>
            </div>
          </div>

          <div className="w-full p-4 mx-auto border-2 md:w-3/4 h-fit">
            <p className="text-2xl font-medium">Addresses</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Choose from Existing addresses
            </p>
            <ul>
              {userInfo?.addresses.map((address, index) => (
                <li
                  key={index}
                  className="flex justify-between px-5 py-5 border-2 border-gray-200 border-solid gap-x-6"
                >
                  <div className="flex gap-x-4">
                    <input
                      onChange={handleAddress}
                      name="address"
                      type="radio"
                      value={index}
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                    />
                    <div className="flex-auto min-w-0">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {address.address}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {address.additionalLocation}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {address.postalCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {address.phoneNo}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                if (selectedAddress) {
                  setOpenModal(true);
                } else {
                  alert.show("Select Address!", { type: types.INFO });
                }
              }}
              className="w-full px-6 py-3 mt-4 mb-8 btn btn-neutral"
            >
              Place Order
            </button>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default Checkout;
