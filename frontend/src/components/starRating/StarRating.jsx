import React from "react";
import ReactStars from "react-rating-stars-component";
const StarRating = ({ value, size }) => {
  return (
    <ReactStars
      value={value}
      count={5}
      size={size}
      isHalf={true}
      edit={false}
      activeColor="##1D232B"
    />
  );
};

export default StarRating;
