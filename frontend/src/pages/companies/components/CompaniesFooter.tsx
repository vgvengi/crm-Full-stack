import React from "react";
import { LuRefreshCcw } from "react-icons/lu";

export default function CompaniesFooter() {
  return (
    <div className="flex flex-row relative group]:">
      <div className="px-3 py-0.1 bg-[#E7E7E7] rounded-2xl">
      <p> 1 Company</p>
      </div>
      <div className="flex flex-row items-center ms-auto gap-[8px]">

        <button className="border px-1 py-1 cursor-pointer rounded-2xl
         hover:bg-[#E7E7E7]">
          <LuRefreshCcw size={15} />
        </button>

          <button className="cursor-pointer px-4 py-0.1 border rounded-2xl
           hover:bg-[#E7E7E7]">Export</button>
           

        <button className="cursor-pointer px-4 py-0.1 border rounded-2xl
         hover:bg-[#E7E7E7]">Clone</button>
      </div>
    </div>
  );
}
