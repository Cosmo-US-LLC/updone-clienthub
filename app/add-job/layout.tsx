import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Create Your Event & Hire Top Talent | Updone.com",
    description:
      "Easily plan your event in just a few steps! Set your event location, date & time, choose the services you need, and invite skilled bartenders, waiters, and mixologists. Updone makes hiring event talent seamless and stress-free!",
    keywords:
      "staff listing, hire Bartenders, cocktail waiters, event servers, event organizers, staff for hire, event staffing, bartending services, event planning, event staff",
};

function layout({children}: any) {
  return (
    <>
        {children} 
    </>
  )
}

export default layout