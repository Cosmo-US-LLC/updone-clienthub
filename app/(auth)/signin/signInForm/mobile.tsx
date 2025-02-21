"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { BiHide, BiShow } from "react-icons/bi";

function MobileSigninForm({
  handleSubmit,
  togglePasswordVisibility,
  onSubmit,
  register,
  showPassword,
  loading,
  errors,
  error,
  loginSuccess,
}: {
  handleSubmit: any;
  togglePasswordVisibility: any;
  onSubmit: any;
  register: any;
  showPassword: any;
  loading: any;
  errors: any;
  error: any;
  loginSuccess: any;
}) {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <FormContent
        handleSubmit={handleSubmit}
        togglePasswordVisibility={togglePasswordVisibility}
        onSubmit={onSubmit}
        register={register}
        showPassword={showPassword}
        loading={loading}
        errors={errors}
        error={error}
        loginSuccess={loginSuccess}
      />
    </Suspense>
  );
}

function FormContent({
  handleSubmit,
  togglePasswordVisibility,
  onSubmit,
  register,
  showPassword,
  loading,
  errors,
  error,
  loginSuccess,
}: {
  handleSubmit: any;
  togglePasswordVisibility: any;
  onSubmit: any;
  register: any;
  showPassword: any;
  loading: any;
  errors: any;
  error: any;
  loginSuccess: any;
}) {
  const searchParams = useSearchParams();
  const fromUnlock = searchParams.get("from") === "unlock";  // Check the 'from' query parameter

  return (
    <div className="relative h-fit flex items-center justify-center">
      <div className="w-full max-w-md p-5 space-y-4">
        <div className="space-y-[16px]">
          <h2 className="text-[24px] leading-[40px] font-[500] text-center text-[#161616] flex items-center justify-center gap-2">
            <span>Log in to</span>
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

          {/* Sign In Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email and Password Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[14px] text-[#161616]">Email</label>
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={`w-full px-[24px] !h-[48px] text-[15px] bg-[#F6F9FC] outline-none border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } !rounded-full`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-[12px] pt-[8px] text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 relative">
                <label htmlFor="password" className="block text-[14px] text-[#161616]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    className={`w-full px-[24px] !h-[48px] text-[15px] bg-[#F6F9FC] outline-none border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } !rounded-full`}
                    {...register("password")}
                  />
                  <div onClick={togglePasswordVisibility} className="absolute top-[14px] right-4 flex items-center cursor-pointer">
                    {showPassword ? <BiHide className="text-gray-400" size={20} /> : <BiShow className="text-gray-400" size={20} />}
                  </div>
                  {errors.password && <p className="text-[12px] pt-2 text-red-500">{errors.password.message}</p>}
                </div>
              </div>

              <div className="flex justify-end">
                <Link href={"/reset-password"} className="text-[12px] text-[#350ABC] hover:underline cursor-pointer">
                  Reset Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || loginSuccess}
              className={`w-full text-center py-3 px-4 relative z-50 h-[50px] ${
                loading || loginSuccess ? "bg-[#2C2240]" : "bg-[#350ABC] hover:bg-indigo-700"
              } text-white font-medium rounded-full shadow-sm`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2 py-2">
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse"></div>
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse delay-1000"></div>
                </div>
              ) : loginSuccess ? (
                <span className="text-[#9DFF95] text-[16px] font-[400] flex justify-center items-center gap-2" style={{ textShadow: "0px 0px 6px #9DFF95" }}>
                  <Image src="/icons/check.svg" alt="✅" width={20} height={20} />
                  Log in Successful!
                </span>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 text-center mt-4">{error}</p>
          )}
        </div>

        {/* Conditional Sign Up Link */}
        {!fromUnlock && (
          <p className="text-center text-[14px] leading-[24px] text-[#494848]">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-[#350ABC] hover:underline">
              Sign up
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default MobileSigninForm;
