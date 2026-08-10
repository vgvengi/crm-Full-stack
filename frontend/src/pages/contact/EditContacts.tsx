import React, { useState } from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { CiCircleList } from "react-icons/ci";
import { CgListTree } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";

interface EditCompaniesProps {
  count?: number;
  onClose: () => void;
}

function editContacts({ count = 0, onClose }: EditCompaniesProps) {
  const [showMore, setShowMore] = useState(false);
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
        <div className="flex items-center gap-2">
          <button className="flex flex-row items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition">
            <FiArrowRight />
            Assign
          </button>
          <button className="flex flex-row items-center gap-1  px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition">
            <GrEdit />
            Edit
          </button>
          <button className="flex flex-row items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition">
            <MdOutlineDelete />
            Delete
          </button>
          <button className="flex flex-row items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition">
            Review Associations
          </button>
          <button className="flex flex-row items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition">
            <FiPlus />
            Create tasks
          </button>
          <button className="flex flex-row items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition">
            <CgListTree />
            Add to static segment
          </button>
          <button className="flex flex-row items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition">
            <CiCircleList />
            Enroll in workflow
          </button>

          {/* More dropdown */}
          <div className="relative ml-2">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition flex items-center gap-1"
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
export default editContacts;
