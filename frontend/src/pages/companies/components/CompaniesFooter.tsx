import { LuRefreshCcw } from "react-icons/lu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip";
export default function CompaniesFooter() {
  return (
    <div className="flex flex-row relative group]:">
      <div className="px-3 py-0.1 bg-[#E7E7E7] rounded-2xl">
        <p> 1 Company</p>
      </div>
      <div className="flex flex-row items-center ms-auto gap-[8px]">
        <Tooltip>
          <TooltipTrigger asChild>

        <button
          className="border px-1 py-1 cursor-pointer rounded-2xl
          hover:bg-[#E7E7E7]"
          >
{/* This is refresh Icon */}
          <LuRefreshCcw size={15} />
        </button>
            </TooltipTrigger>
               <TooltipContent>
          <p>Refresh</p>
        </TooltipContent>
          </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="cursor-pointer px-4 py-0.1 border rounded-2xl
           hover:bg-[#E7E7E7]"
            >
              Export
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Export</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
        <button
          className="cursor-pointer px-4 py-0.1 border rounded-2xl
          hover:bg-[#E7E7E7]"
          >
          Clone
        </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clone</p>
            </TooltipContent>
          </Tooltip>
      </div>
    </div>
  );
}
