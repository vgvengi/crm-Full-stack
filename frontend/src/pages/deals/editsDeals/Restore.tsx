import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronDown, FiCalendar, FiSearch } from "react-icons/fi";
import { PiMagnifyingGlassBold } from "react-icons/pi";

export default function Restore() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <FiChevronLeft />
          <span>Back to Deals home</span>
        </button>

        <div className="flex items-center justify-between mt-2">
          <div>
            <h1 className="text-2xl font-semibold">Restore Deals</h1>
            <p className="text-sm text-gray-500 mt-1">
              Restore Deals deleted in the last 90 days
            </p>
          </div>
          <button
            disabled
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed"
          >
            Restore
          </button>
        </div>
      </div>

      <div className="border-t mt-4" />

      <div className="flex items-center gap-4 px-6 py-4">
        <span className="text-sm text-gray-700">Date range:</span>
        <div className="flex items-center gap-2 border rounded-md px-3 py-1.5">
          <FiCalendar className="text-gray-400" />
          <input
            type="text"
            defaultValue="05/22/2026"
            className="w-24 outline-none text-sm"
          />
        </div>
        <span className="text-sm text-gray-500">to</span>
        <div className="flex items-center gap-2 border rounded-md px-3 py-1.5">
          <FiCalendar className="text-gray-400" />
          <input
            type="text"
            defaultValue="08/20/2026"
            className="w-24 outline-none text-sm"
          />
        </div>
        <button className="flex items-center gap-1 text-sm font-medium ml-4 cursor-pointer">
          Select a user
          <FiChevronDown />
        </button>
      </div>

      <div className="px-6">
        <div className="flex items-center border rounded-md px-3 py-2">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none text-sm"
          />
          <PiMagnifyingGlassBold className="text-gray-400" />
        </div>
      </div>

      <div className="px-6 mt-3 flex-1 flex flex-col overflow-hidden">
        <div className="grid grid-cols-[40px_1fr_1fr_1fr] bg-gray-50 border rounded-t-md px-3 py-2 text-sm font-medium text-gray-600">
          <input type="checkbox" className="mr-2" />
          <span>Name</span>
          <span>Deleted by</span>
          <span>Time deleted</span>
        </div>

        <div className="flex-1 border border-t-0 rounded-b-md flex flex-col items-center justify-center text-center py-16">
          <FiSearch className="text-6xl text-gray-200 mb-4" />
          <p className="text-gray-400 text-sm">No records found</p>
        </div>
      </div>
    </div>
  );
}
