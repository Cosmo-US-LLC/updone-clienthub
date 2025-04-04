"use client";

import { useEffect, useState } from "react";
import { BsCalendarEvent } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { LiaGlassCheersSolid } from "react-icons/lia";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPhoneNumber } from "@/lib/utils";

const EventDetails = ({ jobData, releaseData }) => {
  const router = useRouter();
  const [status, setStatus] = useState(jobData?.status);
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);

      setTimeout(() => {
        setCopiedText("");
      }, 2000);
    });
  };

  const formatLocation = (location) => {
    // Check if "Los Angeles, California" is part of the location
    let formattedLocation = location.replace(
      "Los Angeles, California",
      "LA, California"
    );

    // Remove "United States" if it exists
    formattedLocation = formattedLocation.replace(", United States", "");

    // Split the location into the first part and the remaining location
    const firstCommaIndex = formattedLocation.indexOf(",");
    const firstPart = formattedLocation.substring(0, firstCommaIndex); // "1 World Way"
    const secondPart = formattedLocation.substring(firstCommaIndex + 1).trim(); // "LA, California 90045"

    return {
      firstPart: firstPart.trim(),
      secondPart: secondPart.trim(),
    };
  };

  useEffect(() => {
    setStatus(jobData?.status);
  }, [jobData]);

  return (
    <div
      className={`pb-1 px-2 mb-10 w-[calc(100vw-24px)] h-full bg-[#F6F9FC] flex flex-col`}
    >
      <div
        className={`flex items-end justify-between ${
          status === "completed" && "opacity-50 pointer-events-none"
        }`}
      >
        {/* <h2 className="text-[16px] font-[300] text-[#161616] leading-[0.7]">
          Event Details
        </h2> */}
        <span
          className={`flex items-center text-[14px] font-medium px-3 py-1 rounded-full capitalize ${
            status === "assigned"
              ? "text-[#0C9000] bg-green-100 border-[1px] border-[#0C9000]"
              : "text-[#0076E6] bg-[#E7F4FD] border-[1px] border-[#0076E6]"
          }`}
        >
          <FaCheck className="text-[14px] mr-1" /> {status}
        </span>
      </div>
      <h1
        className={`text-[22px] font-[400] text-[#161616] mt-2 first-letter:uppercase truncate ${
          status === "completed" && "opacity-50 pointer-events-none"
        }`}
      >
        {jobData?.title || ""}
      </h1>
      {/* {status} */}
      {(status == "assigned" || status == "completed") && (
        <div className="bg-white p-4 rounded-lg shadow-md my-3 border pointer-events-auto">
          <h3
            className={`text-gray-900 text-[16px] font-[600] mb-2 flex ${
              status === "completed" && "opacity-50 pointer-events-none"
            }`}
          >
            Hired Talent
          </h3>
          <div
            className={`flex items-center gap-3 ${
              status === "completed" && "opacity-50 pointer-events-none"
            }`}
          >
            <Avatar className="w-[62px] h-[62px]">
              <AvatarImage
                src={jobData?.invite?.worker?.profile_pic}
                className="object-cover"
                width={100}
                height={100}
              />
              <AvatarFallback>
                {jobData?.invite?.worker?.full_name[0]}
                {jobData?.invite?.worker?.full_name?.split(" ")?.length > 1 &&
                  jobData?.invite?.worker?.full_name?.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <p className="text-gray-900 text-[16px] font-[600]">
                {jobData?.invite?.worker?.full_name || "N/A"}
              </p>
              <div className="text-[#28a745] flex justify-center items-center cursor-pointer">
                {event?.event_assigned_to?.id_is_verified &&
                event?.event_assigned_to?.contact_is_verified ? (
                  <div className="absolute bottom-3 left-5 ml-1 text-[#28a745] flex justify-center items-center cursor-pointer">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="hover:bg-transparent">
                          <div className=" text-white pr-4 pl-2  rounded">
                            <VerificationIcon
                              id_is_verified={
                                event?.event_assigned_to?.id_is_verified
                              }
                              contact_is_verified={
                                event?.event_assigned_to?.contact_is_verified
                              }
                              height={23}
                              width={23}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <VerificationStatus
                            id_is_verified={
                              event?.event_assigned_to?.id_is_verified
                            }
                            contact_is_verified={
                              event?.event_assigned_to?.contact_is_verified
                            }
                          />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* <FaCheck className="text-green-500 text-md" title="Verified" /> */}
            </div>
          </div>

          <div
            className={`flex items-center justify-between mt-3 border-t pt-3 relative ${
              status === "completed" && "opacity-50 pointer-events-none"
              // true
            }`}
          >
            <div
              onClick={() => {
                const phoneNumber =
                  jobData?.invite?.worker?.user?.phone_number || "";
                if (phoneNumber) {
                  window.location.href = `tel:${phoneNumber}`;
                }
              }}
              className="flex justify-center items-center gap-[10px]"
            >
              <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#774DFD]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M14.6665 11.78V13.78C14.6672 13.9657 14.6292 14.1494 14.5548 14.3196C14.4804 14.4897 14.3713 14.6424 14.2345 14.7679C14.0977 14.8934 13.9362 14.989 13.7603 15.0485C13.5844 15.108 13.398 15.13 13.2131 15.1133C11.1617 14.8904 9.19112 14.1894 7.45979 13.0667C5.84901 12.0431 4.48335 10.6774 3.45979 9.06667C2.33311 7.32747 1.63195 5.34733 1.41313 3.28667C1.39647 3.10231 1.41838 2.91651 1.47746 2.74108C1.53654 2.56566 1.63151 2.40446 1.7563 2.26775C1.8811 2.13103 2.033 2.0218 2.20232 1.94701C2.37164 1.87222 2.55469 1.83351 2.73979 1.83333H4.73979C5.06333 1.83015 5.37699 1.94472 5.6223 2.15569C5.86761 2.36666 6.02784 2.65963 6.07313 2.98C6.15754 3.62004 6.31409 4.24848 6.53979 4.85333C6.62949 5.09195 6.6489 5.35127 6.59573 5.60059C6.54256 5.8499 6.41903 6.07874 6.23979 6.26L5.39313 7.10667C6.34216 8.7757 7.7241 10.1576 9.39313 11.1067L10.2398 10.26C10.4211 10.0808 10.6499 9.95723 10.8992 9.90406C11.1485 9.85089 11.4078 9.8703 11.6465 9.96C12.2513 10.1857 12.8797 10.3423 13.5198 10.4267C13.8436 10.4724 14.1394 10.6355 14.3508 10.885C14.5622 11.1345 14.6746 11.453 14.6665 11.78Z"
                    stroke="#FFFFFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-500 text-[14px] font-[400]">
                  Contact Number:
                </p>
                <p className="text-[#774DFD] text-[14px] font-[500]">
                  {formatPhoneNumber(
                    jobData?.invite?.worker?.user?.phone_number
                  ) || "N/A"}
                </p>
              </div>
            </div>
            <div className="relative flex items-center">
              <MdOutlineContentCopy
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                title="Copy"
                onClick={() =>
                  copyToClipboard(
                    formatPhoneNumber(
                      jobData?.invite?.worker?.user?.phone_number
                    )
                  )
                }
              />
              {copiedText === "987-345-8735" && (
                <span className="absolute -top-7 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                  Copied!
                </span>
              )}
            </div>
          </div>

          <div
            className={`flex items-center justify-between mt-3 border-t pt-3 relative ${
              status === "completed" && "opacity-50 pointer-events-none"
            }`}
          >
            <div className="flex justify-center items-center gap-[10px]">
              <Image
                src="/images/client-portal/event-details/email-filled.svg"
                alt="error"
                width={40}
                height={40}
              />
              <div className="flex flex-col">
                <p className="text-gray-500 text-[14px] font-[400]">
                  Email Address
                </p>
                <p className="text-[#774DFD] text-[14px] font-[600]">
                  {jobData?.invite?.worker?.user?.email || "N/A"}
                </p>
              </div>
            </div>
            <div className="relative flex items-center">
              <MdOutlineContentCopy
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                title="Copy"
                onClick={() =>
                  copyToClipboard(jobData?.invite?.worker?.user?.email)
                }
              />
              {copiedText === "williamjosop987@gmail.com" && (
                <span className="absolute -top-7 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                  Copied!
                </span>
              )}
            </div>
          </div>
          {status == "completed" && (
            <div className="w-full pt-4 border-t border-[#f4f4f4] mt-4">
              <div className="flex items-baseline gap-2 justify-center w-full pb-1">
                <span className="text-left text-sm font-[500]">
                  Total Amount:
                </span>
                <span className="text-left text-3xl font-semibold">
                  $
                  {releaseData?.includes_settlement === true
                    ? releaseData?.initial_payment +
                      releaseData?.additional_amount_requested
                    : releaseData?.initial_payment}
                </span>
              </div>
              <button
                disabled={releaseData?.release_status !== "release_requested"}
                onClick={() => {
                  if (releaseData?.release_status === "release_requested") {
                    router.push(
                      `/events/detail/${jobData?.id}/payment-request`
                    );
                  }
                }}
                className={`mx-auto z-[1] px-4 py-2 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none min-h-[42px] w-[200px] rounded-full ${
                  releaseData?.release_status === "release_requested"
                    ? "bg-[#350ABC]"
                    : "bg-[#350ABC] opacity-50"
                } `}
              >
                <p
                  className={`text-[14px] font-[400] ${
                    releaseData?.release_status === "release_approved"
                      ? "text-[white]"
                      : "text-[white]"
                  } `}
                >
                  {releaseData?.release_status === "release_approved"
                    ? "Payment Released"
                    : "Release Payment"}
                </p>
              </button>
              {releaseData?.release_status === "release_pending" && (
                <div className="mx-auto rounded-[8px] mt-3 p-2 bg-[#F9F7FF] w-[95%] min-h-[52px] flex flex-row items-center justify-start gap-4">
                  <img
                    src="/images/client-portal/event-details/exclamation.svg"
                    className="h-[16px] w-[16px]"
                    alt="info_1"
                  />
                  <p className="text-sm">
                    You can release payment once the Talent confirms the final
                    amount.
                  </p>
                </div>
              )}
              {releaseData?.release_status === "release_requested" &&
                releaseData?.includes_settlement === true && (
                  <div className="rounded-[8px] mt-4 p-2 bg-[#F9F7FF] w-[95%] min-h-[52px] flex flex-row items-center justify-start gap-4">
                    <img
                      src="/images/client-portal/event-details/exclamation.svg"
                      className="h-[16px] w-[16px]"
                      alt="info_1"
                    />
                    <p className="text-sm">
                      The Talent worked extra hours at your event.
                    </p>
                  </div>
                )}
            </div>
          )}
          {console.log(releaseData)}

          {status == "assigned" && (
            <div className="w-full flex justify-center pt-4">
              <Link
                href={`/events/detail/${jobData?.id}/chat`}
                className="flex gap-1 items-center px-4 py-2 rounded-full bg-[#350abc] text-white text-sm"
              >
                Chat Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* <h3 className="text-[16px] font-[500] text-gray-900 mt-4">
        Event Description
      </h3> */}
      <p
        className={`text-gray-600 text-[14px] font-[400] mt-2 ${
          status === "completed" && "opacity-50 pointer-events-none"
        }`}
      >
        {jobData?.description || ""}
      </p>

      <hr className="my-6 border-gray-200" />

      <div
        className={`space-y-4 flex flex-col ${
          status === "completed" && "opacity-50 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-5">
          <div className="p-2 bg-[#B4C4FF] rounded-md border-[1px] border-[#585EFF]">
            <LiaGlassCheersSolid className="text-[#585EFF] text-xl" />
          </div>
          <div>
            <p className="text-gray-900 text-[16px] font-[600]">
              Requested Service:
            </p>
            <p className="text-gray-600 text-[14px]">
              {jobData?.service_name || ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="p-2 bg-orange-100 rounded-md border-[1px] border-[#C46914]">
            <BsCalendarEvent className="text-[#C46914]  text-xl" />
          </div>
          <div>
            <p className="text-gray-900 text-[16px] font-[600]">
              Friday, 20 September, 2024
            </p>
            <p className="text-gray-600 text-[14px]">11:00 AM - 03:00 PM</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="p-2 bg-pink-100 rounded-md border-[1px] border-[#E229C7]">
            <HiOutlineLocationMarker className="text-[#E229C7] text-xl" />
          </div>
          <div>
            {jobData?.event_location && (
              <>
                <div className="text-gray-900 text-[16px] font-[600]">
                  {formatLocation(jobData?.event_location).firstPart}
                </div>

                <div className="text-gray-600 text-[14px]">
                  {formatLocation(jobData?.event_location).secondPart}
                </div>
              </>
            )}
            {/* <p className="text-gray-900 text-[16px] font-[600]">
              West Hollywood
            </p>
            <p className="text-gray-600 text-[14px]">Los Angeles, California</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
