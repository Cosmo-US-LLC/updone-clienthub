"use client";
import { useRouter } from "next/navigation";
import React from "react";

function layout({ children }: any) {
  const router = useRouter();

  return (
    <>
      <div className="max-lg:hidden grow max-h-full overflow-y-auto">{children}</div>
      <div className="px-4">
        <p className="lg:hidden text-[18px] pt-4 mb-2">
          ClientHub is coming soon on your cellphone!
          <br />
          <br />
          <span className="text-[16px] text-neutral-600">
            Meanwhile, you can manage your events, view offers, talk to talents,
            and hire them on desktop.
          </span>
        </p>

        <button
          onClick={() => {
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
          }}
          className="lg:hidden w-fit mx-auto mt-6 items-center justify-center min-w-[250px] py-2 rounded-full bg-[#350ABC] text-white shadow-md"
        >
          Go Back to Updone
        </button>
      </div>
    </>
  );
}

export default layout;
