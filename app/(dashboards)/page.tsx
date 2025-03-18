"use client";

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
import Link from "next/link";
import RenderLoader from "../_components/ui/loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  event_title: string;
  event_status: string;
  unread_message_count: string;
  event_total_offers: string;
  event_assigned_to_name: string;
  event_assigned_to_profile_pic: string;
  event_assigned_to_contact_verified: string;
  event_assigned_to_id_verified: string;
  event_required_service: string;
  event_date_time: string;
  event_location: string;
};
import MyEvents from "@/components/events/mobile/MyEvents/page";

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
  const [eventData, setGetEventData] = useState([]);
  const [eventListing, setEventListing] = useState<Payment[]>([]);
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
      console.log(storedData);
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

  const formatDateAndTime = (event_date_time: any) => {
    const formattedResults: any = [];

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
          ); 
          const formattedStartTime = startDate.toLocaleTimeString(
            "en-US",
            timeOptions
          );  
          const formattedEndTime = endDate.toLocaleTimeString(
            "en-US",
            timeOptions
          );  

         
          formattedResults.push(
            <span key={date} className="flex flex-row text-[#774DFD] gap-2 md:gap-0 md:flex-col">
              {formattedDate}
              <br className="hidden md:block"/>
              <span className="text-[#161616]">
                {`${formattedStartTime} - ${formattedEndTime}`}
              </span>
            </span>
          );
        });
      }
    }

    return formattedResults;
  };

  // Data Table Conversion
  const convertEventToPayment = (event: any): Payment => {
    console.log(event, event?.event_assigned_to)
    return {
      event_title: event?.event_title,
      event_status: event?.event_status,
      unread_message_count: event?.unread_message_count?.toString(),
      event_total_offers: event?.event_total_offers?.toString(),
      event_assigned_to_name: event?.event_assigned_to?.full_name,
      event_assigned_to_profile_pic: event?.event_assigned_to?.profile_pic,
      event_assigned_to_contact_verified: event?.event_assigned_to?.contact_is_verified.toString(),
      event_assigned_to_id_verified: event?.event_assigned_to?.id_is_verified.toString(),
      event_required_service: event?.event_required_service,
      event_date_time: formatDateAndTime(event?.event_date_time),
      event_location: event?.event_location,
    };
  };
  
  // Data Table Headers
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "event_title",
      header: "Title",
    },
    {
      accessorKey: "event_status",
      header: "Event Status",
    },
    {
      accessorKey: "unread_message_count",
      header: "Messages",
    },
  ];

  // event_title: string;
  // event_status: string;
  // unread_message_count: string;
  // event_total_offers: string;
  // event_assigned_to_name: string;
  // event_assigned_to_profile_pic: string;
  // event_assigned_to_contact_verified: string;
  // event_assigned_to_id_verified: string;
  // event_required_service: string;
  // event_date_time: string;
  // event_location: string;

  // console.log(eventListing)

  if (!userName) {
    return (
      <div className="h-[50svh]">
        <RenderLoader />
      </div>
    );
  }

  return (
    <>
      <div
        className={`max-h-[calc(100vh-120px)] max-lg:hidden flex flex-col max-lg:px-8 max-lg:py-8`}
      >
        <div className="my-2 h-fit">
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
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/add-job/location`}
                  className="cursor-pointer bg-[black] rounded-full py-2 px-4 w-fit mt-4 2xl:mt-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-inner"
                >
                  <p className="text-[16px] text-[white]">Book a Talent Now</p>
                </Link>
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

        {!isLoading && eventData?.length === 0 ? (
          <div className="text-center py-10 w-full h-fit !bg-[#f6f9fc]">
            <div className="flex flex-col justify-center items-center">
              <div className="text-center pb-[48px]">
                <h1 className="text-[48px] font-[400] tracking-[-1.28px] leading-normal text-[#000000]">
                  Lets find a{" "}
                  <span className="bg-[#350ABC] rounded-[4px] text-[#FFF] px-3">
                    TALENT
                  </span>
                </h1>
                <p className="text-[32px] font-[400] tracking-[-1.28px] leading-normal text-[#000000]">
                  for your upcoming event or project
                </p>
              </div>
              <Image
                src="/images/client-portal/no event creative image.webp"
                height={400}
                width={400}
                alt="No Event Image"
                priority={true}
                quality={100}
                layout="intrinsic"
              />
              <button
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/add-job/location`
                  )
                }
                className="mt-[40px] bg-[#774DFD] py-[16px] text-[#F3F0FF] text-[18px] leading-[30px] flex justify-center items-center gap-2 tracking-[ -0.36px] font-[400] px-[24px] rounded-[4px]"
              >
                Post your first event{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <path
                      d="M4.86523 10.3691H16.136"
                      stroke="#F3F0FF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 4.73389L16.1354 10.3693L10.5 16.0047"
                      stroke="#F3F0FF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ) : (
          <Table className="grow relative">
            <TableHeader className="sticky top-0 z-10 bg-[#f6f9fc]">
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Event Status</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead>Talent Name</TableHead>
                <TableHead>Req. Services</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead className="w-[240px]">Event Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto bg-white">
              {
                isLoading
                  ? [1, 2, 3]?.map((item: any) => (
                      <TableRow key={item} className="!py-2">
                        <TableCell className="py-4">
                          <Skeleton className="h-[18px] w-[140px]" />
                        </TableCell>
                        <TableCell className="py-4">
                          <Skeleton className="h-[24px] w-[70px] rounded-full" />
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="relative pl-2">
                            <Skeleton className="h-[32px] w-[32px]" />
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Skeleton className="h-[16px] w-full" />
                        </TableCell>
                        <TableCell className="py-4">
                          <Skeleton className="h-[16px] w-[55px]" />
                        </TableCell>
                        <TableCell className="py-4">
                          <Skeleton className="h-[16px] w-[70px]" />
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="space-y-1.5">
                            <Skeleton className="h-[16px] w-full" />
                            <Skeleton className="h-[16px] w-[80%]" />
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="line-clamp-3 space-y-1.5">
                            <Skeleton className="h-[16px] w-full" />
                            <Skeleton className="h-[16px] w-[70%]" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : eventData?.length > 0 &&
                    eventData?.map((event: any, id: any) => (
                      <TableRow
                        key={id}
                        onClick={() =>
                          router.push(`/events/detail/${event?.id}`)
                        }
                        className="cursor-pointer"
                      >
                        {/* Event Title */}
                        <TableCell className="text-[#350ABC] max-w-[180px] truncate overflow-hidden whitespace-nowrap font-[400] text-[14px]">
                          {event?.event_title || "N/A"}
                        </TableCell>
                        {/* Event Status */}
                        <TableCell className="text-[#2C2240] text-[14px] font-[400] capitalize">
                          <div className="flex gap-2">
                            <div
                              className={`rounded-[32px] px-2 py-1 flex justify-center items-center gap-1 text-sm font-medium  ${
                                event?.event_status === "assigned"
                                  ? "bg-[#EAFDE7] border-[#0C9000] text-[#0C9000] px-4"
                                  : event?.event_status === "open"
                                  ? "bg-[#E7F4FD] border-[#0076E6] text-[#0076E6] px-4"
                                  : "bg-[#FFEBEB] border-[#C20000] text-[#C20000] px-4"
                              }`}
                            >
                              {event?.event_status !== "open" ? (
                                <MdOutlineDone size={22} />
                              ) : (
                                ""
                              )}
                              {event?.event_status &&
                              event?.event_status === "assigned"
                                ? "hired"
                                : event?.event_status}
                            </div>
                          </div>
                        </TableCell>
                        {/* Messages */}
                        <TableCell className="text-[#350ABC]  truncate overflow-hidden whitespace-nowrap font-[400] text-[14px]">
                          <div className="relative pl-2">
                            <img
                              alt="unread-icon"
                              height={32}
                              width={32}
                              className=""
                              src="/images/client-portal/all-events/Badge.svg"
                            />
                            {event?.unread_message_count > 0 && (
                              <span className="text-[10px] bg-[#C70101] text-white absolute flex justify-center items-center top-[-15%] left-[34px] w-[12px] m-0 h-[12px] rounded-full font-[400]">
                                {event?.unread_message_count}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-[#2C2240] text-[14px] font-[400]">
                          <div
                            className="flex items-center gap-1 text-[12px] text-[#350ABC]"
                            style={{ width: "max-content" }}
                          >
                            <GoPerson size={14} />{" "}
                            <span>
                              {event?.event_total_offers === 0
                                ? "No"
                                : event?.event_total_offers}{" "}
                              {event?.event_total_offers === 1
                                ? "offer"
                                : "offers"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {event?.event_status === "assigned" ||
                          event?.event_status === "completed" ? (
                            <div className="flex flex-row items-center h-[80px] relative">
                              <Avatar className="w-[50px] h-[50px]">
                                <AvatarImage
                                  src={event?.event_assigned_to?.profile_pic}
                                  className="object-cover"
                                />
                                <AvatarFallback>
                                  {event?.event_assigned_to?.full_name[0]}
                                  {event?.event_assigned_to?.full_name?.split(
                                    " "
                                  )?.length > 1 &&
                                    event?.event_assigned_to?.full_name?.split(
                                      " "
                                    )[1][0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="ml-2 text-[#2C2240] text-[14px] font-[400] whitespace-nowrap">
                                {event?.event_assigned_to?.full_name}
                              </span>
                              <div className="absolute bottom-3 left-5 ml-1 text-[#28a745] flex justify-center items-center cursor-pointer">
                              {(event?.event_assigned_to?.id_is_verified && event?.event_assigned_to?.id_is_verified) ? (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="hover:bg-transparent">
                                      <div className=" text-white pr-4 pl-2  rounded">
                                        <VerificationIconMobile
                                          id_is_verified={
                                            event?.event_assigned_to
                                              ?.id_is_verified
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
                                    <TooltipContent
                                      side="bottom"
                                      className="z-40"
                                    >
                                      <VerificationStatus
                                        id_is_verified={
                                          event?.event_assigned_to
                                            ?.id_is_verified
                                        }
                                        contact_is_verified={
                                          event?.event_assigned_to
                                            ?.contact_is_verified
                                        }
                                      />
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ) : ''}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-row items-center h-[80px]">
                              <span className="text-[14px] font-[400] text-[#2C2240]">
                                Not Hired
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-[#2C2240] text-[14px] font-[400]">
                          {event?.event_required_service}
                        </TableCell>
                        <TableCell>
                          <span className="text-[14px] text-[#161616] font-[400] whitespace-nowrap">
                            {formatDateAndTime(event.event_date_time)}
                          </span>
                        </TableCell>
                        <TableCell className="text-[#2C2240] text-[14px] font-[400]">
                          <p className="line-clamp-3">
                            {event?.event_location
                              ?.replace("Los Angeles, California", "")
                              ?.replace(", United States", "")}
                            {event?.event_location?.includes(
                              "Los Angeles, California"
                            ) && <span> LA, California</span>}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))
                // ) : (
                //   <TableRow>
                //     <TableCell
                //       colSpan={8}
                //       className="text-center py-10 h-full min-h-fit !bg-[#f6f9fc]"
                //     >
                //       <div className="flex flex-col justify-center items-center">
                //         <div className="text-center pb-[48px]">
                //           <h1 className="text-[48px] font-[400] tracking-[-1.28px] leading-normal text-[#000000]">
                //             Lets find a{" "}
                //             <span className="bg-[#350ABC] rounded-[4px] text-[#FFF] px-3">
                //               TALENT
                //             </span>
                //           </h1>
                //           <p className="text-[32px] font-[400] tracking-[-1.28px] leading-normal text-[#000000]">
                //             for your upcoming event or project
                //           </p>
                //         </div>
                //         <Image
                //           src="/images/client-portal/no event creative image.webp"
                //           height={400}
                //           width={400}
                //           alt="No Event Image"
                //           priority={true}
                //           quality={100}
                //           layout="intrinsic"
                //         />
                //         <button
                //           onClick={() =>
                //             router.push(
                //               `${process.env.NEXT_PUBLIC_BASE_URL}/add-job?step=event-location`
                //             )
                //           }
                //           className="mt-[40px] bg-[#774DFD] py-[16px] text-[#F3F0FF] text-[18px] leading-[30px] flex justify-center items-center gap-2 tracking-[ -0.36px] font-[400] px-[24px] rounded-[4px]"
                //         >
                //           Post your first event{" "}
                //           <span>
                //             <svg
                //               xmlns="http://www.w3.org/2000/svg"
                //               width="21"
                //               height="21"
                //               viewBox="0 0 21 21"
                //               fill="none"
                //             >
                //               <path
                //                 d="M4.86523 10.3691H16.136"
                //                 stroke="#F3F0FF"
                //                 strokeLinecap="round"
                //                 strokeLinejoin="round"
                //               />
                //               <path
                //                 d="M10.5 4.73389L16.1354 10.3693L10.5 16.0047"
                //                 stroke="#F3F0FF"
                //                 strokeLinecap="round"
                //                 strokeLinejoin="round"
                //               />
                //             </svg>
                //           </span>
                //         </button>
                //       </div>
                //     </TableCell>
                //   </TableRow>
              }
            </TableBody>
          </Table>
        )}
      </div>

      <div className="lg:hidden overflow-hidden">
        <MyEvents isLoading={isLoading} eventData={eventData} formatDateAndTime={formatDateAndTime} />
      </div>
    </>
  );
};

export default DynamicCardTablePage;
