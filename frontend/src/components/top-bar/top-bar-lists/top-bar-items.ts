import { CiPhone } from "react-icons/ci";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";

const topNavItems =[
    {
      id: 1,
      label: "call",
      icon: CiPhone,
    },
    {
      id: 2,
      label: "HubSpot market place",
      icon: HiMiniBuildingStorefront,
    },
    {
      id: 3,
      label: "Help Center",
      icon: FaRegQuestionCircle,
    },
    {
      id: 4,
      label: "Settings",
      icon: IoMdSettings,
    },
    {
      id: 5,
      label: "Notification",
      icon: FaBell,
    },
];

export default topNavItems; 