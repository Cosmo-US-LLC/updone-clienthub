"use client"
import SettlementPayment from '@/app/_components/payment/SettlementPayment'
import { useError } from '@/app/lib/context/ErrorProvider'
import { stripePromise } from '@/app/lib/stripe'
import { Elements } from "@stripe/react-stripe-js"
import { useParams, useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { apiRequest } from '../../../../lib/services'
import { selectAuth } from '../../../../lib/store/features/authSlice'
import { useAppSelector } from '../../../../lib/store/hooks'

const page = () => {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [clientSecret, setClientSecret] = useState(null);
  const { handleError } = useError();
  const router = useRouter();
  const loader = 'auto';

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      try {
        const newData = await apiRequest(`/invitation/fetchOfferDetail`, {
          method: 'POST',
          headers: {
            ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
          },
          body: {
            offerId: params?.offerId
          }
        }, handleError);

        if (newData?.is_my_job === false) {
          router.push('/settlements')
        } else {
          setData(newData);
        }
      } catch (error) {
      }
    };

    if (params?.offerId) {
      fetchDataIfNeeded();
    }
  }, [params]);

  const getPaymentIntent = async () => {
    const response = await apiRequest(`/stripe/createPaymentIntent`, {
      method: 'POST',
      headers: {
        ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
      },
      body: {
        amount: parseInt(data?.settlementDetails?.settlement_amount)
      }
    }, handleError);
    if (response?.clientSecret) {
      setClientSecret(response?.clientSecret);
    }
  }

  useEffect(() => {
    if (data?.settlementDetails?.settlement_amount) {
      getPaymentIntent();
    }
  }, [data]);


  return (
    <div>
      <div className='mt-[130px] mb-[100px]'>
        <div>
          <Suspense>
            {
              data && params?.offerId && clientSecret &&
              <Elements options={{ clientSecret, loader }} stripe={stripePromise}>
                <SettlementPayment data={data} offerId={params?.offerId} clientSecret={clientSecret} />
              </Elements>
            }
          </Suspense>
        </div>
      </div>
    </div>

  )
}

export default page
