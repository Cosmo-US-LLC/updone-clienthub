"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import InviteCard from "@/app/_components/staff/components/invite-cards";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InviteMoreTalents from "./InviteMoreTalents";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import GalleryContent from "@/app/_components/ui/gallery/GalleryContent";

const services: any = {
  Bartender: 1,
  Waiter: 2,
  "Cocktail Server": 3,
  Barback: 6,
  "Promo Model": 4,
  "Event Helper": 4,
};

const Invites = ({ data, jobId, jobData, isInModal, hideModal }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inviteMore, setInviteMore] = useState(false);
  const [selectedTalentsLocal, setSelectedTalentsLocal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobApiData, setJobApiData] = useState<any>(null);

  const [showGallery, setShowGallery] = useState(false);
  const [galleryTalent, setGalleryTalent] = useState<any>(null);
  console.log("galleryTalent", galleryTalent);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCount, setSelectedCount] = useState(12);
  const [data1, setData] = useState<any>(null);

  const { auth: storedData } = useAppSelector(selectAuth);

  const fetchData = async () => {
    setLoading(true);
    let body: any = {
      city_id: jobData?.city_id || 1,
      service_id: services[jobData?.service_name] || 1,
      page_number: currentPage,
      page_size: selectedCount || 12,
      order: "ASC",
    };
    if (jobId) {
      body.job_id = parseInt(jobId);
    }

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
          job_id: jobId,
        },
      });
      setJobApiData(apiResponse);
      setData(newData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const apiResponse = await apiRequest("/job/details/public", {
        method: "POST",
        body: {
          job_id: jobId,
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
    fetchData();
  }, [currentPage, selectedCount]);

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

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
        job_id: Number(jobId),
        invited_workers: selectedTalentsLocal?.map((talent: any) => {
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

  const toggleGalleryOn = (talent: any) => {
    setGalleryTalent(talent);
    setShowGallery(true);
  };
  const toggleGalleryOff = (talent: any) => {
    // setGalleryTalent(talent);
    setShowGallery(false);
  };

  return (
    <>
      <div
        className={`flex flex-wrap justify-center items-center gap-x-[10px] ${
          data?.length > 4
            ? "justify-start content-start pb-[60px]"
            : "justify-start content-center"
        }`}
      >
        {data?.map((staff: any, index: number) => (
          <div
            key={staff.id}
            className={"w-[304px] relative " + (!isInModal ? "mt-8" : "pb-2")}
          >
            <InviteCard
              isInvited={staff?.worker?.has_offered}
              index={index}
              data={staff}
              hideModal={hideModal}
            />
          </div>
        ))}
      </div>

      {data?.length === 0 ? (
        <>
          <div className="flex justify-center items-start relative">
            <div>
              <div className="w-[100%]">
                <Image
                  quality={100}
                  className="relative bottom-[5px] right-[-20px]"
                  width={200}
                  height={180}
                  src={"/images/booking/invite/Cocktail bartender-bro 1.svg"}
                  alt="tick"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-y-[15px] py-[10px]">
                <h4 className="text-[16px] text-center font-[600] text-[#2C2240] my-[20px]">
                  Invite talent to your job, we’ll <br /> notify them right
                  away!
                </h4>

                <button
                  onClick={handleInviteClick}
                  className="text-[14px] mb-[60px] font-[400] py-[16px] flex items-center text-[#fff] px-[32px] rounded-[4px] !bg-[#350ABC]
                  transition-transform duration-150 ease-in-out transform active:scale-95 hover:scale-105"
                >
                  <span className="mr-[8px]">
                    <Image
                      width={16}
                      height={16}
                      src={"/images/booking/offers/plus (1).svg"}
                      alt="tick"
                    />
                  </span>
                  Invite More Talent
                </button>
              </div>
            </div>
          </div>
        </>
      ) : data?.some(
          (item: any) =>
            item.job_status === "assigned" || item.job_status === "completed"
        ) ? (
        <></>
      ) : (
        <div
          onClick={handleInviteClick}
          className="w-full flex justify-center items-center pb-[60px]"
        >
          <br />
          <br />
          <br />
          <br />
          <button
            onClick={handleInviteClick}
            className="bg-[#350ABC] relative rounded-[4px] flex justify-center items-center gap-2 py-[14px] px-[32px] text-[#dfdbec] text-[14px] font-[400] leading-[24px] tracking-[-0.28px] capitalize grow_ellipse"
          >
            <h2>+</h2> Invite More Talent
          </button>
        </div>
      )}

      <Dialog open={inviteMore} onOpenChange={(val) => {setInviteMore(val); toggleGalleryOff(val);}}>
        <DialogContent
        hideCloseButton={showGallery}
          className={`w-[90vw] xl:w-[70vw] max-w-5xl max-h-[80vh] overflow-y-auto ${
            showGallery ? "!rounded-xl w-[70vw] xl:w-[55vw] !p-0 gap-0 border-0 bg-transparent" : ""
          }`}
        >
          <DialogHeader>
            <DialogTitle hidden={showGallery == true}>
              Invite More Talents
            </DialogTitle>
            <DialogDescription hidden></DialogDescription>
            <>{console.log(jobData)}</>
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
                  (selected: any) => selected.id === galleryTalent.id
                ) || galleryTalent?.alreadyInvited
              }
              onToggleSelect={() =>
                !galleryTalent?.alreadyInvited &&
                setSelectedTalentsLocal((prev:any) =>
                  prev.some((item: any) => item.id === galleryTalent.id)
                    ? prev.filter((item: any) => item.id !== galleryTalent.id)
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
            <InviteMoreTalents
              selectedTalentsLocal={selectedTalentsLocal}
              setSelectedTalentsLocal={setSelectedTalentsLocal}
              handleInviteSelected={handleInviteSelected}
              setInviteMore={setInviteMore}
              setGalleryTalent={toggleGalleryOn}
              jobApiData={jobApiData}
              data={data1}
              setData={setData}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              selectedCount={selectedCount}
              setSelectedCount={setSelectedCount}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

// export default React.memo(Invites);
export default Invites;
