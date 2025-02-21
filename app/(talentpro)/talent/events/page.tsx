"use client";
import { Suspense, useEffect, useState } from "react";
import { EventTabs } from "@/app/_components/(mobile-version)/talentpro/EventTabs";
import MobileNavbar from "@/app/_components/mobile/MobileNavbar";
import useIsMobile from "@/app/lib/hooks/useMobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MyEventsDesktop from "./MyEventsDekstop";
import MyEventsMobile from "./MyEventsMobile";
import UpcomingEventsMobile from "./UpcommingEventsMobile";

const PageContent = () => {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [upcomingEventCount, setUpcomingEventCount] = useState(0);
    const [myEventCount, setMyEventCount] = useState(0);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isMobile = useIsMobile();

    useEffect(() => {
        const tab = searchParams.get('tab');
        setActiveTab(tab || 'upcoming');
    }, [pathname, searchParams]);

    const pageTitle =
        activeTab === "upcoming"
            ? `Upcoming Events (${upcomingEventCount})`
            : `My Events (${myEventCount})`;

    if (isMobile === true) {
        return (
            <div className="flex flex-col">
                <MobileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full p-6 bg-[#F6F9FC]">
                    <div className="mt-20">
                        <div className="w-fit font-semibold text-[18px] text-[#5d0abc] pb-1 border-b-2 border-[#5d0abc]">
                            <h3>{pageTitle}</h3>
                        </div>
                        {activeTab === "upcoming" && (
                            <UpcomingEventsMobile activeTab={activeTab} setEventCount={setUpcomingEventCount} />
                        )}
                        {activeTab === "myevents" && (
                            <MyEventsMobile activeTab={activeTab} setEventCount={setMyEventCount} />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (isMobile === false) {
        return (
            <div className="mt-2 flex flex-col w-full mx-auto min-w-[1024px] max-w-[1280px] px-6">
                <MyEventsDesktop />
            </div>
        );
    }

    return null;
};

const Page = () => {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <PageContent />
        </Suspense>
    );
};

export default Page;
