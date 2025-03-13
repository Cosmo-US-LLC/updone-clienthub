// @ts-nocheck
"use client";

// import Tooltip from '@/app/_components/common/tooltip';
import { Loader } from "@/app/_components/ui/dashboard-loader";
import NoDataFound from "@/app/_components/ui/no-data-found";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { useError } from "@/app/lib/context/ErrorProvider";
import useClickOutside from "@/app/lib/hooks";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

// const CardTable = ({
//   headers,
//   bodyData,
// }: {
//   headers: string[];
//   bodyData: any[];
// }) => {
//   const [openMenu, setOpenMenu] = useState<{
//     rowIndex: number;
//     menuType: string;
//   } | null>(null);
//   const containerRef = useRef<HTMLTableSectionElement>(null);
//   const { auth: storedData } = useAppSelector(selectAuth);
//   const { handleError } = useError();
//   const router = useRouter();

//   const handleRedirectToEvent = (eventId) => {
//     router.push(`events/detail/${eventId}`);
//   };

//   const handleRedirectToPayment = (jobId) => {
//     router.push(`/events/detail/${jobId}/payment-request`);
//     // router.push(`settlements/payment/${eventId}`);
//   };

//   const handleDeclineSettlement = (eventId) => {
//     rejectExtraHours(eventId);
//   };

//   const handleMenuOpen = (rowIndex: number, menuType: string) => {
//     setOpenMenu({ rowIndex, menuType });
//   };

//   const handleMenuClose = () => {
//     setOpenMenu(null);
//   };

//   useClickOutside(containerRef, handleMenuClose);

//   const rejectExtraHours = async (offerId) => {
//     const bodyData: any = {
//       settlement_id: offerId,
//     };

//     try {
//       const response = await apiRequest(
//         `/invitation/rejectExtraHours`,
//         {
//           method: "POST",
//           headers: {
//             ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
//           },
//           body: bodyData,
//         },
//         handleError
//       );
//       window.location.reload();
//     } catch (err) {
//       console.error("Error processing payment:", err);
//     }
//   };

//   const getstatusBackgroundColor = (status) => {
//     if (status === "accepted") {
//       return "bg-[#EAFDE7] border-[#0C9000] text-[#0C9000]";
//     } else if (status === "rejected") {
//       return "bg-[#FFEBEB] border-[#C20000] text-[#C20000]";
//     } else {
//       return "bg-[#E7F4FD] border-[#0076E6] text-[#0076E6]";
//     }
//   };

//   const isLenghtSix = !!Number(bodyData?.length?.toString()) <= 6;
//   return (
//     <div className="flex flex-col w-[100%] grow">
//       <div
//         className={`max-h-[calc(100vh-220px)] h-full overflow-y-auto w-full`}
//       >
//         <table className="table-auto w-full text-left">
//           <thead className="sticky z-10 bg-[#F6F9FC] border-b-[1px] border-[#ebe6ff] -top-1 ">
//             <tr className="">
//               {headers.map((header, idx) => (
//                 <th
//                   key={idx}
//                   className="py-[12px] px-[20px] text-[#2C2240] text-[14px] font-[600]"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="relative top-5">
//             {bodyData?.map((row, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-gray-50 border-b-[10px] border-[#F6F9FC] "
//               >
//                 <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
//                   #{row?.payment_id}
//                 </td>
//                 <td
//                   onClick={() => {
//                     handleRedirectToEvent(row?.job_id);
//                   }}
//                   className="py-4 px-4 text-[#2C2240] text-[14px] font-[400] cursor-pointer text-[#350ABC]"
//                 >
//                   <div className="flex flex-row items-center gap-2">
//                     {row?.event_title}
//                     <Image
//                       alt="external-link"
//                       height={15}
//                       width={15}
//                       src={"/external-link.svg"}
//                     />
//                   </div>
//                 </td>
//                 <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400] flex flex-row gap-2 items-center">
//                   <div className="flex flex-row items-center h-[80px] relative">
//                     <Avatar className="w-[50px] h-[50px]">
//                       <AvatarImage
//                         src={row?.talent_profile_picture}
//                         className="object-cover"
//                       />
//                       <AvatarFallback>
//                         {row?.talent_name[0]}
//                         {row?.talent_name?.split(" ")?.length > 1 &&
//                           row?.talent_name?.split(" ")[1][0]}
//                       </AvatarFallback>
//                     </Avatar>

//                     <span className="ml-2 text-[#2C2240] text-[14px] font-[400]">
//                       {row?.talent_name}
//                     </span>
//                     <div className="absolute bottom-3 left-5 ml-1 text-[#28a745] flex justify-center items-center cursor-pointer">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger className="hover:bg-transparent">
//                             <div className=" text-white pr-4 pl-2  rounded">
//                               <VerificationIcon
//                                 id_is_verified={row?.id_is_verified}
//                                 contact_is_verified={row?.contact_is_verified}
//                                 height={23}
//                                 width={23}
//                               />
//                             </div>
//                           </TooltipTrigger>
//                           <TooltipContent side="bottom">
//                             <VerificationStatus
//                               id_is_verified={row?.id_is_verified}
//                               contact_is_verified={row?.contact_is_verified}
//                             />
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                     {openMenu?.rowIndex === index &&
//                       openMenu?.menuType === "verified" && (
//                         <div
//                           style={{
//                             boxShadow: "0px 8px 26px 0px rgba(0, 0, 0, 0.12)",
//                           }}
//                           className={`right-[-15px] absolute flex flex-col gap-2 ${
//                             index === 0 ? "" : "top-[-100px]"
//                           } w-[250px] bg-[#FFF] shadow-md p-4 rounded-[4px] z-10`}
//                         >
//                           <div className="flex gap-2">
//                             <h4 className="font-[400] text-[#6B6B6B] text-[14px]">
//                               Phone Number
//                             </h4>
//                             {row?.contact_is_verified === 1 ? (
//                               <p className="text-[#0C9000] font-[400] text-[14px]">
//                                 (Verified)
//                               </p>
//                             ) : (
//                               <p className="text-[#C20000] font-[400] text-[14px]">
//                                 (Not-Verified)
//                               </p>
//                             )}
//                           </div>
//                           <hr className="border-t border-gray-200 my-0" />
//                           <div className="flex gap-2">
//                             <h4 className="font-[400] text-[#6B6B6B] text-[14px]">
//                               Social Security
//                             </h4>
//                             {row?.id_is_verified === 1 ? (
//                               <p className="text-[#0C9000] font-[400] text-[14px]">
//                                 (Verified)
//                               </p>
//                             ) : (
//                               <p className="text-[#C20000] font-[400] text-[14px]">
//                                 (Not-Verified)
//                               </p>
//                             )}{" "}
//                           </div>
//                         </div>
//                       )}
//                   </div>
//                 </td>
//                 <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
//                   {row?.service}
//                 </td>
//                 <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
//                   {row?.extra_hours}h
//                 </td>
//                 <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
//                   ${row?.additional_payment}
//                 </td>
//                 <td
//                   className={`py-2 px-4 text-[#2C2240] text-[14px] font-[400] text-center`}
//                 >
//                   <div
//                     className={`${getstatusBackgroundColor(
//                       row?.status
//                     )} py-2 px-4 rounded-[32px]`}
//                   >
//                     {row?.status}
//                   </div>
//                 </td>
//                 <td className="py-4 px-4 text-[#2C2240] text-[14px] font-[400]">
//                   {row?.event_date}
//                 </td>
//                 <td
//                   className={`py-2 px-4 text-[#2C2240] text-[14px] font-[400] text-center`}
//                 >
//                   {row?.status !== "accepted" && row?.status !== "rejected" ? (
//                     <div className=" flex flex-row items-center gap-2">
//                       {/* <p
//                           onClick={() => {
//                             handleDeclineSettlement(row?.settlement_id);
//                           }}
//                           className={`cursor-pointer text-[#C20000] font-[400] text-[14px] leading-[21px]`}>
//                           Decline
//                         </p> */}
//                       <div
//                         onClick={() => {
//                           handleRedirectToPayment(row?.job_id);
//                         }}
//                         className={`cursor-pointer border border-1 border-[#0C9000] rounded-[4px] bg-[#EAFDE7] p-2`}
//                       >
//                         <p className="text-[#0C9000] font-[400] text-[14px] leading-[21px]">
//                           Pay Now
//                         </p>
//                       </div>
//                     </div>
//                   ) : (
//                     <p>-</p>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// Headers
const headers = [
  "Settlement ID",
  "Event Title",
  "Talent Name",
  "Requested Service",
  "Additional Hours",
  "Amount",
  "Status",
  "Event Date",
  "Actions",
];

const Page = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const response = await apiRequest("/stripe/settlements", {
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
      className="h-full max-lg:hidden flex flex-col max-lg:px-8 max-lg:py-8"
      // className={`${
      //   isLoading && "!overflow-hidden"
      // } container max-w-full h-full overflow-y-auto mx-auto py-6 flex flex-col justify-center items-center min-h-[calc(100vh-220px)]`}
    >
      {isLoading ? (
        <RenderLoader />
      ) : transactionsData?.length == 0 ? (
        <NoDataFound
          isSettlement
          title="No settlements available."
          description={""}
          image="/images/client-portal/payment/settlements image.webp"
        />
      ) : (
        <>
          <Table className="grow relative hover:bg-transparent">
            <TableHeader className="sticky top-0 z-10 bg-[#f6f9fc]">
              <TableRow>
                <TableHead className="w-[130px]">Settlement ID</TableHead>
                <TableHead>Event Title</TableHead>
                <TableHead>Talent Name</TableHead>
                <TableHead>Requested Service</TableHead>
                <TableHead>Additional Hours</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto bg-white">
              {transactionsData?.map((row, index) => (
                <TableRow key={index} className="text-[#2C2240]">
                  {/* Settlement ID */}
                  <TableCell>#{row?.payment_id}</TableCell>
                  {/* Event Title */}
                  <TableCell>
                    <Link
                      href={`/events/detail/${row?.job_id}`}
                      className="flex flex-row items-center gap-2 text-[#350ABC]"
                    >
                      {row?.event_title}
                      <Image
                        alt="external-link"
                        height={15}
                        width={15}
                        src={"/external-link.svg"}
                      />
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
                      {(row?.id_is_verified && row?.worker?.id_is_verified) ? (
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
                      ) : ''}
                    </div>
                  </TableCell>
                  {/* Requested Service */}
                  <TableCell>{row?.service}</TableCell>
                  {/* Additional Hours */}
                  <TableCell>{row?.extra_hours}h</TableCell>
                  {/* Amount */}
                  <TableCell>${row?.additional_payment}</TableCell>
                  {/* Status */}
                  <TableCell>
                    <div
                      className={`${getstatusBackgroundColor(
                        row?.status
                      )} py-2 px-4 rounded-[32px] w-fit capitalize`}
                    >
                      {row?.status}
                    </div>
                  </TableCell>
                  {/* Event Date */}
                  <TableCell>{row?.event_date}</TableCell>
                  {/* Actions */}
                  <TableCell>
                    {row?.status !== "accepted" &&
                    row?.status !== "rejected" ? (
                      <div className=" flex flex-row items-center gap-2">
                        <Link
                          href={`/events/detail/${row?.job_id}/payment-request`}
                          className={`cursor-pointer border border-1 border-[#0C9000] rounded-[4px] bg-[#EAFDE7] p-2`}
                        >
                          <p className="text-[#0C9000] font-[400] text-[14px] leading-[21px]">
                            Pay Now
                          </p>
                        </Link>
                      </div>
                    ) : (
                      <p>-</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

const getstatusBackgroundColor = (status) => {
  if (status === "accepted") {
    return "bg-[#EAFDE7] border-[#0C9000] text-[#0C9000]";
  } else if (status === "rejected") {
    return "bg-[#FFEBEB] border-[#C20000] text-[#C20000]";
  } else {
    return "bg-[#E7F4FD] border-[#0076E6] text-[#0076E6]";
  }
};

export default Page;
