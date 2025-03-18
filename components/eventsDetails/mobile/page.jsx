"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { MdOutlineEventNote, MdLocalOffer, MdGroup } from "react-icons/md";
import { PiCurrencyDollar } from "react-icons/pi";
import dynamic from "next/dynamic";
// import { setJobData, setJobId } from "@/app/lib/store/features/staffSlice";
import { useDispatch } from "react-redux";

const EventDetails = dynamic(() => import("./EventDetails/page"), {
  ssr: false,
});
const Offers = dynamic(() => import("./Offers/page"), { ssr: false });
const Invites = dynamic(() => import("./Invites/page"), { ssr: false });

const tabs = [
  {
    name: "Event Details",
    icon: <MdOutlineEventNote className="text-lg" />,
    component: <EventDetails />,
  },
  {
    name: "Offers",
    icon: <PiCurrencyDollar className="text-lg" />,
    component: <Offers />,
  },
  {
    name: "Invites",
    icon: <MdGroup className="text-lg" />,
    component: <Invites />,
  },
];

const Page = ({ jobId, jobData }) => {
  console.log("job id", jobId);
  console.log("event details", jobData);
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  useEffect(() => {
    if (pathname === "/eventsDetails/mobile") {
      router.replace("/eventsDetails/mobile/EventDetails");
      setActiveTab("Event Details");
    }
  }, [pathname]);

  return (
    <div className="flex flex-col items-center px-4 py-4 gap-4 h-dvh w-full bg-[#F6F9FC]">
      <div className="flex items-center justify-between bg-[#FFF] rounded-full p-1 w-full   shadow-sm">
        {tabs.map((tab, index) => (
          <button
            key={tab.name || index}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-5 py-[6px] text-[14px] font-[400] text-center rounded-full transition-all ${
              activeTab === tab.name
                ? "bg-[#EBE6FF] text-[#774DFD] font-[500] border border-[#774DFD]"
                : "text-[#2C2240] hover:text-purple-600"
            }`}
          >
            {activeTab === tab.name && <span>{tab.icon}</span>}
            {tab.name}
          </button>
        ))}
      </div>

      <div className="">
        {tabs.find((tab) => tab.name === activeTab)?.component}
      </div>
    </div>
  );
};

export default Page;
