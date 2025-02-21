"use client";
import React, { useLayoutEffect, useState } from "react";
import Layout from "../_components/ui/layout/MainLayout";
import { RootLayoutProps } from "../lib/types";
// import Loader from "../_components/ui/loader"; // Import your Loader component
import MobileLayout from "../_components/ui/mobileLayout/MobileLayout";
import MobilePageFooter from "../_components/mobile/MobilePageFooter";

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div>
      {/* Desktop View */}
      <div className="max-lg:hidden">
        <Layout>{children}</Layout>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        <MobileLayout>
          {children}
        </MobileLayout>
        
        <MobilePageFooter />
      </div>
    </div>
  );
};

export default RootLayout;
