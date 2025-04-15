"use client";

import JobDetailWorker from "@/app/_components/booking/worker/JobDetail";
import loadable from "@/app/_components/ui/lazy-load";
import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { setJobData, setJobId } from "@/app/lib/store/features/staffSlice";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { selectStaff } from "@/app/lib/store/features/staffSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import EventsDetails from "@/components/eventsDetails/mobile/page";
import JobDetail from "@/app/_components/booking/job-detail";
import Loading from "@/app/loading";

const page = () => {
  const params = useParams();
  const { auth: storedData } = useAppSelector(selectAuth);
  const { jobData } = useAppSelector(selectStaff);
  const [isWorker, setIsWorker] = useState<boolean | null>(null);
  const [render, setRender] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleError } = useError();

  // console.log({ jobData });

  useEffect(() => {
    if (storedData?.user) {
      if (storedData?.user?.role_id === 4) {
        setIsWorker(false);
      } else {
        setIsWorker(true);
      }
    }
  }, [storedData, router]);
  useEffect(() => {
    if (storedData?.user) {
      if (isWorker) {
        router.push(`/staff/job-detail/${params.id}`);
      }
    }
  }, [storedData, router, isWorker]);
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
          dispatch(setJobData(apiResponse));
          dispatch(setJobId(params.id));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobDetails();
  }, []);

  useEffect(()=>{
    setRender(true);

    return () => {
      dispatch(setJobData(null));
      dispatch(setJobId(null));
    }
  }, [])

  if (!render || !jobData) {
    return <Loading />
  }

  return (
    // <div className="mt-4 p-1 h-screen max-h-[calc(100vh-133px)] overflow-y-hidden"></div>
    <>
      {/* <div className="max-lg:hidden mt-4 h-screen max-h-[calc(100vh-132px)] overflow-y-hidden">
            {isWorker === true ? (
                @ts-ignore
                <JobDetailWorker jobId={params.id} />
            ) : (
                // <Suspense>
                <JobDetail jobId={params.id} />
                // </Suspense>
                +
            )}
        </div> */}
      <JobDetail jobId={params.id} />

      <div className="lg:hidden ">
        <EventsDetails jobId={params.id} jobData={jobData} />
        {/* <p className="lg:hidden text-[18px] pt-4 mb-2">
          ClientHub is coming soon on your cellphone!
          <br />
          <br />
          <span className="text-[16px] text-neutral-600">
            Meanwhile, you can manage your events, view offers, talk to talents,
            and hire them on desktop.
          </span>
        </p> */}

        {/* <button
          onClick={() => {
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
          }}
          className="lg:hidden w-fit mx-auto mt-6 items-center justify-center min-w-[250px] py-2 rounded-full bg-[#350ABC] text-white shadow-md"
        >
          Go Back to Updone
        </button> */}
      </div>
    </>
  );
};

export default page;
