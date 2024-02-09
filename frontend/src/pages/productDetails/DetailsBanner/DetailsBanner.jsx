import React, { useEffect, useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/img/Img";
import Counter from "../../../components/counter/Counter";
import {
  fetchProductByIdAsync,
  selectProductListStatus,
  selectSelectedProduct,
} from "../../../store/productList/productListSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCartAsync, selectCartItems } from "../../../store/cart/CartSlice";
import StarRating from "../../../components/starRating/StarRating";
import {
  addToFavoritesAsync,
  removeFromFavoritesAsync,
  selectFavoriteItems,
} from "../../../store/favorite/favoriteSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loader from "../../../components/loader/Loader";
import { useAlert, types } from "react-alert";
import { selectUserInfo } from "../../../store/user/userSlice";

const DetailsBanner = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const product = useSelector(selectSelectedProduct);
  const cartItems = useSelector(selectCartItems);
  const userInfo = useSelector(selectUserInfo);
  const favoriteItems = useSelector(selectFavoriteItems);
  const loadingStatus = useSelector(selectProductListStatus);
  const params = useParams();

  const [thumbnail, setThumbnail] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const originalPrice = (
    product?.price /
    (1 - product?.discountPercentage / 100)
  ).toFixed(0);
  const discountpercent = ((product?.discountPercentage * 100) / 100).toFixed(
    0
  );

  const handleQuantity = (change) => {
    if (quantity === 1 && change == -1) return;
    setQuantity(quantity + change);
  };

  const addToCart = (e) => {
    if (cartItems.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        ...product,
        product: product.id,
        quantity: quantity,
      };

      dispatch(addToCartAsync(newItem));
    } else {
      alert.show("Item already in cart!", { type: types.INFO });
    }
  };

  const addToFavorites = () => {
    if (favoriteItems.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        product: product.id,
      };
      console.log(newItem);

      dispatch(addToFavoritesAsync(newItem));
    }
  };

  const handleRemove = () => {
    const index = favoriteItems.findIndex(
      (item) => item.product.id === product?.id
    );
    const id = favoriteItems[index].id;
    dispatch(removeFromFavoritesAsync(id));
  };

  useEffect(() => {
    const checkIsFavorite =
      favoriteItems.findIndex((item) => item.product.id === product?.id) >= 0;
    setIsFavorite(checkIsFavorite);
  }, [favoriteItems, product]);

  const handleThumbnail = (src) => {
    setThumbnail(src);
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);
  return (
    <div>
      <Loader loading={loadingStatus} />
      {product && (
        <ContentWrapper>
          <section className="py-20 overflow-hidden bg-white font-poppins dark:bg-gray-800">
            <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4 md:w-1/2 ">
                  <div className="sticky top-0 z-30 overflow-hidden ">
                    <div
                      className="relative mb-6 lg:mb-10"
                      // style={}
                    >
                      <Img
                        src={thumbnail || product.thumbnail}
                        alt=""
                        className="object-contain w-full h-full "
                      />
                    </div>
                    <div className="flex flex-wrap">
                      {product.images.map((src) => {
                        return (
                          <div className="w-1/2 p-2 sm:w-1/4" key={src}>
                            <div
                              className="block border border-blue-100 dark:border-gray-700 dark:hover:border-gray-600 hover:border-blue-300"
                              onClick={() => handleThumbnail(src)}
                            >
                              <Img
                                src={src}
                                alt=""
                                className="object-cover w-full lg:h-32"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2 ">
                  <div className="lg:pl-20">
                    <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                        {discountpercent}% off
                      </span>
                      <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                        {product.title}
                      </h2>
                      <div className="flex flex-wrap items-center mb-6">
                        <StarRating value={product.rating} size={35} />
                        <span
                          className="mb-4 ml-2 text-2xl font-semibold dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0"
                          href="#"
                        >
                          ({product.rating})
                        </span>
                      </div>
                      <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                        {product.description}
                      </p>
                      <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                        <span>${product.price}</span>
                        <span className="ml-4 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                          ${originalPrice}
                        </span>
                      </p>
                    </div>
                    <div className="mb-8">
                      <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                        Color
                      </h2>
                      <div className="flex flex-wrap -mb-2">
                        <button className="p-1 mb-2 mr-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                          <div className="w-6 h-6 bg-red-600 rounded-full" />
                        </button>
                        <button className="p-1 mb-2 mr-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                          <div className="w-6 h-6 bg-green-600 rounded-full" />
                        </button>
                        <button className="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full" />
                        </button>
                        <button className="p-1 mb-2 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400">
                          <div className="w-6 h-6 rounded-full bg-sky-400" />
                        </button>
                      </div>
                    </div>
                    <div className="pb-6 mb-8 border-b border-gray-300 dark:border-gray-700">
                      <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                        Size
                      </h2>
                      <div className="flex flex-wrap -mb-2">
                        <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                          XL
                        </button>
                        <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                          S
                        </button>
                        <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                          M
                        </button>
                        <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                          XS
                        </button>
                      </div>
                    </div>
                    <div className="pb-6 mb-8 border-b border-gray-300 dark:border-gray-700">
                      <div className="flex flex-col flex-wrap -mb-2">
                        <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                          Quantity
                        </h2>
                        <Counter
                          handleQuantity={handleQuantity}
                          quantity={quantity}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center ">
                      <div className="mb-4 mr-4 lg:mb-0">
                        {userInfo?.role === "user" ? (
                          <button
                            className="text-center btn btn-neutral btn-wide"
                            onClick={addToCart}
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <Link
                            className="text-center btn btn-neutral btn-wide"
                            to={`/admin/edit-product/${product.id}`}
                          >
                            Edit Product
                          </Link>
                        )}
                      </div>
                      {!isFavorite ? (
                        <button
                          onClick={addToFavorites}
                          title="Add to Favorites"
                          class={`text-3xl ${
                            userInfo?.role === "admin" ? "hidden" : ""
                          }  text-gray-800 hover:text-red-500 duration-300`}
                        >
                          <FaRegHeart />
                        </button>
                      ) : (
                        <button
                          onClick={handleRemove}
                          title="Remove Favorites"
                          class={`text-3xl ${
                            userInfo?.role === "admin" ? "hidden" : ""
                          } text-red-500`}
                        >
                          <FaHeart />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ContentWrapper>
      )}
    </div>
  );
};

export default DetailsBanner;
