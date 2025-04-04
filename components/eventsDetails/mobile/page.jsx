"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { MdOutlineEventNote, MdLocalOffer, MdGroup } from "react-icons/md";
import { PiCurrencyDollar } from "react-icons/pi";
import dynamic from "next/dynamic";
// import { setJobData, setJobId } from "@/app/lib/store/features/staffSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { apiRequest } from "@/app/lib/services";
import { ChevronLeft } from "lucide-react";

const EventDetails = dynamic(() => import("./EventDetails/page"), {
  ssr: false,
});
const Offers = dynamic(() => import("./Offers/page"), { ssr: false });
const Invites = dynamic(() => import("./Invites/page"), { ssr: false });

const Page = ({ jobId, jobData }) => {
  const { auth: storedData } = useAppSelector(selectAuth);

  // console.log("job id", jobId);
  // console.log("event details", jobData);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    if (pathname === "/eventsDetails/mobile") {
      router.replace("/eventsDetails/mobile/EventDetails");
      setActiveTab("Event Details");
    }
  }, [pathname]);

  // Offers Tab Data
  const offerSort = "latest";
  const [offersData, setOffersData] = useState([]);
  const [offersLoading, setOffersLoading] = useState(true);
  const GetOffers = async () => {
    setOffersLoading(true);
    try {
      const response = await apiRequest(`/invitation/fetchOffers`, {
        method: "POST",
        headers: {
          revalidate: true,
          ...(storedData && {
            Authorization: `Bearer ${storedData.token}`,
          }),
        },
        body: {
          job_id: jobData?.id,
          sort_by: offerSort == "latest" ? "" : offerSort,
        },
      });

      if (response?.offers) {
        // console.log(response?.offers);
        setOffersData(response?.offers);
        if (jobData?.status === "assigned" || jobData?.status === "completed") {
          const currentInviteId = jobData?.invite?.id;
          response?.offers?.forEach((offer) => {
            if (offer?.invite_id === currentInviteId) {
              setSelectedOffer(offer);
            }
          });
        }
      } else {
        console.error("Unexpected data format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setOffersLoading(false);
    }
  };

  // Invites Tab Data
  const [invitesData, setInvitesData] = useState([]);
  const [invitesLoading, setInvitesLoading] = useState(true);
  const [selectedInvite, setSelectedInvite] = useState(true);
  const GetInvites = async () => {
    setInvitesLoading(true);
    try {
      const response = await apiRequest(`/job/${jobData?.id}/invites`, {
        method: "GET",
        headers: {
          revalidate: true,
          ...(storedData && {
            Authorization: `Bearer ${storedData.token}`,
          }),
        },
      });

      if (response) {
        // console.log(response);
        setInvitesData(response);
        if (jobData?.status === "assigned" || jobData?.status === "completed") {
          const currentInviteId = jobData?.invite?.id;
          response?.forEach((offer) => {
            if (offer?.invite_id === currentInviteId) {
              setSelectedInvite(offer);
            }
          });
        }
      } else {
        console.error("Unexpected data format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setInvitesLoading(false);
    }
  };

  // Payment Check
  const [releaseData, setReleaseData] = useState([]);
  const getJobDetailsApi = async () => {
    const body = {
      job_id: Number(jobId),
    };
    try {
      const newData = await apiRequest(`/client/payment-request`, {
        method: "POST",
        body: body,
        headers: {
          ...(storedData && {
            Authorization: `Bearer ${storedData.token}`,
          }),
        },
      });
      setReleaseData(newData);
    } catch (error) {
      console.error("following is error: ", error);
    }
  };

  useEffect(() => {
    if (jobData?.id) {
      GetOffers();
      GetInvites();
      getJobDetailsApi();
    }
  }, [jobData?.id]);

  useEffect(() => {
    if (jobData?.status === "completed") {
      getJobDetailsApi();
    }
  }, [jobData]);

  const tabs = [
    {
      name: "Event Details",
      icon: <MdOutlineEventNote className="text-lg" />,
      component: <EventDetails jobData={jobData} releaseData={releaseData} />,
    },
    {
      name: "Offers",
      icon: <PiCurrencyDollar className="text-lg" />,
      component: (
        <Offers
          jobData={jobData}
          selectedOffer={selectedOffer}
          setSelectedOffer={setSelectedOffer}
          GetOffers={GetOffers}
          offersData={offersData}
          offersLoading={offersLoading}
        />
      ),
    },
    {
      name: "Invites",
      icon: <MdGroup className="text-lg" />,
      component: (
        <Invites
          jobData={jobData}
          GetInvites={GetInvites}
          invitesData={invitesData}
          invitesLoading={invitesLoading}
        />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div className="h-dvh w-full bg-[#F6F9FC]">
      <Link
        href={"/"}
        className="text-xs text-neutral-500 flex items-center gap-2 pt-4 px-4"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to My Events
      </Link>
      <div className="flex flex-col items-center px-4 pb-4 pt-2 gap-4">
        <div className="flex items-center justify-between bg-[#FFF] rounded-full p-1 w-full shadow-sm">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-[6px] text-[14px] font-[400] text-center rounded-full transition-all whitespace-nowrap ${
                activeTab === tab.name
                  ? "bg-[#EBE6FF] text-[#774DFD] font-[500] border border-[#774DFD]"
                  : "text-[#2C2240] hover:text-purple-600"
              }`}
            >
              {activeTab === tab.name && <span>{tab.icon}</span>}
              {tab.name}&nbsp;
              {/* {index == 1 && <div className="ml-1 w-4 h-4 rounded-full bg-red-500 text-xs text-white text-center">{offersData?.length}</div>} */}
              {index == 1 && <>({offersData?.length})</>}
            </button>
          ))}
        </div>

        <div className="w-full">
          {tabs.find((tab) => tab.name === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default Page;
