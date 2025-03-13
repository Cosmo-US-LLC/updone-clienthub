"use client";
// @ts-nocheck

// import Tooltip from "@/app/_components/common/tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
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
import Link from "next/link";

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
                    {row?.id_is_verified && row?.worker?.id_is_verified && (
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
  const [transactionsData, setTransactionsData] = useState<any>([]);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest("/stripe/transactions", {
          method: "POST",
          headers: {
            revalidate: true,
            ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
          },
          // body: {
          //     page_number: 1,
          //     page_size: 10
          // }
        });
        setTransactionsData(response?.length > 0 ? response : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [storedData]);

  return (
    <div
      // className={`container max-w-full h-full overflow-y-auto mx-auto py-6 flex justify-center items-start ${
      //   isLoading && "!overflow-hidden"
      // }`}
      className="h-full max-lg:hidden flex flex-col max-lg:px-8 max-lg:py-8"
    >
      {isLoading ? (
        <RenderLoader />
      ) : transactionsData?.length == 0 ? (
        <div className="h-full flex justify-center items-center flex-col">
          <Image
            width={151}
            height={151}
            alt=""
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
                  <Link href={`events/detail/${row?.event_id}`} className="text-[#350ABC]">
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
                    {row?.id_is_verified && row?.worker?.id_is_verified && (
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
                <TableCell>{row?.payment_type !== "new_job" ? "Settlement" : "Event"}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Page;
