"use client";
import Breadcrumbs from "@/app/_components/ui/bread-crumbs";
import Header from "@/app/_components/ui/header";
import SideBar from "@/app/_components/ui/sidebar";
import { RootLayoutProps } from "@/app/lib/types";
import NavbarClienthub from "@/components/layout/NavbarClienthub";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Image from "next/image";
import NavBarData from "./home/navbar";
import { SidebarDesktop } from "@/components/ui/sidebarDesktop";

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div>
      <div className="max-md:hidden fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <NavBarData />
      </div>

      {/* Sidebar and Content Layout */}
      <SidebarProvider>
        <div className="flex min-h-screen w-full pt-[65px]">
          <div className="max-md:hidden w-[100px]">
            {/* <AppSidebar /> */}
            <SidebarDesktop />
          </div>
          {/* Content Area */}
          <div className="flex flex-col w-full">
            {/* <NavbarClienthub /> */}
            <div className="md:hidden">{children}</div>
            <div className="hidden md:flex px-4 py-4 h-[calc(100vh-65px)] w-full bg-[#F6F9FC] relative">
              <main className="w-full h-full flex flex-col px-4 pt-0 relative overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default RootLayout;