import { Outlet } from "react-router";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";

function DashboardLayout() {
  return (
    <div className="bg-[#f6f9fc] h-full flex flex-col">
      <Navbar />
      <div className="h-[70px] w-full"></div>
      <div className="grow p-4 flex gap-4 h-[calc(100vh-70px)]">
        <SideBar />
        <div className="grow max-h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
