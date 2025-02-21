"use client";
import Link from "next/link";
import React from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { PhoneInput } from "react-international-phone";

function MobileResetForm({
  handleSubmit,
  onSubmit,
  register,
  loading,
  errors,
  error,
  successMessage,
}: {
  handleSubmit: any;
  onSubmit: any;
  register: any;
  loading: any;
  errors: any;
  error: any;
  successMessage: any;
}) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-full max-w-md py-8 px-5 space-y-[52px]">
        <div className="space-y-[16px]">
          <h2 className="text-[24px] leading-[40px] font-[500] text-center text-[#161616]">
            Reset Password
          </h2>
          <p className="text-[14px] text-center text-[#6B6B6B]">
            Enter your registered email address, and we’ll send you a link to
            reset your password.
          </p>
        </div>

        <div className="space-y-4">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[14px] text-[#161616]"
              >
                Email
              </label>
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className={`w-full px-[24px] !h-[48px] text-[15px] bg-[#F6F9FC] outline-none border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } !rounded-full`}
                  style={
                    errors.email && {
                      boxShadow: "0px 0px 20px 0px rgba(194, 0, 0, 0.22)",
                    }
                  }
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[12px] pt-[12px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div></div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-center px-4 relative z-50 !h-[50px] ${
                loading ? "bg-[#2C2240]" : "bg-[#350ABC] hover:bg-indigo-700"
              } text-white font-medium rounded-full shadow-sm`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2 py-2">
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse"></div>
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse delay-100"></div>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Error Handling */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* Success Message */}
          {successMessage && (
            <p className="text-sm text-green-500 text-center mt-4">
              {successMessage}
            </p>
          )}

          {/* Back to Login Link */}
          <p className=" flex text-[14px] items-center justify-center gap-1 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="#350ABC"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <a href="/signin" className="text-indigo-600 hover:underline">
              Go back to sign in
            </a>
          </p>
        </div>
      </div>

      {loading && (
        <div className="z-20 bg-white opacity-50 absolute top-0 left-0 h-[100dvh] w-screen"></div>
      )}
    </div>
  );
}

export default MobileResetForm;
