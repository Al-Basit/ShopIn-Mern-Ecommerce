import React, { useEffect } from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCartAsync } from "../../store/cart/CartSlice";
import { resetOrder } from "../../store/order/orderSlice";

const OrderSuccess = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCartAsync());
    dispatch(resetOrder());
  }, [dispatch]);
  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <ContentWrapper>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="flex flex-col items-center justify-center max-w-screen-sm mx-auto text-center flex-coll ">
              <span className="mb-4 font-extrabold tracking-tight text-center text-7xl lg:text-9xl text-primary-600 dark:text-primary-500">
                <IoMdCheckmarkCircle />
              </span>
              <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                Your Order has been placed !{" "}
              </p>
              <p className="mb-4 text-lg font-semibold text-gray-500 dark:text-gray-500">
                Order Number # {params?.id}
              </p>
              <Link to="/" replace={true} className="btn btn-wide btn-neutral">
                Back to Homepage
              </Link>
            </div>
          </div>
        </section>
      </ContentWrapper>
    </>
  );
};

export default OrderSuccess;
