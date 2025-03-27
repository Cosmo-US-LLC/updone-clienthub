"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdMailOutline, MdCall, MdAttachMoney } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { HiOutlineCalendar } from "react-icons/hi";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FindATalent from "../../../ui/FindATalent";
import { Skeleton } from "@/components/ui/skeleton";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";

const Page = ({ eventData, isLoading }: any) => {
  // console.log("mobile my events page", formatDateAndTime);
  const router = useRouter();
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const formatDate = (event_date_time: any) => {
    const formattedResults: any = [];

    for (const date in event_date_time) {
      if (event_date_time.hasOwnProperty(date)) {
        const events = event_date_time[date];
        events.forEach((event: any) => {
          const startDate = new Date(`${date}T${event.start_time}`);
          const endDate = new Date(`${date}T${event.end_time}`);

          const dateOptions: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          const formattedDate = startDate.toLocaleDateString(
            "en-US",
            dateOptions
          );

          formattedResults.push(
            <span
              key={date}
              className="flex flex-row text-[#774DFD] gap-2 md:gap-0 md:flex-col"
            >
              {formattedDate}
            </span>
          );
        });
      }
    }

    return formattedResults;
  };

  const formatTime = (event_date_time: any) => {
    const formattedResults: any = [];

    for (const date in event_date_time) {
      if (event_date_time.hasOwnProperty(date)) {
        const events = event_date_time[date];
        events.forEach((event: any) => {
          const startDate = new Date(`${date}T${event.start_time}`);
          const endDate = new Date(`${date}T${event.end_time}`);

          const timeOptions: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
          };
          const formattedStartTime = startDate.toLocaleTimeString(
            "en-US",
            timeOptions
          );
          const formattedEndTime = endDate.toLocaleTimeString(
            "en-US",
            timeOptions
          );

          formattedResults.push(
            <span
              key={date}
              className="flex flex-row text-[#161616] gap-2 md:gap-0 md:flex-col"
            >
              {`${formattedStartTime} - ${formattedEndTime}`}
            </span>
          );
        });
      }
    }

    return formattedResults;
  };

  return (
    <div className="bg-[#F6F9FC] px-3">
      <h1 className="text-[#000] text-[18px] font-[500] pt-4 pb-2">
        My Events
      </h1>
      <div className="flex flex-col justify-center pb-6 gap-4">
        {isLoading ? (
          [1, 2, 3].map((item, id) => (
            <div
              key={id}
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
          eventData?.map((event: any, id: any) => (
            <div
              key={id}
              className="bg-white w-full rounded-[12px] border-[2px] border-[#EBE6FF]"
              onClick={() => router.push(`/events/detail/${event?.id}`)}
            >
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

                  <span className="flex flex-row items-center gap-1 text-[#350ABC] text-[14px] font-[400]">
                    <GoPerson className="text-lg text-[#350ABC]" />
                    {event.event_total_offers} offers
                  </span>
                </div>

                <h2 className="text-[18px] font-[600] text-[#161616]">
                  {event.event_title}
                </h2>

                <div className=" flex items-center  gap-1 mt-2  ">
                  <HiOutlineLocationMarker className="w-[24px] h-[24px] stroke-1 text-[#161616]" />
                  <p className="text-[14px] font-[400]  text-[#161616] w-full">
                    {event.event_location}
                  </p>
                </div>

                <div className="flex flex-row items-center justify-evenly gap-2 bg-[#F6F9FC] py-[10px] px-2 rounded-full mt-3">
                  <span className="flex gap-2 items-center text-[13px] font-[400] leading-[24px]">
                    <HiOutlineCalendar className="w-[20px] h-[20px] stroke-1 text-[#774DFD]" />
                    {formatDate(event.event_date_time)}
                  </span>
                  <span className="text-[13px] font-[400] leading-[24px]">
                    {formatTime(event.event_date_time)}
                  </span>
                </div>

                {/* Assigned User */}
                {event.event_assigned_to && client && (
                  <div className="flex items-center justify-center gap-1 mt-4">
                    <Avatar className="w-[62px] h-[62px]">
                      <AvatarImage
                        src={event?.event_assigned_to?.profile_pic}
                        className="object-cover"
                        width={100}
                        height={100}
                      />
                      <AvatarFallback>
                        {event?.event_assigned_to?.full_name[0]}
                        {event?.event_assigned_to?.full_name?.split(" ")
                          ?.length > 1 &&
                          event?.event_assigned_to?.full_name?.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex justify-between items-center w-full px-2 ">
                      <span className="font-[500] text-[16px] text-black flex items-center gap-1 ">
                        {event.event_assigned_to.full_name}
                        {(event?.event_assigned_to?.id_is_verified &&
                          event?.event_assigned_to?.contact_is_verified) ? (
                            <div className="text-[#28a745] flex justify-center items-center cursor-pointer">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className="hover:bg-transparent">
                                    <div className=" text-white rounded">
                                      <VerificationIconMobile
                                        id_is_verified={
                                          event?.event_assigned_to
                                            ?.id_is_verified
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
                                  <TooltipContent
                                    side="bottom"
                                    className="z-40"
                                  >
                                    <VerificationStatus
                                      id_is_verified={
                                        event?.event_assigned_to?.id_is_verified
                                      }
                                      contact_is_verified={
                                        event?.event_assigned_to
                                          ?.contact_is_verified
                                      }
                                    />
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ) : ''}
                      </span>
                      <span className="text-[#4C4B4B] font-[400] text-[14px]">
                        {event.event_required_service}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {event.event_status !== "open" &&
                event.event_status !== "completed" && (
                  <div
                    className={`flex justify-around p-3  rounded-b-lg ${
                      event.event_status === "assigned"
                        ? "bg-[#774DFD] text-white "
                        : "bg-[#EBE6FF] text-[#161616]"
                    }`}
                  >
                    {event.event_status === "assigned" && (
                      <>
                        <MdMailOutline className="text-xl cursor-pointer" />
                        <div className="w-[1px] h-5 bg-slate-50"></div>
                        <MdCall className="text-xl cursor-pointer" />
                      </>
                    )}
                    {/* <MdAttachMoney className="text-xl cursor-pointer" /> */}
                  </div>
                )}
            </div>
          ))
        ) : (
          // <p>No events found</p>
          <FindATalent />
        )}
      </div>
    </div>
  );
};

export default Page;
