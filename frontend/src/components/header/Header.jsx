import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/CartSlice";
import { CgProfile } from "react-icons/cg";
import {
  selectLoggedInUser,
} from "../../store/auth/authSlice";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import {
  fetchProductListByFiltersAsync,
} from "../../store/productList/productListSlice";
import { selectUserInfo } from "../../store/user/userSlice";
import Img from "../img/Img"
import Modal from "../modal/Modal";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  const items = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  const handleShowSearch = () => {
    if (showSearch) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newQuery = { title_like: e.target.value };
    dispatch(fetchProductListByFiltersAsync({ searchQuery: newQuery }));
  };

  return (
    <div className="sticky top-0 z-50 justify-between w-full text-white bg-gray-700 navbar">
      <ContentWrapper>
        <Modal
          title={`Confirm Logout`}
          description="Are you sure you want to logout?"
          mainOption="Logout"
          cancelOption="Cancel"
          mainAction={() => navigate("/logout")}
          cancelAction={() => setOpenModal(false)}
          showModal={openModal}
          type="warning"
        />

        <div className="flex items-center sm:w-1/2 navbar-start">
          <Img src={'/favicon.png'} className={'w-8 rounded'}/>
          <Link
            to="/"
            className="p-2 m-0 text-2xl font-bold normal-case md:mr-2 sm:p-4"
          >
            ShopIn
          </Link>
        </div>
        <div className="hidden navbar-center sm:flex ">
          <ul className="flex gap-4">
            <li>
              <Link
                to="/"
                className="text-xl cursor-pointer hover:text-gray-200"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-xl cursor-pointer hover:text-gray-200"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-xl cursor-pointer hover:text-gray-200"
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-xl cursor-pointer hover:text-gray-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-2 sm:gap4 navbar-end">
          <button
            className="p-0 text-xl btn btn-ghost sm:text-lg hover:scale-110"
            onClick={handleShowSearch}
          >
            <FaSearch />
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-8 p-0 text-xl btn btn-ghost hover:scale-110"
            >
              <CgProfile />
            </div>
            <ul
              tabIndex={0}
              className="z-20 p-2 mt-4 text-gray-800 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              {userInfo?.role === "user" && (
                <>
                  <li>
                    <Link to={"/my-orders"}>My Orders</Link>
                  </li>
                  <li>
                    <Link to={"/my-profile"}>My Profile</Link>
                  </li>
                </>
              )}
              {userInfo?.role === "admin" && (
                <>
                  <li>
                    <Link to={"/"}>Products</Link>
                  </li>
                  <li>
                    <Link to={"/admin/orders"}>Orders</Link>
                  </li>
                </>
              )}
              <li>
                <button onClick={() => setOpenModal(true)}>Logout</button>
              </li>
            </ul>
          </div>
          {userInfo?.role === "user" && (
            <>
              <Link
                to={"/my-favorites"}
                className="p-0 text-xl btn btn-ghost hover:scale-110"
              >
                <FaRegHeart />
              </Link>
              <Link
                to="/cart"
                className="relative p-0 text-xl sm:text-3xl btn btn-ghost md:w-6 hover:scale-110"
              >
                <div className="absolute w-3 h-4 text-xs top-1 -right-2 badge badge-secondary md:w-5 md:h-4 md:text-base">
                  {items.length}
                </div>
                <AiOutlineShoppingCart />
              </Link>
            </>
          )}
          <div className="w-8 dropdown sm:hidden sm:w-14">
            <label tabIndex={0} className="w-8 p-0 btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm text-gray-800 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box absolute top-6 right-6 w-56"
            >
              <li>
                <Link to="/" className="text-xl hover:text-gray-200">
                  Homepage
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xl hover:text-gray-200">
                  Latest Products
                </Link>
              </li>
              <li>
                <Link to="/" className="text-xl hover:text-gray-200">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {showSearch && (
          <div className="absolute z-10 w-full p-4 sm:w-3/4 right-3 h-14 top-14">
            <ContentWrapper>
              <form
                className="flex rounded shadow shadow-gray-600 bg-base-100 searchInput border-l-lime-100"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  className="flex items-center w-full p-2 mt-2 text-black h-9 focus:outline-none"
                  placeholder="Search for a product...."
                  onChange={(e) => handleSearch(e)}
                />
                <span className="text-xl text-gray-800 btn btn-ghost sm:w-14 hover:scale-110 hover:bg-transparent">
                  <IoCloseCircleOutline onClick={() => setShowSearch(false)} />
                </span>
              </form>
            </ContentWrapper>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Header;
