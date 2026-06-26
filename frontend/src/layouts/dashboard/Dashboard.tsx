import { Outlet } from "react-router-dom";
import SideNav from "../../components/sidenav/SideNav";
import TopNav from "../../components/topnav/TopNav";
// import { useState } from "react";

export default function Dashboard() {
  return (
    <div className="grid h-screen grid-rows-[45px_1fr] bg-[#333333] ">
      <div className="w-full">
        <TopNav />
      </div>
      <div className="flex flex-row overflow-hidden pb-4 pr-4">
        <div className="w-16 shrink-0 overflow-hidden  bg-[#333333]">
          <SideNav />
        </div>
        <main className="ml-4 p-8 overflow-y-auto flex-1  rounded-l-3xl  bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
