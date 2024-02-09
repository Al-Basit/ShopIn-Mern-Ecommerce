import React from "react";
import { useForm } from "react-hook-form";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <ContentWrapper>
      <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
        <h1 className="mb-3 text-3xl font-bold"> Forgot Password</h1>

        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Enter you email to forgot password
            </h2>
            <form
              noValidate
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "invalid email",
                    },
                  })}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-red-400">{errors.email.message}</p>
                )}
              </div>
              <div className="flex items-start"></div>
              <button type="submit" className="w-full btn btn-neutral">
                Send Email
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Go back to login!{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default ForgotPassword;
