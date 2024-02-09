import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CartContent from "./cartContent/CartContent";

const CartPage = () => {
  return (
    <div>
      <Header />
      <CartContent />
      <Footer />
    </div>
  );
};

export default CartPage;
