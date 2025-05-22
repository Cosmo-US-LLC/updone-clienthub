"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/lib/store/hooks";
import { apiRequest } from "@/app/lib/services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  clearAuth,
  selectAuth,
  setAuth,
} from "@/app/lib/store/features/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, Settings } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { setEventsEmpty } from "@/app/lib/store/features/eventSlice";

const NavBarData = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log("storedData", storedData);

  useEffect(() => {
    const authData = Cookies.get("authData");
    const authToken = Cookies.get("authToken");
    if (authData && JSON.parse(authData || "")) {
      dispatch(setAuth({ token: authToken, user: JSON.parse(authData || "") }));
    } else {
      // alert("Clearing auth from navbar client hub")
      dispatch(clearAuth());
      dispatch(setStaffEmpty());
      dispatch(setBookingEmpty());
      dispatch(setJobEmpty());
      dispatch(setAuthEmpty());
      dispatch(setEventsEmpty());
    }
  }, [dispatch, router]);

  // Ensure the code runs only on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    await apiRequest("/logout", {
      method: "POST",
      headers: {
        revalidate: true,
        ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
      },
      body: {},
    }).then((res) => {
      console.log(res);
      // ✅ Clear Redux Authentication & Data States
      dispatch(clearAuth());
      dispatch(setStaffEmpty());
      dispatch(setBookingEmpty());
      dispatch(setJobEmpty());
      dispatch(setAuthEmpty());
      dispatch(setEventsEmpty());

      // alert('Redux cleared')

      // ✅ Remove Authentication Cookies
      Cookies.remove("token");
      Cookies.remove("authToken");
      Cookies.remove("authData");

      // ✅ Redirect Based on Role
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/logout?status=200`);
    });
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
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
    setUserName(storedData ? storedData?.user?.name : "");
  }, []);
  return (
    <div
      className="flex items-center py-[16px] px-[32px] justify-between fixed w-full top-0 left-0"
      style={{
        background: "#7E4DE2",
      }}
    >
      <div className="flex items-center gap-2">
        <div>
          <Image
            src={"/ClienthubImage.svg"}
            alt="Updone"
            height={140}
            width={160}
            className="w-[147px] h-[36px] relative"
          />
        </div>
        <div className="px-[30px]">
          <p
            className="text-[24px] font-[300] text-[#FFF]"
            style={{ letterSpacing: "-0.96px" }}
          >
            Hello, {/* @ts-ignore */}
            <span className="font-[700]">
              {userName?.split(" ")[0]}
              {userName?.split(" ")[1]?.length > 0 &&
                userName?.split(" ")[1][0]}
              !
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="w-[158px] h-[43px] bg-[#EBE6FF] rounded-full flex items-center justify-center gap-[8px] text-[#774DFD] font-[500] text-[16px] leading-[24px]"
          style={{ letterSpacing: "-0.64px" }}
        >
          Create Booking
        </button>
        <button
          className="h-[43px] p-[16px] bg-[#7E4DE2] rounded-[999px] flex items-center justify-center gap-[8px] text-[#774DFD] font-[500] text-[16px] leading-[24px]"
          style={{ letterSpacing: "-0.64px" }}
        >
          <Image
            src={"/notificationIcon.svg"}
            alt="Updone"
            height={20}
            width={19}
            className="relative"
          />
        </button>
        <button
          className="h-[43px] p-[16px] bg-[#7E4DE2] rounded-[999px] flex items-center justify-center gap-[8px] text-[#774DFD] font-[500] text-[16px] leading-[24px]"
          style={{ letterSpacing: "-0.64px" }}
        >
          <Image
            src={"/settingsIcon.svg"}
            alt="Updone"
            height={20}
            width={19}
            className="relative"
          />
        </button>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="h-[43px] w-[137px] p-[4px] bg-[#7E4DE2] outline-none rounded-full flex items-center justify-center gap-[16px] text-[#774DFD] font-[500] text-[16px] leading-[24px]"
              style={{ letterSpacing: "-0.64px" }}
            >
              {isClient && storedData?.user?.name ? (
                <>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage
                        src={storedData?.user?.image}
                        className="h-[40px] text-[#774DFD] hover:text-[#774DFD]"
                      />
                      <AvatarFallback>
                        {`
                        ${storedData?.user?.name?.split(" ")[0][0]}${
                          storedData?.user?.name?.split(" ")?.length > 1
                            ? storedData?.user?.name?.split(" ")[1][0]
                            : ""
                        }
                    `}
                      </AvatarFallback>
                    </Avatar>
                    {/* Displaying the user's name next to the avatar */}
                    <span className="font-[600] text-[#FFF] text-[16px] leading-[24px]">
                      {storedData?.user?.name}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Skeleton className="w-10 h-10 rounded-full" />
                </>
              )}
              <ChevronDown className="w-5 h-5 text-[white]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative right-5 p-0">
              <DropdownMenuItem className="cursor-default pointer-events-none px-6">
                <div className="my-[8px] flex gap-1 items-center">
                  {isClient && storedData?.user?.name ? (
                    <>
                      <Avatar>
                        <AvatarImage src={storedData?.user?.image} />
                        <AvatarFallback>{`
                          ${storedData?.user?.name?.split(" ")[0][0]}${
                          storedData?.user?.name?.split(" ").length > 1
                            ? storedData?.user?.name?.split(" ")[1][0]
                            : ""
                        }`}</AvatarFallback>
                      </Avatar>
                    </>
                  ) : (
                    <>
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </>
                  )}
                  <div className="group-hover:!text-[#2C2240]">
                    <h3 className="text-[#2C2240] group-hover:text-[#2C2240] text-[16px] font-[500] leading-[19.93px] tracking-[0.316px]">
                      {storedData?.user?.name}
                    </h3>
                    <p
                      style={{ textTransform: "none" }}
                      className="text-[#6B6B6B] text-[12px] font-[400] leading-normal group-hover:text-[#2C2240]"
                    >
                      {storedData?.user?.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/settings`)}
                className="hover:!bg-[#F1EEFF] max-lg:hidden duration-0 text-[#2C2240] hover:text-[#2C2240] py-[20px] px-[40px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]"
              >
                <Settings className="mr-[12px]" size={18} />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                //   onClick={() => handleLogout()}
                className="text-[#C20000] duration-0 hover:!bg-[#F1EEFF] hover:text-[#2C2240] py-[20px] px-[40px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]"
              >
                <FiLogOut className="mr-[12px]" size={18} /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBarData;
