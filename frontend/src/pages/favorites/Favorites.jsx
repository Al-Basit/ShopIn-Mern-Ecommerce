import React, { useEffect } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
  fetchFavoriteItemsByUserIdAsync,
  selectFavoriteItems,
  selectFavoriteStatus,
} from "../../store/favorite/favoriteSlice";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { TbMoodSad } from "react-icons/tb";
import { Link } from "react-router-dom";
import { selectLoggedInUser } from "../../store/auth/authSlice";
import Loader from "../../components/loader/Loader";

const Favorites = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);
  const favItems = useSelector(selectFavoriteItems);
  const loadingStatus = useSelector(selectFavoriteStatus);

  useEffect(() => {
    dispatch(fetchFavoriteItemsByUserIdAsync(user.id));
  }, [dispatch, user]);
  return (
    <>
      <Loader loading={loadingStatus} />
      <Header />
      <ContentWrapper>
        {favItems.length > 0 ? (
          <div className="container mx-auto my-12">
            <h3 className="mb-8 text-4xl font-bold">Favorites</h3>
            <div className="flex flex-wrap justify-start gap-5">
              {favItems.map((item) => (
                <ProductCard
                  product={item}
                  itemId={item.product.id}
                  key={item.id}
                  className="mb-4"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="flex flex-col items-center justify-center max-w-screen-sm mx-auto text-center">
              <span className="mb-4 font-extrabold text-7xl lg:text-9xl text-primary-600 dark:text-primary-500">
                <TbMoodSad />
              </span>
              <p className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                No Favorites Yet
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                It looks like you haven't added any items to your favorites yet.
                Start exploring our collection and save your favorite items for
                later!
              </p>
              <Link to="/" className="btn btn-wide btn-neutral">
                Back to Homepage
              </Link>
            </div>
          </div>
        )}
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default Favorites;
