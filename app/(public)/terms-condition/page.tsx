"use client";

import React from "react";
import useIsMobile from "@/app/lib/hooks/useMobile";
import DesktopTerms from "./DesktopTerms";
import MobileTerms from "./MobileTerms";
import MobileLayout from "@/app/_components/ui/mobileLayout/MobileLayout";

const TermsAndConditionsPage = () => {

  return <>
    <div className="max-lg:hidden">
      <DesktopTerms />
    </div>
    <div className="lg:hidden">
      <MobileTerms />
    </div>
  </>

  // return is-Mobile ? (
  //   <MobileLayout>
  //     {" "}
  //     <MobileTerms />
  //   </MobileLayout>
  // ) : (
  //   <DesktopTerms />
  // );
};

export default TermsAndConditionsPage;
