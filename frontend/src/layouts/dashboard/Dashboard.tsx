import { Outlet } from "react-router-dom";
import SideNav from "../../components/side-nav/SideNav";
import TopNav from "../../components/top-bar/TopBar";

export default function Dashboard() {
  return (
    <div className="grid h-screen grid-rows-[45px_1fr] bg-[#333333] ">
      <div className="w-full flex items-center">
        <TopNav />
      </div>
      <div className="flex flex-row overflow-hidden">
          <div className="w-[68px] shrink-0 overflow-hidden bg-[#333333]">
          <SideNav />
        </div>
        {/* <main className="px-8 py-1.4  flex-1 rounded-l-5xl overflow-x-hidden overflow-y-hidden   bg-white"> */}
        <div className=" flex-1  min-h-0 min-w-0">
        <main className="p-3  h-full w-full overflow-y-auto overflow-x-hidden
        border border-gray-300
        rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <Outlet />
        </main>
           </div>
      </div>
    </div>
  );
}
