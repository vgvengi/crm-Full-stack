import { useEffect, useState } from "react";
import { SearchX } from "lucide-react";
import { MdKeyboardArrowRight } from "react-icons/md";

const cellSize = "px-4 py-2 text-sm whitespace-nowrap "
type Contact = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  contactOwner: string;
  jobTitle: string;
  phoneNumber: string;
  lifeCycleStage: string;
  leadStatus: string;
  label: string;
};

function ContactsTable({
  selectedContacts,
  onCheckboxChange,
  selectedAll,
  onSelectAll,
  searchQuery = "",
  activeTab = "all",
}: {
  selectedContacts: number[];
  onCheckboxChange: (contactId: number) => void;
  selectedAll: boolean;
  onSelectAll: (checked: boolean) => void;
  searchQuery?: string;
  activeTab?: "all" | "my" | "unassigned";
}) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(()=>{
    async function fetchContacts(){
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts`);
        if(!response.ok) throw new Error("failed to fetch");
        const data =await response.json();
        setContacts(data);
      } catch (err) {
        console.error("Unable to load contact",err);
        setError(true);

      }finally{
        setLoading(false);
      }
    }
    void fetchContacts();
  },[]);
  // rows matching the typed name/email, falls back to all contacts when empty
  const query = searchQuery.trim().toLowerCase();
  const searchedContacts = query
    ? contacts.filter((contact) => {
        const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
        return (
          fullName.includes(query) ||
          contact.email?.toLowerCase().includes(query)
        );
      })
    : contacts;
 
  // logged in user's name, used to scope the "My contacts" tab
  const CURRENT_USER = "vengatesh";
  const filteredContacts =
    activeTab === "my"
      ? searchedContacts.filter((contact) =>
          contact.contactOwner?.toLowerCase().includes(CURRENT_USER),
        )
      : activeTab === "unassigned"
        ? searchedContacts.filter((contact) => !contact.contactOwner)
        : searchedContacts;

  const columns = [
    { id: 1, label: "Name", visible: true },
    { id: 2, label: "Phone number", visible: true },
    { id: 3, label: "email", visible: true },
    { id: 4, label: "Contact Owner", visible: true },
    { id: 5, label: "Primary Company", visible: true },
    { id: 6, label: "Lead Status" },
    { id: 7, label: "Last activity Status" },
    { id: 8, label: "Crated Date" },
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-375 w-full border-collapse">
          {filteredContacts.length > 0 && (
          <thead>
            <tr>
              <th className="w-12 px-4 py-3 text-center sticky top-0 z-20 bg-[#eaf0ef] border-b border-gray-300">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={selectedAll}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-3 text-left text-[13px] font-semibold whitespace-nowrap sticky top-0 z-10 bg-[#eaf0ef] border-b border-gray-300"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          )}
          <tbody>
            {loading ?(
              <tr><td colSpan={columns.length+1} className="py-16 text-center">Loading Contacts</td></tr>
            ):error ?(
              <tr><td>Couldn't load the contacts.Please refresh </td></tr>
            ):
            filteredContacts.length === 0 ? (
              <tr >
                <td colSpan={columns.length + 1}>
                  <div className="flex flex-col items-center justify-center gap-6 py-16 md:flex-row md:justify-center">
                    <div className="text-center md:text-left">
                      <h3 className="text-lg font-bold">
                        No Contacts match the current filters.
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        Expecting to see new Contacts? Try again in a few
                        seconds as the system catches up.
                      </p>
                    </div>
                    <SearchX size={64} className="text-gray-300" />
                  </div>
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b  border-gray-200 hover:bg-gray-50"
              >
                <td className={`px-4 py-3 text-center`}>
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => onCheckboxChange(contact.id)}
                  />
                </td>
                <td className={`${cellSize} w-50.25  whitespace-nowrap text-[#006162]  font-medium`}>
                  <div className="flex min-w-0 items-center font-medium">
                  <MdKeyboardArrowRight color="black"/>
                    <span
                      className="block max-w-40 cursor-pointer truncate hover:underline"
                      title={`${contact.first_name} ${contact.last_name}`}
                    >
                      {contact.first_name} {contact.last_name}
                    </span>
                  </div>
                </td>
                    <td className={`${cellSize} w-50.25  whitespace-nowrap text-[#006162] underline hover:ring-1 hover:ring-inset hover:ring-black`}>
                  {contact.phoneNumber}
                </td>
                <td className={ `${cellSize} w-50.25  whitespace-nowrap text-[#006162] underline  hover:ring-1 hover:ring-inset hover:ring-black`}>
                  {contact.email}
                </td>


                <td className={`${cellSize} w-50.25  py-3 whitespace-nowrap  hover:ring-1 hover:ring-inset hover:ring-black`}>{contact.contactOwner}</td>
                <td className={`${cellSize} w-50.25  py-3 whitespace-nowrap`}>-</td>
                <td className={`${cellSize}w-50.25  py-3 whitespace-nowrap`}>-</td>
                <td className={`${cellSize}w-50.25  py-3 whitespace-nowrap`}>-</td>
                <td className={`${cellSize} w-50.25  py-3 whitespace-nowrap`}>-</td>
              </tr>
              ))
            )}
          </tbody>
          
        </table>
           
      </div>
    </div>
  );
}

export default ContactsTable;
