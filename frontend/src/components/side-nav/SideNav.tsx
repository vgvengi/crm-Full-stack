import { RiContactsBook3Line } from "react-icons/ri";
import { FaBuilding, FaRegHandshake } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";

import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

// import Contacts from "../../pages/contact/Contacts";

function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const sideNavList = [
    {
      id: "homes",
      label: "Home",
      icon: MdOutlineHome,
      path: "/dashboard",
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: RiContactsBook3Line,
      path: "/dashboard/contacts",
    },
    {
      id: "companies",
      label: "Companies",
      icon: FaBuilding,
      path: "/dashboard/companies",
    },
    {
      id: "deals",
      label: "Deals",
      icon: FaRegHandshake,
      path: "/dashboard/deals",
    },
  ];

  return (
    <div className="h-full w-full bg-[#333333] flex flex-col items-center pt-3">
      {sideNavList.map((sideNavigate, index) => {
        const Icon = sideNavigate.icon;
        return (
          <div
            key={sideNavigate.id}
            className="w-full flex flex-col items-center"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`flex h-10 w-10 shrink-0 items-center justify-center p-0
             cursor-pointer rounded-full hover:bg-[#4D4D4D]
             ${
               location.pathname === sideNavigate.path
                 ? "bg-[#4D4D4D]"
                 : "hover:bg-[#4D4D4D]"
             }
              `}
                  onClick={() => {
                    navigate(sideNavigate.path);
                  }}
                >
                  {/* {sideNavigate.icon} */}
                  <div className="flex h-5 w-5 items-center justify-center">
                    <Icon className="" size={16} color="white" />
                  </div>
                  {/* <p className="text-white">{sideNavigate.label}</p> */}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{sideNavigate.label}</p>
              </TooltipContent>
            </Tooltip>
            {index === 0 && <div className="my-4 h-px w-8 bg-white"></div>}
          </div>
        );
      })}
    </div>
  );
}

export default SideNav;
