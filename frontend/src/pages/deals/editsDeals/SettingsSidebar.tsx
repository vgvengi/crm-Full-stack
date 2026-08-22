import { useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronDown,
  FiSearch,
  FiExternalLink,
} from "react-icons/fi";

type NavItem = { label: string; path?: string; external?: boolean; dropdown?: boolean };
type NavGroup = { title: string; items: NavItem[] };

const settingsNavGroups: NavGroup[] = [
  {
    title: "Your Preferences",
    items: [
      { label: "General", path: "general" },
      { label: "Notifications" },
    ],
  },
  {
    title: "Account Management",
    items: [
      { label: "Account Defaults" },
      { label: "Account & Billing", external: true },
      { label: "Audit Log" },
      { label: "Users & Teams" },
      { label: "Product Updates", external: true },
      { label: "Integrations", dropdown: true },
      { label: "Marketplace Downloads" },
      { label: "Tracking & Analytics", dropdown: true },
      { label: "Privacy & Consent", dropdown: true },
      { label: "Security", dropdown: true },
      { label: "AI" },
      { label: "Payments Account" },
    ],
  },
];

export default function SettingsSidebar({ active }: { active: string }) {
  const navigate = useNavigate();

  return (
    <aside className="w-56 shrink-0 border-r overflow-y-auto py-4 pr-2">
      <button
        onClick={() => navigate("/deals")}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 px-3 mb-3 cursor-pointer"
      >
        <FiChevronLeft />
        <span className="text-black">Back to Deals</span>
      </button>

      <div className="px-3 mb-4">
        <div className="flex items-center border rounded-md px-2 py-1.5">
          <input
            type="text"
            placeholder="Search Settings"
            className="flex-1 outline-none text-sm"
          />
          <FiSearch className="text-gray-400" />
        </div>
      </div>

      {settingsNavGroups.map((group) => (
        <div key={group.title} className="mb-4">
          <p className="px-3 mb-1 text-base font-bold text-black">
            {group.title}
          </p>
          <ul className="text-sm">
            {group.items.map((item) => {
              const isActive = active === item.label;
              return (
                <li
                  key={item.label}
                  onClick={() => item.path && navigate(`/deals/${item.path}`)}
                  className={`px-3 py-2 flex items-center justify-between rounded-md cursor-pointer ${
                    isActive
                      ? "bg-gray-100 font-medium border-l-2 border-black"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.external && (
                    <FiExternalLink className="text-gray-400" />
                  )}
                  {item.dropdown && (
                    <FiChevronDown className="text-gray-400" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <p className="px-3 mb-1 text-base font-bold text-black">
        Data Management
      </p>
      <ul className="text-sm">
        <li
          onClick={() => navigate("/deals/edit-properties")}
          className={`px-3 py-2 rounded-md cursor-pointer ${
            active === "Properties"
              ? "bg-gray-100 font-medium border-l-2 border-black"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Properties
        </li>
      </ul>
    </aside>
  );
}
