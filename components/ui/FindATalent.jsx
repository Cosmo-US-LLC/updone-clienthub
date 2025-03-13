import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const FindATalent = () => {
  const router = useRouter();
  return (
    <div className="h-[86vh] flex w-full flex-col gap-8 justify-center items-center">
      <Image
        src="/images/client-portal/no event creative image.webp"
        height={300}
        width={300}
        alt="No Event Image"
        priority={true}
        quality={100}
        layout="intrinsic"
      />
      <div className="text-center  ">
        <h1 className="text-[32px] font-[400] tracking-[-1.28px] leading-normal text-[#000000]">
          Lets find a{" "}
          <span className="bg-[#2C2240] rounded-[4px] text-[#FFF] px-3">
            TALENT
          </span>
        </h1>
        <p className="text-[16px] font-[400]   leading-[28px] text-[#4C4B4B]">
          for your upcoming event or project
        </p>
      </div>

      <button
        onClick={() =>
          router.push(
            `${process.env.NEXT_PUBLIC_BASE_URL}/add-job?step=event-location`
          )
        }
        className=" bg-[#350ABC] rounded-full py-4 px-6  text-[#F3F0FF] text-[18px] leading-[26px] flex justify-center items-center gap-2 tracking-[ -0.36px] font-[400] "
      >
        Post your first event{" "}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M4.86523 10.3691H16.136"
              stroke="#F3F0FF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 4.73389L16.1354 10.3693L10.5 16.0047"
              stroke="#F3F0FF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default FindATalent;
