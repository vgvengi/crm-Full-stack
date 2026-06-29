import { RiContactsBook3Line } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import Contacts from "../../pages/contact/Contacts";


function SideNav() {
  const navigate =useNavigate();
  const [activeColor, setActiveColor] = useState("");
  const sideNavList = [
    {
      id: "homes",
      label: "Home",
      icon: MdOutlineHome,
      path : "/",
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: RiContactsBook3Line,
      path : "/contacts"
    },
    {
      id: "companies",
      label: "Companies",
      icon: FaBuilding,
      path : "/companies"
    },
  ];

  return (
    <div className="bg-[#333333] flex flex-col  ">
      {sideNavList.map((sideNavigate, index) => {
        const Icon = sideNavigate.icon;
        return (
          <div key={sideNavigate.id}>
            <button className={`flex justify-center items-center
             cursor-pointer ml-1 h-10 w-10 rounded-full hover:bg-[#4D4D4D]
             ${
              location.pathname === sideNavigate.path ? 'bg-[#4D4D4D]': 'hover:bg-[#4D4D4D]'
             }
             `}
          onClick={()=>{
            navigate(sideNavigate.path);
            setActiveColor(sideNavigate.id);
          
          }}
          >
              <Icon className="" size={16} color="white" />
            </button>

            {index === 0 && (
              <div className="w-6 h-1px ml-3 bg-white my-2"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SideNav;
