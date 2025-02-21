"use client";
import React, { useState } from "react";
import Header from "../../_components/ui/header";
import Breadcrumbs from "../../_components/ui/bread-crumbs";
import Image from "next/image";
import { montserrat } from "../../lib/Fonts";
import Footer from "../../_components/ui/footer";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const page = () => {
  const [isLoading, setIsLoading] = useState(true); // Track image loading state

  const router = useRouter();
  return (
    <>
      <div className="md:max-w-[920px] lg:max-w-[1279px] lg:px-[3rem] xl:max-w-[1279px] mx-auto 2xl:max-w-[1440px]">
        {/* <Header /> */}
        <div className="mt-[115px] relative z-30">
          {/* <Breadcrumbs /> */}
        </div>
        <div className="mt-[60px]">
          <div className="flex justify-between items-start flex-col">
            <h2
              className={`text-[#ece9f8] text-[200px] absolute w-full left-0 text-center top-[140px] z-10  ${montserrat.className} font-[900] leading-[130px]`}
            >
              ABOUT US
            </h2>
            <div className="flex gap-[61px] relative z-10 mb-[30px]">
              <div className="flex flex-col relative bottom-[7px]">
                <h1
                  className={`${montserrat.className} text-[#161616] text-[90px] tracking-[-1.8px] leading-[86px] font-[900] `}
                >
                  About{" "}
                  <span className="!text-[#350ABC]">
                    {" "}
                    <br /> Updone
                  </span>
                </h1>
                <button
                  onClick={() => router.push("/add-job?step=event-location")}
                  type="button"
                  className="flex w-[80%] justify-center opacity-[90%] text-[#F3F0FF] ml-0 rounded-[4px] py-4 text-[16px] mt-5 font-[400] leading-[26px] tracking-[-2%] items-center m-auto gap-[12px] px-[20px] bg-[#2C2240] h-[px]
    transition-transform duration-150 ease-in-out transform active:scale-95 active:shadow-inner grow_ellipse"
                >
                  Book a Talent Now
                  {/* <span>
                    <Image
                      width={16}
                      height={16}
                      src="/images/booking/arrowleft.svg"
                      alt="step-1"
                    />
                  </span> */}
                </button>
              </div>
              <div>
                <h3 className="mb-[24px] text-[#2C2240] text-[24px] leading-normal font-[600] ">
                  Your LA-Based Event Staffing Solution
                </h3>
                <div className="relative">
                  {/* Left Search Icon */}
                  <div className="absolute left-[-800px] top-0 h-full flex items-center justify-center">
                    <svg
                      width="667"
                      height="751"
                      viewBox="0 0 667 751"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.07" filter="url(#filter0_f_1006_23942)">
                        <circle
                          cx="291.5"
                          cy="375.5"
                          r="225.5"
                          fill="#C728FF"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_f_1006_23942"
                          x="-84"
                          y="0"
                          width="751"
                          height="751"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feGaussianBlur
                            stdDeviation="75"
                            result="effect1_foregroundBlur_1006_23942"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>

                  {/* Right Search Icon */}
                  <div className="absolute right-[-350px] top-0 h-full flex items-center justify-center">
                    <svg
                      width="820"
                      height="910"
                      viewBox="0 0 820 910"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.08" filter="url(#filter0_f_1006_23943)">
                        <circle cx="455" cy="455" r="255" fill="#0ABCBC" />
                      </g>
                      <defs>
                        <filter
                          id="filter0_f_1006_23943"
                          x="0"
                          y="0"
                          width="910"
                          height="910"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feGaussianBlur
                            stdDeviation="100"
                            result="effect1_foregroundBlur_1006_23943"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>

                  {/* Main Content */}
                  <div
                    style={{ marginRight: "0px" }}
                    className="space-y-[34px] ml-0 text-[16px] leading-[26px] font-[500] text-[#6B6B6B] mx-[50px]"
                  >
                    <p>
                      Discover the best event staff in Los Angeles with Updone.
                      We connect clients with top-notch bartenders, barbacks,
                      waiters, cocktail servers, promo models, and event
                      helpers.
                    </p>
                    <p>
                      Whether you're planning a corporate party, wedding
                      reception, or private gathering, Updone offers a
                      hassle-free way to find reliable and experienced
                      professionals in the heart of LA. Our user-friendly
                      platform makes it easy to browse profiles, book services,
                      and communicate with talents. Experience the convenience
                      of Updone and elevate your LA events with our exceptional
                      team of skilled staff.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <>
            <Head>
              {/* Preload the image to ensure it's ready when the page is rendered */}
              <link
                rel="preload"
                href="/images/about/about main image.webp"
                as="image"
                type="image/webp"
                //@ts-ignore
                importance="high"
              />
            </Head>

            <div>
              <div className="relative w-full h-auto">
                <Image
                  src="/images/about/main_image.webp"
                  alt="About Main Image"
                  className={`transition-opacity duration-500 opacity-100`}
                  width={1000}
                  height={600}
                  quality={90}
                  layout="responsive"
                  priority={true}
                />
              </div>
            </div>
          </>
          <div className="text-center mb-24">
            <span className="absolute">
              <svg
                width="1"
                height="131"
                className={`${isLoading && "opacity-0"}`}
                viewBox="0 0 1 131"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.5"
                  y1="2.18557e-08"
                  x2="0.499994"
                  y2="131"
                  stroke="#2C2240"
                />
              </svg>
            </span>
            <h2
              className={`text-[#f5f5f5] text-[200px] relative z-[-1] top-[115px] w-full ${montserrat.className} font-[900] leading-[130px]`}
            >
              MISSION
            </h2>
            <h1
              className={`${montserrat.className} !text-[90px] relative bottom-[-60px] font-[900] leading-[100px] normal-case`}
            >
              Our Mission
            </h1>
          </div>
          <p className=" text-[#6B6B6B] text-center leading-[26px] font-[400] text-[16px] tracking-[-0.32px]">
            At Updone, we're dedicated to revolutionizing the way you find and
            hire exceptional event staff in Los Angeles. We understand the time
            and effort it takes to find the perfect professionals for your
            events, and we're committed to making that process seamless and
            efficient.
          </p>
        </div>
        <div className="flex justify-between items-center mt-[60px]">
          <div className="w-[450px] 2xl:w-[490px] 2xl:h-[490px] relative left-2 p-10 z-20 flex flex-col justify-center items-center border-[1px] border-[#EBE6FF] h-[420px] rounded-full">
            <h3
              className={`${montserrat.className} text-center mb-[24px] text-[20px] font-[600] leading-normal text-[#2C2240]`}
            >
              A comprehensive network of skilled professionals
            </h3>
            <p className="text-center tracking-[-0.32px] leading-[26px] font-[400] text-[#6B6B6B] text-[16px]">
              From bartenders to waiters and beyond, we connect you with the
              best talent in LA.
            </p>
          </div>
          <div className="w-[450px] 2xl:w-[490px] 2xl:h-[490px] p-10 flex flex-col z-10 justify-center items-center h-[420px] rounded-full bg-[#EBE6FF]">
            <h3
              className={`${montserrat.className} text-center mb-[24px] text-[20px] font-[600] leading-normal text-[#2C2240]`}
            >
              Easy booking and management
            </h3>
            <p className="text-center tracking-[-0.32px] leading-[26px] font-[400] text-[#6B6B6B] text-[16px]">
              Our user-friendly interface allows you to search, compare, and
              book professionals with just a few clicks.
            </p>
          </div>
          <div className="w-[450px] 2xl:w-[490px] 2xl:h-[490px] p-10 flex flex-col z-20 relative right-2 justify-center items-center h-[420px] rounded-full bg-[#774DFD]">
            <h3
              className={`${montserrat.className} text-center mb-[24px] text-[20px] font-[600] leading-normal text-[#EBE6FF]`}
            >
              Transparent pricing and reviews
            </h3>
            <p className="text-center tracking-[-0.32px] leading-[26px] font-[400] text-[#EBE6FF] text-[16px]">
              Make informed decisions based on clear pricing information and
              genuine client feedback.
            </p>
          </div>
        </div>
        <p className="text-[#6B6B6B] px-[100px] leading-[26px] tracking-[-0.32px] text-[16px] w-full text-center mt-[60px]">
          Discover the best event staff in Los Angeles with Updone. We connect
          clients with top-notch bartenders, barbacks, waiters, cocktail
          servers, promo models, and event helpers.
        </p>
        <div className="w-full h-52"></div>
      </div>
      <Image
        src="/images/about/about-bg.svg"
        quality={100}
        priority={true}
        width={1020}
        height={621}
        alt=""
        className="!w-full h-[100%] absolute bottom-[100px] z-[-1]"
      />
      {/* <Footer /> */}
    </>
  );
};

export default page;
