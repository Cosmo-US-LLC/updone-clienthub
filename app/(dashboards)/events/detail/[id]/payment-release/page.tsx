"use client";
import { useEffect, useState, useCallback } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import StripeMobile from "@/app/_components/PaymentMobile";
import { stripePromise } from "@/app/lib/stripe";
import { useError } from "@/app/lib/context/ErrorProvider";
import { apiRequest } from "@/app/lib/services";
import { useAppSelector } from "@/app/lib/store/hooks";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import {
  selectBooking,
  setOfferDetailData,
} from "@/app/lib/store/features/bookingSlice";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const Page = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [customerSessionToken, setCustomerSessionToken] = useState("");
  const { handleError } = useError();
  const { auth: storedData } = useAppSelector(selectAuth);

  const getPaymentIntent = async () => {
    setIsLoading(true);
    const response = await apiRequest(
      `/stripe/CreatePaymentIntentForReleaseRequest`,
      {
        method: "POST",
        headers: {
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
        body: {
          job_id: params?.id,
        },
      },
      handleError
    );
    if (response?.clientSecret) {
      setClientSecret(response?.clientSecret);
      setCustomerSessionToken(response?.customer_session_client_secret);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPaymentIntent();
  }, [data]);

  return (
    <div className="min-h-full bg-white flex flex-col">
      <Link
        href={"/events/detail/" + params?.id + "/payment-request"}
        className="text-xs text-neutral-500 flex items-center gap-2 pt-4 px-4 lg:hidden"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 flex justify-center max-lg:max-h-[70svh] items-start lg:items-center">
          {clientSecret && (
            <Elements
              options={{
                clientSecret,
                customerSessionClientSecret: customerSessionToken,
              }}
              stripe={stripePromise}
            >
              <StripeMobile
                jobId={params.id}
                clientSecret={clientSecret}
                customerSessionToken={customerSessionToken}
              />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
