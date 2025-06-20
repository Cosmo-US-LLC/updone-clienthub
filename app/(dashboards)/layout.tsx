"use client";
import Breadcrumbs from "@/app/_components/ui/bread-crumbs";
import Header from "@/app/_components/ui/header";
import SideBar from "@/app/_components/ui/sidebar";
import { RootLayoutProps } from "@/app/lib/types";
import NavbarClienthub from "@/components/layout/NavbarClienthub";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import Wrapper from "@/components/layout/Wrapper";
import { Button } from "@/components/ui/button";
import HeaderNav from "@/components/layout/HeaderNav";
import SideNav from "@/components/layout/SideNav";
import NavbarMobile from "@/components/layout/NavbarMobile";

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    // <SidebarProvider>
    //   <div className="max-md:hidden"></div>
    //   <AppSidebar />
    //   <div className="flex flex-col min-h-screen w-[100%]">
    //     <NavbarClienthub />
    //     <div className="md:hidden">{children}</div>
    //     <div className="hidden md:flex px-4 py-4 h-[calc(100vh-65px)] w-[100%] bg-[#F6F9FC] relative">
    //       {/* <div className="flex">
    //       <SideBar />
    //       </div> */}
    //       <main className="w-[100%] h-[100%] flex flex-col px-4 pt-0 relative overflow-y-auto">
    //         {children}
    //       </main>
    //     </div>\
    //   </div>
    // </SidebarProvider>
    <Wrapper>
      <NavbarMobile />
      <nav className="max-lg:hidden h-[68px] flex">
        <div className="grow">
          <HeaderNav />
        </div>
        <div className="w-[41px]"></div>
      </nav>
      <div className="grow flex">
        <div className="max-lg:hidden w-[84px]">
          <SideNav />
        </div>
        <div className="max-lg:hidden grow bg-white lg:rounded-t-[18px] lg:p-5 lg:pb-0 h-[calc(100dvh-68px)]">
          {children}
        </div>
        <main className="lg:hidden w-[100%] h-[100%] flex flex-col px-4 pt-0 relative overflow-y-auto">
           {children}
        </main>
        <div className="max-lg:hidden w-[41px]"></div>
      </div>
    </Wrapper>
  );
};

export default RootLayout;
