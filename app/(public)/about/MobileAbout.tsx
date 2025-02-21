"use client";

import React, { useState } from "react";
import Breadcrumbs from "../../_components/ui/bread-crumbs";
import Image from "next/image";
import { montserrat } from "../../lib/Fonts";
import Footer from "../../_components/ui/footer/page";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const MobileAboutPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-[100dvh] bg-white pt-20">
      {/* <div className="mt-[60px] px-4">
        <Breadcrumbs />
      </div> */}
      {/* <Image
        src="/images/about/top-background.svg"
        alt="top-background"
        width={393}
        height={600}
        // className="absolute z-[1] top-0 left-0 w-[100%]"
        className="absolute z-[1] top-0 left-0 h-[94%]"
      /> */}
      <div className="relative text-center py-10 px-4 flex flex-col items-center">
        <h2
          className={`${montserrat.className} text-[#ece9f8] text-[60px] font-[900] absolute inset-0 z-[20]`}
        >
          ABOUT US
        </h2>
        <h1
          className={`${montserrat.className} text-[#161616] text-[44px] font-[300] leading-[56px] relative z-[20]`}
        >
          About <span className="text-[#350ABC]">Updone</span>
        </h1>
        <p className="text-[18px] font-[500] leading-[22px] z-20 mt-4">
          Hire the dream team for your Events to manage professionally
        </p>
        <p className="text-[16px] font-[400] leading-[28px] z-20 text-[#6B6B6B] mt-4">
          We help Businesses make events easy.
        </p>
        <button
          onClick={() => router.push("/add-job?step=event-location")}
          className="z-20 flex flex-row items-center gap-4 bg-[#350ABC] text-white py-3 px-6 rounded mt-8 text-[16px] font-[400] leading-[26px]"
        >
          Book a Talent Now
          {/* <span>
            <Image
              src="/images/about/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
            />
          </span> */}
        </button>
      </div>

      {/* Image Section */}
      <div className="relative z-[30] mt-4">
        <Image
          src="/images/about/main_image.webp"
          alt="About Main Image"
          width={800}
          height={450}
          quality={100}
          className={`w-full transition-opacity duration-500 opacity-100`}
        />
      </div>

      {/* Mission Section */}
      <div className="relative flex items-center justify-center h-[100px] mt-4">
        <Image
          src="/images/about/top-background.svg"
          alt="top-background"
          width={393}
          height={600}
          className="absolute z-[1] bottom-[50%] left-0 w-[100%]"
        />
        {/* Vertical Line */}
        <div className="w-[1px] h-full bg-black"></div>
      </div>
      <div className="text-center mt-6 px-4 relative">
        <h2
          className={`${montserrat.className} text-[#f5f5f5] text-[56px] font-[900] absolute inset-0 z-[0]`}
          style={{ top: "-14%" }}
        >
          MISSION
        </h2>
        <div className="relative z-[10]">
          <h3
            className={`${montserrat.className} text-[#161616] text-[40px] font-[300]`}
          >
            Our Mission
          </h3>
          <p className="text-[#6B6B6B] text-[14px] md:text-[16px] leading-[1.6] mt-4">
            At Updone, we're dedicated to revolutionizing the way you find and
            hire exceptional event staff in Los Angeles. We understand the time
            and effort it takes to find the perfect professionals for your
            events, and we're committed to making that process seamless and
            efficient.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center mt-[60px] relative">
        {/* First Div */}
        <div className="w-[90%] h-[344px] p-10 flex flex-col justify-center items-center border-[1px] border-[#EBE6FF] rounded-full relative z-[30]">
          <h3
            className={`${montserrat.className} text-center mb-[24px] text-[18px] font-[400] leading-[27px] text-[#2C2240]`}
          >
            A comprehensive network of skilled professionals
          </h3>
          <p className="text-center tracking-[-0.32px] leading-[26px] font-[400] text-[#6B6B6B] text-[16px]">
            From bartenders to waiters and beyond, we connect you with the best
            talent in LA.
          </p>
        </div>

        {/* Second Div */}
        <div className="w-[90%] h-[344px] p-10 flex flex-col z-[20] justify-center items-center rounded-full bg-[#FAF8FF] relative -mt-[10%]">
          <h3
            className={`${montserrat.className} text-center mb-[24px] text-[18px] font-[400] leading-[27px] text-[#2C2240]`}
          >
            Easy booking and management
          </h3>
          <p className="text-center tracking-[-0.32px] leading-[26px] font-[400] text-[#6B6B6B] text-[16px]">
            Our user-friendly interface allows you to search, compare, and book
            professionals with just a few clicks.
          </p>
        </div>

        {/* Third Div */}
        <div className="w-[90%] h-[344px] p-10 flex flex-col z-[30] justify-center items-center rounded-full bg-[#774DFD] relative -mt-[10%]">
          <h3
            className={`${montserrat.className} text-center mb-[24px] text-[18px] font-[400] leading-[27px] text-[#EBE6FF]`}
          >
            Transparent pricing and reviews
          </h3>
          <p className="text-center tracking-[-0.32px] leading-[26px] font-[400] text-[#EBE6FF] text-[16px]">
            Make informed decisions based on clear pricing information and
            genuine client feedback.
          </p>
        </div>
      </div>

      {/* Closing Statement */}
      <div className="text-center mt-16 px-4">
        <p className="text-[#6B6B6B] text-[14px] md:text-[16px] leading-[1.6]">
          Elevate your LA events with Updone's exceptional team of skilled
          professionals. Join us in creating unforgettable experiences!
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default MobileAboutPage;
