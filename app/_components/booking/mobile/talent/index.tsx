import MakeOffer from "@/app/_components/(mobile-version)/drawer-screens/MakeOffer";
import MobileNavbar from "@/app/_components/mobile/MobileNavbar";
import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import JobDetailsMobile from "./JobDetailsMobile";
import JobStatus from "./JobStatus";
import LoginToUnlock from "./LoginToUnlock";
import { Loader2 } from 'lucide-react';

const TalentMobile = ({ jobId }: { jobId: number }) => {
  const [alreadyOffered, setAlreadyOffered] = useState(false);
  const [loggedIn, setLoggedIn] = useState<any>(undefined);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAssignedToMe, setIsAssignedToMe] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAssigned, setIsAssinged] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [jobData, setJobData] = useState<any>(true);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError } = useError();
  const router = useRouter();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "upcoming";

  const customStyles = {
    content: {
      top: "12%",
      left: "0px",
      right: "0px",
      bottom: "0px",
      animation: "fadeIn 0.3s ease-out",
      // marginRight: '-50%',
      // transform: 'translate(-50%, -50%)',
      padding: "0",
      // borderRadius: '30px',
      // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      // width: '90%',
      // maxWidth: '650px',
      // border: '0px'
    },
    overlay: {
      // backgroundColor: 'rgba(0, 0, 0, 0.57)',
      // backdropFilter: 'blur(4px)',
      // zIndex: '1000',
    },
  };
  useEffect(() => {
    if (storedData?.token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [storedData]);

  useEffect(() => {
    const getJobDetailsApi = async () => {
      const body = {
        job_id: Number(jobId),
      };
      try {
        const newData = await apiRequest(
          `/job/getDetails`,
          {
            method: "POST",
            body: body,
            headers: {
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
            },
          },
          handleError
        );
        setJobData(newData);
        setAlreadyOffered(newData?.has_offered);
        setIsAssignedToMe(newData?.is_assigned_to_me);

        if (newData?.is_completed !== true) {
          if (newData?.has_offered === true) {
            setOpenDrawer(!openDrawer);
          }
          if (newData?.is_assigned) {
            setIsAssinged(true);
          }
        } else if (newData?.is_completed === true) {
          setIsCompleted(true);
        }
      } catch (error) { }
      finally {
        setIsLoading(false);
      }
    };

    if (loggedIn === true) {
      getJobDetailsApi();
    }
  }, [jobId, storedData, loggedIn]);

  const handleClickRequestReleaseButton = () => {
    if (jobData.payment_status !== "release_requested") {
      setIsButtonLoading(true);
      router.push(`/staff/job-detail/${jobData?.job?.id}/release-payment`);
    }
  };

  const bottomButtonText = () => {
    if (isCompleted === true && alreadyOffered === true) {
      return "View Conversation";
    }
    if (alreadyOffered === true && isAssigned === true && isCompleted === false && isAssignedToMe) {
      return "Talk to client";
    }
    if (alreadyOffered === true && isAssigned === false) {
      return "Talk to client";
    }
    if (isAssigned === true && isAssignedToMe === true) {
      return "Talk to client";
    }
    return "Submit an Offer";
  };

  const handleButtonClick = () => {
    if (alreadyOffered === true && isAssigned === true && isCompleted === false && isAssignedToMe) {
      router.push(`/staff/job-detail/${jobData?.invite?.id}/chat`);
      return;
    }
    if (alreadyOffered === true && isAssigned === true && isCompleted === false && isAssignedToMe) {
      router.push(`/staff/job-detail/${jobData?.invite?.id}/chat`);
      return;
    }
    if (alreadyOffered === true && isAssigned === false) {
      router.push(`/staff/job-detail/${jobData?.invite?.id}/chat`);
      return;
    }
    if (isAssigned === true && isAssignedToMe === true) {
      router.push(`/staff/job-detail/${jobData?.invite?.id}/chat`);
      return;
    }
    setIsButtonLoading(false);
    setModalIsOpen(true);
  }

  const shouldRenderButton = () => {
    if (alreadyOffered === false && isCompleted === true) {
      return false;
    }
    if (alreadyOffered === true && isAssigned === false) {
      return true;
    }
    if (isAssigned === true && isAssignedToMe === true) {
      return true;
    }
    if (isAssigned === false && isCompleted === false) {
      return true;
    }
    return false;
  }

  if (loggedIn === false) {
    return <LoginToUnlock />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (loggedIn === true) {
    if (modalIsOpen === true) {
      return (
        <div className="flex flex-col min-h-screen">
          <MobileNavbar />
          <div className="pt-20">
            <MakeOffer jobData={jobData} setModalIsOpen={setModalIsOpen} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col mb-24 min-h-screen">
          <MobileNavbar />
          <div
            onClick={() => {
              router.push(`${process.env.NEXT_PUBLIC_TALENTPRO_URL}/talent/events?tab=${activeTab}`)
            }}
            className="flex flex-row items-center justify-start gap-1 mt-20 mb-4 mx-4">
            <Image
              src="/images/mobile/talentpro/left.svg"
              alt="np-events"
              width={20}
              height={20}
              quality={100}
              objectFit="fill"
            />
            <p>Back</p>
          </div>
          {
            isAssignedToMe === true && isCompleted === false &&
            <div className="rounded-[4px] mb-4 mx-4 p-2 flex flex-row items-center justify-center bg-[#FFEFD7] border border-1 border-[#F4DCB9] ">
              <div className="flex flex-col w-full items-center">
                <Image
                  className="rounded-full border birder"
                  alt="Send"
                  height={135}
                  width={135}
                  src={jobData?.assigned_worker?.profile_pic}
                />
                <p className="text-[black] text-[26px] font-regular leading-[24px] mt-6 mb-4">Congratulations</p>
                <p>You have been hired</p>
                {
                  <div className="w-full mt-4 bg-[white] rounded-[8px]  py-2 px-2">
                    <p className="text-[#4C4B4B] text-[22px] font-[500] leading-[24px] mb-4">
                      My Offer
                    </p>
                    <div className="flex flex-row items-center justify-between">
                      <div>
                        <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[20px]">
                          Per hour rate
                        </p>
                        <p className="text-[#161616] text-[20px] font-[500] leading-[30px]">
                          ${jobData.per_hour_rate}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[20px]">
                          Total hours
                        </p>
                        <p className="text-[#161616] text-[20px] font-[500] leading-[30px]">
                          {jobData.total_hours} hrs
                        </p>
                      </div>
                      <div>
                        <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[20px]">
                          Total income
                        </p>
                        <p className="text-[#161616] text-[20px] font-[500] leading-[30px]">
                          ${jobData.total_income}
                        </p>
                      </div>
                    </div>
                  </div>
                }
                <div className="mt-4 bg-[#fef7e3] h-[280px] flex flex-col justify-center items-center border-l border-[#F9E2B6] rounded-lg overflow-hidden">
                  <div className="bg-[#fef7e3] h-[80%] w-full flex justify-center items-center">
                    <div className="h-[150px] flex items-center justify-end pl-[32px] pr-[16px] border-l-2 border-[#F9E2B6] relative">
                      <ul className="text-sm flex flex-col  space-y-[8px] list-disc">
                        <li>We have shared your contact information with {jobData?.job?.user?.name}. Expect a call anytime soon!</li>
                        <li>Discuss all the requirement with the Client in detail.</li>
                        <li>In case {jobData?.job?.user?.name} doesn't contact you, message them within the platform.
                           <ul className="list-disc pl-5 mt-2">
                           <li>
                              Available on Cellphone.
                            </li>
                            <li>
                              Coming soon on Desktop.
                            </li>
                           </ul>
                        </li>
                        <li>Contact us at info@updone.com in case you have any queries.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          <div className={`px-4`}>
            <JobStatus
              jobStatus={jobData?.job?.status}
              offers={jobData?.totalOffers}
            />
            <JobDetailsMobile jobData={jobData?.job} />
          </div>

          {
            alreadyOffered === true && isAssignedToMe === false &&
            <div className="rounded-[4px] mt-8 mx-4 p-2 items-center justify-center bg-[#FFEFD7] border border-1 border-[#F4DCB9]">
              <p className="text-[#4C4B4B] text-[22px] font-[500] leading-[24px] mb-4">
                My Offer
              </p>
              <div className="flex flex-row items-center justify-between px-2">
                <div>
                  <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[20px]">
                    Per hour rate
                  </p>
                  <p className="text-[#161616] text-[20px] font-[500] leading-[30px]">
                    ${jobData.per_hour_rate}
                  </p>
                </div>
                <div>
                  <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[20px]">
                    Total hours
                  </p>
                  <p className="text-[#161616] text-[20px] font-[500] leading-[30px]">
                    {jobData.total_hours} hrs
                  </p>
                </div>
                <div>
                  <p className="text-[#4C4B4B] text-[12px] font-[400] leading-[20px]">
                    Total income
                  </p>
                  <p className="text-[#161616] text-[20px] font-[500] leading-[30px]">
                    ${jobData.total_income}
                  </p>
                </div>
              </div>
            </div>
          }

          {/* <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles}
          > */}
          {/* </Modal> */}
          {
            modalIsOpen === false && (
              <div
                style={{ boxShadow: "0 -8px 12px rgba(0, 0, 0, 0.1)" }}
                className={`fixed bottom-0  bg-[white] flex flex-row w-full ${jobData?.job?.status === "completed" ? "h-30" : "h-20"}  rounded-t-2xl items-center justify-center border-[black]`}>
                {
                  jobData?.unread_message_count > 0 &&
                  <div className="p-2 flex flex-row justify-center items-center absolute bg-[#C70101] h-[24px] w-[24px] rounded-full bottom-[60%] right-[25%] z-[99]">
                    <p className="text-[white] text-[12px]">{jobData?.unread_message_count > 10 ? "10+" : jobData?.unread_message_count}</p>
                  </div>
                }
                {
                  shouldRenderButton() &&
                  <>

                    {/* Check if job is completed */}
                    {jobData?.job?.status === "completed" ? (
                      <>
                        <div className="flex pt-4 flex-row">
                          <div className="pb-4 mr-4 flex justify-center">
                            <Image
                              alt="unread-icon"
                              height={48}
                              quality={100}
                              width={48}
                              className="cursor-pointer"
                              src="/images/client-portal/all-events/Badge.svg"
                              onClick={() => {
                                handleButtonClick(); // Perform the same functionality as the button
                              }}
                            />
                          </div>
                          {/* Request Submitted / Request Payment Release Button */}
                          <button
                            className={`bg-[#350ABC] min-w-[270px] py-[12px] text-[16px] font-[400] leading-[26px] text-white mb-4 rounded-full`}
                            onClick={handleClickRequestReleaseButton}
                            disabled={jobData.payment_status !== "release_pending" || isButtonLoading}
                          >
                            {jobData.payment_status !== "release_pending" ? (
                              "Request Submitted!"
                            ) : (
                              <span className="flex items-center justify-center space-x-2">
                                {isButtonLoading ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  "Request Payment Release"
                                )}
                              </span>
                            )}
                          </button>
                          {/* Message Icon Button */}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Release Payment Button */}
                        <div className="flex flex-col">


                          {/* Bottom Button with BottomButtonText */}
                          <div className="mr-8">
                            <div className="pl-8">
                              <button
                                disabled={isButtonLoading}
                                onClick={() => {
                                  setIsButtonLoading(true);
                                  handleButtonClick();
                                }}
                                className="min-w-[200px] flex items-center justify-center bg-[#350ABC] py-[12px] text-[16px] font-[400] leading-[26px] text-[#e0d9f8] rounded-full"
                              >
                                {isButtonLoading ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  bottomButtonText()
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                  </>

                }
                {
                  alreadyOffered === false && isCompleted === true &&
                  <div className="flex flex-row items-center gap-4 justify-center px-2 w-full">
                    <Image
                      alt="Send"
                      height={30}
                      width={30}
                      src="/images/mobile/talent/lock.svg"
                    />
                    <p className="w-[60%] text-[black] text-[14px] font-[400] leading-[18px]">This job has been completed.</p>
                  </div>
                }
                {
                  isAssigned === true && isAssignedToMe === false &&
                  <div className="flex flex-row items-center gap-4 justify-center px-2">
                    <p className="w-[60%] text-[black] text-[14px] font-[400] leading-[18px]">This job is already assigned to another talent.</p>
                    {
                      <div
                        onClick={() => {
                          if (alreadyOffered === true) {
                            router.push(`/staff/job-detail/${jobData?.invite?.id}/chat`);
                          }
                        }}
                        className={`${alreadyOffered === true ? "bg-[#FFEFD7]" : "bg-gray-300"}  px-2 py-1 items-center flex flex-row gap-4 flex flex-row border border-1 border-[#E4CEAE] rounded-full`}>
                        <Image
                          alt="Back"
                          height={16}
                          width={16}
                          src="/images/mobile/talent/chat.svg"
                        />
                        <p className="text-[#794A00] text-[14px] font-[400] leading-[24px]">Load Chat</p>
                      </div>
                    }
                  </div>
                }
              </div>
            )
          }
          {/* {openDrawer === true && alreadyOffered === false && (
            <TalentOfferDrawer
              setOpenDrawer={setOpenDrawer}
              openDrawer={openDrawer}
              jobData={jobData}
            />
          )}
          {openDrawer === true &&
            alreadyOffered === true &&
            isAssigned === false &&
            isCompleted === false && (
              <TalentAlreadyOfferedDrawer
                setOpenDrawer={setOpenDrawer}
                openDrawer={true}
                jobData={jobData}
              />
            )}
          {openDrawer === true &&
            (isAssigned === true || isCompleted === true) && (
              <TalentAssignedDrawer
                setOpenDrawer={setOpenDrawer}
                openDrawer={true}
                jobData={jobData}
              />
            )} */}
        </div >
      );
    }

  }
};

export default TalentMobile;
