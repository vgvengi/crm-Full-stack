import { useState } from "react";
import { FiInfo, FiChevronDown } from "react-icons/fi";
import SettingsSidebar from "../SettingsSidebar";
import Callings from "../../callings/Callings";

const tabs = [
  "Profile",
  "Email",
  "Calling",
  "Calendar",
  "Tasks",
  "Security",
  "Automation",
];

export default function GeneralProperty() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex h-full">
      <SettingsSidebar active="General" />

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <h1 className="text-2xl font-semibold">General</h1>

        <div className="flex items-center gap-6 border-b mt-4">
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

        {activeTab === "Profile" ? (
          <div className="max-w-2xl">
            <p className="text-sm text-gray-500 mt-4 pb-4 border-b">
              These preferences only apply to you.
            </p>

            <h2 className="text-lg font-semibold mt-6">Global</h2>
            <p className="text-sm text-gray-500 mt-1">
              This applies across any HubSpot accounts you have.
            </p>

            <div className="mt-5">
              <p className="text-sm font-semibold mb-2">Profile Image</p>
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                >
                  <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold mb-2">First name</p>
              <input
                type="text"
                defaultValue="vengatesh"
                className="w-full border rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold mb-2">Last name</p>
              <input
                type="text"
                defaultValue="vg"
                className="w-full border rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold">Language</p>
                <FiInfo className="text-gray-400" />
              </div>
              <button className="w-full flex items-center justify-between border rounded-md px-3 py-2 text-sm mt-2">
                English
                <FiChevronDown />
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold">
                  Date, time, and number format
                </p>
                <FiInfo className="text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Format: August 20, 2026, 08/20/2026, 8:40 AM EDT, and 1,234.56
              </p>
              <button className="w-full flex items-center justify-between border rounded-md px-3 py-2 text-sm mt-2">
                United States
                <FiChevronDown />
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold">Phone number</p>
              <p className="text-xs text-gray-500 mt-1">
                We may use this phone number to contact you about security
                events. Please refer to our privacy policy for{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  more information
                </a>
              </p>
              <div className="flex mt-2">
                <button className="flex items-center gap-1 border rounded-l-md px-3 py-2 text-sm border-r-0">
                  US
                  <FiChevronDown />
                </button>
                <input
                  type="text"
                  defaultValue="+1"
                  className="flex-1 border rounded-r-md px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <h2 className="text-lg font-semibold mt-8">Defaults</h2>
            <p className="text-sm text-gray-500 mt-1">
              This only applies to this HubSpot account.
            </p>

            <div className="mt-5">
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold">Default Landing Page</p>
                <FiInfo className="text-gray-400" />
              </div>
              <button className="w-full flex items-center justify-between border rounded-md px-3 py-2 text-sm mt-2">
                Pick a default home page
                <FiChevronDown />
              </button>
            </div>
          </div>
        ) : activeTab === "Calling" ? (
          <Callings />
        ) : (
          <p className="text-sm text-gray-500 mt-6">
            {activeTab} settings coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
