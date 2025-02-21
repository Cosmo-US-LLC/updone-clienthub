"use client";
import React, { useEffect, useState } from "react";
import Loader from "../_components/ui/loader";
import loadable from "../_components/ui/lazy-load";
import MobileFooter from "../_components/mobile/MobileFooter";
import Home from "../_components/home";

// Lazy load the Home component with a loader
const LazyHome = loadable(() => import("../_components/home"), {
  loading: () => <Loader />,
});
const LazyMobileLayout = loadable(() => import("../_components/mobile"), {
  loading: () => <Loader />,
});

const Page = () => {
  return (
    <>
      <div className="max-lg:hidden">
        <Home />
      </div>

      <div className="lg:hidden flex flex-col min-h-screen relative">
        <main>
          <LazyMobileLayout />
        </main>
      </div>
    </>
  );
};

export default Page;
