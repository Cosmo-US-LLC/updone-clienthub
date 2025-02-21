import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
// import { decrement, increment, incrementByAmount } from "@/store/slice/counter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEvents } from "@/store/slice/events";
import { Skeleton } from "@/components/ui/skeleton";
import { MdOutlineDone } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VerificationIconMobile from "@/components/talents/VerificationIcon";
import { VerificationStatus } from "@/components/talents/VerificationStatus";

function Home() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { events, status } = useSelector((state: RootState) => state.events);

  const [userName, setUserName] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isCloseClicked, setIsCloseClicked] = useState<any>("true");

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => {
      localStorage.setItem("eventsBanner", "true");
      setIsCloseClicked("true");
    }, 500);
  };

  useEffect(() => {
    dispatch(getEvents(1));
    setIsCloseClicked(localStorage?.getItem("eventsBanner") || false);
  }, []);

  useEffect(() => {
    // fetchOffers();
    setUserName(user?.name || "");
  }, [user]);

  useEffect(() => {
    console.log(events, status);
  }, [events, status]);

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
    <div
      className={`h-full max-lg:hidden flex flex-col max-lg:px-8 max-lg:py-8`}
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
                Chat with talent before booking to ensure your event is just the
                way you want it. It's quick, easy, and hassle-free!
              </p>
              <div
                onClick={() => {
                  navigate(
                    `${import.meta.env.VITE_PUBLIC_BASE_URL}/add-event/`
                  );
                }}
                className="cursor-pointer bg-[black] rounded-full py-2 px-4 w-fit mt-4 2xl:mt-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-inner"
              >
                <p className="text-[16px] text-[white]">Book a Talent Now</p>
              </div>
            </div>

            <img
              src="/images/home/working_on_laptop_with_coffee.svg"
              height={278}
              width={498}
              alt="No Event Image"
              className="max-lg:hidden max-xl:max-h-[250px] xl:max-h-[200px] w-auto"
            />
            <img
              src="/images/home/x.svg"
              height={24}
              width={24}
              alt="cross icon"
              className="absolute top-[10px] cursor-pointer right-[21px]"
              onClick={closeBanner}
            />
          </div>
        )}
      </div>

      <Table className="grow relative">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="sticky top-0 z-10 bg-[#f6f9fc]">
          <TableRow>
            <TableHead className="w-[180px]">Title</TableHead>
            <TableHead>Event Status</TableHead>
            <TableHead>Messages</TableHead>
            <TableHead>Offers</TableHead>
            <TableHead>Talent Name</TableHead>
            <TableHead>Req. Services</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Event Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto bg-white">
          {status == "loading" ? (
            [1, 2, 3]?.map((item: any) => (
              <TableRow key={item}>
                <TableCell>
                  <Skeleton className="h-[18px] w-[140px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[24px] w-[70px] rounded-full" />
                </TableCell>
                <TableCell>
                  <div className="relative pl-2">
                    <Skeleton className="h-[32px] w-[32px]" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[16px] w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[16px] w-[55px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-[16px] w-[70px]" />
                </TableCell>
                <TableCell>
                  <span className="space-y-1.5">
                    <Skeleton className="h-[16px] w-full" />
                    <Skeleton className="h-[16px] w-[80%]" />
                  </span>
                </TableCell>
                <TableCell>
                  <div className="line-clamp-3 space-y-1.5">
                    <Skeleton className="h-[16px] w-full" />
                    <Skeleton className="h-[16px] w-[70%]" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : events?.records?.length > 0 ? (
            events?.records?.map((event: any, id: any) => (
              <TableRow
                key={id}
                onClick={() => navigate(`/event/${event?.id}`)}
                className="cursor-pointer"
              >
                <TableCell className="text-[#350ABC] max-w-[180px] truncate overflow-hidden whitespace-nowrap font-[400] text-[14px]">
                  {event?.event_title || "N/A"}
                </TableCell>
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
                      {event?.event_status && event?.event_status === "assigned"
                        ? "hired"
                        : event?.event_status}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[#350ABC]  truncate overflow-hidden whitespace-nowrap font-[400] text-[14px]">
                  <div className="relative pl-2">
                    <img
                      alt="unread-icon"
                      height={32}
                      width={32}
                      className=""
                      src="/images/home/Badge.svg"
                    />
                    {event?.unread_message_count > 0 && (
                      <span className="text-[10px] bg-[#C70101] text-white absolute flex justify-center items-center top-[-15%] left-[42%] w-[12px] m-0 h-[12px] rounded-full font-[400]">
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
                      {event?.event_total_offers === 1 ? "offer" : "offers"}
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
                          {event?.event_assigned_to?.full_name?.split(" ")
                            ?.length > 1 &&
                            event?.event_assigned_to?.full_name?.split(
                              " "
                            )[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="ml-2 text-[#2C2240] text-[14px] font-[400] whitespace-nowrap">
                        {event?.event_assigned_to?.full_name}
                      </span>
                      <div className="absolute bottom-3 left-5 ml-1 text-[#28a745] flex justify-center items-center cursor-pointer">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="hover:bg-transparent">
                              <div className=" text-white pr-4 pl-2  rounded">
                                <VerificationIconMobile
                                  id_is_verified={
                                    event?.event_assigned_to?.id_is_verified
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
          ) : (
            <TableRow>
              <TableCell>No Data Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    // <div className="h-full w-full flex items-center justify-center gap-x-4">
    //   <button
    //     onClick={() => dispatch(decrement())}
    //     disabled={count === 0}
    //     className="bg-neutral-800 text-neutral-100 text-base px-2 py-1 rounded-md"
    //   >
    //     Decrement
    //   </button>
    //   <span className="text-neutral-900 text-base border border-neutral-800 rounded-md px-2 py-1">
    //     {count}
    //   </span>
    //   <button
    //     onClick={() => dispatch(increment())}
    //     className="bg-neutral-800 text-neutral-100 text-base px-2 py-1 rounded-md"
    //   >
    //     Increment
    //   </button>
    //   <button
    //     onClick={() => dispatch(incrementByAmount(10))}
    //     className="bg-neutral-800 text-neutral-100 text-base px-2 py-1 rounded-md"
    //   >
    //     Increment by Amount
    //   </button>
    // </div>
  );
}

export default Home;
