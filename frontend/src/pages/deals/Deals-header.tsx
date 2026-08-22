import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiMoreVertical } from "react-icons/fi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import useClickOutSide from "@/hooks/useClickOutSide";

export default function DealsHeader() {
  const [edit, setEdit] = useState(false);
  const [addDeal, setAddDeal] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const addDealRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();


  useClickOutSide(moreRef, () => setEdit(false));
  useClickOutSide(addDealRef, () => setAddDeal(false));
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold ">Deals</h2>
        <FiChevronDown className="text-white" />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={moreRef}>
          <button
            aria-label="more"
            onClick={() => setEdit((prev) => !prev)}
            className="p-2 flex items-center border-2 rounded-md cursor-pointer"
          >
            <FiMoreVertical />
          </button>
          {edit && (
            <div
              className="absolute right-0 top-full mt-2 w-64
             bg-white rounded-lg shadow-lg border border-gray-200 
             z-50"
            >
              <ul className="p-2">
                <li
                  className="px-3 py-3 hover:bg-gray-100 
                cursor-pointer"
                  onClick={() => {
                    setEdit(false);
                    navigate("edit-properties");
                  }}
                >
                  Edit properties
                </li>
                <li
                  className="px-3 py-3 hover:bg-gray-100 
                  cursor-pointer"
                  onClick={() => {
                    setEdit(false);
                    navigate("restore");
                  }}
                >
                  Restore records
                  <span className="ml-2 text-gray-400">↗</span>
                </li>
                <li
                  className="px-3 py-3 text-gray-400 
                cursor-not-allowed"
                >
                  Restore CRM changes
                </li>
                <li
                  className="border-t mt-2 pt-2 px-3 py-3
                 hover:bg-gray-100 cursor-pointer"
                >
                  Show me what's new
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          aria-label="view-layout"
          className="p-2 flex items-center  border-2 
                    justify-center rounded-md  cursor-pointer"
        >
          <HiOutlineSquares2X2 className="" />
        </button>

        <div className="relative" ref={addDealRef}>
          <button
            className="flex items-center gap-2 cursor-pointer
                 bg-black text-white px-4 py-2 rounded-md 
                 hover:opacity-95"
            onClick={() => setAddDeal((prev) => !prev)}
          >
            <span>Add deals</span>
            <FiChevronDown className="text-white" />
          </button>
          {addDeal && (
            <div
              className="absolute right-0 top-full mt-2 w-48
             bg-white rounded-lg shadow-lg border border-gray-200
             z-50"
            >
              <ul className="">
                <li className="px-5 py-3 hover:bg-gray-100 rounded-md cursor-pointer">
                  Create new
                </li>
                <li className="px-5 py-3 hover:bg-gray-100 rounded-md cursor-pointer">
                  Import
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
