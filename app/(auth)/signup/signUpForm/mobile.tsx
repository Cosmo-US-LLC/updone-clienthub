"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { PhoneInput } from "react-international-phone";

function MobileSignupForm({
  handleSubmit,
  handleResetPassword,
  togglePasswordVisibility,
  onSubmit,
  register,
  showPassword,
  loading,
  errors,
  error,
  signupSuccess,
  montserrat,
  phoneNumber,
  setPhoneNumber,
  setValue,
}: {
  handleSubmit: any;
  handleResetPassword: any;
  togglePasswordVisibility: any;
  onSubmit: any;
  register: any;
  showPassword: any;
  loading: any;
  errors: any;
  error: any;
  signupSuccess: any;
  montserrat: any;
  phoneNumber: any;
  setPhoneNumber: any;
  setValue: any;
}) {
  return (
    <div className="relative h-fit flex items-center justify-center">
      <div className="w-full max-w-md p-5 space-y-4">
        <div className="space-y-[16px]">
          <h2 className="text-[24px] leading-[40px] font-[500] text-center text-[#161616] flex items-center justify-center gap-2">
            <span>Sign up to</span>
            <Link href="/">
              <Image src={"/logo.svg"} alt="Updone" height={32} width={110} />
            </Link>
          </h2>
        </div>

        <div className="space-y-4">
          {/* Google Login Button */}
          <Link href={process?.env?.NEXT_PUBLIC_GOOGLE_AUTH_LINK || ""}>
            <button className="w-full flex items-center justify-center h-[50px] px-4 rounded-full bg-[#F6F9FC] leading-[24px] text-[#4C4B4B] font-medium">
              <img
                src="/images/signup/Google.svg"
                alt="Google"
                className="w-[24px] h-[24px] mr-3"
              />
              Google
            </button>
          </Link>

          <div className="relative text-center">
            <span className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E0E5EC]"></div>
            </span>
            <span className="relative bg-white px-4 text-[14px] leading-[22px] text-[#262626]">
              Or
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-[14px] text-[#161616]"
                >
                  Name
                </label>
                <div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className={`w-full px-[24px] !h-[48px] text-[15px] bg-[#F6F9FC] outline-none border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } !rounded-full`}
                    style={
                      errors.name && {
                        boxShadow: "0px 0px 20px 0px rgba(194, 0, 0, 0.22)",
                      }
                    }
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-[8px] pt-[12px] text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-[14px] text-[#161616]"
                >
                  Phone
                </label>
                <PhoneInput
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value);
                    setValue("phoneNumber", value); // Update react-hook-form value
                  }}
                  placeholder="Phone Number*"
                  className={`w-full px-[24px] !h-[48px] text-[15px] bg-[#F6F9FC] outline-none border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } rounded-full`}
                  style={
                    errors.phoneNumber && {
                      boxShadow: "0px 0px 20px 0px rgba(194, 0, 0, 0.22)",
                    }
                  }
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

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
                    <p className="text-[12px] pt-[8px] text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2 relative">
                <label
                  htmlFor="password"
                  className="block text-[14px] text-[#161616]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    className={`w-full px-[24px] !h-[48px] text-[15px] bg-[#F6F9FC] outline-none border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } !rounded-full`}
                    style={
                      errors.password && {
                        boxShadow: "0px 0px 20px 0px rgba(194, 0, 0, 0.22)",
                      }
                    }
                    {...register("password")}
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute top-[18px] right-4 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <BiHide className="text-gray-400" size={20} />
                    ) : (
                      <BiShow className="text-gray-400" size={20} />
                    )}
                  </div>
                  {errors.password && (
                    <p className="text-[12px] pt-2 text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div></div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || signupSuccess}
              className={`w-full text-center py-3 px-4 relative z-50 h-[50px] ${
                loading || signupSuccess
                  ? "bg-[#2C2240]"
                  : "bg-[#350ABC] hover:bg-indigo-700"
              } text-white font-medium rounded-full shadow-sm`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2 py-2">
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse"></div>
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse delay-1000"></div>
                </div>
              ) : signupSuccess ? (
                <span
                  className="text-[#9DFF95] text-[16px] font-[400] flex justify-center items-center gap-2"
                  style={{ textShadow: "0px 0px 6px #9DFF95" }}
                >
                  <Image
                    src="/icons/check.svg"
                    alt="✅"
                    width={20}
                    height={20}
                  />
                  Sign up Successful!
                </span>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          {/* Error Handling */}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {/* Success Message */}
          {/* {signupSuccess && (
            <p className="text-sm text-green-500 text-center">
              Signup successful! Please log in.
            </p>
          )} */}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-indigo-600 hover:underline">
              Log in
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

export default MobileSignupForm;
