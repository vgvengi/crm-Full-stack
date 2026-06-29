import { useState } from "react";
import { GoPlus } from "react-icons/go";
import NewTaskList from "./NewTaskList";


export default function Tasks() {

    const [clickNewTask, setClickNewTask] = useState(false);
    return(
        <div className="border mt-5 h-full w-full relative">
            <div className="p-3">
            <p>You have no task today</p>
            <button  className="border rounded-[3px] mt-4 flex 
            flex-row items-center cursor-pointer"
            onClick={()=> setClickNewTask(true)}
            >
                <GoPlus/>
                <p className="px-2">New Task</p>
            </button>
            </div>
            {clickNewTask &&(
    <>
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={() => setClickNewTask(false)}
      />

      <NewTaskList onClose ={()=>setClickNewTask(false)}/>
      {/* <NewTaskDrawer onClose={() => setOpen(false)} /> */}
    </>
  )}
      </div>
    )
}