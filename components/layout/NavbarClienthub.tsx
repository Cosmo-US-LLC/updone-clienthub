"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { IoCaretDownSharp } from "react-icons/io5";
import { useAppSelector } from "@/app/lib/store/hooks";
import {
  clearAuth,
  selectAuth,
  setAuth,
} from "@/app/lib/store/features/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { ChevronDown, Settings, SquareArrowOutUpLeft } from "lucide-react";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { FiLogOut } from "react-icons/fi";
import { PiHandCoins, PiUserLight } from "react-icons/pi";
import Link from "next/link";
import { apiRequest } from "@/app/lib/services";
import { SidebarTrigger } from "../ui/sidebar";
import {
  Sheet,
  SheetClose,
  //   SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuLogOut } from "react-icons/lu";
import { BsPlusLg } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePayment, MdOutlineReviews } from "react-icons/md";
import { IoIosStarOutline } from "react-icons/io";

function NavbarClienthub() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isComingAccordionOpen, setIsComingAccordionOpen] = useState(true);

  const user = storedData?.user;
  const token = storedData?.token;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(!isOpen);
  };
  const toggleComingAccordion = () =>
    setIsComingAccordionOpen(!isComingAccordionOpen);

  useEffect(() => {
    const authData = Cookies.get("authData");
    const authToken = Cookies.get("authToken");
    if (JSON.parse(authData || "")) {
      dispatch(setAuth({ token: authToken, user: JSON.parse(authData || "") }));
    } else {
      // alert("Clearing auth from navbar client hub")
      dispatch(clearAuth());
      dispatch(setStaffEmpty());
      dispatch(setBookingEmpty());
      dispatch(setJobEmpty());
      dispatch(setAuthEmpty());
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

      // alert('Redux cleared')

      // ✅ Remove Authentication Cookies
      Cookies.remove("token");
      Cookies.remove("authToken");
      Cookies.remove("authData");

      // ✅ Redirect Based on Role
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/logout?status=200`);
    });
  };

  return (
    <header className="bg-white min-h-[65px] flex items-center shadow-md">
      <nav className="md:px-8 h-full w-full flex justify-end items-center">
        <div className="lg:hidden flex items-center justify-between z-[100] bg-[#fff] fixed w-full px-[24px] h-[65px]">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger onClick={toggleMenu} className="relative z-[70]">
              <Image
                src={"/images/hamburger.png"}
                alt="ham"
                width={32}
                height={32}
                className={`transition-transform duration-500 ease-in-out ${
                  isOpen ? "scale-x-[-1]" : "scale-x-[1]"
                }`}
              />
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="fixed bottom-0 z-[50] w-[80%] mt-[65px] h-full max-h-[calc(100dvh-65px)] flex flex-col bg-gray-50 overflow-y-auto"
            >
              <SheetHeader hidden>
                <SheetTitle hidden></SheetTitle>
                <SheetDescription hidden></SheetDescription>
              </SheetHeader>
              <div className="grow px-2 flex flex-col justify-between">
                <ul className="list-none space-y-6">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/add-job/location?client=true`}
                  >
                    <button className="bg-[#350abc] text-white rounded-full px-4 py-2 font-semibold">
                      {user && user?.role_id == 3
                        ? "Go to Talent Pro"
                        : "Book a Talent Now"}
                    </button>
                  </Link>

                  <li onClick={toggleMenu}>
                    <Link href="/" className={`flex items-center gap-3 ml-2 ${(pathname == "/" || pathname?.includes("/events")) ? "text-[#774dfd] font-[500]" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path></svg>
                        <span>My Events</span>
                    </Link>
                  </li>
                  
                  <li onClick={toggleMenu}>
                    <Link href="/payments" className={`flex items-center gap-3 ml-2 ${(pathname?.includes("/payments")) ? "text-[#774dfd] font-[500]" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"></path></svg>
                        <span>Payments</span>
                    </Link>
                  </li>
                  
                  <li onClick={toggleMenu}>
                    <Link href="/settlements" className={`flex items-center gap-3 ml-2 ${(pathname?.includes("/settlements")) ? "text-[#774dfd] font-[500]" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M230.33,141.06a24.43,24.43,0,0,0-21.24-4.23l-41.84,9.62A28,28,0,0,0,140,112H89.94a31.82,31.82,0,0,0-22.63,9.37L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9ZM164,96a36,36,0,0,0,5.9-.48,36,36,0,1,0,28.22-47A36,36,0,1,0,164,96Zm60-12a20,20,0,1,1-20-20A20,20,0,0,1,224,84ZM164,40a20,20,0,0,1,19.25,14.61,36,36,0,0,0-15,24.93A20.42,20.42,0,0,1,164,80a20,20,0,0,1,0-40Z"></path></svg>
                        <span>Settlements</span>
                    </Link>
                  </li>
                  
                  <li onClick={toggleMenu}>
                    <Link href="/settings" className={`flex items-center gap-3 ml-2 ${(pathname?.includes("/settings")) ? "text-[#774dfd] font-[500]" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path></svg>
                        <span>Account Settings</span>
                    </Link>
                  </li>

                  <li onClick={toggleMenu}>
                    <Link href="/payment-methods" className={`flex items-center gap-3 ml-2 ${(pathname?.includes("/payment-methods")) ? "text-[#774dfd] font-[500]" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"></path></svg>
                        <span>Payment Methods</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={toggleComingAccordion}
                      className="w-full flex  items-center justify-between bg-[#ececec] px-4 py-2 rounded-full text-left font-medium text-[#857E7E]"
                    >
                      <Image
                        src={"/images/comingsoon.png"}
                        alt="darrow"
                        width={20}
                        height={20}
                        className=""
                      />
                      <p className="mr-4">Coming Soon</p>
                      <Image
                        src={"/images/coming-down.svg"}
                        alt="darrow"
                        width={20}
                        height={20}
                        className={` ml-1 transition-transform duration-500 ease-in-out ${
                          isComingAccordionOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isComingAccordionOpen ? "max-h-[200px]" : "max-h-0"
                      }`}
                    >
                      <div className="mt-2 space-y-2 px-4">
                        {/* <SheetClose asChild>
                          <div className="flex">
                            <MdOutlinePayment
                              className="pt-1 h-8 w-6"
                              color="#BDBDBD"
                            />
                            <button className="text-[#929292] w-full p-2 ml-4 rounded-full text-left text-[14px]">
                              Payments
                            </button>
                          </div>
                        </SheetClose>
                        <SheetClose asChild>
                          <div className="flex">
                            <PiHandCoins
                              className="pt-1 h-8 w-6"
                              color="#BDBDBD"
                            />
                            <button className="text-[#929292] w-full p-2 ml-4 rounded-full text-left text-[14px]">
                              Settlements
                            </button>
                          </div>
                        </SheetClose> */}
                        <SheetClose asChild>
                          <div className="flex">
                            <IoIosStarOutline
                              className="pt-1 h-8 w-6"
                              color="#BDBDBD"
                            />
                            <button className="text-[#929292] w-full p-2 ml-4 rounded-full text-left text-[14px]">
                              Reviews
                            </button>
                          </div>
                        </SheetClose>
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="mt-4 space-y-8">
                  <div onClick={toggleMenu} className="-mb-4">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
                      className="pl-4 text-neutral-800 flex items-center gap-3 underline underline-offset-[2px] tracking-wide"
                    >
                      {/* text-[#774dfd] */}
                      <SquareArrowOutUpLeft className="h-4 w-4 " />
                      Go To Updone
                    </Link>
                  </div>
                  {user != false && (
                    <div className="space-y-4">
                      <div className="w-full pl-2 py-2 rounded-lg flex items-center gap-3">
                        <Avatar className="shadow">
                          <AvatarImage src={user?.profile_pic} />
                          <AvatarFallback>
                            {`
                        ${user?.name?.split(" ")[0][0]}${
                              user?.name?.split(" ")?.length > 1
                                ? user?.name?.split(" ")[1][0]
                                : ""
                            }`}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-[16px]">{user?.name}</p>
                          <p className="text-neutral-600 text-[14px] w-[180px] truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleLogout()}
                        className="w-full text-red-500 px-4 py-2 flex justify-center items-center gap-2 rounded-lg bg-red-50"
                      >
                        Logout
                        <LuLogOut className="text-red-500" />
                      </button>
                    </div>
                  )}
                  <p className="text-neutral-500 text-center text-xs">
                    Copyright &copy; 2025 Updone.
                    <br />
                    All rights reserved.
                    <br />
                    <Link
                      className="pt-1 underline"
                      href={"terms-condition"}
                      onClick={toggleMenu}
                    >
                      Terms & Conditions
                    </Link>
                    ,&nbsp;
                    <Link
                      className="pt-1 underline"
                      href={"privacy-policy"}
                      onClick={toggleMenu}
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href={"/"} className="mr-8">
            <div className="relative w-fit group-data-[collapsible=icon]:hidden">
              <p className="text-2xl font-light text-[#4A4A4A] leading-[15px]">
                Client<span className="font-medium text-[#6265F1]">Hub</span>
              </p>
              <p className="flex gap-1 w-[80px] items-center text-[12px] absolute left-[70%] whitespace-nowrap">
                by{" "}
                <span>
                  <Image
                    src={"/logo.svg"}
                    alt="Updone"
                    height={140}
                    width={160}
                    className="w-[55px] h-fit relative"
                  />
                </span>
              </p>
              <div className="h-[8px]"></div>
            </div>
          </Link>

          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/add-job/location?client=true`}
            aria-label="Add an Event"
          >
            <button
              aria-label="Add Event"
              title="Add Event"
              className="bg-[#774dfd] text-white rounded-full p-2"
            >
              <BsPlusLg size={22} />
            </button>
          </Link>
        </div>

        <div className=" flex items-center gap-3">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/`}
            className={`${
              // !scrollBackground && pathName === "/"
              `max-md:hidden mr-2 bg-white hover:text-[#5d0abc] underline underline-offset-2 rounded-full text-black !normal-case text-[14px] font-[400] transition-colors duration-50 `
              // `!ml-[22px] bg-[#EBE6FF] hover:bg-[#d7cefc] rounded-full text-[#5d0abc] !normal-case px-[20px] py-[8px] text-[14px] font-[600] leading-[150%] transition-colors duration-300 delay-150 `
            }`}
          >
            <div>Go To Updone</div>
          </Link>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/add-job/location?client=true`}
            className={`${
              // !scrollBackground && pathName === "/"
              // `!ml-[22px] bg-white hover:bg-[#EBE6FF] rounded-full  text-black  !normal-case px-[20px] py-[12px] text-[14px] font-[600] leading-[150%] transition-colors duration-300 delay-150 `
              `max-md:hidden bg-[#EBE6FF] hover:bg-[#d7cefc] rounded-full text-[#5d0abc] !normal-case px-[20px] py-[12px] text-[14px] font-[600] transition-colors duration-300`
            }`}
          >
            <div>Book a Talent Now</div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 outline-none hover:bg-white hover:text-black">
              {isClient && storedData?.user?.name ? (
                <>
                  <Avatar>
                    <AvatarImage src={storedData?.user?.image} />
                    <AvatarFallback>{`
                      ${storedData?.user?.name?.split(" ")[0][0]}${
                      storedData?.user?.name?.split(" ")?.length > 1
                        ? storedData?.user?.name?.split(" ")[1][0]
                        : ""
                    }
                    `}</AvatarFallback>
                  </Avatar>
                </>
              ) : (
                <>
                  <Skeleton className="w-10 h-10 rounded-full" />
                </>
              )}
              <ChevronDown className="w-5 h-5" />
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
                onClick={() => handleLogout()}
                className="text-[#C20000] duration-0 hover:!bg-[#F1EEFF] hover:text-[#2C2240] py-[20px] px-[40px] flex justify-start items-center !text-[14px] font-[400] leading-[24px]"
              >
                <FiLogOut className="mr-[12px]" size={18} /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

export default NavbarClienthub;
