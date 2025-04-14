"use client";
// @ts-nocheck

// import Tooltip from "@/app/_components/common/tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import useClickOutside from "@/app/lib/hooks";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
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
import { ChevronLeft } from "lucide-react";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import VerificationIconMobile from "@/app/_components/ui/shield";
import EventPayments from "@/components/payments/EventPayments";
import Transactions from "@/components/payments/Transactions";

const CardTable = ({
  headers,
  bodyData,
}: {
  headers: string[];
  bodyData: any[];
}) => {
  const [openMenu, setOpenMenu] = useState<{
    rowIndex: number;
    menuType: string;
  } | null>(null);
  const containerRef = useRef<HTMLTableSectionElement | any>(null);
  const router = useRouter();

  const handleRedirectToEvent = (eventId: any) => {
    router.push(`events/detail/${eventId}`);
  };

  const handleMenuOpen = (rowIndex: number, menuType: string) => {
    setOpenMenu({ rowIndex, menuType });
  };

  const handleMenuClose = () => {
    setOpenMenu(null);
  };

  useClickOutside(containerRef, handleMenuClose);

  const isLenghtSix = !!(Number(bodyData.length.toString()) <= 6);
  return (
    <div className="flex flex-col w-[100%]">
      <div
        className={`${
          isLenghtSix ? "overflow-y-auto" : ""
        } max-h-[calc(100vh-220px)] w-full scroll-smooth`}
      >
        <table className="table-auto w-full text-left">
          <thead className="sticky z-10 bg-[#F6F9FC] border-b-[1px] border-[#ebe6ff] -top-1">
            <tr className="">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="py-[12px] px-[12px] text-[#2C2240] text-[14px] font-[600]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="relative top-6">
            {bodyData?.map((row, index) => (
              <tr
                key={index}
                className="bg-white hover:bg-gray-50 border-b-[10px] border-[#F6F9FC] "
              >
                <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
                  #{row?.payment_id}
                </td>
                <td
                  onClick={() => {
                    handleRedirectToEvent(row?.event_id);
                  }}
                  className="py-4 px-4 text-[#2C2240] text-[14px] font-[400] cursor-pointer text-[#350ABC]"
                >
                  {row?.event_title}
                </td>
                <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400] flex flex-row gap-2 items-center">
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
                                  contact_is_verified={row?.contact_is_verified}
                                  height={23}
                                  width={23}
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
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
                    {openMenu?.rowIndex === index &&
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
                      )}
                  </div>
                </td>
                <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
                  {row?.service}
                </td>
                <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
                  ${row?.amount}
                </td>
                <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
                  {row?.date}
                </td>
                <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
                  {row?.payment_type !== "new_job" ? "Settlement" : "Event"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Headers
const headers = [
  "Payment ID",
  "Event Detail",
  "Talent Name",
  "Requested Service",
  "Amount",
  "Payment Date",
  "Payment Type",
];

const Page = () => {
  const [openTab, setOpenTab] = useState<any>(0);
  const [transactionsData, setTransactionsData] = useState<any>([]);
  const [transactionsGroup, setTransactionsGroup] = useState<any>([]);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGroup, setIsLoadingGroup] = useState(true);

  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest("/stripe/transactions", {
        method: "POST",
        headers: {
          revalidate: true,
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
      });
      setTransactionsData(response?.length > 0 ? response : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchOfferGroups = async () => {
    try {
      setIsLoadingGroup(true);
      const response = await apiRequest("/stripe/transaction-groups", {
        method: "POST",
        headers: {
          revalidate: true,
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
      });
      setTransactionsGroup(response?.length > 0 ? response : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingGroup(false);
    }
  };
  useEffect(() => {
    fetchOfferGroups();
    fetchOffers();
  }, [storedData]);

  const paymentTypeStyle: any = {
    tip: "text-green-500 bg-green-50 border border-green-500",
    settlement: "text-red-500 bg-red-50 border border-red-500",
    new_job: "text-blue-500 bg-blue-50 border border-blue-500",
  };

  return (
    <>
      <div className="h-[50px] max-lg:hidden flex justify-start items-center gap-1 mb-2">
        <button onClick={() => setOpenTab(0)} className={`px-2 py-1 ${openTab == 0 ? 'border-b-[#350abc]' : 'border-b-transparent'} border-b-2 hover:bg-transparent hover:text-black hover:border-b-[#350abc] flex items-center gap-1`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path></svg>
          Payments
        </button>
        <button onClick={() => setOpenTab(1)} className={`px-2 py-1 ${openTab == 1 ? 'border-b-[#350abc]' : 'border-b-transparent'} border-b-2 hover:bg-transparent hover:text-black hover:border-b-[#350abc] flex items-center gap-1`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path></svg>
          History
        </button>
      </div>

      {openTab === 0 ? (
        <EventPayments
          isLoading={isLoadingGroup}
          transactionsData={transactionsData}
          transactionsGroup={transactionsGroup}
        />
      ) : (
        <Transactions
          isLoading={isLoading}
          transactionsData={transactionsData}
          transactionsGroup={transactionsGroup}
        />
      )}
    </>
  );
};

export default Page;
