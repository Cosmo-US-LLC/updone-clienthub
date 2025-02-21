"use client";

import { Loader2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = ({ params }: { params: { id: number } }) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const router = useRouter();

  return (
    // ${is-Mobile === false ? "w-[50%] h-full mx-auto" : "min-h-screen"} 
    <div className={`max-lg:min-h-screen lg:w-[50%] mx-auto lg:h-full lg:mx-auto flex flex-col items-center justify-center`}>
      <div className="flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-16 h-16 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>

      <h1 className="text-[18px] mx-auto text-center font-poppins font-[600] text-[#161616] mt-4">
        Payment released successfully!
      </h1>
      <p className="w-[280px] mx-auto text-[16px] font-poppins font-[400] text-[#4C4B4B] mt-2 text-center">
        Talent is notified and will receive the payment in the next 48 hours.
      </p>

      <div className="max-lg:hidden block">
          <button
            onClick={() => {
              setIsButtonLoading(true);
              router.push(`/events/detail/${params?.id}`)
            }}
            className="flex items-center justify-center mt-6 mx-auto min-w-[250px] py-2 rounded-full bg-[#350ABC] text-white shadow-md">
            {isButtonLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Go Back to Event Details"
            )}
          </button>
        </div>

      <div className="lg:hidden block">
          <button
            onClick={() => {
              setIsButtonLoading(true);
              router.push(`/`)
            }}
            className="mt-6 items-center justify-center min-w-[250px] py-2 rounded-full bg-[#350ABC] text-white shadow-md">
            Go Back to Home
          </button>
        </div>
    </div>
  );
};

export default page;
