"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdMailOutline, MdCall, MdAttachMoney } from "react-icons/md";
import { GoPerson } from "react-icons/go";

const Page = ({ eventData }: any) => {
  console.log("mobile my events page", eventData);
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  return (
    <div className="space-y-4 flex flex-col justify-center items-center">
      {eventData.map((event: any) => (
        <div
          key={event.id}
          className="bg-white w-full max-w-[340px] rounded-lg shadow-sm p-4 border border-[#EBE6FF]"
        >
          <div className="flex justify-between items-center mb-1">
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

          <h2 className="text-[18px] font-[500] text-black leading-normal">{event.event_title}</h2>
          

          <div className=" flex items-center gap-1 mt-1">
            <HiOutlineLocationMarker className="w-[24px] h-[24px]" />
            <p className="text-[14px] font-[400]">{event.event_location}</p>
          </div>

          {/* Assigned User */}
          {event.event_assigned_to && client && (
            <div className="flex items-center gap-3 mt-3 border-t pt-2 border-gray-200">
              <Image
                src={event.event_assigned_to.profile_pic}
                alt={event.event_assigned_to.full_name}
                width={40}
                height={40}
                className="rounded-full border border-gray-300"
              />
              <div>
                <span className="font-semibold text-black flex items-center gap-1 text-sm">
                  {event.event_assigned_to.full_name}
                  {event.event_assigned_to.contact_is_verified && (
                    <span className="text-green-500 text-lg">✅</span>
                  )}
                </span>
                <span className="text-gray-500 text-xs">
                  {event.event_required_service}
                </span>
              </div>
            </div>
          )}

          {/* Date & Time */}
          {event.event_date_time.length > 0 && (
            <div className="bg-gray-100 text-gray-600 flex items-center gap-2 p-2 rounded-lg text-sm mt-3">
              <FaRegCalendarAlt className="text-gray-500" />
              <span className="text-black font-medium">
                {event.event_date_time[0].start_time} -{" "}
                {event.event_date_time[0].end_time}
              </span>
            </div>
          )}

          {/* Initial Amount */}
          {event.event_initial_amount !== null && (
            <div className="mt-2 text-gray-700 font-medium">
              Initial Amount: ${event.event_initial_amount}
            </div>
          )}

          {/* Bottom Action Bar */}
          {event.event_status !== "open" && (
            <div
              className={`flex justify-around p-3 mt-3 rounded-b-lg text-white ${
                event.event_status === "assigned"
                  ? "bg-purple-600"
                  : "bg-gray-200 text-gray-600"
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
      ))}
    </div>
  );
};

export default Page;
