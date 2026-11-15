import { useState } from "react";
import { Outlet } from "react-router-dom";

import SideNav from "../../components/side-nav/SideNav";
import TopNav from "../../components/top-bar/TopBar";
import BreezeAssistant from "../../components/breeze-assistant/BreezeAssistant";

export default function Dashboard() {
  const [isBreezeAssistantOpen, setIsBreezeAssistantOpen] = useState(false);
  return (
    <div className="grid h-screen grid-rows-[45px_1fr] bg-[#333333] ">
      <div className="flex w-full  items-center">
        <TopNav
          isBreezeAssistantOpen={isBreezeAssistantOpen}
          onBreezeAssistantToggle={() =>
            setIsBreezeAssistantOpen((previous) => !previous)
          }
        />
      </div>
      <div className="flex flex-row overflow-hidden">
        <div className="w-14 shrink-0 overflow-hidden bg-[#333333]">
          <SideNav />
        </div>
        <div className="flex flex-1 overflow-hidden rounded-tl-2xl bg-white">
        {/* <main className="px-8 py-1.4  flex-1 rounded-l-5xl overflow-x-hidden overflow-y-hidden   bg-white"> */}
        {isBreezeAssistantOpen && (
          <BreezeAssistant onClose={() => setIsBreezeAssistantOpen(false)} />
        )}
        <div className="flex flex-1 min-h-0 min-w-0">
          <main
            className="h-full w-full overflow-hidden
        border border-gray-300 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]
        p-3"
          >
            <Outlet />
          </main>
        </div>
        </div>
      </div>
    </div>
  );
}