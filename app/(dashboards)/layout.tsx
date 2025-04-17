"use client";
import Breadcrumbs from "@/app/_components/ui/bread-crumbs";
import Header from "@/app/_components/ui/header";
import SideBar from "@/app/_components/ui/sidebar";
import { RootLayoutProps } from "@/app/lib/types";
import NavbarClienthub from "@/components/layout/NavbarClienthub";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="max-md:hidden"></div>
      <AppSidebar />
      <div className="flex flex-col max-h-[100dvh] w-[100%]">
        <NavbarClienthub />
        <div className="md:hidden">{children}</div>
        <div className="hidden md:flex px-4 py-4 h-[calc(100vh-65px)] w-[100%] bg-[#F6F9FC] relative">
          {/* <div className="flex">
          <SideBar />
          </div> */}
          <main className="w-[100%] h-[100%] flex flex-col px-4 pt-0 relative overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
