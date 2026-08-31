// import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import {
  FaRegClock,
  FaInfoCircle,
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaLink,
  FaRegImage,
} from "react-icons/fa";
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

          <div className="mt-2 flex gap-2">
            <button className="flex flex-1 items-center justify-between rounded border px-4 py-3">
              <span>In 3 business days (Thursday)</span>
              <FaChevronDown />
            </button>

            <button className="flex items-center justify-center rounded border px-4 py-3">
              <FaRegClock />
            </button>
          </div>
        </div>

        {/* Set to repeat */}
        <div className="flex items-center gap-2">
          <input type="checkbox" disabled className="h-4 w-4" />
          <span className="text-gray-400">Set to repeat</span>
          <FaInfoCircle className="text-gray-400" />
        </div>

        {/* Reminder */}
        <div>
          <label className="font-semibold">Reminder</label>

          <button className="mt-2 flex w-full items-center justify-between rounded border px-4 py-3">
            <span>No reminder</span>
            <FaChevronDown />
          </button>
        </div>

        {/* Notes */}
        <div>
          <label className="font-semibold">Notes</label>

          <div className="mt-2 rounded border">
            <textarea
              rows={5}
              className="w-full resize-none px-4 py-3 outline-none"
            />

            <div className="flex items-center gap-3 border-t px-4 py-2 text-gray-600">
              <FaBold className="cursor-pointer" />
              <FaItalic className="cursor-pointer" />
              <FaUnderline className="cursor-pointer" />
              <FaStrikethrough className="cursor-pointer" />

              <button className="flex items-center gap-1 font-semibold cursor-pointer">
                More <FaChevronDown size={12} />
              </button>

              <FaLink className="cursor-pointer" />
              <FaRegImage className="cursor-pointer" />
            </div>
          </div>
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