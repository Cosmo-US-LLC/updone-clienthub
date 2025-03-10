"use client";
import React, { useEffect, useState } from "react";
import { loginInputStyles } from "@/app/lib/styles";
import { VscMail } from "react-icons/vsc";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { PiBuilding } from "react-icons/pi";
import { Profile, UpdatedData } from "@/app/lib/types";
import { validateAllField, validateField } from "@/app/lib/validations/schema";
import useProfileSettings from "@/app/lib/hooks/useSetting";
import { prepareUpdatedData, updateProfile } from "@/app/lib/helpers/utils";
import { FiArrowRight } from "react-icons/fi";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { useRouter } from "next/navigation";
import { BiHide, BiShow } from "react-icons/bi";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { apiRequest } from "@/app/lib/services";

const Page = () => {
  const {
    profile,
    setProfile,
    showPasswordFields,
    setShowPasswordFields,
    isFormModified,
    errors,
    setErrors,
    originalProfile,
    storedData,
    dispatch,
    isLoading,
    setIsLoading,
    verifyPassword,
    showNewPasswordFields,
    passwordVerificationError,
    setShowNewPasswordFields,
    setPasswordVerificationError,
    isVerifyPasswordLoading,
  } = useProfileSettings();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false); // Toggle visibility for New Password
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState(false);
  // Handle real-time field validation onChange
  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile({ ...profile, [field]: value });
    validateField(field, value, setErrors, errors, showPasswordFields, profile);
  };

  // Handle form submission
  const handleSubmit = async (): Promise<void> => {
    if (!validateAllField()) return;

    const updatedData: UpdatedData = prepareUpdatedData(
      profile,
      originalProfile,
      showPasswordFields,
      password,
      confirmPassword
    );

    // Call the helper function to update the profile
    setIsLoading(true);
    await updateProfile(updatedData, storedData, dispatch)
      .then(() => {
        setShowPasswordFields(false);
        setIsCompleted(true);
        setShowNewPasswordFields(false);
        setPassword("");
        setConfirmPassword("");
        setIsValid(false);
        setPasswordVerificationError("");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        // Handle the error here if needed
      });

    router.refresh();
  };

  const [savedMethods, setSavedMethods] = useState([]);

  const fetchSavedPaymentMethods = async () => {
    try {
      const response = await apiRequest("/stripe/payment-methods", {
        method: "POST",
        headers: {
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
      });
      const data = response;
      if (data?.length > 0) {
        setSavedMethods(data);
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  // Call this function when the component mounts
  useEffect(() => {
    fetchSavedPaymentMethods();
  }, []);

  // console.log(savedMethods)

  const validatePassword = (password: string): boolean => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(
        "Password must include lowercase, uppercase, number, and special character."
      );
      setIsValid(false); // Set false if password doesn't meet criteria
    } else {
      setPasswordError("");
      setIsValid(confirmPassword === value); // Only set true if confirmPassword matches
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
      setIsValid(false); // Set false if passwords don't match
    } else {
      setConfirmPasswordError("");
      if (validatePassword(password)) {
        setIsValid(true); // Set true if passwords match and password is valid
      } else {
        setIsValid(false); // Still false if the main password is invalid
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="my-12 w-[820px]">
          {/* <div className='flex flex-col relative right-[292px] my-[20px] justify-start items-start ga-y-[10px]'>
              <span className='text-[#2C2240] text-[20px] leading-[26px] font-[700]'>Account</span>
              <p className='text-[#6B6B6B] leading-[24px] font-[400] text-[14px]'>Manage your Updone profile</p>
              <p></p>
            </div> */}
          {/* Full Name and Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px] mb-4">
            <div>
              <label className="text-[#2C2240] text-[16px] font-[500] leading-normal">
                Full Name
              </label>
              <div className="relative mt-[8px] w-full">
                {/* Icon positioned to the left */}
                <AiOutlineUser
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />

                {/* Input field */}
                <input
                  style={{
                    ...loginInputStyles, // Apply base styles
                  }}
                  id="default-search"
                  type="email"
                  value={profile.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className={`defaultsearch shadow-lg pb-[20px] pt-[20px] pl-[42px] min-h-[52px] w-full focus:outline-blue-200`}
                  placeholder="Full Name*"
                />
              </div>

              {errors.fullName && (
                <div className="text-[12px] font-[400] leading-[31px] text-[#C20000]">
                  <p className="text-sm">{errors.fullName}</p>
                </div>
              )}
            </div>
            <div>
              <label className="text-[#2C2240] text-[16px] font-[500] leading-normal">
                Phone Number
              </label>
              <div className="relative mt-[8px] w-full">
                {/* Icon positioned to the left */}
                <BsTelephone
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />

                {/* Input field */}
                <input
                  style={{
                    ...loginInputStyles, // Apply base styles
                  }}
                  id="default-search"
                  type="text"
                  value={profile.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className={`defaultsearch shadow-lg pb-[20px] pt-[20px] pl-[42px] min-h-[52px] w-full focus:outline-blue-200`}
                  placeholder="Contact Number*"
                />
              </div>

              {errors.phoneNumber && (
                <div className="text-[12px] font-[400] leading-[31px] text-[#C20000]">
                  <p>{errors.phoneNumber}</p>
                </div>
              )}
            </div>
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <label className="text-[#2C2240] text-[16px] font-[500] leading-normal">
              Company
            </label>
            <div className="relative mt-[8px] w-full">
              {/* Icon positioned to the left */}
              <PiBuilding
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />

              {/* Input field */}
              <input
                style={{
                  ...loginInputStyles, // Apply base styles
                }}
                id="default-search"
                type="text"
                value={profile.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className={`defaultsearch shadow-lg pb-[20px] pt-[20px] pl-[42px] min-h-[52px] w-full focus:outline-blue-200`}
                placeholder="Company*"
              />
            </div>
            {errors.company && (
              <div className="text-[12px] font-[400] leading-[31px] text-[#C20000]">
                <p>{errors.company}</p>
              </div>
            )}
          </div>

          {/* Email (Read-Only) */}
          <div className="mb-4">
            <div className="w-full border-b-[1px] border-[#DFDFDF] block my-8"></div>

            <div className="flex !gap-[28px]">
              <div className="relative w-full">
                <p className="text-[#2C2240] text-[16px] font-[500] leading-normal">
                  Email
                </p>
                <p className="text-sm text-[#6B6B6B] font-[500] leading-[19px] text-[16px] mt-2">
                  Used to login to your account{" "}
                  <span className="!text-[#161616]">(Read Only)</span>
                </p>
              </div>
              <div className="relative w-full">
                {/* Icon positioned to the left */}
                <VscMail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />

                {/* Input field */}
                <input
                  style={{
                    ...loginInputStyles, // Apply base styles
                  }}
                  id="default-search"
                  type="email"
                  disabled
                  value={profile.email}
                  readOnly
                  className={`defaultsearch !text-[#a39f9f] !bg-[#f0f0f0] shadow-lg pb-[20px] pt-[20px] pl-[42px] min-h-[52px] w-full focus:outline-blue-200`}
                  placeholder="Email Address*"
                />
              </div>
            </div>
          </div>

          <div className="w-full border-b-[1px] border-[#DFDFDF] block mt-8"></div>
          {/* Password Section */}
          <div
            className={`${
              showPasswordFields && "bg-[#FFF] !mb-6 px-[20px]"
            } mb-2 py-[40px] relative`}
          >
            <div className="flex  justify-between items-center w-full">
              {!showPasswordFields && (
                <div
                  className="text-sm text-[#2C2240] text-[16px] relative bottom-[6px] font-[500] leading-normal"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                >
                  {showPasswordFields ? "" : "Password"}
                  <p className="text-[#6B6B6B] pt-2">*************</p>
                </div>
              )}
              {!showPasswordFields && (
                <div
                  className="cursor-pointer text-[#161616] text-[14px] font-[400] leading-[26px] bg-[#FFF] border-[1px] border-[#6B6B6B] rounded-[4px] py-[12px] px-[32px] flex justify-center items-center gap-2"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                >
                  Update Password
                </div>
              )}
            </div>

            {showPasswordFields && (
              <div className="flex flex-row gap-[28px]">
                <div className="flex flex-row gap-2">
                  <div>
                    <label className="text-[#2C2240] text-[16px] font-[500] leading-normal">
                      Old Password
                    </label>
                    <div className="flex flex-row">
                      <div className="flex flex-col justify-start items-center gap-3">
                        <div className="relative mt-[7px]">
                          <input
                            style={{
                              ...loginInputStyles, // Apply base styles
                              ...(!!passwordVerificationError && {
                                boxShadow:
                                  "rgb(255 0 0 / 18%) 0px 0px 12px 0px",
                                background: "#FFF5F5",
                              }), // Only apply boxShadow when passwordVerificationError is true
                            }}
                            type={showPassword ? "text" : "password"} // Switch between password and text
                            value={profile.currentPassword}
                            onChange={(e) =>
                              handleInputChange(
                                "currentPassword",
                                e.target.value
                              )
                            }
                            onFocus={() => {
                              setPasswordVerificationError(""); // Clear the error when the input is focused
                            }}
                            className={`defaultsearch shadow-lg ${
                              !!passwordVerificationError &&
                              "!border-[1px] !border-red-200"
                            } w-[240px] pb-[20px] pt-[20px] pl-[12px] min-h-[52px] focus:outline-blue-200`}
                            placeholder="Password*"
                          />

                          {/* Show/Hide password toggle icon */}
                          <div
                            className={`absolute inset-y-0 right-3 flex items-center cursor-pointer`}
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <BiHide color="#9F9F9F" size={18} />
                            ) : (
                              <BiShow color="#9F9F9F" size={18} />
                            )}
                          </div>
                        </div>
                        <div className="!text-red-400 text-[12px] relative right-[29px] bottom-2">
                          {!!passwordVerificationError &&
                            "Incorrect password! Try again"}
                        </div>
                      </div>
                      {isVerifyPasswordLoading ? (
                        <>
                          <div className="loader_login relative top-[4px] left-[20px]"></div>
                        </>
                      ) : (
                        <>
                          {showNewPasswordFields !== true && (
                            <div className="flex justify-start items-center">
                              <button
                                disabled={profile.currentPassword === ""}
                                className={`ml-[32px] !bg-transparent bottom-[2px] hover:!bg-transparent flex justify-center cursor-pointer !text-[16px] items-center w-[100%] ${
                                  passwordVerificationError
                                    ? "!cursor-default !bottom-[12px]"
                                    : "text-[#350ABC] cursor-pointer"
                                }  !text-[#350ABC] !text-[16px] !font-[400] !leading-[31px] disabled:!text-gray-500 disabled:!cursor-not-allowed p-0 bg-transparent border-none`}
                                onClick={() => {
                                  verifyPassword(profile.currentPassword);
                                }}
                              >
                                <span className="cursor-pointer">
                                  {"Verify old password"}
                                </span>
                              </button>
                              <p
                                className="py-1 px-2 absolute top-2 right-2 hover:bg-[#d7cefc] text-[#5d0abc] rounded-[4px] text-[#161616] text-[14px] font-[400] cursor-pointer"
                                onClick={() => {
                                  setShowPasswordFields(false);
                                  setPasswordVerificationError("");
                                  handleInputChange("currentPassword", "");
                                }}
                              >
                                <RxCross2 size={20} />
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* New Password Section */}
                {showNewPasswordFields && (
                  <div>
                    <label className="text-[#2C2240] text-[16px] font-[500] leading-normal">
                      New Password
                    </label>
                    <div className="relative w-[240px]">
                      <input
                        style={{ ...loginInputStyles }}
                        type={showNewPassword ? "text" : "password"} // Toggle type between text and password
                        value={password}
                        onChange={handlePasswordChange}
                        className={`defaultsearch mt-[7px] shadow-lg pb-[20px] pt-[20px] pl-[12px] min-h-[52px] w-full focus:outline-blue-200`}
                        placeholder="Password*"
                      />
                      <div
                        className="absolute inset-y-0 right-3 top-[6px] flex items-center cursor-pointer"
                        onClick={() => setShowNewPassword(!showNewPassword)} // Toggle show/hide for New Password
                      >
                        {showNewPassword ? (
                          <BiHide color="#9F9F9F" size={18} />
                        ) : (
                          <BiShow color="#9F9F9F" size={18} />
                        )}
                      </div>
                    </div>

                    {passwordError ===
                      "Password must include lowercase, uppercase, number, and special character." && (
                      <ul className="text-[12px] font-[400] w-[120%] leading-[31px] mt-[10px]">
                        <li
                          className={`password-check flex justify-start items-center ${
                            /[a-z]/.test(password)
                              ? "text-green-500"
                              : "text-[#C20000]"
                          }`}
                        >
                          {/[a-z]/.test(password) ? (
                            <span className="mr-1 text-green-500">
                              <MdOutlineDone />
                            </span>
                          ) : (
                            <span className="mr-1 text-[#C20000]">
                              <RxCross2 />
                            </span>
                          )}
                          Must include a lowercase letter
                        </li>
                        <li
                          className={`password-check flex justify-start items-center ${
                            /[A-Z]/.test(password)
                              ? "text-green-500"
                              : "text-[#C20000]"
                          }`}
                        >
                          {/[A-Z]/.test(password) ? (
                            <span className="mr-1 text-green-500">
                              <MdOutlineDone />
                            </span>
                          ) : (
                            <span className="mr-1 text-[#C20000]">
                              <RxCross2 />
                            </span>
                          )}
                          Must include an uppercase letter
                        </li>
                        <li
                          className={`password-check flex justify-start items-center ${
                            /[0-9]/.test(password)
                              ? "text-green-500"
                              : "text-[#C20000]"
                          }`}
                        >
                          {/[0-9]/.test(password) ? (
                            <span className="mr-1 text-green-500">
                              <MdOutlineDone />
                            </span>
                          ) : (
                            <span className="mr-1 text-[#C20000]">
                              <RxCross2 />
                            </span>
                          )}
                          Must include a number
                        </li>
                        <li
                          className={`password-check flex justify-start items-center ${
                            /[!@#$%^&*(),.?":{}|<>]/.test(password)
                              ? "text-green-500"
                              : "text-[#C20000]"
                          }`}
                        >
                          {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? (
                            <span className="mr-1 text-green-500">
                              <MdOutlineDone />
                            </span>
                          ) : (
                            <span className="mr-1 text-[#C20000]">
                              <RxCross2 />
                            </span>
                          )}
                          Must include a special character
                        </li>
                      </ul>
                    )}
                  </div>
                )}

                {/* Confirm Password Section */}
                {showNewPasswordFields && (
                  <div>
                    <label className="text-[#2C2240] text-[16px] font-[500] leading-normal">
                      Confirm New Password
                    </label>
                    <div className="relative w-[239px]">
                      <input
                        style={{ ...loginInputStyles }}
                        type={showConfirmPassword ? "text" : "password"} // Toggle type between text and password
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={`defaultsearch shadow-lg mt-[7px] pb-[20px] w-full pt-[20px] pl-[12px] min-h-[52px] focus:outline-blue-200`}
                        placeholder="Confirm Password*"
                      />
                      <div
                        className="absolute inset-y-0 right-3 top-[6px] flex items-center cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        } // Toggle show/hide for Confirm Password
                      >
                        {showConfirmPassword ? (
                          <BiHide color="#9F9F9F" size={18} />
                        ) : (
                          <BiShow color="#9F9F9F" size={18} />
                        )}
                      </div>
                    </div>
                    {confirmPasswordError && (
                      <span className="text-[#C20000] text-[12px] font-[400]">
                        {confirmPasswordError}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-8">
            <p
              className="text-[#161616] text-[16px] font-[400] leading-[31px] cursor-pointer"
              onClick={() => {
                setShowPasswordFields(false); // Hide password fields
                setProfile(originalProfile); // Reset profile fields to original values
                setPassword(""); // Clear the password field
                setConfirmPassword(""); // Clear the confirm password field
                setErrors({}); // Clear any validation errors
                setPasswordError(""); // Clear password errors
                setConfirmPasswordError(""); // Clear confirm password errors
                setShowNewPasswordFields(false); // Hide new password fields if shown
                setPasswordVerificationError("");
              }}
            >
              Cancel
            </p>
            {isValid ? (
              <>
                <button
                  onClick={handleSubmit}
                  className={`text-[18px] cursor-pointer font-[400] py-[12px] flex items-center text-[#F3F0FF] px-[32px] rounded-[4px] transition-transform duration-150 ease-in-out transform active:scale-95  ${
                    isFormModified || isValid
                      ? "bg-[#774DFD]"
                      : "bg-[#ddd7fc] cursor-not-allowed"
                  }`}
                >
                  Update
                </button>
              </>
            ) : (
              <>
                {" "}
                <button
                  onClick={handleSubmit}
                  disabled={!isFormModified ? true : false} // Disable the button if form is not modified
                  className={`text-[18px] cursor-pointer font-[400] py-[12px] flex items-center text-[#F3F0FF] px-[32px] rounded-[4px] transition-transform duration-150 ease-in-out transform active:scale-95  ${
                    isFormModified || isValid
                      ? "bg-[#774DFD]"
                      : "bg-[#ddd7fc] cursor-not-allowed"
                  }`}
                >
                  Update
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
