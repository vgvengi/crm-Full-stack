import { useState } from "react";

import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiSettings,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import { TbArrowsSort } from "react-icons/tb";
import { HiOutlineViewColumns, HiOutlineTableCells } from "react-icons/hi2";
import { Tooltip, TooltipContent } from "@/ui/tooltip";
import { TooltipTrigger } from "@/ui/tooltip";

export default function DealsFilter() {
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const [activeView, setActiveView] = useState<"board" | "table">("board");

  return (
    <div className="border-b">
      {/* Tabs */}
      <div className="flex items-center gap-6 px-6 pt-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 pb-3 border-b-2 cursor-pointer ${
            activeTab === "all"
              ? "border-black text-black font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <HiOutlineViewColumns size={16} />
          <span className="text-sm">All deals</span>
        </button>

        <button
          onClick={() => setActiveTab("mine")}
          className={`flex items-center gap-2 pb-3 border-b-2 cursor-pointer ${
            activeTab === "mine"
              ? "border-black text-black font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <HiOutlineTableCells size={16} />
          <span className="text-sm">My deals</span>
        </button>

        <button
          aria-label="add-view"
          className="mb-3 p-1 rounded-md text-gray-500 hover:bg-gray-100 cursor-pointer"
        >
          <FiPlus size={16} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-6 py-3">
        <div className="flex items-center gap-2 w-64 rounded-md border px-3 py-1.5 text-gray-500 hover:border-gray-400">
          <span className="text-sm">Search ( / )</span>
          <FiSearch className="ml-auto" size={16} />
        </div>

        <button className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
          <FiFilter size={14} />
          <span>Filter</span>
        </button>

        <button className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
          <TbArrowsSort size={14} />
          <span>Sort by</span>
        </button>

        <div className="ml-auto flex items-center gap-3">
          <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-black cursor-pointer">
            <span>Sales Pipeline</span>
            <FiChevronDown size={14} />
          </button>

          <div className="w-px h-6 bg-gray-200" />

          <div className="flex items-center rounded-2xl border overflow-hidden">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="board-view"
                  onClick={() => setActiveView("board")}
                  className={`p-2 cursor-pointer border-none rounded-2xl ${
                    activeView === "board"
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <HiOutlineViewColumns size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Board view</p>
              </TooltipContent>
              <TooltipTrigger asChild>
                <button
                  aria-label="table-view"
                  onClick={() => setActiveView("table")}
                  className={`p-2 cursor-pointer border-0 rounded-2xl ${
                    activeView === "table"
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <HiOutlineTableCells size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Table View</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <button
            aria-label="settings"
            className="p-2 rounded-full border text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            <FiSettings size={16} />
          </button>

          <button
            aria-label="collapse"
            className="p-2 rounded-full border text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            <FiChevronUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
