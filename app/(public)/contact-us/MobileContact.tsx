"use client";

import React, { useState } from "react";
import Footer from "../../_components/ui/footer/page";
import { apiRequest } from "@/app/lib/services";
import Image from "next/image";
import "./index.css";
import { CiMail } from "react-icons/ci";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Define types for form data and errors
type FormData = {
  fullName: string;
  email: string;
  phone: string;
  help: string;
};

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  help?: string;
};

const MobileContact = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    help: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validate the form fields
  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.fullName) errors.fullName = "Full Name is required";
    if (!formData.email) errors.email = "Email Address is required";
    if (!formData.phone) errors.phone = "Phone Number is required";
    if (!formData.help) errors.help = "Please specify what help you need";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });

  //   const errors: FormErrors = { ...formErrors };

  //   switch (name) {
  //     case "fullName":
  //       if (value === "") {
  //         errors.fullName = "Full Name is required";
  //       } else if (value.length > 40) {
  //         errors.fullName = "Full Name should not exceed 40 characters";
  //       } else {
  //         delete errors.fullName;
  //       }
  //       break;

  //     case "email":
  //       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       if (value === "") {
  //         errors.email = "Email Address is required";
  //       } else if (!emailPattern.test(value)) {
  //         errors.email = "Please enter a valid email address";
  //       } else if (value.length > 40) {
  //         errors.email = "Email should not exceed 40 characters";
  //       } else {
  //         delete errors.email;
  //       }
  //       break;

  //     case "phone":
  //       const phonePattern = /^[0-9]+$/;
  //       if (value === "") {
  //         errors.phone = "Phone Number is required";
  //       } else if (!phonePattern.test(value)) {
  //         errors.phone = "Phone Number should only contain numbers";
  //       } else {
  //         delete errors.phone;
  //       }
  //       break;

  //     case "help":
  //       if (value === "") {
  //         errors.help = "Please specify what help you need";
  //       } else if (value.length < 20) {
  //         errors.help = "Message should be at least 20 characters long";
  //       } else if (value.length > 200) {
  //         errors.help = "Message should not exceed 200 characters";
  //       } else {
  //         delete errors.help;
  //       }
  //       break;

  //     default:
  //       break;
  //   }

  //   setFormErrors(errors);

  //   const isFormValid =
  //     Object.values(errors).length === 0 &&
  //     Object.values(formData).every((field) => field.trim() !== "");
  //   setIsButtonDisabled(!isFormValid);
  // };

  const handlePhoneChange = (phone: string) => {
    handleChange({ name: "phone", value: phone });
  };

  const handleChange = (
    e: any
  ) => {
    const { name, value } = "target" in e ? e.target : e;
    const errors: FormErrors = { ...formErrors };

    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "fullName":
        if (value === "") {
          errors.fullName = "Full Name is required";
        } else if (value.length > 40) {
          errors.fullName = "Full Name should not exceed 40 characters";
        } else {
          errors.fullName = "";
        }
        break;

      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === "") {
          errors.email = "Email Address is required";
        } else if (!emailPattern.test(value)) {
          errors.email = "Please enter a valid email address";
        } else if (value.length > 40) {
          errors.email = "Email should not exceed 40 characters";
        } else {
          errors.email = "";
        }
        break;

      case "phone":
        const phonePattern = /^[0-9]+$/;
        if (value === "") {
          errors.phone = "Phone Number is required";
        } else {
          errors.phone = "";
        }
        break;

      case "help":
        if (value === "") {
          errors.help = "Please specify what help you need";
        } else if (value.length < 20) {
          errors.help = "Message should be at least 20 characters long";
        } else if (value.length > 200) {
          errors.help = "Message should not exceed 200 characters";
        } else {
          errors.help = "";
        }
        break;

      default:
        break;
    }

    setFormErrors(errors);

    const isFormValid =
      Object.values(errors).every((error) => error === "") &&
      Object.values(formData).every((field) => field !== "");
    setIsButtonDisabled(!isFormValid);
  };
  const contactUsApi = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setIsButtonDisabled(true);
      setSuccessMessage("");

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.help,
      };

      await apiRequest("/contactUs", {
        method: "POST",
        body: payload,
      });

      setSuccessMessage(
        "Thank you for contacting us! We will look into your request and get back to you shortly."
      );
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        help: "",
      });
    } catch (err) {
      console.error("Error submitting the contact form", err);
    } finally {
      setIsSubmitting(false);
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col pb-32">
        <Image
          src="/images/about/top-background.svg"
          alt="top-background"
          width={393}
          height={600}
          style={{ width: "100%" }}
          className="absolute z-[1] top-0 left-0 h-[94%] object-top"
        />
        <div className="relative text-center pt-[80px] z-10">
          <h1 className="text-[66px] font-extrabold uppercase text-gray-300  ">
            CONTACT
          </h1>
          <h2 className="text-[#0B0B0B] font-light text-[44px] leading-[56px] tracking-[-1.32px] font-poppins relative   top-[-40px]">
            Let’s Have a{" "}
            <span className="text-[#350ABC] font-light text-[44px] leading-[56px] tracking-[-1.32px] font-poppins">
              Chat
            </span>
          </h2>
          <div className="w-full px-2">
            <p className="text-[#6B6B6B] text-center font-normal text-[14px] leading-[24px] font-poppins px-2 relative   top-[-40px] max-w-[345px] w-[100%] mx-auto">
              Have questions or need assistance with your event staffing needs? Our team at Updone is here to help! Reach out to us, and we'll get back to you promptly. Let’s make your next event a success!
            </p>
          </div>
          <div className="flex justify-center items-center gap-6 w-full relative top-[-40px] mt-5">
            <div className="flex pt-[1.5rem] space-x-[50px] justify-between">
              <div className="flex items-center">
                <div className="space-y-[10px]">
                  <div className="flex items-center space-x-3">
                    <Image
                      className=""
                      alt="phone"
                      height={18}
                      width={18}
                      src="/images/contact/Vector.svg"
                    />
                    <p className="text-[16px] font-poppins leading-[100%] font-[600]">
                      Call Us Today!
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image
                      className=""
                      alt="usaFlag"
                      height={20}
                      width={12}
                      src="/images/contact/usaFlag.svg"
                    />
                    <p className="text-[11px] font-poppins leading-[100%] text-[#9F9F9F] font-[400]">
                      +1 (800) 651-0072
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="space-y-[10px] ">
                  <div className="flex items-center space-x-3">
                    <Image
                      className=""
                      alt="phone"
                      height={23}
                      width={20}
                      src="/images/contact/mail (1).svg"
                    />
                    <p className="text-[16px] font-poppins leading-[100%] font-[600]">
                      MAIL US
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-[11px] font-poppins leading-[100%] text-[#9F9F9F] font-[400]">
                      support@updone.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full z-10">
          <div className="relative w-full">
            <span className="absolute left-40 top-1/2 z-[-1] transform -translate-y-1/2 text-gray-500 hidden md:block">
              <Image
                className="relative right-[198px] bottom-[102px]"
                alt="cloud"
                height={73}
                width={158}
                src="/images/contact/cloud.svg"
              />

              <Image
                alt="smallCloud"
                className="relative right-[331px] bottom-[115px]"
                width={103}
                height={39}
                src="/images/contact/smallCloud.svg"
              />

              <Image
                alt="smallCloud"
                className="relative right-[188px] bottom-[133px]"
                width={188}
                height={232}
                src="/images/contact/leftPlane.svg"
              />
            </span>

            <form
              action=""
              className="space-y-6 p-4 relative bg-gradient-to-br from-[rgba(246,246,246,0.27)] to-[rgba(244,244,244,0.36)] border border-[#EBE5E5] backdrop-blur-[6px] shadow-md rounded-[8px] max-w-[90%] mx-auto md:max-w-[60%]"
            >
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M11.6668 12.25V11.0833C11.6668 10.4645 11.421 9.871 10.9834 9.43342C10.5458 8.99583 9.95233 8.75 9.3335 8.75H4.66683C4.04799 8.75 3.4545 8.99583 3.01691 9.43342C2.57933 9.871 2.3335 10.4645 2.3335 11.0833V12.25"
                      stroke="#9F9F9F"
                      strokeWidth="0.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.99984 6.41667C8.2885 6.41667 9.33317 5.372 9.33317 4.08333C9.33317 2.79467 8.2885 1.75 6.99984 1.75C5.71117 1.75 4.6665 2.79467 4.6665 4.08333C4.6665 5.372 5.71117 6.41667 6.99984 6.41667Z"
                      stroke="#9F9F9F"
                      strokeWidth="0.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  name="fullName"
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`bg-white border-[1px] h-[50px] text-black border-gray-300 py-[14px] pl-[40px] pr-[10px] w-full rounded-md focus:outline-blue-500 ${formErrors.fullName ? "border-red-500" : ""
                    }`}
                />
                {formErrors.fullName && (
                  <span className="text-red-500 text-sm">
                    {formErrors.fullName}
                  </span>
                )}
              </div>

              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-500">
                  <CiMail className="relative top-[2px]" />
                </span>
                <input
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white border-[1px] h-[50px] text-black border-gray-300 py-[14px] pl-[40px] pr-[10px] w-full rounded-md focus:outline-blue-500 ${formErrors.email ? "border-red-500" : ""
                    }`}
                />
                {formErrors.email && (
                  <span className="text-red-500 text-sm">
                    {formErrors.email}
                  </span>
                )}
              </div>

              {/* <div className="relative w-full">
                <span className="absolute left-3 top-1/2 z-10 transform -translate-y-1/2 text-gray-500">
                  <Image
                    alt="Phone Icon"
                    width={24}
                    height={14}
                    src="/images/contact/usaFlag.svg"
                  />
                </span>
                <input
                  name="phone"
                  placeholder="+1 (123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`bg-white border-[1px] h-[50px] text-black border-gray-300 py-[14px] pl-[40px] pr-[10px] w-full rounded-md focus:outline-blue-500 ${
                    formErrors.phone ? "border-red-500" : ""
                  }`}
                />
                {formErrors.phone && (
                  <span className="text-red-500 text-sm">
                    {formErrors.phone}
                  </span>
                )}
              </div> */}
              <div>
                <PhoneInput
                  className={`event_location bg-[#fff] defaultsearch !relative !border-[1px] !h-[52px] text-[#000000] border-[#EFEFEF]  pl-[12px] pr-[10px] min-h-[52px] !w-full rounded-[4px] input mb12 ${formErrors.phone ? "border-red-500" : ""
                    }`}
                  defaultCountry="us"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
                {formErrors.phone && (
                  <span className="text-red-500 text-sm">
                    {formErrors.phone}
                  </span>
                )}
              </div>

              <div className="relative w-full">
                <span className="absolute left-3 top-[20.8%] z-10 transform -translate-y-1/2 text-gray-500">
                  <HiOutlineBuildingOffice2 size={16} />
                </span>
                <textarea
                  name="help"
                  placeholder="What can we help you with*"
                  value={formData.help}
                  onChange={handleChange}
                  rows={4}
                  className={`bg-white border-[1px] text-black border-gray-300 py-[14px] pl-[40px] pr-[10px] w-full rounded-md focus:outline-blue-500 ${formErrors.help ? "border-red-500" : ""
                    }`}
                />
                {formErrors.help && (
                  <span className="text-red-500 text-sm">
                    {formErrors.help}
                  </span>
                )}
              </div>

              <div className="mt-[30px]">
                <button
                  type="button"
                  onClick={contactUsApi}
                  disabled={isButtonDisabled || isSubmitting}
                  className={`flex h-[48px] px-[20px] py-[16px] justify-center items-center gap-[12px] w-full rounded-[4px] text-white font-semibold ${isButtonDisabled || isSubmitting
                    ? "bg-[#350ABC] text-white cursor-not-allowed"
                    : "bg-[#350ABC] hover:bg-[#27097A]"
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Details"}
                </button>
              </div>

              {successMessage && (
                <p className="text-green-500 text-sm text-center mt-4">
                  {successMessage}
                </p>
              )}
            </form>

            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 z-[-1] text-gray-500 hidden md:block">
              <Image
                className="relative bottom-[52px] left-[387px]"
                width={423}
                height={328}
                src="/images/contact/rightPlane.svg"
                alt="rightPlane"
              />
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MobileContact;
