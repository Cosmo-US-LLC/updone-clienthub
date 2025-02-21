'use client'
import NoDataFound from '@/app/_components/ui/no-data-found'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div className='w-full flex justify-center items-start h-full relative' >
      <NoDataFound
        title="Share Your Feedback and Add Reviews"
        description={
          <>
            After your event, you can provide feedback and rate the talents who worked with you. Your reviews help maintain high-quality service and assist other clients in making informed decisions. We’re working on this module, and it is <strong className='text-[#774DFD] text-[20px]'>Coming Soon</strong> for you to share your thoughts!
          </>
        }
          image="/images/client-portal/payment/reviews image.webp"
      />

    </div>
  )
}

export default Page
