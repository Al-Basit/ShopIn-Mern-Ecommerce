import React from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
const CartEmptyPage = () => {
  return (
    <ContentWrapper>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div className="flex flex-col items-center justify-center max-w-screen-sm mx-auto text-center">
            <span className="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-primary-600 dark:text-primary-500">
              <BsCartX />
            </span>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Your Cart is currently empty!
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Before proceed to checkout, you must add some products to your
              cart. You wil find a lot of interesting products on our store.
            </p>
            <Link to="/" className="btn btn-wide btn-neutral">
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default CartEmptyPage;
