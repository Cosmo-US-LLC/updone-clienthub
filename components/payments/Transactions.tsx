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

function Transactions({ isLoading, transactionsData, transactionsGroup }: any) {
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
        ) : transactionsData?.length == 0 ? (
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
          <>
            {/* <div className="h-[40vh] overflow-hidden">
              <CardTable headers={headers} bodyData={transactionsData || []} />
            </div> */}

            <Table className="grow relative hover:bg-transparent">
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader className="sticky top-0 z-10 bg-[#f6f9fc]">
                <TableRow>
                  <TableHead className="w-[130px]">Payment ID</TableHead>
                  <TableHead>Event Detail</TableHead>
                  <TableHead>Talent Name</TableHead>
                  <TableHead>Requested Service</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Payment Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto bg-white">
                {transactionsData?.map((row: any, index: any) => (
                  <TableRow key={index} className="text-[#2C2240]">
                    {/* Payment ID */}
                    <TableCell>#{row?.payment_id}</TableCell>
                    {/* Event Detail */}
                    <TableCell>
                      <Link
                        href={`events/detail/${row?.event_id}`}
                        className="text-[#350ABC]"
                      >
                        {row?.event_title}
                      </Link>
                    </TableCell>
                    {/* Talent Name */}
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
                        {/* {openMenu?.rowIndex === index &&
                        openMenu?.menuType === "verified" && (
                          <div
                            style={{
                              boxShadow: "0px 8px 26px 0px rgba(0, 0, 0, 0.12)",
                            }}
                            className={`right-[-15px] absolute flex flex-col gap-2 ${
                              index === 0 ? "" : "top-[-100px]"
                            } w-[250px] bg-[#FFF] shadow-md p-4 rounded-[4px] z-10`}
                          >
                            <div className="flex gap-2">
                              <h4 className="font-[400] text-[#6B6B6B] text-[14px]">
                                Phone Number
                              </h4>
                              {row?.contact_is_verified === 1 ? (
                                <p className="text-[#0C9000] font-[400] text-[14px]">
                                  (Verified)
                                </p>
                              ) : (
                                <p className="text-[#C20000] font-[400] text-[14px]">
                                  (Not-Verified)
                                </p>
                              )}
                            </div>
                            <hr className="border-t border-gray-200 my-0" />
                            <div className="flex gap-2">
                              <h4 className="font-[400] text-[#6B6B6B] text-[14px]">
                                Social Security
                              </h4>
                              {row?.id_is_verified === 1 ? (
                                <p className="text-[#0C9000] font-[400] text-[14px]">
                                  (Verified)
                                </p>
                              ) : (
                                <p className="text-[#C20000] font-[400] text-[14px]">
                                  (Not-Verified)
                                </p>
                              )}{" "}
                            </div>
                          </div>
                        )} */}
                      </div>
                    </TableCell>
                    {/* Requested Service */}
                    <TableCell>{row?.service}</TableCell>
                    {/* Amount */}
                    <TableCell>${row?.amount}</TableCell>
                    {/* Payment Date */}
                    <TableCell>{row?.date}</TableCell>
                    {/* Payment Type */}
                    <TableCell>
                      {row?.payment_type !== "new_job" ? "Settlement" : "Event"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
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
                      <span className="text-[16px] font-medium w-[46px]">
                        $
                        {row?.initial_amount +
                          row?.settlement_amount +
                          row?.tip_amount}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2">
                    <div className="px-4 pr-6 pt-2 grid grid-cols-7">
                      <div className="col-span-6 flex flex-col gap-1">
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
                        {row?.tip_amount ? (
                          <span className="text-sm text-neutral-600">
                            Tip Amount:
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
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
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Transactions;
