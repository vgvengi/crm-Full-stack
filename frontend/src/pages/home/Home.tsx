// import React from 'react'
// import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaListCheck, FaPlus } from "react-icons/fa6";

import MeetingCard from "../../components/meetings/MeetingCard";
import Tasks from "../../components/tasks/Tasks";
import SalesPipeline from "../../components/sales-pipe-line/SalesPipeline";


function Home() {
      // const [clickNewTask, setClickNewTask] = useState(false);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const getGreetings = () => {
    // const hour =new Date().getHours();
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="w-full  h-full mt-10 ">
      <div className={` flex flex-col  mx-[211px]`}>
        <div className="flex flex-row items-center">
          <h3>{today}</h3>
          <div className="flex items-center ms-auto">
            <IoSettingsOutline />
            <span>Customize</span>
          </div>
        </div>
        <h3 className={`text-4xl pb-2 mt-2`}>{getGreetings()} Vengatesh</h3>
      </div>
      <div className={`mx-[211px] h-[876px] flex flex-col`}>
        <div className="flex flex-row items-center gap-1">
          <FaRegCalendarAlt />
          <p className="underline cursor-pointer hover:text-green-800">
            Meetings
          </p>
        </div>
        <div className="mt-3">
          <MeetingCard />
        </div>
        <div>
          <SalesPipeline />
        </div>
        <div className="mt-6 flex flex-row items-center gap-2">
          <FaListCheck />
          <p>Tasks</p>
          <div className="ms-auto mr-2 cursor-pointer"
          onClick={()=>setClickNewTask}
          >
            <FaPlus color="gray" />
          </div>
          <div className="flex flex-row items-center">
            <div
              className="border border-gray-500 h-[30px] cursor-pointer
             w-fit px-[4px] hover:bg-[#E6E6E6] rounded-1xl "
            >
              Open
            </div>
            <div
              className="border border-gray-500 h-[30px] px-[3px] 
            cursor-pointer hover:bg-[#E6E6E6] rounded-1xl"
            >
              Completed
            </div>
          </div>
        </div>

        <div className="w-full h-full z-40 inset-0">
          {/* <Tasks setClickNewTask={setClickNewTask(true)} /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
