import React, { useState, useEffect } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectAllProducts,
  fetchProductListByFiltersAsync,
  selectTotalItems,
  selectAllCategories,
  selectAllBrands,
  fetchCategoriesAsync,
  fetchBrandsAsync,
  selectAllPriceRanges,
  fetchPriceRangesAsync,
  fetchRatingRangesAsync,
  selectAllRatingRanges,
  selectProductListStatus,
} from "../../../store/productList/productListSlice";
import { ITEMS_PER_PAGE } from '../../../app/Constants'
import { FaFilter } from "react-icons/fa";

// import { selectAllProducts } from "../../../store/productList/productListSlice";

import { IoMdArrowDropright } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import Pagination from "../../../components/pagination/Pagination";
import { addToCartAsync } from "../../../store/cart/CartSlice";
import { selectLoggedInUser } from "../../../store/auth/authSlice";
import { selectUserInfo } from "../../../store/user/userSlice";
import Loader from "../../../components/loader/Loader";

const sortOptions = [
  {name: 'Best Rating', sort: 'rating', order: 'desc', current: false},
  {name: 'Price Low to High', sort: 'price', order: 'asc', current: false},
  {name: 'Price High to Low', sort: 'price', order: 'desc', current: false},
]


const ProductListContent = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo)

  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);
  const priceRanges = useSelector(selectAllPriceRanges);
  const ratingRanges = useSelector(selectAllRatingRanges);
  const loadingStatus = useSelector(selectProductListStatus);

  const [openFilter, setOpenFilter] = useState(null);
  const [productFilters, setProductFilters] = useState({});
  const [page, setPage] = useState(1);
  const [productSort, setProductSort] = useState({});


  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories
    },
    {
      id: "brand",
      name: "Brand",
      options: brands
    },
    {
      id: "priceRange",
      name: "Prices",
      options: priceRanges
    },
    {
      id: "ratingRange",
      name: "Ratings",
      options: ratingRanges
    },
  ];

  const handleFilter = (e, filter, option) => {
    const newFilter = { ...productFilters };
  
    if (e.target.checked) {
      if (newFilter[filter.id]) {
        newFilter[filter.id].push(option.value || [option.minValue, option.maxValue]);
        console.log(option.value || option.minValue)
      } else {
        newFilter[filter.id] = [option.value || [option.minValue, option.maxValue]] ;
      }
    } else {
      const index = newFilter[filter.id].findIndex((el) => el === option.value);
      newFilter[filter.id].splice(index, 1);
    }
  
    setProductFilters(newFilter);
  t
    console.log(newFilter[filter.id], [...newFilter[filter.id]], newFilter)
  };
  
  const handleSort = (e) => {

    const option = e.target.selectedOptions[0];
    let sort = { _sort: option.value ,_order:option.dataset.order };
    setProductSort(sort)   
  };
  const handlePage = (no) => {
    if(no==-1 && page==1 )
    {
      setPage(1);
    }
    setPage(no);  
    console.log(no)     
  };

  useEffect(() => {
    const pagination = {_page: page, _limit:ITEMS_PER_PAGE}
    dispatch(fetchProductListByFiltersAsync({filter:productFilters, sort:productSort, pagination}));
    console.log(productFilters, productSort);
  }, [dispatch, productFilters, productSort, page]);

  useEffect(()=>{
    setPage(1);
  },[productFilters, productSort])
  const toggleFilter = (filterId) => {
    setOpenFilter((prevFilter) => (prevFilter === filterId ? null : filterId));
  };

  useEffect(()=> {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
    dispatch(fetchPriceRangesAsync());
    dispatch(fetchRatingRangesAsync());
  },[])

  return (
    <div className="drawer lg:drawer-open">
      
      {userInfo && userInfo?.role == 'admin' && 
        (<Navigate to='/admin' replace= {true}></Navigate>)
    }
      
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="flex flex-row flex-wrap items-center justify-center gap-10 mx-0 mb-7 mt-7 drawer-content">
      <div className="top-0 flex justify-between w-full px-4 py-4 mx-0 border-b-2">
      <label
          htmlFor="my-drawer-2"
          className="btn drawer-button lg:hidden"
        >
         <FaFilter/>
        </label>
        <div className="flex items-center justify-center gap-2">
  <p className="w-fit">Sort by:</p>
  <select
    className="max-w-xs lg:w-80 w-36 select select-bordered"
    onChange={(e)=> handleSort(e)}
  >
    {sortOptions &&
      sortOptions.map((item) => (
        <option key={item.name} value={item.sort} data-order={item.order}>
          {item.name}
        </option>
      ))}
  </select>
</div>
      </div>
        <Loader loading={loadingStatus}/>
      <div className="flex flex-wrap justify-center w-full gap-2 px-2 md:gap-4 md:px-4">
  {products &&
    products.map((item) => (
      <ProductCard product={item} key={item.id} itemId={item.id} className="mb-4 mr-4" />
    ))}
</div>


          <Pagination page={page} handlePage={handlePage} totalItems={totalItems}/>
          
        
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="w-3/4 min-h-full p-4 md:w-80 menu bg-base-200 text-base-content">
          <ContentWrapper>
            {/* Sidebar content here */}

            <h3 className="mb-8 text-3xl">Filters</h3>
            {filters.map((filter) => (
              <div key={filter.id} className="mb-4">
                <button
                  type="button"
                  className="flex items-center w-full px-4 py-2 text-2xl font-semibold text-left text-gray-800 bg-gray-100 rounded-md focus:outline-none"
                  onClick={() => toggleFilter(filter.id)}
                >
                  <IoMdArrowDropright
                    className={`${openFilter === filter.id ? "rotate-90" : ""}`}
                  />
                  {filter.name}
                </button>
                <div
                  className={`mt-2 form-control ${
                    openFilter === filter.id ? "block" : "hidden"
                  }`}
                >
                  {filter.options.map((option) => (
                    <label
                      key={option.label}
                      className="flex items-center gap-3 px-4 py-2 text-lg cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 ml-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e,filter, option)}
                      />
                      <span className="text-gray-800">{option.label}</span>
                    </label>
                  ))}
                  
                </div>
              </div>
            ))}
          </ContentWrapper>
        </ul>
      </div>
    </div>
  );
};

export default ProductListContent;
