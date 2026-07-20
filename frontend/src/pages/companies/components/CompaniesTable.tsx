import { BiBuilding } from "react-icons/bi";
import { GoPlus } from "react-icons/go";

export default function CompaniesTable() {
  return (
    <div className="flex flex-row items-center gap-3">
      <button className="flex flex-row items-center gap-1 px-2 py-2 cursor-pointer">
        <BiBuilding />
        All Companies
      </button>
      <button className="flex flex-row items-center gap-1 px-2 py-2 cursor-pointer hover:bg-[#4D4D4D]">
        <BiBuilding />
        My Companies
      </button>
      <div>
        <GoPlus />
      </div>
    </div>
  );
}
