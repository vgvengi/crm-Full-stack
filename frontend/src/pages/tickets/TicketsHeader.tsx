import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuTicketSlash } from "react-icons/lu";
import { FaCaretDown } from "react-icons/fa";
import { Plus, Table2 } from "lucide-react";

const ticketViews = ["All tickets", "My open tickets", "Unassigned tickets"];

function TicketsHeader() {
  const [activeView, setActiveView] = useState(ticketViews[0]);

  return (
    <div className="flex flex-col px-7 pt-8">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 cursor-pointer">
          <span className="text-2xl font-bold">Tickets</span>
          <FaChevronDown size={20} />
        </div>
        <div className="flex gap-3">
          <button className="border rounded-2xl p-3 cursor-pointer">
            <BsThreeDotsVertical size={15} />
          </button>
          <button className={`border rounded-2xl p-3 cursor-pointer`}>
            <LuTicketSlash size={15} />
          </button>
          <button className="flex cursor-pointer items-center gap-1 rounded-2xl border bg-green-800 px-2 py-2">
            <span className="text-white">Add Tickets</span>
            <FaCaretDown color="white" />
          </button>
        </div>
      </div>
      <nav
        aria-label="Ticket views"
        role="tablist"
        className="mt-5 flex items-center gap-2 border-b border-gray-200"
      >
        {ticketViews.map((view) => {
          const isActive = activeView === view;

          return (
            <button
              key={view}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveView(view)}
              className={`relative -mb-px flex cursor-pointer items-center gap-3 rounded-t-md px-2 py-2 text-sm transition-colors ${
                isActive
                  ? "border-b-2 border-gray-900 bg-gray-200 text-gray-900"
                  : "border-b-2 border-transparent text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Table2 aria-hidden="true" size={17} strokeWidth={1.8} />
              {view}
            </button>
          );
        })}
        <button
          type="button"
          aria-label="Add ticket view"
          title="Add ticket view"
          className="mb-px flex  cursor-pointer items-center justify-center rounded-md text-gray-600 hover:bg-gray-100"
        >
          <Plus aria-hidden="true" size={20} strokeWidth={1.8} />
        </button>
      </nav>
    </div>
  );
}

export default TicketsHeader;
