"use client";

import MyEvents from "@/app/_components/dashboards/client/MyEvents";
import VerificationIcon from "@/app/_components/ui/shield";
import useClickOutside from "@/app/lib/hooks";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoPerson } from "react-icons/go";
import { MdOutlineDone } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// CardTable Component
const CardTable = ({
  isBannerVissible,
  headers,
  bodyData,
  isLoading,
}: {
  isBannerVissible: any;
  headers: string[];
  bodyData: any[];
  isLoading: boolean;
}) => {
  const [openMenu, setOpenMenu] = useState<{
    rowIndex: number;
    menuType: string;
  } | null>(null);
  const containerRef = useRef<HTMLTableSectionElement | any>(null);
  const router = useRouter();

  // Function to handle menu opening
  const handleMenuOpen = (rowIndex: number, menuType: string) => {
    setOpenMenu({ rowIndex, menuType });
  };

  // Function to handle menu close
  const handleMenuClose = () => {
    setOpenMenu(null);
  };

  useClickOutside(containerRef, handleMenuClose);
  const formatDateAndTime = (event_date_time: any) => {
    const formattedResults: JSX.Element[] = [];

    for (const date in event_date_time) {
      if (event_date_time.hasOwnProperty(date)) {
        const events = event_date_time[date];
        events.forEach((event: any) => {
          const startDate = new Date(`${date}T${event.start_time}`);
          const endDate = new Date(`${date}T${event.end_time}`);

          const dateOptions: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };

          const timeOptions: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
          };

          const formattedDate = startDate.toLocaleDateString(
            "en-US",
            dateOptions
          ); // E.g., Wednesday, September 4, 2024
          const formattedStartTime = startDate.toLocaleTimeString(
            "en-US",
            timeOptions
          ); // E.g., 05:00 PM
          const formattedEndTime = endDate.toLocaleTimeString(
            "en-US",
            timeOptions
          ); // E.g., 07:00 PM

          // Push JSX element with a line break between date and time
          formattedResults.push(
            <span key={date}>
              {formattedDate}
              <br />
              <span className="text-[#6B6B6B]">
                {`${formattedStartTime} - ${formattedEndTime}`}
              </span>
            </span>
          );
        });
      }
    }

    return formattedResults;
  };

  return (
    <div className="overflow-y-auto grow">
      <table className="w-full grow text-left !overflow-y-auto">
        <thead
          ref={containerRef}
          className="sticky h-[50px] bg-[#F6F9FC] border-b-[1px] border-[#ebe6ff] -top-[2px] z-10"
        >
          <tr className="">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className={`py-[8px] text-[#2C2240] text-[14px] font-[600] 
                    ${
                      header === "Title"
                        ? "xl:pl-4 2xl:pl-6 3xl:pl-8"
                        : header === "Event Status"
                        ? "xl:pl-6 2xl:pl-20 3xl:pl-40"
                        : header === "Messages"
                        ? "xl:pl-6 2xl:pl-8 3xl:pl-16"
                        : header === "Offers"
                        ? " xl:pl-6 2xl:pl-8 3xl:pl-16"
                        : header === "Talent Name"
                        ? "xl:pl-8 2xl:pl-10 3xl:pl-16"
                        : header === "Req. Services"
                        ? "xl:pl-0 2xl:pl-1"
                        : header === "Date & Time"
                        ? "xl:pl-6 2xl:pl-6"
                        : header === "Event Location"
                        ? " xl:pl-6 3xl:pl-2"
                        : ""
                    }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="relative overflow-y-auto">
          {
            isLoading
              ? [1, 2, 3]?.map((item) => (
                  <tr
                    key={item}
                    style={{ height: "80px" }}
                    className="bg-white cursor-pointer hover:bg-gray-50 border-b-[6px] border-[#F6F9FC] "
                  >
                    {/* Event Title */}
                    <td className="pl-2 2xl:pl-4 3xl:pl-8 text-[#350ABC] max-w-[180px] truncate overflow-hidden whitespace-nowrap font-[400] text-[14px]">
                      <Skeleton className="h-[18px] w-[140px]" />
                    </td>

                    {/* Event Status */}
                    <td className="xl:pl-6 2xl:pl-20 3xl:pl-40 text-[#2C2240] text-[14px] font-[400]">
                      <Skeleton className="h-[24px] w-[70px] rounded-full" />
                    </td>
                    {/* Unread */}
                    <td className="xl:pl-6 2xl:pl-8 3xl:pl-16 text-[#350ABC]  truncate overflow-hidden whitespace-nowrap font-[400] text-[14px]">
                      <div className="relative pl-2">
                        <Skeleton className="h-[32px] w-[32px]" />
                      </div>
                    </td>

                    <td className="xl:pl-6 2xl:pl-8 3xl:pl-16 text-[#2C2240] text-[14px] font-[400]">
                      <Skeleton className="h-[16px] w-full" />
                    </td>

                    {/* Assigned To */}
                    <td className="xl:pl-8 2xl:pl-10 3xl:pl-16 h-[75px] flex flex-row items-center gap-2">
                      {/* <Skeleton className="h-[35px] w-[35px] rounded-full" /> */}
                      <Skeleton className="h-[16px] w-[55px]" />
                    </td>

                    {/* Requested Services */}
                    <td className="xl:pl-0 2xl:pl-2 text-[#2C2240] text-[14px] font-[400]">
                      <Skeleton className="h-[16px] w-[70px]" />
                    </td>

                    {/* Date & Time */}
                    <td className="pl-6 ">
                      <span className="space-y-1.5">
                        <Skeleton className="h-[16px] w-full" />
                        <Skeleton className="h-[16px] w-[80%]" />
                      </span>
                    </td>

                    {/* Location */}
                    <td className=" xl:pl-6 3xl:pl-2 text-[#2C2240] text-[14px] font-[400] w-[15%]">
                      <div className="line-clamp-3 space-y-1.5">
                        <Skeleton className="h-[16px] w-full" />
                        <Skeleton className="h-[16px] w-[70%]" />
                      </div>
                    </td>
                  </tr>
                ))
              : bodyData?.length > 0 && (
                  <>
                    {bodyData?.map((row, index) => (
                      <tr
                        style={{ height: "80px" }} // Set row height explicitly
                        key={index}
                        onClick={() => {
                          router.push(`events/detail/${row.id}`);
                        }}
                        className="bg-white cursor-pointer hover:bg-gray-50 border-b-[6px] border-[#F6F9FC] space-x-2"
                      >
                        {/* Event Title */}
                        <td className="pl-4 2xl:pl-4 3xl:pl-8 text-[#350ABC] max-w-[180px] truncate overflow-hidden whitespace-nowrap font-[400] text-[14px]">
                          {row?.event_title}
                        </td>

                        {/* Event Status */}
                        <td className="xl:pl-6 2xl:pl-20 3xl:pl-40 text-[#2C2240] text-[14px] font-[400]">
                          <div className="flex gap-2">
                            <div
                              className={`rounded-[32px] px-2 py-1 flex justify-center items-center gap-1 text-sm font-medium  ${
                                row?.event_status === "assigned"
                                  ? "bg-[#EAFDE7] border-[#0C9000] text-[#0C9000] px-4"
                                  : row?.event_status === "open"
                                  ? "bg-[#E7F4FD] border-[#0076E6] text-[#0076E6] px-4"
                                  : "bg-[#FFEBEB] border-[#C20000] text-[#C20000] px-4"
                              }`}
                            >
                              {row?.event_status !== "open" ? (
                                <MdOutlineDone size={22} />
                              ) : (
                                ""
                              )}
                              {row?.event_status &&
                              row?.event_status === "assigned"
                                ? "hired"
                                : row?.event_status}
                            </div>
                          </div>
                        </td>
                        {/* Unread */}
                        <td className="xl:pl-6 2xl:pl-8 3xl:pl-16 text-[#350ABC]  truncate overflow-hidden whitespace-nowrap font-[400] text-[14px]">
                          <div className="relative pl-2">
                            <Image
                              alt="unread-icon"
                              height={32}
                              quality={100}
                              width={32}
                              className=""
                              src="/images/client-portal/all-events/Badge.svg"
                            />
                            {row?.unread_message_count > 0 && (
                              <span className="text-[10px] bg-[#C70101] text-white absolute flex justify-center items-center top-[-15%] left-[42%] w-[12px] m-0 h-[12px] rounded-full font-[400]">
                                {row?.unread_message_count}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="xl:pl-6 2xl:pl-8 3xl:pl-16 text-[#2C2240] text-[14px] font-[400]">
                          {
                            <div
                              className="flex items-center gap-1 text-[12px] text-[#350ABC]"
                              style={{ width: "max-content" }}
                            >
                              <GoPerson size={14} />{" "}
                              <span>
                                {row?.event_total_offers === 0
                                  ? "No"
                                  : row?.event_total_offers}{" "}
                                {row?.event_total_offers === 1
                                  ? "offer"
                                  : "offers"}
                              </span>
                            </div>
                          }
                        </td>

                        {/* Assigned To */}
                        <td
                          className=" xl:pl-8 2xl:pl-10 3xl:pl-16 flex items-center"
                          style={{ width: "max-content" }}
                        >
                          {row?.event_status === "assigned" ||
                          row?.event_status === "completed" ? (
                            <div className="flex flex-row items-center h-[80px] relative">
                              <Avatar className="w-[50px] h-[50px]">
                                <AvatarImage
                                  src={row?.event_assigned_to?.profile_pic}
                                />
                                <AvatarFallback>
                                  {row?.event_assigned_to?.full_name[0]}
                                  {row?.event_assigned_to?.full_name?.split(" ")
                                    ?.length > 1 &&
                                    row?.event_assigned_to?.full_name?.split(
                                      " "
                                    )[1][0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="ml-2 text-[#2C2240] text-[14px] font-[400]">
                                {row?.event_assigned_to?.full_name}
                              </span>
                              <div
                                // onClick={() => handleMenuOpen(index, "verified")}
                                className="absolute bottom-3 left-5 ml-1 text-[#28a745] flex justify-center items-center cursor-pointer"
                              >
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="hover:bg-transparent">
                                      <div className=" text-white pr-4 pl-2  rounded">
                                        <VerificationIcon
                                          id_is_verified={
                                            row?.event_assigned_to
                                              ?.id_is_verified
                                          }
                                          contact_is_verified={
                                            row?.event_assigned_to
                                              ?.contact_is_verified
                                          }
                                          height={23}
                                          width={23}
                                        />
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="bottom"
                                      className="z-40"
                                    >
                                      <VerificationStatus
                                        id_is_verified={
                                          row?.event_assigned_to?.id_is_verified
                                        }
                                        contact_is_verified={
                                          row?.event_assigned_to
                                            ?.contact_is_verified
                                        }
                                      />
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                {openMenu?.rowIndex === index &&
                                  openMenu?.menuType === "verified" && (
                                    <div
                                      style={{
                                        boxShadow:
                                          "0px 8px 26px 0px rgba(0, 0, 0, 0.12)",
                                      }}
                                      className={`right-[-15px] absolute flex flex-col gap-2 ${
                                        index === 0 ? "" : "top-[-100px]"
                                      } w-[250px] bg-[#FFF] shadow-md p-4 rounded-[4px] z-10`}
                                    >
                                      <div className="flex gap-2">
                                        <h4 className="font-[400] text-[#6B6B6B] text-[14px]">
                                          Phone Number
                                        </h4>
                                        {row?.event_assigned_to
                                          ?.contact_is_verified === 1 ? (
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
                                        {row?.event_assigned_to
                                          ?.id_is_verified === 1 ? (
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
                            </div>
                          ) : (
                            <div className="flex flex-row items-center h-[80px]">
                              <span className="text-[14px] font-[400] text-[#2C2240]">
                                Not Hired
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Requested Services */}
                        <td className="xl:pl-0 2xl:pl-2 text-[#2C2240] text-[14px] font-[400]">
                          {row?.event_required_service}
                        </td>

                        {/* Date & Time */}
                        <td className="xl:pl-6 3xl:pl-2 text-[#2C2240] text-[14px] font-[400]">
                          <span className="text-[14px] text-[#161616] font-[400]">
                            {formatDateAndTime(row.event_date_time)}
                          </span>
                        </td>

                        {/* Location */}
                        <td className=" xl:pl-6 3xl:pl-2 text-[#2C2240] text-[14px] font-[400] w-[15%]">
                          <p className="line-clamp-3">
                            {row?.event_location
                              ?.replace("Los Angeles, California", "")
                              ?.replace(", United States", "")}
                            {row?.event_location?.includes(
                              "Los Angeles, California"
                            ) && <span> LA, California</span>}
                          </p>
                        </td>

                        {/* Icons Section */}
                        {/* <td
                  onClick={(e) => e.stopPropagation()}
                  className="px-[1.3rem] text-[#2C2240] text-[14px] font-[400]">
                  {row.event_status === "open" ? (
                    "-"
                  ) : (
                    <div className="text-start flex space-x-4">
                      {row?.event_status !== "open" && (
                        <>
                         
                          <div className="relative">
                            <span
                              className="text-blue-500 hover:underline cursor-pointer"
                              onClick={() => handleMenuOpen(index, "email")}
                            >
                              <Image
                                alt="email-icon"
                                height={21}
                                width={20}
                                src="/images/client-portal/all-events/email.icon.svg"
                                className="group-hover:scale-120 transition-transform duration-300"
                              />
                            </span>
                            {openMenu?.rowIndex === index &&
                              openMenu?.menuType === "email" && (
                                <div
                                  style={{
                                    boxShadow:
                                      "0px 8px 26px 0px rgba(0, 0, 0, 0.12)",
                                  }}
                                  className={`w-fit-content flex justify-center items-center gap-2 right-[0px] absolute ${index === 0 ? " top-[30px]" : "top-[-80px]"
                                    } bg-[#FFF] shadow-md p-4 rounded-[4px] z-10`}
                                >
                                  <h4 className="font-[400] text-[#6B6B6B] text-[14px]">
                                    Email:
                                  </h4>
                                  <p className="text-[#161616] font-[600] text-[14px]">
                                    {row.event_assigned_to.email}
                                  </p>
                                </div>
                              )}
                          </div>

                         
                          <div className="relative">
                            <span
                              className="text-blue-500 hover:underline cursor-pointer"
                              onClick={() => handleMenuOpen(index, "phone")}
                            >
                              <Image
                                alt="phone-icon"
                                height={21}
                                width={20}
                                src="/images/client-portal/all-events/phone.icon.svg"
                                className="group-hover:scale-110 transition-transform duration-300"
                              />
                            </span>
                            {openMenu?.rowIndex === index &&
                              openMenu?.menuType === "phone" && (
                                <div
                                  style={{
                                    boxShadow:
                                      "0px 8px 26px 0px rgba(0, 0, 0, 0.12)",
                                  }}
                                  className={`right-[0px] min-w-[200px] max-w-[600px] justify-between items-center flex gap-2 absolute ${index === 0 ? "top-[30px]" : "top-[-60px]"
                                    } w-fit-content bg-[#FFF] shadow-md p-4 rounded-[4px] z-10`}
                                >
                                  <h4 className="font-[400] text-[#6B6B6B] text-[14px]">
                                    Phone:
                                  </h4>
                                  <p className="text-[#161616] font-[600] text-[14px]">
                                    {row.event_assigned_to.contact_number}
                                  </p>
                                </div>
                              )}
                          </div>
                        </>
                      )}

                    
                      <div className="relative">
                        <span
                          className="group text-blue-500 hover:underline cursor-pointer"
                          onClick={() => handleMenuOpen(index, "dollar")}
                        >
                          <Image
                            alt="dollar-icon"
                            height={21}
                            width={20}
                            src="/images/client-portal/all-events/dollar.icon.svg"
                            className="group-hover:scale-110 transition-transform duration-300"
                          />
                        </span>
                        {openMenu?.rowIndex === index &&
                          openMenu?.menuType === "dollar" && (
                            <div
                              style={{
                                boxShadow:
                                  "0px 8px 26px 0px rgba(0, 0, 0, 0.12)",
                              }}
                              className={`right-[15px] justify-center items-center absolute flex flex-col gap-2 ${index === 0
                                ? "top-[30px]"
                                : row?.event_settlement_amount === null
                                  ? "top-[-60px]"
                                  : "top-[-100px]"
                                } right-[-30px] w-[190px] bg-[#FFF] shadow-md py-4 px-2 rounded-[4px] z-10`}
                            >
                              <div className="flex justify-between items-center gap-2">
                                <h4 className="font-[400] text-[#6B6B6B] text-[14px]">
                                  Initial Amount:
                                </h4>
                                <p className="text-[#1616161] font-[600] text-[14px]">
                                  ${row?.event_initial_amount}
                                </p>
                              </div>
                              {row?.event_settlement_amount !== null && (
                                <hr className="border-t border-gray-200 my-0" />
                              )}
                              {row?.event_settlement_amount !== null && (
                                <div className="flex gap-2">
                                  <h4 className="font-[400] text-[#6B6B6B] text-[14px]">
                                    Settlement Amount:
                                  </h4>
                                  <p className="text-[#161616] font-[600] text-[14px]">
                                    ${row?.event_settlement_amount}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </td> */}
                      </tr>
                    ))}
                  </>
                )
            //  : (
            //   <td className="h-fit overflow-y-auto">
            //     <MyEvents />
            //   </td>
            // )
          }
        </tbody>
      </table>
    </div>
  );
};

// Headers
const headers = [
  "Title",
  "Event Status",
  "Messages",
  "Offers",
  "Talent Name",
  "Req. Services",
  "Date & Time",
  "Event Location",
];

const DynamicCardTablePage = () => {
  const [eventData, setGetEventData] = useState(null);
  const [userName, setUserName] = useState("");
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isCloseClicked, setIsCloseClicked] = useState<any>("true");
  const router = useRouter();

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem("eventsBanner", "true");
      setIsCloseClicked("true");
    }, 500);
  };

  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      console.log(storedData)
      const response = await apiRequest("/client/events", {
        method: "POST",
        headers: {
          revalidate: true,
          ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
        },
        body: {
          page_number: 1,
          page_size: 100,
        },
      });
      setGetEventData(response?.records);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsCloseClicked(localStorage?.getItem("eventsBanner") || false);
  }, []);

  useEffect(() => {
    fetchOffers();
    setUserName(storedData ? storedData?.user?.name : "");
  }, []);

  if (!userName)
    return (
      <div className="h-[50svh]">
        <Loader />
      </div>
    );

  return (
    <>
      <div
        className={`max-h-[calc(100vh-120px)] max-lg:hidden flex flex-col max-lg:px-8 max-lg:py-8`}
      >
        <div className="mt-2 h-fit">
          <p className="font-medium text-[20px] mb-2">
            Welcome Back, {/* @ts-ignore */}
            {userName?.split(" ")[0]}&nbsp;
            {userName?.split(" ")[1]?.length > 0 && userName?.split(" ")[1][0]}
          </p>
          {!isCloseClicked && (
            <div
              className={`relative w-full h-fit max-h-[290px] flex flex-row items-center rounded-[12px] justify-between bg-[white] px-5 py-4 
                transition-all duration-500 ease-in-out transform ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
            >
              <div className="flex flex-col lg:w-[50%] self-start">
                <div className="bg-[#774DFD] px-3 py-1 w-fit rounded-[8px] mb-3">
                  <p className="text-[14px] text-[white]">What's New</p>
                </div>
                <p className="text-[22px] font-[500] mb-2">
                  Start Communicating with Talent Effortlessly!
                </p>
                <p className="text-[#4C4B4B] text-[14px]">
                  Chat with talent before booking to ensure your event is just
                  the way you want it. It's quick, easy, and hassle-free!
                </p>
                <div
                  onClick={() => {
                    router.push(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/add-job?step=event-location`
                    );
                  }}
                  className="cursor-pointer bg-[black] rounded-full py-2 px-4 w-fit mt-4 2xl:mt-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-inner"
                >
                  <p className="text-[16px] text-[white]">Book a Talent Now</p>
                </div>
              </div>

              <Image
                src="/images/client-portal/working_on_laptop_with_coffee.svg"
                height={278}
                width={498}
                alt="No Event Image"
                priority={true}
                quality={100}
                layout="intrinsic"
                className="max-lg:hidden max-xl:max-h-[250px] xl:max-h-[200px] w-auto"
              />
              <Image
                src="/images/client-portal/all-events/x.svg"
                height={24}
                width={24}
                alt="cross icon"
                priority={true}
                quality={100}
                layout="intrinsic"
                className="absolute top-[10px] cursor-pointer right-[21px]"
                onClick={closeBanner}
              />
            </div>
          )}
        </div>
        {/* <div
          className={`grow border border-purple-500 max-lg:hidden container max-w-full mx-auto pt-6 flex flex-col justify-center`}
        >
        </div> */}
        <br />
        {/* @ts-ignore */}
        {!isLoading && eventData?.length == 0 ? (
          <div className="h-fit overflow-y-auto">
            <MyEvents />
          </div>
        ) : (
          <CardTable
            isBannerVissible={isVisible}
            headers={headers}
            bodyData={eventData || []}
            isLoading={isLoading}
          />
        )}

        <p className="lg:hidden text-[18px] pt-4 mb-2">
          ClientHub is coming soon on your cellphone!
          <br />
          <br />
          <span className="text-[16px] text-neutral-600">
            Meanwhile, you can manage your events, view offers, talk to talents,
            and hire them on desktop.
          </span>
        </p>

        <button
          onClick={() => {
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
          }}
          className="lg:hidden mt-6 items-center justify-center min-w-[250px] py-2 rounded-full bg-[#350ABC] text-white shadow-md"
        >
          Go Back to Updone
        </button>
      </div>

      <div className="lg:hidden overflow-hidden px-4">
        <p className="lg:hidden text-[18px] pt-4 mb-2">
          ClientHub is coming soon on your cellphone!
          <br />
          <br />
          <span className="text-[16px] text-neutral-600">
            Meanwhile, you can manage your events, view offers, talk to talents,
            and hire them on desktop.
          </span>
        </p>

        <button
          onClick={() => {
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
          }}
          className="lg:hidden w-fit mx-auto mt-6 items-center justify-center min-w-[250px] py-2 rounded-full bg-[#350ABC] text-white shadow-md"
        >
          Go Back to Updone
        </button>
      </div>
    </>
  );
};

export default DynamicCardTablePage;
