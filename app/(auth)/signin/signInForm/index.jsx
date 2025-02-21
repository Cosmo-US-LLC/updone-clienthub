"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Import Zod for validation
import { useRouter } from "next/navigation";
import { BiShow, BiHide } from "react-icons/bi";
import { apiRequest } from "@/app/lib/services";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/lib/store/features/authSlice";
import Cookies from "js-cookie";
import Link from "next/link";
// import MobileSigninForm from "./mobile";
import { useError } from "@/app/lib/context/ErrorProvider";
import MobileSigninForm from "@/app/(auth)/signin/signInForm/mobile";
// import MobileSigninForm from "./mobile";

// ✅ **Updated Validation Schema**
const SignInFormSchema = z.object({
  email: z
    .string()
    .min(5, "Email is required")
    .email({ message: "Invalid email address" }), // ✅ Fixed email validation
  password: z.string().min(6, "Password is required"), // ✅ Fixed password validation
});

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleError } = useError(); // Error handler
  const isUpdoneDomain =
    typeof window !== "undefined" &&
    window?.location?.hostname?.includes("updone");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInFormSchema), // Zod schema resolver
    mode: "onBlur",
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,

    formState: { errors: errors2 },
  } = useForm({
    resolver: zodResolver(SignInFormSchema), // Zod schema resolver
    mode: "onBlur",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // ✅ **Fixed Login Submission**
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null); // Reset previous errors

    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const newData = await apiRequest(
        "/login",
        {
          method: "POST",
          body: body,
        },
        setError
      );

      if (newData?.token) {
        setLoginSuccess(true);

        // ✅ Save token in Cookies
        Cookies.set("token", newData.token, {
          expires: 30,
          path: "/",
          ...(isUpdoneDomain && { domain: ".updone.com" }),
        });

        // ✅ Save user data in Redux store
        Cookies.set("authData", JSON.stringify(newData), {
          expires: 30,
          path: "/",
          ...(isUpdoneDomain && { domain: ".updone.com" }),
        });

        dispatch(setAuth(newData));

        // ✅ Show success message for 2.5s before redirect
        setTimeout(() => {
          const callback = Cookies.get("callbackUrl");
          if (callback) {
            Cookies.remove("callbackUrl", {
              path: "/",
              ...(isUpdoneDomain && { domain: ".updone.com" }),
            });
            router.push(callback);
            return;
          }

          if (newData?.user?.role_id == 3) {
            router.push(
              `${process.env.NEXT_PUBLIC_TALENTPRO_URL}/talent/events`
            ); // Redirect to talent homepage
            return;
          }
          if (window.innerWidth >= 1024) {
            router.push(`${process.env.NEXT_PUBLIC_CLIENTHUB_URL}/events`); // Redirect to client homepage
            return;
          }
          router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/`);  
          // router.push("/"); // Redirect to homepage
        }, 1500);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      // setError(err?.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md lg:p-5">
      {/* Desktop Form */}
      <div className="max-lg:hidden relative flex items-center justify-center">
        <div className="w-full space-y-6">
          <h2
            className={`text-2xl mb-8 font-semibold text-center text-gray-900`}
          >
            Log in
          </h2>

          {/* Google Login Button */}
          <Link href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_LINK || ""}>
            <button className="w-full flex items-center justify-center py-3 px-4 !rounded-full shadow-sm bg-[#F6F9FC] text-gray-600 font-medium">
              <img
                src="/images/signup/Google.svg"
                alt="Google"
                className="w-5 h-6 mr-2"
              />
              Google
            </button>
          </Link>

          <div className="relative text-center">
            <span className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </span>
            <span className="relative bg-white px-4 text-gray-500">Or</span>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-2 border outline-none ${
                  errors.email
                    ? "border-red-500 text-red-500"
                    : "border-gray-300"
                } !rounded-full`}
                style={
                  errors.email && {
                    boxShadow: "0px 0px 20px 0px rgba(194, 0, 0, 0.22)",
                  }
                }
                {...register("email")}
              />
              {errors.email && typeof errors.email.message === "string" && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1 relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full px-4 py-2 border outline-none ${
                    errors.password
                      ? "border-red-500 text-red-500"
                      : "border-gray-300"
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
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <BiHide size={20} className="text-gray-400" />
                  ) : (
                    <BiShow size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Reset Password Link */}
            <div className="flex justify-end">
              <div
                className="text-sm text-indigo-600 hover:underline cursor-pointer"
                onClick={() => router.push("/reset-password")}
              >
                Reset Password?
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || loginSuccess}
              className={`w-full text-center py-3 px-4 h-[48px] flex justify-center items-center text-white font-medium !rounded-full shadow-sm 
                ${
                  loading
                    ? "!bg-[#2C2240]"
                    : loginSuccess
                    ? "!bg-[#2C2240]"
                    : "bg-[#350ABC] hover:bg-indigo-700"
                }`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2 py-2">
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse"></div>
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse delay-1000"></div>
                </div>
              ) : loginSuccess ? (
                <span className="text-[#9DFF95] text-shadow-xl">
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

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="lg:hidden">
        <MobileSigninForm
          handleSubmit={handleSubmit2}
          togglePasswordVisibility={togglePasswordVisibility}
          onSubmit={onSubmit}
          register={register2}
          showPassword={showPassword}
          loading={loading}
          errors={errors2}
          error={error}
          loginSuccess={loginSuccess}
        />
      </div>
    </div>
  );
};

export default SignInForm;
