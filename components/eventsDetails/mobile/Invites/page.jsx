"use client";

import { useState } from "react";
import { FaStar, FaCheckCircle, FaSuitcase } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";

const Invites = ({jobData}) => {
  const [invitesData, setInvitesData] = useState([
    {
      profilePic: "https://randomuser.me/api/portraits/women/50.jpg",
      name: "Emma R.",
      rating: 4.9,
      jobs: 45,
      location: "New York City",
      lastJob: { role: "Bartender", date: "12th July" },
      ratePerHour: "$40/hr",
      totalAmount: "$320",
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/51.jpg",
      name: "Liam D.",
      rating: 5.0,
      jobs: 60,
      location: "Los Angeles",
      lastJob: { role: "Server", date: "18th June" },
      ratePerHour: "$50/hr",
      totalAmount: "$400",
    },
  ]);

  return (
    <div className="flex flex-col gap-5 ">
      <h1 className="text-[16px] font-[400] text-[#161616] mt-1">Invites</h1>

      {invitesData.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {invitesData.map((invite, index) => (
            <div className="flex flex-col" key={index}>
              <div key={index} className="bg-[#FCFBFF] p-4 rounded-t-lg border">
                <div className="flex items-center gap-3">
                  <img
                    src={invite.profilePic}
                    alt={invite.name}
                    className="w-[60px] h-[60px] rounded-full border"
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <p className="text-gray-900 test-[16px] font-[600]">
                          {invite.name}
                        </p>
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
                                    event?.event_assigned_to
                                      ?.contact_is_verified
                                  }
                                />
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <FaStar className="text-yellow-500 mb-1" />
                        <span className="text-[14px]">{invite.rating}/5</span>
                      </div>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                      <div className="flex  gap-1 text-gray-500 text-sm">
                        <HiOutlineLocationMarker className="text-[22px]" />
                        <span className="text-[14px] font-[500]">
                          {invite.location}
                        </span>
                      </div>
                      <p className="text-gray-500 text-[14px]">
                        {invite.jobs} Jobs
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex min-w-[300px] items-center justify-center gap-3 bg-[#F4FAFF] px-4 py-[10px] rounded-full mt-4 text-gray-700 text-[14px]">
                  <FaSuitcase className="text-blue-600" />
                  <span>The last job was on {invite.lastJob.date}</span>
                </div>
              </div>
              <div className="flex justify-around border rounded-b-lg py-2 bg-white">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-[14px] font-[400] text-gray-500">From</p>
                  <p className="text-[16px] font-[600]">{invite.ratePerHour}</p>
                </div>
                <div className="w-[1px] bg-[#E9E9E9] "></div>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-gray-500 text-[16px]  ">Total</p>
                  <p className="text-gray-900 text-[16px] font-[600]">
                    {invite.totalAmount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <Image
            src="/illustration-no-invites.svg"
            width={220}
            height={220}
            alt="No Invites"
          />

          <h2 className="text-lg font-semibold text-gray-900 mt-4">
            No Invites
          </h2>
          <p className="text-gray-500 text-sm mt-2 px-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eius.
          </p>

          <button className="bg-purple-600 text-white text-sm font-medium px-6 py-3 rounded-full mt-6">
            Invite talent to job
          </button>
        </div>
      )}
    </div>
  );
};

export default Invites;
