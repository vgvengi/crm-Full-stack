import { useState, useRef } from "react";

import { CiSearch } from "react-icons/ci";
// import { BiPlusCircle } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { GrUpgrade } from "react-icons/gr";
import { PiStarFourFill } from "react-icons/pi";

import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import useClickOutSide from "@/hooks/useClickOutSide";

import SearchInput from "./SearchInput";
import topNavItems from "./top-bar-lists/top-bar-items";
import topBarNewList from "./top-bar-lists/top-bar-new-list";


function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const createRef = useRef<HTMLDivElement | null>(null);
  useClickOutSide(ref, () => {
    setSearchOpen(false);
  });

  useClickOutSide(createRef, () => {
    setCreateNew(false);
  });
  return (
    <div className="h-full w-full flex items-center px-4">
      <div ref={ref} className="flex flex-row">
        <div
          className=" flex flex-row items-center  rounded-2xl border w-100 h-8 cursor-pointer 
      ml-14 border-0.1 hover:bg-[#4D4D4D]"
        >
          <input
            className="outline-none mx-2 my-1 w-80 placeholder-white"
            type="text"
            placeholder="Find or Ask "
            onClick={() => setSearchOpen((prev) => !prev)}
          />
          <CiSearch className="ms-auto mr-2" size={20} color="white" />
        </div>
        {searchOpen && (
          <div
            className="bg-white w-146 h-full shadow-2xl left-15 
            inset-0 z-50 fixed
        rounded-2xl"
          >
            <SearchInput />
          </div>
        )}
      </div>

      <div className="relative flex items-center" ref={createRef}>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* <div className="flex items-center"> */}
            <button
              className="w-7 h-6 ml-2 border cursor-pointer hover:bg-[#4D4D4D]  border-white rounded-[20px]"
              onClick={() => setCreateNew((prev) => !prev)}
            >
              <FaPlus className="px-1 py-1" size={25} color="white" />
            </button>
            {/* </div> */}
          </TooltipTrigger>
          <TooltipContent >
            <p>Create New</p>
          </TooltipContent>
        </Tooltip>
        {createNew && (
          <div
            // ref={createRef}
            className="w-50 h-fit top-full right-0 
              left-0 mt-3  rounded-2xl shadow-2xl  
              flex flex-col absolute bg-[#333333]"
          >
            {topBarNewList.map((newlists) => {
              return (
                <div className="px-3 py-2" key={newlists.id}>
                  <div
                    className="cursor-pointer hover:bg-[#4D4D4D]  
                  rounded-1xl"
                  >
                    <p className="px-5 py-3">{newlists.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex ms-auto">
        <div className="flex flex-row items-center gap-2 mr-2">
          <GrUpgrade color="white" />
          <p className="text-white">Upgrade</p>
        </div>
      </div>
      <div className="w-0.5 h-8 bg-[#4D4D4D] mx-2 "></div>
      <div className="flex flex-row">
        {topNavItems.map((topmenu) => {
          const Icon = topmenu.icon;
          return (
            <div className="flex flex-row" key={topmenu.id}>
              <button className="w-[30px] h-[30px] mx-[5px] p-[8px] rounded-2xl hover:bg-[#4D4D4D] cursor-pointer">
                <Icon color="#FFFFFF" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="w-0.5 h-8 bg-[#4D4D4D] mx-2 "></div>

      <div>
        <button className=" flex flex-row items-center gap-3 p-6 cursor-pointer">
          <PiStarFourFill color="white" />
          <p className="text-white">Assistant</p>
        </button>
      </div>
      <div className="w-0.5 h-8 bg-[#4D4D4D] mx-2 "></div>

      <div>
        <p
          className="p-6
        text-white"
        >
          random
        </p>
      </div>
    </div>
  );
}

export default TopNav;
