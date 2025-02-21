import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "About Updone - Connecting Events with Top Talent | Updone.com",
    description:
      "Updone connects hosts with skilled bartenders, mixologists, waiters, and service professionals for weddings, parties, and special occasions. Our mission is to make every gathering seamless with reliable, high-quality talent. Learn more about how we do it!",
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
