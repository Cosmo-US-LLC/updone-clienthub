"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdMailOutline, MdCall, MdAttachMoney } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { HiOutlineCalendar } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { Skeleton } from "@/components/ui/skeleton";

const Page = ({ eventData, isLoading, formatDateAndTime }: any) => {
  console.log("mobile my events page", formatDateAndTime);
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center py-6 px-3 gap-4 w-full bg-[#F6F9FC]">
      {isLoading ? (
        [1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white w-full rounded-[12px] border-[2px] border-[#EBE6FF] p-4 animate-pulse"
          >
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="h-6 w-3/4 mb-2" />

            <div className="flex items-center gap-2">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Skeleton className="w-[36px] h-[36px] rounded-full" />
              <div className="flex flex-col w-full gap-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#F6F9FC] py-[10px] px-2 rounded-full mt-3">
              <Skeleton className="w-[20px] h-[20px] rounded-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="flex justify-around p-3 rounded-b-lg bg-[#EBE6FF] mt-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          </div>
        ))
      ) : eventData?.length > 0 ? (
        eventData?.map((event: any) => (
          <div className="bg-white w-full rounded-[12px] border-[2px] border-[#EBE6FF]">
            <div className=" px-3 py-4">
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-xs font-semibold px-3 py-2 rounded-full flex items-center gap-1 ${
                    event.event_status === "open"
                      ? "bg-blue-100 text-blue-600"
                      : event.event_status === "assigned"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {event.event_status.charAt(0).toUpperCase() +
                    event.event_status.slice(1)}
                </span>
                {event.event_status === "open" && (
                  <span className="flex flex-row items-center gap-1 text-[#350ABC] text-[14px] font-[400]">
                    <GoPerson className="text-lg text-[#350ABC]" />
                    {event.event_total_offers} offers
                  </span>
                )}
              </div>

              <h2 className="text-[18px] font-[500] text-[#161616]">
                {event.event_title}
              </h2>

              <div className=" flex items-center  gap-1 mt-2  ">
                <HiOutlineLocationMarker className="w-[24px] h-[24px] stroke-1 text-[#161616]" />
                <p className="text-[13px] font-[400]  text-[#161616] w-full">
                  {event.event_location}
                </p>
              </div>

              {/* Assigned User */}
              {event.event_assigned_to && client && (
                <div className="flex items-center justify-center gap-1 mt-3">
                  <Image
                    src={event.event_assigned_to.profile_pic}
                    alt={event.event_assigned_to.full_name}
                    width={40}
                    height={40}
                    className=" w-[36px] h-[36px] object-cover rounded-full border border-gray-300"
                  />
                  <div className="flex justify-between items-center w-full px-2 ">
                    <span className="font-[500] text-[16px] text-black flex items-center gap-1 ">
                      {event.event_assigned_to.full_name}
                      <div className="text-[#28a745] flex justify-center items-center cursor-pointer">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="hover:bg-transparent">
                              <div className=" text-white rounded">
                                <VerificationIconMobile
                                  id_is_verified={
                                    event?.event_assigned_to?.id_is_verified
                                  }
                                  contact_is_verified={
                                    event?.event_assigned_to
                                      ?.contact_is_verified
                                  }
                                  height={23}
                                  width={23}
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="z-40">
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
                    </span>
                    <span className="text-[#4C4B4B] font-[400] text-[14px]">
                      {event.event_required_service}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-1 bg-[#F6F9FC] py-[10px] px-2 rounded-full mt-3">
                <HiOutlineCalendar className="w-[20px] h-[20px] stroke-1 text-[#774DFD]" />

                <span className="text-[14px] font-[400] leading-[24px] pt-[1px]">
                  {formatDateAndTime(event.event_date_time)}
                </span>
              </div>
            </div>

            {event.event_status !== "open" && (
              <div
                className={`flex justify-around p-3  rounded-b-lg ${
                  event.event_status === "assigned"
                    ? "bg-[#774DFD] text-white"
                    : "bg-[#EBE6FF] text-[#161616]"
                }`}
              >
                {event.event_status === "assigned" && (
                  <>
                    <MdMailOutline className="text-xl cursor-pointer" />
                    <MdCall className="text-xl cursor-pointer" />
                  </>
                )}
                <MdAttachMoney className="text-xl cursor-pointer" />
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default Page;
