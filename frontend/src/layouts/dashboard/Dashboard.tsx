import { Outlet } from "react-router-dom";
import SideNav from "../../components/sidenav/SideNav";
import TopNav from "../../components/topnav/TopNav";


export default function Dashboard() {
  return (
    <div className="grid h-screen grid-rows-[45px_1fr] bg-[#333333] ">
      <div className="w-full flex items-center">
        <TopNav />
      </div>
      <div className="flex flex-row overflow-hidden">
        <div className="w-12  overflow-hidden  bg-[#333333]">
          <SideNav />
        </div>
        <main className="p-8 overflow-y-auto flex-1  rounded-l-3xl overflow-x-hidden  bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
