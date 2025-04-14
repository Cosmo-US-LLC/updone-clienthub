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
import { ChevronLeft } from "lucide-react";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { formatDateMobile } from "@/app/lib/helpers/formatDateTime";

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
                      Pending Settlement {(row?.tip_amount > 0 && row?.tip_amount_status == "pending") && "+ Tip"}
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
      </div>
    </>
  );
}

export default EventPayments;
