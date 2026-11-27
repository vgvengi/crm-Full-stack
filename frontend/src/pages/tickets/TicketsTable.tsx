import { useState } from "react";
import {
  ArrowDownWideNarrow,
  ChevronDown,
  ChevronUp,
  Filter,
  PanelsTopLeft,
  Search,
  Settings,
  Table2,
} from "lucide-react";

function TicketsTable() {
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState<"board" | "table">("board");

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-7 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex h-10 w-75 items-center gap-3 rounded-full border border-gray-300 px-4 text-gray-500 focus-within:border-gray-500">
          <Search aria-hidden="true" size={18} />
          <input
            type="search"
            aria-label="Search tickets"
            placeholder="Search ( / )"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
          />
        </label>

        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-full border border-gray-300 px-5 text-sm text-gray-800 hover:bg-gray-50"
        >
          <Filter aria-hidden="true" size={17} />
          <span>Filter</span>
        </button>

        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-full border border-gray-300 px-5 text-sm text-gray-800 hover:bg-gray-50"
        >
          <ArrowDownWideNarrow aria-hidden="true" size={17} />
          <span>Sort by</span>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-full border border-gray-300 px-4 text-sm text-gray-900 hover:bg-gray-50"
        >
          <span>Support Pipeline</span>
          <ChevronDown aria-hidden="true" size={16} />
        </button>

        <span aria-hidden="true" className="h-8 w-px bg-gray-300" />

        <div
          aria-label="Ticket view type"
          className="flex items-center rounded-full border border-gray-300 p-0.5"
        >
          <button
            type="button"
            aria-label="Board view"
            aria-pressed={activeView === "board"}
            onClick={() => setActiveView("board")}
            className={`flex size-10 items-center justify-center rounded-full ${
              activeView === "board"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <PanelsTopLeft aria-hidden="true" size={17} />
          </button>
          <button
            type="button"
            aria-label="Table view"
            aria-pressed={activeView === "table"}
            onClick={() => setActiveView("table")}
            className={`flex size-10 items-center justify-center rounded-full ${
              activeView === "table"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Table2 aria-hidden="true" size={17} />
          </button>
        </div>

        <span aria-hidden="true" className="h-8 w-px bg-gray-300" />

        <button
          type="button"
          aria-label="Ticket view settings"
          title="View settings"
          className="flex size-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <Settings aria-hidden="true" size={18} />
        </button>

        <button
          type="button"
          aria-label="Collapse ticket toolbar"
          title="Collapse toolbar"
          className="flex size-11 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <ChevronUp aria-hidden="true" size={18} />
        </button>
      </div>
    </div>
  );
}

export default TicketsTable;
