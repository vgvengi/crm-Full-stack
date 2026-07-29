import { useRef, useState, useEffect } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  ChevronDown,
  MoreVertical,
  Grid2X2,
  Settings,
  ChevronUp,
  // ToolboxIcon,
  // Flag,
  // Building2,
} from "lucide-react";
import useClickOutSide from "@/hooks/useClickOutSide";
import CreateNew from "./create-new/CreateNew";
import NewAccounts from "./create-new/NewAccounts";
import ContactsTable from "./ContactsTable";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../ui/tooltip";
// import { data } from "react-router-dom";

type Contact = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  company?: string;
  owner?: string;
};

function Contacts() {
  // open setopen is for Create Account
  const [open, setOpen] = useState(false);
  // createNew setCreateNew control the visiblity of  creating Account state
  const [createNew, setCreateNew] = useState(false);

  // for hiding the contacts
  const [isCollapase, setIsCollapse] = useState(false);

  const [showNewAccount, setShowNewAccount] = useState(false);

  // state for contact in table
  const [contacts, setContacts] = useState<Contact[]>([]);
  // state for checkbox selection
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);
  // Ref
  const ref = useRef<HTMLDivElement | null>(null);
  // Event Handling
  useClickOutSide(ref, () => {
    setOpen(false);
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contacts");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts();
  }, []);

  const handleSelectAll = (checked: boolean) => {
    setSelectedAll(checked);
    if (checked) {
      setSelectedContacts(contacts.map((contact) => contact.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleCheckboxChange = (contactId: number) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId],
    );
  };

  return (
    <div className="mt-3">
      <div className="min-h-screen p-1">
        <div className="mx-auto bg-white ">
          <div>
            {!isCollapase && (
              <>
                {/* Header */}
                <div className="flex items-center justify-between">
                  {/* <> */}
                  <div className="flex items-center gap-2">
                    <h1 className="text-[20px] font-semibold">Contacts</h1>
                    <ChevronDown size={20} />
                  </div>
                  <div className="flex gap-3 relative z-1000" ref={ref}>
                    <button className="rounded-lg border p-3 cursor-pointer hover:bg-gray-100">
                      <MoreVertical size={14} />
                    </button>
                    <button
                      className="flex items-center gap-2 rounded-lg cursor-pointer
               bg-black px-3 text-white"
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      <p className="text-[12px]">Add contacts</p>
                      <ChevronDown size={13} />
                    </button>
                    {open && (
                      <div
                        className="flex flex-col absolute top-12 left-7 py-2
                border shadow-2xl bg-white "
                      >
                        <button
                          className="w-35  px-2 py-2.5 
                  cursor-pointer hover:bg-[#cccccc]"
                          onClick={() => {
                            setOpen(false);
                            setCreateNew(true);
                          }}
                        >
                          Create new
                        </button>
                        <button
                          className="w-35 px-2 py-2.5
                   cursor-pointer hover:bg-[#cccccc]"
                        >
                          Import{" "}
                        </button>
                      </div>
                    )}
                    {createNew && (
                      <CreateNew
                        onClose={() => setCreateNew(false)}
                        onSetUpMySelf={() => {
                          setCreateNew(false);
                          setShowNewAccount(true);
                        }}
                      />
                    )}
                    {showNewAccount && (
                      <NewAccounts onClose={() => setShowNewAccount(false)} />
                    )}
                  </div>
                </div>

                {/* Tabs */}

                <div className="mt-8 flex items-center border-b">
                  {["All contacts", "My contacts", "Unassigned contacts"].map(
                    (tab, index) => (
                      <button
                        key={tab}
                        className={`mr-8 pb-4 text-[13px] ${
                          index === 0
                            ? "border-b-2 border-black font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        {tab}
                      </button>
                    ),
                  )}
                  <button className="pb-4 cursor-pointer">
                    <Plus size={16} />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex ">
              {/* Search */}

              <div className="flex w-60 items-center rounded-full border px-2 py-1">
                <input
                  placeholder="Search ( / )"
                  className="flex-1 outline-none w-full"
                />
                <Search size={20} />
              </div>

              <button className="flex items-center gap-2 rounded-full border px-3">
                <Filter size={18} />
                <p className="text-[13px]">Filter</p>
              </button>
              <button className="flex items-center gap-2 rounded-full border px-6">
                <ArrowUpDown size={18} />
                <p className="text-[13px]">Sort by</p>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="rounded-full border p-2 hover:bg-[#EBEBEB] cursor-pointer">
                    <Grid2X2 size={15} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Current view type: Table</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="rounded-full border p-2 hover:bg-[#EBEBEB] cursor-pointer">
                    <Settings size={15} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>View Settings</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="rounded-full border p-2
                   hover:bg-[#EBEBEB] cursor-pointer"
                    onClick={() => setIsCollapse(!isCollapase)}
                  >
                    <ChevronUp
                      size={15}
                      className={`transition-transform ${
                        isCollapase ? "-rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Collapse Header</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {/* Divider */}
          {/* Table */}
          <div className="overflow-x-auto rounded-xl border mt-4 ">
            <ContactsTable
              selectedContacts={selectedContacts}
              onCheckboxChange={handleCheckboxChange}
              selectedAll={selectedAll}
              onSelectAll={handleSelectAll}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
