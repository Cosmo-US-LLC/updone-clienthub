"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Import Zod for schema validation
import { BiHide, BiShow } from "react-icons/bi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { apiRequest } from "@/app/lib/services";
import { montserrat } from "@/app/lib/Fonts";
import Link from "next/link";
import MobileSignupForm from "./mobile";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/lib/store/features/authSlice";
import { useRouter } from "next/navigation";

// **Validation Schema**
const SignupFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must have at least one uppercase letter")
    .regex(/[0-9]/, "Password must have at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must have at least one special character"),
    // .regex(/[!@#$%^&*]/, "Password must have at least one special character"),
  phoneNumber: z
    .string()
    .min("Phone number is required")
    .regex(/^\+?\d{10,15}$/, "Invalid phone number"),
});

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState(null);

  const isUpdoneDomain =
    typeof window !== "undefined" &&
    window?.location?.hostname?.includes("updone");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupFormSchema), // Zod schema resolver
    mode: "onSubmit",
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm({
    resolver: zodResolver(SignupFormSchema), // Zod schema resolver
    mode: "onSubmit",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // ✅ **Fixed Signup Submission**
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    const body = {
      name: data.name,
      email: data.email,
      phone_number: data.phoneNumber, // ✅ Fixed phone number key
      password: data.password,
      password_confirmation: data.password,
    };

    try {
      const newData = await apiRequest("/register", {
        method: "POST",
        body: body,
      }, setError)

      if (newData?.token) {
        setSignupSuccess(true);

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
            router.push(`${process.env.NEXT_PUBLIC_TALENTPRO_URL}/talent/events`); // Redirect to talent homepage
            return;
          }
          if (newData?.user?.role_id == 4) {
            router.push(`${process.env.NEXT_PUBLIC_CLIENTHUB_URL}/events`); // Redirect to client homepage
            return;
          }
          if (window.innerWidth >= 1024) {
            router.push(`${process.env.NEXT_PUBLIC_CLIENTHUB_URL}/events`); // Redirect to client homepage
            return
          }
          router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/`);  
        }, 2500);
      } else {
        throw new Error(newData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md lg:p-5">
      {/* Form Container */}
      <div className="max-lg:hidden relative flex items-center justify-center">
        <div className="space-y-6 w-full">
          <h2
            className={`text-2xl mb-8 font-semibold text-center text-gray-900 ${montserrat}`}
          >
            Sign up to Updone
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

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full px-4 py-2 border outline-none ${
                  errors.name
                    ? "border-red-500 text-red-500"
                    : "border-gray-300"
                } !rounded-full`}
                style={errors.name && {
                  boxShadow: '0px 0px 20px 0px rgba(194, 0, 0, 0.22)'
                }}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <PhoneInput
                value={phoneNumber}
                onChange={(value) => {
                  setPhoneNumber(value);
                  setValue("phoneNumber", value);
                }}
                placeholder={'000000'}
                className={`w-full pl-2 border ${
                  errors.phoneNumber
                    ? "border-red-500 shadow-red-200"
                    : "border-gray-300"
                } !rounded-full`}
              />
            </div>

            {/* Email */}
            <div>
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
              style={errors.email && {
                boxShadow: '0px 0px 20px 0px rgba(194, 0, 0, 0.22)'
              }}
                {...register("email")}
              />
              {errors.email && typeof errors.email.message === "string" && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
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
                style={errors.password && {
                  boxShadow: '0px 0px 20px 0px rgba(194, 0, 0, 0.22)'
                }}
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || signupSuccess}
              className={`w-full text-center py-3 px-4 h-[48px] flex justify-center items-center text-white font-medium !rounded-full shadow-sm 
              ${
                loading
                  ? "!bg-[#2C2240]"
                  : signupSuccess
                  ? "!bg-[#2C2240]"
                  : "bg-[#350ABC] hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2 py-2">
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse"></div>
                  <div className="bg-[#b199ff] w-2.5 h-2.5 rounded-full animate-pulse delay-1000"></div>
                </div>
              ) : signupSuccess ? (
                <span className="text-[#9DFF95] text-shadow-xl">
                  Signup successful!
                </span>
              ) : (
                "Sign up"
              )}
            </button>
          </form>

          {/* Error Handling */}
          {error && <p className="text-sm text-red-500 text-center">{error || error}</p>}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-indigo-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
      <div className="lg:hidden">
        <MobileSignupForm
          handleSubmit={handleSubmit2}
          togglePasswordVisibility={togglePasswordVisibility}
          onSubmit={onSubmit}
          register={register2}
          showPassword={showPassword}
          loading={loading}
          errors={errors2}
          error={error}
          signupSuccess={signupSuccess}
          montserrat={montserrat}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setValue={setValue2}
        />
      </div>
    </div>
  );
};

export default SignupForm;
