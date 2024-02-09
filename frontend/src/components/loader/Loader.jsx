import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = ({ loading }) => {
  return loading === "loading" ? (
    <div className="flex items-center justify-center h-screen">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="rgb(43, 52, 64)"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : null;
};

export default Loader;
