import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import CartItem from "../cartItem/CartItem";
import { useSelector } from "react-redux";
import {
  selectCartLoaded,
  selectCartItems,
  selectCartStatus,
} from "../../../store/cart/CartSlice";
import { Link } from "react-router-dom";
import CartEmptyPage from "../cartEmptyPage/CartEmptyPage";
import Loader from "../../../components/loader/Loader";

const CartContent = () => {
  const items = useSelector(selectCartItems);
  const cartLoaded = useSelector(selectCartLoaded);
  const loadingStatus = useSelector(selectCartStatus);
  const deliveryCharges = 5;
  const totalPrice = items.reduce(
    (amount, item) => item.quantity * item.product.price + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  console.log(items);

  return (
    <ContentWrapper>
      <Loader loading={loadingStatus} />
      {!items.length && cartLoaded ? (
        <CartEmptyPage />
      ) : (
        <div className="container cart mt-9 ">
          <h2 className="text-2xl font-bold text-center md:text-5xl ">
            Your Cart has <span>{totalItems}</span> items
          </h2>
          <div class="flex justify-between md:flex-row flex-col mt-9">
            <div class="min-w-[65%] md:p-4 p-2 border-2 md:mb-8 mb-4 cart-items">
              {items.map((item) => {
                return <CartItem key={item.id} item={item} />;
              })}
            </div>
            <div className="min-w-[30%] p-4 h-fit border-2">
              <h3 className="text-2xl font-bold mb-9">Summary</h3>
              <div className="flex flex-col gap-2">
                <label htmlFor="coupon-code" className="font-semibold">
                  Apply Coupon Code
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full max-w-xs input input-bordered"
                />
                <button class="btn btn-neutral">Apply</button>
              </div>
              <div className="flex flex-col gap-3 mt-9">
                <p className="flex justify-between px-5">
                  <span className="font-semibold ">Total Items: </span>{" "}
                  <span>{totalItems}</span>
                </p>
                <p className="flex justify-between px-5">
                  <span className="font-semibold ">Subtotal: </span>{" "}
                  <span>${totalPrice}</span>
                </p>
                <p className="flex justify-between px-5">
                  <span className="font-semibold ">Discount: </span>{" "}
                  <span>0</span>
                </p>
                <p className="flex justify-between px-5">
                  <span className="font-semibold ">Delivery: </span>{" "}
                  <span>$5</span>
                </p>
                <p className="flex justify-between px-5 py-3 border-y-2">
                  <span className="font-semibold ">Total:</span>{" "}
                  <span>${totalPrice + deliveryCharges}</span>
                </p>
                <Link class="btn btn-neutral mt-5" to={"/checkout"}>
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </ContentWrapper>
  );
};

export default CartContent;
