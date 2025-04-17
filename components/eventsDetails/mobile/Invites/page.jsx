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
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
// import InviteMoreTalents from "./InviteMoreTalents";
// import { apiRequest } from "@/app/lib/services";
// import { selectAuth } from "@/app/lib/store/features/authSlice";
// import { useAppSelector } from "@/app/lib/store/hooks";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import InviteMoreTalents from "@/app/_components/booking/job-detail/components/InviteMoreTalents";
import InviteTalentMobile from "@/app/_components/booking/job-detail/components/InviteTalentMobile";
import GalleryContent from "@/app/_components/ui/gallery/GalleryContent";

const Invites = ({
  jobData,
  GetInvites,
  invitesData,
  invitesLoading,
  inviteMore,
  setInviteMore,
}) => {
  // const [inviteMore, setInviteMore] = useState(false);
  const params = useParams();
  const [selectedTalentsLocal, setSelectedTalentsLocal] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryTalent, setGalleryTalent] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loadingInit, setLoadingInit] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCount, setSelectedCount] = useState(12);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [skeletonCount, setSkeletonCount] = useState(0);
  const [loadingMobile, setLoadingMobile] = useState(true);

  const [jobApiData, setJobApiData] = useState(null);
  console.log("galleryTalent", galleryTalent);

  const handleInviteClick = () => {
    setInviteMore(true);
  };

  const handleInviteSelected = () => {
    // console.log(selectedTalentsLocal);
    inviteMoreTalentApi();
  };

  const fetchTalentsData = async (add = false, page = 1) => {
    setLoadingMobile(true);
    let body = {
      city_id: 1,
      // city_id: parseInt(Cookies.get("event_city")) || 1,
      service_id: parseInt(Cookies.get("event_service_id")) || 1,
      page_number: add ? page : currentPage,
      page_size: selectedCount || 12,
      order: "ASC",
    };
    try {
      const newData = await apiRequest("/job/recommended-workers/public", {
        method: "POST",
        body: body,
        headers: {
          ...(storedData && {
            Authorization: `Bearer ${storedData.token}`,
          }),
        },
      });
      const apiResponse = await apiRequest("/job/details/public", {
        method: "POST",
        body: {
          job_id: params?.id,
        },
      });

      if (add) {
        // dispatch(setJobData({
        //   ...newData,
        //   records: [...data?.records, ...(newData?.records || [])],
        // }));
        setRecommended({
          ...recommended,
          records: [...recommended?.records, ...(newData?.records || [])],
        });
      } else {
        // dispatch(setJobData(apiResponse));
        setRecommended(newData);
      }
      setJobApiData(apiResponse);
      setLoadingMobile(false);
      return;
    } catch (err) {
      console.error("Error 3", err);
      // setError("Something went wrong!");
    } finally {
      setLoadingMobile(false);
      setLoadingInit(false);
      // dispatch(setJobId(params?.id));
    }
  };

  const fetchJobDetails = async () => {
    try {
      const apiResponse = await apiRequest("/job/details/public", {
        method: "POST",
        body: {
          job_id: params?.id,
        },
      });
      if (apiResponse) {
        setJobApiData(apiResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  useEffect(() => {
    fetchTalentsData();
  }, [currentPage, selectedCount]);

  const handleLoadMore = () => {
    const talentsToAdd = Math.min(
      pageSize,
      recommended?.pagination?.total_records - recommended?.records?.length
    );
    setSkeletonCount(talentsToAdd); // Set the number of skeleton loaders
    fetchTalentsData(true, pageNo + 1);
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    if (!loading) {
      setSkeletonCount(0); // Reset the skeleton count when loading is complete
    }
  }, [loading]);

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
      GetInvites();
      // window.location.reload();
    }
  };

  useEffect(() => {
    console.log(selectedTalentsLocal);
  }, [selectedTalentsLocal]);

  const toggleGalleryOn = (talent) => {
    setGalleryTalent(talent);
    setShowGallery(true);
  };
  const toggleGalleryOff = (talent) => {
    // setGalleryTalent(talent);
    setShowGallery(false);
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
                  <p className="text-[14px] font-[400] text-gray-500">
                    From&nbsp;
                  </p>
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
                <h2>+</h2> Invite More Talent
              </button>
            </div>
          )}
          {/* Invite talent to job */}
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
            Invite talent to your job on Clienthub desktop, we&apos;ll notify
            them right away!
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
        <DialogContent
          hideCloseButton={showGallery}
          className="w-[100vw] max-w-5xl h-[100dvh] z-[299] overflow-y-auto px-2"
        >
          <DialogHeader>
            <DialogTitle hidden={showGallery == true}>
              Invite More Talents
            </DialogTitle>
            <>{console.log(jobData)}</>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          {showGallery == true ? (
            <GalleryContent
              images={
                galleryTalent?.gallery?.length > 0
                  ? galleryTalent?.gallery
                  : [galleryTalent?.profile_pic]
              }
              talent={galleryTalent}
              jobApiData={jobApiData}
              onClose={toggleGalleryOff}
              isSelected={
                selectedTalentsLocal.some(
                  (selected) => selected.id === galleryTalent.id
                ) || galleryTalent?.alreadyInvited
              }
              onToggleSelect={() =>
                !galleryTalent?.alreadyInvited &&
                setSelectedTalentsLocal((prev) =>
                  prev.some((item) => item.id === galleryTalent.id)
                    ? prev.filter((item) => item.id !== galleryTalent.id)
                    : [
                        ...prev,
                        {
                          id: galleryTalent.id,
                          profile_pic: galleryTalent?.profile_pic,
                        },
                      ]
                )
              }
            />
          ) : loading ? (
            <>
              <Loader />
            </>
          ) : (
            <InviteTalentMobile
              jobId={jobData?.id}
              selectedTalentsLocal={selectedTalentsLocal}
              setSelectedTalentsLocal={setSelectedTalentsLocal}
              fetchTalentsData={fetchTalentsData}
              handleInviteSelected={handleInviteSelected}
              setGalleryTalent={toggleGalleryOn}
              data={jobData}
              setData={null}
              selected={invitesData}
              recommended={recommended}
              setRecommended={setRecommended}
              loadingInit={loadingInit}
              setLoadingInit={setLoadingInit}
              jobApiData={jobApiData}
              setJobApiData={setJobApiData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setSelectedCount={setSelectedCount}
              selectedCount={selectedCount}
              pageNo={pageNo}
              setPageNo={setPageNo}
              pageSize={pageSize}
              setPageSize={setPageSize}
              skeletonCount={skeletonCount}
              setSkeletonCount={setSkeletonCount}
              handleLoadMore={handleLoadMore}
              loading={loadingMobile}
              setLoading={setLoadingMobile}
              // loading={loading}
              // setLoading={setLoading}
              // loadingInit={loadingInit}
              // pageSize={selectedCount}
            />
          )}
        </DialogContent>
      </Dialog>
      {inviteMore && !loading && !showGallery && (
        <div className="z-[990] fixed bottom-2 left-0 w-full px-3 pr-4">
          <div
            // style={{ touchAction: "none" }}
            className="pointer-events-auto flex w-full mx-auto p-3 flex-col items-start gap-2 rounded-lg border border-[#F7D9AB] bg-[#FFEFD7] shadow-[rgba(137,137,137,0.06)_-8px_0px_26px_0px] self-center"
          >
            <div className="flex flex-row items-center gap-2">
              <div className=" px-3">
                <div className="flex flex-row items-center gap-2">
                  {selectedTalentsLocal.length === 0 ? (
                    <p className="text-[18px] font-medium leading-[32px] text-[#2C2240]  ">
                      No talents selected yet.
                    </p>
                  ) : selectedTalentsLocal.length === 1 ? (
                    <p className="text-[18px] font-medium leading-[32px] text-[#2C2240]  ">
                      You've selected 1 talent.
                    </p>
                  ) : (
                    <p className="text-[18px] font-medium leading-[32px] text-[#2C2240] ">
                      You've selected {selectedTalentsLocal.length} talents.
                    </p>
                  )}
                </div>

                <div className="flex -space-x-2">
                  {selectedTalentsLocal.slice(0, 5).map((talent, index) => (
                    <img
                      key={index}
                      src={talent?.profile_pic || "/images/user.svg"}
                      alt="Selected Talent"
                      className="w-[28px] h-[28px] rounded-full object-cover bg-neutral-200"
                    />
                  ))}

                  {selectedTalentsLocal.length > 5 && (
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-medium border-2 border-white">
                      +{selectedTalentsLocal.length - 5}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              className="flex h-[48px] px-[32px] py-[16px] justify-center items-center gap-[12px] flex-1 rounded-[4px] border border-[#774DFD] bg-[#350ABC] text-white min-w-[300px] w-full disabled:opacity-60 disabled:pointer-events-none"
              // onTouchEnd={handleOpenModal}
              disabled={selectedTalentsLocal.length === 0 || loading}
              onClick={handleInviteSelected}
            >
              Invite {selectedTalentsLocal.length} Talent
              {selectedTalentsLocal.length > 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invites;
