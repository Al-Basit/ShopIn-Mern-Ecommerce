import React from "react";
import Header from "../../components/header/Header";
import AdminProductListContent from "./ProductListContent/AdminProductListContent";
import Footer from "../../components/footer/Footer";

const AdminProductList = () => {
  return (
    <div className="productList">
      <Header />
      <AdminProductListContent />
      <Footer />
    </div>
  );
};

export default AdminProductList;
