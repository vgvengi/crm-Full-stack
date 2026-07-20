import React, { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import CompanyForm from "./CompanyForm";

export default function CompaniesHeader() {
  const [companyList, setCompanyList] = useState(false);
  // const dropDown = useRef<HTMLDivElement |null>(null);
  const dropDown = useRef<HTMLDivElement | null>(null);

  const [showForm , setShowForm]=useState(false);
  const addCompanyList = [
    {
      id: 1,
      label: "Create new",
    },
    {
      id: 2,
      label: "Import",
    },
  ];

  useEffect(() => {
    function handleEventListener(event: MouseEvent) {
      if (
        dropDown.current &&
        !dropDown.current.contains(event?.target as Node)
      ) {
        setCompanyList(false);
      }
    }
    document.addEventListener("mousedown", handleEventListener);
    return () => {
      document.removeEventListener("mousedown", handleEventListener);
    };
  }, []);

  return (
    <div className="flex items-center justify-between    ">
      <div className="flex flex-row items-center">
        <h1 className=" text-2xl font-bold">Companies</h1>
        <FaCaretDown />
      </div>

      <div className="flex items-center gap-3 relative">
        {/* More Button */}
        <button className="rounded-lg border p-2 cursor-pointer">
          <HiOutlineDotsVertical />
        </button>

        {/* Add Companies Button */}
        <div ref={dropDown} className="relative">
          <button
            className="rounded-lg bg-black px-4 py-2 text-white 
        flex flex-row  items-center gap-1 cursor-pointer"
            onClick={() => setCompanyList((prev) => !prev)}
          >
            <p> Add companies </p>
            <FaCaretDown />
          </button>
          {companyList && (
            <div
              className="border border-lightgray bg-white absolute top-11 left-10
          h-fit w-40 rounded-[10px] shadow-2xl"
            >
              {addCompanyList.map((addList) => (
                <div
                  key={addList.id}
                  className="px-7 py-3 my-2 cursor-pointer
               hover:bg-[#EBEBEB]"
               onClick={()=>{
              if(addList.label ==="Create new"){
                setShowForm(true);
                setCompanyList(false);

              }
               }}
                >
                  {addList.label}
                </div>
              ))}
            </div>
          )}
          {showForm &&(
            <div className="fixed  max-w-none min-w-[300px]   
   inset-0 z-50 flex flex-col  bg-white w-150 ms-auto shadow-2xl">
              <CompanyForm onClose={()=>setShowForm(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
