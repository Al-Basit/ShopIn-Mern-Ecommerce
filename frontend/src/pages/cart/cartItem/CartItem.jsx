import React, { useState } from "react";
import Img from "../../../components/img/Img";
import { RiDeleteBinLine } from "react-icons/ri";
import Counter from "../../../components/counter/Counter";
import { useDispatch } from "react-redux";
import {
  deleteCartItemAsync,
  updateCartAsync,
} from "../../../store/cart/CartSlice";
import { useAlert, types } from "react-alert";
import Modal from "../../../components/modal/Modal";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(null);

  const alert = useAlert();

  const handleQuantity = (change) => {
    if (item.quantity === 1 && change == -1) return;
    dispatch(
      updateCartAsync({ id: item.id, quantity: item.quantity + change })
    );
  };

  const handleRemove = () => {
    dispatch(deleteCartItemAsync(item.id));
    alert.show("Item removed from cart!", { type: types.INFO });
  };
  return (
    <div
      id={item.id}
      className="flex flex-row justify-between p-2 mb-3 shadow-xl md:p-4 bg-base-100"
    >
      <Modal
        title={`Delete ${item.product.title}`}
        description="Are you sure you want to delete this Cart item ?"
        mainOption="Delete"
        cancelOption="Cancel"
        mainAction={() => handleRemove()}
        cancelAction={() => setOpenModal(null)}
        showModal={openModal === item.id}
        type="warning"
      />
      <div className="flex justify-around gap-2 md:gap-4">
        <div className="flex flex-col justify-between">
          <Img
            src={item.product.thumbnail}
            className={"w-20 md:w-36"}
            alt="Shoes"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold md:text-lg">
            {item.product.title}
          </span>
          <span className="text-xs font-semibold text-gray-500 md:text-sm">
            size : M
          </span>
          <span className="text-xs font-semibold text-gray-500 md:text-sm">
            In Stock
          </span>
          <RiDeleteBinLine
            className="mt-3 text-gray-500 cursor-pointer"
            onClick={() => setOpenModal(item.id)}
          />
        </div>
      </div>
      <div className="flex flex-col justify-around">
        <span className="text-sm font-medium text-gray-400 md:text-xl">
          Quantity
        </span>
        <Counter handleQuantity={handleQuantity} quantity={item.quantity} />
      </div>
      <div className="flex-col justify-around hidden lg:flex">
        <span className="text-sm font-medium text-gray-400 md:text-xl">
          Price
        </span>
        <p className="font-semibold">${item.product.price}</p>
      </div>
      <div className="flex flex-col justify-around">
        <span className="text-sm font-medium text-gray-400 md:text-xl">
          Total
        </span>
        <p className="font-semibold">${item.product.price * item.quantity}</p>{" "}
      </div>
    </div>
  );
};

export default CartItem;
