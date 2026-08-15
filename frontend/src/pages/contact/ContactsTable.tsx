import React, { useEffect, useState } from "react";

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
}: {
  selectedContacts: number[];
  onCheckboxChange: (contactId: number) => void;
  selectedAll: boolean;
  onSelectAll: (checked: boolean) => void;
}) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/contacts");
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { id: 1, label: "Name", visible: true },
    { id: 2, label: "Email", visible: true },
    { id: 3, label: "Phone number", visible: true },
    { id: 4, label: "Contact Owner", visible: true },
    { id: 5, label: "Primary Company", visible: true },
    { id: 6, label: "Lead Status" },
    { id: 7, label: "Last activity Status" },
    { id: 8, label: "Crated Date" },
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-[1500px] w-full border-separate [border-spacing:0_12px]">
          <thead className="bg-[#cccccc] sticky">
            <tr>
              <th className="flex items-center justify-center px-4 py-2 sticky top-0 bg-[#cccccc] z-20">
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer"
                  checked={selectedAll}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-2 text-left text-[13px] font-semibold border-r-2 border-gray-400 sticky top-0 bg-[#cccccc] z-10"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {contacts.map((contact) => (
              <tr key={contact.id} className="">
                <td className="px-4 py-1 flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => onCheckboxChange(contact.id)}
                  />
                </td>
                <td className="text-[#006162] underline">
                  {contact.first_name} {contact.last_name}
                </td>
                <td className="text-[#006162] underline">{contact.email}</td>

                <td className="text-[#006162] underline">
                  {contact.phoneNumber}
                </td>

                <td>{contact.contactOwner}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactsTable;
