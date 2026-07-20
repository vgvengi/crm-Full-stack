// import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
type NewTaskListProps ={
    onClose :()=>void;
}
function NewTaskList({onClose}:NewTaskListProps) {
    // const 
    const taskType =["Call","Email","Todo"];
  return (
    // <div className="fixed top-0 right-0 h-screen w-[480px] bg-white shadow-2xl z-50">

    <div className="fixed top-0 right-0 z-50 h-screen w-[480px] bg-white shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-8 py-6">
        <h2 className="text-[22px] font-bold">Create task</h2>

        <button  className="cursor-pointer" onClick={onClose}>
          <IoCloseOutline size={30} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">

        {/* Task Title */}
        <div>
          <label className="font-semibold">
            Task Title <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            className="mt-2 w-full rounded border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Task Type + Priority */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="font-semibold">
              Task Type <span className="text-red-500">*</span>
            </label>

            <button className="mt-2 flex w-full items-center justify-between rounded border px-4 py-3">
                {taskType}
              <FaChevronDown />
            </button>
          </div>

          <div>
            <label className="font-semibold">
              Priority <span className="text-red-500">*</span>
            </label>

            <button className="mt-2 flex w-full items-center justify-between rounded border px-4 py-3">
              <div className="flex items-center gap-2">
                <FaRegCircle className="text-gray-300" />
                <span>None</span>
              </div>

              <FaChevronDown />
            </button>
          </div>

        </div>

        {/* Associate */}
        <div>
          <label className="font-semibold">
            Associate with records
          </label>

          <button className="mt-2 flex w-full items-center justify-between rounded border px-4 py-3">
            <span>Associated with 0 records</span>

            <FaChevronDown />
          </button>
        </div>

        {/* Queue */}
        <div>
          <label className="font-semibold">Queue</label>

          <button className="mt-2 flex w-full items-center justify-between rounded border px-4 py-3">
            <span>None</span>

            <FaChevronDown />
          </button>
        </div>

        {/* Assigned */}
        <div>
          <label className="font-semibold">Assigned to</label>

          <button className="mt-2 flex w-full items-center justify-between rounded border px-4 py-3">
            <span>vengatesh vg</span>

            <FaChevronDown />
          </button>
        </div>

        {/* Due Date */}
        <div>
          <label className="font-semibold">Due date</label>

          <input
            type="date"
            className="mt-2 w-full rounded border px-4 py-3 outline-none"
          />
        </div>

      </div>

      {/* Footer */}
      <div className="border-t bg-white px-8 py-5">
        <div className="flex gap-3">

          <button
            disabled
            className="rounded bg-gray-100 px-8 py-3 font-semibold text-gray-400"
          >
            Create
          </button>

          <button
            onClick={onClose}
            className="rounded border px-8 py-3 font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
}

export default NewTaskList