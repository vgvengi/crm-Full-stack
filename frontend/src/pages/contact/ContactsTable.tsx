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
};

function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchData =async()=>{
    try{

      const response = await fetch("http://localhost:5000/api/contacts");
      if(!response.ok){
        throw new Error("failed to fetch")
      }
      const data = await response.json();
      setContacts(data);
    } catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { id: 1, label: "Name" },
    { id: 2, label: "Email" },
    { id: 3, label: "Phone number" },
    { id: 4, label: "Contact Owner" },
    { id: 5, label: "Primary Company" },
    { id: 6, label: "Lead Status" },
    { id: 7, label: "Last activity Status" },
    { id: 8, label: "Crated Date" },
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-[1500px] w-full">
          <thead className="bg-[#cccccc]">
            <tr className="border-b">
              {columns.map((column) => (
                <th   key={column.id}
                className="px-4 py-2 text-left text-[13px] font-semibold"
                >{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className=""> 
                  <input className=""  type="checkbox"  />
                </td>
                <td>
                  {contact.first_name} {contact.last_name}
                </td>
                <td>{contact.email}</td>

                <td>{contact.phoneNumber}</td>

                <td>{contact.contactOwner}</td>
                <td>-</td>

                <td>{contact.leadStatus}</td>

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
