"use client"
import { Loader } from '@/app/_components/ui/dashboard-loader'
import { useError } from '@/app/lib/context/ErrorProvider'
import { stripePromise } from '@/app/lib/stripe'
import { Elements } from "@stripe/react-stripe-js"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentPay from '../../../../../_components/payment'
import Header from '../../../../../_components/ui/header'
import { apiRequest } from '../../../../../lib/services'
import { selectAuth } from '../../../../../lib/store/features/authSlice'
import { selectBooking, setOfferDetailData } from '../../../../../lib/store/features/bookingSlice'
import { useAppSelector } from '../../../../../lib/store/hooks'

const page = ({ params }: { params: { offerId: number } }) => {
  const selectedService = useSelector(selectBooking)
  const [data, setData] = useState<any>(null);
  const { auth: storedData } = useAppSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { handleError } = useError();
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState(null);
  const loader = 'auto';

  useEffect(() => {
    const checkIsAlreadyPaid = async () => {
      try {
        setIsLoading(true);
        const newData = await apiRequest(`/stripe/status`, {
          method: 'POST',
          headers: {
            ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
          },
          body: {
            invite_id: params?.offerId
          }
        }, handleError);
        if (newData?.isAlreadyPaid === true) {
          router.push(`/events/detail/${newData?.jobId}`);
        } else {
          await fetchDataIfNeeded();
        }
      } catch (error) {
      }
    };
    const fetchDataIfNeeded = async () => {
      try {
        setIsLoading(true);
        const newData = await apiRequest(`/invitation/fetchOfferDetail`, {
          method: 'POST',
          headers: {
            ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
          },
          body: {
            offerId: params?.offerId
          }
        }, handleError);
        setData(newData);
        if (newData) {
          dispatch(setOfferDetailData(newData))
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    checkIsAlreadyPaid();
  }, [dispatch]);

  const getPaymentIntent = async () => {
    const response = await apiRequest(`/stripe/createPaymentIntent`, {
      method: 'POST',
      headers: {
        ...(storedData && { 'Authorization': `Bearer ${storedData.token}` })
      },
      body: {
        amount: parseInt(data?.total_price)
      }
    }, handleError);
    if (response?.clientSecret) {
      setClientSecret(response?.clientSecret);
    }
  }

  useEffect(() => {
    if (data?.total_price) {
      getPaymentIntent();
    }
  }, [data]);

  return (
    <div>
      {/* <Header /> */}
      {
        isLoading === true ?
          <Loader />
          :
          <div className='mt-[30px]'>
            <div>
              {
                data && selectedService.offerId && clientSecret &&
                <Elements options={{ clientSecret, loader }} stripe={stripePromise}>
                  <PaymentPay data={data} offerId={params?.offerId} clientSecret={clientSecret} />
                </Elements>
              }
            </div>
          </div>
      }
    </div>

  )
}

export default page
