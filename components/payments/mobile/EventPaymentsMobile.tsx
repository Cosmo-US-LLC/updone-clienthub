"use client"
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import VerificationIconMobile from "@/app/_components/ui/shield";
import Link from "next/link";
import RenderLoader from "@/app/_components/ui/loader";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

function EventPaymentsMobile({isLoading, transactionsGroup}: any) {
  return (
    <>
      <Link
        href={"/"}
        className="text-xs text-neutral-500 flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      <h2 className="text-[18px] font-[500]">Payments</h2>
      {isLoading ? (
        <div className="py-20">
          <RenderLoader />
        </div>
      ) : transactionsGroup?.length == 0 ? (
        <div className="h-full min-h-[70vh] flex justify-center items-center flex-col gap-5">
          <Image
            width={151}
            height={151}
            alt=""
            className="w-44 h-44"
            src="/images/client-portal/payment/no-payment.svg"
          />
          <p className="text-[#000000] text-[30px] leading-[32px] font-[300]">
            No payments yet
          </p>
        </div>
      ) : (
        transactionsGroup?.map((row: any, index: any) => (
          <div
            key={index}
            className="shadow-md border p-3 px-4 rounded-xl mb-1 "
          >
            <div className="flex items-center justify-between gap-2">
              <span className="h-[10px] text-xs text-neutral-500 text-right">
                #{row?.event_id}
              </span>
              <span className="text-sm text-neutral-600">{row?.date}</span>
            </div>
            <Link
              href={`events/detail/${row?.event_id}`}
              className="text-[18px] text-[#350ABC]"
            >
              {row?.event_title}
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem
                value="one"
                className="my-2 mb-3 border-transparent bg-[#350abc]/5 rounded-md !pb-0"
              >
                <AccordionTrigger className="py-1 bg-[#350abc]/5 rounded-md px-2">
                  <div className="grow flex justify-between items-center px-2">
                    <span className="text-sm font-normal pr-1">
                      Total Amount:
                    </span>
                    <span className="text-[16px] font-medium w-[40px]">
                      $
                      {row?.initial_amount +
                        row?.settlement_amount +
                        row?.tip_amount}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="px-4 pr-6 pt-2 grid grid-cols-7">
                    <div className="col-span-5 flex flex-col gap-1">
                      <span className="text-sm text-neutral-600">
                        Initial Amount:
                      </span>
                      {row?.settlement_amount ? (
                        <span className="text-sm text-neutral-600">
                          Settlement Amount:
                        </span>
                      ) : (
                        ""
                      )}
                      {row?.requested_settlement ? (
                        <span className="text-sm text-neutral-600">
                          Settlement Requested:
                        </span>
                      ) : (
                        ""
                      )}
                      {row?.tip_amount ? (
                        <span className="text-sm text-neutral-600">
                          Tip Amount:
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-span-2 flex flex-col gap-1 text-right pr-3">
                      <span className="text-[16px]">
                        {row?.initial_amount ? `$${row?.initial_amount}` : ""}
                      </span>
                      {row?.settlement_amount ? (
                        <span className="text-[16px]">
                          {row?.settlement_amount
                            ? `$${row?.settlement_amount}`
                            : ""}
                        </span>
                      ) : (
                        ""
                      )}
                      {row?.requested_settlement ? (
                        <div className="text-[16px]">
                          {row?.settlement_amount
                            ? `$${row?.requested_settlement}`
                            : ""}
                        </div>
                      ) : (
                        ""
                      )}
                      {row?.tip_amount ? (
                        <span className="text-[16px]">
                          {row?.tip_amount ? `$${row?.tip_amount}` : ""}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    {/* <div className="flex flex-col gap-1">
                      </div> */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex items-center justify-center gap-1 mt-1">
              <Avatar className="w-[42px] h-[42px]">
                <AvatarImage
                  src={row?.talent_profile_picture}
                  className="object-cover"
                  width={100}
                  height={100}
                />
                <AvatarFallback>
                  {row?.talent_name[0]}
                  {row?.talent_name?.split(" ")?.length > 1 &&
                    row?.talent_name?.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex justify-between items-center w-full px-2 ">
                <span className="font-[500] text-[16px] text-black flex items-center gap-1 ">
                  {row?.talent_name}
                  {row?.id_is_verified && row?.contact_is_verified ? (
                    <div className="text-[#28a745] flex justify-center items-center cursor-pointer">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="hover:bg-transparent">
                            <div className=" text-white rounded">
                              <VerificationIconMobile
                                id_is_verified={row?.id_is_verified}
                                contact_is_verified={row?.contact_is_verified}
                                height={23}
                                width={23}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="z-40">
                            <VerificationStatus
                              id_is_verified={row?.id_is_verified}
                              contact_is_verified={row?.contact_is_verified}
                            />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    ""
                  )}
                </span>
                <span className="text-[#4C4B4B] font-[400] text-[14px]">
                  {row?.service}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-0 mt-2">
              {row?.requested_settlement > 0 && (
                <div className="flex items-center justify-between gap-1 mt-1">
                  <div className="text-sm font-semibold">
                    Pending Settlement{" "}
                    {row?.tip_amount > 0 &&
                      row?.tip_amount_status == "pending" &&
                      "+ Tip"}
                  </div>
                  <Link
                    href={`/events/detail/${row?.event_id}/payment-request`}
                    className={`text-sm cursor-pointer flex items-center gap-1 rounded-lg px-2 py-1 text-white bg-[#350abc]`}
                  >
                    Pay Now
                  </Link>
                </div>
              )}
              {/* {row?.tip_amount > 0 && row?.tip_amount_status == "pending" && (
                  <div className="flex items-center justify-between gap-1 mt-1">
                    <div className="text-sm font-semibold">Pending Tip</div>
                    <div>Pay now</div>
                  </div>
                )} */}
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default EventPaymentsMobile;
