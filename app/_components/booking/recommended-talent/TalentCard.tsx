import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { montserrat } from "@/app/lib/Fonts";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store/store";
import GalleryModal from "../../ui/gallery";
import { Camera, Eye } from "lucide-react";
import VerificationIconMobile from "@/app/_components/ui/shield";
import Cookies from "js-cookie";

const TalentCard = ({
  talent,
  jobApiData,
  isSelected,
  onToggleSelect,
  setGalleryTalent,
  services = [],
  serviceName,
}: any) => {
  const jobCreateState = useSelector((state: RootState) => state.jobCreate);
  const [showModal, setShowModal] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const galleryImages =
    talent?.gallery?.length > 0 ? talent?.gallery : [talent.profile_pic];

  function calculateTotal(hourRate: string, amount: string) {
    const totalHours = parseFloat(amount);
    const parsedHourRate = parseFloat(hourRate);
    return parsedHourRate * totalHours;
  }

  // const logProfileView = async () => {
  //   try {
  //     await axiosCall
  //       .post(`/profile/view/${talent.id}`)
  //       .then(({ response }) => {
  //         console.log("Profile view logged successfully:", response?.data);
  //       })
  //       .catch((err) => {
  //         console.error(
  //           "Error logging profile view:",
  //           err?.message || "Something went wrong!"
  //         );
  //       });
  //   } catch (err) {
  //     console.error("Unexpected error logging profile view:", err);
  //   }
  // };

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

  return (
    <>
      {/* {showModal ? (
        <GalleryModal
          show={showModal}
          onClose={() => setShowModal(false)}
          images={galleryImages}
          talent={talent}
          isSelected={isSelected}
          onToggleSelect={onToggleSelect}
          jobApiData={jobApiData}
        />
      ) : (
      )} */}
      <div
        onClick={onToggleSelect}
        className={`shadow-sm ${
          talent.alreadyInvited === false && "cursor-pointer"
        } border border-1 w-full sm:w-full md:w-full lg:w-full min-h-[175px] rounded-2xl py-[12px] px-[12px] scrollable-container overflow-y-auto ${
          isSelected ? "bg-[#2C2240] border-[#2C2240]" : "bg-white"
        }`}
      >
        <div className="flex w-[100%] flex-row gap-6">
          {/* <>{console.log(talent)}</> */}
          <div className="flex flex-col items-center relative">
            <Image
              onClick={(event) => {
                event.stopPropagation();
                // logProfileView();
                // setShowModal(true);
                setGalleryTalent(talent);
                console.log("Show gallery");
              }}
              className="w-[80px] h-[104px] rounded-xl object-cover relative"
              // className="w-[74px] h-[74px] rounded-full object-cover relative border-4 border-[#EBE6FF]"
              src={
                talent.profile_pic
                  ? talent.profile_pic
                  : "/images/testiminial/testi3.jpg"
              }
              quality={100}
              // objectFit="fill"
              width={120}
              height={120}
              alt=""
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,..."
              priority={true}
            />
            {/* <div className="text-center w-[75px] py-0.5 relative bottom-[15px] bg-[#e6e0fa] text-[#350ABC] rounded-md">
          <span className="text-[16px] font-[400]">
            ${parseFloat(talent?.per_hours_rate).toFixed(0)}/hr
          </span>
        </div> */}
            <div className="absolute bottom-2 right-1 bg-black/40 text-white stroke-white px-1.5 py-px rounded-lg shadow text-[10px] w-fit h-fit flex items-center gap-1">
              {talent?.gallery?.length > 1
                ? "+" + (talent?.gallery?.length - 1)
                : ""}{" "}
              <Camera className="w-3 h-3 stroke-black/40 fill-white" />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex flex-col items-center w-full relative">
              <div className="text-center grid grid-cols-8 w-full gap-2 items-center font-bold text-lg mb-[10px]">
                <div className="flex justify-start col-span-6 items-center gap-2">
                  <h3
                    className={`truncate text-left inline-block whitespace-nowrap text-[20px] font-[600] capitalize ${
                      isSelected ? "text-white" : "text-[#2C2240]"
                    } pb-[1px] ${montserrat.className}`}
                  >
                    {talent?.full_name}
                  </h3>
                  {talent.id_is_verified && talent.contact_is_verified ? (
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
                              contact_is_verified={talent.contact_is_verified}
                              height={30}
                              width={30}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="z-40">
                          <VerificationStatus
                            id_is_verified={talent.id_is_verified}
                            contact_is_verified={talent.contact_is_verified}
                          />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={
                    "max-lg:hidden col-span-2 flex items-center justify-end font-[400] whitespace-nowrap text-sm text-neutral-600 " +
                    (isSelected ? "text-white" : "text-[#2C2240]")
                  }
                >
                  Last active{" "}
                  {talent?.last_active
                    ? `${timeAgo(talent?.last_active)}`
                    : "weeks ago"}
                </div>
                <div className="lg:hidden col-span-2 flex items-center justify-end">
                  <div className="relative bottom-[2px]">
                    <svg
                      className="w-4 h-4 text-[#F79809] me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <p
                    className={`ms-1 text-[14px] font-normal text-black ${
                      isSelected ? "text-white" : "text-[#2C2240]"
                    }`}
                  >
                    {parseFloat(talent?.rating).toFixed(1)}
                  </p>
                </div>
              </div>
              <div className="text-center flex justify-between w-full items-center font-bold text-lg mb-1">
                <div className="text-center text-[14px] font-normal text-[#989898] flex gap-2">
                  <Image
                    src={`/images/gallery/${
                      isSelected ? "location-white.svg" : "location.svg"
                    }`}
                    alt="location-svg"
                    width={16}
                    height={16}
                  />{" "}
                  <span
                    className={`flex justify-start items-center !text-[16px] !font-[400] ${
                      isSelected ? "text-white" : "text-[#00000080]"
                    } cursor-pointer`}
                  >
                    {talent?.city}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end">
                  <div className="max-lg:hidden relative bottom-[2px]">
                    <svg
                      className="w-4 h-4 text-[#F79809] me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <p
                    className={`max-lg:hidden ms-1 text-[14px] font-normal text-black ${
                      isSelected ? "text-white" : "text-[#2C2240]"
                    }`}
                  >
                    {parseFloat(talent?.rating).toFixed(1)}
                  </p>
                  <span
                    className={`lg:hidden text-[16px] font-[400] leading-[28px] ${
                      isSelected ? "text-white" : "text-[#6B6B6B]"
                    }`}
                  >
                    {talent?.total_jobs_count} Jobs
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 w-full">
              <div className="flex items-center ">
                {talent?.services?.length > 1 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        className={`max-lg:hidden leading-[24px] ${
                          isSelected ? "text-white hover:text-white" : "text-[#989898] hover:text-[#989898]"
                        } text-[14px] font-normal inline-flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-sm hover:bg-transparent`}
                      >
                        <span className="mr-2 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="20"
                            fill={isSelected ? "#ffffff" : "#2C2240"}
                            viewBox="0 0 256 256"
                          >
                            <path d="M213.93,213.94l-17.65,4.73-10.42-38.89a40.06,40.06,0,0,0,20.77-46.14c-12.6-47-38.78-88.22-39.89-89.95a8,8,0,0,0-8.68-3.45L136.2,45.71c0-8.25-.18-13.43-.21-14.08a8,8,0,0,0-6.05-7.39l-32-8a8,8,0,0,0-8.68,3.45c-1.11,1.73-27.29,42.93-39.89,90a40.06,40.06,0,0,0,20.77,46.14L59.72,194.67l-17.65-4.73a8,8,0,0,0-4.14,15.46l48,12.86a8.23,8.23,0,0,0,2.07.27,8,8,0,0,0,2.07-15.73l-14.9-4,10.42-38.89c.81.05,1.61.08,2.41.08a40.12,40.12,0,0,0,37-24.88c1.18,6.37,2.6,12.82,4.31,19.22A40.08,40.08,0,0,0,168,184c.8,0,1.6,0,2.41-.08l10.42,38.89-14.9,4A8,8,0,0,0,168,242.53a8.23,8.23,0,0,0,2.07-.27l48-12.86a8,8,0,0,0-4.14-15.46ZM156.22,57.19c2.78,4.7,7.23,12.54,12.2,22.46L136,87.77c-.42-10-.38-18.25-.25-23.79,0-.56.05-1.12.08-1.68Zm-56.44-24,20.37,5.09c.06,4.28,0,10.67-.21,18.47-.06,1.21-.16,3.19-.23,5.84,0,1-.1,2-.16,3L86.69,57.43C92,46.67,96.84,38.16,99.78,33.19Zm11.39,93.09a24,24,0,0,1-46.34-12.5,291.26,291.26,0,0,1,15-41.59l38.58,9.64A314,314,0,0,1,111.17,126.28Zm33.64,23.92A274,274,0,0,1,137,104l38.41-9.6a293.06,293.06,0,0,1,15.75,43.39,24,24,0,1,1-46.36,12.42Zm40-106.62a8,8,0,0,1,3.58-10.74l16-8a8,8,0,1,1,7.16,14.32l-16,8a8,8,0,0,1-10.74-3.58ZM232,72a8,8,0,0,1-8,8H208a8,8,0,0,1,0-16h16A8,8,0,0,1,232,72ZM32.84,20.42a8,8,0,0,1,10.74-3.58l16,8a8,8,0,0,1-7.16,14.32l-16-8A8,8,0,0,1,32.84,20.42ZM40,72H24a8,8,0,0,1,0-16H40a8,8,0,0,1,0,16Z"></path>
                          </svg>
                        </span>
                        {/* Last job was on {talent?.last_job} */}
                        <span
                          className={`${
                            isSelected ? "text-white" : "text-[#6B6B6B]"
                          }`}
                        >
                          {serviceName}
                        </span>
                        , +{talent?.services?.length - 1} more
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>
                          <strong>Other Services:</strong>
                          <ul className="list-disc list-inside">
                            {talent?.services?.map(
                              (service: any, id: any) =>
                                serviceName != services[service - 1] && (
                                  <li key={id}>{services[service - 1]}</li>
                                )
                            )}
                          </ul>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p
                    className={`max-lg:hidden leading-[24px] ${
                      isSelected ? "text-white" : "text-[#989898]"
                    } text-[14px] font-normal inline-flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-sm`}
                  >
                    <span className="mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="20"
                        fill={isSelected ? "#ffffff" : "#2C2240"}
                        viewBox="0 0 256 256"
                      >
                        <path d="M213.93,213.94l-17.65,4.73-10.42-38.89a40.06,40.06,0,0,0,20.77-46.14c-12.6-47-38.78-88.22-39.89-89.95a8,8,0,0,0-8.68-3.45L136.2,45.71c0-8.25-.18-13.43-.21-14.08a8,8,0,0,0-6.05-7.39l-32-8a8,8,0,0,0-8.68,3.45c-1.11,1.73-27.29,42.93-39.89,90a40.06,40.06,0,0,0,20.77,46.14L59.72,194.67l-17.65-4.73a8,8,0,0,0-4.14,15.46l48,12.86a8.23,8.23,0,0,0,2.07.27,8,8,0,0,0,2.07-15.73l-14.9-4,10.42-38.89c.81.05,1.61.08,2.41.08a40.12,40.12,0,0,0,37-24.88c1.18,6.37,2.6,12.82,4.31,19.22A40.08,40.08,0,0,0,168,184c.8,0,1.6,0,2.41-.08l10.42,38.89-14.9,4A8,8,0,0,0,168,242.53a8.23,8.23,0,0,0,2.07-.27l48-12.86a8,8,0,0,0-4.14-15.46ZM156.22,57.19c2.78,4.7,7.23,12.54,12.2,22.46L136,87.77c-.42-10-.38-18.25-.25-23.79,0-.56.05-1.12.08-1.68Zm-56.44-24,20.37,5.09c.06,4.28,0,10.67-.21,18.47-.06,1.21-.16,3.19-.23,5.84,0,1-.1,2-.16,3L86.69,57.43C92,46.67,96.84,38.16,99.78,33.19Zm11.39,93.09a24,24,0,0,1-46.34-12.5,291.26,291.26,0,0,1,15-41.59l38.58,9.64A314,314,0,0,1,111.17,126.28Zm33.64,23.92A274,274,0,0,1,137,104l38.41-9.6a293.06,293.06,0,0,1,15.75,43.39,24,24,0,1,1-46.36,12.42Zm40-106.62a8,8,0,0,1,3.58-10.74l16-8a8,8,0,1,1,7.16,14.32l-16,8a8,8,0,0,1-10.74-3.58ZM232,72a8,8,0,0,1-8,8H208a8,8,0,0,1,0-16h16A8,8,0,0,1,232,72ZM32.84,20.42a8,8,0,0,1,10.74-3.58l16,8a8,8,0,0,1-7.16,14.32l-16-8A8,8,0,0,1,32.84,20.42ZM40,72H24a8,8,0,0,1,0-16H40a8,8,0,0,1,0,16Z"></path>
                      </svg>
                    </span>
                    <span
                      className={`${
                        isSelected ? "text-white" : "text-[#6B6B6B]"
                      }`}
                    >
                      {serviceName}
                    </span>
                  </p>
                )}
                {/* <p
                  className={`max-lg:hidden leading-[24px] ${
                    isSelected ? "text-white" : "text-[#989898]"
                  } text-[14px] font-normal inline-flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-sm`}
                >
                  <span className="mr-2 flex-shrink-0">
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
                          stroke={isSelected ? "#ffffff" : "#2C2240"} // Conditionally set stroke color
                          strokeWidth="1.08333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.66658 11.375V2.70833C8.66658 2.42102 8.55245 2.14547 8.34928 1.9423C8.14612 1.73914 7.87057 1.625 7.58325 1.625H5.41659C5.12927 1.625 4.85372 1.73914 4.65055 1.9423C4.44739 2.14547 4.33325 2.42102 4.33325 2.70833V11.375"
                          stroke={isSelected ? "#ffffff" : "#2C2240"} // Conditionally set stroke color
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
                  </span>
                  Last job was on {talent?.last_job}
                </p> */}
                <p
                  className={`lg:hidden leading-[24px] ${
                    isSelected ? "text-white" : "text-[#989898]"
                  } text-[14px] font-normal inline-flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-sm`}
                >
                  <span className="mr-2 flex-shrink-0">
                    <Eye
                      className={`w-4 h-4 text ${
                        isSelected ? "text-white" : "text-[#2C2240]"
                      }`}
                    />
                  </span>
                  Last active{" "}
                  {talent?.last_active
                    ? `${timeAgo(talent?.last_active)}`
                    : "weeks ago"}
                </p>
              </div>
              <span
                className={`max-lg:hidden text-[16px] font-[400] leading-[28px] ${
                  isSelected ? "text-white" : "text-[#6B6B6B]"
                }`}
              >
                {talent?.total_jobs_count} Jobs
              </span>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* <div
      className={`border-t ${
        isSelected ? "border-[#3b2e55]" : "border-gray-300"
      }  mt-4`}
    /> */}
        <div
          className={`flex justify-around items-center relative w-full mt-4`}
        >
          <div className={`flex justify-between w-full items-center`}>
            <div className="flex items-center gap-6">
              <div className="text-center w-[80px] bg-[#e6e0fa] text-[#350ABC] rounded-md py-0.5">
                <span className="text-[16px] font-[400]">
                  ${parseFloat(talent?.per_hours_rate).toFixed(0)}/hr
                </span>
              </div>
              <div
                className={`${
                  isSelected ? "text-white" : "text-black"
                } font-[500] text-[20px]`}
              >
                {/* <>{console.log(jobApiData)}</> */}$
                {calculateTotal(
                  talent?.per_hours_rate,
                  jobApiData
                    ? jobApiData?.total_hours
                    : Cookies.get("event_hours")?.split(" ")[0]
                )}{" "}
                <span
                  className={`!text-[12px] !leading-[14.63px] ${
                    isSelected ? "text-white" : "text-black"
                  }`}
                >
                  Total.
                </span>
              </div>
            </div>
            <div
              className={`${
                isSelected ? "text-white" : "text-black"
              } font-medium text-[14px] flex flex-row items-center gap-2`}
            >
              {talent.alreadyInvited === true
                ? "Already invited"
                : "Select Talent"}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`checkbox-${talent.id}`} // Unique ID for linking the label
                  className="hidden" // Hide the original checkbox
                  checked={isSelected || talent?.alreadyInvited}
                  onChange={onToggleSelect}
                  disabled={talent?.alreadyInvited}
                />
                <label
                  htmlFor={`checkbox-${talent.id}`} // Bind label to the input
                  className={`h-[24px] w-[24px] border-[1px] rounded-full flex items-center justify-center cursor-pointer
              ${
                isSelected || talent?.alreadyInvited
                  ? "bg-white border-white"
                  : "border-black"
              }`}
                >
                  {(isSelected || talent?.alreadyInvited) && (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="#2C2240"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TalentCard;
