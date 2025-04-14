"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RenderLoader from "@/app/_components/ui/loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { ChevronLeft } from "lucide-react";
import { formatDateMobile } from "@/app/lib/helpers/formatDateTime";
import EventPaymentsMobile from "./mobile/EventPaymentsMobile";

function EventPayments({
  isLoading,
  transactionsData,
  transactionsGroup,
}: any) {
  return (
    <>
      <div
        // className={`container max-w-full h-full overflow-y-auto mx-auto py-6 flex justify-center items-start ${
        //   isLoading && "!overflow-hidden"
        // }`}
        className="h-[calc(100%-80px)] max-lg:hidden flex flex-col max-lg:px-8 max-lg:py-8"
      >
        {isLoading ? (
          <RenderLoader />
        ) : transactionsGroup?.length == 0 ? (
          <div className="h-full flex justify-center items-center flex-col gap-5">
            <Image
              width={151}
              height={151}
              alt=""
              className="w-44 h-44"
              src="/images/client-portal/payment/no-payment.svg"
            />
            <p className="text-[#000000] text-[40px] leading-[32px] font-[300]">
              No payments yet
            </p>
          </div>
        ) : (
          // contact_is_verified: 0
          // date: "April 9, 2025"
          // event_id: 589
          // event_title: "Job Scheduling Test"
          // id_is_verified: 0
          // initial_amount: 80
          // service: "Bartender"
          // settlement_amount: 0
          // talent_name: "Saif T."
          // talent_profile_picture: "https://updone.nyc3.digitaloceanspaces.com/worker_gallery/110/federici.jpg"
          // tip_amount: 13
          // requested_settlement: 0
          <div className="bg-white rounded-xl px-0 flex flex-col h-full">
            <div className="bg-[#f6f9fc] border-b grid grid-cols-6 gap-4 p-3 px-4 pr-14 text-md font-semibold">
              <div className="col-span-2">Event</div>
              <div className="col-span-2 grid grid-cols-3 gap-3">
                <div className="col-span-2">Talent</div>
                <div className="pl-3">Service</div>
              </div>
              <div className="text-center pl-2">Date</div>
              <div className="text-center pl-5">Total Amount</div>
            </div>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="grow w-full overflow-y-auto"
            >
              {transactionsGroup?.map((row: any, index: any) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="mt-0 mb-2 border-transparent bg-[#350abc]/5 rounded-xl !pb-0"
                >
                  <AccordionTrigger className="rounded-xl bg-white shadow-sm hover:bg-white hover:text-black p-1 px-4">
                    <div className="grow grid grid-cols-6 gap-4 items-center">
                      <div className="text-left col-span-2">
                        <span className="text-xs text-neutral-600">
                          #{row?.event_id}
                        </span>
                        <Link
                          href={`events/detail/${row?.event_id}`}
                          className="text-md text-[#350ABC] line-clamp-1 w-fit -mt-1"
                        >
                          {row?.event_title}
                        </Link>
                        <span
                          className={`w-fit text-xs font-normal px-2 py-0 rounded-full flex items-center gap-1 ${
                            row?.event_status === "open"
                              ? "bg-blue-100 text-blue-600"
                              : row?.event_status === "assigned"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {row?.event_status.charAt(0).toUpperCase() +
                            row?.event_status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-3 col-span-2">
                        <div className="col-span-2 flex flex-row items-center h-[80px] relative">
                          <Avatar className="w-[50px] h-[50px] rounded-full shadow-md">
                            <AvatarImage
                              src={row?.talent_profile_picture}
                              className="object-cover"
                            />
                            <AvatarFallback>
                              {row?.talent_name[0]}
                              {row?.talent_name?.split(" ")?.length > 1 &&
                                row?.talent_name?.split(" ")[1][0]}
                            </AvatarFallback>
                          </Avatar>

                          <span className="ml-2 text-[#2C2240] text-[14px] font-[400]">
                            {row?.talent_name}
                          </span>
                          {row?.id_is_verified && row?.contact_is_verified ? (
                            <div className="absolute bottom-3 left-5 ml-1 text-[#28a745] flex justify-center items-center cursor-pointer">
                              <div className=" text-white pr-4 pl-2  rounded">
                                <VerificationIcon
                                  id_is_verified={row?.id_is_verified}
                                  contact_is_verified={row?.contact_is_verified}
                                  height={23}
                                  width={23}
                                />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="text-sm font-normal pl-1 text-left">
                          {row?.service}
                        </div>
                      </div>
                      {/* <div className=""></div> */}
                      <div className="text-sm text-neutral-800 font-normal">
                        {row?.date}
                      </div>
                      <div className="">
                        $
                        {row?.initial_amount +
                          row?.settlement_amount +
                          row?.tip_amount}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="px-4 pt-4 flex flex-col gap-3">
                      <div className="grid grid-cols-4 items-center border-b text-center pb-2">
                        <span className="font-semibold border-r">Type</span>
                        <span className="font-semibold border-r">Amount</span>
                        <span className="border-r font-semibold">Date</span>
                        <span className="font-semibold">Status</span>
                      </div>
                      {row?.initial_amount > 0 && (
                        <div className="grid grid-cols-4 items-center text-center">
                          <span className="font-medium border-r">
                            Initial Payment:
                          </span>
                          <span className="font-medium border-r">
                            ${row?.initial_amount}
                          </span>
                          <span className="border-r font-normal text-neutral-800">
                            {formatDateMobile(row?.initial_amount_date)}
                          </span>
                          <div
                            className={`w-fit mx-auto cursor-pointer flex items-center gap-1 rounded-lg px-2 py-1 text-white bg-[#774dfd] opacity-80`}
                          >
                            Paid
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mb-0.5"
                              width="18"
                              height="18"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                            >
                              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
                            </svg>
                          </div>
                        </div>
                      )}
                      {row?.settlement_amount > 0 && (
                        <div className="grid grid-cols-4 items-center text-center">
                          <span className="font-medium border-r">
                            Settlement Payment:
                          </span>
                          <span className="font-medium border-r">
                            ${row?.settlement_amount}
                          </span>
                          <span className="border-r font-normal text-neutral-800">
                            {formatDateMobile(row?.settlement_amount_date)}
                          </span>
                          <span>
                            {row?.initial_amount_status == "succeeded" && (
                              <div
                                className={`w-fit mx-auto cursor-pointer flex items-center gap-1 rounded-lg px-2 py-1 text-white bg-[#774dfd] opacity-80`}
                              >
                                Paid
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mb-0.5"
                                  width="18"
                                  height="18"
                                  fill="currentColor"
                                  viewBox="0 0 256 256"
                                >
                                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
                                </svg>
                              </div>
                            )}
                          </span>
                        </div>
                      )}
                      {row?.requested_settlement > 0 && (
                        <div className="grid grid-cols-4 items-center text-center">
                          <span className="font-medium border-r">
                            Settlement Requested:
                          </span>
                          <span className="font-medium border-r">
                            ${row?.requested_settlement}
                          </span>
                          <span className="border-r font-normal text-neutral-800">
                            {formatDateMobile(row?.requested_settlement_date)}
                          </span>
                          <div className="mx-auto flex flex-row items-center gap-2">
                            <Link
                              href={`/events/detail/${row?.event_id}/payment-request`}
                              className={`cursor-pointer flex items-center gap-1 rounded-lg px-2 py-1 text-white bg-[#350abc]`}
                            >
                              Pay Now
                            </Link>
                          </div>
                        </div>
                      )}
                      {row?.tip_amount > 0 && (
                        <div className="grid grid-cols-4 items-center text-center">
                          <span className="font-medium border-r">
                            Tip Amount:
                            {row?.tip_amount_status == "pending" && (
                              <span className="ml-2 text-xs text-neutral-600">
                                (Selected)
                              </span>
                            )}
                          </span>
                          <span className="font-medium border-r">
                            ${row?.tip_amount}
                          </span>
                          <span className="border-r font-normal text-neutral-800">
                            {formatDateMobile(row?.tip_amount_date)}
                          </span>
                          {row?.tip_amount_status == "succeeded" ? (
                            <div
                              className={`w-fit mx-auto cursor-pointer flex items-center gap-1 rounded-lg px-2 py-1 text-white bg-[#774dfd] opacity-80`}
                            >
                              Paid
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mb-0.5"
                                width="18"
                                height="18"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                              >
                                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="mx-auto flex flex-row items-center gap-2">
                              <Link
                                href={`/events/detail/${row?.event_id}/payment-request`}
                                className={`cursor-pointer flex items-center gap-1 rounded-lg px-2 py-1 text-white bg-[#350abc]`}
                              >
                                Pay Now
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {/* <Table className="grow relative hover:bg-transparent">
              <TableHeader className="sticky top-0 z-10 bg-[#f6f9fc]">
                <TableRow>
                  <TableHead className="w-[130px]">Event ID</TableHead>
                  <TableHead>Event Detail</TableHead>
                  <TableHead>Talent Name</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Event Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto bg-white">
                {transactionsGroup?.map((row: any, index: any) => (
                  <TableRow key={index} className="text-[#2C2240]">
                    <TableCell>#{row?.event_id}</TableCell>
                    <TableCell>
                      <Link
                        href={`events/detail/${row?.event_id}`}
                        className="text-[#350ABC] line-clamp-1"
                      >
                        {row?.event_title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center h-[80px] relative">
                        <Avatar className="w-[50px] h-[50px]">
                          <AvatarImage
                            src={row?.talent_profile_picture}
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {row?.talent_name[0]}
                            {row?.talent_name?.split(" ")?.length > 1 &&
                              row?.talent_name?.split(" ")[1][0]}
                          </AvatarFallback>
                        </Avatar>

                        <span className="ml-2 text-[#2C2240] text-[14px] font-[400]">
                          {row?.talent_name}
                        </span>
                        {row?.id_is_verified && row?.contact_is_verified ? (
                          <div className="absolute bottom-3 left-5 ml-1 text-[#28a745] flex justify-center items-center cursor-pointer">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="hover:bg-transparent">
                                  <div className=" text-white pr-4 pl-2  rounded">
                                    <VerificationIcon
                                      id_is_verified={row?.id_is_verified}
                                      contact_is_verified={
                                        row?.contact_is_verified
                                      }
                                      height={23}
                                      width={23}
                                    />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  <VerificationStatus
                                    id_is_verified={row?.id_is_verified}
                                    contact_is_verified={
                                      row?.contact_is_verified
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
                    </TableCell>
                    <TableCell>{row?.service}</TableCell>
                    <TableCell>${row?.amount}</TableCell>
                    <TableCell>{row?.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> */}
          </div>
        )}
      </div>

      <div className="h-full lg:hidden flex flex-col max-lg:px-4 max-lg:py-4 gap-2">
        <EventPaymentsMobile
          isLoading={isLoading}
          transactionsGroup={transactionsGroup}
        />
      </div>
    </>
  );
}

export default EventPayments;
