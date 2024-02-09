import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import DetailsBanner from "./DetailsBanner/DetailsBanner";
import RatingSection from "./ratingSection/RatingSection";

const productDetails = () => {
  return (
    <div>
      <Header />
      <DetailsBanner />
      <RatingSection />
      <Footer />
    </div>
  );
};

export default productDetails;
