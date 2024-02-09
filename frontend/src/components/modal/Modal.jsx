import React, { useEffect, useRef, useState } from "react";
// import { BiError, BiErrorCircle } from "react-icons/bi";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { VscError } from "react-icons/vsc";

const Modal = ({
  title,
  description,
  mainOption,
  cancelOption,
  mainAction,
  showModal,
  cancelAction,
  type,
}) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [icon, setIcon] = useState(null);

  // let icon, color;

  useEffect(() => {
    if (showModal) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    switch (type) {
      case "info":
        setColor("bg-yellow-100");
        setIcon(<FaInfoCircle />);
        break;
      case "warning":
        setColor("bg-red-400");
        setIcon(<IoWarning />);
        break;
      case "success":
        setColor("bg-green-400");
        setIcon(<FaCheck />);
        break;
    }
  }, [showModal, type]);

  const handleMain = () => {
    setOpen(false);
    mainAction();
  };

  const handleCancel = () => {
    setOpen(false);
    cancelAction();
  };

  return open ? (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center text-gray-800 sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div
              className={`flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto ${color} rounded-full sm:mx-0 sm:h-10 sm:w-10`}
            >
              {icon}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">{description}</p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-grey-600 transition duration-150 ease-in-out ${color} border border-transparent rounded-md shadow-sm  focus:outline-none focus:shadow-outline-${color} sm:text-sm sm:leading-5`}
                onClick={handleMain}
              >
                {mainOption}
              </button>
            </span>
            <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                onClick={handleCancel}
              >
                {cancelOption}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
