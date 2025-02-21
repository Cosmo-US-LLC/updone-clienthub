"use client";

import PaymentSuccessfull from "@/app/_components/payment/PaymentSuccessfull";
import MobilePaymentSuccessfull from "@/app/_components/PaymentMobile/MobilePaymentSuccessfull";
import { stripePromise } from "@/app/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: number } }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const secret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
      setClientSecret(secret);
    }
  }, []);

  const loader = "auto";

  return (
    clientSecret && (
      <Elements options={{ clientSecret, loader }} stripe={stripePromise}>
        <MobilePaymentSuccessfull
          jobId={params?.id}
          clientSecret={clientSecret}
        />
      </Elements>
    )
  );
};

export default Page;
