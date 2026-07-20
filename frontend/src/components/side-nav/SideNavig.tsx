import { RiContactsBook3Line } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

export default function SideNavig() {

    // navigation is used to locate to that particular path 
    // like contacts and home when I click
    const navigation =useNavigate();
    const location =useLocation();
    const sideNavigationList =[
        {
            id:1,
            icon :FaBuilding,
            label :"Home",
            path : "/",
        },
        {
            id:2,
            icon : RiContactsBook3Line,
            label:"Contacts",
            path :"/contacts",
        },
        {
            id:3,
            icon:MdOutlineHome,
            label:"Companies",
            path: "/companies",
        }
    ];

  return (
    <div className="flex flex-col items-center gap-3 p-3">
        {sideNavigationList.map((sidenav)=>{
          const  Icon =sidenav.icon;
            return(
                <div  key={sidenav.id}>
                 <button className={` w-fit h-fit px-3 py-3 cursor-pointer hover:bg-[#4D4D4D]  rounded-3xl
                  ${location.pathname === sidenav.path ? 'bg-[#4D4D4D]': 'hover:bg-[#4D4D4D]'}`}
                // ${location.pathname === sideNavigate.path ? 'bg-[#4D4D4D]': 'hover:bg-[#4D4D4D]'}

                 onClick={()=>{
                    navigation(sidenav.path);
                 }
                 }
                 ><Icon size={20}/></button>
                </div>
            )
        })}
    </div>
  )
}
