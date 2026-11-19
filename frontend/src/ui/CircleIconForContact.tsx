import type { IconType } from "react-icons/lib";

type Icon = {
  icon: IconType;
  label: string;
  onClick?: () => void;
};

function CircleIconForContact({ icon: Icon, label, onClick }: Icon) {
  return (
    <>
    <button
      onClick={onClick}
      className="flex  cursor-pointer rounded-full border w-8 h-8 justify-center items-center gap-1"
      >
      <Icon />
    </button>
      <span className="truncate ">{label}</span>
      </>
  );
}

export default CircleIconForContact;
