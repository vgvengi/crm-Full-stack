import React, { useState } from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { CiCircleList } from "react-icons/ci";
import { CgListTree } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { Assign } from "./editContacts/Assign";

interface EditCompaniesProps {
  count?: number;
  onClose: () => void;
}

function EditContacts({ count = 0, onClose }: EditCompaniesProps) {
  const [showMore, setShowMore] = useState(false);
  // this state is for assign
  const [assign, setAssign] = useState(false);
  // this state is for edit
  const [edit, setEdit] = useState(false);
  // this state is for delete
  const[deleteRecord, setDeleteRecord] =useState(false);
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        {/* Left side - Selection count */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-900">
            {count} cont{count !== 1 ? "act" : "acts"} selected
          </span>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex relative items-center gap-2">
          <button
            className="flex flex-row items-center gap-1 px-3 py-1.5 cursor-pointer
           text-sm font-medium text-gray-700  rounded transition"
            onClick={() => setAssign((prev) => !prev)}
          >
            <FiArrowRight />
            Assign
          </button>
          {/* {assign && (
            <div className="fixed inset-0 z-[900] flex items-center justify-center">
              <Assign />
            </div>
          )} */}
          {assign && (
            <Assign count={count}
            onClose={()=>setAssign(false)}
            />
)}
          <button
            className="flex relative flex-row items-center gap-1 cursor-pointer
           px-3 py-1.5 text-sm font-medium text-gray-700  rounded transition"
            onClick={() => setEdit((prev) => !prev)}
          >
            <GrEdit />
            Edit
          </button>
          {edit && (
  <div className="fixed inset-0 z-[900] flex items-center justify-center">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      onClick={() => setEdit(false)}
    />

    {/* Modal */}
    <div className="relative w-[520px] rounded-2xl bg-white shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-12 py-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Bulk edit {count} record{count !== 1 ? "s" : ""}
        </h2>

        <button
          onClick={() => setEdit(false)}
          className="text-2xl font-light text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="px-12 py-10">
        <label className="mb-2 block text-sm font-semibold text-gray-900">
          Property to update
        </label>

        <select
          className="w-full rounded-md border border-gray-400 bg-white px-4 py-3
                     text-base text-gray-800 outline-none
                     focus:border-gray-600"
          defaultValue=""
        >
          <option value="" disabled>
            Select a property to edit
          </option>

          <option value="first_name">First name</option>
          <option value="last_name">Last name</option>
          <option value="email">Email</option>
          <option value="phoneNumber">Phone number</option>
          <option value="contactOwner">Contact owner</option>
          <option value="jobTitle">Job title</option>
          <option value="lifeCycleStage">Lifecycle stage</option>
          <option value="leadStatus">Lead status</option>
        </select>
      </div>

      {/* Footer */}
      <div className="flex gap-3 px-12 pb-7">
        <button
          disabled
          className="rounded-md bg-gray-100 px-7 py-3
                     text-sm font-semibold text-gray-400 cursor-not-allowed"
        >
          Update
        </button>

        <button
          onClick={() => setEdit(false)}
          className="rounded-md border border-gray-400 bg-white px-7 py-3
                     text-sm font-semibold text-gray-800
                     hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
          <button
            className="flex flex-row items-center gap-1  cursor-pointer
           px-3 py-1.5 text-sm font-medium text-gray-700  rounded transition"
          >
            <MdOutlineDelete />
            Delete
          </button>
          {deleteRecord && (
  <div className="fixed inset-0 z-[900] flex items-center justify-center">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      onClick={() => setDeleteRecord(false)}
    />

    {/* Modal */}
    <div className="relative w-[520px] rounded-2xl bg-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-12 py-7">
        <h2 className="text-3xl font-bold text-gray-900">
          Delete {count} record{count !== 1 ? "s" : ""}?
        </h2>

        <button
          onClick={() => setDeleteRecord(false)}
          className="text-2xl text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="px-12 py-8">
        <p className="text-base leading-7 text-gray-800">
          You're about to delete {count} record{count !== 1 ? "s" : ""}.
          Deleted records can't be restored after 90 days.
        </p>

        <p className="mt-1 text-base leading-7 text-gray-800">
          Records created after this submission will not be deleted.
        </p>

        <label className="mt-7 mb-2 block text-sm font-semibold text-gray-900">
          Type the number of records below to delete
        </label>

        <input
          type="number"
          value={deleteRecord}
          onChange={(e) => setDeleteRecord(e.target.value)}
          className="w-full rounded-md border border-gray-400 px-4 py-3
                     text-base outline-none focus:border-gray-600"
        />
      </div>

      {/* Footer */}
      <div className="flex gap-3 px-12 pb-7">
        <button
          disabled={Number(deleteRecord) !== count}
          className={`rounded-md px-7 py-3 text-sm font-semibold
            ${
              Number(deleteRecord) === count
                ? "bg-black text-white hover:bg-gray-800"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
        >
          Delete
        </button>

        <button
          onClick={() => setDeleteRecord(false)}
          className="rounded-md border border-gray-400 bg-white px-7 py-3
                     text-sm font-semibold text-gray-800 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
          <button
            className="flex flex-row items-center gap-1   cursor-pointer
          px-3 py-1.5 text-sm font-medium text-gray-700  rounded transition"
          >
            Review Associations
          </button>
          <button
            className="flex flex-row items-center gap-1  cursor-pointer
           px-3 py-1.5 text-sm font-medium text-gray-700  rounded transition"
          >
            <FiPlus />
            Create tasks
          </button>
          <button
            className="flex flex-row items-center gap-1  cursor-pointer
           px-3 py-1.5 text-sm font-medium text-gray-700  rounded transition"
          >
            <CgListTree />
            Add to static segment
          </button>
          <button
            className="flex flex-row items-center gap-1  cursor-pointer
          px-3 py-1.5 text-sm font-medium text-gray-700  rounded transition"
          >
            <CiCircleList />
            Enroll in workflow
          </button>

          {/* More dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-3 py-1.5 text-sm font-medium text-gray-700  
              rounded transition flex items-center gap-1"
            >
              <FaCaretDown />
              More
              <ChevronDown size={16} />
            </button>
            {showMore && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  More option 1
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  More option 2
                </button>
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            className="ml-2 text-gray-400 hover:text-gray-600 transition"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditContacts;
