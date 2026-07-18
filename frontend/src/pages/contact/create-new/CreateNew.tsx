import { IoClose } from "react-icons/io5";

import operationCustom from "../../../assets/operations-custom-mappings.svg";
import pencil from "../../../assets/pencil.svg";

type createNewProp = {
  onClose: () => void;
  onSetUpMySelf: () => void;
};

function CreateNew({ onClose, onSetUpMySelf }: createNewProp) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center 
    justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-250 rounded-xl bg-white shadow-2xl flex flex-col 
      items-center py-2 px-4">
        <div className="w-full flex flex-row mt-5 mb-5">
          <h2 className="text-4xl ml-72">Create Your First Contact</h2>
          <button
            className="hover:bg-[#EDEDED] p-3 rounded-4xl ms-auto mr-10"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>
        <p>
          We can help you add a contact and choose the right information to
          store.
        </p>
        <div className="flex flex-row justify-center gap-3 py-7">
          <div className="border w-[209px] flex flex-col items-center 
          cursor-pointer">
            <img className="h-50 w-50" src={operationCustom} alt="Image" />
            <p className="text-[16px] font-bold">Help me get Started</p>
          </div>
          <button
            type="button"
            className="w-[209px] flex flex-col items-center border 
            cursor-pointer hover:shadow-2xl"
            onClick={onSetUpMySelf}
          >
            <img className="h-50 w-50" src={pencil} alt="Pencil" />
            <p className="text-[18px] font-bold">I'll set up myself</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
