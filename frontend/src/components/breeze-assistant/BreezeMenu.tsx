import { GoPencil } from "react-icons/go";
import { MdOutlineChat } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";
import { AiOutlineMore } from "react-icons/ai";

type BreezeMenuProps = {
  isOpen: boolean;
  onMenuClick: (menuId: string) => void;
};

export const breezeMenuItems = [
  {
    id: "new-chat",
    label: "new Chat",
    icon: GoPencil,
    isActive: true,
  },
  {
    id: "chats",
    label: "Chats",
    icon: MdOutlineChat,
    isActive: false,
  },
  {
    id: "Artifacts",
    label: "Artifacts",
    icon: IoImagesOutline,
    isActive: false,
  },
  {
    id: "Projects",
    label: "Projects",
    icon: FaRegFolderOpen,
    isActive: false,
  },
  {
    id: "more",
    label: "More",
    icon: AiOutlineMore,
    isActive: false,
  },
] as const;

export default function BreezeMenu({ isOpen, onMenuClick }: BreezeMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute  mt-10 bg-[#FFFFFF] px-3 py-4 border rounded-3xl z-10">
      {breezeMenuItems.map((menu) => {
        const Icon = menu.icon;
        return (
          <button
            key={menu.id}
            className="flex flex-col w-full text-nowrap rounded-xs hover:bg-[#B3F0ED] px-3 py-1.5"
            onClick={() => onMenuClick(menu.id)}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon />
              {menu.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
