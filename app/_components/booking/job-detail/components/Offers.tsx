"use client";

// import Tooltip from "@/app/_components/common/tooltip";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import VerificationIcon from "@/app/_components/ui/shield";
import { VerificationStatus } from "@/app/_components/ui/verified-status-check-tooltip";
import { setOffersId } from "@/app/lib/store/features/bookingSlice";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TalentImage from "./TalentImage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VerificationIconMobile from "@/app/_components/ui/shield";
import { BadgeCheck, ChevronDown, List, Star } from "lucide-react";

const Offers = ({
  offers,
  offersLoading,
  job,
  setSelectedOffer,
  selectedOffer,
  isInModal,
  offerSort, 
  setOfferSort,
  hideModal
}: {
  offers: any[];
  job: any;
  offersLoading: boolean;
  setSelectedOffer: any;
  selectedOffer: any;
  isInModal: any;
  offerSort: any; 
  setOfferSort: any;
  hideModal: any
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const payPayment = (invite_id: any) => {
    dispatch(setOffersId(invite_id));
    router.push(`/events/payment/${invite_id}`);
  };

  const [showModal, setShowModal] = useState(false);
  // const galleryImages = talent?.gallery?.length > 0 ? talent?.gallery : [talent.profile_pic];

  function timeAgo(dateTimeString: string) {
    const inputDate: any = new Date(dateTimeString);
    const now: any = new Date();
    const diffMs = now - inputDate;
    
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (days < 14) {
      return `1 week ago`;
    } else {
      const weeks = Math.floor(days / 7);
      return `${weeks} weeks ago`;
    }
  }  

  return (
    <>
      {!isInModal && (
        <div className="py-2 flex justify-end px-2">
          <Select value={offerSort} onValueChange={setOfferSort}>
            <SelectTrigger className="w-[250px] text-left rounded-lg h-[32px] hover:text-neutral-800 hover:bg-neutral-50">
              <div className="flex justify-start items-center gap-2">
                {/* <SelectValue placeholder="Theme" /> */}
                <List className="w-4 h-4 text-black" />
                Sort by: <SelectValue placeholder="Latest (Default)" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest (Default)</SelectItem>
              <SelectItem value="verified_first">Verified First</SelectItem>
              <SelectItem value="lowest_first">Lowest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className={`flex flex-col`}>
        {offers?.length > 0 &&
          offers.map((offer: any) => (
            <div
              key={offer.id}
              className="flex flex-row items-center justify-between border border-1 border-[#EBE6FF] px-2 h-[120px] mb-4 mx-2 rounded-xl"
            >
              <div className="flex flex-row items-center justify-start gap-2">
                <TalentImage talent={offer} hideModal={hideModal} />

                <div className="flex flex-col w-[156px]">
                  <div className="flex flex-row gap-1.5 items-center">
                    <p className="text-[16px] font-[500] leading-[8px]">
                      {offer.worker.full_name.length > 17
                        ? `${offer.worker.full_name.slice(0, 17)}...`
                        : offer.worker.full_name}
                    </p>
                    {(offer?.worker?.id_is_verified && offer?.worker?.id_is_verified) ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="hover:bg-transparent">
                            <div className=" text-white rounded w-[30px]">
                              <VerificationIcon
                                id_is_verified={offer.worker.id_is_verified}
                                contact_is_verified={
                                  offer.worker.contact_is_verified
                                }
                                height={30}
                                width={30}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="z-40">
                            <VerificationStatus
                              id_is_verified={offer.worker.id_is_verified}
                              contact_is_verified={
                                offer.worker.contact_is_verified
                              }
                            />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : <div className="h-[30px]"></div>}
                  </div>
                  <div className="flex flex-row gap-1.5">
                    <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[16px]">
                      Last seen {offer?.worker?.user?.last_active ? `${timeAgo(offer?.worker?.user?.last_active)}` : "weeks ago"}
                      {/* <>{console.log(offer?.worker?.user?.last_active)}</> */}
                    </p>
                  </div>
                  {/* <div className="flex flex-row gap-1.5">
                    <BadgeCheck className="w-4 h-4 fill-[#4c4b4b] text-white" />
                    <p className="text-[#4C4B4B] text-[14px] font-[400] leading-[16px]">
                      {offer?.worker?.total_jobs_count} Jobs
                    </p>
                  </div> */}
                  {/* <div className="flex flex-row gap-2 pl-0.5">
                    <Image
                      width={12}
                      height={12}
                      src={"/images/client-portal/event-details/star.svg"}
                      alt="star"
                    />
                    <p className="text-[#4C4B4B] text-[14px] font-[400] leading-[24px]">
                      {parseFloat(offer?.worker?.rating).toFixed(1)}
                    </p>
                  </div> */}
                </div>
                <div className="w-4"></div>
                <div>
                  <p className="text-[#4C4B4B] font-[400] text-[12px] leading-[20px]">
                    Rating
                  </p>
                  <p className="text-[#4C4B4B] font-[500] text-[18px] leading-[27px] flex gap-1 items-center">
                    <Star className="fill-[#4C4B4B] stroke-none w-5 h-5" />
                    {parseFloat(offer?.worker?.rating).toFixed(1)}
                  </p>
                </div>
                <div className="w-4"></div>
                <div>
                  <p className="text-[#4C4B4B] font-[400] text-[12px] leading-[20px]">
                    Jobs Completed
                  </p>
                  <p className="text-[#4C4B4B] font-[500] text-[18px] leading-[27px]">
                    {offer?.worker?.total_jobs_count} Jobs
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center justify-end gap-4">
                <div>
                  <p className="text-[#4C4B4B] font-[400] text-[12px] leading-[20px]">
                    Offered Rate
                  </p>
                  <p className="text-[#4C4B4B] font-[500] text-[18px] leading-[27px]">
                    $
                    {offer?.offered_price === "default"
                      ? offer?.worker?.per_hours_rate
                      : offer?.offered_price}
                    /hour
                  </p>
                </div>
                {/* <div className="ml-1 mb-0.5">
                  <p className="text-[#4C4B4B] font-[400] text-[12px] leading-[20px]">
                    Total
                  </p>
                  <p className="text-[#4C4B4B] font-[500] text-[18px] leading-[27px]">
                    ${offer?.total_price}
                  </p>
                </div> */}
                {isInModal !== true && (
                  <>
                    <div className="relative">
                      <button
                        disabled={
                          job.status === "assigned" ||
                          job.status === "completed"
                        }
                        className={`bg-[#350abc] rounded-full flex justify-center items-center gap-2 h-[42px] ${
                          selectedOffer?.id === offer?.id
                            ? "w-[262px]"
                            : "w-[162px]"
                        } text-white text-[14px] font-[400] leading-[24px] tracking-[-0.28px]
                          transition-all duration-300 ease-in-out grow_ellipse
                          active:scale-95 active:shadow-inner ${
                            job.status === "assigned" ||
                            job.status === "completed"
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer"
                          }`}
                        onClick={() => {
                          if (job.status !== "assigned") {
                            payPayment(offer.invite_id);
                          }
                        }}
                      >
                        {/* <Image
                      width={12}
                      height={12}
                      src={"/images/hero/tick.svg"}
                      alt="tick"
                    /> */}
                        {job.status === "assigned" ? (
                          "Already Assigned"
                        ) : job.status === "completed" ? (
                          "Completed"
                        ) : (
                          <p>
                            Hire me for{" "}
                            <span className="font-semibold text-[15px]">
                              ${offer?.total_price}
                            </span>
                          </p>
                        )}
                      </button>
                      <div className="absolute top-[110%] w-full flex justify-end px-1">
                        <Image
                          src={"/images/stripeSecure.svg"}
                          alt="Secured with stripe"
                          width={183}
                          height={35}
                          className="w-[125px]"
                        />
                      </div>
                    </div>

                    {selectedOffer?.id !== offer?.id && (
                      <div
                        onClick={() => {
                          setSelectedOffer(offer);
                        }}
                        className="relative gap-2 group cursor-pointer border border-1 h-[38px] w-[123px] rounded-full flex flex-row items-center justify-center border-[black] bg-white hover:bg-[#774DFD] hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                      >
                        {offer?.unread_message_count > 0 && (
                          <div className="p-2 flex flex-row justify-center items-center absolute bg-[#C70101] h-[24px] w-[24px] rounded-full bottom-[24px] right-0">
                            <p className="text-[white] text-[12px]">
                              {offer?.unread_message_count > 10
                                ? "10+"
                                : offer?.unread_message_count}
                            </p>
                          </div>
                        )}

                        <div className="transition-transform duration-300 ease-in-out hover:scale-110">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-gray-500 group-hover:fill-white transition-colors duration-300 ease-in-out"
                          >
                            <g clipPath="url(#clip0_8554_93605)">
                              <path d="M8 0C3.58867 0 0 3.58867 0 8C0 12.4113 3.58867 16 8 16H16V8C16 3.58867 12.4113 0 8 0ZM15.3333 15.3333H8C3.95667 15.3333 0.666667 12.0433 0.666667 8C0.666667 3.95667 3.95667 0.666667 8 0.666667C12.0433 0.666667 15.3333 3.95667 15.3333 8V15.3333ZM8.66667 8C8.66667 8.368 8.368 8.66667 8 8.66667C7.632 8.66667 7.33333 8.368 7.33333 8C7.33333 7.632 7.632 7.33333 8 7.33333C8.368 7.33333 8.66667 7.632 8.66667 8ZM12 8C12 8.368 11.7013 8.66667 11.3333 8.66667C10.9653 8.66667 10.6667 8.368 10.6667 8C10.6667 7.632 10.9653 7.33333 11.3333 7.33333C11.7013 7.33333 12 7.632 12 8ZM5.33333 8C5.33333 8.368 5.03467 8.66667 4.66667 8.66667C4.29867 8.66667 4 8.368 4 8C4 7.632 4.29867 7.33333 4.66667 7.33333C5.03467 7.33333 5.33333 7.632 5.33333 8Z" />
                            </g>
                            <defs>
                              <clipPath id="clip0_8554_93605">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <p className="font-[400] text-[14px] leading-[24px]">
                          Let's Talk
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        {offersLoading === false && offers.length === 0 && (
          <>
            <div className="flex justify-center  items-start relative">
              <div>
                <div className="w-[100%]">
                  <Image
                    quality={100}
                    className="relative bottom-[5px] right-[-20px]"
                    width={200}
                    height={180}
                    src={"/images/booking/offers/Frame 1410127070 (1).png"}
                    alt="tick"
                  />
                </div>
                <div className="flex justify-center py-[10px]">
                  <h4 className="text-[16px] text-center font-[600] text-[#2C2240] my-[20px]">
                    No offers yet, check back in couple <br /> of hours or
                    invite more talent!
                  </h4>
                </div>
              </div>
            </div>
          </>
        )}
        {offersLoading === true && (
          <div className="px-4">
            <Skeleton className="h-[120px] w-full rounded-xl mb-4" />
          </div>
        )}
      </div>
    </>
  );
};

// export default React.memo(Offers);
export default Offers;
