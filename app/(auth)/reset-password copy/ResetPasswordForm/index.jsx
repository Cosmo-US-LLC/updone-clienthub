"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Import Zod for validation
import Image from "next/image";
import { apiRequest } from "@/app/lib/services";
import MobileResetForm from "./mobile";

// Validation Schema
const ResetPasswordFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordFormSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    const body = {
      email: data.email,
    };

    try {
      const response = await apiRequest("/resetPassword", {
        method: "POST",
        body: body,
      });

      if (response) {
        setSuccessMessage("Reset link sent! Please check your email.");
      }
    } catch (err) {
      setError(
        err.message || "An error occurred while sending the reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {/* Form Container */}
      <div className="max-lg:hidden relative min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Reset Password
          </h2>

          <p className="text-center text-sm text-gray-600 !mb-12">
            Enter your email address to reset your password.
          </p>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
            {/* Email Field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } !rounded-full`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-center py-3 px-4 ${
                loading ? "bg-gray-500" : "bg-[#350ABC]"
              } text-white font-medium rounded-full shadow-sm hover:bg-indigo-700`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* Success Message */}
          {successMessage && (
            <p className="text-sm text-green-500 text-center mt-4">
              {successMessage}
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 text-center mt-4">{error}</p>
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
              Go Back to Sign In
            </a>
          </p>
        </div>
      </div>

      <div className="lg:hidden">
          <MobileResetForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            loading={loading}
            errors={errors}
            error={error}
          />
      </div>
    </div>
  );
};

export default ResetPasswordForm;
