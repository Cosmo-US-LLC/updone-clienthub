"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
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
    if (authData) {
      dispatch(setAuth({ token: authToken, user: JSON.parse(authData) }));
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
                    <Link href="/">My Events</Link>
                  </li>
                  {/* <li onClick={toggleMenu}>
                    <Link href="/">Payments</Link>
                  </li>
                  <li onClick={toggleMenu}>
                    <Link href="/">Settlements</Link>
                  </li>
                  <li onClick={toggleMenu}>
                    <Link href="/">Reviews</Link>
                  </li> */}
                  <li onClick={toggleMenu}>
                    <Link href="/settings">Account Settings</Link>
                  </li>
                  <li onClick={toggleMenu}>
                    <Link href="/payment-methods">Payment Methods</Link>
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
                        <SheetClose asChild>
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
                        </SheetClose>
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
