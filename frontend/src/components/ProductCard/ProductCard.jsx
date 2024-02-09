import React, { useDebugValue, useEffect, useState } from "react";
import Img from "../img/Img";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../store/auth/authSlice";
import StarRating from "../starRating/StarRating";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { selectSelectedProduct } from "../../store/productList/productListSlice";
import { addToCartAsync, selectCartItems } from "../../store/cart/CartSlice";
import {
  addToFavoritesAsync,
  fetchFavoriteItemsByUserIdAsync,
  removeFromFavoritesAsync,
  selectFavoriteItems,
} from "../../store/favorite/favoriteSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAlert, types } from "react-alert";

const ProductCard = ({ product, itemId }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [isFavorite, setIsFavorite] = useState(false);

  const user = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const favoriteItems = useSelector(selectFavoriteItems);

  const item = product.product || product;

  const originalPrice = (
    item?.price /
    (1 - item?.discountPercentage / 100)
  )?.toFixed(0);
  const discountpercent = (+item.discountPercentage * 100) / 100;

  const addToCart = () => {
    if (cartItems.findIndex((item) => item.product.id === itemId) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      alert.show('"Item added to cart!', { type: types.SUCCESS });
      dispatch(addToCartAsync(newItem));
    } else {
      alert.show("Item already in cart!", { type: types.INFO });
    }
  };
  const addToFavorites = () => {
    if (favoriteItems.findIndex((item) => item.product.id === itemId) < 0) {
      const newItem = {
        product: itemId,
      };

      dispatch(addToFavoritesAsync(newItem));
      alert.show("Item added to favorites!", { type: types.SUCCESS });
    }
  };

  const handleRemove = () => {
    const index = favoriteItems.findIndex((item) => item.product.id === itemId);
    const id = favoriteItems[index].id;
    dispatch(removeFromFavoritesAsync(id));
    alert.show("Item removed from favorites!", { type: types.INFO });
  };

  useEffect(() => {
    const checkIsFavorite =
      favoriteItems.findIndex((item) => item.product.id === itemId) >= 0;
    setIsFavorite(checkIsFavorite);
  }, [favoriteItems, product]);

  return (
    <div class="md:w-72 w-40 bg-white drop-shadow-md rounded-lg">
      <Img
        class="object-cover rounded-tl-lg rounded-tr-lg"
        src={item.thumbnail}
      />

      <div class="px-2 md:px-5 md:py-3 space-y-1 md:space-y-2">
        <Link to={`/productdetails/${itemId}`}>
          <h3 class="text-md sm:text-lg">{item.title}</h3>
          <div class="space-x-2">
            <p className="hidden md:block">{item.description}</p>
          </div>
          <p class="space-x-1 md-space-x-1">
            <span class="text-lg md:text-2xl  font-semibold">
              ${item.price}
            </span>
            <span class="text-sm line-through text-gray-500">
              ${originalPrice}
            </span>
            <span class="text-xs md:text-sm text-red-700">
              {discountpercent}% off
            </span>
          </p>
          <div className="flex gap-3 text-sm font-semibold card-rating overflow-ellipsis">
            <StarRating value={item.rating} size={13} />
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              {item?.rating?.toFixed(1)}
            </span>
          </div>
        </Link>
        <div className="flex items-center justify-between pt-3 pb-2">
          {user.role === "admin" ? (
            <Link
              to={`/admin/edit-product/${itemId}`}
              className="flex w-full gap-3 px-2 py-2 mx-auto text-xs text-center text-white duration-300 rounded btn md:px-4 md:text-lg btn-neutral"
            >
              Edit
            </Link>
          ) : (
            <div className="flex justify-between">
              <button
                onClick={addToCart}
                class="px-2 md:px-4 py-2 text-center flex gap-3 text-xs md:text-lg text-white rounded btn-neutral duration-300"
              >
                <span>Add to Cart</span>
                <AiOutlineShoppingCart />
              </button>
            </div>
          )}
          {!isFavorite ? (
            <button
              onClick={addToFavorites}
              title="Add to Favorites"
              className={`text-xl md:text-3xl ${
                user.role === "admin" ? "hidden" : ""
              }  text-gray-800 hover:text-red-500 duration-300`}
            >
              <FaRegHeart />
            </button>
          ) : (
            <button
              onClick={handleRemove}
              title="Remove Favorites"
              className={`text-xl md:text-3xl ${
                user.role === "admin" ? "hidden" : ""
              }  duration-300 text-red-500`}
            >
              <FaHeart />
            </button>
          )}
        </div>
        {item?.deleted === true && (
          <p className="text-xl text-red-500">Deleted</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
