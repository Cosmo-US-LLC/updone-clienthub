"use client";

import { useState } from "react";
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

const EventDetails = () => {
  const [status, setStatus] = useState("Assigned");

  return (
    <div className="py-1 px-1 mb-10  flex flex-col">
      <h1 className="text-[28px] font-[600] tracking-[0.5px] text-[#161616] mt-1">
        Event Overview
      </h1>
      <div className="flex items-center justify-between mt-4">
        <h2 className="text-[16px] font-[500] text-[#161616]">
          Hosting a corporate event
        </h2>
        <span
          className={`flex items-center text-[14px] font-medium px-3  py-1 rounded-full ${
            status === "Assigned"
              ? "text-[#0C9000] bg-green-100 border-[1px] border-[#0C9000]"
              : "text-[#0076E6] bg-[#E7F4FD] border-[1px] border-[#0076E6]"
          }`}
        >
          <FaCheck className="text-[14px] mr-1" /> {status}
        </span>
      </div>

      {status === "Assigned" && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-8 mb-4 border">
          <h3 className="text-gray-900 text-[16px] font-[600] mb-2 flex">
            Hired Talent
          </h3>
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Karina A."
              className="w-12 h-12 rounded-full border"
            />
            <div className="flex items-center gap-2">
              <p className="text-gray-900 text-[16px] font-[600]">Karina A.</p>
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
                            event?.event_assigned_to?.contact_is_verified
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
              {/* <FaCheck className="text-green-500 text-md" title="Verified" /> */}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 border-t pt-3">
            <div>
              <p className="text-gray-500 text-[14px] font-[400]">
                Contact Number:
              </p>
              <p className="text-blue-600 text-[14px] font-[600]">
                +1 987-345-8735
              </p>
            </div>
            <MdOutlineContentCopy
              className="text-gray-500 cursor-pointer"
              title="Copy"
            />
          </div>

          <div className="flex items-center justify-between mt-3 border-t pt-3">
            <div>
              <p className="text-gray-500 text-[14px] font-[400]">
                Email Address
              </p>
              <p className="text-purple-600 text-[14px] font-[600]">
                williamjosop987@gmail.com
              </p>
            </div>
            <MdOutlineContentCopy
              className="text-gray-500 cursor-pointer"
              title="Copy"
            />
          </div>
        </div>
      )}

      <h3 className="text-[16px] font-[500] text-gray-900 mt-4">
        Event Description
      </h3>
      <p className="text-gray-600 text-[14px] mt-2">
        Join us for an exclusive corporate networking event designed to connect
        industry professionals. Enjoy a sophisticated evening with top-tier
        cocktails, engaging conversations, and valuable business connections.
      </p>

      <hr className="my-6 border-gray-200" />

      <div className="space-y-4  ">
        <div className="flex items-center gap-5">
          <div className="p-2 bg-[#B4C4FF;] rounded-md border-[1px] border-[#585EFF]">
            <LiaGlassCheersSolid className="text-[#585EFF] text-xl" />
          </div>
          <div>
            <p className="text-gray-900 text-[16px] font-[600]">
              Requested Service:
            </p>
            <p className="text-gray-600 text-[14px]">
              Professional Cocktail Server
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
            <p className="text-gray-900 text-[16px] font-[600]">
              West Hollywood
            </p>
            <p className="text-gray-600 text-[14px]">Los Angeles, California</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
