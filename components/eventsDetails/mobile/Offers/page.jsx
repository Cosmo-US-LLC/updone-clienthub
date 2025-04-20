"use client";

import { useEffect, useState } from "react";
import { FaStar, FaSuitcase } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import Loading from "@/app/loading";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import ChatContainer from "../../ChatContainer";
import {
  selectOfferDetailData,
  setOfferDetailData,
  setOffersId,
} from "@/app/lib/store/features/bookingSlice";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/app/lib/store/hooks";
import GalleryContent from "@/app/_components/ui/gallery/GalleryContent";
import { apiRequest } from "@/app/lib/services";

const Offers = ({
  jobData,
  selectedOffer,
  setSelectedOffer,
  GetOffers,
  offersData,
  offersLoading,
  setInviteMore,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const [chatModal, setChatModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const [offerModalId, setOfferModalId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTalentsLocal, setSelectedTalentsLocal] = useState([]);
  const [jobApiData, setJobApiData] = useState(null);

  const payPayment = (offer) => {
    setOfferModalId(offer?.invite_id);
    setSelectedOffer(offer);
    setOfferModal(true);
    // dispatch(setOffersId(invite_id));
    // router.push(`/events/payment/${invite_id}`);
  };
  const payPaymentConfirm = () => {
    dispatch(setOffersId(offerModalId));
    // setSelectedOffer(null)
    router.push(`/events/payment/${offerModalId}`);
  };
  const payPaymentCancel = (value) => {
    if (!value) {
      setOfferModalId(null);
      setSelectedOffer(null);
      setOfferModal(false);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const apiResponse = await apiRequest("/job/details/public", {
        method: "POST",
        body: {
          job_id: params.id,
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
  }, [showModal]);

  // const offerDetailData = useAppSelector(selectOfferDetailData);
  // useEffect(() => {
  //   if (offerDetailData) {
  //     console.log("offerDetailData", offerDetailData);
  //     // console.log(offerDetailData);
  //   }
  // }, [offerDetailData]);

  return (
    <>
      {showModal ? (
        <div>
          {offersData?.map((offer, index) => (
            <Dialog key={index} open={showModal} onOpenChange={setShowModal}>
              <DialogContent
                hideCloseButton={showModal}
                className="w-full max-w-full max-h-[100dvh] bg-transparent h-[100dvh] z-[299] overflow-y-auto px-2"
              >
                <DialogHeader hidden>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                  <GalleryContent
                    images={
                      offer?.worker?.gallery?.length > 0
                        ? offer?.worker?.gallery
                        : [offer?.worker?.profile_pic]
                    }
                    talent={offer?.worker}
                    jobApiData={jobApiData}
                    onClose={() => setShowModal(false)}
                    isSelected={
                      selectedTalentsLocal.some(
                        (selected) => selected.id === offer?.worker?.id
                      ) || offer?.worker?.alreadyInvited
                    }
                    onToggleSelect={() =>
                      !offer?.worker?.alreadyInvited &&
                      setSelectedTalentsLocal((prev) =>
                        prev.some((item) => item.id === offer?.worker?.id)
                          ? prev.filter((item) => item.id !== offer?.worker?.id)
                          : [
                              ...prev,
                              {
                                id: offer?.worker?.id,
                                profile_pic: offer?.worker?.profile_pic,
                              },
                            ]
                      )
                    }
                    inviteId={offer?.invite_id}
                    showButton={false}
                    addButton={true}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <div className="!min-w-full">
          <h1 className="text-[16px] font-[500] tracking-[0.5px] text-[#161616] mb-2 !w-full !text-left">
            Talent Offers
          </h1>

          {offersLoading ? (
            <Loading />
          ) : offersData.length > 0 ? (
            <div className="flex flex-col gap-3">
              {offersData.map((offer, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border-[2px] border-[#E9E9E9]   "
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* <img
                    src={offer?.worker?.profile_pic}
                    alt={offer?.worker?.full_name}
                    className="w-12 h-12 rounded-full border object-cover"
                  /> */}
                      <Avatar className="w-12 h-12 rounded-full border">
                        <AvatarImage
                          src={offer?.worker?.profile_pic}
                          className="object-cover"
                          width={100}
                          height={100}
                        />
                        <AvatarFallback>
                          {offer?.worker?.full_name[0]}
                          {offer?.worker?.full_name?.split(" ")?.length > 1 &&
                            offer?.worker?.full_name?.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 text-[16px] font-[600]">
                          {offer?.worker?.full_name}
                        </p>
                        {offer?.worker?.id_is_verified &&
                        offer?.worker?.contact_is_verified ? (
                          <div className="text-[#28a745] flex justify-center items-center cursor-pointer">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="hover:bg-transparent">
                                  <div className=" text-white rounded">
                                    <VerificationIconMobile
                                      id_is_verified={
                                        offer?.worker?.id_is_verified
                                      }
                                      contact_is_verified={
                                        offer?.worker?.contact_is_verified
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
                    </div>

                    <div className="flex items-center gap-1 text-gray-500">
                      <FaStar className="text-yellow-500 mb-1" />
                      <span className="text-[14px]">
                        {parseFloat(offer?.worker?.rating).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 text-gray-500 text-[14px] font-[400]">
                      <HiOutlineLocationMarker className="text-[22px]" />
                      <span>{offer?.worker?.city}</span>
                    </div>
                    <p className="text-gray-500 text-[14px] font-[400]">
                      {offer?.worker?.total_jobs_count} Jobs
                    </p>
                  </div>

                  <div className="flex min-w-[300px] items-center justify-center gap-4 bg-[#F4FAFF] px-4 py-[10px] rounded-full mt-4 text-gray-700 text-[14px]">
                    <FaSuitcase className="text-blue-600" />
                    <span>
                      Last job was a {""}
                      {offer?.worker?.last_job}
                    </span>
                  </div>

                  <div className="flex justify-between  px-8 mt-6">
                    <div className=" flex flex-col justify-center items-center">
                      <p className="text-gray-500 text-[14px]">Offered rate</p>
                      <p className="text-gray-900 text-[18px] font-[600]">
                        ${offer?.offered_price}
                      </p>
                    </div>
                    <div className="w-[1px] bg-[#E9E9E9]"></div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-gray-500 text-[14px]">Total</p>
                      <p className="text-gray-900 text-[18px] font-[600]">
                        ${offer?.total_price}
                      </p>
                    </div>
                  </div>

                  {jobData?.status == "open" && (
                    <div className="flex justify-end gap-4 mt-7">
                      <div className="relative flex items-center">
                        <button
                          onClick={() => {
                            // console.log(offer);
                            dispatch(setOfferDetailData(offer));
                            router.push(
                              `/events/detail/${jobData?.id}/chat/${offer?.id}`
                            );
                          }}
                          className="border-[1px] border-[#161616] text-[#161616] text-[14px] font-medium px-4 py-2 rounded-full"
                        >
                          Let's Talk
                        </button>
                        {/* <FaFileInvoiceDollar className="text-gray-500 text-lg" /> */}
                        {offer?.unread_message_count > 0 && (
                          <span className="absolute -top-2 -right-1 z-10 w-fit bg-[#c70101] text-white text-xs text-center font-semibold min-w-5 px-1.5 py-0.5 rounded-full">
                            {offer?.unread_message_count}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => payPayment(offer)}
                        className="bg-[#350ABC] text-white text-[14px] font-[400] px-6 py-2 rounded-full"
                      >
                        Hire Me
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center mt-12">
              <Image
                src="/images/illustration-no-offers.png"
                width={320}
                height={295}
                alt="No Offers"
              />

              <h2 className="text-lg font-semibold text-gray-900 mt-4">
                No offer yet to show
              </h2>
              <p className="text-gray-500 text-sm mt-2 px-6">
                No offers yet, check back in couple of hours or invite more
                talent!
              </p>

              {jobData?.status == "open" && (
                <button
                  onClick={() => {
                    setInviteMore();
                  }}
                  className="bg-purple-600 text-white text-sm font-medium px-6 py-3 rounded-full mt-6"
                >
                  Invite talent to job
                </button>
              )}
            </div>
          )}

          {/* Lets Hire Popup */}
          <Dialog open={offerModal} onOpenChange={payPaymentCancel}>
            <DialogContent className="max-w-[80vw] rounded-2xl space-y-5">
              <DialogHeader>
                <DialogTitle className="text-2xl">Offer Breakdown</DialogTitle>
                <DialogDescription hidden>
                  {/* Lobortis posuere in leo pretium lectus commodo nam convallis. */}
                </DialogDescription>
              </DialogHeader>

              <div>
                <div className="flex justify-between items-center">
                  <span>Total Number of hours:</span>
                  <span>{selectedOffer?.working_hours} h</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center">
                  <span>Rate per hours:</span>
                  <span>${selectedOffer?.offered_price}</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center gap-5">
                  <span className="text-neutral-600 text-sm">Total.</span>
                  <span className="text-black text-3xl font-[500]">
                    ${parseFloat(selectedOffer?.total_price).toFixed(2)}
                  </span>
                </div>
                <hr className="w-full my-3" />
                <button
                  onClick={() => payPaymentConfirm()}
                  className="rounded-full bg-[#350abc] text-white px-4 py-2 flex gap-2 items-center"
                >
                  Hire Now
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Chat Sheet */}
          {/* {chatModal && (
        <div className="absolute z-[190] w-full flex flex-col top-0 left-0 bg-white h-[100dvh]">
          <div className="fixed top-0 py-2 z-[195] left-0 w-full px-4 bg-white shadow-sm">
            <div className="flex items-center text-left gap-3">
              {console.log(selectedOffer)}
              <ChevronLeft
                className=""
                onClick={() => {
                  setSelectedOffer(null);
                  setChatModal(false);
                }}
              />
              <Avatar className="w-12 h-12 rounded-full border">
                <AvatarImage
                  src={selectedOffer?.worker?.profile_pic}
                  className="object-cover"
                  width={100}
                  height={100}
                />
                <AvatarFallback>
                  {selectedOffer?.worker?.full_name[0]}
                  {selectedOffer?.worker?.full_name?.split(" ")?.length > 1 &&
                    selectedOffer?.worker?.full_name?.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>
              <div className="pl-1">
                <div className="text-xl leading-tight">
                  {selectedOffer?.worker?.full_name}
                  <br />
                </div>
                <div className="font-normal leading-tight text-sm text-neutral-600">
                  Last seen{" "}
                  {selectedOffer?.worker?.user?.last_active
                    ? `${timeAgo(selectedOffer?.worker?.user?.last_active)}`
                    : "weeks ago"}
                </div>
              </div>
            </div>
          </div>
          <div className="grow pt-16 px-4 bg-white">
            {chatModal && (
              <ChatContainer job={jobData} offerId={selectedOffer?.id} />
            )}
          </div>
        </div>
      )} */}
        </div>
      )}
    </>
  );
};

export default Offers;
