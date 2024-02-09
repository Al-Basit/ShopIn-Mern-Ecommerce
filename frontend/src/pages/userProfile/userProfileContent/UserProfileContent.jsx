import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserInfo,
  selectUserStatus,
  updateUserAsync,
} from "../../../store/user/userSlice";
import { useForm } from "react-hook-form";
import Loader from "../../../components/loader/Loader";
import Modal from "../../../components/modal/Modal";
import { useAlert, types } from "react-alert";

export default function UserProfileContent() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const userInfo = useSelector(selectUserInfo);
  const loadingStatus = useSelector(selectUserStatus);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [removeIndex, setRemoveIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
    alert.show("Address updated successfully!", { type: types.SUCCESS });
  };
  const handleRemove = (index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
    setOpenModal(false);
    setRemoveIndex(-1);
    alert.show("Address removed successfully!", { type: types.INFO });
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("company", address.company);
    setValue("postalCode", address.postalCode);
    setValue("phoneNo", address.phoneNo);
    setValue("additionalLocation", address.additionalLocation);
  };

  const handleAdd = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
    alert.show("Address added successfully!", { type: types.SUCCESS });
  };

  return (
    <div>
      <Modal
        title={`Remove Address`}
        description="Are you sure you want to remove this address?"
        mainOption="Remove"
        cancelOption="Cancel"
        mainAction={() => handleRemove(removeIndex)}
        cancelAction={() => setOpenModal(false)}
        showModal={openModal}
        type="warning"
      />
      <Loader loading={loadingStatus} />
      <div className="px-4 mx-auto mt-12 bg-white max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
          <h1 className="my-5 text-4xl font-bold tracking-tight text-gray-900">
            Name: {userInfo?.name ? userInfo.name : "New User"}
          </h1>
          <h3 className="my-5 text-xl font-bold tracking-tight text-red-900">
            email address : {userInfo?.email}
          </h3>
          {userInfo?.role === "admin" && (
            <h3 className="my-5 text-xl font-bold tracking-tight text-red-900">
              role : {userInfo?.role}
            </h3>
          )}
        </div>

        <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
          <button
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
            className="text-white btn btn-wide btn-neutral"
          >
            Add New Address
          </button>
          {showAddAddressForm ? (
            <form
              className="px-5 py-12 mt-12 bg-white"
              noValidate
              onSubmit={handleSubmit((data) => {
                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="pb-12 border-b border-gray-900/10">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phoneNo"
                          {...register("phoneNo", {
                            required: "phone number is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phoneNo && (
                          <p className="text-red-500">
                            {errors.phoneNo.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="additionalLocation"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street/Apartement/Floor etc
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("additionalLocation")}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.additionalLocation && (
                          <p className="text-red-500">
                            {errors.additionalLocation.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Company (optional)
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("company")}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.company && (
                          <p className="text-red-500">
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("postalCode", {
                            required: "postalCode is required",
                          })}
                          id="postalCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.postalCode && (
                          <p className="text-red-500">
                            {errors.postalCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-6 gap-x-6">
                  <button
                    onClick={() => setShowAddAddressForm(false)}
                    className="text-white btn btn-neutral"
                  >
                    cancel
                  </button>
                  <button type="submit" className="text-white btn btn-neutral">
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          <p className="mt-0.5 text-lg font-semibold text-gray-500">
            Your Addresses :
          </p>
          {userInfo?.addresses.map((address, index) => (
            <>
              <div key={index}>
                {selectedEditIndex === index ? (
                  <form
                    className="px-5 py-12 mt-12 bg-white"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
                    })}
                  >
                    <div className="space-y-12">
                      <div className="pb-12 border-b border-gray-900/10">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.name && (
                                <p className="text-red-500">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "email is required",
                                })}
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.email && (
                                <p className="text-red-500">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phoneNo"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone
                            </label>
                            <div className="mt-2">
                              <input
                                id="phoneNo"
                                {...register("phoneNo", {
                                  required: "phone number is required",
                                })}
                                type="tel"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.phoneNo && (
                                <p className="text-red-500">
                                  {errors.phoneNo.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="additionalLocation"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street/Apartement/Floor etc (optional)
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("additionalLocation")}
                                id="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.additionalLocation && (
                                <p className="text-red-500">
                                  {errors.additionalLocation.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.city && (
                                <p className="text-red-500">
                                  {errors.city.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="company"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Comapny (optional)
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("company", {
                                  required: "company is required",
                                })}
                                id="company"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.company && (
                                <p className="text-red-500">
                                  {errors.company.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="postalCode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("postalCode", {
                                  required: "pinCode is required",
                                })}
                                id="pinCode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.pinCode && (
                                <p className="text-red-500">
                                  {errors.pinCode.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end mt-6 gap-x-6">
                        <button
                          onClick={(e) => setSelectedEditIndex(-1)}
                          type="submit"
                          className="btn btn-neutral"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-neutral">
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : null}

                <div className="flex justify-between px-5 py-5 border-2 border-gray-200 border-solid gap-x-6">
                  <div className="flex gap-x-4">
                    <div className="flex-auto min-w-0">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {address.address}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {address.additionalLocation}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                        {address.company}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {address.phoneNo}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      Postal Code: {address.postalCode}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <button
                      onClick={(e) => handleEditForm(index)}
                      type="button"
                      className="font-medium text-grey-600 hover:text-grey-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setRemoveIndex(index);
                      }}
                      type="button"
                      className="font-medium text-grey-600 hover:text-grey-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
