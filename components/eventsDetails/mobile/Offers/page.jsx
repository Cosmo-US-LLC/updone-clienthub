"use client";

import { useState } from "react";
import {
  FaStar,
  FaCheckCircle,
  FaSuitcase,
  FaFileInvoiceDollar,
} from "react-icons/fa";
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

const Offers = ({jobData}) => {
  const [offersData, setOffersData] = useState([
    {
      profilePic: "https://randomuser.me/api/portraits/women/47.jpg",
      name: "Kristin W.",
      rating: 5.0,
      jobs: 69,
      location: "Santa Monica",
      lastJob: { role: "BAR BACK", date: "25th June" },
      offeredRate: "$50",
      totalAmount: "$350",
      notification: 3, // Red badge notification count
    },
    {
      profilePic: "https://randomuser.me/api/portraits/men/48.jpg",
      name: "Jacob S.",
      rating: 5.0,
      jobs: 32,
      location: "Los Angeles",
      lastJob: { role: "BAR BACK", date: "25th June" },
      offeredRate: "$350",
      totalAmount: "$350",
      notification: 0, // No notifications
    },
    {
      profilePic: "https://randomuser.me/api/portraits/women/49.jpg",
      name: "Cristina W.",
      rating: 5.0,
      jobs: 120,
      location: "West Hollywood",
      lastJob: { role: "BAR BACK", date: "25th June" },
      offeredRate: "$350",
      totalAmount: "$350",
      notification: 0,
    },
  ]);  

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-[16px] font-[400] tracking-[0.5px] text-[#161616] mt-1">
        Talent Offers
             </h1>
 
      {offersData.length > 0 ? (
        <div className="space-y-4">
          {offersData.map((offer, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border-[2px] border-[#E9E9E9]   "
            >
            
              <div className="flex items-center justify-between">
               
                <div className="flex items-center gap-3">
                  <img
                    src={offer.profilePic}
                    alt={offer.name}
                    className="w-12 h-12 rounded-full border"
                  />
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 text-[16px] font-[600]">{offer.name}</p>
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
                  </div>
                </div>
             
                <div className="flex items-center gap-1 text-gray-500">
                  <FaStar className="text-yellow-500 mb-1" />
                  <span className="text-[14px]">{offer.rating}/5</span>
                </div>
              </div>

          
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1 text-gray-500 text-[14px] font-[400]">
                  <HiOutlineLocationMarker  className="text-[22px]"/>
                  <span>{offer.location}</span>
                </div>
                <p className="text-gray-500 text-[14px] font-[400]">{offer.jobs} Jobs</p>
              </div>

           
              <div className="flex min-w-[300px] items-center justify-center gap-4 bg-[#F4FAFF] px-4 py-[10px] rounded-full mt-4 text-gray-700 text-[14px]">
                <FaSuitcase className="text-blue-600" />
                <span>
                  Last job was a  {""}
                  {offer.lastJob.date}
                </span>
              </div>

              <div className="flex justify-between  px-8 mt-6">
                <div className=" flex flex-col justify-center items-center">
                  <p className="text-gray-500 text-[14px]">Offered rate</p>
                  <p className="text-gray-900 text-[18px] font-[600]">
                    {offer.offeredRate}
                  </p>
                </div>
                <div className="w-[1px] bg-[#E9E9E9]"></div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-gray-500 text-[14px]">Total</p>
                  <p className="text-gray-900 text-[18px] font-[600]">
                    {offer.totalAmount}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-7">
                <div className="relative flex items-center">
                  <button className="  border-[1px] border-[#161616] text-[#161616] text-[14px] font-medium px-4 py-2 rounded-full">
                    Let's Talk
                  </button>
                  {/* <FaFileInvoiceDollar className="text-gray-500 text-lg" /> */}
                  {offer.notification > 0 && (
                    <span className="absolute -top-2 -right-1 z-10 bg-[#774DFD] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {offer.notification}
                    </span>
                  )}
                </div>

                <button className="bg-[#350ABC] text-white text-[14px] font-[400] px-6 py-2 rounded-full">
                  Hire Me
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <Image
            src="/illustration-no-offers.svg"
            width={220}
            height={220}
            alt="No Offers"
          />

          <h2 className="text-lg font-semibold text-gray-900 mt-4">
            No offer yet to show
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

export default Offers;
