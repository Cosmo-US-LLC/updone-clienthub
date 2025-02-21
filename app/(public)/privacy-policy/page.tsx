"use client";
import React, { useLayoutEffect, useState } from "react";
// import { RootLayoutProps } from "../lib/types";
// import Loader from "../../_components/ui/loader";
import MobilePrivacyPolicy from "../privacy-policy/mobile/page";
import DesktopPrivacyPolicy from "../privacy-policy/desktop/page";
// import MobileLayout from "../../_components/ui/mobileLayout/MobileLayout";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="max-lg:hidden">
        <DesktopPrivacyPolicy />
      </div>
      <div className="lg:hidden">
        <MobilePrivacyPolicy />
      </div>

      {/* {is-Mobile ? (
        <MobileLayout>
          <MobilePrivacyPolicy />{" "}
        </MobileLayout>
      ) : (
        <DesktopPrivacyPolicy />
      )} */}
    </>
  );
};

export default PrivacyPolicy;
