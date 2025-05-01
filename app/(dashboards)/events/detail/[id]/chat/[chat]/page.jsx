"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import Loading from "@/app/loading";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
// import ChatContainer from "../../ChatContainer";
import ChatContainer from "@/components/eventsDetails/ChatContainer";
import { setOffersId } from "@/app/lib/store/features/bookingSlice";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setJobData, setJobId } from "@/app/lib/store/features/staffSlice";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { selectStaff } from "@/app/lib/store/features/staffSlice";
import { selectOfferDetailData } from "@/app/lib/store/features/bookingSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import setOfferDetailData from "@/app/lib/store/features/bookingSlice";
import { setOfferDetailsEmpty } from "@/app/lib/store/features/bookingSlice";

function page() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth: storedData } = useAppSelector(selectAuth);
  const { jobData } = useAppSelector(selectStaff);
  const offerDetailData = useAppSelector(selectOfferDetailData);
  const [chatLoad, setChatLoad] = React.useState(false);

  React.useEffect(() => {
    setChatLoad(true);
  }, []);

  function timeAgo(dateTimeString) {
    const inputDate = new Date(dateTimeString);
    const now = new Date();
    const diffMs = now - inputDate;
    
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Handle "Just now" for 0 seconds
    if (seconds < 60) {
      return 'Just now';
    }
    // Handle "1 minute ago" and more than 1 minute
    else if (minutes === 1) {
      return '1 minute ago';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    // Handle "1 hour ago" and more than 1 hour
    else if (hours === 1) {
      return '1 hour ago';
    } else if (hours < 24) {
      return `${hours} hours ago`;
    }
    // Handle days
    else if (days === 1) {
      return '1 day ago';
    } else if (days < 7) {
      return `${days} days ago`;
    }
    // Handle weeks
    else if (days < 14) {
      return `1 week ago`;
    } else {
      const weeks = Math.floor(days / 7);
      return `${weeks} weeks ago`;
    }
  }

  if (!chatLoad) {
    return <Loading />;
  }



  return (
    <>

      <div  className="fixed top-0 w-full z-[195] py-2 px-4 shadow-sm bg-white">
        <div className="flex items-center text-left gap-3">
          {console.log(offerDetailData)}
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => {
              dispatch(setOfferDetailsEmpty());
              router.push(`/events/detail/${params.id}?tab=Offers`);
            }}
          />
          <Avatar className="w-12 h-12 rounded-full border">
            <AvatarImage
              src={offerDetailData?.worker?.profile_pic}
              className="object-cover"
              width={100}
              height={100}
            />
            <AvatarFallback>
              {offerDetailData?.worker?.full_name[0]}
              {offerDetailData?.worker?.full_name?.split(" ")?.length > 1 &&
                offerDetailData?.worker?.full_name?.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>
          <div className="pl-1">
            <div className="text-xl leading-tight">
              {offerDetailData?.worker?.full_name}
              <br />
            </div>
            <div className="font-normal leading-tight text-sm text-neutral-600">
              Last seen{" "}
              {offerDetailData?.worker?.user?.last_active
                ? `${timeAgo(offerDetailData?.worker?.user?.last_active)}`
                : "weeks ago"}
            </div>
          </div>
        </div>
      </div>
      
        <ChatContainer job={jobData} offerId={params?.chat} />
        
        </>
  );
}

export default page;
