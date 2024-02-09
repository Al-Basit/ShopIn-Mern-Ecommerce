import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import ProductListContent from "./ProductListContent/ProductListContent";
import Footer from "../../components/footer/Footer";

const ProductList = () => {
  return (
    <div className="productList">
      <Header />
      <ProductListContent />
      <Footer />
    </div>
  );
};

export default ProductList;
