"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ChatContainer from "../../../../../../components/eventsDetails/ChatContainer";
import { useDispatch } from "react-redux";
import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { setJobData, setJobId } from "@/app/lib/store/features/staffSlice";
import { selectStaff } from "@/app/lib/store/features/staffSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Loading from "@/app/loading";

function page() {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter;
  const { auth: storedData } = useAppSelector(selectAuth);
  const { jobData } = useAppSelector(selectStaff);
  const { handleError } = useError();
  const [render, setRender] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        var apiUrl;
        if (storedData?.token) {
          apiUrl = `/job/details`;
        } else {
          apiUrl = `/job/details/public`;
        }

        // Fetch data from API
        const apiResponse = await apiRequest(
          apiUrl,
          {
            method: "POST",
            headers: {
              revalidate: true,
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
            },
            body: {
              job_id: params.id,
            },
          },
          handleError
        );

        if (apiResponse?.job_not_found === true) {
          // router.push("/events");
          router.push(`${process.env.NEXT_PUBLIC_CLIENTHUB_URL}/talent/events`); // Redirect to talent homepage
        } else {
          console.log(apiResponse);
          dispatch(setJobData(apiResponse));
          dispatch(setJobId(params.id));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const GetOffers = async () => {
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
            job_id: params?.id,
            sort_by: "latest",
          },
        });

        if (response?.offers) {
          // console.log(response?.offers);
          // setOffersData(response?.offers);
          if (
            jobData?.status === "assigned" ||
            jobData?.status === "completed"
          ) {
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
        //   setOffersLoading(false);
      }
    };

    fetchJobDetails();
    GetOffers();
  }, []);

  useEffect(() => {
    setRender(true);

    return () => {
      dispatch(setJobData(null));
      dispatch(setJobId(null));
    };
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
      return "Just now";
    }
    // Handle "1 minute ago" and more than 1 minute
    else if (minutes === 1) {
      return "1 minute ago";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    }
    // Handle "1 hour ago" and more than 1 hour
    else if (hours === 1) {
      return "1 hour ago";
    } else if (hours < 24) {
      return `${hours} hours ago`;
    }
    // Handle days
    else if (days === 1) {
      return "1 day ago";
    } else if (days < 7) {
      return `${days} days ago`;
    }
    // Handle weeks
    else if (days === 7) {
      return "1 week ago"; // Exactly 1 week
    } else if (days === 14) {
      return "2 weeks ago"; // Exactly 2 weeks
    } else {
      return "weeks ago"; // After 2 weeks, show just "weeks ago"
    }
  }

  if (!render || !jobData || jobData?.id != params?.id) {
    return <Loading />;
  }

  return (
    <div className="absolute left-0 top-0 z-[149] w-[100vw] h-[100vh] bg-white py-4">
      <div>
        {/* <div className="flex justify-end">
            </div> */}
        <div className="flex items-center text-left gap-3">
          {/* {console.log(jobData?.invite)} */}
          <Link href={`/events/detail/${params?.id}`}>
            <ChevronLeft className="" />
          </Link>
          <Avatar className="w-12 h-12 rounded-full border">
            <AvatarImage
              src={jobData?.invite?.worker?.profile_pic}
              className="object-cover"
              width={100}
              height={100}
            />
            <AvatarFallback>
              {jobData?.invite?.worker?.full_name[0]}
              {jobData?.invite?.worker?.full_name?.split(" ")?.length > 1 &&
                jobData?.invite?.worker?.full_name?.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>
          <div className="pl-1">
            <div className="text-xl leading-tight">
              {jobData?.invite?.worker?.full_name || "N/A"}
              {/* - {jobData?.invite?.id} */}
              <br />
            </div>
            <div className="font-normal leading-tight text-sm text-neutral-600">
              Last seen{" "}
              {jobData?.invite?.worker?.user?.last_active
                ? `${timeAgo(jobData?.invite?.worker?.user?.last_active)}`
                : "weeks ago"}
            </div>
          </div>
        </div>
      </div>
      <div className="grow">
        <ChatContainer job={jobData} offerId={selectedOffer?.id} />
      </div>
    </div>
  );
}

export default page;
