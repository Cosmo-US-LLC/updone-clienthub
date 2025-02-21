"use client";
import React, { useState, useEffect } from "react";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import { useAppSelector } from "@/app/lib/store/hooks";
import { useError } from "@/app/lib/context/ErrorProvider";
import { usePathname, useRouter } from "next/navigation";
import LoginToUnlock from "@/app/_components/booking/mobile/talent/LoginToUnlock";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

function AdditionalPay({
  additionalHours,
  additionalAmount,
}: {
  additionalHours: number;
  additionalAmount: number;
}) {
  return (
    <div className="w-full shadow-lighter-soft bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[16px] font-poppins font-[500] text-[#161616]">
          Payment For Extra Hours
        </h2>
      </div>
      <div>
        <div className="border-b border-gray-200 py-3 flex justify-between items-center">
          <span className="text-[15px] font-poppins font-[400] text-[#4C4B4B]">
            Hours
          </span>
          <span className="text-[20px] font-poppins font-[400] text-[#161616]">
            {additionalHours}hr
          </span>
        </div>
        <div className="py-3 flex justify-between items-center">
          <span className="text-[15px] font-poppins font-[400] text-[#4C4B4B]">
            Additional Amount
          </span>
          <span className="text-[20px] font-poppins font-[400] text-[#161616]">
            ${additionalAmount}
          </span>
        </div>
      </div>
    </div>
  );
}

function Page({ params }: { params: { id: number } }) {
  const pathname = usePathname();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState<any>(undefined);
  const { auth: storedData } = useAppSelector(selectAuth);
  const { handleError } = useError();
  const [selectedTipPercentage, setSelectedTipPercentage] = useState<
    number | null
  >(null);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const initialPayment = data?.initial_payment || 0;
  const additionalAmount = data?.additional_amount_requested || 0;
  const additionalHours = data?.additional_hours_worked || 0;
  const tipAmount = selectedTipPercentage
    ? (initialPayment * selectedTipPercentage) / 100
    : 0;
  const totalAmount = initialPayment + additionalAmount + tipAmount;
  const talentName = data?.talent_details?.full_name || "Talent";

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      try {
        const newData = await apiRequest(
          `/client/payment-request`,
          {
            method: "POST",
            headers: {
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
            },
            body: {
              job_id: params?.id,
            },
          },
          handleError
        );
        setData(newData);
      } catch (error) {
        setError("Failed to load payment data.");
      } finally {
        setLoading(false);
      }
    };

    // if (params?.id && loggedIn) {
    fetchPaymentRequest();
    // }
  }, [params?.id, loggedIn]);

  const handleTipSelection = (percentage: number) => {
    // Toggle selection: If the percentage is already selected, unselect it
    if (selectedTipPercentage === percentage) {
      setSelectedTipPercentage(null); // Unselect
    } else {
      setSelectedTipPercentage(percentage); // Select the new percentage
    }
  };

  const handleReleasePayment = async () => {
    setProcessing(true);

    try {
      if (!selectedTipPercentage && data?.includes_settlement === false) {
        await apiRequest(
          `/job/approveReleaseRequest`,
          {
            method: "POST",
            headers: {
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
            },
            body: {
              job_id: params?.id,
            },
          },
          handleError
        );
        router.push(`/events/detail/${params?.id}/payment-request/success`);
      } else {
        if (selectedTipPercentage) {
          const tipAmount = (initialPayment * selectedTipPercentage) / 100;
          await apiRequest(
            `/job/addTip`,
            {
              method: "POST",
              headers: {
                ...(storedData && {
                  Authorization: `Bearer ${storedData.token}`,
                }),
              },
              body: {
                job_id: params?.id,
                tip_amount: tipAmount,
              },
            },
            handleError
          );
        }
        router.push(`/events/detail/${params?.id}/payment-release`);
      }
    } catch (error) {
      alert("Failed to release payment. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (storedData?.token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [storedData]);

  // if (loggedIn === false) {
  //   return <LoginToUnlock isClient={true} />;
  // }

  
  if (loading || !loggedIn) {
    if (!loggedIn && !loading) {
      const isUpdoneDomain = window.location.hostname.includes("updone");
      // localStorage.setItem('callbackUrl', pathname)
      Cookies.set("callbackUrl", pathname, {
        expires: 30,
        // path: "/",
        // ...(isUpdoneDomain && { domain: ".updone.com" }),
      });
      router.push(`${process?.env?.NEXT_PUBLIC_BASE_URL}/signin`);
    }
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (
    data?.job_status !== "completed" ||
    (data?.release_status !== "release_requested" &&
    data?.release_status !== "release_approved")
  ) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          {data?.job_status !== "completed" && (
            <p className="text-gray-600">Job not completed yet.</p>
          )}
          {data?.release_status !== "release_requested" && (
            <p className="text-gray-600">Payment release not requested yet.</p>
          )}
          <p
            onClick={() => {
              location.reload();
            }}
            className="text-blue-400 text-center cursor-pointer"
          >
            Refresh
          </p>
        </div>
      </div>
    );
  } else {
    if (loggedIn === true) {
      return (
        // ${is-Mobile === false ? "w-[51%] mt-4 mx-auto" : ""}
        <div
          className={`lg:w-[51%] lg:mt-4 lg:mx-auto flex flex-col h-[calc(100dvh-60px)] rounded-xl overflow-hidden bg-[#F3F0FF]`}
        >
          <div
            style={{
              scrollbarWidth: "none", // For Firefox
              msOverflowStyle: "none", // For IE
            }}
            className="flex flex-col gap-4 overflow-y-auto p-4 pb-[190px]"
          >
            {/* Celebration Section */}
            <div className="flex flex-col shadow-lighter-soft bg-white p-4 rounded-lg">
              <div className="flex mb-4">
                <img
                  src="/images/client-portal/event-details/glass-yellow.svg"
                  alt="Celebration"
                  className="h-12"
                />
              </div>
              <h1 className="text-[20px] text-blackCustom font-[500] leading-[1.5] mb-2">
                Congratulations!
              </h1>
              <p className="text-black text-[16px] font-[400] mb-1">
                We hope you had a great event with{" "}
                <span className="font-[600]">{talentName.split(" ")[0]}</span>.
              </p>
              <p className="w-full md:w-[345px] text-[#4C4B4B] text-[14px] font-poppins font-[400] leading-[1.6]">
                Let’s release the payment.
                {/* <span className="font-[700]">{talentName}</span>. */}
              </p>
            </div>

            {/* Initial Payment */}
            <div className="shadow-lighter-soft bg-white p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-[#161616] text-[16px] font-poppins font-[500] leading-[1]">
                  Initial Payment
                </span>
                <span className="text-[20px] font-poppins font-[600] text-[#161616]">
                  ${initialPayment}
                </span>
              </div>
            </div>

            {data?.includes_settlement && (
              <AdditionalPay
                additionalHours={additionalHours}
                additionalAmount={additionalAmount}
              />
            )}
            <div className="flex flex-col shadow-lighter-soft bg-white p-4 rounded-lg gap-3 mb-10">
              <p className="text-[rgb(22,22,22)] text-[16px] font-poppins font-[500] leading-[1.6]">
                Tip Your Talent
              </p>
              <div className="flex flex-wrap gap-3 w-full">
                {[16, 18, 20, 22].map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleTipSelection(percentage)}
                    className={`flex justify-center items-center cursor-pointer py-2 px-3 w-[48%] rounded-full border ${
                      selectedTipPercentage === percentage
                        ? "bg-[#350ABC] text-white"
                        : "bg-white text-gray-600 border-gray-300"
                    } ${
                      selectedTipPercentage !== percentage
                        ? "hover:bg-transparent hover:text-gray-600 hover:border-gray-300"
                        : ""
                    }`}
                  >
                    <span className="flex justify-between items-center gap-2">
                      <span className="text-[16px] font-poppins font-[600]">
                        $
                        {((initialPayment * percentage) / 100)
                          .toFixed()
                          .replace(/(\d+\.\d{2})/, (match) => {
                            const [whole, fraction] = match.split(".");
                            return fraction[1] >= "5"
                              ? (parseFloat(whole) + 1).toFixed(2)
                              : whole + "." + fraction[0] + "0";
                          })}
                      </span>
                      <span className="text-[16px] font-poppins font-[400] ">
                        {percentage}%
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          {/* ${is-Mobile === false ? "max-w-[50%] mt-4 mx-auto" : ""} */}
          <div
            className={`lg:max-w-[50%] lg:mt-4 lg:mx-auto flex flex-col gap-5 absolute left-0 right-0 bottom-0 shadow-lighter-soft bg-white rounded-t-3xl p-6 z-10`}
          >
            {data?.includes_settlement && (
              <div
                className={`flex justify-between items-center ${
                  !selectedTipPercentage ? "border-b border-gray-200 pb-2" : ""
                }`}
              >
                <span className="text-[#161616] text-[16px] font-poppins font-[400] leading-[1.6] pt-2">
                  Additional Amount
                </span>
                <span className="text-[22px] font-poppins font-[500] text-[#161616]">
                  ${Math.round(additionalAmount)}
                </span>
              </div>
            )}
            {selectedTipPercentage && (
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-[#161616] text-[16px] font-poppins font-[400] leading-[1.6] pt-2">
                  Tip
                </span>
                <span className="text-[22px] font-poppins font-[500] text-[#161616]">
                  ${tipAmount.toFixed()}
                </span>
              </div>
            )}
            {/* <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-[#161616] text-[16px] font-poppins font-[500] leading-[1.6] pt-2">
                Total Amount
              </span>
              <span className="text-[24px] font-poppins font-[500] text-[#161616]">
                ${totalAmount.toFixed()}
              </span>
            </div> */}
            <div className="flex justify-center items-center">
              <button
                className={`min-w-[300px] text-[18px] font-poppins font-[500] tracking-wide py-3 px-6 rounded-full bg-[#350ABC] text-white`}
                onClick={handleReleasePayment}
                disabled={
                  processing ||
                  data?.already_released ||
                  data?.release_status !== "release_requested"
                }
              >
                {processing ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : data?.already_released ? (
                  "Already Released"
                ) : selectedTipPercentage &&
                  data?.additional_amount_requested ? (
                  `Pay $${Math.round(tipAmount + additionalAmount)}`
                ) : selectedTipPercentage ? (
                  `Pay $${Math.round(tipAmount)}`
                ) : data?.additional_amount_requested ? (
                  `Pay $${Math.round(additionalAmount)}`
                ) : (
                  "Release Payment"
                )}
              </button>
            </div>

            {/* <div className="flex justify-center items-center">
              <button
                className={`text-[16px] font-poppins font-[500] w-full tracking-wide py-3 px-6 rounded-full ${
                  processing || data?.already_released === true
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-black text-white"
                }`}
                onClick={handleReleasePayment}
                disabled={processing || data?.already_released === true}
              >
                {processing
                  ? "Processing..."
                  : data?.already_released === true
                  ? "Already Released"
                  : "Release Payment"}
              </button>
            </div> */}
          </div>
        </div>
      );
    }
  }
}

export default Page;
