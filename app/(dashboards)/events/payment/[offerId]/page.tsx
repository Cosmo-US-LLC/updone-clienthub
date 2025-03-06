"use client";
import { Loader } from "@/app/_components/ui/dashboard-loader";
import { useError } from "@/app/lib/context/ErrorProvider";
import { stripePromise } from "@/app/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentPay from "@/app/_components/payment";
import Header from "@/app/_components/ui/header";
import { apiRequest } from "@/app/lib/services";
import { selectAuth } from "@/app/lib/store/features/authSlice";
import {
  selectBooking,
  setOfferDetailData,
} from "@/app/lib/store/features/bookingSlice";
import { useAppSelector } from "@/app/lib/store/hooks";

const page = () => {
  const params = useParams();
  const selectedService = useSelector(selectBooking);
  const [data, setData] = useState<any>(null);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { handleError } = useError();
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState(null);
  const [customerSessionToken, setCustomerSessionToken] = useState('');
  const [loadingIntent, setLoadingIntent] = useState(true);
  // const [saveMethod, setSaveMethod] = useState<any>(true);
  const loader = "auto";

  useEffect(() => {
    const checkIsAlreadyPaid = async () => {
      try {
        setIsLoading(true);
        const newData = await apiRequest(
          `/stripe/status`,
          {
            method: "POST",
            headers: {
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
            },
            body: {
              invite_id: params?.offerId,
            },
          },
          handleError
        );
        if (newData?.isAlreadyPaid === true) {
          router.push(`/events/detail/${newData?.jobId}`);
        } else {
          await fetchDataIfNeeded();
        }
      } catch (error) {
        console.log("Error with payment intent! ", error);
      }
    };
    const fetchDataIfNeeded = async () => {
      try {
        setIsLoading(true);
        const newData = await apiRequest(
          `/invitation/fetchOfferDetail`,
          {
            method: "POST",
            headers: {
              ...(storedData && {
                Authorization: `Bearer ${storedData.token}`,
              }),
            },
            body: {
              offerId: params?.offerId,
            },
          },
          handleError
        );
        setData(newData);
        if (newData) {
          dispatch(setOfferDetailData(newData));
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    checkIsAlreadyPaid();
  }, [dispatch]);

  const getPaymentIntent = async () => {
    setLoadingIntent(true);
    const response = await apiRequest(
      `/stripe/createPaymentIntent`,
      {
        method: "POST",
        headers: {
          ...(storedData && { Authorization: `Bearer ${storedData.token}` }),
        },
        body: {
          amount: parseInt(data?.total_price),
          save_payment_method: true,
        },
      },
      handleError
    );
    if (response?.clientSecret) {
      // elements?.update({ clientSecret: response.clientSecret });
      setClientSecret(response?.clientSecret);
      setCustomerSessionToken(response?.customer_session_client_secret)
      setLoadingIntent(false);
    }
  };

  useEffect(() => {
    if (data?.total_price) {
      getPaymentIntent();
    }
  }, [data]);

  return (
    <div>
      {/* <Header /> */}
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="mt-[30px]">
          <div>
            {data && selectedService.offerId && clientSecret && (
              <Elements
                key={clientSecret}
                options={{ clientSecret, loader, customerSessionClientSecret: customerSessionToken }}
                stripe={stripePromise}
              >
                <PaymentPay
                  data={data}
                  offerId={params?.offerId}
                  clientSecret={clientSecret}
                  loadingIntent={loadingIntent}
                  // saveMethod={saveMethod}
                  // setSaveMethod={setSaveMethod}
                  customerSessionToken={customerSessionToken}
                />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
