import { FiX } from "react-icons/fi";
import sparkleIcon from "../../assets/sparkle-icon.svg";
import BreezeMenu from "./BreezeMenu";

type BreezeHeaderProps = {
  isBreezeMenuOpen: boolean;
  onToggleMenu: () => void;
  onMenuClick: (menuId: string) => void;
  onClose: () => void;
};

export default function BreezeHeader({
  isBreezeMenuOpen,
  onToggleMenu,
  onMenuClick,
  onClose,
}: BreezeHeaderProps) {
  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="relative gap-2 font-medium text-gray-800">
          <button
            className="flex items-center hover:bg-[#F0F0F0] px-3 py-2 rounded-2xl"
            onClick={onToggleMenu}
          >
            <img alt="Breeze" className="h-4 w-4" src={sparkleIcon} />
            <span>Breeze</span>
          </button>
          <BreezeMenu isOpen={isBreezeMenuOpen} onMenuClick={onMenuClick} />
        </div>
        <button
          aria-label="Close Breeze Assistant"
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100
           hover:text-gray-800"
          onClick={onClose}
          type="button"
        >
          <FiX size={20} />
        </button>
      </header>
    </>
  );
}
