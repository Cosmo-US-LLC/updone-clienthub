"use client";

import { useEffect, useState } from "react";
import { FaStar, FaCheckCircle, FaSuitcase } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Loading from "@/app/loading";
import { apiRequest } from "@/app/lib/services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import InviteMoreTalents from "./InviteMoreTalents";
// import { apiRequest } from "@/app/lib/services";
// import { selectAuth } from "@/app/lib/store/features/authSlice";
// import { useAppSelector } from "@/app/lib/store/hooks";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import InviteMoreTalents from "@/app/_components/booking/job-detail/components/InviteMoreTalents";
import InviteTalentMobile from "@/app/_components/booking/job-detail/components/InviteTalentMobile";

const Invites = ({ jobData, GetInvites, invitesData, invitesLoading }) => {
  const [inviteMore, setInviteMore] = useState(false);
  const [selectedTalentsLocal, setSelectedTalentsLocal] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInviteClick = () => {
    setInviteMore(true);
  };

  const handleInviteSelected = () => {
    // console.log(selectedTalentsLocal);
    inviteMoreTalentApi();
  };

  const inviteMoreTalentApi = async () => {
    setLoading(true);
    try {
      const body = {
        job_id: parseInt(jobData?.id),
        invited_workers: selectedTalentsLocal?.map((talent) => {
          return talent.id;
        }),
      };
      const newData = await apiRequest("/job/inviteMoreWorkers", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
      setInviteMore(false);
      setSelectedTalentsLocal([]);
      window.location.reload();
    }
  };
  return (
    <div className="pb-5">
      <h1 className="text-[16px] font-[500] text-[#161616] mb-2">Invites</h1>

      {invitesLoading ? (
        <Loading />
      ) : invitesData.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {invitesData.map((invite, index) => (
            <div className="flex flex-col" key={index}>
              <div key={index} className="bg-[#FCFBFF] p-4 rounded-t-lg border">
                <div className="flex items-center gap-3">
                  {/* <div className="w-[60px] h-[60px] aspect-square">
                    <img
                      src={invite?.worker?.profile_pic}
                      alt={invite?.worker?.name}
                      className="w-[60px] h-[60px] rounded-full object-cover border"
                    />
                  </div> */}
                  <Avatar className="w-[60px] h-[60px] rounded-full border aspect-square">
                    <AvatarImage
                      src={invite?.worker?.profile_pic}
                      className="object-cover"
                      width={100}
                      height={100}
                    />
                    <AvatarFallback>
                      {invite?.worker?.full_name[0]}
                      {invite?.worker?.full_name?.split(" ")?.length > 1 &&
                        invite?.worker?.full_name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <p className="text-gray-900 test-[16px] font-[600]">
                          {invite?.worker?.full_name}
                        </p>
                        {event?.event_assigned_to?.id_is_verified &&
                        event?.event_assigned_to?.contact_is_verified ? (
                          <div className="text-[#28a745] flex justify-center items-center cursor-pointer">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="hover:bg-transparent">
                                  <div className=" text-white rounded">
                                    <VerificationIconMobile
                                      id_is_verified={
                                        event?.event_assigned_to?.id_is_verified
                                      }
                                      contact_is_verified={
                                        event?.event_assigned_to
                                          ?.contact_is_verified
                                      }
                                      height={23}
                                      width={23}
                                    />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="z-40">
                                  <VerificationStatus
                                    id_is_verified={
                                      event?.event_assigned_to?.id_is_verified
                                    }
                                    contact_is_verified={
                                      event?.event_assigned_to
                                        ?.contact_is_verified
                                    }
                                  />
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <FaStar className="text-yellow-500 mb-1" />
                        <span className="text-[14px]">
                          {invite?.worker?.rating}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                      <div className="flex  gap-1 text-gray-500 text-sm">
                        <HiOutlineLocationMarker className="text-[22px]" />
                        <span className="text-[14px] font-[500]">
                          {invite?.worker?.city}
                        </span>
                      </div>
                      <p className="text-gray-500 text-[14px]">
                        {invite?.worker?.total_jobs_count} Jobs
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex min-w-[300px] items-center justify-center gap-3 bg-[#F4FAFF] px-4 py-[10px] rounded-full mt-4 text-gray-700 text-[14px]">
                  <FaSuitcase className="text-blue-600" />
                  <span>The last job was on {invite?.worker?.last_job}</span>
                </div>
              </div>
              <div className="flex justify-around border rounded-b-lg py-2 bg-white">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-[14px] font-[400] text-gray-500">From&nbsp;</p>
                  <p className="text-[16px] font-[600]">
                    ${invite?.worker?.per_hours_rate}
                  </p>
                </div>
                <div className="w-[1px] bg-[#E9E9E9] "></div>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-gray-500 text-[14px]  ">Total&nbsp;</p>
                  <p className="text-gray-900 text-[16px] font-[600]">
                    ${invite?.worker?.total_price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {jobData?.status === "open" && (
            <div className="flex justify-center">
              <button
                onClick={handleInviteClick}
                className="flex gap-2 bg-[#350abc] text-white text-sm font-medium px-6 py-3 rounded-full mt-6"
              >
                {/* Invite talent to job */}
                <h2>+</h2> Invite More Talent
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <Image
            src="/images/illustration-no-invites.png"
            width={220}
            height={220}
            alt="No Invites"
          />

          <h2 className="text-lg font-semibold text-gray-900 mt-4">
            No Invites
          </h2>
          <p className="text-gray-500 text-sm mt-2 px-6">
            Invite talent to your job, we&apos;ll notify them right away!
          </p>

          <button
            onClick={handleInviteClick}
            className="bg-[#350abc] text-white text-sm font-medium px-6 py-3 rounded-full mt-6"
          >
            Invite talent to job
          </button>
        </div>
      )}

      <Dialog open={inviteMore} onOpenChange={setInviteMore}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className="w-[100vw] max-w-5xl h-[100dvh] z-[299] overflow-y-auto px-2">
          <DialogHeader>
            <DialogTitle>Invite More Talents</DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <InviteTalentMobile
              jobId={jobData?.id}
              selectedTalentsLocal={selectedTalentsLocal}
              setSelectedTalentsLocal={setSelectedTalentsLocal}
              // fetchTalentsData={fetchTalentsData}
              handleInviteSelected={handleInviteSelected}
              data={jobData}
              setData={null}
              // loading={loading}
              // setLoading={setLoading}
              // loadingInit={loadingInit}
              // pageSize={selectedCount}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Invites;
