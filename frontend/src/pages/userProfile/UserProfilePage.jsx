import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import UserProfileContent from "./userProfileContent/UserProfileContent";

const UserProfilePage = () => {
  return (
    <div>
      <Header />
      <UserProfileContent />
      <Footer />
    </div>
  );
};

export default UserProfilePage;
