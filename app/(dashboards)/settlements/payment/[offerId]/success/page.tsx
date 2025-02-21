"use client";

import SettlementPaymentSuccessfull from '@/app/_components/payment/SettlementPaymentSuccessfull';
import { stripePromise } from '@/app/lib/stripe';
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from 'react';

const Page = ({ params }: { params: { offerId: number } }) => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        if (typeof (window) !== undefined) {
            const secret = new URLSearchParams(window.location.search).get(
                "payment_intent_client_secret"
            );
            setClientSecret(secret);
        }
    }, []);

    const loader = 'auto';

    return (
        clientSecret && (
            <Elements options={{ clientSecret, loader }} stripe={stripePromise}>
                <SettlementPaymentSuccessfull offerId={params?.offerId} clientSecret={clientSecret} />
            </Elements>
        )
    );
};

export default Page;
