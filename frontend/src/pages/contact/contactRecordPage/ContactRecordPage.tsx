import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { MdKeyboardArrowRight } from "react-icons/md";
import { User } from "lucide-react";
import { BiSolidPencil } from "react-icons/bi";
import { PiNotePencilThin } from "react-icons/pi";

import RecordLayOut from "@/layouts/record/RecordLayOut";

import { IoIosArrowDown } from "react-icons/io";
import ActionList from "./ActionList";
import useClickOutSide from "@/hooks/useClickOutSide";
import QuickAcitionButton from "../../../components/contact-record/QuickActionButtons";
import MoreMenu from "@/components/contact-record/MoreMenu";
import NotePanel from "@/components/contact-record/NotePanel";

type Contacts = {
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
type Prop ={
  contact_id : number;
  contact_name : string;
  onClose:()=>void
}

function ContactRecordPage() {
  const { id } = useParams();
  const handleRef = useRef<HTMLDivElement>(null);
  const [contacts, setContacts] = useState<Contacts | null>(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const [noteOpen, setNoteOpen] = useState(false);
  const [actionList, setActionList] = useState(false);

  useClickOutSide(handleRef, () => {
    setActionList(false);
  });

  // this function defines which button do you click ,if you click note button note state will change

  function handleQuickAction(key:string) {
    if (key === "note") setNoteOpen(true);
    if (key === "email") window.location.href = `mailto:${contacts?.email}`;
  }

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/contacts/${id}`,
        );
        if (!response.ok) throw new Error("Failed to Fetch Contact id ");
        const data = await response.json();
        console.log(data);
        setContacts(data);
      } catch (err) {
        console.error("Unable to load contact", err);
        setError(true);
      }
    }
    void fetchContact();
  }, [id]);

  if (error) return <p className="p-4">Contact not found.</p>;
  if (!contacts) return <p className="p-4">Loading...</p>;

  return (
    <RecordLayOut
      left={
        <>
          <div className={`border p-4 rounded-2xl  `}>
            <div
              className="flex flex-row justify-between relative"
              ref={handleRef}
            >
              {/*  If I click then go back to contacts  */}
              <Link
                to="/dashboard/contacts"
                className="text-sm flex items-center gap-3"
              >
                <SlArrowLeft />
                Contacts
              </Link>
              <button
                className="flex items-center gap-3 hover:bg-[#E0FCFA] px-4 py-1 cursor-pointer  rounded-2xl"
                onClick={() => setActionList((prev) => !prev)}
              >
                <span>Action</span>
                <IoIosArrowDown />
              </button>
              {actionList && (
                <div className="absolute">
                  <ActionList />
                </div>
              )}
            </div>
            <div className="flex flex-row  items-center gap-4">
              <button
                className=" group w-10 h-10 flex shrink-0  justify-center items-center 
               cursor-pointer hover:bg-gray-400 rounded-full bg-gray-100"
              >
                <User size={20} className="text-gray-700 group-hover:hidden" />
                <BiSolidPencil
                  size={20}
                  className="hidden text-gray-600 group-hover:block"
                />
              </button>
              {/* </div> */}
              <div className=" flex flex-row group items-center gap-3">
                <h2 className=" text-xl font-semibold hover:">
                  {contacts.first_name} {contacts.last_name}
                </h2>
                <BiSolidPencil className="invisible group-hover:visible" />
              </div>
            </div>
            <p className="text-sm">{contacts.jobTitle || "--"}</p>
            <a href={`mailto:${contacts.email}`}>
              <p className={` hover:underline  text-green-800`}>
                {contacts.email}
              </p>
            </a>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col items-center ">
                <QuickAcitionButton onAction={handleQuickAction}/>
              </div>
              <MoreMenu />
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex flex-row items-center gap-2 justify-between">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className={`transition ${open ? "rotate-90" : "rotate-0"} cursor-pointer`}
              >
                <MdKeyboardArrowRight size={20} />
              </button>
              <span
                className="min-w-0 flex-1 truncate text-lg font-semibold"
                title="key Information"
              >
                Key Information
              </span>
              <div>Actions</div>
            </div>
            {open && (
              <div>
                <span>Contact owner</span>
                <div>{contacts.contactOwner}</div>
              </div>
            )}
          </div>
        </>
      }
      middle={<>
      {noteOpen && (
       <NotePanel
       onClose={onc}
       />
      )}
      </>}
      right={<></>}
    />
  );

}

export default ContactRecordPage;
