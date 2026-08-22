import { useState } from "react";
import { FiChevronDown, FiSearch, FiShield } from "react-icons/fi";
import SettingsSidebar from "./SettingsSidebar";

const propertyRows = [
  {
    name: "Amount",
    type: "Number",
    group: "Deal revenue",
    createdBy: "HubSpot",
    usedIn: 0,
  },
  {
    name: "Amount in company currency",
    type: "Calculation",
    group: "Deal revenue",
    createdBy: "HubSpot",
    usedIn: 0,
  },
];

const tabs = ["Properties (73)", "Conditional logic", "Groups", "Archived (0)"];

export default function EditProperties() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex h-full">
      <SettingsSidebar active="Properties" />

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <h1 className="text-2xl font-semibold">Properties</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
          Properties are used to collect and store information about your
          records in HubSpot. For example, a contact might have properties
          like First Name or Lead Status.
        </p>

        <div className="flex items-center justify-between border rounded-md px-4 py-3 mt-5">
          <div className="flex items-center gap-3">
            <span className="font-medium text-sm">Select an object:</span>
            <button className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm">
              Deal properties
              <FiChevronDown />
            </button>
          </div>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Go to Deals settings
          </a>
        </div>

        <div className="flex items-center gap-6 border-b mt-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {["All groups", "All field types", "All users", "All properties"].map(
              (label) => (
                <button
                  key={label}
                  className="flex items-center gap-1 text-sm font-medium border-b border-transparent hover:border-gray-400 cursor-pointer"
                >
                  {label}
                  <FiChevronDown />
                </button>
              )
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiShield />
            <span>Data quality monitoring is off</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md px-3 py-2 w-80">
            <input
              type="text"
              placeholder="Search properties"
              className="flex-1 outline-none text-sm"
            />
            <FiSearch className="text-gray-400" />
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:opacity-95 cursor-pointer">
            Create property
          </button>
        </div>

        <div className="mt-4 border rounded-md overflow-hidden">
          <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr] bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 border-b">
            <input type="checkbox" />
            <span>Name ↑</span>
            <span>Group</span>
            <span>Created by</span>
            <span>Used In</span>
            <span>Fill Rate</span>
          </div>

          {propertyRows.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr] px-3 py-3 text-sm border-b last:border-b-0 items-center"
            >
              <input type="checkbox" />
              <div>
                <p className="text-blue-600 font-medium">{row.name}</p>
                <p className="text-gray-400 text-xs">{row.type}</p>
              </div>
              <span>{row.group}</span>
              <span>{row.createdBy}</span>
              <span>{row.usedIn}</span>
              <span className="text-gray-400">—</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
