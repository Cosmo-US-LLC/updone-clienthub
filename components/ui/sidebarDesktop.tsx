"use client";

import * as React from "react";
import { MapPin, Settings2 } from "lucide-react";
import { IoIosStarOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { PiCurrencyDollar, PiHandCoins, PiUsersThree } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { BiHomeAlt2 } from "react-icons/bi";
import { NavUser } from "@/components/ui/sidebar-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarTriggerArrow,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useDispatch } from "react-redux";
import { apiRequest } from "@/app/lib/services";
import { clearAuth, selectAuth } from "@/app/lib/store/features/authSlice";
import { setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import Cookies from "js-cookie";
import { Skeleton } from "./skeleton";
import { FiLogOut } from "react-icons/fi";
import { Button } from "./button";
import { BsCreditCard } from "react-icons/bs";
import { setEventsEmpty } from "@/app/lib/store/features/eventSlice";
import {
  HomeIcon,
  EventIcon,
  PaymentIcon,
  SettlementIcon,
  ReviewIcon,
} from "../../app/(dashboards)/icons";

const items = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "My Events",
    url: "/events",
    icon: EventIcon,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: PaymentIcon,
  },
  {
    title: "Settlements",
    url: "/settlements",
    icon: SettlementIcon,
  },
  {
    title: "Reviews",
    url: "/reviews",
    icon: ReviewIcon,
  },
];
const items2 = [
  {
    title: "Settings",
    url: "/settings",
    icon: IoSettingsOutline,
  },
];

export function SidebarDesktop({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { auth: storedData } = useAppSelector(selectAuth);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null); // Set initial state to null
  const [loading, setLoading] = React.useState(true); // New loading state
  const dispatch = useDispatch();
  const [logoutPath, setLogoutPath] = React.useState("/"); // New loading state
  const [isClient, setIsClient] = React.useState(false);

  // Set active link based on current pathname
  React.useEffect(() => {
    setLogoutPath(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    const findActiveIndex = () => {
      if (pathname == "/" || pathname.includes("/home")) {
        setActiveIndex(0);
      } else if (pathname.includes("/events")) {
        setActiveIndex(1);
      } else if (pathname.includes("/payments")) {
        setActiveIndex(2);
      } else if (pathname.includes("/settlements")) {
        setActiveIndex(3);
      } else if (pathname.includes("/reviews")) {
        setActiveIndex(4);
      } else if (pathname.includes("/settings")) {
        setActiveIndex(5);
      } else if (pathname.includes("/payment-methods")) {
        setActiveIndex(6);
      }
      // Check which link matches the current pathname
      // const activeLinkIndex = [...links, ...bottomLinks].findIndex((link) =>
      //   pathname.startsWith(link.path)
      // );
      // setActiveIndex(activeLinkIndex);
      setLoading(false); // Set loading to false after determining the active index
    };

    findActiveIndex();
    setIsClient(true);
  }, [pathname]);

  const handleLogout = async () => {
    await apiRequest("/logout", {
      method: "POST",
      headers: {
        revalidate: true,
        ...(storedData && { Authorization: `Bearer ${storedData?.token}` }),
      },
      body: {},
    }).then((res: any) => {
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
  return (
    <div
      className="flex flex-col w-[100px] h-full p-4"
      style={{
        background: "#7E4DE2",
      }}
    >
      <div className="flex flex-col items-center ">
        {items.map((item, index) => (
          <Link
            key={item.title}
            href={item.url}
            className={`pb-6 group flex flex-col items-center w-full ${
              activeIndex === index
                ? "rounded-xl text-[#EBE6FF] font-[700]"
                : "text-[#EBE6FF] font-[400]"
            }`}
          >
            <div
              className={`flex items-center justify-center rounded-xl ${
                activeIndex === index ? "bg-white w-12 h-12" : "bg-transparent w-8 h-8"
              }`}
            >
              <item.icon
                // @ts-ignore
                className={`w-6 h-6 ${
                  activeIndex === index ? "text-[#EBE6FF]" : "text-[#EBE6FF]"
                }`}
              />
            </div>
            <span className="text-xs bg-transparent">{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center mt-auto">
        {items2.map((item, index) => (
          <Link
            key={item.title}
            href={item.url}
            className="flex flex-col items-center w-full text-[#EBE6FF] gap-2"
          >
            <div className="flex items-center justify-center rounded-xl bg-transparent">
              <item.icon className="w-6 h-6 text-[#EBE6FF]" />
            </div>
            <span className="text-xs font-semibold">{item.title}</span>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-2 w-full text-[#EBE6FF]"
        >
          <div className="flex items-center justify-center rounded-xl bg-transparent">
            <FiLogOut className="w-6 h-6 text-[#EBE6FF]" />
          </div>
          <span className="text-xs font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
}
