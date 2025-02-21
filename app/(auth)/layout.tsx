import React from "react";
import { RootLayoutProps } from "../lib/types";
import Image from "next/image";
import Link from "next/link";

function Layout({ children }: RootLayoutProps) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col">
      <div className="fixed top-0 left-0 w-full max-lg:hidden h-[72px] bg-white px-6 z-10 shadow-lg shadow-gray-100">
        <div className="max-w-[1280px] mx-auto h-full flex items-center">
          <Link
            href={process.env.NEXT_PUBLIC_BASE_URL || "/"}
            className="flex items-center"
          >
            <Image
              src={
                // !scrollBackground && pathName === "/"
                //   ? "icons/logo-home.svg"
                //   :
                "/logo.svg"
              }
              alt="header-logo"
              width={104}
              height={35}
              quality={100}
              objectFit="fill"
            />
          </Link>
        </div>
      </div>
      <div className="max-lg:hidden h-[72px]"></div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Login.webp" // Replace with your image path
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>

      {/* Form Container */}
      <div className="relative grow flex flex-col items-center justify-between max-lg:px-4">
        <div className="max-lg:hidden"></div>

        {children}

        <div className="w-full lg:py-5">
          <p className="max-lg:hidden text-center text-[#9F9F9F] text-[14px]">
            Copyright © 2025 Updone. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Layout;
