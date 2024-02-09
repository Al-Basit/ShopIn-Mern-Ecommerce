import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <div className="w-full px-2 py-0 mx-auto my-0 max-w-7xl sm:px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default ContentWrapper;
