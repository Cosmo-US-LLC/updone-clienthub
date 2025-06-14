import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Cookies from "js-cookie";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VerificationStatus } from "../verified-status-check-tooltip";
import VerificationIconMobile from "../shield";
import { useDispatch } from "react-redux";
import { setOffersId } from "@/app/lib/store/features/bookingSlice";
import { useRouter } from "next/navigation";

const services = [
  "Bartender",
  "Waiter",
  "Cocktail Server",
  "Promo Model",
  "Event Helper",
  "Barback",
];

function GalleryContent({
  images,
  talent,
  isSelected,
  onToggleSelect,
  jobApiData,
  onClose,
  showButton = true,
  addButton = false,
  showTotalPrice = false,
  showHirePrice = false,
  inviteId,
  jobData,
  talentData,
  serviceName = "",
}: any) {
  // console.log("talent32323222", talent);
  // console.log("showButton", showButton, addButton, showTotalPrice, jobData);
  const dispatch = useDispatch();
  const router = useRouter();
  const parsedImages = typeof images === "string" ? JSON.parse(images) : images;

  const payPayment = (invite_id: any) => {
    dispatch(setOffersId(invite_id));
    router.push(`/events/payment/${invite_id}`);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === parsedImages.length - 1 ? 0 : prevIndex + 1
    );
    setLoading(true);
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? parsedImages.length - 1 : prevIndex - 1
    );
    setLoading(true);
  };

  function timeAgo(dateTimeString: string) {
    const inputDate: any = new Date(dateTimeString);
    const now: any = new Date();
    const diffMs = now - inputDate;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Handle "Just now" for 0 seconds
    if (seconds < 60) {
      return "Just now";
    }
    // Handle "1 minute ago" and more than 1 minute
    else if (minutes === 1) {
      return "1 minute ago";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    // Handle "1 hour ago" and more than 1 hour
    else if (hours === 1) {
      return "1 hour ago";
    } else if (hours < 24) {
      return `${hours} hours ago`;
    }
    // Handle days
    else if (days === 1) {
      return "1 day ago";
    } else if (days < 7) {
      return `${days} days ago`;
    }
    // Handle weeks
    else if (days === 7) {
      return "1 week ago"; // Exactly 1 week
    } else if (days === 14) {
      return "2 weeks ago"; // Exactly 2 weeks
    } else {
      return "weeks ago"; // After 2 weeks, show just "weeks ago"
    }
  }

  function calculateTotal(hourRate: string, amount: string) {
    const totalHours = parseFloat(amount);
    const parsedHourRate = parseFloat(hourRate);
    return parsedHourRate * totalHours;
  }
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 bg-white rounded-none sm:rounded-xl !z-[99999999999]">
        <div className="w-full md:w-[59%] bg-black rounded-none sm:rounded-tl-xl overflow-hidden">
          <div className="relative w-full bg-black pt-0 sm:pt-3 overflow-hidden rounded-none sm:rounded-xl min-h-[300px]">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={parsedImages[selectedIndex]}
              alt={`Image ${selectedIndex}`}
              onClick={(e) => e.stopPropagation()}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
              className="w-full h-auto max-h-[60vh] md:max-h-[65vh] object-contain mx-auto"
            />

            {parsedImages.length > 1 && (
              <button
                onClick={(e) => {
                  handlePrev();
                  e.stopPropagation();
                }}
                className="absolute left-2 xl:left-4 top-1/2 p-2 -translate-y-1/2 bg-[#e6e0fa] text-[#350ABC] rounded-full shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  className="transform scale-x-[-1]"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M7.55 3.36c-.8-.8-.7-2.1.1-2.8.8-.7 2-.7 2.7 0l14 14c.8.8.8 2 0 2.8l-14 14c-.8.8-2 .8-2.8.1-.8-.8-.8-2-.1-2.8l.1-.1 12.6-12.5-12.6-12.7z"></path>
                </svg>
              </button>
            )}

            {parsedImages.length > 1 && (
              <button
                onClick={(e) => {
                  handleNext();
                  e.stopPropagation();
                }}
                className="absolute right-2 xl:right-4 top-1/2 p-2 -translate-y-1/2 bg-[#e6e0fa] text-[#350ABC] rounded-full shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  className="d779d0ec"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M7.55 3.36c-.8-.8-.7-2.1.1-2.8.8-.7 2-.7 2.7 0l14 14c.8.8.8 2 0 2.8l-14 14c-.8.8-2 .8-2.8.1-.8-.8-.8-2-.1-2.8l.1-.1 12.6-12.5-12.6-12.7z"></path>
                </svg>
              </button>
            )}

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 block sm:hidden flex justify-center gap-2">
              {parsedImages?.map((img: any, index: any) => (
                <img
                  key={index}
                  src={img}
                  onClick={(e) => {
                    if (parsedImages.length === 1 || selectedIndex === index)
                      return;
                    e.stopPropagation();
                    setSelectedIndex(index);
                    setLoading(true);
                    e.stopPropagation();
                    setSelectedIndex(index);
                    setLoading(true);
                  }}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition ${
                    selectedIndex === index
                      ? "border-[#350ABC] opacity-100"
                      : "border-transparent opacity-100 hover:opacity-100"
                  }`}
                  alt={`Thumbnail ${index}`}
                />
              ))}
            </div>
            <button
              onClick={(e) => {
                onClose();
                e.stopPropagation();
              }}
              className="absolute top-2 right-2 text-white rounded-md sm:hidden block"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex justify-center gap-2 flex-wrap p-2">
            {parsedImages?.map((img: any, index: any) => (
              <img
                key={index}
                src={img}
                onClick={(e) => {
                  if (parsedImages.length === 1 || selectedIndex === index)
                    return;
                  e.stopPropagation();
                  setSelectedIndex(index);
                  setLoading(true);
                  e.stopPropagation();
                  setSelectedIndex(index);
                  setLoading(true);
                }}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition ${
                  selectedIndex === index
                    ? "border-[#350ABC] opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                alt={`Thumbnail ${index}`}
              />
            ))}
          </div>
        </div>

        <div
          className="w-full md:w-[41%] flex flex-col pt-1 px-4 sm:px-0 md:pt-12 pr-4 sm:pr-7"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-4 border-0 border-gray-200 pb-0 lg:pb-4 xl:pb-6">
            <div className="flex flex-col sm:flex-row md:flex-col justify-between">
              <div className="flex items-center">
                <h2 className="text-lg md:text-2xl font-bold">
                  {talent?.full_name || talent?.worker?.full_name || "John Doe"}
                </h2>
                {talent?.id_is_verified && talent?.contact_is_verified ? (
                  <TooltipProvider>
                    <Tooltip open={isTooltipOpen}>
                      <TooltipTrigger
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsTooltipOpen(!isTooltipOpen);
                        }}
                      >
                        <div className=" text-white rounded w-[30px]">
                          <VerificationIconMobile
                            id_is_verified={talent.id_is_verified}
                            contact_is_verified={talent?.contact_is_verified}
                            height={30}
                            width={30}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="z-40">
                        <VerificationStatus
                          id_is_verified={talent.id_is_verified}
                          contact_is_verified={talent?.contact_is_verified}
                        />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  ""
                )}
              </div>
              <div className="text-[14px] sm:text-[15px] text-gray-700 mt-1">
                Last active{" "}
                {talent?.last_active ||
                talent?.user?.last_active ||
                talent?.worker?.user?.last_active ||
                talent?.worker?.last_active
                  ? timeAgo(
                      talent?.last_active ||
                        talent?.user?.last_active ||
                        talent?.worker?.user?.last_active ||
                        talent?.worker?.last_active
                    )
                  : "weeks ago"}
              </div>
            </div>

            <div className="sm:hidden">
              <Accordion type="single" collapsible>
                <AccordionItem
                  value="more-info"
                  className="faq-item shadow rounded-[4px]"
                >
                  <AccordionTrigger className="outline-none rounded-t-[4px] hover:no-underline cursor-pointer text-[#000] group data-[state=open]:m-0 data-[state=open]:bg-[#000] data-[state=open]:text-[#fff] !py-2 data-[state=open]:!py-3">
                    <h3 className="text-left text-sm px-4 w-[100%] max-w-[257px] font-[400]">
                      More Info
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 mt-4 px-3">
                      <div className="flex flex-wrap sm:flex-nowrap justify-between">
                        <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                          <Image
                            src="/images/gallery/location.svg"
                            alt="location.svg"
                            width={16}
                            height={16}
                          />
                          <p>Location:</p>
                        </div>
                        <div className="flex items-center text-[14px] sm:text-[18px] font-semibold">
                          <span>{talent?.city || talent?.worker?.city}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap sm:flex-nowrap justify-between">
                        <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                          <div className="relative bottom-[1.5px]">
                            <svg
                              className="w-4 h-4 text-[#000]"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              stroke="currentColor"
                              fill="#fff"
                              viewBox="0 0 22 20"
                              strokeWidth="1.75"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          </div>
                          <p>Reviews:</p>
                        </div>
                        <div className="flex items-center">
                          <p className="text-[14px] sm:text-[18px] font-semibold">
                            {parseFloat(
                              talent?.rating || talent?.worker?.rating
                            ).toFixed(1)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                          <div>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 13 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_464_1076)">
                                <path
                                  d="M10.8333 3.79163H2.16659C1.56828 3.79163 1.08325 4.27665 1.08325 4.87496V10.2916C1.08325 10.8899 1.56828 11.375 2.16659 11.375H10.8333C11.4316 11.375 11.9166 10.8899 11.9166 10.2916V4.87496C11.9166 4.27665 11.4316 3.79163 10.8333 3.79163Z"
                                  stroke="#000"
                                  strokeWidth="1.08333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8.66658 11.375V2.70833C8.66658 2.42102 8.55245 2.14547 8.34928 1.9423C8.14612 1.73914 7.87057 1.625 7.58325 1.625H5.41659C5.12927 1.625 4.85372 1.73914 4.65055 1.9423C4.44739 2.14547 4.33325 2.42102 4.33325 2.70833V11.375"
                                  stroke="#000"
                                  strokeWidth="1.08333"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_464_1076">
                                  <rect width="13" height="13" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <p>Last Job:</p>
                        </div>
                        <p className="text-[14px] sm:text-[18px] font-semibold">
                          {talent?.last_job || talent?.worker?.last_job}
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-between">
                        <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-[#000]"
                              fill="#000000"
                              stroke="currentColor"
                              viewBox="0 0 256 256"
                            >
                              <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-38.34-85.66a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L116,164.69l42.34-42.35A8,8,0,0,1,169.66,122.34Z" />
                            </svg>
                          </div>
                          <p>Total Jobs:</p>
                        </div>
                        <p className="text-[14px] sm:text-[18px] font-semibold">
                          {talent?.total_jobs_count ||
                            talent?.worker?.total_jobs_count}{" "}
                          Jobs
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-between items-center ">
                        <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-[#000]"
                              fill="#000000"
                              viewBox="0 0 256 256"
                            >
                              <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                            </svg>
                          </div>
                          {(!showButton && !addButton && !showTotalPrice) ||
                          addButton ? (
                            <p>Offered Rate:</p>
                          ) : (
                            <p>Rate per hour:</p>
                          )}
                        </div>
                        {(!showButton && !addButton && !showTotalPrice) || addButton ? (
                          <div className="text-[14px] sm:text-[18px] font-semibold">
                            $
                            {parseFloat(
                              talentData
                                ? (talentData?.invite?.offered_price || talentData?.offered_price)
                                : talent?.per_hours_rate ||
                                    talent?.offered_price || talentData?.offered_price
                            ).toFixed(0)}
                          </div>
                        ) : (
                          <div className="text-[14px] sm:text-[18px] font-semibold">
                            ${parseFloat(talent?.per_hours_rate).toFixed(0)}
                          </div>
                        )}
                      </div>

                      <hr />

                      <div className="flex flex-col items-start">
                        <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="#000000"
                              viewBox="0 0 256 256"
                            >
                              <path d="M213.93,213.94l-17.65,4.73-10.42-38.89a40.06,40.06,0,0,0,20.77-46.14c-12.6-47-38.78-88.22-39.89-89.95a8,8,0,0,0-8.68-3.45L136.2,45.71c0-8.25-.18-13.43-.21-14.08a8,8,0,0,0-6.05-7.39l-32-8a8,8,0,0,0-8.68,3.45c-1.11,1.73-27.29,42.93-39.89,90a40.06,40.06,0,0,0,20.77,46.14L59.72,194.67l-17.65-4.73a8,8,0,0,0-4.14,15.46l48,12.86a8.23,8.23,0,0,0,2.07.27,8,8,0,0,0,2.07-15.73l-14.9-4,10.42-38.89c.81.05,1.61.08,2.41.08a40.12,40.12,0,0,0,37-24.88c1.18,6.37,2.6,12.82,4.31,19.22A40.08,40.08,0,0,0,168,184c.8,0,1.6,0,2.41-.08l10.42,38.89-14.9,4A8,8,0,0,0,168,242.53a8.23,8.23,0,0,0,2.07-.27l48-12.86a8,8,0,0,0-4.14-15.46ZM156.22,57.19c2.78,4.7,7.23,12.54,12.2,22.46L136,87.77c-.42-10-.38-18.25-.25-23.79,0-.56.05-1.12.08-1.68Zm-56.44-24,20.37,5.09c.06,4.28,0,10.67-.21,18.47-.06,1.21-.16,3.19-.23,5.84,0,1-.1,2-.16,3L86.69,57.43C92,46.67,96.84,38.16,99.78,33.19Zm11.39,93.09a24,24,0,0,1-46.34-12.5,291.26,291.26,0,0,1,15-41.59l38.58,9.64A314,314,0,0,1,111.17,126.28Zm33.64,23.92A274,274,0,0,1,137,104l38.41-9.6a293.06,293.06,0,0,1,15.75,43.39,24,24,0,1,1-46.36,12.42Zm40-106.62a8,8,0,0,1,3.58-10.74l16-8a8,8,0,1,1,7.16,14.32l-16,8a8,8,0,0,1-10.74-3.58ZM232,72a8,8,0,0,1-8,8H208a8,8,0,0,1,0-16h16A8,8,0,0,1,232,72ZM32.84,20.42a8,8,0,0,1,10.74-3.58l16,8a8,8,0,0,1-7.16,14.32l-16-8A8,8,0,0,1,32.84,20.42ZM40,72H24a8,8,0,0,1,0-16H40a8,8,0,0,1,0,16Z"></path>
                            </svg>
                          </div>
                          <p className="font-semibold pb-1">Services:</p>
                        </div>
                        <div className="text-[14px] sm:text-[18px] font-semibold flex gap-x-2 gap-y-1 flex-wrap">
                          <div className="px-2 border rounded-full bg-[#350abc] text-white">
                            {serviceName || jobApiData?.service_name}
                          </div>
                          {(talent?.services_provided || talent?.services)?.map(
                            (service: any, id: any) =>
                              (serviceName || jobApiData?.service_name) != services[service - 1] && (
                                <div
                                  key={id}
                                  className="px-2 rounded-full bg-[#350abc]/70 text-white font-normal"
                                >
                                  {services[service - 1]}
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="hidden sm:flex flex-wrap sm:flex-nowrap justify-between mt-0 sm:mt-5">
              <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                <Image
                  src="/images/gallery/location.svg"
                  alt="location.svg"
                  width={16}
                  height={16}
                />
                <p>Location:</p>
              </div>
              <div className="flex items-center text-[14px] sm:text-[18px] font-semibold">
                <span>{talent?.city || talent?.worker?.city}</span>
              </div>
            </div>

            <div className="hidden sm:flex flex-wrap sm:flex-nowrap justify-between mt-0 sm:mt-5">
              <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                <div className="relative bottom-[1.5px]">
                  <svg
                    className="w-4 h-4 text-[#000]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="#fff"
                    viewBox="0 0 22 20"
                    strokeWidth="1.75"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <p>Reviews:</p>
              </div>
              <div className="flex items-center">
                <p className="text-[14px] sm:text-[18px] font-semibold">
                  {parseFloat(talent?.rating || talent?.worker?.rating).toFixed(
                    1
                  )}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex flex-wrap justify-between mt-0 sm: mt-5">
              <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                <div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_464_1076)">
                      <path
                        d="M10.8333 3.79163H2.16659C1.56828 3.79163 1.08325 4.27665 1.08325 4.87496V10.2916C1.08325 10.8899 1.56828 11.375 2.16659 11.375H10.8333C11.4316 11.375 11.9166 10.8899 11.9166 10.2916V4.87496C11.9166 4.27665 11.4316 3.79163 10.8333 3.79163Z"
                        stroke="#000"
                        strokeWidth="1.08333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.66658 11.375V2.70833C8.66658 2.42102 8.55245 2.14547 8.34928 1.9423C8.14612 1.73914 7.87057 1.625 7.58325 1.625H5.41659C5.12927 1.625 4.85372 1.73914 4.65055 1.9423C4.44739 2.14547 4.33325 2.42102 4.33325 2.70833V11.375"
                        stroke="#000"
                        strokeWidth="1.08333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_464_1076">
                        <rect width="13" height="13" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p>Last Job:</p>
              </div>
              <p className="text-[14px] sm:text-[18px] font-semibold">
                {talent?.last_job || talent?.worker?.last_job}
              </p>
            </div>

            <div className="hidden sm:flex flex-wrap justify-between mt-0 sm:mt-5">
              <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-[#000]"
                    fill="#000000"
                    stroke="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-38.34-85.66a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L116,164.69l42.34-42.35A8,8,0,0,1,169.66,122.34Z" />
                  </svg>
                </div>
                <p>Total Jobs:</p>
              </div>
              <p className="text-[14px] sm:text-[18px] font-semibold">
                {talent?.total_jobs_count || talent?.worker?.total_jobs_count}{" "}
                Jobs
              </p>
            </div>

            <div className="hidden sm:flex flex-wrap justify-between items-center mt-0 sm:mt-5">
              <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-[#000]"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path>
                  </svg>
                </div>
                {(!showButton && !addButton && !showTotalPrice) || addButton ? (
                  <p>Offered Rate:</p>
                ) : (
                  <p>Rate per hour:</p>
                )}
              </div>

              {(!showButton && !addButton && !showTotalPrice) || addButton ? (
                <div className="text-[14px] sm:text-[18px] font-semibold">
                  $
                  {parseFloat(
                    talentData?.offered_price || 
                    talent?.per_hours_rate ||
                      talent?.offered_price ||
                      talent?.worker?.offered_price
                  ).toFixed(0)}
                </div>
              ) : (
                <div className="text-[14px] sm:text-[18px] font-semibold">
                  $
                  {parseFloat(
                    talentData?.offered_price || talent?.per_hours_rate || talent?.worker?.per_hours_rate
                  ).toFixed(0)}
                </div>
              )}
            </div>
          </div>

          <hr className="mb-3" />

          <div className="hidden sm:flex flex-col items-start">
            <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-2 pb-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M213.93,213.94l-17.65,4.73-10.42-38.89a40.06,40.06,0,0,0,20.77-46.14c-12.6-47-38.78-88.22-39.89-89.95a8,8,0,0,0-8.68-3.45L136.2,45.71c0-8.25-.18-13.43-.21-14.08a8,8,0,0,0-6.05-7.39l-32-8a8,8,0,0,0-8.68,3.45c-1.11,1.73-27.29,42.93-39.89,90a40.06,40.06,0,0,0,20.77,46.14L59.72,194.67l-17.65-4.73a8,8,0,0,0-4.14,15.46l48,12.86a8.23,8.23,0,0,0,2.07.27,8,8,0,0,0,2.07-15.73l-14.9-4,10.42-38.89c.81.05,1.61.08,2.41.08a40.12,40.12,0,0,0,37-24.88c1.18,6.37,2.6,12.82,4.31,19.22A40.08,40.08,0,0,0,168,184c.8,0,1.6,0,2.41-.08l10.42,38.89-14.9,4A8,8,0,0,0,168,242.53a8.23,8.23,0,0,0,2.07-.27l48-12.86a8,8,0,0,0-4.14-15.46ZM156.22,57.19c2.78,4.7,7.23,12.54,12.2,22.46L136,87.77c-.42-10-.38-18.25-.25-23.79,0-.56.05-1.12.08-1.68Zm-56.44-24,20.37,5.09c.06,4.28,0,10.67-.21,18.47-.06,1.21-.16,3.19-.23,5.84,0,1-.1,2-.16,3L86.69,57.43C92,46.67,96.84,38.16,99.78,33.19Zm11.39,93.09a24,24,0,0,1-46.34-12.5,291.26,291.26,0,0,1,15-41.59l38.58,9.64A314,314,0,0,1,111.17,126.28Zm33.64,23.92A274,274,0,0,1,137,104l38.41-9.6a293.06,293.06,0,0,1,15.75,43.39,24,24,0,1,1-46.36,12.42Zm40-106.62a8,8,0,0,1,3.58-10.74l16-8a8,8,0,1,1,7.16,14.32l-16,8a8,8,0,0,1-10.74-3.58ZM232,72a8,8,0,0,1-8,8H208a8,8,0,0,1,0-16h16A8,8,0,0,1,232,72ZM32.84,20.42a8,8,0,0,1,10.74-3.58l16,8a8,8,0,0,1-7.16,14.32l-16-8A8,8,0,0,1,32.84,20.42ZM40,72H24a8,8,0,0,1,0-16H40a8,8,0,0,1,0,16Z"></path>
                </svg>
              </div>
              <p>Services:</p>
            </div>

            <div className="text-[14px] font-semibold flex gap-x-2 gap-y-1 flex-wrap">
              <div className="px-2 border rounded-full bg-[#350abc] text-white">
                {serviceName || jobApiData?.service_name}
              </div>
              {(talent?.services_provided || talent?.services)?.map(
                (service: any, id: any) =>
                  (serviceName || jobApiData?.service_name) !=
                    services[service - 1] && (
                    <div
                      key={id}
                      className="px-2 pt-px rounded-full bg-[#350abc]/70 text-white font-normal"
                    >
                      {services[service - 1]}
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between h-full w-full pb-0 xl:pb-8">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-2 mt-6 sm:mt-4">
              <div className="flex items-center text-[14px] sm:text-[15px] justify-center text-gray-700 gap-1">
                <p>Total:</p>
              </div>
              <div className="text-[14px] sm:text-[18px] font-semibold">
                $
                {(showButton == false && addButton === true) ||
                (showButton == false &&
                  showTotalPrice === true &&
                  showHirePrice === false) ||
                addButton == true
                  ? talentData
                    ? talentData?.total_price
                    : talent?.total_price || talent?.worker?.total_price
                  : jobApiData?.total_price
                  ? jobApiData?.total_price
                  : `${calculateTotal(
                      talent?.per_hours_rate || talent?.worker?.per_hours_rate,
                      jobApiData
                        ? jobApiData.total_hours
                        : Cookies.get("event_hours")?.split(" ")[0]
                    )}`}
              </div>
            </div>
            <div className="flex flex-col items-center">
              {showButton && !addButton && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelect();
                    onClose();
                  }}
                  disabled={talent?.alreadyInvited}
                  className="h-10 lg:h-12 xl:h-14 w-full lg:w-[70%] xl:w-[80%] rounded-none sm:rounded-full flex items-center justify-center gap-2 border transition-all duration-300 ease-in-out grow_ellipse active:scale-95 active:shadow-inner bg-[#350abc] text-white mb-4"
                >
                  {(isSelected || talent?.alreadyInvited) && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="#2C2240"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {talent.alreadyInvited ? "Already invited" : "Select Talent"}
                </button>
              )}

              {!showButton && addButton && jobData == "open" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelect();
                    onClose();
                    payPayment(inviteId);
                  }}
                  className="h-10 lg:h-12 xl:h-14 w-full lg:w-[70%] xl:w-[80%] rounded-none sm:rounded-full flex items-center justify-center gap-2 border transition-all duration-300 ease-in-out grow_ellipse active:scale-95 active:shadow-inner bg-[#350abc] text-white mb-4"
                >
                  Hire me for $
                  {(showButton == false && addButton === true) ||
                  (showButton == false &&
                    showTotalPrice === true &&
                    showHirePrice === false) ||
                  addButton == true
                    ? talentData
                      ? talentData?.total_price
                      : talent?.total_price || talent?.worker?.total_price
                    : jobApiData?.total_price
                    ? jobApiData?.total_price
                    : `${calculateTotal(
                        talent?.per_hours_rate ||
                          talent?.worker?.per_hours_rate,
                        jobApiData
                          ? jobApiData.total_hours
                          : Cookies.get("event_hours")?.split(" ")[0]
                      )}`}
                </button>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            onClose();
            e.stopPropagation();
          }}
          className="absolute top-4 right-4 z-[9999] rounded-md text-[#350ABC] hidden sm:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default GalleryContent;
