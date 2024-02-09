import React from "react";

const Counter = ({ handleQuantity, quantity }) => {
  return (
    <div className="w-16 lg:w-32 custom-number-input">
      <div className="relative flex flex-row w-full h-6 mt-1 text-center bg-transparent rounded-lg md:h-10">
        <button
          data-action="decrement"
          className="text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer w-14 md:w-20 hover:text-gray-700 hover:bg-gray-400"
          onClick={() => handleQuantity(-1)}
        >
          <span className="self-center m-auto font-thin md:text-2xl">−</span>
        </button>
        <input
          type="number"
          className="flex items-center w-full font-semibold text-center text-gray-700 bg-gray-300 outline-none focus:outline-none text-md hover:text-black focus:text-black md:text-basecursor-default"
          name="custom-input-number"
          value={quantity}
          readOnly
        />
        <button
          data-action="increment"
          className="w-20 h-full text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400"
          onClick={() => handleQuantity(1)}
        >
          <span className="self-center m-auto font-thin md:text-2xl">+</span>
        </button>
      </div>
    </div>
  );
};

export default Counter;
